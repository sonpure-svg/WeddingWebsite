import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  CalendarIcon,
  CornerFlourish,
  DividerSymbol,
  DiyaIcon,
  GaneshaOrnament,
  HaldiIcon,
  HeartIcon,
  HennaIcon,
  InstagramIcon,
  MapPinIcon,
  MusicIcon,
  RingsIcon,
  SendIcon,
} from "./icons";
import { CornerBrackets, OrnamentDivider, Reveal, Shimmer } from "./ui";
import { createPortal } from "react-dom";

/* ------------------------------------------------------------------ */
/* Data                                                               */
/* ------------------------------------------------------------------ */

export const WEDDING_DATE = "2026-12-05T19:00:00+05:30";

const events = [
  {
    day: "Thursday",
    date: "3 December 2026",
    title: "Engagement",
    tagline: "A Beautiful Beginning Of Love & Blessings",
    time: "1:00 PM Onwards",
    note: "A Traditional Welcome Before The Wedding",
    venue: "Karwaan Celebrations",
    address: "Plot no 64, Bhagyashree Nagar, Kharbi road, Nagpur - 440024",
    map: "",
    image: "/images/venues/tilak.png",
    icon: DiyaIcon,
    reverse: false,
  },
  {
    day: "Thursday",
    date: "3 December 2026",
    title: "Mehndi",
    tagline: "Where Henna Tells Our Story",
    time: "7:00 PM Onwards",
    note: "An Evening Of Laughter & Love",
    venue: "Karwaan Celebrations",
    address: "Plot no 64, Bhagyashree Nagar, Kharbi road, Nagpur - 440024",
    dressCode: "Green 💚",
    image: "/images/venues/mehndi.png",
    icon: HennaIcon,
    reverse: true,
  },
  {
    day: "Friday",
    date: "4 December 2026",
    title: "Haldi",
    tagline: "A Sacred Blessing Of Turmeric, Love & New Beginnings",
    time: "11:00 AM Onwards",
    note: "In The Open Courtyard",
    venue: "Karwaan Celebrations",
    address: "Plot no 64, Bhagyashree Nagar, Kharbi road, Nagpur - 440024",
    dressCode: "Yellow 💛",
    image: "/images/venues/haldi.png",
    icon: HaldiIcon,
    reverse: false,
  },
  {
    day: "Friday",
    date: "4 December 2026",
    title: "Sangeet",
    tagline: "Two Families, One Dance Floor — An Evening Of Pure Joy",
    time: "6:00 PM Onwards",
    note: "At The Chosen Grounds",
    venue: "Karwaan Celebrations",
    address: "Plot no 64, Bhagyashree Nagar, Kharbi road, Nagpur - 440024",
    image: "/images/venues/sangeet.png",
    icon: MusicIcon,
    reverse: true,
  },
  {
    day: "Saturday",
    date: "5 December 2026",
    title: "Wedding",
    tagline: "Where Two Hearts Become One",
    time: "6:00 PM Onwards",
    note: "Where Forever Begins",
    venue: "Karwaan Celebrations",
    address: "Plot no 64, Bhagyashree Nagar, Kharbi road, Nagpur - 440024",
    image: "/images/venues/wedding.png",
    icon: RingsIcon,
    reverse: false,
  },
];

const familyMembers = [
  {
    name: ["Deepak", "Jyoti"],
    relation: "Papa - Mummy",
    image: "/images/family/Jyoti-Deepak-web.webp",
    aspect: "4 / 3",
  },
  {
    name: ["Payal"],
    relation: "Sister",
    image: "/images/family/payal-web.webp",
    aspect: "4 / 6.2",
  },
  {
    name: ["Cousins"],
    relation: "",
    image: "/images/family/cousins-web.webp",
    aspect: "16 / 9",
  },
];

const friends = ["Mohan & Prajakta", "Shubham & Aishwariya", "Kunal", "Vaibhav", "Ragini", "Sahil"];

/* ------------------------------------------------------------------ */
/* Hooks                                                              */
/* ------------------------------------------------------------------ */

