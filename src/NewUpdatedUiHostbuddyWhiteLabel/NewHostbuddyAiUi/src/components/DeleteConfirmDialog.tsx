import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
}

export default function DeleteConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
}: DeleteConfirmDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-[#17191f] border-[#013280]">
        <AlertDialogHeader>
          <AlertDialogTitle 
            className="text-white text-[24px] font-['DM_Sans:Bold',_sans-serif]" 
            style={{ fontVariationSettings: "'opsz' 14" }}
          >
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription 
            className="text-[#a6a9b2] text-[15px] font-['DM_Sans:Medium',_sans-serif]" 
            style={{ fontVariationSettings: "'opsz' 14" }}
          >
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel 
            className="bg-[#0F1117] text-[#a6a9b2] border-[#013280] hover:bg-[#17191f] hover:text-white font-['DM_Sans:SemiBold',_sans-serif]" 
            style={{ fontVariationSettings: "'opsz' 14" }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className="bg-[#ef4444] text-white hover:bg-[#dc2626] font-['DM_Sans:SemiBold',_sans-serif]" 
            style={{ fontVariationSettings: "'opsz' 14" }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
