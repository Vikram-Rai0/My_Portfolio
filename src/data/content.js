/**
 * --------------------------------------------------
 * SITE CONTENT CONFIG
 * --------------------------------------------------
 *
 * All visitor-facing portfolio content lives here.
 * Components handle presentation; this file controls
 * the words, links and ordering.
 *
 * Positioning:
 * Junior Full-Stack Developer focused on reliable web
 * applications: React frontends, Node.js/Express APIs,
 * relational databases, authentication and caching.
 *
 * --------------------------------------------------
 */

export const siteMeta = {
  name: "Vikram Rai",
  role: "Full-Stack Developer",
  resumeHref: "/resume.pdf",
};

export const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "GitHub", href: "#github" },
  { label: "Contact", href: "#contact" },
];

/**
 * --------------------------------------------------
 * HERO
 * --------------------------------------------------
 */

export const hero = {
  eyebrow: "FULL-STACK DEVELOPER",
  headingLines: ["Building reliable", "web applications", "from UI to database."],
  paragraph:
    "I’m a full-stack developer who builds web applications with React, Next.js, Node.js and Express, backed by databases like MySQL, PostgreSQL and Redis. I enjoy the whole stack, from clean, responsive interfaces to secure APIs, real-time features and dependable performance. I’ve shipped real software for real users, and I’m looking to keep growing on a team that cares about quality.",
  availability: "Open to junior full-stack developer roles",
  ctas: [
    { label: "View projects", href: "#work" },
    { label: "Get in touch", href: "#contact" },
  ],
  avatarAlt: "Portrait of Vikram Rai",
  avatarCaption: "Vikram Rai",
};

/**
 * --------------------------------------------------
 * CORE TECHNOLOGIES (marquee)
 * --------------------------------------------------
 */

export const techMarquee = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Express.js",
  "REST APIs",
  "Socket.IO",
  "MySQL",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "Docker",
  "CI/CD",
  "Tailwind CSS",
  "Git",
  "Vercel",
  "Railway",
];

/**
 * --------------------------------------------------
 * HOW I BUILD
 * --------------------------------------------------
 */

export const mindsetPillars = [
  {
    index: "01",
    title: "Backend Architecture",
    description:
      "Designing maintainable APIs with clear responsibilities, solid authentication, input validation and dependable server-side logic.",
  },
  {
    index: "02",
    title: "Database Engineering",
    description:
      "Designing relational schemas with sensible constraints, indexes and transactions, and writing queries that stay correct and efficient.",
  },
  {
    index: "03",
    title: "Reliability",
    description:
      "Planning for edge cases, invalid input and failures, so applications behave predictably under real-world usage.",
  },
  {
    index: "04",
    title: "User Experience",
    description:
      "Building responsive interfaces that are clear, accessible and easy to use on any device.",
  },
];

/**
 * --------------------------------------------------
 * ENGINEERING HIGHLIGHTS
 * --------------------------------------------------
 */

export const engineeringHighlights = [
  {
    title: "API Design",
    description:
      "Building structured REST APIs with validation, authentication, authorization, consistent responses and centralized error handling.",
  },
  {
    title: "Data Integrity",
    description:
      "Using schemas, constraints and transactions to keep application data accurate and consistent.",
  },
  {
    title: "Concurrency",
    description:
      "Understanding race conditions and preventing conflicting operations with transactions, locking and database constraints.",
  },
  {
    title: "Performance",
    description:
      "Improving speed through caching, efficient queries, pagination and cutting out unnecessary work.",
  },
  {
    title: "Security",
    description:
      "Applying authentication, authorization, input validation, rate limiting and safe handling of sessions and database access.",
  },
  {
    title: "Real-Time Updates",
    description:
      "Using WebSockets (Socket.IO) to keep clients in sync live, and keeping pages light by loading heavy features only when needed.",
  },
];

/**
 * --------------------------------------------------
 * ABOUT
 * --------------------------------------------------
 */

export const aboutIntro = {
  paragraphs: [
    "I like understanding the problem behind a feature before deciding how to build it. I care about software that is practical, maintainable and reliable.",

    "I’ve worked across the stack: React and Next.js interfaces, Node.js and Express APIs, SQL and NoSQL databases, real-time features with Socket.IO, authentication and caching. That experience comes from an internship at Lunar IT Solution and from projects of my own.",

    "Putting software in front of real users has taught me the less glamorous parts of the job: race conditions, deadlocks, cache stampedes and debugging problems that only show up in real use.",
  ],

  tags: ["Frontend", "Backend", "APIs", "Databases", "Reliability", "Performance"],
};

