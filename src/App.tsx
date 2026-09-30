import { useCallback, useEffect, useRef, useState } from "react";
import {
  // Blessings,
  BrideGroom,
  Closing,
  CountdownSection,
  Cover,
  Events,
  Family,
  Footer,
  Gallery,
  Hero,
  Mantra,
  Story,
  Venue,
} from "./sections";
import { OrnamentDivider } from "./ui";

const weddingImages = [
  // couple
  "/images/couple/couple.jpg",
  "/images/couple/fort-view.jpg",
  "/images/couple/hero-portrait.jpg",
  "/images/couple/invite-cover.jpg",


  // family
  "/images/family/cousins-web.webp",
  "/images/family/Jyoti-Deepak-web.webp",
  "/images/family/payal-web.webp",


  // venues
  "/images/venues/haldi.png",
  "/images/venues/mehndi.png",
  "/images/venues/sangeet.png",
  "/images/venues/tilak.png",
  "/images/venues/wedding.png",
];

function preloadImages(images: string[]) {
  images.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

function preloadVideo(src: string) {
  const video = document.createElement("video");

  video.preload = "metadata";
  video.src = src;
  video.load();
}
export default function App() {
  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!opened) {
      // Preload important images
      preloadImages(weddingImages);

      // Start preparing the background video
      preloadVideo("/videos/wedding-bg.mp4");
    }
  }, [opened]);

  /* Lock scroll while the cover is shown */
  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  /* Custom cursor */
  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      dot.classList.remove("hidden");
      ring.classList.remove("hidden");
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && t.closest("a, button, input, textarea, [role='button'], canvas")) {
        ring.classList.add("hovering");
      } else {
        ring.classList.remove("hovering");
      }
    };

    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* Music */
  const toggleMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      audio.pause();
      setPlaying(false);
    }
  }, []);

  const open = useCallback(() => {
    setOpened(true);
    window.scrollTo({ top: 0 });
    toggleMusic();
  }, [toggleMusic]);

  return (
    <>
      <div className="cursor-dot hidden" ref={dotRef} aria-hidden="true" />
      <div className="cursor-ring hidden" ref={ringRef} aria-hidden="true" />

      <audio ref={audioRef} src="/audio/wedding-music.mp3" preload="auto" loop />

      {/* Floating music toggle */}
      <div className="fixed bottom-6 left-5 z-[9990] sm:bottom-8 sm:left-7">
        <button
          onClick={toggleMusic}
          aria-label={playing ? "Pause music" : "Play music"}
          className="relative flex items-center justify-center cursor-pointer"
          style={{
            width: 42,
            height: 42,
            border: "1px solid rgba(200,164,93,0.35)",
            background: "rgba(18,11,8,0.72)",
            backdropFilter: "blur(12px)",
            opacity: opened ? 1 : 0,
            transform: opened ? "scale(1)" : "scale(0.85)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
            borderRadius: "50%",
          }}
        >
          <div className="relative z-10" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            {playing ? (
              <span style={{ display: "flex", gap: 3 }}>
                <span style={{ width: 3, height: 12, background: "#c8a45d" }} />
                <span style={{ width: 3, height: 12, background: "#c8a45d" }} />
              </span>
            ) : (
              <span style={{ width: 0, height: 0, borderTop: "5px solid transparent", borderBottom: "5px solid transparent", borderLeft: "9px solid #c8a45d", marginLeft: 2 }} />
            )}
          </div>
        </button>
      </div>

      <div className="grain" aria-hidden="true" />

      <Cover opened={opened} onOpen={open} />

      <main className="bg-dark min-h-screen" style={{ visibility: opened ? "visible" : "hidden" }}>
        <Hero />
        <Mantra />
        <CountdownSection />
        <OrnamentDivider />
        <Story />
        <OrnamentDivider />
        <BrideGroom />
        <OrnamentDivider />
        <Events />
        <OrnamentDivider />
        <Gallery />
        <OrnamentDivider />
        <Family />
        <OrnamentDivider />
        <Venue />
        {/* <OrnamentDivider />
        <Blessings /> */}
        <OrnamentDivider />
        <Closing />
        <OrnamentDivider />
        <Footer />
      </main>
    </>
  );
}
