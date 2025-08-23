"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, Mail, ExternalLink, Download, Globe } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";


// =========================
// CONFIG — COMPLETED WITH YOUR DETAILS
// =========================
const PROFILE = {
  name: "David Mawuko Torkornoo",
  title: "Software Engineer • AI • Cybersecurity • Full-Stack",
  tagline:
    "First-Class Honours Computer Science graduate passionate about building reliable, secure, and data-driven applications.",
  location: "Bristol, UK",
  email: "Davemtork@gmail.com",
  github: "https://github.com/Davemtok?tab=repositories",
  linkedin: "https://www.linkedin.com/in/david-torkornoo-865411195/", // update if different
  website: "", // optional
  cvUrl: "#", // Add a hosted link to your CV if available
};

// =========================
// PROJECTS — from your message
// =========================
const PROJECTS = [
  {
    title: "Facial Recognition System",
    description:
      "Built a student registration tool using Python and Haar Cascade for real-time facial detection, optimized for varied lighting.",
    tags: ["Python", "OpenCV", "AI", "Facial Recognition"],
    url: "https://github.com/Davemtok/Facial-Recognition-System-For-Student-Registration",
  },
  {
    title: "Medical Booking Platform (DESD)",
    description:
      "Designed a Django web app with role-based dashboards, secure login, appointment booking, and Dockerized deployment.",
    tags: ["Django", "DRF", "MySQL", "Docker", "Authentication"],
    url: "https://github.com/Davemtok/DESD",
  },
  {
    title: "Weather App",
    description:
      "Developed a Kotlin-based Android app with location-based weather data and a search feature.",
    tags: ["Kotlin", "Android Studio", "API Integration"],
    url: "https://github.com/SoniaTad/Mobile_WeatherApp",
  },
  {
    title: "Educational Game in C# (MazeRunner)",
    description:
      "Built an interactive game targeted at primary school students using C# and Unity.",
    tags: ["C#", "GameDev", "Unity"],
    url: "https://github.com/Davemtok/MazeRunner",
  },
  {
    title: "AI Algorithms",
    description:
      "Explored various AI techniques including genetic algorithms and search algorithms implemented in Python.",
    tags: ["Python", "AI", "Genetic Algorithms", "Search"],
    url: "https://github.com/Davemtok/AI_Algorithms",
  },
  {
    title: "Online Auction Website",
    description:
      "Contributed to an e-commerce style web app simulating an online store and bidding system.",
    tags: ["Web Development", "E-commerce", "PHP", "MySQL"],
    url: "https://github.com/dongyiu/Online_Store",
  },
  {
    title: "PintOS Exploits",
    description:
      "Worked with the PintOS framework to build and modify system calls in a simplified teaching OS.",
    tags: ["Operating Systems", "C", "PintOS", "Kernel Programming"],
    url: "https://github.com/Davemtok/Pintos_Git",
  },
];

// =========================
// SKILLS — pulled from your CV
// =========================
const SKILLS: Record<string, { name: string; icon?: React.ReactNode }[]> = {
  "Programming Languages": [
    { name: "Python" },
    { name: "C" },
    { name: "C#" },
    { name: "Kotlin" },
    { name: "JavaScript" },
    { name: "Bash" },
  ],
  "Operating Systems": [{ name: "Linux" }, { name: "Windows" }],
  "Agile Practices": [
    { name: "Agile" },
    { name: "Kanban" },
    { name: "Scrum" },
    { name: "CI/CD" },
    { name: "TDD" },
  ],
  "IDEs & Tools": [
    { name: "VS Code" },
    { name: "PyCharm" },
    { name: "Android Studio" },
    { name: "Anaconda" },
    { name: "Jupyter Labs" },
    { name: "VirtualBox" },
  ],
  "Database & Cloud": [{ name: "MySQL" }, { name: "MongoDB" }, { name: "SQLite" }, { name: "Docker" }],
  "DevOps & Testing": [
    { name: "Git" },
    { name: "Unit Testing" },
    { name: "pytest" },
    { name: "unittest" },
    { name: "Bug Tracking" },
    { name: "Automation" },
  ],
};

// =========================
// CURSOR FOLLOWER
// =========================
function CursorFollower() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 30, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 220, damping: 30, mass: 0.6 });

  React.useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  const size = 26; // circle diameter in px

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-[60] hidden md:block"
      style={{ left: springX, top: springY }}
    >
      <div
        className="-translate-x-1/2 -translate-y-1/2 rounded-full border mix-blend-difference backdrop-blur-sm"
        style={{ width: size, height: size, borderWidth: 1 }}
      />
    </motion.div>
  );
}

