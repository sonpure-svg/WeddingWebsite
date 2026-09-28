import {
    useEffect,
    useRef,
    useState,
    type CSSProperties,
    type ReactNode,
  } from "react";
  import { DividerSymbol, GaneshaOrnament } from "./icons";
  
  /** Scroll-triggered reveal wrapper. */
  export function Reveal({
    children,
    y = 28,
    x = 0,
    scale = 1,
    delay = 0,
    duration = 800,
    threshold = 0.15,
    once = true,
    className,
    style,
  }: {
    children: ReactNode;
    y?: number;
    x?: number;
    scale?: number;
    delay?: number;
    duration?: number;
    threshold?: number;
    once?: boolean;
    className?: string;
    style?: CSSProperties;
  }) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
  
    useEffect(() => {
      const el = ref.current;
      if (!el) return;
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisible(true);
              if (once) io.disconnect();
            } else if (!once) {
              setVisible(false);
            }
          });
        },
        { threshold },
      );
      io.observe(el);
      return () => io.disconnect();
    }, [threshold, once]);
  
    return (
      <div
        ref={ref}
        className={className}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible
            ? "none"
            : `translateY(${y}px) translateX(${x}px) scale(${scale})`,
          transition: `opacity ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
          willChange: "opacity, transform",
          ...style,
        }}
      >
        {children}
      </div>
    );
  }
  
  /** Ornamental divider used between every section. */
  export function OrnamentDivider() {
    return (
      <div className="flex items-center justify-center gap-3 my-2">
        <span className="h-px w-20" style={{ background: "linear-gradient(to right, transparent, var(--color-gold-dim))" }} />
        <div className="flex items-center gap-2 text-gold">
          <GaneshaOrnament size={16} className="opacity-60" />
          <DividerSymbol
            size={22}
            style={{ filter: "drop-shadow(0 0 6px rgba(200,164,93,0.5))" }}
          />
          <GaneshaOrnament size={16} className="opacity-60" />
        </div>
        <span className="h-px w-20" style={{ background: "linear-gradient(to left, transparent, var(--color-gold-dim))" }} />
      </div>
    );
  }
  
  /** Four gold corner brackets for framed boxes. */
  export function CornerBrackets({ size = 12, inset = 6 }: { size?: number; inset?: number }) {
    const s = { width: size, height: size, borderColor: "var(--color-gold-bracket)" } as CSSProperties;
    return (
      <>
        <span className="absolute z-10 border-t border-l" style={{ ...s, top: inset, left: inset }} />
        <span className="absolute z-10 border-t border-r" style={{ ...s, top: inset, right: inset }} />
        <span className="absolute z-10 border-b border-l" style={{ ...s, bottom: inset, left: inset }} />
        <span className="absolute z-10 border-b border-r" style={{ ...s, bottom: inset, right: inset }} />
      </>
    );
  }
  
  /** Shimmer sweep overlay for buttons. */
  export function Shimmer() {
    return (
      <span
        className="absolute inset-0 -translate-x-full -skew-x-12 transition-transform duration-700 ease-out group-hover:translate-x-full"
        style={{ background: "linear-gradient(105deg, transparent 30%, var(--color-gold-shimmer) 50%, transparent 70%)" }}
      />
    );
  }
  