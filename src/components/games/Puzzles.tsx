import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GameShell, GameButton } from "./GameShell";

export interface GameProps {
  image: string;
  onWin: () => void;
}

/* ---------------------------------- 1. Sliding puzzle --------------------------------- */

const SIZE = 3;
const solved = [0, 1, 2, 3, 4, 5, 6, 7, 8];

function isSolvable(t: number[]) {
  let inv = 0;
  const arr = t.filter((n) => n !== 8);
  for (let i = 0; i < arr.length; i++)
    for (let j = i + 1; j < arr.length; j++) if (arr[i] > arr[j]) inv++;
  return inv % 2 === 0;
}

function shuffleTiles() {
  let t = [...solved];
  do {
    t = [...solved].sort(() => Math.random() - 0.5);
  } while (!isSolvable(t) || t.every((v, i) => v === solved[i]));
  return t;
}

export function SlidingPuzzle({ image, onWin }: GameProps) {
  const [tiles, setTiles] = useState<number[]>(() => shuffleTiles());
  const [moves, setMoves] = useState(0);
  const won = tiles.every((v, i) => v === solved[i]);

  useEffect(() => {
    if (won && moves > 0) onWin();
  }, [won, moves, onWin]);

  const move = (idx: number) => {
    const blank = tiles.indexOf(8);
    const [r1, c1] = [Math.floor(idx / SIZE), idx % SIZE];
    const [r2, c2] = [Math.floor(blank / SIZE), blank % SIZE];
    if (Math.abs(r1 - r2) + Math.abs(c1 - c2) !== 1) return;
    const next = [...tiles];
    [next[idx], next[blank]] = [next[blank], next[idx]];
    setTiles(next);
    setMoves((m) => m + 1);
  };

  return (
    <GameShell
      instruction="Tap a tile next to the empty space to slide it. Rebuild the picture."
      status={`Moves: ${moves}`}
      footer={<GameButton onClick={() => { setTiles(shuffleTiles()); setMoves(0); }}>Shuffle again</GameButton>}
    >
      <div className="mx-auto grid aspect-square w-full max-w-[320px] grid-cols-3 gap-1.5">
        {tiles.map((tile, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => move(idx)}
            className={`relative overflow-hidden rounded-lg transition-transform duration-200 ${
              tile === 8 ? "opacity-0" : "hover:scale-[1.03] shadow-soft"
            }`}
            style={
              tile === 8
                ? undefined
                : {
                    backgroundImage: `url(${image})`,
                    backgroundSize: `${SIZE * 100}% ${SIZE * 100}%`,
                    backgroundPosition: `${(tile % SIZE) * 50}% ${Math.floor(tile / SIZE) * 50}%`,
                  }
            }
          />
        ))}
      </div>
    </GameShell>
  );
}

/* ---------------------------------- 2. Memory match ----------------------------------- */

const MEMORY_ICONS = ["💌", "🌹", "☕", "🎬", "🍜", "🎧"];

export function MemoryMatch({ onWin }: GameProps) {
  const [deck] = useState(() =>
    [...MEMORY_ICONS, ...MEMORY_ICONS]
      .map((icon, i) => ({ icon, id: i }))
      .sort(() => Math.random() - 0.5),
  );
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [tries, setTries] = useState(0);

  useEffect(() => {
    if (flipped.length !== 2) return;
    const [a, b] = flipped;
    const timer = setTimeout(() => {
      if (deck[a].icon === deck[b].icon) setMatched((m) => [...m, a, b]);
      setFlipped([]);
      setTries((t) => t + 1);
    }, 700);
    return () => clearTimeout(timer);
  }, [flipped, deck]);

  useEffect(() => {
    if (matched.length === deck.length) onWin();
  }, [matched, deck.length, onWin]);

  return (
    <GameShell instruction="Find all six matching pairs of our little things." status={`Tries: ${tries}`}>
      <div className="mx-auto grid w-full max-w-[340px] grid-cols-4 gap-2">
        {deck.map((card, idx) => {
          const open = flipped.includes(idx) || matched.includes(idx);
          return (
            <button
              key={idx}
              type="button"
              onClick={() => {
                if (open || flipped.length === 2) return;
                setFlipped((f) => [...f, idx]);
              }}
              className="perspective aspect-square"
            >
              <div className={`card-3d ${open ? "is-flipped" : ""}`}>
                <span className="card-face card-front">💖</span>
                <span className="card-face card-back">{card.icon}</span>
              </div>
            </button>
          );
        })}
      </div>
    </GameShell>
  );
}

/* ---------------------------------- 3. Word scramble ---------------------------------- */

const WORDS = [
  { word: "BEAUTIFUL", hint: "What you are, even at 7am, unfairly." },
  { word: "FOREVER", hint: "How long I plan on being annoying next to you." },
  { word: "HOMESICK", hint: "What I feel when you're not around." },
];

function scramble(w: string) {
  let s = w;
  while (s === w) s = w.split("").sort(() => Math.random() - 0.5).join("");
  return s;
}

