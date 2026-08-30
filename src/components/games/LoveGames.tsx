import { useEffect, useRef, useState } from "react";
import { GameShell, GameButton } from "./GameShell";
import type { GameProps } from "./Puzzles";

/* ---------------------------------- 6. Catch the hearts ------------------------------- */

interface Falling {
  id: number;
  x: number;
  delay: number;
  duration: number;
  icon: string;
}

const ICONS = ["💖", "💘", "💝", "💞", "🌹"];

export function CatchHearts({ onWin }: GameProps) {
  const [running, setRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(25);
  const [hearts, setHearts] = useState<Falling[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    if (!running) return;
    const spawn = setInterval(() => {
      idRef.current += 1;
      const heart: Falling = {
        id: idRef.current,
        x: Math.random() * 84,
        delay: 0,
        duration: 2.2 + Math.random() * 1.4,
        icon: ICONS[Math.floor(Math.random() * ICONS.length)],
      };
      setHearts((h) => [...h.slice(-14), heart]);
    }, 420);
    const tick = setInterval(() => setTime((t) => t - 1), 1000);
    return () => {
      clearInterval(spawn);
      clearInterval(tick);
    };
  }, [running]);

  useEffect(() => {
    if (running && time <= 0) {
      setRunning(false);
      setHearts([]);
    }
  }, [time, running]);

  useEffect(() => {
    if (score >= 12) {
      setRunning(false);
      onWin();
    }
  }, [score, onWin]);

  const start = () => {
    setScore(0);
    setTime(25);
    setHearts([]);
    setRunning(true);
  };

  return (
    <GameShell
      instruction="Catch 12 falling hearts before the timer runs out. Tap them mid-air."
      status={`Caught ${score}/12 · ${time}s left`}
      footer={!running ? <GameButton onClick={start}>{time <= 0 ? "Try again" : "Start catching"}</GameButton> : null}
    >
      <div className="relative mx-auto h-72 w-full max-w-md overflow-hidden rounded-3xl border border-border bg-secondary/40">
        {hearts.map((h) => (
          <button
            key={h.id}
            type="button"
            onClick={() => {
              setScore((s) => s + 1);
              setHearts((hs) => hs.filter((x) => x.id !== h.id));
            }}
            className="absolute top-0 text-3xl animate-fall"
            style={{ left: `${h.x}%`, animationDuration: `${h.duration}s` }}
          >
            {h.icon}
          </button>
        ))}
        {!running && (
          <p className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
            {time <= 0 ? "Time's up — one more go?" : "Ready when you are 💕"}
          </p>
        )}
      </div>
    </GameShell>
  );
}

/* ---------------------------------- 7. Love quiz -------------------------------------- */

const QUIZ = [
  {
    q: "What is my honest reaction when you say 'we need to talk'?",
    options: ["Calm and try to talk", " Ignoring and panic, external smile", "I ignore it"],
    answer: 0,
  },
  {
    q: "Who apologises first after a pointless argument?",
    options: ["Me, always", "You, obviously", "Nobody, we just eat snacks"],
    answer: 0,
  },
  {
    q: "What do I secretly love most?",
    options: ["Your cooking skills", "your cute talks", "Your Lips", "Your hairs"],
    answer: 2,
  },
  {
    q: "What i say most when you go for bath?",
    options: ["Okay Go", "Invitition or Information", "Jaldi aana Love"],
    answer: 1,
  },
  {
    q: "What's my idea of a perfect night?",
    options: ["Sleep Sleep Sleep", "Date night at Hotel Room", "Dance and Dance"],
    answer: 1,
  },
];

