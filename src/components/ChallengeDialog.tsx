import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { Challenge } from "@/data/challenges";
import {
  SlidingPuzzle,
  MemoryMatch,
  WordScramble,
  EmojiRiddles,
  HeartbeatSequence,
} from "@/components/games/Puzzles";
import {
  CatchHearts,
  LoveQuiz,
  WhackADoubt,
  RockPaperKisses,
  TypingRace,
} from "@/components/games/LoveGames";

const registry = {
  slide: SlidingPuzzle,
  memory: MemoryMatch,
  scramble: WordScramble,
  riddle: EmojiRiddles,
  sequence: HeartbeatSequence,
  catch: CatchHearts,
  quiz: LoveQuiz,
  whack: WhackADoubt,
  rps: RockPaperKisses,
  typing: TypingRace,
} as const;

export function ChallengeDialog({
  challenge,
  open,
  onClose,
  onWin,
}: {
  challenge: Challenge | null;
  open: boolean;
  onClose: () => void;
  onWin: () => void;
}) {
  if (!challenge) return null;
  const Game = registry[challenge.id as keyof typeof registry];

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-xl border-border bg-card">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">
            {challenge.emoji} {challenge.title}
          </DialogTitle>
        </DialogHeader>
        <p className="-mt-2 mb-4 text-sm text-muted-foreground">{challenge.tagline}</p>
        <Game image={challenge.image} onWin={onWin} />
      </DialogContent>
    </Dialog>
  );
}
