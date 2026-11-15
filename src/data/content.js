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
 * FEATURED PROJECTS
 * --------------------------------------------------
 * liveHref is optional. Projects without a public
 * deployment simply show the GitHub link.
 *
 * images: up to 5 screenshots per project, stored in
 * public/projects/<project-id>/1.jpg ... 5.jpg
 * (about 1600x1000). Missing images fall back to the
 * project illustration.
 */

export const projects = [
  {
    id: "alleyoops",
    index: "01",
    year: "2025",
    status: "In production",
    title: "AlleyOops",

    description:
      "A court-booking PWA running in production for a sports facility in Kathmandu, covering basketball, pickleball and taekwondo. Designed around slot availability, concurrent reservations and admin workflows.",

    highlights: [
      "Transaction-safe booking with row-level locking",
      "Database constraints for booking integrity",
      "15-minute pending reservation expiry",
      "Authentication and role-based authorization",
      "Redis sessions and caching, with cache-stampede protection",
      "Real-time slot updates over Socket.IO",
      "Admin dashboard with web push notifications",
      "Rate limiting and Zod request validation",
    ],

    stack: ["React", "Node.js", "Express.js", "MySQL", "Redis", "Socket.IO", "Tailwind CSS"],

    liveHref: "https://alley-oops.vercel.app/",
    githubHref: "https://github.com/Vikram-Rai0/AlleyOops",
    visual: "availability",
    images: [
      "/projects/alleyoops/1.jpg",
      "/projects/alleyoops/2.jpg",
      "/projects/alleyoops/3.jpg",
      "/projects/alleyoops/4.jpg",
      "/projects/alleyoops/5.jpg",
    ],
  },

  {
    id: "incident-flow",
    index: "02",
    year: "2026",
    title: "IncidentFlow",

    description:
      "A real-time incident management system where responders and admins coordinate on live incidents, built to explore state management, concurrency and role-based access in a full-stack TypeScript codebase.",

    highlights: [
      "JWT authentication",
      "Atomic task claiming, so two responders can't take the same task",
      "Incident state machine with controlled status transitions",
      "Restricted access: only added responders and admins can open an incident",
      "Real-time sync across clients with Socket.IO",
      "PostgreSQL (Prisma) and Redis behind a Node.js/Express API",
    ],

    stack: ["Next.js", "TypeScript", "Node.js", "Express.js", "PostgreSQL", "Redis", "Socket.IO", "Tailwind CSS"],

    githubHref: "https://github.com/Vikram-Rai0/Incendent_Flow",
    visual: "architecture",
   images: [
  "/projects/incident-flow/login.png",
  "/projects/incident-flow/dashboard.png",
  "/projects/incident-flow/declare.png",
  "/projects/incident-flow/incident-list.png",
  "/projects/incident-flow/incident-room.png",
],
  },

  {
    id: "gradify-classroom",
    index: "03",
    year: "2025",
    title: "Gradify Classroom",

    description:
      "A classroom management platform designed to streamline course management, student learning, assignments, and academic communication through a structured web interface.",

    highlights: [
      "Course and classroom management",
      "Student and teacher workflows",
      "Assignment and learning management",
      "Role-based authorization",
      "Reusable React components",
      "API-driven application architecture",
      "Responsive user interface",
    ],

    stack: ["React", "Node.js", "Express.js", "MySQL", "Tailwind CSS"],

    githubHref: "https://github.com/Vikram-Rai0/Gradify_CR",
    visual: "architecture",
    images: [
      "/projects/gradify-classroom/1.jpg",
      "/projects/gradify-classroom/2.jpg",
      "/projects/gradify-classroom/3.jpg",
      "/projects/gradify-classroom/4.jpg",
      "/projects/gradify-classroom/5.jpg",
    ],
  },
];

/**
 * --------------------------------------------------
 * PROJECT TECHNICAL DETAILS
 * --------------------------------------------------
 *
 * Detailed engineering notes. Not shown on the homepage
 * yet; ready to power case-study pages or drawers.
 */

export const projectTechnicalDetails = {
  alleyoops: {
    architecture: {
      title: "System Architecture",
      description:
        "A React PWA talks to a Node.js and Express API. The backend handles authentication, booking workflows, validation and business rules, MySQL provides transactional persistence, and Redis supports sessions and caching. Socket.IO pushes slot changes to connected clients.",
    },

    database: {
      title: "Database Design",
      description:
        "The relational model separates users, services, time slots and bookings, using foreign keys, uniqueness constraints and transactions to protect data integrity.",
    },

    concurrency: {
      title: "Concurrency & Race Conditions",
      description:
        "Availability can change while several users try to reserve the same slot. Transactions, row-level locking and database constraints prevent conflicting bookings, and deadlock retries handle contention.",
    },

    reservation: {
      title: "Reservation Lifecycle",
      description:
        "Pending reservations have a limited lifetime. Expired pending bookings are cleaned up so capacity is not held indefinitely.",
    },

    authentication: {
      title: "Authentication & Authorization",
      description:
        "Protected resources require authenticated users, while administrative operations are restricted through role-based authorization.",
    },

    performance: {
      title: "Performance",
      description:
        "Redis backs sessions and cached availability and public routes, with in-flight request coalescing to avoid cache stampedes.",
    },

    security: {
      title: "Security",
      description:
        "Authentication, authorization, input validation, rate limiting, protected routes, environment-based configuration and parameterised database queries.",
    },

    tradeoffs: {
      title: "Engineering Trade-offs",
      description:
        "Booking operations favour strong consistency over squeezing every database call. Redis is used where caching helps without risking booking correctness.",
    },
  },

  "gradify-classroom": {
    architecture: {
      title: "Application Architecture",
      description:
        "A React frontend communicates with a Node.js and Express API while MySQL provides structured relational persistence for users, classrooms, assignments and academic workflows.",
    },

    authorization: {
      title: "Authentication & Authorization",
      description:
        "Application resources are protected through authentication and role-based authorization so different users can access the workflows relevant to their responsibilities.",
    },

    database: {
      title: "Relational Data",
      description:
        "Structured relational data supports classroom, user, assignment and learning workflows while keeping related information organized and maintainable.",
    },

    frontend: {
      title: "Frontend Architecture",
      description:
        "Reusable React components and responsive interfaces provide consistent experiences across classroom and management workflows.",
    },
  },
};

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
        "A React, Vite and Tailwind CSS site with light and dark themes.",
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
  year: new Date().getFullYear(),

  links: [
    { label: "GitHub", href: "https://github.com/Vikram-Rai0" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/vikram-rai-8679a3357/" },
    { label: "Email", href: "mailto:ccodework24@gmail.com" },
  ],

  builtWith: "React, Vite and Tailwind CSS",
};