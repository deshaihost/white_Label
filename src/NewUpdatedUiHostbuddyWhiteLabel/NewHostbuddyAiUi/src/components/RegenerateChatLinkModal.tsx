import { AlertTriangle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';

interface RegenerateChatLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  propertyName: string;
}

export function RegenerateChatLinkModal({
  isOpen,
  onClose,
  onConfirm,
  propertyName,
}: RegenerateChatLinkModalProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-[#0F1117] border-2 border-[#013280] max-w-[500px]">
        <AlertDialogHeader>
          <div className="flex items-start gap-4">
            <div className="mt-1 p-2 rounded-lg bg-[#4a1515] border border-[#7a2525]">
              <AlertTriangle className="w-5 h-5 text-[#ff4444]" />
            </div>
            <div className="flex-1">
              <AlertDialogTitle className="text-white text-[18px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                Regenerate Chat Link?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif] mt-2" style={{ fontVariationSettings: "'opsz' 14" }}>
                for {propertyName}
              </AlertDialogDescription>
            </div>
          </div>
        </AlertDialogHeader>
        
        <div className="py-4">
          <div className="bg-[#17191f] border border-[#013280] rounded-lg p-4">
            <p className="text-[#d0d3db] text-[14px] font-['DM_Sans:SemiBold',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>
              WARNING: This will invalidate any existing chat links, embedded chat windows, and embedded widgets for this property.
            </p>
            <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
              You will need to update all instances where you've shared or embedded the chat link with the new link.
            </p>
          </div>
        </div>

        <AlertDialogFooter className="gap-3">
          <AlertDialogCancel 
            onClick={onClose}
            className="bg-[#17191f] border-[#013280] text-[#d0d3db] hover:bg-[#1a1f2e] hover:text-white font-['DM_Sans:Medium',_sans-serif]"
            style={{ fontVariationSettings: "'opsz' 14" }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-[#3e88f7] text-white hover:bg-[#2d71d9] font-['DM_Sans:SemiBold',_sans-serif] shadow-[0_0_20px_rgba(62,136,247,0.3)]"
            style={{ fontVariationSettings: "'opsz' 14" }}
          >
            Regenerate Link
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
