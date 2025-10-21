import { Edit2 } from 'lucide-react';

interface FieldEditButtonProps {
  fieldKey: string;
  hasNote: boolean;
  hasPhaseChange: boolean;
  onClick: () => void;
}

export default function FieldEditButton({ fieldKey, hasNote, hasPhaseChange, onClick }: FieldEditButtonProps) {
  return (
    <div className="flex items-center gap-1.5">
      {hasNote && (
        <div 
          className="w-2 h-2 rounded-full bg-[#3e88f7]" 
          style={{ boxShadow: '0 0 6px rgba(62, 136, 247, 0.8)' }}
          title="Has additional note"
        />
      )}
      {hasPhaseChange && (
        <div 
          className="w-2 h-2 rounded-full bg-[#F97316]" 
          style={{ boxShadow: '0 0 6px rgba(249, 115, 22, 0.8)' }}
          title="Reservation phases modified"
        />
      )}
      <button 
        onClick={onClick}
        className="text-[#3e88f7] hover:opacity-80 transition-opacity"
      >
        <Edit2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
