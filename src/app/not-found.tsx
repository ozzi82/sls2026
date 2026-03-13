import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary pt-20 relative overflow-hidden">
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,89,12,0.06),transparent_70%)]" />

      <div className="text-center px-6 relative z-10">
        <div className="gold-line mx-auto mb-10" />
        <h1 className="text-[120px] sm:text-[160px] lg:text-[200px] font-display font-bold leading-none mb-4 bg-gradient-to-r from-brand-gold to-brand-gold-light bg-clip-text text-transparent">
          404
        </h1>
        <h2 className="text-2xl lg:text-3xl font-display font-bold text-white mb-4 tracking-[-0.02em]">
          Page Not Found
        </h2>
        <p className="text-white/60 mb-10 max-w-md mx-auto text-[15px] leading-relaxed">
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
