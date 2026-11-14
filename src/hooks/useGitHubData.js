
import { useEffect, useRef, useState } from "react";

const CACHE_MS = 30 * 60 * 1000; // 30 minutes

// Read cached data safely.
function readCache(key) {
  try {
    const raw = sessionStorage.getItem(key);

    if (!raw) return null;

    const { at, data } = JSON.parse(raw);
    const age = Date.now() - at;

    if (!Number.isFinite(at) || age < 0 || age >= CACHE_MS) {
      sessionStorage.removeItem(key);
      return null;
    }

    return data ?? null;
  } catch {
    return null;
  }
}

// Save data in session storage.
function writeCache(key, data) {
  try {
    sessionStorage.setItem(
      key,
      JSON.stringify({
        at: Date.now(),
        data,
      })
    );
  } catch {
    // Caching is optional.
  }
}

// Fetch JSON and handle API errors.
async function getJson(url, signal) {
  const response = await fetch(url, {
    signal,
    headers: {
      Accept: "application/vnd.github+json",
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
}

// Reusable cached fetching hook.
function useCachedFetch(key, load) {
  const loadRef = useRef(load);
  loadRef.current = load;

  const [retryCount, setRetryCount] = useState(0);

  const [state, setState] = useState(() => {
    const cached = readCache(key);

    return {
      key,
      status: cached !== null ? "ready" : "loading",
      data: cached,
      error: null,
    };
  });

  useEffect(() => {
    let active = true;

    const cached = readCache(key);

    if (cached !== null) {
      setState({
        key,
        status: "ready",
        data: cached,
        error: null,
      });

      return;
    }

    const controller = new AbortController();

    setState({
      key,
      status: "loading",
      data: null,
      error: null,
    });

    loadRef.current(controller.signal)
      .then((data) => {
        if (!active) return;

        writeCache(key, data);

        setState({
          key,
          status: "ready",
          data,
          error: null,
        });
      })
      .catch((error) => {
        if (!active || error.name === "AbortError") return;

        setState({
          key,
          status: "error",
          data: null,
          error: error.message || "Something went wrong.",
        });
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [key, retryCount]);

  // Prevent displaying data belonging to a previous key.
  const currentState =
    state.key === key
      ? state
      : {
          key,
          status: "loading",
          data: null,
          error: null,
        };

  return {
    ...currentState,
    retry: () => setRetryCount((count) => count + 1),
  };
}

// GitHub profile information.
export function useGitHubProfile(username) {
  return useCachedFetch(
    `gh-profile:${username}`,
    async (signal) => {
      const user = await getJson(
        `https://api.github.com/users/${encodeURIComponent(username)}`,
        signal
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
    }
  );
}

// Selected repositories configured in content.js.
export function useGitHubPinned(username, names) {
  const repoNames = Array.isArray(names) ? names : [];

  const cacheKey = `gh-pinned:${username}:${repoNames.join(",")}`;

  return useCachedFetch(cacheKey, async (signal) => {
    if (!repoNames.length) {
      throw new Error("No repositories configured.");
    }

    const results = await Promise.allSettled(
      repoNames.map((name) =>
        getJson(
          `https://api.github.com/repos/${encodeURIComponent(
            username
          )}/${encodeURIComponent(name)}`,
          signal
        )
      )
    );

    if (signal.aborted) {
      throw new DOMException("Aborted", "AbortError");
    }

    // Keep successfully loaded repositories.
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

    if (!repos.length) {
      throw new Error("Unable to load repositories.");
    }

    return repos;
  });
}

// Get today's date in the user's local timezone.
function getLocalDate() {
  const now = new Date();

  return [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("-");
}

// Contribution calendar from January 1 through today.
export function useGitHubContributions(username) {
  const year = new Date().getFullYear();

  return useCachedFetch(
    `gh-contrib:${username}:${year}`,
    async (signal) => {
      const result = await getJson(
        `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(
          username
        )}?y=${year}`,
        signal
      );

      const today = getLocalDate();

      const contributionMap = new Map(
        (result.contributions ?? []).map((day) => [
          day.date,
          day,
        ])
      );

      const days = [];

      const current = new Date(Date.UTC(year, 0, 1));
      const end = new Date(`${today}T00:00:00Z`);

      // Generate every date, including days with zero contributions.
      while (current <= end) {
        const date = current.toISOString().slice(0, 10);
        const contribution = contributionMap.get(date);

        const count = Math.max(
          0,
          Number(contribution?.count) || 0
        );

        const level =
          contribution?.level !== undefined
            ? Math.min(
                4,
                Math.max(0, Number(contribution.level) || 0)
              )
            : count === 0
              ? 0
              : count <= 3
                ? 1
                : count <= 6
                  ? 2
                  : count <= 9
                    ? 3
                    : 4;

        days.push({
          date,
          count,
          level,
        });

        current.setUTCDate(current.getUTCDate() + 1);
      }

      return {
        year,
        total: days.reduce((sum, day) => sum + day.count, 0),
        days,
      };
    }
  );
}
