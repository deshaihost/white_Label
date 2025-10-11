import { ReactNode } from 'react';
import { StickyNote } from 'lucide-react';

interface AnnotationBubbleProps {
  children: ReactNode;
  color: 'blue' | 'green';
  position: 'left' | 'right';
}

export function AnnotationBubble({ children, color, position }: AnnotationBubbleProps) {
  const colorClasses = {
    blue: 'bg-blue-100 border-blue-300 text-blue-800',
    green: 'bg-green-100 border-green-300 text-green-800'
  };

  return (
    <div className={`${colorClasses[color]} border-2 rounded-lg p-4 relative shadow-sm`}>
      <div className="flex items-start gap-3">
        <StickyNote className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <p className="italic">{children}</p>
      </div>
      {/* Decorative corner fold */}
      <div className="absolute top-0 right-0 w-0 h-0 border-t-[20px] border-r-[20px] border-t-slate-200 border-r-transparent"></div>
    </div>
  );
}
