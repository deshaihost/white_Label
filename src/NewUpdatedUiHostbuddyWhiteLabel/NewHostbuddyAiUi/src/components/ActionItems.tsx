import { useState, useEffect } from 'react';
import { Check, ChevronDown, ExternalLink } from 'lucide-react';
import { CompleteButton } from './CompleteButton';
import { getActionItems, toggleActionItemCompletion, subscribeToActionItems, ActionItem as ActionItemType } from './ActionItemsData';

const categories = ['Maintenance', 'Cleanliness', 'Special Requests', 'Reservation Changes', 'Other'];
const completedStatuses = ['Incomplete', 'Complete', 'Expired'];
const properties = [
  'Leo 506',
  '1B1 Adams - 8',
  '1B1 Adams - 4',
  '831 B',
  '1B1 Adams - 3',
  'Leo 403',
  '1B1 Adams - 10',
  '1B1 Adams - 2',
  '4183',
  '1B1 Adams - 5',
  'Leo 401',
  'Leo 601',
  'Hallie Sweetsclaw',
  'Bill Adams - 10',
  'Bill Adams - 2',
  'Bill Adams - 8',
  '32nd Sunset',
];

// Old data moved to ActionItemsData.ts - this placeholder array is for demonstration
const oldActionItemsData = [
  {
    id: 100,
    date: 'Oct 11',
    time: '12:53pm',
    property: 'Leo 506',
    guest: 'Hallie Sweetsclaw Sweetsclaw',
    category: 'SPECIAL REQUESTS',
    action: 'The guest requested information about parking availability for their stay.',
    completedBy: 'HostBuddy',
    completed: true,
  },
  {
    date: 'Oct 11',
    time: '10:42am',
    property: '1B1 Adams - 8',
    guest: 'Karlo Cubsedge',
    category: 'MAINTENANCE',
    action: 'The guest reported that the couch bed cannot be put back into the couch and was unable to open it/My host team needs to resolve this maintenance issue.',
    completedBy: 'HostBuddy',
    completed: true,
  },
  {
    date: 'Oct 11',
    time: '10:39am',
    property: '1B1 Adams - 4',
    guest: 'Rita Lopez',
    category: 'MAINTENANCE',
    action: 'The guest reported that the kitchen lights, TV, and living room fan/light are not working, possibly due to a tripped circuit breaker.',
    completedBy: 'HostBuddy',
    completed: true,
  },
  {
    date: 'Oct 11',
    time: '8:51am',
    property: '831 B',
    guest: 'Claudia Garcia',
    category: 'RESERVATION CHANGES',
    action: 'Follow up with the guest to confirm and process the $50 late checkout arrangement for 12pm departure.',
    completedBy: 'Sam Demo',
    completed: true,
  },
  {
    date: 'Oct 11',
    time: '5:58am',
    property: '1B1 Adams - 3',
    guest: 'Nefthovon Nguyen',
    category: 'RESERVATION CHANGES',
    action: 'The guest reported that their phone number is not updated and provided their correct phone number 8159991891.',
    completedBy: 'HostBuddy',
    completed: true,
  },
  {
    date: 'Oct 11',
    time: '5:27am',
    property: 'Leo 506',
    guest: 'Jasmine Zavala',
    category: 'SPECIAL REQUESTS',
    action: 'The host team needs to provide the guest with the reserved parking space number and gate code for October 10.',
    completedBy: 'Sam Demo',
    completed: true,
  },
  {
    date: 'Oct 11',
    time: '4:27am',
    property: 'Leo 403',
    guest: 'Ian Carle',
    category: 'SPECIAL REQUESTS',
    action: 'The guest requested that housekeeping check for a potentially lost Android cell phone left behind in the unit, and the host needs to follow up with the team and the guest.',
    completedBy: 'Sam Demo',
    completed: true,
  },
  {
    date: 'Oct 11',
    time: '2:11am',
    property: '1B1 Adams - 10',
    guest: 'Leslie Demarco',
    category: 'RESERVATION CHANGES',
    action: 'The guest is unable to extend their stay via Booking.com; the host team needs to update the reservation manually with the extended date and confirm the available pricing.',
    completedBy: 'Sam Demo',
    completed: true,
  },
  {
    date: 'Oct 11',
    time: '2:11am',
    property: '1B1 Adams - 4',
    guest: 'Rita Lopez',
    category: 'MAINTENANCE',
    action: 'The guest reported that the pull-out bed on the couch is broken and cannot be used; a photo of the issue has been requested for assessment.',
    completedBy: 'Sam Demo',
    completed: true,
  },
  {
    date: 'Oct 10',
    time: '11:19pm',
    property: '1B1 Adams - 2',
    guest: 'Cheyenne Castillo',
    category: 'RESERVATION CHANGES',
    action: 'The guest was advised by Airbnb to request a refund and rebook due to payment issues; host team needs to discuss and determine the best way forward and update the guest.',
    completedBy: 'Sam Demo',
    completed: true,
  },
  {
    date: 'Oct 10',
    time: '11:00pm',
    property: '4183',
    guest: 'Bradley White',
    category: 'MAINTENANCE',
    action: 'The guest reported that the iPad remote is not working and is unable to control the TV with it.',
    completedBy: 'Sam Demo',
    completed: true,
  },
  {
    date: 'Oct 10',
    time: '9:41pm',
    property: '1B1 Adams - 5',
    guest: 'Otteger Mary',
    category: 'SPECIAL REQUESTS',
    action: 'The guest requested to switch rooms due to a strong fish odor in unit five that is making her feel sick; need to address.',
    completedBy: 'Sam Demo',
    completed: true,
  },
  {
    date: 'Oct 10',
    time: '9:25pm',
    property: '1B1 Adams - 5',
    guest: 'Otteger Mary',
    category: 'MAINTENANCE',
    action: 'The guest reported that the battery for the security unit in room five needs to be changed.',
    completedBy: 'Sam Demo',
    completed: true,
  },
  {
    date: 'Oct 10',
    time: '9:28pm',
    property: '831 B',
    guest: 'Claudia Garcia',
    category: 'MAINTENANCE',
    action: 'The guest reported that the sink is clogged and draining slowly; further action may be required once more information is received.',
    completedBy: 'HostBuddy',
    completed: true,
  },
  {
    date: 'Oct 10',
    time: '6:29pm',
    property: '1B1 Adams - 10',
    guest: 'Leslie Demarco',
    category: 'RESERVATION CHANGES',
    action: 'The guest requested to extend their stay by two nights at the discounted rate; confirm with the guest that the rate shown is the one available and refund the reservation accordingly.',
    completedBy: 'HostBuddy',
    completed: true,
  },
  {
    date: 'Oct 10',
    time: '6:10pm',
    property: 'Leo 506',
    guest: 'Jasmine Zavala',
    category: 'MAINTENANCE',
    action: 'The guest reported that the unit door lock is malfunctioning and needs to be checked and repaired after the stay.',
    completedBy: 'Sam Demo',
    completed: true,
  },
  {
    date: 'Oct 10',
    time: '4:50pm',
    property: 'Leo 401',
    guest: 'Nathan Kelly',
    category: 'OTHER',
    action: 'The guest requested a response from the primary host regarding the concerns and messages sent to the host team.',
    completedBy: 'Sam Demo',
    completed: true,
  },
  {
    date: 'Oct 10',
    time: '4:37pm',
    property: 'Leo 601',
    guest: 'Natalie Tasichuk',
    category: 'RESERVATION CHANGES',
    action: 'The guest stated they cancelled their reservation back in August.',
    completedBy: 'HostBuddy',
    completed: true,
  },
  {
    date: 'Oct 10',
    time: '4:15pm',
    property: 'Leo 506',
    guest: 'Jasmine Zavala',
    category: 'MAINTENANCE',
    action: 'The guest reported that the unit door lock is malfunctioning, likely due to a low battery, and is currently using a backup key.',
    completedBy: 'HostBuddy',
    completed: true,
  },
  {
    date: 'Oct 10',
    time: '3:45pm',
    property: 'Leo 403',
    guest: 'Sarah Johnson',
    category: 'CLEANLINESS',
    action: 'The guest reported that the bathroom had not been properly cleaned before check-in and requested immediate cleaning service.',
    completedBy: 'HostBuddy',
    completed: true,
  },
  {
    date: 'Oct 10',
    time: '3:20pm',
    property: '1B1 Adams - 8',
    guest: 'Michael Chen',
    category: 'SPECIAL REQUESTS',
    action: 'The guest requested early check-in at 11am instead of the standard 3pm check-in time.',
    completedBy: 'Sam Demo',
    completed: true,
  },
  {
    date: 'Oct 10',
    time: '2:55pm',
    property: '4183',
    guest: 'Emma Wilson',
    category: 'MAINTENANCE',
    action: 'The guest reported that the air conditioning unit is making loud noises and not cooling effectively.',
    completedBy: 'HostBuddy',
    completed: true,
  },
  {
    date: 'Oct 10',
    time: '2:30pm',
    property: 'Leo 601',
    guest: 'David Martinez',
    category: 'CLEANLINESS',
    action: 'The guest requested additional towels and bed linens for extra guests staying in the unit.',
    completedBy: 'Sam Demo',
    completed: true,
  },
  {
    date: 'Oct 10',
    time: '1:15pm',
    property: '1B1 Adams - 2',
    guest: 'Lisa Anderson',
    category: 'MAINTENANCE',
    action: 'The guest reported that the dishwasher is not draining properly and has standing water at the bottom.',
    completedBy: 'HostBuddy',
    completed: true,
  },
  {
    date: 'Oct 10',
    time: '12:45pm',
    property: '831 B',
    guest: 'James Taylor',
    category: 'SPECIAL REQUESTS',
    action: 'The guest requested information about nearby restaurants and local attractions for their stay.',
    completedBy: 'Sam Demo',
    completed: true,
  },
  {
    date: 'Oct 10',
    time: '11:30am',
    property: 'Leo 506',
    guest: 'Jennifer Brown',
    category: 'RESERVATION CHANGES',
    action: 'The guest requested to change their reservation dates from Oct 15-20 to Oct 18-23 due to flight changes.',
    completedBy: 'HostBuddy',
    completed: true,
  },
  {
    date: 'Oct 10',
    time: '10:55am',
    property: '1B1 Adams - 5',
    guest: 'Robert Garcia',
    category: 'CLEANLINESS',
    action: 'The guest reported finding pet hair on the couch despite the listing stating no pets allowed in the unit.',
    completedBy: 'Sam Demo',
    completed: true,
  },
  {
    date: 'Oct 10',
    time: '10:20am',
    property: 'Leo 403',
    guest: 'Maria Rodriguez',
    category: 'MAINTENANCE',
    action: 'The guest reported that the shower head is loose and water is leaking from the connection.',
    completedBy: 'HostBuddy',
    completed: true,
  },
  {
    date: 'Oct 10',
    time: '9:45am',
    property: '4183',
    guest: 'Christopher Lee',
    category: 'OTHER',
    action: 'The guest asked about the wifi password as they were unable to find it in the welcome book.',
    completedBy: 'Sam Demo',
    completed: true,
  },
  {
    date: 'Oct 10',
    time: '9:10am',
    property: '1B1 Adams - 3',
    guest: 'Amanda White',
    category: 'SPECIAL REQUESTS',
    action: 'The guest requested a crib and high chair for their infant staying with them during the visit.',
    completedBy: 'HostBuddy',
    completed: true,
  },
  {
    date: 'Oct 10',
    time: '8:35am',
    property: 'Leo 601',
    guest: 'Daniel Harris',
    category: 'MAINTENANCE',
    action: 'The guest reported that one of the bedroom lights is flickering and may need a new bulb or electrical check.',
    completedBy: 'Sam Demo',
    completed: true,
  },
  {
    date: 'Oct 10',
    time: '7:50am',
    property: '1B1 Adams - 10',
    guest: 'Michelle Thompson',
    category: 'CLEANLINESS',
    action: 'The guest requested a mid-stay cleaning service as they are staying for two weeks.',
    completedBy: 'HostBuddy',
    completed: true,
  },
  {
    date: 'Oct 9',
    time: '11:30pm',
    property: '831 B',
    guest: 'Kevin Martinez',
    category: 'MAINTENANCE',
    action: 'The guest reported that the garage door opener is not working and they cannot access the parking space.',
    completedBy: 'Sam Demo',
    completed: true,
  },
  {
    date: 'Oct 9',
    time: '10:15pm',
    property: 'Leo 506',
    guest: 'Rachel Green',
    category: 'SPECIAL REQUESTS',
    action: 'The guest requested late checkout at 2pm instead of the standard 11am due to a late afternoon flight.',
    completedBy: 'HostBuddy',
    completed: true,
  },
  {
    date: 'Oct 9',
    time: '9:40pm',
    property: '1B1 Adams - 4',
    guest: 'Steven Clark',
    category: 'OTHER',
    action: 'The guest inquired about the possibility of extending their stay for an additional three days.',
    completedBy: 'Sam Demo',
    completed: true,
  },
  {
    date: 'Oct 9',
    time: '8:25pm',
    property: 'Leo 403',
    guest: 'Nicole King',
    category: 'MAINTENANCE',
    action: 'The guest reported that the garbage disposal is jammed and making grinding noises when turned on.',
    completedBy: 'HostBuddy',
    completed: true,
  },
  {
    date: 'Oct 9',
    time: '7:50pm',
    property: '4183',
    guest: 'Brian Scott',
    category: 'CLEANLINESS',
    action: 'The guest found some dishes in the dishwasher that were not completely clean and requested a re-wash.',
    completedBy: 'Sam Demo',
    completed: true,
  },
  {
    date: 'Oct 9',
    time: '6:35pm',
    property: '1B1 Adams - 8',
    guest: 'Jessica Adams',
    category: 'RESERVATION CHANGES',
    action: 'The guest needs to update the number of guests from 2 to 4 people for their upcoming reservation.',
    completedBy: 'HostBuddy',
    completed: true,
  },
  {
    date: 'Oct 9',
    time: '5:20pm',
    property: 'Leo 601',
    guest: 'Andrew Turner',
    category: 'SPECIAL REQUESTS',
    action: 'The guest requested recommendations for a good seafood restaurant within walking distance of the property.',
    completedBy: 'Sam Demo',
    completed: true,
  },
  {
    date: 'Oct 9',
    time: '4:45pm',
    property: '1B1 Adams - 2',
    guest: 'Melissa Phillips',
    category: 'MAINTENANCE',
    action: 'The guest reported that the toilet in the master bathroom is running continuously and wasting water.',
    completedBy: 'HostBuddy',
    completed: true,
  },
];

