import { toast } from 'sonner@2.0.3';

export function useSaveNotification() {
  const showSuccess = (message: string = 'Changes saved successfully') => {
    toast.success(message);
  };

  const showError = (message: string = 'Failed to save changes') => {
    toast.error(message);
  };

  const showInfo = (message: string) => {
    toast.info(message);
  };

  return {
    showSuccess,
    showError,
    showInfo,
  };
}

// You can also export individual functions for direct import
export const showSaveSuccess = (message: string = 'Changes saved successfully') => {
  toast.success(message);
};

export const showSaveError = (message: string = 'Failed to save changes') => {
  toast.error(message);
};

export const showSaveInfo = (message: string) => {
  toast.info(message);
};
