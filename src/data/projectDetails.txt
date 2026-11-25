/**
 * --------------------------------------------------
 * PROJECT DETAILS & CASE STUDIES
 * --------------------------------------------------
 *
 * Drives /projects/:id and /projects/:id/case-study.
 * Everything here is written from the existing project
 * information (content.js highlights, technical notes
 * and what is known about each build).
 *
 * Optional fields are simply hidden when missing:
 *   features        -> falls back to project.highlights
 *   caseStudy.implementation -> falls back to project.highlights
 *   architecture.summary     -> falls back to
 *                              projectTechnicalDetails[id].architecture
 * Add real specifics (metrics, dates, screenshots of
 * flows) here as you have them. Keep them factual.
 */

import { buildStack, projectTechnicalDetails, projects } from "./content";

// Short descriptions for technologies, reused from the site's stack data.
const techNotes = {
  ...Object.fromEntries(
    buildStack.flatMap((group) =>
      group.items.map((item) => [item.name, item.note])
    )
  ),
  "TanStack Query": "Server state and caching",
  Prisma: "ORM for PostgreSQL",
};

export const projectDetails = {
  alleyoops: {
    tagline:
      "A production court-booking PWA for a sports facility in Kathmandu.",

    overview: [
      "AlleyOops is a court-booking progressive web app running in production for a sports facility in Kathmandu that offers basketball, pickleball and taekwondo. Visitors browse the sport pages and reserve time slots through a multi-step booking flow, while admins manage slots, bookings, gallery content and notifications from a dashboard.",
      "The backend is built around the hard parts of booking software: concurrent reservations, availability that stays accurate, and reservations that expire instead of holding capacity indefinitely.",
    ],

    problem: [
      "A facility has a limited number of court time slots and many people trying to book them. The system has to show accurate availability, make sure the same slot can't be reserved twice when requests arrive at the same time, and give admins one place to manage slots and bookings.",
    ],

    objectives: [
      "Prevent double bookings when several users try to reserve the same slot.",
      "Release unconfirmed reservations automatically after 15 minutes.",
      "Keep slot availability in sync across connected clients in real time.",
      "Give admins tools to manage time slots, bookings, gallery content and push notifications.",
      "Make the booking flow comfortable on phones, and installable as a PWA.",
    ],

    features: [
      {
        title: "Multi-step booking flow",
        text: "A public booking page with real-time Zod validation, plus a mobile step bar and slot grid designed for phones.",
      },
      {
        title: "Concurrency-safe reservations",
        text: "Transactions, row-level locking and database constraints protect booking integrity, and pending reservations expire after 15 minutes.",
      },
      {
        title: "Real-time slot updates",
        text: "Socket.IO pushes slot changes to connected clients so availability stays current.",
      },
      {
        title: "Admin dashboard",
        text: "A time-slot dashboard with status-driven colour coding, a bookings view with date quick-filter pills and a “Booked At” column, and web push notifications.",
      },
      {
        title: "Gallery module",
        text: "Uploads are validated by file signature, processed through Cloudinary (WebP and MP4 transforms) and served through Redis-cached public routes, with a lightbox on the frontend.",
      },
      {
        title: "Global search",
        text: "A ⌘K search modal with debounced API calls, keyboard navigation and grouped results.",
      },
      {
        title: "Installable PWA",
        text: "Built with vite-plugin-pwa, with web push notifications for the admin dashboard.",
      },
      {
        title: "Mobile-first navigation",
        text: "An auto-hiding navbar, 44px touch targets, a compact “Book” button and iOS safe-area handling.",
      },
      {
        title: "Security hardening",
        text: "Role-based authorization, Zod validation and rate limiters for general API, authentication and booking routes.",
      },
    ],

    alsoUsed: [
      "Vite",
      "TanStack Query",
      "Framer Motion",
      "Zod",
      "Cloudinary",
      "web-push",
      "vite-plugin-pwa",
      "Vercel",
      "Railway",
    ],

    architecture: {
      layers: [
        {
          name: "Frontend",
          text: "A React 19 PWA built with Vite 7, styled with Tailwind CSS and using TanStack Query for server state. Deployed on Vercel.",
        },
        {
          name: "API",
          text: "Node.js and Express on Railway: authentication, booking workflows, validation, rate limiting and business rules.",
        },
        {
          name: "Data",
          text: "MySQL for transactional data (users, services, time slots and bookings); Redis for sessions and cached routes.",
        },
        {
          name: "Real time",
          text: "A Socket.IO server pushes slot updates. On the client the connection is a module-scope singleton, and socket.io-client is loaded lazily.",
        },
        {
          name: "Delivery",
          text: "A Vercel rewrite proxies /api/* requests to the Railway API so cookies work across the two hosts.",
        },
      ],
    },

    process: [
      {
        title: "Grew module by module",
        text: "The product was built up from booking, the admin dashboard, the gallery, search and push notifications. The gallery UI was redesigned several times: tabs, then story bubbles, then album cards with a lightbox.",
      },
      {
        title: "Reworked for mobile",
        text: "The public booking page and navigation were rewritten for phones, including iPhone safe areas and 44px touch targets.",
      },
      {
        title: "Reviewed before launch",
        text: "Before going live, the entire backend (about 20 files) went through a security and code review.",
      },
      {
        title: "Deployed to production",
        text: "The first production deployment, with the API on Railway and the frontend on Vercel, was in May 2026.",
      },
      {
        title: "Hardened under real use",
        text: "Issues found in production, such as deadlocks, cache stampedes, cookie handling and timezone bugs, were fixed and are covered in the case study.",
      },
    ],

    challenges: [
      {
        title: "MySQL deadlock in slot handling",
        challenge: "A MySQL deadlock occurred in the slot service.",
        resolution:
          "Queries now run as sequential awaits, and a withDeadlockRetry utility retries when a deadlock still happens.",
      },
      {
        title: "Cache stampede",
        challenge:
          "Many concurrent requests hitting an empty cache could all go to the database at once.",
        resolution:
          "getOrSetCache keeps an in-flight map, so concurrent misses for the same key share a single fetch.",
      },
      {
        title: "Cross-origin cookies",
        challenge:
          "With the frontend on Vercel and the API on Railway, session cookies had cross-origin problems.",
        resolution:
          "A Vercel rewrite proxies /api/:path* to the Railway URL, and the cookie sameSite setting is “none” instead of “lax” in production.",
      },
      {
        title: "Timezone handling",
        challenge:
          "Nepal Standard Time logic must not depend on the server's timezone setting.",
        resolution:
          "Backend services use an NST_OFFSET_MS constant, independent of the Railway TZ environment variable.",
      },
      {
        title: "Cache invalidation race",
        challenge:
          "In the booking controller, slot-update events were emitted before booking caches were invalidated.",
        resolution:
          "The order was corrected so caches are invalidated before clients are notified.",
      },
      {
        title: "Session security check",
        challenge:
          "The authentication flow needed to be checked for session fixation.",
        resolution:
          "The review confirmed req.session.regenerate() is called correctly, and it also found a dead duplicate createSession function in the middleware.",
      },
      {
        title: "Auth cascade on mount",
        challenge:
          "An unauthenticated TanStack Query running on mount triggered the global auth:expired handler and logged out a freshly authenticated admin.",
        resolution: "The cause was traced and fixed.",
      },
      {
        title: "PWA install prompt",
        challenge: "The PWA install prompt was not working.",
        resolution:
          "The manifest icon entry with purpose “any maskable” was split into separate entries.",
      },
    ],

    caseStudy: {
      background: [
        "AlleyOops was built for a sports facility in Kathmandu that offers basketball, pickleball and taekwondo. It needed a public site with a booking flow, plus admin tools for managing time slots, bookings and content.",
        "It was first deployed to production in May 2026, with the frontend on Vercel and the API on Railway. This case study focuses on the engineering decisions behind booking correctness and on the issues found once the system was in real use.",
      ],

      decisions: [
        {
          title: "Vercel proxy instead of direct cross-origin calls",
          text: "Rewriting /api/* to the Railway API keeps requests same-origin from the browser's point of view, which resolved the cookie problems between the two hosts.",
        },
        {
          title: "A singleton Socket.IO client, loaded lazily",
          text: "The socket is a module-scope singleton with autoConnect disabled and explicit connect and disconnect functions. socket.io-client is loaded with a dynamic import so public pages don't ship unused JavaScript.",
        },
        {
          title: "Time handled in code, not in the environment",
          text: "An NST_OFFSET_MS constant is used across backend services, so behaviour doesn't change with the hosting platform's timezone variable.",
        },
        {
          title: "Validation on both sides",
          text: "Zod schemas validate the booking form on the client and request data on the API.",
        },
      ],

      implementation: [
        {
          title: "Booking flow",
          text: "BookPage is a multi-step form with real-time Zod validation: fields show red or green borders and animated error messages, and button-driven fields mark the form dirty so validation stays accurate. On phones it uses a step bar and a four-column slot grid.",
        },
        {
          title: "Slot availability",
          text: "Availability queries treat only slots with the status “available” as bookable. Pending reservations expire after 15 minutes, and database constraints back up the application logic.",
        },
        {
          title: "Admin time-slot dashboard",
          text: "A status-driven colour map (STATUS_STYLES) drives the slot views, together with a TimeRangeLabel component and an info banner that works as a legend.",
        },
        {
          title: "Gallery pipeline",
          text: "Two tables (gallery_media and gallery_event_media), Zod validation, multer with magic-byte checks, and a Cloudinary service that applies WebP and MP4 transforms. A unified controller rolls back on failure, and public routes are cached in Redis.",
        },
        {
          title: "Push notifications",
          text: "Admin push uses web-push and vite-plugin-pwa with the injectManifest strategy. VAPID keys are configured on Railway and subscriptions are stored in a push_subscriptions MySQL table.",
        },
        {
          title: "Rate limiting",
          text: "Separate limiters protect the API in general, authentication (keyed by IP and username) and booking (keyed by phone number).",
        },
        {
          title: "Redis resilience",
          text: "Redis uses a reconnect strategy with exponential backoff.",
        },
        {
          title: "Search and navigation",
          text: "A ⌘K modal with debounced API calls and keyboard navigation, and a mobile navbar that hides on scroll (throttled with requestAnimationFrame, with an iOS rubber-band guard).",
        },
      ],

      lessons: [
        "Concurrency problems are easier to design out than to patch: locking, sequential queries and deadlock retries all became part of the booking path.",
        "Real use exposes issues local testing doesn't, such as cache stampedes, cross-origin cookies and server timezone assumptions.",
        "Reviewing security-sensitive code explicitly pays off. The session fixation check confirmed the flow was correct and surfaced dead duplicate code.",
        "Loading heavy features lazily, like the Socket.IO client, keeps public pages light.",
      ],
    },
  },

  "incident-flow": {
    tagline: "A real-time incident management system built in full-stack TypeScript.",

    overview: [
      "IncidentFlow is a real-time incident management system where responders and admins coordinate on live incidents. The frontend is built with Next.js (App Router) and the API with Node.js and Express, both in TypeScript. PostgreSQL (through Prisma) and Redis sit behind the API, and Socket.IO keeps connected clients in sync.",
      "It was built as a learning project to explore state management, concurrency and role-based access in a full-stack TypeScript codebase.",
    ],

    features: [
      {
        title: "Atomic task claiming",
        text: "Only one responder can claim a task, even when several try at the same time.",
      },
      {
        title: "Incident state machine",
        text: "Status changes follow controlled transitions, so an incident can't jump to an invalid state.",
      },
      {
        title: "Restricted access",
        text: "Only responders added to an incident, and admins, can open it.",
      },
      {
        title: "Real-time sync",
        text: "Socket.IO keeps connected clients in sync as incidents change.",
      },
    ],

    problem: [
      "Live incidents involve several people changing the same data at the same time. Without safeguards, two responders can take the same task, an incident can jump to an invalid status, or someone without access can open an incident.",
    ],

    objectives: [
      "Authenticate users with JWT.",
      "Make task claiming atomic, so two responders can't take the same task.",
      "Control incident status changes through an explicit state machine.",
      "Restrict incident access to added responders and admins.",
      "Keep connected clients in sync in real time.",
    ],

    alsoUsed: ["Prisma", "Zustand"],

    architecture: {
      summary:
        "A monorepo with a Next.js (App Router) frontend and a Node.js and Express API, both in TypeScript. PostgreSQL, accessed through Prisma, stores application data, Redis sits behind the API, and Socket.IO pushes live changes to connected clients. JWT authentication protects API access, and Zustand manages client-side state.",
      layers: [
        {
          name: "Frontend",
          text: "Next.js (App Router) with TypeScript and Tailwind CSS, using Zustand for client state. Includes a dashboard, a create-incident form and a live incident room.",
        },
        {
          name: "API",
          text: "Node.js and Express: JWT authentication, role-based access to incidents, and the rules for task claiming and status changes.",
        },
        { name: "Data", text: "PostgreSQL through Prisma, with Redis behind the API." },
        { name: "Real time", text: "Socket.IO keeps connected clients in sync." },
      ],
    },

    process: [
      {
        title: "Backend rules",
        text: "JWT authentication, atomic task claiming, the incident state machine and the Socket.IO wiring were built as the core of the API.",
      },
      {
        title: "Frontend on top",
        text: "A dashboard, a create-incident form and a live incident room were built on top, with real-time sync between clients.",
      },
    ],

    challenges: [
      {
        title: "Two responders claiming one task",
        challenge: "Responders working at the same time could try to take the same task.",
        resolution: "Claiming a task is atomic, so only one responder can succeed.",
      },
      {
        title: "Invalid status changes",
        challenge: "An incident should only move between statuses in sensible ways.",
        resolution: "Status is modelled as a state machine with controlled transitions.",
      },
      {
        title: "Controlling who can open an incident",
        challenge: "Incident details should not be visible to everyone.",
        resolution: "Only responders added to an incident, and admins, can open it.",
      },
      {
        title: "Keeping clients consistent",
        challenge: "Several people need to see the same incident state as it changes.",
        resolution: "Socket.IO syncs changes across clients in real time.",
      },
    ],

    caseStudy: {
      background: [
        "IncidentFlow is a personal project built to explore three problems that appear in real-time collaborative software: managing state, handling concurrent actions and restricting access by role.",
        "Rather than a single feature, it is a small system where responders and admins work on shared incidents, which makes those problems concrete.",
      ],

      decisions: [
        {
          title: "Restricted access, no auto-join",
          text: "Only people added to an incident, and admins, can open it. Opening the room doesn't add anyone automatically.",
        },
        {
          title: "Next.js over Vite",
          text: "The frontend uses Next.js with the App Router, with Zustand for client state.",
        },
        {
          title: "TypeScript across the stack",
          text: "TypeScript in both the frontend and the API keeps one language end to end, inside a single monorepo.",
        },
        {
          title: "PostgreSQL with Prisma, plus Redis",
          text: "PostgreSQL, accessed through Prisma, is the relational data store, with Redis behind the API.",
        },
        {
          title: "Socket.IO for live updates",
          text: "WebSockets keep connected clients in sync as incidents change.",
        },
      ],

      lessons: [
        "Modelling status changes as an explicit state machine makes the allowed transitions easy to reason about.",
        "Actions that several users can trigger at once, like claiming a task, need to be designed to be safe from the start.",
        "Role-based access is easier to keep consistent when it is part of the design from the beginning.",
      ],
    },
  },
  "gradify-classroom": {
    tagline:
      "A classroom management platform for courses, assignments and academic communication.",

    overview: [
      "Gradify Classroom is a classroom management platform designed to streamline course management, student learning, assignments and academic communication through a structured web interface.",
      "A React frontend talks to a Node.js and Express API, with MySQL providing structured relational storage for users, classrooms, assignments and academic workflows.",
    ],

    problem: [
      "Courses, assignments and communication between students and teachers need a shared place to live. Gradify brings them into one structured interface where each role sees the workflows relevant to its responsibilities.",
    ],

    objectives: [
      "Support course and classroom management.",
      "Provide separate student and teacher workflows.",
      "Handle assignments and learning management.",
      "Protect resources with role-based authorization.",
      "Keep the interface consistent and responsive through reusable components.",
    ],

    architecture: {
      layers: [
        {
          name: "Frontend",
          text: "React with reusable components and a responsive interface, styled with Tailwind CSS.",
        },
        {
          name: "API",
          text: "Node.js and Express with authentication and role-based authorization.",
        },
        {
          name: "Data",
          text: "MySQL stores users, classrooms, assignments and academic workflows relationally.",
        },
      ],
    },

    process: [
      {
        title: "Component-driven frontend",
        text: "The interface is built from reusable React components so classroom and management workflows look and behave consistently.",
      },
      {
        title: "Relational data model",
        text: "A structured relational schema keeps related classroom, user and assignment data organised and maintainable.",
      },
      {
        title: "Role-aware API",
        text: "Authentication and role-based authorization decide which workflows each user can reach.",
      },
    ],

    challenges: [
      {
        title: "Different roles, different access",
        challenge: "Students and teachers need different workflows and permissions.",
        resolution:
          "Authentication and role-based authorization let each user reach only the workflows relevant to them.",
      },
      {
        title: "Keeping related data organised",
        challenge: "Classrooms, users and assignments are closely related.",
        resolution:
          "A structured relational model keeps them organised and maintainable.",
      },
      {
        title: "A consistent interface across workflows",
        challenge:
          "Classroom and management screens need to feel consistent.",
        resolution:
          "Reusable React components and responsive layouts provide the same experience across them.",
      },
    ],

    caseStudy: {
      background: [
        "Gradify Classroom is a classroom management platform built as a full-stack project. It covers course management, assignments and learning workflows for students and teachers.",
        "This case study looks at three design areas: role-based authorization, the relational data model and a reusable component approach on the frontend.",
      ],

      lessons: [
        "Role-based authorization touches every layer: the API protects resources and the interface presents each role its own workflows.",
        "Reusable components keep screens consistent across classroom and management workflows.",
        "A well-structured relational model keeps related data easy to maintain as features are added.",
      ],
    },
  },
};

