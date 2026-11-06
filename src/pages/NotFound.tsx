import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PageShell } from "@/components/common/PageShell";

const NotFound: React.FC = () => {
  const location = useLocation();

  return (
    <PageShell
      variant="home"
      title="404 — Page Not Found | Harshit Singh Shekhawat"
    >
      <section className="min-h-[80vh] flex items-center justify-center pt-28 pb-16">
        <div className="container max-w-xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full surface-graphite border border-[#FF6B2B]/35 font-mono text-xs text-[#FFA048]">
            STATUS // 404 NOT FOUND
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white">
            Route outside the digital world.
          </h1>
          <p className="text-sm sm:text-base text-[#D6D2CC] font-mono">
            Requested path:{" "}
            <span className="text-[#FFA048]">{location.pathname}</span>
          </p>
          <div className="pt-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#FF6B2B] text-[#0A0B0E] font-heading font-semibold text-sm hover:bg-[#FFA048] transition-colors shadow-[0_12px_28px_-8px_rgba(255,107,43,0.5)]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Home</span>
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default NotFound;
