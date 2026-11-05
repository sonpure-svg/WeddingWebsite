
import { useEffect, useRef } from "react";

interface FireworksBackgroundProps {
    active?: boolean;
}

interface Rocket {
    x: number;
    y: number;
    targetY: number;
    speed: number;
    vx: number;
    color: string;
    size: number;
}

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    alpha: number;
    radius: number;
    color: string;
}

export default function FireworksBackground({
    active = true,
}: FireworksBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!active) return;

        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");

        if (!canvas || !ctx) return;

        let width = 0;
        let height = 0;
        let animationId = 0;
        let lastLaunch = 0;

        let rockets: Rocket[] = [];
        let particles: Particle[] = [];

        const colors = [
            "#FFD700",
            "#F8CC40",
            "#FF69B4",
            "#FFFFFF",
            "#FFA500",
            "#E8C1FF",
            "#FFB6C1",
        ];

        const resize = () => {
            const parent = canvas.parentElement;
            width = parent?.clientWidth || window.innerWidth;
            height = parent?.clientHeight || 650;

            const dpr = Math.min(window.devicePixelRatio || 1, 2);

            canvas.width = width * dpr;
            canvas.height = height * dpr;

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        resize();
        window.addEventListener("resize", resize);

        const launchRocket = () => {
            // Random angle between -20° and +20°
            const angle = (Math.random() * 40 - 20) * (Math.PI / 180);

            const speed = 4 + Math.random() * 2;

            rockets.push({
                x: width * (0.08 + Math.random() * 0.84),
                y: height + 10,
                targetY: height * (0.12 + Math.random() * 0.35),
                speed,
                vx: Math.sin(angle) * speed,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: 2 + Math.random() * 2,
            });
        };

        const explode = (x: number, y: number, color: string) => {
            const count = 55 + Math.floor(Math.random() * 35);

            for (let i = 0; i < count; i++) {
                const angle = (Math.PI * 2 * i) / count;
                const speed = 1 + Math.random() * 4;

                particles.push({
                    x,
                    y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    alpha: 1,
                    radius: 1 + Math.random() * 2,
                    color: Math.random() > 0.2 ? color : "#FFFFFF",
                });
            }
        };

        const animate = (time: number) => {
            ctx.clearRect(0, 0, width, height);

            if (time - lastLaunch > 850) {
                launchRocket();
                lastLaunch = time;
            }

            rockets = rockets.filter((rocket) => {
                rocket.x += rocket.vx;
                rocket.y -= rocket.speed;

                // Rocket glowing angled trail
                const trailLength = 60;

                const trail = ctx.createLinearGradient(
                    rocket.x - rocket.vx * (trailLength / rocket.speed),
                    rocket.y + trailLength,
                    rocket.x,
                    rocket.y
                );

                trail.addColorStop(0, "transparent");
                trail.addColorStop(1, rocket.color);

                ctx.beginPath();

                ctx.moveTo(
                    rocket.x - rocket.vx * (trailLength / rocket.speed),
                    rocket.y + trailLength
                );

                ctx.lineTo(rocket.x, rocket.y);

                ctx.strokeStyle = trail;
                ctx.lineWidth = 2;
                ctx.lineCap = "round";
                ctx.shadowBlur = 8;
                ctx.shadowColor = rocket.color;
                ctx.stroke();

                // Rocket glowing head
                ctx.beginPath();
                ctx.arc(rocket.x, rocket.y, rocket.size, 0, Math.PI * 2);

                ctx.fillStyle = "#FFFFFF";
                ctx.shadowBlur = rocket.size * 6;
                ctx.shadowColor = rocket.color;
                ctx.fill();

                ctx.shadowBlur = 0;

                if (rocket.y <= rocket.targetY) {
                    explode(rocket.x, rocket.y, rocket.color);
                    return false;
                }

                return true;
            });

            particles = particles.filter((p) => {
                p.x += p.vx;
                p.y += p.vy;

                p.vy += 0.035;
                p.vx *= 0.985;
                p.vy *= 0.985;
                p.alpha -= 0.012;

                ctx.globalAlpha = Math.max(0, p.alpha);
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

                ctx.fillStyle = p.color;
                ctx.shadowBlur = 12;
                ctx.shadowColor = p.color;
                ctx.fill();

                return p.alpha > 0;
            });

            ctx.globalAlpha = 1;
            ctx.shadowBlur = 0;

            animationId = requestAnimationFrame(animate);
        };

        animationId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", resize);
        };
    }, [active]);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 1 }}
        />
    );
}
