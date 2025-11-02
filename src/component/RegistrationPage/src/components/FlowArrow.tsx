import { ArrowDown } from 'lucide-react';

interface FlowArrowProps {
  direction: 'down' | 'right';
}

export function FlowArrow({ direction }: FlowArrowProps) {
  if (direction === 'down') {
    return (
      <div className="flex justify-center py-2">
        <ArrowDown className="w-6 h-6 text-slate-400" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center px-2">
      <div className="w-full h-0.5 bg-slate-300"></div>
    </div>
  );
}
