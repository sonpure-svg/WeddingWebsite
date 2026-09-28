import type { CSSProperties } from "react";

type IconProps = {
  size?: number | string;
  color?: string;
  style?: CSSProperties;
  className?: string;
};

/** The ornamental Ganesha / kalash mark used in dividers and cover corners. */
export function GaneshaOrnament({ size = 16, style, className }: IconProps) {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 512 512"
      height={size}
      width={size}
      style={style}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M254.963 40.213c-37.634 31.356-62.038 67.976-77.916 109.394 8.544 12.5 16.607 25.44 24.228 38.594 15.642-5.553 32.468-8.587 49.995-8.587 17.886 0 35.046 3.156 50.96 8.93 9.07-14.52 18.652-28.856 28.89-42.66-15.736-38.504-39.406-74.025-76.157-105.67zM434.593 72.5c-46.74 28.5-83.334 74.49-114.616 123.826 21.934 11.372 40.696 28.023 54.636 48.244 23.212-22.514 48.206-44.643 75.58-66.82-.882-31.955-5.798-67.033-15.6-105.25zm-353.03 1.094c-9.435 37.96-14.433 72.695-15.74 104.27 23.62 20.078 45.453 40.406 65.78 61.603 13.77-18.29 31.614-33.345 52.194-43.774-28.336-48.245-62.472-92.77-102.234-122.1zm-54.59 96.7C9.708 278.34 31.295 358.165 72.27 411.517c22.427 29.2 50.77 50.62 82.128 64.363-20.892-35.934-25.973-76.777-16.613-116.112 4.668-19.617 12.848-38.864 24.274-57.09-38.14-48.11-82.083-90.01-135.087-132.383zm462.588.464c-59.87 45.918-108.408 90.682-151.36 138.615 9.625 17.744 16.24 36.16 19.722 54.732 7.08 37.78 1.012 76.134-18.31 109.926 32.2-14.254 62.005-35.988 86.51-65.214 44.98-53.64 72.394-132.675 63.44-238.058zM251.27 198.3c-44.09 0-83.025 21.667-106.764 54.954 9.898 10.856 19.428 21.973 28.64 33.42 18.55-24.415 43.224-46.48 73.372-64.422l5.072-3.02 4.906 3.286c30.383 20.345 54.374 44.323 71.65 70.185 10.638-11.774 21.61-23.376 33.012-34.85-23.354-35.875-63.803-59.552-109.888-59.552zm-.268 43.182c-51.58 32.272-84.19 77.032-95.035 122.612-10.94 45.97-.302 92.658 35.986 130.607h108.904c34.806-36.38 47.222-81.652 38.696-127.15-8.466-45.177-37.988-90.634-88.55-126.068z" />
    </svg>
  );
}

/** The central mandala symbol used in dividers. */
export function DividerSymbol({ size = 22, style, className }: IconProps) {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 256 256"
      height={size}
      width={size}
      style={style}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M245.83,121.63a15.53,15.53,0,0,0-9.52-7.33,73.51,73.51,0,0,0-22.17-2.22c4-19.85,1-35.55-2.06-44.86a16.15,16.15,0,0,0-18.79-10.88,85.53,85.53,0,0,0-28.55,12.12,94.58,94.58,0,0,0-27.11-33.25,16.05,16.05,0,0,0-19.26,0A94.48,94.48,0,0,0,91.26,68.46,85.53,85.53,0,0,0,62.71,56.34,16.15,16.15,0,0,0,43.92,67.22c-3,9.31-6,25-2.06,44.86a73.51,73.51,0,0,0-22.17,2.22,15.53,15.53,0,0,0-9.52,7.33,16,16,0,0,0-1.6,12.27c3.39,12.57,13.8,36.48,45.33,55.32S113.13,208,128.05,208s42.67,0,74-18.78c31.53-18.84,41.94-42.75,45.33-55.32A16,16,0,0,0,245.83,121.63ZM59.14,72.14a.2.2,0,0,1,.23-.15A70.43,70.43,0,0,1,85.18,83.66,118.65,118.65,0,0,0,80,119.17c0,18.74,3.77,34,9.11,46.28A123.59,123.59,0,0,1,69.57,140C51.55,108.62,55.3,84,59.14,72.14Zm3,103.35C35.47,159.57,26.82,140.05,24,129.7a59.82,59.82,0,0,1,22.5-1.17,129.08,129.08,0,0,0,9.15,19.41,142.28,142.28,0,0,0,34,39.56A114.92,114.92,0,0,1,62.1,175.49ZM128,190.4c-9.33-6.94-32-28.23-32-71.23C96,76.7,118.38,55.24,128,48c9.62,7.26,32,28.72,32,71.19C160,162.17,137.33,183.46,128,190.4ZM170.82,83.66A70.43,70.43,0,0,1,196.63,72a.2.2,0,0,1,.23.15C200.7,84,204.45,108.62,186.43,140a123.32,123.32,0,0,1-19.54,25.48c5.34-12.26,9.11-27.54,9.11-46.28A118.65,118.65,0,0,0,170.82,83.66ZM232,129.72c-2.77,10.25-11.4,29.81-38.09,45.77a114.92,114.92,0,0,1-27.55,12,142.28,142.28,0,0,0,34-39.56,129.08,129.08,0,0,0,9.15-19.41A59.69,59.69,0,0,1,232,129.71Z" />
    </svg>
  );
}