function useCountdown(target: string) {
  const [state, setState] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetMs = new Date(target).getTime();
    const tick = () => {
      const diff = Math.max(0, targetMs - Date.now());
      setState({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  return state;
}

/* ------------------------------------------------------------------ */
/* Section helpers                                                    */
/* ------------------------------------------------------------------ */

function SectionHeading({
  eyebrow,
  title,
  delay = 0,
}: {
  eyebrow: string;
  title: string;
  delay?: number;
}) {
  return (
    <div className="mb-16 flex flex-col items-center text-center sm:mb-20">
      <Reveal y={28} delay={delay}>
        <p
          className="mb-5 font-cinzel uppercase tracking-[0.6em] text-gold"
          style={{ fontSize: "clamp(0.72rem, 1.8vw, 0.85rem)" }}
        >
          {eyebrow}
        </p>
      </Reveal>
      <Reveal y={28} delay={delay + 100}>
        <h2
          className="font-display text-gold-heading"
          style={{
            fontSize: "clamp(3rem, 8vw, 5.5rem)",
            lineHeight: 0.9,
            letterSpacing: "-0.03em",
          }}
        >
          {title}
        </h2>
      </Reveal>
      <Reveal y={28} delay={delay + 200}>
        <div className="mt-6 flex items-center gap-4">
          <span className="block h-px w-16" style={{ background: "linear-gradient(to right, transparent, var(--color-gold-line-md), transparent)" }} />
          <span className="inline-block" style={{ width: 18, height: 2, background: "var(--color-gold-line)" }} />
          <span className="block h-px w-16" style={{ background: "linear-gradient(to right, transparent, var(--color-gold-line-md), transparent)" }} />
        </div>
      </Reveal>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Cover (intro)                                                      */
/* ------------------------------------------------------------------ */

export function Cover({ opened, onOpen }: { opened: boolean; onOpen: () => void }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  const step = (i: number) => ({
    opacity: mounted && !opened ? 1 : 0,
    transform: mounted && !opened ? "translateY(0)" : "translateY(16px)",
    transition: `opacity 0.9s ease ${200 + i * 120}ms, transform 0.9s ease ${200 + i * 120}ms`,
  });

  return (
    <div
      className="fixed inset-0 z-[99990] flex flex-col items-center justify-center"
      style={{
        opacity: opened ? 0 : 1,
        pointerEvents: opened ? "none" : "auto",
        transition: "opacity 1s ease",
        display: opened ? "none" : "flex",
      }}
      aria-hidden={opened}
    >
      <div className="absolute inset-0">
        <img
          alt="Couple"
          src="/images/couple/invite-cover.jpg"
          className="object-cover"
          style={{ position: "absolute", height: "100%", width: "100%", left: 0, top: 0 }}
        />

      </div>
      <div className="absolute inset-0" style={{ background: "var(--color-overlay-photo)" }} />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, color-mix(in srgb, var(--color-overlay-base) 96%, transparent) 0%, color-mix(in srgb, var(--color-overlay-base) 72%, transparent) 32%, color-mix(in srgb, var(--color-overlay-base) 18%, transparent) 62%, color-mix(in srgb, var(--color-overlay-base) 8%, transparent) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom, color-mix(in srgb, var(--color-overlay-base) 45%, transparent) 0%, transparent 30%)" }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 70%, var(--color-gold-glow-08) 0%, transparent 70%)" }}
      />

      <GaneshaOrnament size={18} className="pointer-events-none absolute top-4 left-4 sm:top-7 sm:left-7 rotate-[135deg]" style={{ color: "var(--color-gold-glow-40)" }} />
      <GaneshaOrnament size={18} className="pointer-events-none absolute top-4 right-4 sm:top-7 sm:right-7 rotate-[225deg]" style={{ color: "var(--color-gold-glow-40)" }} />
      <GaneshaOrnament size={18} className="pointer-events-none absolute bottom-4 left-4 sm:bottom-7 sm:left-7 rotate-45" style={{ color: "var(--color-gold-glow-40)" }} />
      <GaneshaOrnament size={18} className="pointer-events-none absolute bottom-4 right-4 sm:bottom-7 sm:right-7 -rotate-45" style={{ color: "var(--color-gold-glow-40)" }} />

      <div
        className="pointer-events-none absolute"
        style={{ inset: "clamp(14px, 4vw, 13px)", border: "1px solid var(--color-gold-border)" }}
      />

      <div
        className="relative z-10 flex w-full flex-col items-center justify-end px-6 pb-14 text-center sm:justify-center sm:pb-0"
        style={{ minHeight: "100dvh" }}
      >
        <p className="mb-1.5" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "var(--color-gold-accent)", ...step(0) }}>
          <span className="opacity-75">ॐ</span>
        </p>
        <p className="mb-2 font-display italic" style={{ fontSize: "clamp(1.2rem, 3.8vw, 1.7rem)", color: "var(--color-gold-accent)", ...step(1) }}>
          श्री गणेशाय नमः
        </p>
        <p className="mb-7 font-cinzel uppercase tracking-[0.28em]" style={{ fontSize: "clamp(0.58rem, 1.9vw, 0.7rem)", color: "var(--color-gold-accent)", ...step(2) }}>
          With The Blessings Of Lord Ganesha
        </p>
        <h1 className="font-display" style={{ fontSize: "clamp(3.8rem, 14vw, 8.5rem)", lineHeight: 0.88, letterSpacing: "-0.03em", color: "var(--color-name-text)", textShadow: "0 2px 12px rgba(0,0,0,0.8), 0 8px 40px rgba(0,0,0,0.5)", ...step(3) }}>
          Rishabh
        </h1>
        <div className="my-1 font-display italic" style={{ fontSize: "clamp(1.5rem, 4vw, 2.8rem)", color: "var(--color-gold-accent)", opacity: mounted && !opened ? 1 : 0, transition: "opacity 0.9s ease 700ms" }}>
          ❦
        </div>
        <h1 className="font-display" style={{ fontSize: "clamp(3.8rem, 14vw, 8.5rem)", lineHeight: 0.88, letterSpacing: "-0.03em", color: "var(--color-name-text)", textShadow: "0 2px 12px rgba(0,0,0,0.8), 0 8px 40px rgba(0,0,0,0.5)", ...step(4) }}>
          Diksha
        </h1>
        <div style={{ opacity: mounted && !opened ? 1 : 0, transition: "opacity 0.9s ease 900ms" }}>
          <div className="flex items-center justify-center gap-3 my-2 my-6">
            <span className="h-px w-20" style={{ background: "linear-gradient(to right, transparent, var(--color-gold-dim))" }} />
            <div className="flex items-center gap-2 text-gold">
              <GaneshaOrnament size={16} className="opacity-60" />
              <DividerSymbol size={22} style={{ filter: "drop-shadow(0 0 6px rgba(200,164,93,0.5))" }} />
              <GaneshaOrnament size={16} className="opacity-60" />
            </div>
            <span className="h-px w-20" style={{ background: "linear-gradient(to left, transparent, var(--color-gold-dim))" }} />
          </div>
        </div>
        <p className="mt-1.5 font-cinzel uppercase tracking-[0.28em]" style={{ fontSize: "clamp(0.62rem, 2.2vw, 0.75rem)", color: "var(--color-gold-accent)", ...step(5) }}>
          शुभ विवाह ✦ मंगलम्
        </p>
        <div className="mt-10" style={{ ...step(6) }}>
          <button
            onClick={onOpen}
            className="group relative overflow-hidden px-10 py-4 cursor-pointer"
            style={{ border: "1px solid var(--color-gold-border-md)" }}
            aria-label="Open Invite"
          >
            <Shimmer />
            <span className="relative font-cinzel uppercase tracking-[0.4em] text-gold-light" style={{ fontSize: "clamp(0.62rem, 2.4vw, 0.72rem)" }}>
              Open Invite
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                               */
/* ------------------------------------------------------------------ */

export function Hero() {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black">
      <video muted playsInline autoPlay preload="metadata" className="absolute inset-0 h-full w-full object-cover object-center" style={{ transform: "scale(1.06)" }}>
        <source src="/video/wedding-bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 z-10" style={{ background: "var(--color-black-42)" }} />
      <div className="relative z-20 flex w-full flex-col items-center px-6 text-center sm:px-10">
        <Reveal y={0} scale={0.82} duration={900}>
          <div className="relative mb-6 sm:mb-8" style={{ width: "clamp(90px, 18vw, 160px)", height: "clamp(90px, 18vw, 160px)" }}>
            <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(ellipse 80% 80% at 50% 55%, rgba(200,164,93,0.38) 0%, transparent 70%)", filter: "blur(12px)", transform: "scale(1.3)" }} />
            <img
              alt="श्री गणेशाय नमः"
              src="/images/ganesha.png"
              className="animate-glow"
              style={{ position: "absolute", height: "100%", width: "100%", objectFit: "contain", mixBlendMode: "screen", filter: "drop-shadow(0 0 18px rgba(200,164,93,0.70)) drop-shadow(0 0 6px rgba(255,215,80,0.55))" }}
            />
          </div>
        </Reveal>
        <Reveal y={24} delay={150}>
          <p className="mb-10 font-cinzel uppercase tracking-[0.65em]" style={{ fontSize: "clamp(0.48rem, 1.6vw, 0.6rem)", color: "var(--color-gold-accent)" }}>
            Celebrating Love & Tradition
          </p>
        </Reveal>
        <Reveal y={24} delay={300}>
          <h1 className="font-display" style={{ fontSize: "clamp(2.4rem, 7vw, 5.8rem)", lineHeight: 1.08, letterSpacing: "-0.02em", maxWidth: "16ch", color: "var(--color-name-text)", textShadow: "0 2px 8px rgba(0,0,0,0.8), 0 8px 40px rgba(0,0,0,0.55)" }}>
            You Are Invited To Celebrate Love
          </h1>
        </Reveal>
        <Reveal y={0} delay={500}>
          <div className="mt-10 flex items-center gap-4">
            <span className="block h-px w-14 sm:w-20" style={{ background: "linear-gradient(to right, transparent, var(--color-gold-line), transparent)" }} />
            <span style={{ display: "block", width: 14, height: 1.5, background: "var(--color-gold-line)" }} />
            <span className="block h-px w-14 sm:w-20" style={{ background: "linear-gradient(to right, transparent, var(--color-gold-line), transparent)" }} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Mantra                                                             */
/* ------------------------------------------------------------------ */

export function Mantra() {
  return (
    <section id="invite" className="bg-dark">
      <div className="relative w-full flex items-center justify-center overflow-hidden" style={{ background: "radial-gradient(ellipse at center, var(--color-gold-glow-06) 0%, transparent 70%)", padding: "clamp(2.5rem, 6vw, 4.5rem) clamp(1.25rem, 6vw, 3rem)" }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2" style={{ width: "clamp(60px, 20vw, 120px)", height: 1, background: "linear-gradient(to right, transparent, var(--color-gold-line), transparent)" }} />
        <div className="flex flex-col items-center text-center gap-5 w-full" style={{ maxWidth: 680 }}>
          <Reveal y={20}>
            <span style={{ fontSize: "clamp(1.4rem, 3.5vw, 2rem)", color: "var(--color-gold-light)", filter: "drop-shadow(0 0 10px var(--color-gold-glow-40))", letterSpacing: "0.12em" }}>ॐ</span>
          </Reveal>
          <Reveal scale={0} y={0}>
            <div className="flex items-center gap-3 w-full justify-center">
              <span style={{ display: "block", height: 1, width: "clamp(40px, 12vw, 90px)", background: "linear-gradient(to right, transparent, var(--color-gold-line))" }} />
              <span style={{ display: "block", width: 5, height: 5, borderRadius: "50%", background: "var(--color-gold-accent)", opacity: 0.7 }} />
              <span style={{ display: "block", height: 1, width: "clamp(40px, 12vw, 90px)", background: "linear-gradient(to left, transparent, var(--color-gold-line))" }} />
            </div>
          </Reveal>
          <Reveal y={20} delay={150}>
            <div className="flex flex-col items-center gap-3">
              <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1rem, 2.2vw, 1.12rem)", color: "var(--color-cream)", fontStyle: "italic", letterSpacing: "0.03em", lineHeight: 1.8, opacity: 0.92 }}>
                वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।
              </p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1rem, 2.2vw, 1.12rem)", color: "var(--color-cream)", fontStyle: "italic", letterSpacing: "0.03em", lineHeight: 1.8, opacity: 0.92 }}>
                निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥
              </p>
            </div>
          </Reveal>
          <Reveal y={20} delay={300}>
            <span style={{ fontSize: "clamp(0.62rem, 1.4vw, 0.72rem)", color: "var(--color-gold-accent)", letterSpacing: "0.25em", textTransform: "uppercase" }}>
              — श्री गणेशाय नमः
            </span>
          </Reveal>
        </div>
      </div>
      <OrnamentDivider />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Scratch card                                                       */
/* ------------------------------------------------------------------ */
function FlowerShower({ active }: { active: boolean }) {
  const petals = useMemo(() => {
    const count = 150;

    const petalImages = [
      "/images/petals/petal-1.png",
      "/images/petals/petal-2.png",
      "/images/petals/petal-3.png",
      "/images/petals/petal-4.png",
    ];

    return Array.from({ length: count }, (_, i) => {
      const size = 18 + Math.random() * 28;

      // Slower = smoother and more natural
      const duration = 3 + Math.random() * 1.5;

      // Spread starting times
      const delay = Math.random() * 0.7;

      // Starting position
      const startX = Math.random() * 100;

      // Gentle wind movement
      const drift =
        Math.random() > 0.5
          ? 50 + Math.random() * 110
          : -(50 + Math.random() * 110);

      // Natural rotation
      const rotation =
        Math.random() > 0.5
          ? 360 + Math.random() * 720
          : -(360 + Math.random() * 720);

      const opacity = 0.6 + Math.random() * 0.4;

      const scale = 0.7 + Math.random() * 0.6;

      const image =
        petalImages[
        Math.floor(Math.random() * petalImages.length)
        ];

      return {
        id: i,
        image,
        size,
        duration,
        delay,
        startX,
        drift,
        rotation,
        opacity,
        scale,
      };
    });
  }, []);

  if (!active || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      className="flower-shower"
      aria-hidden="true"
    >
      {petals.map((petal) => (
        <img
          key={petal.id}
          src={petal.image}
          alt=""
          draggable={false}
          className="flower-petal"
          style={
            {
              left: `${petal.startX}vw`,
              width: `${petal.size}px`,
              height: "auto",
              opacity: petal.opacity,

              "--petal-duration": `${petal.duration}s`,
              "--petal-delay": `${petal.delay}s`,
              "--petal-drift": `${petal.drift}px`,
              "--petal-rotation": `${petal.rotation}deg`,
              "--petal-scale": petal.scale,
            } as React.CSSProperties
          }
        />
      ))}
    </div>,
    document.body
  );
}


function ScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [revealed, setRevealed] = useState(false);

  const drawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d", {
      willReadFrequently: true,
    });

    if (!ctx) return;

    const draw = () => {
      const rect = canvas.getBoundingClientRect();

      const dpr = Math.min(
        window.devicePixelRatio || 1,
        2
      );

      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);

      ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
      );

      /*
       * GOLD FOIL
       */
      const g = ctx.createLinearGradient(
        0,
        0,
        rect.width,
        rect.height
      );

      g.addColorStop(
        0,
        "#d3a92e"
      );

      g.addColorStop(
        0.45,
        "#f6d86a"
      );

      g.addColorStop(
        0.7,
        "#c79a20"
      );

      g.addColorStop(
        1,
        "#a87f16"
      );

      ctx.globalAlpha = 1;

      ctx.fillStyle = g;

      ctx.fillRect(
        0,
        0,
        rect.width,
        rect.height
      );


      /*
       * SUBTLE FOIL SHIMMER
       */
      ctx.globalAlpha = 0.18;

      for (
        let i = 0;
        i < rect.width;
        i += 18
      ) {
        ctx.fillStyle =
          i % 36 === 0
            ? "#fff4c2"
            : "#8a6a12";

        ctx.fillRect(
          i,
          0,
          9,
          rect.height
        );
      }

      ctx.globalAlpha = 1;
    };


    draw();

    const onResize = () => {
      draw();
    };

    window.addEventListener(
      "resize",
      onResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        onResize
      );
    };
  }, []);


  const scratch = (
    clientX: number,
    clientY: number
  ) => {
    const canvas = canvasRef.current;

    const ctx =
      canvas?.getContext("2d", {
        willReadFrequently: true,
      });

    if (!canvas || !ctx) return;


    const rect =
      canvas.getBoundingClientRect();


    const x =
      clientX - rect.left;

    const y =
      clientY - rect.top;


    /*
     * REMOVE GOLD
     */
    ctx.globalCompositeOperation =
      "destination-out";


    ctx.beginPath();

    ctx.arc(
      x,
      y,
      30,
      0,
      Math.PI * 2
    );

    ctx.fill();


    /*
     * CHECK SCRATCH %
     */
    const data =
      ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      ).data;


    let clear = 0;


    for (
      let i = 3;
      i < data.length;
      i += 4
    ) {
      if (data[i] < 40) {
        clear++;
      }
    }


    const pct =
      clear /
      (data.length / 4);


    /*
     * FLOWER SHOWER STARTS
     * AFTER 45% SCRATCHED
     */
    if (
      pct > 0.45 &&
      !revealed
    ) {
      setRevealed(true);
    }
  };


  const onPointerDown = (
    e: ReactPointerEvent<HTMLCanvasElement>
  ) => {
    drawing.current = true;

    e.currentTarget.setPointerCapture(
      e.pointerId
    );

    scratch(
      e.clientX,
      e.clientY
    );
  };


  const onPointerMove = (
    e: ReactPointerEvent<HTMLCanvasElement>
  ) => {
    if (!drawing.current) return;

    scratch(
      e.clientX,
      e.clientY
    );
  };


  const onPointerUp = () => {
    drawing.current = false;
  };


  return (
    <>
      {/* FLOWER SHOWER */}
      <FlowerShower
        active={revealed}
      />


      {/* SCRATCH CARD */}
      <div
        className="
          relative
          w-full
          select-none
          overflow-hidden
        "
        style={{
          border:
            "1px solid rgba(200,164,93,0.25)",

          aspectRatio: "16/7",

          background:
            "rgba(18,11,8,0.75)",

          backdropFilter:
            "blur(8px)",
        }}
      >

        {/* MESSAGE UNDER FOIL */}
        <div
          className="
            absolute
            inset-0
            flex
            flex-col
            items-center
            justify-center
            gap-1.5
            px-4
            text-center
          "
        >

          <p
            className="
              font-display
              italic
              text-gold-light
            "
            style={{
              fontSize:
                "clamp(1rem, 3vw, 1.6rem)",
            }}
          >
            शुभ विवाह ✦ मंगलम्
          </p>
          <h3 className="font-serif italic text-gold-heading font-bold leading-none mb-1" style={{ fontSize: "clamp(1.6rem, 7vw, 2.75rem)" }}>
            05 December 2026
          </h3>

          <p
            className="
              font-cinzel
              uppercase
              tracking-[0.3em]
              text-gold
            "
            style={{
              fontSize:
                "clamp(0.5rem, 1.8vw, 0.7rem)",

              opacity: 0.85,
            }}
          >
            With love, Rishabh & Diksha
          </p>

        </div>


        {/* GOLD SCRATCH LAYER */}
        <canvas
          ref={canvasRef}
          className="
            absolute
            inset-0
            h-full
            w-full
            touch-none
          "
          style={{
            cursor: "crosshair",

            opacity:
              revealed ? 0 : 1,

            transition:
              "opacity 0.6s ease",
          }}

          onPointerDown={
            onPointerDown
          }

          onPointerMove={
            onPointerMove
          }

          onPointerUp={
            onPointerUp
          }

          onPointerLeave={
            onPointerUp
          }

          role="img"

          aria-label="
            Scratch the golden foil
            to reveal a message
          "
        />

      </div>
    </>
  );
}
/* ------------------------------------------------------------------ */
/* Countdown + scratch + calendar                                     */
/* ------------------------------------------------------------------ */