export function WordScramble({ onWin }: GameProps) {
  const [step, setStep] = useState(0);
  const [value, setValue] = useState("");
  const [shake, setShake] = useState(false);
  const puzzle = WORDS[Math.min(step, WORDS.length - 1)];
  const scrambled = useMemo(() => scramble(puzzle.word), [puzzle.word]);

  const submit = () => {
    if (value.trim().toUpperCase() === puzzle.word) {
      setValue("");
      if (step + 1 >= WORDS.length) onWin();
      else setStep(step + 1);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <GameShell
      instruction={`Word ${step + 1} of ${WORDS.length}. Hint: ${puzzle.hint}`}
      status={<span className="tracking-[0.4em] text-2xl font-serif">{scrambled}</span>}
      footer={<GameButton onClick={submit}>Check it</GameButton>}
    >
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        placeholder="Type your answer..."
        className={`mx-auto block w-full max-w-xs rounded-full border border-border bg-secondary px-5 py-3 text-center uppercase tracking-widest outline-none focus:border-accent ${
          shake ? "animate-shake" : ""
        }`}
      />
    </GameShell>
  );
}

/* ---------------------------------- 4. Emoji riddles ---------------------------------- */

const RIDDLES = [
  { clue: "🎬 + 🍿 + 😴", options: ["Movie night where I fall asleep", "Cinema date", "Popcorn recipe"], answer: 0 },
  { clue: "📱 + 🕐 + 💬", options: ["Work call", "Our 2am talks", "Alarm clock"], answer: 1 },
  { clue: "🚗 + 🎶 + 🎤", options: ["Traffic jam", "Car karaoke", "Road trip nap"], answer: 1 },
  { clue: "😤 + 5️⃣ + 😘", options: ["Gym set", "Angry for 5 minutes, then kisses", "Countdown"], answer: 1 },
];

export function EmojiRiddles({ onWin }: GameProps) {
  const [step, setStep] = useState(0);
  const [wrong, setWrong] = useState<number | null>(null);
  const riddle = RIDDLES[Math.min(step, RIDDLES.length - 1)];

  const pick = (i: number) => {
    if (i === riddle.answer) {
      if (step + 1 >= RIDDLES.length) onWin();
      else setStep(step + 1);
      setWrong(null);
    } else {
      setWrong(i);
    }
  };

  return (
    <GameShell instruction={`Riddle ${step + 1} of ${RIDDLES.length}. What does this mean?`}>
      <p className="mb-5 text-center text-4xl animate-float">{riddle.clue}</p>
      <div className="mx-auto flex max-w-sm flex-col gap-2">
        {riddle.options.map((opt, i) => (
          <button
            key={opt}
            type="button"
            onClick={() => pick(i)}
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

/* ---------------------------------- 5. Heartbeat sequence ----------------------------- */

const PADS = ["💗", "💛", "💙", "💚"];

export function HeartbeatSequence({ onWin }: GameProps) {
  const [sequence, setSequence] = useState<number[]>([]);
  const [userStep, setUserStep] = useState(0);
  const [active, setActive] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [message, setMessage] = useState("Press start to feel the rhythm");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const playSequence = useCallback((seq: number[]) => {
    setPlaying(true);
    setMessage("Watch...");
    seq.forEach((pad, i) => {
      timers.current.push(
        setTimeout(() => setActive(pad), i * 700 + 300),
        setTimeout(() => setActive(null), i * 700 + 800),
      );
    });
    timers.current.push(
      setTimeout(() => {
        setPlaying(false);
        setUserStep(0);
        setMessage("Your turn 💓");
      }, seq.length * 700 + 400),
    );
  }, []);

  const next = () => {
    const seq = [...sequence, Math.floor(Math.random() * 4)];
    setSequence(seq);
    playSequence(seq);
  };

  const tap = (pad: number) => {
    if (playing || sequence.length === 0) return;
    if (pad !== sequence[userStep]) {
      setMessage("Off-beat! Starting over 💔");
      setSequence([]);
      setUserStep(0);
      return;
    }
    if (userStep + 1 === sequence.length) {
      if (sequence.length >= 5) {
        onWin();
        return;
      }
      setMessage("Nice! Longer now...");
      setTimeout(next, 700);
    } else {
      setUserStep(userStep + 1);
    }
  };

  return (
    <GameShell
      instruction="Repeat the heartbeat pattern. Reach 5 beats in a row to unlock the note."
      status={`${message} — length ${sequence.length}/5`}
      footer={sequence.length === 0 ? <GameButton onClick={next}>Start the beat</GameButton> : null}
    >
      <div className="mx-auto grid w-full max-w-[280px] grid-cols-2 gap-3">
        {PADS.map((pad, i) => (
          <button
            key={pad}
            type="button"
            onClick={() => tap(i)}
            className={`aspect-square rounded-3xl border border-border bg-secondary text-4xl transition-all duration-200 ${
              active === i ? "scale-105 border-accent bg-accent/30 shadow-glow" : "hover:scale-[1.02]"
            }`}
          >
            {pad}
          </button>
        ))}
      </div>
    </GameShell>
  );
}
