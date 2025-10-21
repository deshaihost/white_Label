import { ArrowRight } from 'lucide-react';

interface UpsellCard {
  id: string;
  title: string;
  description: string;
}

interface UpsellsProps {
  onNavigateToUpsell: (upsellType: string) => void;
}

export default function Upsells({ onNavigateToUpsell }: UpsellsProps) {
  const upsells: UpsellCard[] = [
    {
      id: 'post-stay-gap',
      title: 'Post-stay Gap Night',
      description: "Send your guests an offer to depart later when there's a vacant night after their stay"
    },
    {
      id: 'pre-stay-gap',
      title: 'Pre-stay Gap Night',
      description: "Send your guests an offer to arrive earlier when there's a vacant night before their stay"
    },
    {
      id: 'inquiry-followups',
      title: 'Inquiry Follow-Ups',
      description: "Send a message following up with guests who inquired but didn't book"
    }
  ];

  const handleUpsellClick = (id: string) => {
    onNavigateToUpsell(id);
  };

  return (
    <div className="h-screen bg-[#0F1117] overflow-y-auto">
      <div className="max-w-[1200px] mx-auto px-12 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-white text-[40px] font-['DM_Sans:Bold',_sans-serif] mb-4" style={{ fontVariationSettings: "'opsz' 14" }}>
            Upsells
          </h1>
          <p className="text-[#a6a9b2] text-[16px] font-['DM_Sans:Regular',_sans-serif] leading-relaxed max-w-[900px]" style={{ fontVariationSettings: "'opsz' 14" }}>
            Intelligent automations that help you maximize occupancy and leave less money on the table. Customize your upsell settings and messages to suit your property and guest preferences.
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-[#013280] mb-10"></div>

        {/* Upsell Cards */}
        <div className="space-y-5">
          {upsells.map((upsell) => (
            <button
              key={upsell.id}
              onClick={() => handleUpsellClick(upsell.id)}
              className="w-full bg-[#0F1117] border-2 border-[#013280] rounded-xl p-8 flex items-center justify-between hover:bg-[#01255e] hover:border-[#3e88f7] transition-all group text-left"
              style={{ boxShadow: '0 0 25px rgba(1, 50, 128, 0.2)' }}
            >
              <div className="flex-1">
                <h3 className="text-white text-[22px] font-['DM_Sans:Bold',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
                  {upsell.title}
                </h3>
                <p className="text-[#a6a9b2] text-[16px] font-['DM_Sans:Regular',_sans-serif] leading-relaxed" style={{ fontVariationSettings: "'opsz' 14" }}>
                  {upsell.description}
                </p>
              </div>
              
              <ArrowRight className="w-6 h-6 text-[#3e88f7] ml-8 group-hover:translate-x-1 transition-transform shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
