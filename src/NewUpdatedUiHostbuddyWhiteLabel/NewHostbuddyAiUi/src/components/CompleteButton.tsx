import { Check } from 'lucide-react';

interface CompleteButtonProps {
  completed: boolean;
  onClick: () => void;
  title?: string;
}

export function CompleteButton({ completed, onClick, title = "Mark Complete" }: CompleteButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all group shrink-0 ${
        completed 
          ? 'bg-[#3e88f7] border-[#3e88f7]' 
          : 'border-[#3e88f7] hover:bg-[#3e88f7]'
      }`}
      style={{ boxShadow: '0 0 8px rgba(62, 136, 247, 0.25)' }}
      title={title}
    >
      <Check 
        className={`w-4 h-4 transition-colors ${
          completed 
            ? 'text-white' 
            : 'text-[#3e88f7] group-hover:text-white'
        }`}
        strokeWidth={2.5}
      />
    </button>
  );
}