/** Decorative corner flourish for framed cards. */
export function CornerFlourish({ size = 24, style, className }: IconProps) {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 512 512"
      height={size}
      width={size}
      style={style}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M379.625 19.844c-16.74.187-34.18 4.942-50.22 13.625-12.754 6.905-24.542 16.552-34.28 28.5-1.217-1.252-2.578-2.38-3.72-3.69-47.612-54.672-125.46-43.178-160.75 1.345-5.91 4.88-9.686 12.268-9.686 20.53 0 14.692 11.9 26.595 26.593 26.595 14.69 0 26.625-11.903 26.625-26.594 0-10.035-5.578-18.75-13.782-23.28 31.8-23.023 82.904-25.36 116.906 13.687 2.22 2.546 4.53 4.972 6.938 7.312-11.28 19.99-17.145 44.58-13.906 72.78-12.262-16.69-31.758-28.007-55.094-27.5-12.29.27-25.64 3.807-39.563 11.564-60.394 33.638-37.274 103.51-153.375 103.686 47.213 28.976 95.146 41.69 136.938 41.844-14.583 71.33 33.297 162.234 146.813 212-55.354-96.272 18.237-128.528 44.906-186.063 60.407 9.56 105.242-59.912 134.374 53.5 27.68-154.03-86.917-220.388-158.53-211.937-14.422 1.703-26.155 7.967-34.94 17.094-7.646-30.47-3.774-55.575 6.563-75.25 27.31 19.926 61.414 29.575 90.313 29.47 18.49-.07 35.196-3.904 46.875-13.75 11.68-9.85 16.05-26.89 9.375-44.595-8.432-22.363-27.576-35.638-48.97-39.532-5.347-.974-10.825-1.407-16.405-1.344zm.22 18.718c4.457-.065 8.76.29 12.842 1.032 16.328 2.972 28.704 11.517 34.813 27.718 4.736 12.56 2.46 18.326-3.938 23.72-6.396 5.392-19.18 9.285-34.906 9.343-24.812.092-55.875-9.065-79.78-26.47 8.326-10.05 18.477-18.082 29.405-24 13.51-7.312 28.19-11.147 41.564-11.343zm-140.69 128.313c6.397.06 13.328.942 20.907 2.78-72.17 14.765-84.3 99.482-165.156 81.782 70.31-9.934 82.423-85.154 144.25-84.562zm34 19.5c52.567 110.048-67.184 156.03-9.967 257.563-84.856-93.86 23.175-138.69 9.968-257.563zm24.908 3.906c42.292 46.343 133.717-11.018 164.093 90-43.937-71.563-131.402-22.378-164.094-90z" />
    </svg>
  );
}

export function InstagramIcon({ size = 15, style, className }: IconProps) {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 448 512"
      height={size}
      width={size}
      style={style}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.8-1.7 67.6-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
    </svg>
  );
}

export function MapPinIcon({ size = 14, style, className }: IconProps) {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 384 512"
      height={size}
      width={size}
      style={style}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z" />
    </svg>
  );
}

export function CalendarIcon({ size = 13, style, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="rgba(200,164,93,0.75)"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      className={className}
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

export function SendIcon({ size = 14, style, className }: IconProps) {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 512 512"
      height={size}
      width={size}
      style={style}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z" />
    </svg>
  );
}

export function MusicIcon({ size = 20, style, className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      height={size}
      width={size}
      style={style}
      className={className}
    >
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}

export function RingsIcon({ size = 20, style, className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      height={size}
      width={size}
      style={style}
      className={className}
    >
      <circle cx="9" cy="14" r="6.5" />
      <circle cx="15" cy="14" r="6.5" />
    </svg>
  );
}

export function DiyaIcon({ size = 20, style, className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      height={size}
      width={size}
      style={style}
      className={className}
    >
      <path d="M12 3c1.5 2 3 3.5 3 6a3 3 0 0 1-6 0c0-2.5 1.5-4 3-6z" />
      <path d="M4 13h16c-1 3-2.5 5-4 6h-8c-1.5-1-3-3-4-6z" />
      <path d="M12 19v2" />
    </svg>
  );
}

export function HennaIcon({ size = 20, style, className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      height={size}
      width={size}
      style={style}
      className={className}
    >
      <path d="M9 11.5V4.5a1.5 1.5 0 0 1 3 0V10" />
      <path d="M12 10V3.5a1.5 1.5 0 0 1 3 0V10" />
      <path d="M12 14.5c-2.5 1.5-4 2.8-4 5a4 4 0 0 0 8 0c0-2.2-1.5-3.5-4-5z" />
    </svg>
  );
}

export function HaldiIcon({ size = 20, style, className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      height={size}
      width={size}
      style={style}
      className={className}
    >
      <path d="M4 10h16" />
      <path d="M6 10a6 6 0 0 1 12 0v3H6v-3z" />
      <path d="M9 13c0 2 1 3 3 3s3-1 3-3" />
      <path d="M12 7V4" />
      <path d="M9 4.5 12 4l3 .5" />
    </svg>
  );
}

export function HeartIcon({ size = 18, style, className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.4"
      height={size}
      width={size}
      style={style}
      className={className}
    >
      <path d="M12 21s-7.5-4.8-9.9-9.1C.6 8.6 2.2 5 5.4 5c2 0 3.4 1.1 4.2 2.4L12 8l2.4-.6C15.2 6.1 16.6 5 18.6 5c3.2 0 4.8 3.6 3.3 6.9C19.5 16.2 12 21 12 21z" />
    </svg>
  );
}
