import { ReactNode } from 'react';
import { VersionBadge } from './VersionBadge';

interface PageCardProps {
  title: string;
  color: 'blue' | 'green';
  icon: ReactNode;
  version: 'V1' | 'V2';
  children: ReactNode;
}

export function PageCard({ title, color, icon, version, children }: PageCardProps) {
  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      header: 'bg-blue-100 border-blue-300',
      text: 'text-blue-900',
      iconBg: 'bg-blue-500'
    },
    green: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      header: 'bg-green-100 border-green-300',
      text: 'text-green-900',
      iconBg: 'bg-green-500'
    }
  };

  const colors = colorClasses[color];

  return (
    <div className={`${colors.bg} border-2 ${colors.border} rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow`}>
      <div className={`${colors.header} border-b-2 ${colors.border} p-4 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <div className={`${colors.iconBg} text-white p-2 rounded`}>
            {icon}
          </div>
          <h3 className={colors.text}>{title}</h3>
        </div>
        <VersionBadge version={version} />
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}