/**
 * --------------------------------------------------
 * EXPERIENCE
 * --------------------------------------------------
 * dateRange and org are optional. When dateRange is
 * missing, `type` is shown instead. Add them here
 * whenever you want them displayed.
 */

export const experience = [
  {
    id: "internship",
    type: "Internship",
    title: "Full-Stack Development Intern",
    org: "Lunar IT Solution",
    description:
      "Worked across React interfaces and Node.js/Express APIs, developed database-driven features with SQL, implemented frontend and backend functionality, and collaborated through Git and GitHub.",
  },

  {
    id: "independent-projects",
    dateRange: "2025 — Present",
    title: "Independent Full-Stack Development",
    org: "Personal Projects",
    description:
      "Design, build and deploy full-stack applications end to end: REST API design, relational schemas, authentication, frontend and backend integration, caching, and deployment on Vercel and Railway.",
  },

  {
    id: "education",
    type: "Education",
    title: "Bachelor of Computer Applications (BCA)",
    description:
      "Studying programming, data structures, databases, software development, and web technologies.",
  },
];

/**
 * --------------------------------------------------
 * TECHNICAL SKILLS
 * --------------------------------------------------
 * Levels are my own rough self-assessment (0-100), not
 * verified measurements.
 */

export const skillsNote =
  "Technical skill levels are rough self-assessments, not formal measurements. They reflect my current experience and areas for growth.";
export const skillGroups = [
  {
    label: "Frontend",
    items: [
      { name: "React", level: 80 },
      { name: "Next.js", level: 70 },
      { name: "TypeScript", level: 70 },
      { name: "JavaScript", level: 90 },
      { name: "HTML", level: 95 },
      { name: "CSS", level: 90 },
      { name: "Tailwind CSS", level: 85 },
      { name: "Framer Motion", level: 60 },
    ],
  },
  {
    label: "Backend",
    items: [
      { name: "Node.js", level: 90 },
      { name: "Express.js", level: 90 },
      { name: "REST API Design", level: 90 },
      { name: "Authentication & Authorization", level: 80 },
      { name: "Socket.IO", level: 70 },
    ],
  },
  {
    label: "Databases & ORM",
    items: [
      { name: "MySQL & SQL", level: 85 },
      { name: "PostgreSQL", level: 80 },
      { name: "Redis", level: 75 },
      { name: "MongoDB", level: 30 },
      { name: "Prisma", level: 30 },
    ],
  },
  {
    label: "Tools & Deployment",
    items: [
      { name: "Git & GitHub", level: 75 },
      { name: "Docker", level: 65 },
      { name: "CI/CD", level: 50 },
      { name: "Postman", level: 90 },
      { name: "Vercel", level: 90 },
      { name: "Railway", level: 90 },
    ],
  },
];

export const skillExtras = {
  improving: [
    "Scalable backend development",
    "System design and application architecture",
    "Testing and performance optimization",
  ],

  learning: [
    "AI-Powered Application Development",
  ],

  softSkills: [
    "I communicate clearly and listen to different perspectives",
    "I enjoy working with others and sharing ideas",
    "I approach challenges with critical thinking and practical solutions",
    "I adapt to new situations and stay open to learning",
    "I manage my time well and take responsibility for my work",
  ],
};

/**
 * --------------------------------------------------
 * EVERYTHING I BUILD WITH
 * --------------------------------------------------
 */