export function CountdownSection() {
  const { days, hours, minutes, seconds } = useCountdown(WEDDING_DATE);

  const box = (value: number, label: string, delay: number) => (
    <Reveal y={32} delay={delay} key={label}>
      <div className="flex flex-col items-center gap-3">
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 rounded-sm" style={{ background: "radial-gradient(ellipse at center, var(--color-gold-glow-08) 0%, transparent 70%)" }} />
          <div className="relative flex items-center justify-center" style={{ width: "clamp(72px, 18vw, 108px)", height: "clamp(80px, 20vw, 120px)", border: "1px solid var(--color-gold-border-sm)", background: "var(--color-surface)", backdropFilter: "blur(8px)" }}>
            <CornerBrackets size={12} inset={6} />
            <span className="font-display font-light" style={{ fontSize: "clamp(2.2rem, 7vw, 3.8rem)", lineHeight: 1, letterSpacing: "-0.04em", color: "var(--color-name-text)", textShadow: "0 0 30px var(--color-gold-glow-25)", fontVariantNumeric: "tabular-nums" }}>
              {value}
            </span>
          </div>
        </div>
        <span className="font-cinzel uppercase tracking-[0.38em] text-gold" style={{ fontSize: "clamp(0.48rem, 1.4vw, 0.62rem)", opacity: 0.75 }}>
          {label}
        </span>
      </div>
    </Reveal>
  );

  const dot = (delay: number) => (
    <Reveal y={32} delay={delay} key={`dot-${delay}`}>
      <div className="mb-8 flex flex-col gap-2 self-center">
        <span className="block h-1 w-1 rounded-full bg-gold opacity-50" />
        <span className="block h-1 w-1 rounded-full bg-gold opacity-25" />
      </div>
    </Reveal>
  );

  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden px-6 py-24 sm:py-32" style={{ background: "var(--color-dark)" }}>
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 65% 50% at 50% 50%, var(--color-gold-glow-05) 0%, transparent 70%)" }} />
      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center">
        <Reveal y={32}>
          <p className="mb-8 font-cinzel uppercase tracking-[0.6em] text-gold" style={{ fontSize: "clamp(0.85rem, 1.5vw, 0.9rem)" }}>
            Until Two Souls Become One
          </p>
        </Reveal>

        <div className="flex items-start gap-1.5 sm:gap-5 mb-5">
          {box(days, "Days", 100)}
          {dot(200)}
          {box(hours, "Hours", 300)}
          {dot(400)}
          {box(minutes, "Minutes", 500)}
          {dot(600)}
          {box(seconds, "Seconds", 700)}
        </div>

        <div className="flex w-full flex-col items-center gap-5">
          <Reveal y={24} delay={300} className="w-full">
            <ScratchCard />
          </Reveal>
          <Reveal y={24} delay={400}>
            <p className="uppercase tracking-[0.2em]" style={{ color: "var(--color-gold-accent)", opacity: 0.7, fontSize: "clamp(0.6rem, 1.8vw, 0.7rem)" }}>
              ✦&nbsp;&nbsp;Scratch The Golden Foil&nbsp;&nbsp;✦
            </p>
          </Reveal>
        </div>

        <Reveal y={32} delay={500}>
          <div className="mt-8">
            <a
              href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Rishabh%20%26%20Diksha%20Wedding&details=You%20are%20cordially%20invited%20to%20celebrate%20the%20wedding%20of%20Rishabh%20%26%20Diksha.&location=Karwaan%20Celebrations%2C%20Plot%20no%2064%2C%20Bhagyashree%20Nagar%2C%20Kharbi%20Road%2C%20Nagpur%20-%20440024&dates=20261205T190000%2F20261205T235900&ctz=Asia%2FKolkata"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 overflow-hidden px-8 py-3.5"
              style={{ border: "1px solid rgba(200,164,93,0.35)" }}
            >
              <Shimmer />
              <CalendarIcon size={13} />
              <span className="relative font-cinzel uppercase tracking-[0.42em] text-gold-light" style={{ fontSize: "clamp(0.65rem, 1.8vw, 0.58rem)", opacity: 0.85 }}>
                Add To Calendar
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Story                                                              */
/* ------------------------------------------------------------------ */

