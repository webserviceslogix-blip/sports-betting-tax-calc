interface SportIconProps {
  sport: string;
  size?: number;
  className?: string;
}

const sportColors: Record<string, string> = {
  NFL: '#013369',
  NBA: '#C9082A',
  MLB: '#002D72',
  NHL: '#000000',
  UFC: '#D20A0A',
  MMA: '#D20A0A',
  Soccer: '#326295',
  Tennis: '#4E9A06',
  Golf: '#006747',
  NASCAR: '#FFCC00',
  'College Football': '#7B2D26',
  'College Basketball': '#7B2D26',
  'March Madness': '#0B3D91',
};

export default function SportIcon({ sport, size = 20, className = '' }: SportIconProps) {
  const color = sportColors[sport] || '#6B7280';

  const icons: Record<string, React.ReactNode> = {
    NFL: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="12" cy="12" rx="10" ry="7" stroke={color} strokeWidth="2" fill={`${color}20`}/>
        <path d="M8 9l8 6M8 15l8-6" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="12" y1="5" x2="12" y2="19" stroke={color} strokeWidth="1.5"/>
      </svg>
    ),
    NBA: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill={`${color}20`}/>
        <path d="M2 12h20M12 2c-3 3-3 7 0 10s3 7 0 10" stroke={color} strokeWidth="1.5"/>
      </svg>
    ),
    MLB: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill={`${color}20`}/>
        <path d="M5 7c2 2 4 3 7 3s5-1 7-3M5 17c2-2 4-3 7-3s5 1 7 3" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    NHL: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill={`${color}20`}/>
        <circle cx="12" cy="12" r="4" stroke={color} strokeWidth="2"/>
        <line x1="12" y1="2" x2="12" y2="8" stroke={color} strokeWidth="1.5"/>
        <line x1="12" y1="16" x2="12" y2="22" stroke={color} strokeWidth="1.5"/>
      </svg>
    ),
    UFC: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill={`${color}20`}/>
        <path d="M9 8l-2 4 2 4M15 8l2 4-2 4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    Soccer: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill={`${color}20`}/>
        <path d="M12 2l2 5h5l-4 3 1.5 5L12 12.5 7.5 15 9 10 5 7h5z" stroke={color} strokeWidth="1" fill={`${color}30`}/>
      </svg>
    ),
  };

  // Fallback for sports without custom icons
  const fallback = (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill={`${color}20`}/>
      <path d="M12 6v6l4 2" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );

  // Use MMA icon for UFC
  const sportKey = sport === 'MMA' ? 'UFC' : sport;
  // March Madness and College Basketball use NBA icon
  const resolvedKey = ['March Madness', 'College Basketball'].includes(sportKey) ? 'NBA' :
                      sportKey === 'College Football' ? 'NFL' : sportKey;

  return (
    <span className={`inline-flex items-center ${className}`} aria-label={sport}>
      {icons[resolvedKey] || fallback}
    </span>
  );
}
