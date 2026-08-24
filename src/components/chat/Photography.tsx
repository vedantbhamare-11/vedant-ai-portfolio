"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Shuffle } from "lucide-react";

interface PhotographyImage {
  src: string;
  orientation: "landscape" | "portrait";
}

// PHOTOGRAPHY IMAGES
const images: PhotographyImage[] = [
  // LANDSCAPE
  { src: "/Photography/1.jpg", orientation: "landscape" },
  { src: "/Photography/2.jpg", orientation: "landscape" },
  { src: "/Photography/3.jpg", orientation: "landscape" },
  { src: "/Photography/4.jpg", orientation: "landscape" },
  { src: "/Photography/12.jpg", orientation: "landscape" },

  // PORTRAIT
  { src: "/Photography/5.jpg", orientation: "portrait" },
  { src: "/Photography/6.jpg", orientation: "portrait" },
  { src: "/Photography/7.jpg", orientation: "portrait" },
  { src: "/Photography/8.jpg", orientation: "portrait" },
  { src: "/Photography/9.jpg", orientation: "portrait" },
  { src: "/Photography/10.jpg", orientation: "portrait" },
  { src: "/Photography/11.jpg", orientation: "portrait" },
  { src: "/Photography/13.jpg", orientation: "portrait" },
];

// SHUFFLE ARRAY
function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

// GET 2 LANDSCAPE + 2 PORTRAIT
function getRandomPhotos(): PhotographyImage[] {
  const landscapes = shuffleArray(
    images.filter((image) => image.orientation === "landscape"),
  ).slice(0, 2);

  const portraits = shuffleArray(
    images.filter((image) => image.orientation === "portrait"),
  ).slice(0, 2);
  return [landscapes[0], portraits[0], portraits[1], landscapes[1]];
}

// MAIN COMPONENT
export default function Photography() {
  const [displayedImages, setDisplayedImages] = useState<PhotographyImage[]>(
    [],
  );

  // INITIAL RANDOM PHOTOS
  useEffect(() => {
    setDisplayedImages(getRandomPhotos());
  }, []);

  // SHUFFLE
  const shufflePhotos = () => {
    let nextPhotos = getRandomPhotos();

    const currentSet = displayedImages
      .map((image) => image.src)
      .sort()
      .join(",");

    let nextSet = nextPhotos
      .map((image) => image.src)
      .sort()
      .join(",");

    // Prevent exactly the same set
    while (nextSet === currentSet) {
      nextPhotos = getRandomPhotos();

      nextSet = nextPhotos
        .map((image) => image.src)
        .sort()
        .join(",");
    }

    setDisplayedImages(nextPhotos);
  };

  return (
    <section
      id="photography"
      className="
        w-full
        px-4
        py-16
        sm:px-6
        sm:py-20
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-6xl
        "
      >
        {/*
            HEADER
        */}

        <div
          className="
            mb-8
            flex
            items-end
            justify-between
          "
        >
          <div>
            <h2
              className="
                text-2xl
                font-bold
                tracking-tight
                text-neutral-900
                sm:text-3xl
              "
            >
              My Visual Escape
            </h2>

            <p
              className="
                mt-2
                text-sm
                text-neutral-500
              "
            >
              A few moments captured through my lens.
            </p>
          </div>

          {/* SHUFFLE BUTTON */}

          <button
            onClick={shufflePhotos}
            className="
              group
              flex
              items-center
              gap-2
              rounded-full
              border
              border-neutral-200
              px-3
              py-2
              text-xs
              font-medium
              text-neutral-600
              transition-all
              hover:border-neutral-300
              hover:bg-neutral-50
              hover:text-neutral-900
            "
          >
            <Shuffle
              className="
                h-3.5
                w-3.5
                transition-transform
                duration-500
                group-hover:rotate-180
              "
            />
            Shuffle
          </button>
        </div>

        {/* 
            BENTO GALLERY
         */}

        <AnimatePresence mode="wait">
          {displayedImages.length === 4 && (
            <motion.div
              key={displayedImages.map((image) => image.src).join("-")}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.35,
              }}
              className="
                flex
                flex-col
                gap-3
                sm:gap-4
              "
            >
              {/*
                  ROW 1
                  LANDSCAPE + PORTRAIT
              */}

              <div
                className="
                  flex
                  w-full
                  items-start
                  gap-3
                  sm:gap-4
                "
              >
                {/* LANDSCAPE */}

                <PhotoCard
                  image={displayedImages[0]}
                  index={0}
                  className="
                    w-[66.6667%]
                  "
                />

                {/* PORTRAIT */}

                <PhotoCard
                  image={displayedImages[1]}
                  index={1}
                  className="
                    w-[33.3333%]
                  "
                />
              </div>

              {/*
                  ROW 2
                  PORTRAIT + LANDSCAPE
              */}

              <div
                className="
                  flex
                  w-full
                  items-start
                  gap-3
                  sm:gap-4
                "
              >
                {/* PORTRAIT */}

                <PhotoCard
                  image={displayedImages[2]}
                  index={2}
                  className="
                    w-[33.3333%]
                  "
                />

                {/* LANDSCAPE */}

                <PhotoCard
                  image={displayedImages[3]}
                  index={3}
                  className="
                    w-[66.6667%]
                  "
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// PHOTO CARD
interface PhotoCardProps {
  image: PhotographyImage;
  index: number;
  className?: string;
}

function PhotoCard({ image, index, className = "" }: PhotoCardProps) {
  const isLandscape = image.orientation === "landscape";

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 15,
        scale: 0.98,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        delay: index * 0.08,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        scale: 1.01,
      }}
      className={`
        group
        relative
        block
        overflow-hidden
        rounded-xl
        bg-neutral-100
        ${className}
      `}
    >
      {/*
          IMAGE
      */}

      <div
        className={`
          relative
          w-full
          ${isLandscape ? "aspect-video" : "aspect-9/16"}
        `}
      >
        <Image
          src={image.src}
          alt={`Photography ${index + 1}`}
          fill
          priority={index < 2}
          sizes="
            (max-width: 640px) 100vw,
            66vw
          "
          className="
            object-cover
            transition-transform
            duration-700
            group-hover:scale-[1.025]
          "
        />

        {/* SUBTLE HOVER */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-black/0
            transition-all
            duration-500
            group-hover:bg-black/10
          "
        />
      </div>
    </motion.div>
  );
}