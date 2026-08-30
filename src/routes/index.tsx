import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { challenges, type Challenge } from "@/data/challenges";
import { ChallengeDialog } from "@/components/ChallengeDialog";
import { RewardModal } from "@/components/RewardModal";
import heroBg from "@/assets/hero-bg.jpg";

const STORAGE_KEY = "unlocked-love-notes";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "For You — 10 Little Games, 10 Love Notes" },
      {
        name: "description",
        content:
          "A playful gift: solve five puzzles and five silly love games, and unlock a handwritten note with a photo for each one.",
      },
      { property: "og:title", content: "For You — 10 Little Games, 10 Love Notes" },
      {
        property: "og:description",
        content: "Five puzzles, five love games, ten notes waiting to be unlocked.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [unlocked, setUnlocked] = useState<string[]>([]);
  const [active, setActive] = useState<Challenge | null>(null);
  const [reward, setReward] = useState<Challenge | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setUnlocked(JSON.parse(saved));
    } catch {
      /* ignore */
    }
  }, []);

  const persist = (ids: string[]) => {
    setUnlocked(ids);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
      /* ignore */
    }
  };

  const handleWin = () => {
    if (!active) return;
    if (!unlocked.includes(active.id)) persist([...unlocked, active.id]);
    setReward(active);
    setActive(null);
  };

  const puzzles = challenges.filter((c) => c.kind === "puzzle");
  const games = challenges.filter((c) => c.kind === "game");

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Hero */}
      <section className="relative flex min-h-[92vh] items-center justify-center px-5 text-center">
        <img
          src={heroBg}
          alt=""
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-veil)" }}
          aria-hidden
        />
        {["💗", "🌹", "✨", "💌", "💞"].map((e, i) => (
          <span
            key={e}
            aria-hidden
            className="absolute animate-float text-3xl opacity-70"
            style={{
              left: `${8 + i * 19}%`,
              top: `${18 + ((i * 27) % 55)}%`,
              animationDelay: `${i * 0.6}s`,
            }}
          >
            {e}
          </span>
        ))}

        <div className="relative max-w-3xl">
          <p className="text-xs uppercase tracking-[0.5em] text-accent">A gift, but make it a game</p>
          <h1 className="mt-5 font-serif text-5xl leading-[1.05] sm:text-7xl">
            Ten little challenges,
            <br />
            <span className="text-gradient">ten love notes for you</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base text-foreground/75">
            Five puzzles. Five ridiculous love games. Every time you win, something I wrote for you
            unlocks — with a photo attached. No shortcuts, no cheating (I'll know).
          </p>
          <a
            href="#challenges"
            className="mt-9 inline-flex animate-pulse-glow items-center gap-2 rounded-full px-8 py-4 font-medium text-primary-foreground"
            style={{ background: "var(--gradient-romance)" }}
          >
            Start unlocking 💘
          </a>
          <p className="mt-6 text-sm text-muted-foreground">
            {unlocked.length} of {challenges.length} notes unlocked
          </p>
        </div>
      </section>

      {/* Progress bar */}
      <div className="sticky top-0 z-20 border-y border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center gap-4 px-5 py-3">
          <span className="text-sm text-muted-foreground">Your progress</span>
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${(unlocked.length / challenges.length) * 100}%`,
                background: "var(--gradient-romance)",
              }}
            />
          </div>
          <span className="text-sm font-medium text-accent">
            {unlocked.length}/{challenges.length}
          </span>
        </div>
      </div>

      <section id="challenges" className="mx-auto max-w-6xl px-5 py-20">
        <Group
          label="The Puzzles"
          caption="Brain first, heart second. Solve these and the notes are yours."
          items={puzzles}
          unlocked={unlocked}
          onOpen={setActive}
          onRead={setReward}
        />
        <Group
          label="The Silly Love Games"
          caption="Less thinking, more chaos. Same reward at the end."
          items={games}
          unlocked={unlocked}
          onOpen={setActive}
          onRead={setReward}
          className="mt-20"
        />

        {unlocked.length === challenges.length && (
          <div className="mt-20 rounded-3xl border border-accent/40 bg-card p-10 text-center shadow-glow">
            <h3 className="font-serif text-4xl text-gradient">You unlocked everything 💍</h3>
            <p className="mx-auto mt-4 max-w-xl text-foreground/80">
              Every note, every photo, every silly game — all yours. Now come find me, I have one
              more thing to say and it doesn't fit on a screen.
            </p>
          </div>
        )}
      </section>

      <footer className="border-t border-border px-5 py-10 text-center text-sm text-muted-foreground">
        Made with far too much love (and a few hours I should have spent sleeping) 💗
      </footer>

      <ChallengeDialog
        challenge={active}
        open={!!active}
        onClose={() => setActive(null)}
        onWin={handleWin}
      />
      <RewardModal challenge={reward} open={!!reward} onClose={() => setReward(null)} />
    </main>
  );
}

function Group({
  label,
  caption,
  items,
  unlocked,
  onOpen,
  onRead,
  className = "",
}: {
  label: string;
  caption: string;
  items: Challenge[];
  unlocked: string[];
  onOpen: (c: Challenge) => void;
  onRead: (c: Challenge) => void;
  className?: string;
}) {
  return (
    <div className={className}>
      <h2 className="font-serif text-4xl">{label}</h2>
      <p className="mt-2 text-muted-foreground">{caption}</p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((c) => {
          const done = unlocked.includes(c.id);
          return (
            <article
              key={c.id}
              className="perspective group relative overflow-hidden rounded-3xl border border-border bg-card tilt-card"
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={c.image}
                  alt={c.title}
                  loading="lazy"
                  width={768}
                  height={768}
                  className={`h-full w-full object-cover transition-all duration-700 group-hover:scale-110 ${
                    done ? "" : "blur-md brightness-50"
                  }`}
                />
                <span className="absolute right-4 top-4 rounded-full bg-background/70 px-3 py-1 text-xs backdrop-blur">
                  {done ? "Unlocked 💖" : "Locked 🔒"}
                </span>
              </div>
              <div className="p-6">
                <p className="text-3xl">{c.emoji}</p>
                <h3 className="mt-2 font-serif text-2xl">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.tagline}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => onOpen(c)}
                    className="rounded-full px-5 py-2 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
                    style={{ background: "var(--gradient-romance)" }}
                  >
                    {done ? "Play again" : "Play to unlock"}
                  </button>
                  {done && (
                    <button
                      type="button"
                      onClick={() => onRead(c)}
                      className="rounded-full border border-border px-5 py-2 text-sm transition-colors hover:border-accent hover:text-accent"
                    >
                      Read note
                    </button>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
