// Lucide dropped brand/logo icons, so the couple of social marks we need
// (Instagram, TikTok) are small inline SVGs instead.

export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M14 4v9.6a2.6 2.6 0 1 1-2.2-2.57V8.6a5.06 5.06 0 1 0 4.2 4.99V9.7a6.6 6.6 0 0 0 4 1.34V8.4a3.9 3.9 0 0 1-3.6-3.9V4h-2.4Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}
