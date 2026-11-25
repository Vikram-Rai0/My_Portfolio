import { unstable_cache } from "next/cache";
import { github } from "@/data/content";

const HOUR = 60 * 60;

async function getJson(url) {
  const headers = { Accept: "application/vnd.github+json" };

  // Optional: a token raises the API rate limit from 60 to 5000 requests/hour.
  if (process.env.GITHUB_TOKEN && url.startsWith("https://api.github.com")) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const response = await fetch(url, {
    headers,
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
  });

  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return response.json();
}

// unstable_cache only stores successful results (a thrown error is not cached),
// so a failed GitHub call is retried on the next revalidation instead of
// being served for an hour.
const cachedProfile = unstable_cache(
  async (username) => {
    const user = await getJson(
      `https://api.github.com/users/${encodeURIComponent(username)}`
    );

    return {
      login: user.login,
      name: user.name,
      bio: user.bio,
      avatarUrl: user.avatar_url,
      publicRepos: user.public_repos,
      followers: user.followers,
      htmlUrl: user.html_url,
    };
  },
  ["gh-profile"],
  { revalidate: HOUR }
);

const cachedRepos = unstable_cache(
  async (username, names) => {
    const results = await Promise.allSettled(
      names.map((name) =>
        getJson(
          `https://api.github.com/repos/${encodeURIComponent(
            username
          )}/${encodeURIComponent(name)}`
        )
      )
    );

    const repos = results
      .filter((result) => result.status === "fulfilled")
      .map(({ value: repo }) => ({
        name: repo.name,
        description: repo.description,
        language: repo.language,
        stars: repo.stargazers_count,
        pushedAt: repo.pushed_at || repo.updated_at,
        htmlUrl: repo.html_url,
      }));

    if (!repos.length) throw new Error("Unable to load repositories.");
    return repos;
  },
  ["gh-repos"],
  { revalidate: HOUR }
);

const cachedContributions = unstable_cache(
  async (username, year, today) => {
    const result = await getJson(
      `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(
        username
      )}?y=${year}`
    );

    const contributionMap = new Map(
      (result.contributions ?? []).map((day) => [day.date, day])
    );

    const days = [];
    const current = new Date(Date.UTC(year, 0, 1));
    const end = new Date(`${today}T00:00:00Z`);

    // Every date from Jan 1 to today, including days with zero contributions.
    while (current <= end) {
      const date = current.toISOString().slice(0, 10);
      const contribution = contributionMap.get(date);
      const count = Math.max(0, Number(contribution?.count) || 0);

      const level =
        contribution?.level !== undefined
          ? Math.min(4, Math.max(0, Number(contribution.level) || 0))
          : count === 0
            ? 0
            : count <= 3
              ? 1
              : count <= 6
                ? 2
                : count <= 9
                  ? 3
                  : 4;

      days.push({ date, count, level });
      current.setUTCDate(current.getUTCDate() + 1);
    }

    return {
      year,
      total: days.reduce((sum, day) => sum + day.count, 0),
      days,
    };
  },
  ["gh-contributions"],
  { revalidate: HOUR }
);

/** Wraps a loader so a failure becomes { status: "error" } instead of throwing. */
async function settle(load) {
  try {
    return { status: "ready", data: await load() };
  } catch (error) {
    console.error("[github]", error?.message ?? error);
    return { status: "error", data: null };
  }
}

export async function getGitHubData() {
  const { username, pinnedRepos } = github;
  const now = new Date();
  const year = now.getUTCFullYear();
  const today = now.toISOString().slice(0, 10);

  const [profile, repos, contributions] = await Promise.all([
    settle(() => cachedProfile(username)),
    settle(() => cachedRepos(username, pinnedRepos)),
    settle(() => cachedContributions(username, year, today)),
  ]);

  return { profile, repos, contributions };
}
