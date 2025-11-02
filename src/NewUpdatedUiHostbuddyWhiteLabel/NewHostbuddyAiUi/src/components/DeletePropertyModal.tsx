import DeleteConfirmDialog from './DeleteConfirmDialog';

interface DeletePropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  propertyName?: string;
}

export default function DeletePropertyModal({ isOpen, onClose, onConfirm, propertyName }: DeletePropertyModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <DeleteConfirmDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      title="Delete Listing"
      description={`Are you sure you want to delete "${propertyName}"? This action cannot be undone.`}
    />
  );
}
