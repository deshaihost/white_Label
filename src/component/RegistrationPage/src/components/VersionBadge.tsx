interface VersionBadgeProps {
  version: 'V1' | 'V2';
}

export function VersionBadge({ version }: VersionBadgeProps) {
  const colorClasses = {
    V1: 'bg-emerald-500 text-white',
    V2: 'bg-amber-500 text-white'
  };

  return (
    <span className={`${colorClasses[version]} px-3 py-1 rounded text-xs uppercase tracking-wide`}>
      {version}
    </span>
  );
}
