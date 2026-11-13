import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-6xl font-black text-brand">404</p>
      <h1 className="mt-4 text-xl font-bold text-gray-900">Page not found</h1>
      <p className="mt-2 max-w-sm text-sm text-gray-500">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 rounded bg-brand px-8 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-brand-dark"
      >
        Go to Homepage
      </Link>
    </div>
  );
}
