/**
 * Seed source for the dynamic projects, copied verbatim from the old
 * src/data/content.js (projects, projectTechnicalDetails). Only used by
 * prisma/seed.js; the live site reads projects from PostgreSQL.
 */

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

