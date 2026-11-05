
import { useEffect, useState } from "react";

interface PreloaderProps {
    onComplete: () => void;
    videoRef: React.RefObject<HTMLVideoElement | null>;
}

const criticalImages = [
    "/images/couple/invite-cover.jpg",
    "/images/couple/hero-portrait.webp",
    "/images/couple/couple.jpg",
    "/images/RDLogo.png",
    "/images/ganesha.png",
    "/images/venues/haldi.png",
    "/images/venues/mehndi.png",
    "/images/venues/sangeet.png",
    "/images/venues/tilak.png",
    "/images/venues/wedding.png",
    "/images/petals/petal-1.png",
    "/images/petals/petal-2.png",
    "/images/petals/petal-3.png",
    "/images/petals/petal-4.png",
    "/images/gallery/DSC07325.webp",
    "/images/gallery/DSC07345.webp",
    "/images/gallery/DSC07375.webp",
    "/images/gallery/DSC07414.webp",
    "/images/gallery/DSC07486.webp",
    "/images/gallery/DSC07503.webp",
    "/images/gallery/DSC07542.webp",
    "/images/gallery/DSC07620.webp",
    "/images/gallery/DSC07632.webp",
    "/images/gallery/DSC07633.webp",
];

//const HERO_VIDEO = "/video/wedding-bg.mp4";


function loadImage(src: string): Promise<void> {
    return new Promise((resolve) => {
        const img = new Image();
        let finished = false;

        const finish = () => {
            if (finished) return;
            finished = true;
            resolve();
        };

        img.onload = async () => {
            try {
                if (img.decode) {
                    await img.decode();
                }
            } catch {
                // Continue if browser decoding fails.
            }
            finish();
        };

        img.onerror = finish;
        img.src = src;

        if (img.complete) {
            if (img.naturalWidth > 0) {
                img.decode?.().catch(() => { }).finally(finish);
            } else {
                finish();
            }
        }
    });
}


// function loadVideoMetadata(src: string): Promise<void> {
//     return new Promise((resolve) => {
//         const video = document.createElement("video");
//         let finished = false;

//         const finish = () => {
//             if (finished) return;
//             finished = true;
//             video.removeAttribute("src");
//             video.load();
//             resolve();
//         };

//         video.preload = "metadata";
//         video.onloadedmetadata = finish;
//         video.onerror = finish;

//         // Never let a slow video block the invitation.
//         const timeout = window.setTimeout(finish, 4000);

//         const originalFinish = finish;

//         video.onloadedmetadata = () => {
//             window.clearTimeout(timeout);
//             originalFinish();
//         };

//         video.onerror = () => {
//             window.clearTimeout(timeout);
//             originalFinish();
//         };

//         video.src = src;
//         video.load();
//     });
// }

function prepareHeroVideo(
    video: HTMLVideoElement | null
): Promise<void> {
    return new Promise((resolve) => {
        if (!video) {
            resolve();
            return;
        }

        let finished = false;

        const finish = () => {
            if (finished) return;

            finished = true;

            window.clearTimeout(timeout);

            video.removeEventListener("canplay", finish);
            video.removeEventListener("error", finish);

            resolve();
        };

        // Video already has enough data to begin playback.
        if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
            resolve();
            return;
        }

        video.preload = "auto";

        video.addEventListener("canplay", finish);
        video.addEventListener("error", finish);

        // Do not keep guests waiting indefinitely on slow networks.
        const timeout = window.setTimeout(finish, 8000);

        video.load();
    });
}