export const buildStack = [
  {
    label: "Frontend",
    items: [
      { name: "React", note: "Component-based UI" },
      { name: "Next.js", note: "Full-stack React framework" },
      { name: "TypeScript", note: "Type-safe JavaScript" },
      { name: "Vite", note: "Dev server and builds" },
      { name: "Tailwind CSS", note: "Utility-first styling" },
      { name: "Framer Motion", note: "Interface animation" },
    ],
  },
  {
    label: "Backend",
    items: [
      { name: "Node.js", note: "Runtime" },
      { name: "Express.js", note: "REST API layer" },
      { name: "Socket.IO", note: "Real-time updates" },
      { name: "Zod", note: "Request validation" },
      { name: "web-push", note: "Push notifications" },
    ],
  },
  {
    label: "Data & storage",
    items: [
      { name: "MySQL", note: "Transactional data" },
      { name: "PostgreSQL", note: "Relational data" },
      { name: "Redis", note: "Sessions and caching" },
      { name: "Cloudinary", note: "Media uploads" },
    ],
  },
  {
    label: "Tools & deployment",
    items: [
      { name: "Git & GitHub", note: "Version control" },
      { name: "Docker", note: "Containers" },
      { name: "CI/CD", note: "Automated builds and deploys" },
      { name: "Vercel", note: "Frontend hosting" },
      { name: "Railway", note: "API hosting" },
      { name: "Postman", note: "API testing" },
      { name: "vite-plugin-pwa", note: "Installable PWA" },
    ],
  },
];

/**
 * --------------------------------------------------
 * WHAT I'M WORKING ON
 * --------------------------------------------------
 * progress is a rough self-estimate (0-100).
 */

export const workingNote =
  "Rough self-estimates of progress, not formal measurements.";

export const currentlyWorking = {
  building: [
    {
      title: "AlleyOops",
      progress: 85,
      description:
        "Ongoing work on the live booking app: admin tools, real-time updates, push notifications and performance.",
    },
    {
      title: "This portfolio",
      progress: 90,
      description:
        "A Next.js, PostgreSQL and Tailwind CSS site with light and dark themes.",
    },
  ],
  learning: [
    {
      title: "MongoDB",
      progress: 30,
      description: "Rounding out the MERN stack alongside my SQL experience.",
    },
    {
      title: "Data structures & algorithms",
      progress: 40,
      description: "Practising to strengthen problem-solving fundamentals.",
    },
    {
      title: "System design basics",
      progress: 35,
      description:
        "Studying how web applications are structured and scaled, building on what I learn from real projects.",
    },
  ],
};

/**
 * --------------------------------------------------
 * GITHUB
 * --------------------------------------------------
 */

export const github = {
  username: "Vikram-Rai0",
  profileHref: "https://github.com/Vikram-Rai0",
  // GitHub's public API can't read your profile pins without a token, so list
  // the repository names to feature here. Details load live from GitHub.
  pinnedRepos: ["AlleyOops", "Gradify_CR", "Incendent_Flow"],
  description: "Profile details, pinned repositories and contribution activity, loaded live from GitHub.",
};

/**
 * --------------------------------------------------
 * DEVELOPER PRESENCE
 * --------------------------------------------------
 */

export const developerPresenceLinks = [
  { label: "GitHub", href: "https://github.com/Vikram-Rai0" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/vikram-rai-8679a3357/" },
  { label: "Resume", href: "/resume.pdf" },
];

/**
 * --------------------------------------------------
 * CONTACT
 * --------------------------------------------------
 */

export const contact = {
  heading: ["Let's build something", "meaningful."],
  paragraph:
    "I’m looking for a junior full-stack developer role where I can contribute to real products, learn from experienced engineers and keep growing. Email is the best way to reach me.",
  links: [
    { label: "Email Me", href: "mailto:ccodework24@gmail.com" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/vikram-rai-8679a3357/" },
    { label: "GitHub", href: "https://github.com/Vikram-Rai0" },
  ],
};

/**
 * --------------------------------------------------
 * FOOTER
 * --------------------------------------------------
 */

export const footer = {
  name: "Vikram Rai",
  role: "Full-Stack Developer",

  links: [
    { label: "GitHub", href: "https://github.com/Vikram-Rai0" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/vikram-rai-8679a3357/" },
    { label: "Email", href: "mailto:ccodework24@gmail.com" },
  ],

  builtWith: "Next.js, PostgreSQL and Tailwind CSS",
};


/**
 * --------------------------------------------------
 * SITE CONTENT CONFIG
 * --------------------------------------------------
 *
 * All visitor-facing portfolio content lives here.
 * Components handle presentation; this file controls
 * the words, links and ordering.
 *
 * Positioning:
 * Junior Full-Stack Developer focused on reliable web
 * applications: React frontends, Node.js/Express APIs,
 * relational databases, authentication and caching.
 *
 * --------------------------------------------------
 */

