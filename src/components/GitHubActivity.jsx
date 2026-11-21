
import { developerPresenceLinks, github } from "@/data/content";
import { linkProps } from "@/lib/links";
import { getGitHubData } from "@/lib/github";
import Reveal from "./Reveal";
import ScrollToEnd from "./ScrollToEnd";

const LEVEL_CLASSES = [
  "bg-line/60",
  "bg-forest/45",
  "bg-forest/70",
  "bg-forest/80",
  "bg-forest",
];

const monthYear = new Intl.DateTimeFormat("en", {
  month: "short",
  year: "numeric",
});

const dayLabel = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

// GitHub profile card.
function ProfileCard({ state }) {
  const profile = state.data;
  const name = profile?.name || github.username;

  if (state.status === "error") {
    return (
      <div className="flex min-h-[210px] flex-col justify-center rounded-xl border border-line bg-paper p-6">
        <p className="text-sm text-ink-soft">
          Unable to load GitHub profile.
        </p>

        <a
          href={github.profileHref}
          {...linkProps(github.profileHref)}
          className="mt-3 font-mono text-[12px] uppercase tracking-wide text-forest underline underline-offset-4 hover:text-ink"
        >
          View it on GitHub
        </a>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-line bg-paper p-6">
      <div className="flex items-center gap-4">
        {profile?.avatarUrl ? (
          <img
            src={profile.avatarUrl}
            alt={`${name}'s GitHub avatar`}
            width="56"
            height="56"
            loading="lazy"
            className="h-14 w-14 rounded-full border border-line"
          />
        ) : (
          <span
            className="flex h-14 w-14 items-center justify-center rounded-full border border-line font-mono text-lg text-ink-muted"
            aria-hidden="true"
          >
            {name.charAt(0).toUpperCase()}
          </span>
        )}

        <div className="min-w-0">
          <p className="truncate text-base font-semibold text-ink">
            {name}
          </p>

          <p className="truncate font-mono text-[12px] text-ink-muted">
            @{profile?.login || github.username}
          </p>
        </div>
      </div>

      {profile?.bio && (
        <p className="mt-4 text-[13px] leading-relaxed text-ink-soft">
          {profile.bio}
        </p>
      )}

      {profile && (
        <dl className="mt-5 flex gap-8">
          <div>
            <dd className="text-xl font-bold text-ink">
              {profile.publicRepos}
            </dd>
            <dt className="eyebrow">Repositories</dt>
          </div>

          <div>
            <dd className="text-xl font-bold text-ink">
              {profile.followers}
            </dd>
            <dt className="eyebrow">Followers</dt>
          </div>
        </dl>
      )}

      <a
        href={profile?.htmlUrl || github.profileHref}
        {...linkProps(profile?.htmlUrl || github.profileHref)}
        className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-line px-5 py-2.5 font-mono text-[12px] uppercase tracking-wide text-ink-soft transition-colors hover:border-ink hover:text-ink"
      >
        View profile
        <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
}

// GitHub contribution calendar.

function ContributionGraph({ state }) {
  if (state.status === "error" || !state.data?.days?.length) {
    return (
      <div className="flex min-h-[210px] flex-col items-start justify-center rounded-xl border border-line bg-paper p-6">
        <p className="text-[14px] text-ink-soft">
          The contribution graph couldn't be loaded right now.
        </p>

        <a
          href={github.profileHref}
          {...linkProps(github.profileHref)}
          className="mt-2 font-mono text-[12px] uppercase tracking-wide text-forest underline underline-offset-4"
        >
          View it on GitHub
        </a>
      </div>
    );
  }

  const { total, days, year } = state.data;

  // Create Sunday-first calendar weeks.
  const firstDate = new Date(`${days[0].date}T00:00:00Z`);
  const offset = firstDate.getUTCDay();

  const cells = [
    ...Array(offset).fill(null),
    ...days,
  ];

  const weeks = [];

  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }

  // Show a month label when a week contains the first day
  // of a month. The first week always starts with January.
  const monthLabels = weeks.map((week, index) => {
    const firstOfMonth = week.find(
      (day) => day?.date.slice(8, 10) === "01"
    );

    if (index === 0) return "Jan";

    if (!firstOfMonth) return "";

    return new Intl.DateTimeFormat("en", {
      month: "short",
      timeZone: "UTC",
    }).format(new Date(`${firstOfMonth.date}T00:00:00Z`));
  });

  const weekdayLabels = [
    "",
    "Mon",
    "",
    "Wed",
    "",
    "Fri",
    "",
  ];

  return (
    <div className="rounded-xl border border-line bg-paper p-6">
      <p className="text-[13px] text-ink-soft">
        <span className="text-xl font-bold text-ink">
          {total.toLocaleString("en")}
        </span>{" "}
        contributions in {year}
      </p>

      <ScrollToEnd
        className="mt-5 overflow-x-auto pb-2"
        role="group"
        aria-label={`GitHub contributions calendar for ${year}`}
        tabIndex={0}
      >
        <div
          className="grid w-max gap-x-[3px] gap-y-[3px]"
          style={{
            gridTemplateColumns: `28px repeat(${weeks.length}, 11px)`,
            gridTemplateRows: "16px repeat(7, 11px)",
          }}
        >
          {/* Month labels */}
          {monthLabels.map((month, index) =>
            month ? (
              <span
                key={`month-${index}`}
                className="whitespace-nowrap font-mono text-[10px] text-ink-muted"
                style={{
                  gridColumn: index + 2,
                  gridRow: 1,
                }}
              >
                {month}
              </span>
            ) : null
          )}

          {/* Weekday labels */}
          {weekdayLabels.map((label, index) =>
            label ? (
              <span
                key={label}
                className="self-center font-mono text-[9px] text-ink-muted"
                style={{
                  gridColumn: 1,
                  gridRow: index + 2,
                }}
              >
                {label}
              </span>
            ) : null
          )}

          {/* Contribution squares */}
          {weeks.map((week, weekIndex) =>
            week.map((day, dayIndex) => {
              if (!day) return null;

              const date = new Date(
                `${day.date}T00:00:00Z`
              );

              const level = Math.min(
                4,
                Math.max(0, Number(day.level) || 0)
              );

              return (
                <div
                  key={day.date}
                  title={`${day.count} contribution${
                    day.count === 1 ? "" : "s"
                  } on ${dayLabel.format(date)}`}
                  aria-label={`${day.count} contributions on ${day.date}`}
                  className={`rounded-[2px] ${
                    LEVEL_CLASSES[level]
                  }`}
                  style={{
                    gridColumn: weekIndex + 2,
                    gridRow: dayIndex + 2,
                  }}
                />
              );
            })
          )}
        </div>
      </ScrollToEnd>

      {/* Contribution legend */}
      <div
        className="mt-4 flex items-center justify-end gap-1.5 font-mono text-[10px] text-ink-muted"
        aria-hidden="true"
      >
        <span>Less</span>

        {LEVEL_CLASSES.map((cls) => (
          <span
            key={cls}
            className={`h-[11px] w-[11px] rounded-[2px] ${cls}`}
          />
        ))}

        <span>More</span>
      </div>
    </div>
  );
}


// Selected GitHub repositories.
function RepoList({ state }) {
  if (state.status === "error" || !state.data?.length) {
    return (
      <div className="mt-8 rounded-xl border border-line bg-paper p-5">
        <p className="text-sm text-ink-soft">
          Unable to load selected repositories.
        </p>
      </div>
    );
  }

  return (
    <>
      <h3 className="eyebrow mb-4 mt-10">
        Selected repositories
      </h3>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {state.data.map((repo) => (
          <li key={repo.name}>
            <a
              href={repo.htmlUrl}
              {...linkProps(repo.htmlUrl)}
              className="flex h-full flex-col rounded-xl border border-line bg-paper p-5 transition-colors hover:border-forest/40"
            >
              <span className="font-mono text-[13px] font-medium text-ink">
                {repo.name}
              </span>

              <span className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-ink-soft">
                {repo.description || "No description provided."}
              </span>

              <span className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-4 font-mono text-[11px] text-ink-muted">
                {repo.language && (
                  <span>{repo.language}</span>
                )}

                {repo.stars > 0 && (
                  <span>★ {repo.stars}</span>
                )}

                {repo.pushedAt && (
                  <span>
                    Updated{" "}
                    {monthYear.format(new Date(repo.pushedAt))}
                  </span>
                )}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}

// Main GitHub activity section.
export default async function GitHubActivity() {
  const { profile, repos, contributions } = await getGitHubData();

  return (
    <section
      id="github"
      className="bg-paper py-20 md:py-28"
    >
      <div className="container-page">
        <Reveal>
          <p className="eyebrow mb-3">— GitHub</p>

          <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            GitHub activity
          </h2>

          <p className="mt-3 max-w-md text-[15px] text-ink-soft">
            {github.description}
          </p>
        </Reveal>

        <Reveal delayMs={100}>
          <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
            <ProfileCard state={profile} />

            <ContributionGraph state={contributions} />
          </div>

          <RepoList state={repos} />

          <ul className="mt-10 flex flex-wrap gap-3">
            {developerPresenceLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  {...linkProps(link.href)}
                  className="inline-block rounded-full border border-line px-6 py-3 font-mono text-[12px] uppercase tracking-wide text-ink-soft transition-colors hover:border-ink hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
