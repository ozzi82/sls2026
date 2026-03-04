import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-dark pt-20">
      <div className="text-center px-4">
        <div className="gold-line mx-auto mb-6" />
        <h1 className="text-6xl font-heading font-bold text-brand-gold mb-4">404</h1>
        <h2 className="text-2xl font-heading font-semibold text-text-light mb-4">
          Page Not Found
        </h2>
        <p className="text-text-light/60 mb-8 max-w-md mx-auto">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/" className="btn-primary">
            Go Home
          </Link>
          <Link href="/get-a-quote" className="btn-secondary">
            Get a Quote
          </Link>
        </div>
      </div>
    </div>
  );
}
