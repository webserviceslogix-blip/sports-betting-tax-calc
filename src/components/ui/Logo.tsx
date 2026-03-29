interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = '', iconOnly = false, size = 'md' }: LogoProps) {
  const sizes = {
    sm: { icon: 24, text: 'text-lg' },
    md: { icon: 32, text: 'text-xl' },
    lg: { icon: 48, text: 'text-3xl' },
  };

  const s = sizes[size];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Icon */}
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Rounded square background */}
        <rect width="48" height="48" rx="10" fill="#1e40af" />

        {/* Dollar sign */}
        <text
          x="24"
          y="20"
          textAnchor="middle"
          dominantBaseline="central"
          fill="white"
          fontSize="22"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
        >
          $
        </text>

        {/* Small calculator grid at bottom */}
        <rect x="14" y="30" width="4" height="4" rx="0.5" fill="rgba(255,255,255,0.6)" />
        <rect x="22" y="30" width="4" height="4" rx="0.5" fill="rgba(255,255,255,0.6)" />
        <rect x="30" y="30" width="4" height="4" rx="0.5" fill="rgba(255,255,255,0.6)" />
        <rect x="14" y="37" width="4" height="4" rx="0.5" fill="rgba(255,255,255,0.4)" />
        <rect x="22" y="37" width="4" height="4" rx="0.5" fill="rgba(255,255,255,0.4)" />
        <rect x="30" y="37" width="4" height="4" rx="0.5" fill="rgba(255,255,255,0.4)" />
      </svg>

      {/* Wordmark */}
      {!iconOnly && (
        <span className={`font-bold ${s.text} text-gray-900`}>
          BetTax<span className="text-[#1e40af]">Calc</span>
        </span>
      )}
    </div>
  );
}
