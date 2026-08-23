"use client";

import { ExternalLink } from "lucide-react";
import React from "react";

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}

const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/vedantbhamare-11",
    icon: (
      <span className="text-sm font-semibold">
        <img width="48" height="48" src="https://img.icons8.com/fluency/48/github.png" alt="github"/>
      </span>
    ),
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/vedantbhamare11/",
    icon: (
      <span className="text-xs font-bold">
        <img width="32" height="32" src="https://img.icons8.com/small/32/linkedin.png" alt="linkedin"/>
      </span>
    ),
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/vedantbhamare_",
    icon: (
      <span className="text-sm font-semibold">
        <img width="32" height="32" src="https://img.icons8.com/small/32/instagram-new.png" alt="instagram-new"/>
      </span>
    ),
  },
  {
    name: "X",
    url: "https://x.com/VedantBhamare8",
    icon: (
      <span className="text-sm font-semibold leading-none">
        <img width="32" height="32" src="https://img.icons8.com/tiny-bold/32/twitterx.png" alt="twitterx"/>
      </span>
    ),
  },
  {
    name: "DEV.to",
    url: "https://dev.to/vedantbhamare",
    icon: (
      <span className="text-[10px] font-bold tracking-tight">
        DEV
      </span>
    ),
  },
  {
    name: "Medium",
    url: "https://medium.com/@vedantdbhamare",
    icon: (
      <span className="text-sm font-serif font-bold">
       <img width="48" height="48" src="https://img.icons8.com/color/48/medium-logo.png" alt="medium-logo"/>
      </span>
    ),
  },
];

export default function SocialLinks() {
  return (
    <div className="mt-5 w-full rounded-2xl border border-neutral-200 bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
      
      {/* HEADER */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-neutral-900">
          Connect with me
        </h3>

        <p className="mt-1 text-xs text-neutral-500">
          Find me across the web
        </p>
      </div>

      {/* SOCIAL LINKS */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit Vedant's ${link.name}`}
            className="
              group
              flex
              items-center
              justify-between
              rounded-xl
              border
              border-neutral-200
              bg-white
              px-3
              py-2.5
              text-xs
              font-medium
              text-neutral-700
              transition-all
              duration-200
            "
          >
            <span className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-neutral-100 text-neutral-700 transition-colors">
                {link.icon}
              </span>

              <span>{link.name}</span>
            </span>

            <ExternalLink
              className="
                h-3.5
                w-3.5
                text-neutral-400
                transition-all
                duration-200
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
                group-hover:text-neutral-700
              "
            />
          </a>
        ))}
      </div>
    </div>
  );
}