const storySteps = [
  {
    title: "The Meeting",
    text: "दो परिवार मिले, रिश्ते जुड़े और दो दिलों के मिलन की सुंदर शुरुआत हुई।",
  },
  {
    title: "The Knowing",
    text: "एक-दूसरे को समझते-समझते यह एहसास हुआ कि यही वह साथ है जिसका इंतज़ार था।",
  },
  {
    title: "The Promise",
    text: "बड़ों के आशीर्वाद और अपनों के प्रेम के साथ, हमने जीवनभर साथ चलने का संकल्प लिया।",
  },
  {
    title: "Forever Begins",
    text: "प्रेम के इस पावन बंधन के साथ, हमारी नई और खूबसूरत यात्रा आज से आरंभ होती है।",
  },
];

export function Story() {
  return (
    <section className="relative overflow-hidden px-6 py-24 sm:py-32" style={{ background: "var(--color-dark)" }}>
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 55% at 30% 50%, var(--color-gold-glow-04) 0%, transparent 70%)" }} />
      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading eyebrow="How It All Began" title="Our Story" />

        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16 xl:gap-24">
          <Reveal x={-40} y={0} className="relative mx-auto w-full max-w-sm shrink-0 lg:mx-0 lg:w-[38%]">
            <div className="absolute -inset-3 rounded-sm" style={{ border: "1px solid var(--color-gold-border-xs)" }} />
            <span className="absolute -top-3 -left-3 h-5 w-5 border-t border-l" style={{ borderColor: "var(--color-gold-line)" }} />
            <span className="absolute -top-3 -right-3 h-5 w-5 border-t border-r" style={{ borderColor: "var(--color-gold-line)" }} />
            <span className="absolute -bottom-3 -left-3 h-5 w-5 border-b border-l" style={{ borderColor: "var(--color-gold-line)" }} />
            <span className="absolute -bottom-3 -right-3 h-5 w-5 border-b border-r" style={{ borderColor: "var(--color-gold-line)" }} />
            <div className="relative overflow-hidden rounded-sm" style={{ aspectRatio: "3/4" }}>
              <img alt="Rishabh & Diksha" src="/images/couple/hero-portrait.jpg" className="object-cover object-center" style={{ position: "absolute", height: "100%", width: "100%", left: 0, top: 0 }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, var(--color-surface) 0%, var(--color-surface-xs) 50%, var(--color-surface-sm) 100%)" }} />
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap px-5 py-2" style={{ background: "var(--color-surface-dark)", border: "1px solid var(--color-gold-glow-25)", backdropFilter: "blur(8px)" }}>
              <p className="font-display text-gold-light" style={{ fontSize: "clamp(1rem, 2.5vw, 1.3rem)", letterSpacing: "-0.01em" }}>
                Rishabh<span className="mx-2 font-display italic text-gold" style={{ fontSize: "0.8em" }}>&</span>Diksha
              </p>
            </div>
          </Reveal>

          <div className="flex-1 pt-2">
            <Reveal y={36} className="mb-10">
              <p className="max-w-xl font-body font-light leading-relaxed tracking-wider" style={{ fontSize: "clamp(0.88rem, 2vw, 1rem)", color: "var(--color-muted)" }}>
                Some love stories are written in the stars — ours began with a single glance across a crowded room and has only grown more beautiful with every passing season.
              </p>
            </Reveal>

            {storySteps.map((s, i) => (
              <Reveal y={36} delay={i * 100} key={s.title}>
                <div className="relative flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full border border-gold" style={{ background: "var(--color-dark)", boxShadow: "0 0 8px var(--color-gold-bracket)" }} />
                    {i < storySteps.length - 1 && (
                      <div className="mt-2 w-px flex-1" style={{ background: "linear-gradient(to bottom, var(--color-gold-glow-35), var(--color-gold-glow-06))", minHeight: 100 }} />
                    )}
                  </div>
                  <div className="pb-16 sm:pb-20" style={i === storySteps.length - 1 ? { paddingBottom: 0 } : undefined}>
                    <h4 className="mb-3 font-display" style={{ fontSize: "clamp(1.3rem, 3.5vw, 1.75rem)", letterSpacing: "-0.02em", color: "var(--color-name-text)" }}>
                      {s.title}
                    </h4>
                    <p className="font-body font-light leading-relaxed tracking-wider text-muted" style={{ fontSize: "clamp(0.88rem, 2vw, 1rem)" }}>
                      {s.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Bride & Groom                                                      */
/* ------------------------------------------------------------------ */

export function BrideGroom() {
  return (
    <section className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 overflow-hidden" style={{ background: "var(--color-dark)" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 55% 40% at 50% 50%, var(--color-gold-glow-04) 0%, transparent 100%)" }} />
      <Reveal y={24} className="relative w-full max-w-[340px] sm:max-w-sm md:max-w-md mx-auto bg-dark3 rounded-sm px-6 sm:px-8 md:px-10 py-10 sm:py-12 md:py-14 text-center" style={{ border: "1px solid var(--color-gold-border-sm)", boxShadow: "0 0 40px var(--color-gold-glow-04), inset 0 0 28px var(--color-gold-glow-03)" }}>
        <CornerFlourish size={32} className="absolute w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 top-3 left-3" style={{ color: "var(--color-gold)", opacity: 0.45 }} />
        <CornerFlourish size={32} className="absolute w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 top-3 right-3" style={{ color: "var(--color-gold)", opacity: 0.45, transform: "scaleX(-1)" }} />
        <CornerFlourish size={32} className="absolute w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bottom-3 left-3" style={{ color: "var(--color-gold)", opacity: 0.45, transform: "scaleY(-1)" }} />
        <CornerFlourish size={32} className="absolute w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bottom-3 right-3" style={{ color: "var(--color-gold)", opacity: 0.45, transform: "scale(-1,-1)" }} />

        <p className="font-cinzel uppercase mb-2 sm:mb-3" style={{ fontSize: "clamp(1.5rem, 1.8vw, 0.75rem)", letterSpacing: "0.15em", color: "var(--color-gold)", opacity: 0.9 }}>
          वर परिचय
        </p>
        <h3 className="font-display text-gold-heading font-light leading-none mb-1" style={{ fontSize: "clamp(1.6rem, 7vw, 2.75rem)" }}>
          Rishabh
        </h3>
        <p className="font-display italic mb-4 sm:mb-6" style={{ fontSize: "clamp(0.88rem, 2vw, 1rem)", color: "var(--color-cream)", opacity: 0.85 }}>
          The Groom
        </p>
        <p className="font-body leading-relaxed" style={{ fontSize: "clamp(0.88rem, 2vw, 1rem)", color: "var(--color-cream)", opacity: 0.88 }}>
          S/o. Smt. Jyoti Sonpure
        </p>
        <p className="font-body my-1" style={{ fontSize: "clamp(0.88rem, 2vw, 1rem)", color: "var(--color-gold)" }}>
          &
        </p>
        <p className="font-body leading-relaxed mb-2" style={{ fontSize: "clamp(0.88rem, 2vw, 1rem)", color: "var(--color-cream)", opacity: 0.88 }}>
          Sh. Deepak Sonpure
        </p>
        <p className="font-cinzel uppercase mt-2" style={{ fontSize: "clamp(0.62rem, 1.6vw, 0.72rem)", letterSpacing: "0.25em", color: "var(--color-gold-accent)", opacity: 0.8 }}>
          [Itarsi, M.P.]
        </p>


        <div className="flex items-center justify-center gap-3 sm:gap-4 my-8 sm:my-10">
          <div className="h-px flex-1" style={{ background: "linear-gradient(to right, transparent, var(--color-gold-glow-35))" }} />
          <span className="font-display leading-none select-none" style={{ fontSize: "clamp(1.75rem, 7vw, 2.5rem)", color: "var(--color-gold)" }}>
            &
          </span>
          <div className="h-px flex-1" style={{ background: "linear-gradient(to left, transparent, var(--color-gold-glow-35))" }} />
        </div>

        <p className="font-cinzel uppercase mb-2 sm:mb-3" style={{ fontSize: "clamp(1.5rem, 1.8vw, 0.75rem)", letterSpacing: "0.15em", color: "var(--color-gold)", opacity: 0.9 }}>
          वधू परिचय
        </p>
        <h3 className="font-display text-gold-heading font-light leading-none mb-1" style={{ fontSize: "clamp(1.6rem, 7vw, 2.75rem)" }}>
          Diksha
        </h3>
        <p className="font-display italic mb-4 sm:mb-6" style={{ fontSize: "clamp(0.88rem, 2vw, 1rem)", color: "var(--color-cream)", opacity: 0.85 }}>
          The Bride
        </p>
        <p className="font-body leading-relaxed" style={{ fontSize: "clamp(0.88rem, 2vw, 1rem)", color: "var(--color-cream)", opacity: 0.88 }}>
          D/o. Smt. Seema Binjwe
        </p>
        <p className="font-body my-1" style={{ fontSize: "clamp(0.88rem, 2vw, 1rem)", color: "var(--color-gold)" }}>
          &
        </p>
        <p className="font-body leading-relaxed mb-2" style={{ fontSize: "clamp(0.88rem, 2vw, 1rem)", color: "var(--color-cream)", opacity: 0.88 }}>
          Sh. Jagdish Binjwe
        </p>
        <p className="font-cinzel uppercase mt-2" style={{ fontSize: "clamp(0.62rem, 1.6vw, 0.72rem)", letterSpacing: "0.25em", color: "var(--color-gold-accent)", opacity: 0.8 }}>
          [Andhariya,Amla, M.P.]
        </p>

        <Reveal y={16} delay={500}>
          <div className="mt-10 sm:mt-12">
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="h-px w-10 sm:w-12" style={{ background: "linear-gradient(to right, transparent, var(--color-gold-glow-35))" }} />
              <span className="select-none" style={{ color: "var(--color-gold)", opacity: 0.7, fontSize: "0.75rem" }}>
                ✦
              </span>
              <div className="h-px w-10 sm:w-12" style={{ background: "linear-gradient(to left, transparent, var(--color-gold-glow-35))" }} />
            </div>
            <p className="font-display italic" style={{ fontSize: "clamp(0.88rem, 2vw, 1rem)", color: "var(--color-cream)", opacity: 0.8 }}>
              सर्वे भवन्तु सुखिनः — May all be happy.
            </p>
          </div>
        </Reveal>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Events                                                             */
/* ------------------------------------------------------------------ */

export function Events() {
  return (
    <section className="relative overflow-hidden px-4 py-24 sm:px-6 sm:py-32" style={{ background: "var(--color-dark)" }}>
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 40% at 50% 20%, var(--color-gold-glow-08) 0%, transparent 70%)" }} />
      <div className="relative z-10 mx-auto max-w-5xl">
        <SectionHeading eyebrow="Celebrate With Us" title="Wedding Celebrations" />

        <div className="relative flex flex-col">
          <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 lg:block" style={{ background: "linear-gradient(to bottom, transparent 0%, var(--color-gold-glow-20) 8%, var(--color-gold-glow-20) 92%, transparent 100%)" }} />
          <div className="flex flex-col gap-5">
            {events.map((ev) => {
              const Icon = ev.icon;
              return (
                <Reveal y={40} key={ev.title}>
                  <div className="relative flex flex-col overflow-hidden lg:flex-row" style={{ border: "1px solid var(--color-gold-border-sm)" }}>
                    <div
                      className={`relative order-1 h-56 w-full overflow-hidden lg:h-auto lg:w-[42%] ${ev.reverse ? "lg:order-2" : "lg:order-1"}`}>
                      <img alt={ev.title} src={ev.image} loading="lazy" className="object-cover object-center" style={{ position: "absolute", height: "100%", width: "100%", left: 0, top: 0 }} />
                      <div className="absolute inset-0" style={{ background: ev.reverse ? "linear-gradient(to left, var(--color-surface-2xs) 50%, var(--color-surface-lg) 100%)" : "linear-gradient(to right, var(--color-surface-2xs) 50%, var(--color-surface-lg) 100%)" }} />
                      <div className="absolute inset-0 lg:hidden" style={{ background: "transparent" }} />
                    </div>
                    <div className={`relative order-2 flex flex-1 flex-col justify-center px-8 py-9 sm:px-10 lg:py-10 ${ev.reverse ? "lg:order-1" : "lg:order-2"}`} style={{background: "var(--color-surface-content)",backdropFilter: "blur(8px)",}}>
                      <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="inline-block" style={{ width: 18, height: 2, background: "var(--color-gold-line)" }} />
                          <span className="font-cinzel uppercase tracking-[0.42em] text-gold" style={{ fontSize: "0.9rem", opacity: 0.9 }}>
                            {ev.day} &nbsp;·&nbsp; {ev.date}
                          </span>
                        </div>
                        <span className="text-gold opacity-80" style={{ filter: "drop-shadow(0 0 6px var(--color-gold-glow-40))" }}>
                          <Icon size={22} />
                        </span>
                      </div>
                      <h3 className="mb-4 font-display" style={{ fontSize: "clamp(2rem, 4.5vw, 2.8rem)", lineHeight: 0.93, letterSpacing: "-0.03em", color: "var(--color-name-text)" }}>
                        {ev.title}
                      </h3>
                      <div className="flex flex-col gap-4">
                        <div>
                          <p className="mb-0.5 font-cinzel uppercase tracking-[0.25em] text-gold" style={{ fontSize: "0.85rem", opacity: 0.8 }}>
                            {ev.tagline}
                          </p>
                          <p className="font-display tracking-wide" style={{ fontSize: "clamp(1.2rem, 2.2vw, 1.5rem)", color: "var(--color-name-text)" }}>
                            {ev.time}
                          </p>
                        </div>
                        <div className="h-px w-12" style={{ background: "var(--color-gold-glow-35)" }} />
                        <div>
                          <p className="mb-0.5 font-cinzel uppercase tracking-[0.35em] text-gold" style={{ fontSize: "0.85rem", opacity: 0.8 }}>
                            {ev.note}
                          </p>
                          {ev.venue && (
                            <p className="font-display" style={{ fontSize: "clamp(1.3rem, 2.8vw, 1.6rem)", lineHeight: 1.25, color: "var(--color-name-text)" }}>
                              {ev.venue}
                            </p>
                          )}
                          {ev.address && (
                            <p className="mt-2 font-body font-light text-muted" style={{ fontSize: "clamp(1rem, 1.9vw, 1.1rem)", lineHeight: 1.6, opacity: 0.95 }}>
                              {ev.address}
                            </p>
                          )}
                          {ev.map && (
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-3 inline-flex items-center gap-2 rounded-sm border px-3 py-2 font-cinzel uppercase tracking-[0.15em] text-gold transition-opacity hover:opacity-70"
                              style={{ fontSize: "0.8rem", opacity: 0.95, borderColor: "var(--color-gold-glow-35)" }}
                              href={ev.map}
                            >
                              <MapPinIcon size={14} />
                              View on Map
                            </a>
                          )}
                          {ev.dressCode && (
                            <div className="mt-4 flex items-center gap-2">
                              <span className="font-cinzel uppercase tracking-[0.25em] text-gold" style={{ fontSize: "0.7rem", opacity: 0.75 }}>
                                Dress Code
                              </span>
                              <span className="h-px w-4" style={{ background: "var(--color-gold-glow-35)" }} />
                              <span className="font-display" style={{ fontSize: "0.95rem", color: "var(--color-name-text)" }}>
                                {ev.dressCode}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Gallery                                                            */
/* ------------------------------------------------------------------ */

const gallery = [
  { src: "/images/couple/fort-view.jpeg", alt: "Bride and groom making memories" },
  { src: "/images/couple/couple.jpg", alt: "Bride and groom" },
];

export function Gallery() {
  return (
    <section className="relative overflow-hidden px-4 py-24 sm:px-6 sm:py-32" style={{ background: "var(--color-dark)" }}>
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 40% at 50% 10%, var(--color-gold-glow-04) 0%, transparent 70%)" }} />
      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading eyebrow="Moments Together" title="The Gallery" />

        <div className="gap-3 sm:gap-4" style={{ columnCount: "var(--cols, 2)", columnGap: "inherit" }}>
          <style>{`@media (min-width: 768px) { :root { --cols: 3; } } @media (max-width: 767px) { :root { --cols: 2; } }`}</style>
          {gallery.map((g, i) => (
            <Reveal y={32} scale={0.98} delay={i * 150} key={g.src} className="mb-3 break-inside-avoid sm:mb-4">
              <div className="group relative cursor-pointer overflow-hidden" style={{ aspectRatio: "2/3", border: "1px solid var(--color-gold-glow-10)" }}>
                <img alt={g.alt} src={g.src} loading="lazy" className="object-cover object-center transition-transform duration-700 group-hover:scale-105" style={{ position: "absolute", height: "100%", width: "100%", left: 0, top: 0 }} />
                <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "linear-gradient(to top, var(--color-surface-lg) 0%, var(--color-surface-2xs) 60%)" }} />
                <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0" style={{ transform: "translateY(8px)" }}>
                  <span className="font-cinzel uppercase tracking-[0.4em] text-gold-light" style={{ fontSize: "0.6rem" }}>
                    View
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Blessings form                                                     */
/* ------------------------------------------------------------------ */

export function Blessings() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("");
  const [message, setMessage] = useState("");

  const submit = () => {
    setSent(true);
    try {
      const list = JSON.parse(localStorage.getItem("blessings") || "[]");
      list.push({ name, relation, message, at: new Date().toISOString() });
      localStorage.setItem("blessings", JSON.stringify(list));
    } catch {
      /* ignore */
    }
    setName("");
    setRelation("");
    setMessage("");
    setTimeout(() => setSent(false), 3500);
  };

  const inputStyle: CSSProperties = {
    background: "var(--color-white-03)",
    border: "1px solid var(--color-gold-border-sm)",
    color: "var(--color-cream)",
    outline: "none",
    width: "100%",
    fontFamily: "var(--font-body)",
    fontSize: "0.875rem",
    padding: "12px 16px",
    borderRadius: 2,
    transition: "border-color 0.2s",
  };

  return (
    <section className="relative overflow-hidden px-6 py-24 sm:py-32" style={{ background: "var(--color-dark)" }}>
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 65% 55% at 50% 50%, var(--color-gold-glow-06) 0%, transparent 70%)" }} />
      <div className="relative z-20 mx-auto flex max-w-lg flex-col items-center text-center">
        <Reveal y={24}>
          <div className="mb-4">
            <HeartIcon size={22} className="text-gold" style={{ opacity: 0.7 }} />
          </div>
        </Reveal>
        <Reveal y={24} delay={100}>
          <p className="mb-5 font-cinzel uppercase tracking-[0.5em] text-gold" style={{ fontSize: "clamp(0.72rem, 1.8vw, 0.82rem)" }}>
            Your Presence, Our Blessing
          </p>
        </Reveal>
        <Reveal y={24} delay={200}>
          <h2 className="font-display text-gold-heading" style={{ fontSize: "clamp(2.8rem, 8vw, 5.5rem)", lineHeight: 0.9, letterSpacing: "-0.03em" }}>
            Send Blessings
          </h2>
        </Reveal>
        <Reveal y={24} delay={300}>
          <div className="my-7 flex items-center gap-4">
            <span className="block h-px w-14" style={{ background: "linear-gradient(to right, transparent, var(--color-gold-line-md), transparent)" }} />
            <span style={{ display: "block", width: 18, height: 2, background: "var(--color-gold-line-md)" }} />
            <span className="block h-px w-14" style={{ background: "linear-gradient(to right, transparent, var(--color-gold-line-md), transparent)" }} />
          </div>
        </Reveal>
        <Reveal y={24} delay={400}>
          <p className="mb-10 font-body font-light leading-relaxed tracking-wider text-muted" style={{ fontSize: "clamp(0.97rem, 2.1vw, 1rem)" }}>
            Your warm wishes and heartfelt blessings would mean the world to us as we begin this beautiful journey together.
          </p>
        </Reveal>

        <Reveal y={24} delay={500} className="w-full">
          <div className="w-full flex flex-col gap-4">
            <div className="flex gap-3">
              <div className="flex flex-col gap-1.5 text-left flex-1">
                <label className="font-cinzel uppercase tracking-[0.25em]" style={{ fontSize: "0.65rem", color: "var(--color-gold)", opacity: 0.5 }}>
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={(e) => (e.target.style.borderColor = "var(--color-gold-border-md)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--color-gold-border-sm)")}
                  style={inputStyle}
                />
              </div>
              <div className="flex flex-col gap-1.5 text-left w-32 shrink-0">
                <label className="font-cinzel uppercase tracking-[0.25em]" style={{ fontSize: "0.65rem", color: "var(--color-gold)", opacity: 0.5 }}>
                  Relation
                </label>
                <input
                  type="text"
                  placeholder="Friend"
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  onFocus={(e) => (e.target.style.borderColor = "var(--color-gold-border-md)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--color-gold-border-sm)")}
                  style={inputStyle}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5 text-left">
              <label className="font-cinzel uppercase tracking-[0.25em]" style={{ fontSize: "0.65rem", color: "var(--color-gold)", opacity: 0.5 }}>
                Message
              </label>
              <textarea
                rows={3}
                placeholder="Your wishes..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{ ...inputStyle, resize: "none" }}
              />
            </div>
            <button
              onClick={submit}
              disabled={!name.trim() || !message.trim()}
              className="group relative mt-1 w-full overflow-hidden disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <div className="relative flex items-center justify-center gap-2 px-8 py-3" style={{ border: "1px solid var(--color-gold-border-md)", background: "var(--color-gold-glow-06)" }}>
                <span className="absolute inset-0 -translate-x-full -skew-x-12 transition-transform duration-700 ease-out group-hover:translate-x-full group-disabled:hidden" style={{ background: "linear-gradient(105deg, transparent 30%, var(--color-gold-shimmer) 50%, transparent 70%)" }} />
                <SendIcon size={14} className="relative text-gold" />
                <span className="relative font-cinzel uppercase tracking-[0.3em] text-gold-light" style={{ fontSize: "0.65rem" }}>
                  {sent ? "Blessing Sent ❤" : "Send"}
                </span>
              </div>
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Family & Friends                                                   */
/* ------------------------------------------------------------------ */

export function Family() {
  return (
    <section className="relative overflow-hidden px-5 py-16 sm:py-24" style={{ background: "var(--color-dark)" }}>
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 45% at 50% 30%, rgba(200,164,93,0.07) 0%, transparent 65%)" }} />
      <div className="relative z-10 mx-auto flex flex-col max-w-sm sm:max-w-2xl lg:max-w-5xl">
        <div className="mb-12">
          <Reveal y={22}>
            <div className="flex flex-col items-center text-center mb-7">
              <p className="mb-4 font-cinzel uppercase tracking-[0.3em] text-gold" style={{ fontSize: "clamp(1.5rem, 2vw, 1.3rem)", opacity: 1.2 }}>
                ✦ परिवार ✦
              </p>
              <h2 className="font-display text-gold-heading" style={{ fontSize: "clamp(3.5rem, 8vw, 5.5rem)", lineHeight: 1.1, letterSpacing: "-0.03em", fontWeight: 300 }}>
                Family & Loved Ones
              </h2>
              <div className="mb-4 mt-6 flex items-center gap-4">
                <span className="block h-px w-16" style={{ background: "linear-gradient(to right, transparent, rgba(200,164,93,0.55), transparent)" }} />
                <span className="text-gold opacity-70" style={{ fontSize: "0.6rem" }}>
                  ✦
                </span>
                <span className="block h-px w-16" style={{ background: "linear-gradient(to right, transparent, rgba(200,164,93,0.55), transparent)" }} />
              </div>
            </div>
          </Reveal>
          <div className="grid grid-cols-3 gap-3">
            {familyMembers.map((m, i) => (
              <div
                key={m.relation}
                className={
                  i === 0
                    ? "col-span-2"
                    : i === 1
                      ? "col-span-1"
                      : "col-span-3"
                }
              >
                <Reveal y={16} scale={0.97} delay={i * 120}>
                  <div
                    className="flex flex-col items-center relative overflow-hidden w-full"
                    style={{
                      border: "1px solid rgba(200,164,93,0.22)",
                      background: "rgba(255,255,255,0.02)",
                      borderRadius: 16,
                    }}
                  >
                    <span
                      className="absolute top-0 left-[10%] right-[10%] block h-px z-10"
                      style={{
                        background:
                          "linear-gradient(to right, transparent, rgba(200,164,93,0.5), transparent)",
                      }}
                    />

                    <div
                      className="relative w-full"
                      style={{ aspectRatio: m.aspect }}
                    >
                      <img
                        alt={m.name[0]}
                        src={m.image}
                        loading="lazy"
                        className="object-cover object-top"
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          left: 0,
                          top: 0,
                          borderRadius: "16px 16px 0 0",
                        }}
                      />

                      <div
                        className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(10,8,5,0.75) 0%, transparent 100%)",
                        }}
                      />
                    </div>

                    <div
                      className="flex flex-col items-center gap-1 w-full px-3 py-3"
                      style={{
                        background: "rgba(255,255,255,0.018)",
                        borderTop: "1px solid rgba(200,164,93,0.12)",
                      }}
                    >
                      <p
                        className="font-display text-center"
                        style={{
                          fontSize: m.name.length > 1 ? "1rem" : "1.2rem",
                          fontStyle: "italic",
                          fontWeight: 300,
                          lineHeight: 1.3,
                          margin: 0,
                          color: "var(--color-cream)",
                        }}
                      >
                        {m.name[0]}

                        {m.name[1] && (
                          <>
                            {" "}
                            <span
                              style={{
                                color: "rgba(200,164,93,0.6)",
                                fontSize: "0.85em",
                              }}
                            >
                              &
                            </span>{" "}
                            {m.name[1]}
                          </>
                        )}
                      </p>

                      <p
                        className="font-cinzel uppercase text-center text-gold-dim"
                        style={{
                          fontSize: "0.72rem",
                          letterSpacing: "0.1em",
                        }}
                      >
                        {m.relation}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>

        <OrnamentDivider />

        <div>
          <Reveal y={22}>
            <div className="flex flex-col items-center text-center mb-7">
              <p className="mb-4 font-cinzel uppercase tracking-[0.3em] text-gold" style={{ fontSize: "clamp(1.5rem, 2vw, 1.3rem)", opacity: 1.2 }}>
                ✦ मित्र ✦
              </p>
              <h2 className="font-display text-gold-heading" style={{ fontSize: "clamp(3.5rem, 8vw, 5.5rem)", lineHeight: 1.1, letterSpacing: "-0.03em", fontWeight: 300 }}>
                Friends
              </h2>
              <div className="mb-4 mt-6 flex items-center gap-4">
                <span className="block h-px w-16" style={{ background: "linear-gradient(to right, transparent, rgba(200,164,93,0.55), transparent)" }} />
                <span className="text-gold opacity-70" style={{ fontSize: "0.6rem" }}>
                  ✦
                </span>
                <span className="block h-px w-16" style={{ background: "linear-gradient(to right, transparent, rgba(200,164,93,0.55), transparent)" }} />
              </div>
            </div>
          </Reveal>
          <div className="flex flex-wrap justify-center gap-2">
            {friends.map((f, i) => (
              <Reveal scale={0.93} y={0} delay={i * 80} key={f}>
                <div className="flex items-center gap-2" style={{ padding: "9px 15px", border: "1px solid rgba(200,164,93,0.19)", background: "rgba(255,255,255,0.015)", borderRadius: 8 }}>
                  <span style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(200,164,93,0.48)", flexShrink: 0 }} />
                  <span className="font-display" style={{ fontSize: "0.92rem", color: "rgba(245,239,230,0.82)", fontStyle: "italic", fontWeight: 300, whiteSpace: "nowrap" }}>
                    {f}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal y={22} delay={300}>
            <p className="font-cinzel uppercase text-center mt-6" style={{ fontSize: "0.65rem", letterSpacing: "0.55em", color: "rgba(200, 164, 93, 0.85)" }}>
              With love & blessings
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Venue                                                              */
/* ------------------------------------------------------------------ */

export function Venue() {
  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28" style={{ background: "var(--color-dark)" }}>
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 40% at 50% 80%, var(--color-gold-glow-04) 0%, transparent 70%)" }} />
      <div className="relative z-10 mx-auto max-w-5xl">
        <SectionHeading eyebrow="Find Your Way To Us" title="The Venue" />
        <p className="font-cinzel uppercase text-center mt-6" style={{ fontSize: "0.55rem", letterSpacing: "0.55em", color: "rgba(225, 183, 100, 0.76)" }}>
          Click on Map for Directions
        </p>
        <Reveal y={24}>
          <div className="group relative overflow-hidden" style={{ border: "1px solid var(--color-gold-border-sm)" }}>
            <span className="absolute top-3 left-3 z-10 h-4 w-4 border-t border-l" style={{ borderColor: "var(--color-gold-bracket)" }} />
            <span className="absolute top-3 right-3 z-10 h-4 w-4 border-t border-r" style={{ borderColor: "var(--color-gold-bracket)" }} />
            <span className="absolute bottom-3 left-3 z-10 h-4 w-4 border-b border-l" style={{ borderColor: "var(--color-gold-bracket)" }} />
            <span className="absolute bottom-3 right-3 z-10 h-4 w-4 border-b border-r" style={{ borderColor: "var(--color-gold-bracket)" }} />
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=21.1107323,79.1778251"
              target="_blank"
              rel="noopener noreferrer"
              className="block relative"
            >
              <iframe
                src="https://maps.google.com/maps?q=21.1107323,79.1778251&z=17&output=embed"
                width="100%"
                height="420"
                style={{ border: 0, display: "block", pointerEvents: "none", filter: "grayscale(35%) sepia(22%) brightness(0.80) contrast(1.06)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Wedding Venue"
              />
              <div className="pointer-events-none absolute inset-0" style={{ background: "var(--color-surface-2xs)", mixBlendMode: "multiply" }} />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-400 group-hover:opacity-100" style={{ background: "var(--color-surface-hover)" }}>
                <span className="font-cinzel uppercase tracking-[0.45em] text-gold-light" style={{ fontSize: "clamp(0.72rem, 2vw, 0.78rem)" }}>
                  Get Directions
                </span>
              </div>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Closing                                                            */
/* ------------------------------------------------------------------ */

export function Closing() {
  return (
    <section className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 overflow-hidden" style={{ background: "var(--color-dark)" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 55% 40% at 50% 50%, var(--color-gold-glow-04) 0%, transparent 100%)" }} />
      <Reveal y={24} className="relative w-full max-w-[340px] sm:max-w-sm md:max-w-md mx-auto bg-dark3 rounded-sm px-6 sm:px-8 md:px-10 py-14 sm:py-16 md:py-20 text-center" style={{ border: "1px solid var(--color-gold-border-sm)", boxShadow: "0 0 40px var(--color-gold-glow-04), inset 0 0 28px var(--color-gold-glow-03)" }}>
        <CornerFlourish size={22} className="absolute w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 top-3 left-3" style={{ color: "var(--color-gold)", opacity: 0.65 }} />
        <CornerFlourish size={22} className="absolute w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 top-3 right-3" style={{ color: "var(--color-gold)", opacity: 0.65, transform: "scaleX(-1)" }} />
        <CornerFlourish size={22} className="absolute w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 bottom-3 left-3" style={{ color: "var(--color-gold)", opacity: 0.65, transform: "scaleY(-1)" }} />
        <CornerFlourish size={22} className="absolute w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 bottom-3 right-3" style={{ color: "var(--color-gold)", opacity: 0.65, transform: "scale(-1,-1)" }} />

        <p className="font-body leading-relaxed tracking-wide mx-auto" style={{ fontSize: "clamp(0.95rem, 2.2vw, 1.05rem)", color: "var(--color-cream)", opacity: 0.9, maxWidth: "22rem" }}>
          With the blessings of our families, we invite you to celebrate with us.
        </p>
        <Reveal y={12} delay={150}>
          <h2 className="font-display italic text-gold-heading font-light leading-none my-8 sm:my-10" style={{ fontSize: "clamp(2.4rem, 9vw, 3.5rem)" }}>
            Please Join Us
          </h2>
        </Reveal>
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10">
          <div className="h-px w-10 sm:w-12" style={{ background: "linear-gradient(to right, transparent, var(--color-gold-glow-35))" }} />
          <DividerSymbol size={18} className="text-gold" style={{ opacity: 0.8 }} />
          <div className="h-px w-10 sm:w-12" style={{ background: "linear-gradient(to left, transparent, var(--color-gold-glow-35))" }} />
        </div>
        <p className="font-body leading-relaxed tracking-wider mx-auto" style={{ fontSize: "clamp(1.05rem, 2.6vw, 1.2rem)", color: "var(--color-cream)", opacity: 0.9, maxWidth: "20rem" }}>
          Your presence will make our day even more special. We can’t wait to celebrate with you. ❤️
        </p>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                             */
/* ------------------------------------------------------------------ */

export function Footer() {
  return (
    <footer className="relative overflow-hidden px-6 py-14 sm:py-16" style={{ background: "var(--color-dark)" }}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(to right, transparent, var(--color-gold-glow-35), transparent)" }} />
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 100%, var(--color-gold-glow-05) 0%, transparent 70%)" }} />
      <div className="relative z-10 flex flex-col items-center text-center">
        <Reveal y={20}>
          <h2 className="font-display" style={{ color: "var(--color-name-text)", fontSize: "clamp(2.4rem, 8vw, 5rem)", lineHeight: 0.9, letterSpacing: "-0.03em" }}>
            Rishabh
            <span className="mx-3 font-display italic" style={{ fontSize: "0.55em", color: "var(--color-gold)" }}>
              &
            </span>
            Diksha
          </h2>
        </Reveal>
        <Reveal y={20} delay={100}>
          <div className="my-5 flex items-center gap-4">
            <span className="block h-px w-14" style={{ background: "linear-gradient(to right, transparent, var(--color-gold-line-md), transparent)" }} />
            <span style={{ display: "block", width: 14, height: 2, background: "var(--color-gold-line-md)" }} />
            <span className="block h-px w-14" style={{ background: "linear-gradient(to right, transparent, var(--color-gold-line-md), transparent)" }} />
          </div>
        </Reveal>
        <Reveal y={20} delay={200}>
          <p className="mb-0 font-display italic" style={{ color: "var(--color-gold-accent)", fontSize: "clamp(1rem, 2.5vw, 1.3rem)" }}>
            शुभं भवतु
          </p>
        </Reveal>
        <Reveal y={20} delay={300}>
          <div className="mt-6 flex items-center gap-6">
            <a target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2" href="https://instagram.com/rishabh_3030">
              <InstagramIcon size={15} className="transition-all duration-300 group-hover:text-gold-light" style={{ color: "var(--color-gold-glow-65)" }} />
              <span className="font-cinzel uppercase tracking-[0.38em] transition-opacity duration-300 group-hover:opacity-100" style={{ color: "var(--color-gold)", fontSize: "0.54rem", opacity: 0.65 }}>
                @Rishabh.sonpure
              </span>
            </a>
            <a target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2" href="https://instagram.com/dbinjwe">
              <InstagramIcon size={15} className="transition-all duration-300 group-hover:text-gold-light" style={{ color: "var(--color-gold-glow-65)" }} />
              <span className="font-cinzel uppercase tracking-[0.38em] transition-opacity duration-300 group-hover:opacity-100" style={{ color: "var(--color-gold)", fontSize: "0.54rem", opacity: 0.65 }}>
                @Diksha.binjwe
              </span>
            </a>
          </div>
        </Reveal>

      </div>
    </footer>
  );
}
