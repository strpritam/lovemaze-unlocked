import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { Challenge } from "@/data/challenges";

export function RewardModal({
  challenge,
  open,
  onClose,
}: {
  challenge: Challenge | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!challenge) return null;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg overflow-hidden border-accent/40 bg-card p-0">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {Array.from({ length: 14 }).map((_, i) => (
            <span
              key={i}
              className="absolute text-lg animate-confetti"
              style={{
                left: `${(i * 7 + 4) % 96}%`,
                animationDelay: `${(i % 7) * 0.25}s`,
                animationDuration: `${3 + (i % 4)}s`,
              }}
            >
              {["💖", "🌸", "✨", "💗"][i % 4]}
            </span>
          ))}
        </div>

        <div className="relative max-h-[85vh] overflow-y-auto">
          <div className="relative h-56 w-full overflow-hidden">
            <img
              src={challenge.image}
              alt={challenge.rewardTitle}
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
          </div>

          <div className="-mt-10 px-7 pb-8">
            <p className="text-xs uppercase tracking-[0.35em] text-accent">Unlocked</p>
            <h3 className="mt-2 font-serif text-3xl leading-tight text-foreground">
              {challenge.rewardTitle}
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed text-foreground/85">{challenge.note}</p>
            <p className="mt-5 font-serif text-lg italic text-accent">— {challenge.signoff}</p>

            <button
              type="button"
              onClick={onClose}
              className="mt-7 w-full rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
            >
              Keep this in my heart
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
