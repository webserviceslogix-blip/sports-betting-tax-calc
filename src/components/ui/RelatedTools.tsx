import Link from 'next/link';

const allTools = [
  { name: 'Tax Calculator', href: '/calculator', description: 'Full federal + state tax estimate' },
  { name: 'Parlay Tax Calculator', href: '/tools/parlay-tax', description: 'After-tax parlay payout' },
  { name: 'Phantom Income Calculator', href: '/tools/phantom-income', description: 'OBBBA 90% cap impact' },
  { name: 'W-2G Checker', href: '/tools/w2g-checker', description: 'Will you get a W-2G form?' },
  { name: 'State Comparison', href: '/tools/state-comparison', description: 'Compare tax across states' },
];

interface RelatedToolsProps {
  currentPath: string;
}

export default function RelatedTools({ currentPath }: RelatedToolsProps) {
  const otherTools = allTools.filter((t) => t.href !== currentPath);

  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Other Tax Tools</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {otherTools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-primary/30 transition-all group"
          >
            <div className="font-medium text-sm text-gray-900 group-hover:text-primary transition-colors">
              {tool.name}
            </div>
            <div className="text-xs text-gray-500 mt-1">{tool.description}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
