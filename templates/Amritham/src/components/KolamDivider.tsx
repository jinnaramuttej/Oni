export function KolamDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`kolam-divider ${className}`}>
      <span className="kolam-line" />
      <span className="kolam-dot" />
      <span className="kolam-dot-lg" />
      <span className="kolam-dot" />
      <span className="kolam-line" />
    </div>
  );
}

export function KolamDividerWide({ className = '' }: { className?: string }) {
  return (
    <div className={`kolam-divider ${className}`}>
      <span className="kolam-line" />
      <span className="kolam-dot" />
      <span className="kolam-dot" />
      <span className="kolam-dot-lg" />
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="opacity-40">
        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="#B78A3F"/>
      </svg>
      <span className="kolam-dot-lg" />
      <span className="kolam-dot" />
      <span className="kolam-dot" />
      <span className="kolam-line" />
    </div>
  );
}