export function LoveQuiz({ onWin }: GameProps) {
  const [step, setStep] = useState(0);
  const [wrong, setWrong] = useState<number | null>(null);
  const item = QUIZ[Math.min(step, QUIZ.length - 1)];

  return (
    <GameShell instruction={`Question ${step + 1} of ${QUIZ.length}. No pressure. Okay, some pressure.`}>
      <p className="mb-5 text-center font-serif text-xl">{item.q}</p>
      <div className="mx-auto flex max-w-sm flex-col gap-2">
        {item.options.map((opt, i) => (
          <button
            key={opt}
            type="button"
            onClick={() => {
              if (i === item.answer) {
                setWrong(null);
                if (step + 1 >= QUIZ.length) onWin();
                else setStep(step + 1);
              } else setWrong(i);
            }}
            className={`rounded-2xl border border-border bg-secondary px-4 py-3 text-sm transition-all hover:-translate-y-0.5 hover:border-accent ${
              wrong === i ? "animate-shake border-destructive" : ""
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </GameShell>
  );
}

/* ---------------------------------- 8. Whack-a-doubt ---------------------------------- */

const DOUBTS = ["😟", "😕", "😔", "🥺"];

export function WhackADoubt({ onWin }: GameProps) {
  const [running, setRunning] = useState(false);
  const [hits, setHits] = useState(0);
  const [time, setTime] = useState(30);
  const [holeIndex, setHoleIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!running) return;
    const pop = setInterval(() => setHoleIndex(Math.floor(Math.random() * 9)), 800);
    const tick = setInterval(() => setTime((t) => t - 1), 1000);
    return () => {
      clearInterval(pop);
      clearInterval(tick);
    };
  }, [running]);

  useEffect(() => {
    if (running && time <= 0) {
      setRunning(false);
      setHoleIndex(null);
    }
  }, [time, running]);

  useEffect(() => {
    if (hits >= 12) {
      setRunning(false);
      onWin();
    }
  }, [hits, onWin]);

  return (
    <GameShell
      instruction="Every doubt that pops up, smash it. Land 12 hits in 30 seconds."
      status={`Doubts crushed ${hits}/12 · ${time}s`}
      footer={
        !running ? (
          <GameButton
            onClick={() => {
              setHits(0);
              setTime(30);
              setRunning(true);
            }}
          >
            {time <= 0 ? "Aww Baby Try Again" : "Start smashing"}
          </GameButton>
        ) : null
      }
    >
      <div className="mx-auto grid w-full max-w-[320px] grid-cols-3 gap-2">
        {Array.from({ length: 9 }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              if (running && holeIndex === i) {
                setHits((h) => h + 1);
                setHoleIndex(null);
              }
            }}
            className="flex aspect-square items-center justify-center rounded-2xl border border-border bg-secondary text-3xl transition-transform active:scale-90"
          >
            <span className={holeIndex === i ? "animate-pop" : "opacity-0"}>
              {DOUBTS[i % DOUBTS.length]}
            </span>
          </button>
        ))}
      </div>
    </GameShell>
  );
}

/* ---------------------------------- 9. Rock paper kisses ------------------------------ */

const MOVES = [
  { key: "rock", label: "🪨 Rock" },
  { key: "paper", label: "📄 Paper" },
  { key: "scissors", label: "✂️ Scissors" },
];

function beats(a: string, b: string) {
  return (
    (a === "rock" && b === "scissors") ||
    (a === "paper" && b === "rock") ||
    (a === "scissors" && b === "paper")
  );
}

export function RockPaperKisses({ onWin }: GameProps) {
  const [you, setYou] = useState(0);
  const [me, setMe] = useState(0);
  const [log, setLog] = useState("Best of three. Loser owes kisses.");

  useEffect(() => {
    if (you >= 3) onWin();
  }, [you, onWin]);

  const play = (move: string) => {
    const mine = MOVES[Math.floor(Math.random() * 3)].key;
    if (mine === move) setLog(`Both picked ${move}. Suspicious. We think alike.`);
    else if (beats(move, mine)) {
      setYou((v) => v + 1);
      setLog(`Your ${move} beat my ${mine}. Show-off.`);
    } else {
      setMe((v) => v + 1);
      setLog(`My ${mine} beat your ${move}. I demand a kiss.`);
    }
  };

  return (
    <GameShell
      instruction="Win 3 rounds against me to unlock the note."
      status={`You ${you} — Me ${me}`}
      footer={<p className="max-w-sm text-center text-sm text-muted-foreground">{log}</p>}
    >
      <div className="flex flex-wrap justify-center gap-3">
        {MOVES.map((m) => (
          <button
            key={m.key}
            type="button"
            onClick={() => play(m.key)}
            className="rounded-2xl border border-border bg-secondary px-6 py-5 text-lg transition-transform hover:-translate-y-1 hover:border-accent hover:shadow-glow"
          >
            {m.label}
          </button>
        ))}
      </div>
    </GameShell>
  );
}

/* ---------------------------------- 10. Typing race ----------------------------------- */

const SENTENCE = "I love you more than you love and It is going to be Increase day by day Understood";

export function TypingRace({ onWin }: GameProps) {
  const [value, setValue] = useState("");
  const [time, setTime] = useState(40);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setTime((v) => v - 1), 1000);
    return () => clearInterval(t);
  }, [running]);

  useEffect(() => {
    if (running && time <= 0) setRunning(false);
  }, [time, running]);

  useEffect(() => {
    if (running && value.trim() === SENTENCE) {
      setRunning(false);
      onWin();
    }
  }, [value, running, onWin]);

  const correct = SENTENCE.startsWith(value.trim());

  return (
    <GameShell
      instruction="Type the sentence exactly before the timer hits zero."
      status={running ? `${time}s left` : time <= 0 ? "Time's up Honey💔" : "Ready?"}
      footer={
        !running ? (
          <GameButton
            onClick={() => {
              setValue("");
              setTime(40);
              setRunning(true);
            }}
          >
            {time <= 0 ? "Try again Darling" : "Start typing"}
          </GameButton>
        ) : null
      }
    >
      <p className="mx-auto mb-4 max-w-md text-center font-serif text-lg leading-relaxed text-foreground/90">
        “{SENTENCE}”
      </p>
      <textarea
        value={value}
        disabled={!running}
        onChange={(e) => setValue(e.target.value)}
        rows={3}
        placeholder="Start typing here..."
        className={`mx-auto block w-full max-w-md rounded-2xl border bg-secondary px-4 py-3 outline-none disabled:opacity-60 ${
          correct ? "border-border focus:border-accent" : "border-destructive"
        }`}
      />
    </GameShell>
  );
}
