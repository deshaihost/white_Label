import { X } from 'lucide-react';

interface APIDocumentationModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName: string;
}

export default function APIDocumentationModal({ isOpen, onClose, featureName }: APIDocumentationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-60"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#1a1d29] rounded-lg shadow-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#2d3142] flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="text-[#3e88f7] font-mono text-[14px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                {'</>'}
              </div>
              <h2 className="text-white text-[18px] font-['DM_Sans:Bold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                API Documentation
              </h2>
            </div>
            <p className="text-[#8a8e98] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
              {featureName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#676a73] hover:text-[#d0d3db] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {/* Overview */}
          <div className="mb-8">
            <h3 className="text-white text-[14px] font-['DM_Sans:SemiBold',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
              Overview
            </h3>
            <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif] leading-relaxed" style={{ fontVariationSettings: "'opsz' 14" }}>
              Integrate the {featureName} module into your existing platform using HostBuddy's REST API. This allows you to build your own UI while leveraging our AI-powered messaging engine.
            </p>
          </div>

          {/* Authentication */}
          <div className="mb-8">
            <h3 className="text-white text-[14px] font-['DM_Sans:SemiBold',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
              Authentication
            </h3>
            <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
              All API requests require authentication using your API key in the header:
            </p>
            <div className="bg-[#0d0f16] border border-[#2d3142] rounded-lg p-4 font-mono">
              <code className="text-[#4ade80] text-[12px]" style={{ fontVariationSettings: "'opsz' 14" }}>
                Authorization: Bearer your_api_key_here
              </code>
            </div>
          </div>

          {/* API Endpoints */}
          <div className="mb-8">
            <h3 className="text-white text-[14px] font-['DM_Sans:SemiBold',_sans-serif] mb-4" style={{ fontVariationSettings: "'opsz' 14" }}>
              API Endpoints
            </h3>

            {/* GET Endpoint */}
            <div className="bg-[#0d0f16] border border-[#2d3142] rounded-lg p-5 mb-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 bg-[#3e88f7] text-white text-[11px] font-['DM_Sans:SemiBold',_sans-serif] rounded uppercase" style={{ fontVariationSettings: "'opsz' 14" }}>
                  GET
                </span>
                <code className="text-[#98bffa] text-[13px] font-mono">
                  /api/v1/conversations
                </code>
              </div>
              <p className="text-[#a6a9b2] text-[12px] font-['DM_Sans:Regular',_sans-serif] mb-4" style={{ fontVariationSettings: "'opsz' 14" }}>
                Retrieve all conversations for your properties
              </p>

              <h4 className="text-[#d0d3db] text-[12px] font-['DM_Sans:SemiBold',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>
                Query Parameters:
              </h4>
              <div className="bg-[#1a1d29] border border-[#2d3142] rounded p-3 mb-4 font-mono text-[11px] text-[#a6a9b2]">
                <div>property_id: string (optional)</div>
                <div>status: "active" | "archived" (optional)</div>
                <div>limit: number (default: 50)</div>
              </div>

              <h4 className="text-[#d0d3db] text-[12px] font-['DM_Sans:SemiBold',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>
                Example Response:
              </h4>
              <div className="bg-[#1a1d29] border border-[#2d3142] rounded p-3 font-mono text-[11px] overflow-x-auto">
                <pre className="text-[#a6a9b2]">
{`{
  "conversations": [
    {
      "id": "conv_123",
      "guest_name": "Sarah Johnson",
      "property_id": "prop_456",
      "property_name": "Sunset Beach Villa",
      "last_message": "What time is check-in?",
      "last_message_at": "2024-10-18T15:00Z",
      "unread_count": 1,
      "ai_handled": true
    }
  ],
  "total": 12,
  "page": 1
}`}
                </pre>
              </div>
            </div>

            {/* POST Endpoint */}
            <div className="bg-[#0d0f16] border border-[#2d3142] rounded-lg p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 bg-[#10b981] text-white text-[11px] font-['DM_Sans:SemiBold',_sans-serif] rounded uppercase" style={{ fontVariationSettings: "'opsz' 14" }}>
                  POST
                </span>
                <code className="text-[#98bffa] text-[13px] font-mono">
                  /api/v1/conversations/:id/messages
                </code>
              </div>
              <p className="text-[#a6a9b2] text-[12px] font-['DM_Sans:Regular',_sans-serif] mb-4" style={{ fontVariationSettings: "'opsz' 14" }}>
                Send a message in a conversation
              </p>

              <h4 className="text-[#d0d3db] text-[12px] font-['DM_Sans:SemiBold',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>
                Request Body:
              </h4>
              <div className="bg-[#1a1d29] border border-[#2d3142] rounded p-3 font-mono text-[11px] overflow-x-auto">
                <pre className="text-[#a6a9b2]">
{`{
  "message": "Check-in is at 3:00 PM",
  "ai_enabled": true
}`}
                </pre>
              </div>
            </div>
          </div>

          {/* Additional Endpoints Placeholder */}
          <div className="bg-[#01255e] bg-opacity-30 border border-[#3e88f7] rounded-lg p-4">
            <p className="text-[#98bffa] text-[12px] font-['DM_Sans:Medium',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
              <strong>Note:</strong> Additional endpoints and detailed documentation will be available in the full API reference. Contact your account manager for early access to the complete API specification.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#2d3142] flex items-center justify-between bg-[#14161f]">
          <div className="text-[#3e88f7] text-[11px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
            API v1 • Base URL: {'https://api.hostbuddy.ai'}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => window.open('https://docs.hostbuddy.ai', '_blank')}
              className="px-4 py-2 bg-[#0F1117] border-2 border-[#013280] hover:border-[#3e88f7] text-[#d0d3db] rounded text-[13px] font-['DM_Sans:SemiBold',_sans-serif] transition-colors"
              style={{ fontVariationSettings: "'opsz' 14" }}
            >
              View Full Docs
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#3e88f7] hover:bg-[#74A9F7] text-white rounded text-[13px] font-['DM_Sans:SemiBold',_sans-serif] transition-colors"
              style={{ fontVariationSettings: "'opsz' 14", boxShadow: '0 0 15px rgba(62, 136, 247, 0.3)' }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