function MultiSelectDropdown({ 
  label, 
  options, 
  selected, 
  onChange 
}: { 
  label: string; 
  options: string[]; 
  selected: string[]; 
  onChange: (selected: string[]) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter(item => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  const displayText = selected.length === 0 ? label : selected.length === options.length ? label : `${selected.length} selected`;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[rgba(189,193,201,0.08)] h-[40px] rounded-[4px] px-[12px] flex items-center justify-between gap-2 min-w-[180px] border border-[#013280] hover:border-[#3e88f7] transition-colors"
      >
        <span className="text-[#d0d3db] text-[14px] font-['DM_Sans:Medium',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
          {displayText}
        </span>
        <ChevronDown className="w-4 h-4 text-[#a6a9b2]" />
      </button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full mt-1 left-0 bg-[#17191f] border border-[#013280] rounded-[4px] shadow-lg z-20 min-w-full max-h-[300px] overflow-y-auto">
            {options.map((option) => (
              <div
                key={option}
                onClick={() => toggleOption(option)}
                className="px-[12px] py-[8px] flex items-center gap-2 hover:bg-[#01255e] cursor-pointer transition-colors"
              >
                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                  selected.includes(option) ? 'bg-[#3e88f7] border-[#3e88f7]' : 'border-[#676a73]'
                }`}>
                  {selected.includes(option) && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className="text-[#d0d3db] text-[14px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                  {option}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function SingleSelectDropdown({ 
  label, 
  options, 
  selected, 
  onChange 
}: { 
  label: string; 
  options: string[]; 
  selected: string; 
  onChange: (selected: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const selectOption = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[rgba(189,193,201,0.08)] h-[40px] rounded-[4px] px-[12px] flex items-center justify-between gap-2 min-w-[180px] border border-[#013280] hover:border-[#3e88f7] transition-colors"
      >
        <span className="text-[#d0d3db] text-[14px] font-['DM_Sans:Medium',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
          {selected}
        </span>
        <ChevronDown className="w-4 h-4 text-[#a6a9b2]" />
      </button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full mt-1 left-0 bg-[#17191f] border border-[#013280] rounded-[4px] shadow-lg z-20 min-w-full">
            {options.map((option) => (
              <div
                key={option}
                onClick={() => selectOption(option)}
                className="px-[12px] py-[8px] hover:bg-[#01255e] cursor-pointer transition-colors"
              >
                <span className="text-[#d0d3db] text-[14px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                  {option}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function ActionItems() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('Incomplete');
  const [items, setItems] = useState<ActionItemType[]>([]);

  useEffect(() => {
    // Load initial data
    setItems(getActionItems());
    
    // Subscribe to updates
    const unsubscribe = subscribeToActionItems(() => {
      setItems(getActionItems());
    });
    
    return unsubscribe;
  }, []);

  const toggleCompletion = (id: number) => {
    toggleActionItemCompletion(id);
  };

  const filteredItems = items.filter(item => {
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.some(cat => 
      item.category?.includes(cat.toUpperCase().replace(' ', ' '))
    );
    const propertyMatch = selectedProperties.length === 0 || selectedProperties.includes(item.property);
    const statusMatch = selectedStatus === 'Incomplete' ? !item.completed : 
                        selectedStatus === 'Complete' ? item.completed : true;
    
    return categoryMatch && propertyMatch && statusMatch;
  });

  const showCompletedBy = selectedStatus !== 'Incomplete';

  return (
    <div className="bg-[#0F1117] min-h-screen p-8 flex flex-col">
      {/* Header with filters - Fixed */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-white text-[32px] font-['DM_Sans:Bold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
            Action Items
          </h1>
          
          <div className="flex items-center gap-4">
            <MultiSelectDropdown
              label="All Categories"
              options={categories}
              selected={selectedCategories}
              onChange={setSelectedCategories}
            />
            
            <SingleSelectDropdown
              label="Completed"
              options={completedStatuses}
              selected={selectedStatus}
              onChange={setSelectedStatus}
            />
            
            <MultiSelectDropdown
              label="All Properties"
              options={properties}
              selected={selectedProperties}
              onChange={setSelectedProperties}
            />
          </div>
        </div>
      </div>

      {/* Table Container with Scroll */}
      <div className="bg-[#17191f] border-2 border-[#013280] rounded-xl overflow-hidden flex flex-col flex-1" style={{ boxShadow: '0 0 25px rgba(30, 75, 158, 0.2)' }}>
        {/* Table Header - Sticky */}
        <div className={`grid ${showCompletedBy ? 'grid-cols-[120px_180px_180px_1fr_140px_100px]' : 'grid-cols-[120px_180px_180px_1fr_100px]'} gap-4 px-6 py-3 bg-[#0F1117] border-b border-[#013280] sticky top-0 z-10`}>
          <p className="text-[#a6a9b2] text-[12px] font-['DM_Sans:SemiBold',_sans-serif] uppercase" style={{ fontVariationSettings: "'opsz' 14" }}>
            Date/Time
          </p>
          <p className="text-[#a6a9b2] text-[12px] font-['DM_Sans:SemiBold',_sans-serif] uppercase" style={{ fontVariationSettings: "'opsz' 14" }}>
            Property/Guest
          </p>
          <p className="text-[#a6a9b2] text-[12px] font-['DM_Sans:SemiBold',_sans-serif] uppercase" style={{ fontVariationSettings: "'opsz' 14" }}>
            Category
          </p>
          <p className="text-[#a6a9b2] text-[12px] font-['DM_Sans:SemiBold',_sans-serif] uppercase" style={{ fontVariationSettings: "'opsz' 14" }}>
            Action Item
          </p>
          {showCompletedBy && (
            <p className="text-[#a6a9b2] text-[12px] font-['DM_Sans:SemiBold',_sans-serif] uppercase" style={{ fontVariationSettings: "'opsz' 14" }}>
              Completed By
            </p>
          )}
          <p className="text-[#a6a9b2] text-[12px] font-['DM_Sans:SemiBold',_sans-serif] uppercase text-center" style={{ fontVariationSettings: "'opsz' 14" }}>
            View/Done
          </p>
        </div>

        {/* Table Rows - Scrollable */}
        <div className="overflow-y-auto">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={`grid ${showCompletedBy ? 'grid-cols-[120px_180px_180px_1fr_140px_100px]' : 'grid-cols-[120px_180px_180px_1fr_100px]'} gap-4 px-6 py-4 border-b border-[#013280] last:border-b-0 hover:bg-[#01255e] transition-colors`}
          >
            <div>
              <p className="text-white text-[14px] font-['DM_Sans:Medium',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                {item.date}
              </p>
              <p className="text-[#a6a9b2] text-[12px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                {item.time}
              </p>
            </div>
            
            <div>
              <p className="text-white text-[14px] font-['DM_Sans:Medium',_sans-serif] truncate" style={{ fontVariationSettings: "'opsz' 14" }}>
                {item.property}
              </p>
              <p className="text-[#a6a9b2] text-[12px] font-['DM_Sans:Regular',_sans-serif] truncate" style={{ fontVariationSettings: "'opsz' 14" }}>
                {item.guest}
              </p>
            </div>
            
            <div>
              <p className="text-white text-[12px] font-['DM_Sans:SemiBold',_sans-serif] uppercase" style={{ fontVariationSettings: "'opsz' 14" }}>
                {item.category}
              </p>
            </div>
            
            <p className="text-white text-[14px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
              {item.action}
            </p>
            
            {showCompletedBy && (
              <p className="text-white text-[14px] font-['DM_Sans:Medium',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                {item.completed ? item.completedBy : '—'}
              </p>
            )}
            
            <div className="flex items-center justify-center gap-2">
              <button className="text-[#a6a9b2] hover:text-[#3e88f7] transition-colors">
                <ExternalLink className="w-4 h-4" />
              </button>
              <CompleteButton 
                completed={item.completed}
                onClick={() => toggleCompletion(item.id)}
              />
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}