// =========================
// NAVBAR
// =========================
function Nav() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <a href="#home" className="text-lg font-semibold tracking-tight">
          {PROFILE.name}
        </a>
        <nav className="flex items-center gap-2">
          <IconLink href={PROFILE.github} icon={<Github className="h-5 w-5" />} label="GitHub" />
          <IconLink href={PROFILE.linkedin} icon={<Linkedin className="h-5 w-5" />} label="LinkedIn" />
          <IconLink href={`mailto:${PROFILE.email}`} icon={<Mail className="h-5 w-5" />} label="Email" />
          {PROFILE.cvUrl !== "#" && (
            <Button asChild size="sm" className="ml-2">
              <a href={PROFILE.cvUrl} target="_blank" rel="noreferrer">
                <Download className="mr-2 h-4 w-4" /> CV
              </a>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}

function IconLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex items-center rounded-xl border px-2 py-1 text-sm opacity-80 transition hover:opacity-100"
    >
      {icon}
    </a>
  );
}

// =========================
// HERO
// =========================
function Hero() {
  return (
    <section id="home" className="relative">
      {/* Background techy gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(40%_60%_at_20%_10%,rgba(56,189,248,.15),transparent),radial-gradient(40%_60%_at_80%_20%,rgba(168,85,247,.12),transparent),radial-gradient(60%_60%_at_50%_80%,rgba(16,185,129,.10),transparent)]" />

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 pb-16 pt-12 md:grid-cols-2 md:items-center">
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs">
            <Globe className="h-3.5 w-3.5" /> {PROFILE.location}
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{PROFILE.title}</h1>
          <p className="max-w-prose text-muted-foreground">{PROFILE.tagline}</p>
          <div className="flex gap-3">
            <Button asChild>
              <a href="#projects">View Projects</a>
            </Button>
            <Button asChild variant="secondary">
              <a href="#skills">Skills</a>
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="mx-auto aspect-square max-w-sm overflow-hidden rounded-3xl border">
            {/* Replace this with your photo or a canvas animation */}
            <TechCanvas />
          </div>
        </div>
      </div>
    </section>
  );
}

