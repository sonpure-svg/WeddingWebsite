
import { useState } from "react";
import "./LampAnimation.css";

const lampPositions = [
  { left: "5%", delay: "0s" },
  { left: "78%", delay: "2.75s" },
  { left: "28%", delay: "5.5s" },
  { left: "92%", delay: "8.25s" },
  { left: "48%", delay: "11s" },
  { left: "14%", delay: "13.75s" },
  { left: "65%", delay: "16.5s" },
  { left: "37%", delay: "19.25s" },
];

const sizes = ["small", "medium", "large"];

interface LampAnimationProps {
  active: boolean;
}

export default function LampAnimation({ active }: LampAnimationProps) {
  const [lamps] = useState(() =>
    lampPositions.map((lamp) => ({
      ...lamp,
      size: sizes[Math.floor(Math.random() * sizes.length)],
    }))
  );

  if (!active) return null;

  return (
    <div className="wedding-lamps" aria-hidden="true">
      {lamps.map((lamp, index) => (
        <div
          key={index}
          className="floating-lamp"
          style={{
            left: lamp.left,
            animationDelay: lamp.delay,
            animationDuration: "22s",
          }}
        >
          <div className={`lamp-swing lamp-${lamp.size}`}>
            <div className="lamp-body">
              <div className="lamp-light" />
              <div className="lamp-highlight" />
            </div>
            <div className="lamp-bottom" />
            <div className="lamp-aura" />
          </div>
        </div>
      ))}
    </div>
  );
}
