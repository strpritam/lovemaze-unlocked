import type { ReactNode } from "react";

export function GameShell({
  instruction,
  status,
  children,
  footer,
}: {
  instruction: string;
  status?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-center text-sm text-muted-foreground">{instruction}</p>
      {status ? <div className="text-sm font-medium text-accent">{status}</div> : null}
      <div className="w-full">{children}</div>
      {footer}
    </div>
  );
}

export function GameButton({
  children,
  onClick,
  className = "",
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`rounded-full border border-border bg-secondary px-5 py-2 text-sm font-medium text-secondary-foreground transition-transform hover:-translate-y-0.5 hover:bg-accent hover:text-accent-foreground disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}