/**
 * Everything a project page needs, merged from content.js (project data and
 * technical notes) and the details above. Returns null for unknown ids.
 */
export function getProjectBundle(id) {
  const index = projects.findIndex((project) => project.id === id);
  if (index === -1) return null;

  const project = projects[index];
  const details = projectDetails[id] ?? {};
  const caseStudy = details.caseStudy ?? {};
  const technical = projectTechnicalDetails[id] ?? {};
  const { architecture: technicalArchitecture, ...technicalDecisions } =
    technical;

  const withNote = (name) => ({ name, note: techNotes[name] });

  return {
    project,
    details,
    caseStudy,
    prev: projects[index - 1] ?? null,
    next: projects[index + 1] ?? null,

    features:
      details.features ?? project.highlights.map((title) => ({ title })),

    technologies: {
      core: project.stack.map(withNote),
      also: (details.alsoUsed ?? []).map(withNote),
    },

    architecture: {
      summary:
        details.architecture?.summary ?? technicalArchitecture?.description,
      layers: details.architecture?.layers ?? [],
    },

    decisions: [
      ...Object.values(technicalDecisions).map(({ title, description }) => ({
        title,
        text: description,
      })),
      ...(caseStudy.decisions ?? []),
    ],

    implementation:
      caseStudy.implementation ?? project.highlights.map((title) => ({ title })),
  };
}