export default function Preloader({
    onComplete,
    videoRef,
}: PreloaderProps) {
    const [progress, setProgress] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        let cancelled = false;
        let completed = false;

        const startedAt = Date.now();

        const resources = [
            ...criticalImages.map((src) => loadImage(src)),
            prepareHeroVideo(videoRef.current),
            document.fonts?.ready
                ? document.fonts.ready.then(() => undefined).catch(() => undefined)
                : Promise.resolve(),
        ];

        const total = resources.length;
        let loaded = 0;

        const updateProgress = () => {
            loaded += 1;

            if (!cancelled) {
                setProgress(Math.round((loaded / total) * 100));
            }
        };

        const trackedResources = resources.map((resource) =>
            resource.then(updateProgress).catch(updateProgress)
        );

        const finishLoading = async () => {
            // Maximum waiting time, even if a resource is extremely slow.
            await Promise.race([
                Promise.all(trackedResources),
                new Promise<void>((resolve) => window.setTimeout(resolve, 9000)),
            ]);

            if (cancelled || completed) return;

            completed = true;

            // Keep the loader visible briefly for a polished entrance.
            const elapsed = Date.now() - startedAt;
            const remaining = Math.max(0, 1100 - elapsed);

            await new Promise((resolve) => window.setTimeout(resolve, remaining));

            if (cancelled) return;

            setProgress(100);

            window.setTimeout(() => {
                if (cancelled) return;

                setVisible(false);

                window.setTimeout(() => {
                    if (!cancelled) onComplete();
                }, 750);
            }, 350);
        };

        finishLoading();

        return () => {
            cancelled = true;
        };
    }, [onComplete, videoRef]);

    if (!visible) return null;

    return (
        <>
            <style>{`
        @keyframes loaderGlow {
          0%, 100% { opacity: .45; }
          50% { opacity: 1; }
        }

        @keyframes loaderShine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(250%); }
        }

        @keyframes loaderRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes loaderAppear {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .wedding-loader-content {
          animation: loaderAppear 1s ease forwards;
        }

        .wedding-loader-ornament {
          animation: loaderRotate 35s linear infinite;
        }

        .wedding-loader-dot {
          animation: loaderGlow 2s ease-in-out infinite;
        }
      `}</style>

            <div
                style={{
                    position: "fixed",
                    inset: 0,
                    zIndex: 100000,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                        "radial-gradient(ellipse at center, #21150f 0%, #100a08 55%, #080504 100%)",
                    opacity: visible ? 1 : 0,
                    transition: "opacity 750ms ease",
                    pointerEvents: "all",
                    overflow: "hidden",
                }}
            >
                {/* Subtle ornamental circles */}
                <div
                    className="wedding-loader-ornament"
                    style={{
                        position: "absolute",
                        width: "min(85vw, 520px)",
                        aspectRatio: "1",
                        border: "1px solid rgba(200,164,93,0.10)",
                        borderRadius: "50%",
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            inset: "12%",
                            border: "1px solid rgba(200,164,93,0.13)",
                            borderRadius: "50%",
                        }}
                    />
                    <div
                        style={{
                            position: "absolute",
                            inset: "24%",
                            border: "1px dashed rgba(200,164,93,0.13)",
                            borderRadius: "50%",
                        }}
                    />
                </div>

                <div
                    className="wedding-loader-content"
                    style={{
                        position: "relative",
                        zIndex: 2,
                        width: "min(85%, 360px)",
                        textAlign: "center",
                        color: "#e8cf9b",
                    }}
                >
                    <div
                        style={{
                            fontSize: 11,
                            letterSpacing: "0.42em",
                            color: "#b8955c",
                            marginBottom: 32,
                        }}
                    >
                        THE CELEBRATION OF LOVE
                    </div>

                    <div
                        style={{
                            fontSize: "clamp(35px, 9vw, 55px)",
                            fontFamily: "Georgia, serif",
                            fontWeight: 400,
                            letterSpacing: "-0.04em",
                            whiteSpace: "nowrap",
                            textShadow: "0 2px 25px rgba(200,164,93,0.15)",
                        }}
                    >
                        Rishabh
                    </div>

                    <div
                        style={{
                            fontFamily: "Georgia, serif",
                            fontSize: 27,
                            fontStyle: "italic",
                            color: "#c8a45d",
                            margin: "2px 0",
                        }}
                    >
                        &amp;
                    </div>

                    <div
                        style={{
                            fontSize: "clamp(35px, 9vw, 55px)",
                            fontFamily: "Georgia, serif",
                            fontWeight: 400,
                            letterSpacing: "-0.04em",
                            whiteSpace: "nowrap",
                            textShadow: "0 2px 25px rgba(200,164,93,0.15)",
                        }}
                    >
                        Diksha
                    </div>

                    <div
                        style={{
                            width: 48,
                            height: 1,
                            background: "#c8a45d",
                            margin: "30px auto 25px",
                            opacity: 0.7,
                        }}
                    />

                    <div
                        style={{
                            fontSize: 10,
                            letterSpacing: "0.3em",
                            color: "#c8a45d",
                            marginBottom: 22,
                        }}
                    >
                        PREPARING YOUR EXPERIENCE
                    </div>

                    {/* Progress bar */}
                    <div
                        style={{
                            width: "100%",
                            height: 2,
                            background: "rgba(200,164,93,0.16)",
                            overflow: "hidden",
                            position: "relative",
                        }}
                    >
                        <div
                            style={{
                                height: "100%",
                                width: `${progress}%`,
                                background:
                                    "linear-gradient(90deg, #9d753c, #f5dfaa, #c8a45d)",
                                transition: "width 350ms ease",
                                boxShadow: "0 0 12px rgba(200,164,93,0.5)",
                            }}
                        />
                    </div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: 13,
                        }}
                    >
                        <span
                            style={{
                                fontSize: 9,
                                letterSpacing: "0.2em",
                                color: "#8e795a",
                            }}
                        >
                            PLEASE WAIT
                        </span>

                        <span
                            style={{
                                fontSize: 11,
                                letterSpacing: "0.12em",
                                color: "#d9bb83",
                                fontVariantNumeric: "tabular-nums",
                            }}
                        >
                            {progress}%
                        </span>
                    </div>

                    <div
                        style={{
                            marginTop: 38,
                            fontFamily: "Georgia, serif",
                            fontSize: 12,
                            fontStyle: "italic",
                            color: "rgba(232,207,155,0.55)",
                            letterSpacing: "0.04em",
                        }}
                    >
                        A beautiful beginning awaits...
                    </div>

                    <div
                        className="wedding-loader-dot"
                        style={{
                            width: 4,
                            height: 4,
                            borderRadius: "50%",
                            background: "#d9bb83",
                            margin: "25px auto 0",
                        }}
                    />
                </div>
            </div>
        </>
    );
}
