import Link from "next/link";
import { IconBag } from "@/components/ui/icons";

interface EmptyStateProps {
  title: string;
  message: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}

export default function EmptyState({
  title,
  message,
  actionLabel,
  actionHref,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-20 text-center">
      <div className="grid size-16 place-items-center rounded-full bg-pink-50 text-brand">
        <IconBag className="h-8 w-8" />
      </div>
      <h2 className="mt-5 text-lg font-bold text-gray-900">{title}</h2>
      <p className="mt-1 max-w-xs text-sm text-gray-500">{message}</p>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-6 rounded bg-brand px-8 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-brand-dark"
        >
          {actionLabel}
        </button>
      )}
      {actionLabel && actionHref && !onAction && (
        <Link
          href={actionHref}
          className="mt-6 rounded bg-brand px-8 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-brand-dark"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