// Simple animated canvas with orbiting dots for a techy feel
function TechCanvas() {
  const ref = React.useRef<HTMLCanvasElement | null>(null);
  React.useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let raf: number;

    const DPR = Math.min(2, window.devicePixelRatio || 1);
    const size = 480;
    canvas.width = size * DPR;
    canvas.height = size * DPR;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    const cx = (size * DPR) / 2;
    const cy = (size * DPR) / 2;
    const dots = Array.from({ length: 28 }).map((_, i) => ({ r: (i + 4) * 8, a: Math.random() * Math.PI * 2, s: 0.002 + Math.random() * 0.004 }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(255,255,255,0.04)";
      ctx.strokeStyle = "rgba(255,255,255,0.12)";
      ctx.lineWidth = 1;

      // Rings
      for (let i = 0; i < dots.length; i += 3) {
        ctx.beginPath();
        ctx.arc(cx, cy, dots[i].r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Dots
      dots.forEach((d) => {
        d.a += d.s;
        const x = cx + Math.cos(d.a) * d.r;
        const y = cy + Math.sin(d.a) * d.r;
        ctx.beginPath();
        ctx.arc(x, y, 3 * DPR, 0, Math.PI * 2);
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return <canvas ref={ref} className="bg-muted" />;
}

// =========================
// PROJECTS GRID
// =========================
function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-6 flex items-end justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">Projects</h2>
        <p className="text-sm text-muted-foreground">Click a card to open the GitHub repo</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p, i) => (
          <a key={i} href={p.url} target="_blank" rel="noreferrer" className="group">
            <Card className="h-full transition hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-start justify-between gap-3">
                  <span>{p.title}</span>
                  <ExternalLink className="h-4 w-4 opacity-60 transition group-hover:opacity-100" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-3 text-sm text-muted-foreground">{p.description}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Badge key={t} className="rounded-full">
                      {t}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </section>
  );
}

// =========================
// SKILLS SECTION
// =========================
function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-12">
      <h2 className="mb-6 text-2xl font-semibold tracking-tight">Skills</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {Object.entries(SKILLS).map(([category, items]) => (
          <Card key={category}>
            <CardHeader>
              <CardTitle>{category}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-wrap gap-3">
                {items.map((s, i) => (
                  <li key={i} className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm">
                    {s.icon && <span className="grid h-4 w-4 place-items-center">{s.icon}</span>}
                    <span>{s.name}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

// Minimal inline SVGs for optional skill icons (not currently used in SKILLS above, but available)
function SkillSVG({ name }: { name: string }) {
  const common = "fill-current";
  switch (name) {
    case "python":
      return (
        <svg viewBox="0 0 24 24" className={common}>
          <path d="M12 2c5 0 4 3 4 3v3H8S6 8 6 10v2c0 2 2 2 2 2h8s2 0 2 2v2c0 2-2 3-4 3h-1v-2h1c1 0 2-.4 2-1.5V16c0-1-1-1-1-1H9c-2 0-5-1-5-4V9c0-3 3-4 5-4h3V2z" />
        </svg>
      );
    case "js":
      return (
        <svg viewBox="0 0 24 24" className={common}>
          <path d="M3 3h18v18H3z" opacity=".15" />
          <path d="M11 17.5c0 1-.6 2.1-2.4 2.1-1.7 0-2.6-1.1-3-2.1l1.7-.7c.2.5.6 1 1.3 1 .6 0 .9-.3.9-.7v-5h1.5v5.4zm3.2 2.1c-1.8 0-2.9-1-3.5-2.3l1.6-.9c.3.7.9 1.3 1.9 1.3.8 0 1.3-.4 1.3-1 0-.7-.5-1-1.4-1h-.9v-1.6h.9c.8 0 1.2-.3 1.2-.9 0-.5-.4-.9-1.1-.9-1 0-1.5.6-1.8 1.2l-1.5-.9c.5-1.1 1.5-2.2 3.3-2.2 1.9 0 3.2 1.1 3.2 2.7 0 1.1-.6 1.8-1.6 2.2 1.2.3 1.9 1.2 1.9 2.4 0 1.9-1.6 2.9-3.6 2.9z" />
        </svg>
      );
    case "ts":
      return (
        <svg viewBox="0 0 24 24" className={common}>
          <path d="M3 3h18v18H3z" opacity=".15" />
          <path d="M7 10h10v2h-4v7h-2v-7H7z" />
        </svg>
      );
    case "linux":
      return (
        <svg viewBox="0 0 24 24" className={common}>
          <path d="M12 2c2.2 0 3 1.8 3 4s-.8 4-3 4-3-1.8-3-4 0-4 3-4zm-6 14c0-2 2-5 6-5s6 3 6 5-2 4-6 4-6-2-6-4z" />
        </svg>
      );
    case "windows":
      return (
        <svg viewBox="0 0 24 24" className={common}>
          <path d="M3 5l8-1v8H3V5zm9-1l9-1v10h-9V4zM3 13h8v7l-8-1v-6zm9 0h9v8l-9-1v-7z" />
        </svg>
      );
    case "vscode":
      return (
        <svg viewBox="0 0 24 24" className={common}>
          <path d="M20 3l-6 3v12l6 3V3zM13 7l-7 5 7 5V7zM5 9L3 10.5 5 12V9z" />
        </svg>
      );
    case "git":
      return (
        <svg viewBox="0 0 24 24" className={common}>
          <path d="M21 11L13 3l-2 2 2 2-1 1-2-2-8 8 8 8 8-8-2-2 1-1 2 2 2-2zM9 13a2 2 0 104 0 2 2 0 00-4 0zm2 6a2 2 0 100-4 2 2 0 000 4z" />
        </svg>
      );
    case "docker":
      return (
        <svg viewBox="0 0 24 24" className={common}>
          <path d="M3 13h2v-2H3v2zm3 0h2v-2H6v2zm3 0h2v-2H9v2zm3 0h2v-2h-2v2zm3 0h2v-2h-2v2zM6 10h2V8H6v2zm3 0h2V8H9v2zm3 0h2V8h-2v2zm8 1c-1.2 0-2 .6-2 .6S18 10 16 10h-1v3H2c0 4 3 6 8 6s8-2 8-6c0 0 .5-.5 2-.5 1 0 2 .5 2 .5s-.6-2-3-2z" />
        </svg>
      );
    case "mysql":
      return (
        <svg viewBox="0 0 24 24" className={common}>
          <path d="M5 6c0-2 7-2 7-2s7 0 7 2-7 2-7 2-7 0-7-2zm0 4c0 2 7 2 7 2s7 0 7-2m-14 4c0 2 7 2 7 2s7 0 7-2m-14 4c0 2 7 2 7 2s7 0 7-2" />
        </svg>
      );
    case "mongo":
      return (
        <svg viewBox="0 0 24 24" className={common}>
          <path d="M12 2s5 4 5 10-5 10-5 10-5-4-5-10S12 2 12 2z" />
        </svg>
      );
    default:
      return null;
  }
}

// =========================
// FOOTER
// =========================
function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-4 pb-12 pt-8 text-sm text-muted-foreground">
      <div className="flex flex-col items-center justify-between gap-3 border-t pt-6 md:flex-row">
        <p>© {new Date().getFullYear()} {PROFILE.name}. Built with React & Tailwind.</p>
        <div className="flex items-center gap-2">
          <a className="underline-offset-4 hover:underline" href={PROFILE.github} target="_blank" rel="noreferrer">
            <Github className="mr-1 inline h-4 w-4" /> GitHub
          </a>
          <a className="underline-offset-4 hover:underline" href={PROFILE.linkedin} target="_blank" rel="noreferrer">
            <Linkedin className="mr-1 inline h-4 w-4" /> LinkedIn
          </a>
          <a className="underline-offset-4 hover:underline" href={`mailto:${PROFILE.email}`}>
            <Mail className="mr-1 inline h-4 w-4" /> Email
          </a>
        </div>
      </div>
    </footer>
  );
}

// =========================
// MAIN EXPORT
// =========================
export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <CursorFollower />
      <Nav />
      <Hero />
      <Projects />
      <Skills />
      <Footer />
    </div>
  );
}
