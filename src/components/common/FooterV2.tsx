import React from "react";
import { Link } from "react-router-dom";
import { NAVIGATION_ITEMS } from "@/data/portfolioData";
import { ProfilePhotoPlaceholder } from "./BrandPlaceholders";

export const FooterV2: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-[#F5F3F0]/12 bg-[#121316]/75 backdrop-blur-xl py-10 sm:py-12 mt-12 sm:mt-16">
      <div className="container">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex items-center gap-3.5 sm:gap-4">
            <ProfilePhotoPlaceholder size="nav" />
            <div>
              <p className="font-heading font-bold text-base text-[#F5F3F0]">
                Harshit Singh Shekhawat
              </p>
              <p className="text-xs sm:text-sm text-[#B8B3AD] mt-0.5">
                AI / ML Engineer • VIT Chennai • © {currentYear}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-sm font-medium text-[#C4BFB9] hover:text-[#E86A33] transition-colors"
              >
                {item.navLabel}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
