import { Toaster } from 'sonner@2.0.3';

export function SaveNotification() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: '#17191f',
          border: '1px solid #013280',
          color: '#d0d3db',
          boxShadow: '0 0 20px rgba(62, 136, 247, 0.2)',
        },
        className: 'save-toast',
        duration: 3000,
      }}
      icons={{
        success: (
          <div className="w-5 h-5 bg-[#01632e] rounded-full flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6L5 9L10 3" stroke="#7ef0b4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        ),
        error: (
          <div className="w-5 h-5 bg-[#7a1f1f] rounded-full flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 3L9 9M9 3L3 9" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        ),
        info: (
          <div className="w-5 h-5 bg-[#01255e] rounded-full flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 4V6M6 8H6.005M11 6C11 8.76142 8.76142 11 6 11C3.23858 11 1 8.76142 1 6C1 3.23858 3.23858 1 6 1C8.76142 1 11 3.23858 11 6Z" stroke="#98bffa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        ),
      }}
    />
  );
}
