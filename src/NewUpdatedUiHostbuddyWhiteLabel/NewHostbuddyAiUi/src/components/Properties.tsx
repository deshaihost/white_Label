import { useState, useEffect } from 'react';
import { MoreVertical, Plus, Clock, Edit2, Check, Link, RefreshCw, Lock, Trash2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { showSaveSuccess } from './useSaveNotification';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import ScheduleModal from './ScheduleModal';
import CreateNewProperty from './CreateNewProperty';
import UnlockPropertyModal from './UnlockPropertyModal';
import DeletePropertyModal from './DeletePropertyModal';
import { SubscribeModal } from './SubscribeModal';
import { ChatEmbedModal } from './ChatEmbedModal';
import { RegenerateChatLinkModal } from './RegenerateChatLinkModal';
import faviconImage from 'figma:asset/8c57f694868279ca7b9c2fd95c7970c4ad789baf.png';
import { ArrowRight } from 'lucide-react';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

interface PropertiesProps {
  onTestProperty?: (propertyName: string, propertyImage?: string) => void;
  onPropertySetup?: (propertyName: string, propertyImage?: string, pmsLinked?: boolean, pmsName?: string) => void;
  onNavigate?: (page: string) => void;
}

const supportedPMS = [
  'Avantio', 'Beds24', 'Guesty', 'Hospitable', 'Host Tools', 'Hostaway', 
  'Hostex', 'Hostfully', 'Hostify', 'Lodgify', 'OwnerRez', 'RentalWise', 
  'Resly', 'Smily', 'Tokeet'
];

const unsupportedPMS = [
  'Streamline', 'LiveRez', 'Cloudbeds', 'Uplisting', 'Track', 'Icnea', 
  'Homhero', 'eviivo', 'Hosthub', 'CiiRus'
];

export default function Properties({ onTestProperty, onPropertySetup, onNavigate }: PropertiesProps) {
  const [pmsConnected, setPmsConnected] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [pmsModalOpen, setPmsModalOpen] = useState(false);
  const [integrationModalOpen, setIntegrationModalOpen] = useState(false);
  const [earlyAccessModalOpen, setEarlyAccessModalOpen] = useState(false);
  const [subscribeModalOpen, setSubscribeModalOpen] = useState(false);
  const [importPropertiesModalOpen, setImportPropertiesModalOpen] = useState(false);
  const [selectedPMS, setSelectedPMS] = useState<string | null>(null);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [copyModalOpen, setCopyModalOpen] = useState(false);
  const [currentProperty, setCurrentProperty] = useState<{ id: number; name: string } | null>(null);
  const [propertyStatuses, setPropertyStatuses] = useState<{ [key: number]: 'responding' | 'stopped' }>({});
  const [propertySchedules, setPropertySchedules] = useState<{ [key: number]: boolean }>({});
  const [selectedPropertiesToImport, setSelectedPropertiesToImport] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [importedProperties, setImportedProperties] = useState<Array<{
    id: number;
    name: string;
    image: string;
    status: 'responding' | 'stopped';
    isLocked?: boolean;
    pmsLinked?: boolean;
    pmsName?: string;
  }>>([]);
  const [showCreateProperty, setShowCreateProperty] = useState(false);
  const [unlockModalOpen, setUnlockModalOpen] = useState(false);
  const [propertyToUnlock, setPropertyToUnlock] = useState<{ id: number; name: string } | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<{ id: number; name: string } | null>(null);
  const [chatEmbedModalOpen, setChatEmbedModalOpen] = useState(false);
  const [selectedPropertyForEmbed, setSelectedPropertyForEmbed] = useState<string>('');
  const [regenerateLinkModalOpen, setRegenerateLinkModalOpen] = useState(false);
  const [propertyToRegenerate, setPropertyToRegenerate] = useState<{ id: number; name: string } | null>(null);

  // Helper function to check if current time is within a scheduled time block
  const isCurrentlyScheduledOn = (scheduleData: any) => {
    if (!scheduleData) return false;

    const now = new Date();
    const currentDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][now.getDay()];
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTimeInMinutes = currentHour * 60 + currentMinute;

    // Helper to convert time string like "9:00 AM" to minutes since midnight
    const timeToMinutes = (timeStr: string): number => {
      const match = timeStr.match(/(\d+):(\d+)\s+(AM|PM)/);
      if (!match) return 0;
      let hour = parseInt(match[1]);
      const minute = parseInt(match[2]);
      const period = match[3];
      
      if (period === 'PM' && hour !== 12) hour += 12;
      if (period === 'AM' && hour === 12) hour = 0;
      
      return hour * 60 + minute;
    };

    // Helper to check if current date is within a date range
    const isDateInRange = (startDate: string, endDate: string): boolean => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
      const end = new Date(endDate);
      end.setHours(0, 0, 0, 0);
      return today >= start && today <= end;
    };

    // Check date ranges first (they take priority)
    if (scheduleData.dateRanges && scheduleData.dateRanges.length > 0) {
      for (const range of scheduleData.dateRanges) {
        if (isDateInRange(range.startDate, range.endDate)) {
          const startMinutes = timeToMinutes(range.startTime);
          const endMinutes = timeToMinutes(range.endTime);
          if (currentTimeInMinutes >= startMinutes && currentTimeInMinutes <= endMinutes) {
            return true;
          }
        }
      }
    }

    // Check weekly schedule
    if (scheduleData.weeklySchedule && scheduleData.weeklySchedule[currentDay]) {
      const daySchedule = scheduleData.weeklySchedule[currentDay];
      if (daySchedule.enabled && daySchedule.timeBlocks) {
        for (const block of daySchedule.timeBlocks) {
          const startMinutes = timeToMinutes(block.startTime);
          const endMinutes = timeToMinutes(block.endTime);
          if (currentTimeInMinutes >= startMinutes && currentTimeInMinutes <= endMinutes) {
            return true;
          }
        }
      }
    }

    return false;
  };

  // Load property schedules from localStorage on mount and check if currently scheduled
  useEffect(() => {
    const schedules = JSON.parse(localStorage.getItem('propertySchedules') || '{}');
    const scheduleStatuses: { [key: number]: boolean } = {};
    
    // Check if each property is currently within a scheduled time
    Object.keys(schedules).forEach(propertyId => {
      const schedule = schedules[propertyId];
      if (isCurrentlyScheduledOn(schedule)) {
        scheduleStatuses[parseInt(propertyId)] = true;
      }
    });
    
    setPropertySchedules(scheduleStatuses);
    
    // Update schedule status every minute
    const interval = setInterval(() => {
      const updatedSchedules = JSON.parse(localStorage.getItem('propertySchedules') || '{}');
      const updatedStatuses: { [key: number]: boolean } = {};
      
      Object.keys(updatedSchedules).forEach(propertyId => {
        const schedule = updatedSchedules[propertyId];
        if (isCurrentlyScheduledOn(schedule)) {
          updatedStatuses[parseInt(propertyId)] = true;
        }
      });
      
      setPropertySchedules(updatedStatuses);
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [importedProperties]);

  // All available properties from PMS with their details
  const allAvailablePMSProperties = [
    { 
      name: 'Boho Villa | Best Location | Full Staff',
      image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYWJpbnxlbnwxfHx8fDE3NjAyMTU0MzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    { 
      name: 'Modern Villa | Best Location | Full Staff | Cinema',
      image: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBjYWJpbnxlbnwxfHx8fDE3NjAxNTEyNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    { 
      name: 'OASIS VILLA • PRIME Location • FULL STAFF • Cinema',
      image: 'https://images.unsplash.com/photo-1697807650304-907257330a3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjYWJpbnxlbnwxfHx8fDE3NjAyMTU0MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    { 
      name: 'PRIME Location FREE Parking Secured Residence',
      image: 'https://images.unsplash.com/photo-1700884597572-45ea007196a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2YWNhdGlvbiUyMHJlbnRhbHxlbnwxfHx8fDE3NjAyMTU0MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    { 
      name: 'Mountain View Lodge',
      image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYWJpbnxlbnwxfHx8fDE3NjAyMTU0MzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    { 
      name: 'Sunset Beach House',
      image: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBjYWJpbnxlbnwxfHx8fDE3NjAxNTEyNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    { 
      name: 'Lakeside Retreat',
      image: 'https://images.unsplash.com/photo-1697807650304-907257330a3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjYWJpbnxlbnwxfHx8fDE3NjAyMTU0MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    { 
      name: 'Forest Haven Cabin',
      image: 'https://images.unsplash.com/photo-1700884597572-45ea007196a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2YWNhdGlvbiUyMHJlbnRhbHxlbnwxfHx8fDE3NjAyMTU0MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    { 
      name: 'Alpine Chalet',
      image: 'https://images.unsplash.com/photo-1708659790808-8cd34b52ec78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWtlaG91c2UlMjByZXRyZWF0fGVufDF8fHx8MTc2MDIxNTQzNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    { 
      name: 'Coastal Paradise Villa',
      image: 'https://images.unsplash.com/photo-1482192505345-5655af888cc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGNhYmlufGVufDF8fHx8MTc2MDIxNTQzNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ];

  // Properties already imported into the system
  const importedPropertyNames = importedProperties.map(p => p.name);

  // Separate imported and non-imported, with non-imported first
  const nonImportedPMSProperties = allAvailablePMSProperties.filter(
    prop => !importedPropertyNames.includes(prop.name)
  );
  const importedPMSProperties = allAvailablePMSProperties.filter(
    prop => importedPropertyNames.includes(prop.name)
  );

  // Combine with non-imported first
  const allPMSProperties = [...nonImportedPMSProperties, ...importedPMSProperties];

  const filteredPmsProperties = allPMSProperties.filter(prop => 
    prop.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Only allow selection of non-imported properties
  const nonImportedFilteredProperties = filteredPmsProperties.filter(
    prop => !importedPropertyNames.includes(prop.name)
  );

  const togglePropertyImportSelection = (propertyName: string) => {
    // Only allow toggling if property is not already imported
    if (importedPropertyNames.includes(propertyName)) return;
    
    setSelectedPropertiesToImport(prev => 
      prev.includes(propertyName) 
        ? prev.filter(p => p !== propertyName)
        : [...prev, propertyName]
    );
  };

  const toggleSelectAll = () => {
    if (selectedPropertiesToImport.length === nonImportedFilteredProperties.length) {
      setSelectedPropertiesToImport([]);
    } else {
      setSelectedPropertiesToImport(nonImportedFilteredProperties.map(p => p.name));
    }
  };

  const handleImportProperties = () => {
    // Create new property objects for selected properties - they start locked if user is subscribed
    const newProperties = selectedPropertiesToImport.map((propName, index) => {
      const propDetails = allAvailablePMSProperties.find(p => p.name === propName);
      return {
        id: importedProperties.length + index + 1,
        name: propName,
        image: propDetails?.image || '',
        status: 'responding' as const,
        isLocked: isSubscribed, // Properties are locked after subscription
        pmsLinked: true, // Properties imported from PMS are linked
        pmsName: selectedPMS || 'Hostfully' // Use selected PMS name or default to Hostfully
      };
    });

    // Add to imported properties
    setImportedProperties(prev => [...prev, ...newProperties]);
    
    // Clear selections and close modal
    setSelectedPropertiesToImport([]);
    setImportPropertiesModalOpen(false);
    
    showSaveSuccess(`Successfully imported ${newProperties.length} ${newProperties.length === 1 ? 'property' : 'properties'} from ${selectedPMS || 'Hostfully'}`);
  };

  const handleCreateProperty = (name: string, thumbnailFile: File | null) => {
    // Create URL from file if provided, otherwise use a default image
    const imageUrl = thumbnailFile 
      ? URL.createObjectURL(thumbnailFile)
      : 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400';

    const newProperty = {
      id: importedProperties.length + 1,
      name: name,
      image: imageUrl,
      status: 'responding' as const,
      isLocked: isSubscribed, // Properties are locked after subscription
      pmsLinked: false, // Manually created properties are not linked to PMS
      pmsName: undefined // No PMS name for manually created properties
    };

    setImportedProperties(prev => [...prev, newProperty]);
    setShowCreateProperty(false);
    showSaveSuccess(`Property '${name}' created successfully`);
  };

  const handleUnlockProperty = (propertyId: number, propertyName: string) => {
    setPropertyToUnlock({ id: propertyId, name: propertyName });
    setUnlockModalOpen(true);
  };

  const confirmUnlockProperty = () => {
    if (propertyToUnlock) {
      if (propertyToUnlock.id === -1) {
        // Unlock all properties
        setImportedProperties(prev => 
          prev.map(p => ({ ...p, isLocked: false }))
        );
        showSaveSuccess('All properties unlocked successfully');
      } else {
        // Unlock single property
        setImportedProperties(prev => 
          prev.map(p => p.id === propertyToUnlock.id ? { ...p, isLocked: false } : p)
        );
        showSaveSuccess('Property unlocked successfully');
      }
      setUnlockModalOpen(false);
      setPropertyToUnlock(null);
    }
  };

  const handleLockProperty = (propertyId: number) => {
    setImportedProperties(prev => 
      prev.map(p => p.id === propertyId ? { ...p, isLocked: true } : p)
    );
    showSaveSuccess('Property locked successfully');
  };

  const handleDeleteProperty = (propertyId: number, propertyName: string) => {
    setPropertyToDelete({ id: propertyId, name: propertyName });
    setDeleteModalOpen(true);
  };

  const confirmDeleteProperty = () => {
    if (propertyToDelete) {
      const propertyName = propertyToDelete.name;
      setImportedProperties(prev => prev.filter(p => p.id !== propertyToDelete.id));
      
      // Clean up related data
      setPropertyStatuses(prev => {
        const newStatuses = { ...prev };
        delete newStatuses[propertyToDelete.id];
        return newStatuses;
      });
      
      setPropertySchedules(prev => {
        const newSchedules = { ...prev };
        delete newSchedules[propertyToDelete.id];
        return newSchedules;
      });
      
      // Clean up localStorage schedules
      const schedules = JSON.parse(localStorage.getItem('propertySchedules') || '{}');
      delete schedules[propertyToDelete.id];
      localStorage.setItem('propertySchedules', JSON.stringify(schedules));
      
      showSaveSuccess(`Property '${propertyName}' deleted successfully`);
    }
  };

  const handleEditProperty = (propertyId: number) => {
    const property = importedProperties.find(p => p.id === propertyId);
    if (property) {
      onPropertySetup?.(property.name, property.image, property.pmsLinked, property.pmsName);
    }
  };

  const handleGetChatLink = (propertyId: number) => {
    const property = importedProperties.find(p => p.id === propertyId);
    if (property) {
      setSelectedPropertyForEmbed(property.name);
      setChatEmbedModalOpen(true);
    }
  };

  const handleRegenerateChatLink = (propertyId: number, propertyName: string) => {
    setPropertyToRegenerate({ id: propertyId, name: propertyName });
    setRegenerateLinkModalOpen(true);
  };

  const confirmRegenerateChatLink = () => {
    if (propertyToRegenerate) {
      // TODO: Implement regenerate chat link functionality
      console.log('Regenerate chat link confirmed:', propertyToRegenerate.id);
      setRegenerateLinkModalOpen(false);
      setPropertyToRegenerate(null);
      showSaveSuccess('Chat link regenerated successfully');
    }
  };

  const openScheduleModal = (propertyId: number, propertyName: string) => {
    setCurrentProperty({ id: propertyId, name: propertyName });
    setScheduleModalOpen(true);
  };

  const handleScheduleSaved = (hasActiveSchedule: boolean) => {
    // Reload all property schedules from localStorage to catch any copied schedules
    const schedules = JSON.parse(localStorage.getItem('propertySchedules') || '{}');
    const scheduleStatuses: { [key: number]: boolean } = {};
    
    // Check if each property has an active schedule
    Object.keys(schedules).forEach(propertyId => {
      const schedule = schedules[propertyId];
      const hasActiveSchedule = schedule.weeklySchedule && Object.values(schedule.weeklySchedule).some(
        (day: any) => day.enabled && day.timeBlocks.length > 0
      ) || (schedule.dateRanges && schedule.dateRanges.length > 0);
      
      if (hasActiveSchedule) {
        scheduleStatuses[parseInt(propertyId)] = true;
      }
    });
    
    setPropertySchedules(scheduleStatuses);
    setScheduleModalOpen(false);
  };

  const togglePropertyStatus = (propertyId: number) => {
    const newStatus = propertyStatuses[propertyId] === 'stopped' ? 'responding' : 'stopped';
    setPropertyStatuses(prev => ({
      ...prev,
      [propertyId]: newStatus
    }));
    showSaveSuccess(`Property status updated to ${newStatus === 'responding' ? 'Responding' : 'Stopped'}`);
  };

  // Check if all properties are currently stopped
  const areAllStopped = importedProperties.length > 0 && importedProperties.every(prop => 
    propertyStatuses[prop.id] === 'stopped'
  );

  // Check if any properties are locked
  const areAnyLocked = importedProperties.some(prop => prop.isLocked);

  // Check if HostBuddy is online (any property is "Currently RESPONDING to all guests")
  const isHostBuddyOnline = importedProperties.length > 0 && importedProperties.some(prop => 
    propertyStatuses[prop.id] !== 'stopped' && propertySchedules[prop.id]
  );

  const handleToggleAll = () => {
    const newStatuses: { [key: number]: 'responding' | 'stopped' } = {};
    const targetStatus = areAllStopped ? 'responding' : 'stopped';
    
    importedProperties.forEach(prop => {
      newStatuses[prop.id] = targetStatus;
    });
    setPropertyStatuses(newStatuses);
  };

  const handleUnlockAll = () => {
    // Open the unlock modal for all properties
    setPropertyToUnlock({ id: -1, name: 'All Properties' }); // Use -1 to indicate all properties
    setUnlockModalOpen(true);
  };

  const handlePMSSelect = (pmsName: string) => {
    setSelectedPMS(pmsName);
  };

  const handleContinue = () => {
    if (!selectedPMS) return;
    
    const isSupported = supportedPMS.includes(selectedPMS);
    setPmsModalOpen(false);
    
    if (isSupported) {
      setIntegrationModalOpen(true);
    } else {
      setEarlyAccessModalOpen(true);
    }
  };

  const handleIntegrate = () => {
    setIntegrationModalOpen(false);
    setPmsConnected(true);
  };

  // Show Create New Property page if active (check this FIRST)
  if (showCreateProperty) {
    return (
      <CreateNewProperty
        onClose={() => setShowCreateProperty(false)}
        onSave={handleCreateProperty}
      />
    );
  }

  // Render main content based on state
  let mainContent;

  // Initial state - no PMS connection
  if (!pmsConnected) {
    mainContent = (
      <div className="h-full overflow-y-auto bg-[#0F1117]">
        {/* Free Trial Banner */}
        <div className="w-full bg-[#17191f] border-b border-[#013280] py-3">
          <div className="flex items-center justify-center gap-3 px-6">
            <div className="w-5 h-5 rounded-full border-2 border-[#3e88f7] flex items-center justify-center flex-shrink-0">
              <Clock className="w-3 h-3 text-[#3e88f7]" />
            </div>
            <p className="text-[#d0d3db] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
              <span className="font-['DM_Sans:SemiBold',_sans-serif]">Free Trial</span> — HostBuddy is free for 14 more days. <button onClick={() => setSubscribeModalOpen(true)} className="text-[#3e88f7] hover:underline">Add your billing information</button> to ensure continued access when the trial ends.
            </p>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-8 py-8">
          {/* Header */}
          <h1 className="text-[#3e88f7] font-['DM_Sans:SemiBold',_sans-serif] mb-8" style={{ fontVariationSettings: "'opsz' 14", fontSize: '32px' }}>
            Properties
          </h1>

          {/* Connect PMS and Subscribe Cards */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            {/* Connect Your PMS */}
            <button 
              onClick={() => setPmsModalOpen(true)}
              className="bg-[#17191f] border-2 border-[#2a4a8f] rounded-2xl p-8 hover:border-[#3e88f7] transition-all cursor-pointer shadow-[0_0_20px_rgba(62,136,247,0.15)] hover:shadow-[0_0_30px_rgba(62,136,247,0.3)]"
            >
              <h2 className="text-[#3e88f7] text-[20px] font-['DM_Sans:SemiBold',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
                Connect Your PMS
              </h2>
              <p className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif] leading-relaxed" style={{ fontVariationSettings: "'opsz' 14" }}>
                Connect your Property Management Software to import your properties.
              </p>
            </button>

            {/* Subscribe */}
            <button 
              onClick={() => setSubscribeModalOpen(true)}
              className="bg-[#17191f] border-2 border-[#2a4a8f] rounded-2xl p-8 hover:border-[#3e88f7] transition-all cursor-pointer shadow-[0_0_20px_rgba(62,136,247,0.15)] hover:shadow-[0_0_30px_rgba(62,136,247,0.3)]"
            >
              <h2 className="text-[#3e88f7] text-[20px] font-['DM_Sans:SemiBold',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
                Subscribe
              </h2>
              <p className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif] leading-relaxed" style={{ fontVariationSettings: "'opsz' 14" }}>
                Get HostBuddy plugged in to your guest communication.
              </p>
            </button>
          </div>

          {/* Properties List */}
          <div className="space-y-4">
            {/* Display existing properties */}
            {importedProperties.map((property) => (
              <div
                key={property.id}
                className="bg-[#17191f] border border-[#013280] rounded-lg p-4 flex items-center justify-between hover:bg-[#17191f] transition-colors"
              >
                {/* Left Side: Image and Info */}
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-[72px] h-[72px] rounded-lg overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={property.image}
                      alt={property.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-white text-[16px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                      {property.name}
                    </h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      {/* PMS Connection Status Badge */}
                      {property.pmsLinked === false && (
                        <span className="bg-[#d4183d] border border-[#d4183d] text-white px-2 py-0.5 rounded text-[11px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                          PMS Not Connected
                        </span>
                      )}
                      {/* Activity Status */}
                      <p className="text-[#a6a9b2] text-[12px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                        Currently <span className="text-[#d4183d] font-['DM_Sans:SemiBold',_sans-serif]">Off</span> (until scheduled ON)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Side: Action Buttons */}
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => onPropertySetup?.(property.name, property.image, property.pmsLinked, property.pmsName)}
                    className="bg-[#01255e] hover:bg-[#0F1117] text-[#3e88f7] px-4 py-2 rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-colors" 
                    style={{ fontVariationSettings: "'opsz' 14" }}
                  >
                    Property Setup
                  </button>
                  <button 
                    onClick={() => onTestProperty?.(property.name, property.image)}
                    className="bg-[#3e88f7] hover:bg-[#5296f8] text-white px-4 py-2 rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-colors" 
                    style={{ fontVariationSettings: "'opsz' 14" }}
                  >
                    Test Property
                  </button>
                  
                  {/* Dropdown Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="text-[#a6a9b2] hover:text-white transition-colors p-2">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                      className="bg-[#17191f] border border-[#013280] rounded-lg p-1 min-w-[200px]"
                      align="end"
                    >
                      {/* Edit Property */}
                      <DropdownMenuItem
                        onClick={() => onPropertySetup?.(property.name, property.image, property.pmsLinked, property.pmsName)}
                        className="text-[#d0d3db] hover:bg-[#0F1117] hover:text-white px-3 py-2 text-[14px] font-['DM_Sans:Medium',_sans-serif] cursor-pointer rounded flex items-center gap-2"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit Property
                      </DropdownMenuItem>

                      {/* Delete Property */}
                      <DropdownMenuItem
                        onClick={() => handleDeleteProperty(property.id, property.name)}
                        className="text-[#d4183d] hover:bg-[#0F1117] px-3 py-2 text-[14px] font-['DM_Sans:Medium',_sans-serif] cursor-pointer rounded flex items-center gap-2"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete Property
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}

            {/* Add New Property (Without PMS) */}
            <button 
              onClick={() => setShowCreateProperty(true)}
              className="w-full bg-[#17191f] border border-[#013280] rounded-lg p-4 flex items-center justify-between hover:bg-[#24262e] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-[72px] h-[72px] rounded-lg overflow-hidden flex-shrink-0">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
                    alt="Add New Property"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-[#676a73] text-[16px] font-['DM_Sans:Medium',_sans-serif] italic" style={{ fontVariationSettings: "'opsz' 14" }}>
                  Add New Property (Without PMS)
                </p>
              </div>
              <div className="bg-[#01255e] hover:bg-[#0F1117] text-[#3e88f7] p-2 rounded-lg transition-colors">
                <Plus className="w-6 h-6" />
              </div>
            </button>
          </div>

          {/* PMS Selection Modal */}
          <Dialog open={pmsModalOpen} onOpenChange={(open) => {
            setPmsModalOpen(open);
            if (!open) setSelectedPMS(null);
          }}>
            <DialogContent className="bg-[#0F1117] border-2 border-[#013280] max-w-[420px] p-0 rounded-2xl">
              <div className="p-6">
                <DialogTitle className="text-white text-center text-[24px] font-['DM_Sans:SemiBold',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>
                  Connect Your PMS
                </DialogTitle>
                <DialogDescription className="text-[#a6a9b2] text-center text-[13px] font-['DM_Sans:Regular',_sans-serif] mb-6" style={{ fontVariationSettings: "'opsz' 14" }}>
                  Select your property management system
                </DialogDescription>
                <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                  {/* Supported PMS */}
                  {supportedPMS.map((pms) => (
                    <button
                      key={pms}
                      onClick={() => handlePMSSelect(pms)}
                      className={`w-full border rounded-lg px-4 py-3 text-[14px] font-['DM_Sans:Medium',_sans-serif] transition-colors text-left ${
                        selectedPMS === pms
                          ? 'bg-[#013280] border-[#3e88f7] text-white'
                          : 'bg-[#17191f] border-[#3e88f7] text-white hover:bg-[#24262e]'
                      }`}
                      style={{ fontVariationSettings: "'opsz' 14" }}
                    >
                      {pms}
                    </button>
                  ))}
                  
                  {/* Unsupported PMS */}
                  {unsupportedPMS.map((pms) => (
                    <button
                      key={pms}
                      onClick={() => handlePMSSelect(pms)}
                      className={`w-full border rounded-lg px-4 py-3 text-[14px] font-['DM_Sans:Medium',_sans-serif] transition-colors text-left flex items-center justify-between ${
                        selectedPMS === pms
                          ? 'bg-[#373a42] border-[#4a4d54] text-[#a6a9b2]'
                          : 'bg-[#17191f] border-[#373a42] text-[#676a73] hover:bg-[#24262e]'
                      }`}
                      style={{ fontVariationSettings: "'opsz' 14" }}
                    >
                      <span>{pms}</span>
                      <span className="text-[10px] bg-[#373a42] px-2 py-1 rounded text-[#676a73] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                        JOIN WAITLIST
                      </span>
                    </button>
                  ))}
                </div>
                <div className="flex justify-center mt-6">
                  <button 
                    onClick={handleContinue}
                    disabled={!selectedPMS}
                    className="bg-[#3e88f7] hover:bg-[#5296f8] text-white px-12 py-3 rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ fontVariationSettings: "'opsz' 14" }}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Integration Modal (for supported PMS) */}
          <Dialog open={integrationModalOpen} onOpenChange={setIntegrationModalOpen}>
            <DialogContent className="bg-[#0F1117] border-2 border-[#013280] max-w-[450px] rounded-2xl">
              <div className="p-8">
                <DialogTitle className="text-white text-center text-[24px] font-['DM_Sans:SemiBold',_sans-serif] mb-4" style={{ fontVariationSettings: "'opsz' 14" }}>
                  Connect Your PMS
                </DialogTitle>
                <DialogDescription asChild>
                  <p className="text-[#a6a9b2] text-center text-[14px] font-['DM_Sans:Regular',_sans-serif] leading-relaxed mb-6" style={{ fontVariationSettings: "'opsz' 14" }}>
                    Click below to securely enter your account information and complete the integration.
                  </p>
                </DialogDescription>
                <div className="flex justify-center mb-4">
                  <button 
                    onClick={handleIntegrate}
                    className="bg-[#3e88f7] hover:bg-[#5296f8] text-white px-12 py-3 rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-colors"
                    style={{ fontVariationSettings: "'opsz' 14" }}
                  >
                    Integrate
                  </button>
                </div>
                <p className="text-[#a6a9b2] text-center text-[12px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                  For specific instructions on how to complete your PMS integration with {selectedPMS}, check out{' '}
                  <button className="text-[#3e88f7] hover:underline">
                    this page
                  </button>
                  .
                </p>
              </div>
            </DialogContent>
          </Dialog>

          {/* Early Access Modal */}
          <Dialog open={earlyAccessModalOpen} onOpenChange={setEarlyAccessModalOpen}>
            <DialogContent className="bg-[#0F1117] border-2 border-[#013280] max-w-[500px] rounded-2xl">
              <div className="p-8">
                <DialogTitle className="text-white text-center text-[24px] font-['DM_Sans:SemiBold',_sans-serif] mb-6" style={{ fontVariationSettings: "'opsz' 14" }}>
                  Connect Your PMS
                </DialogTitle>
                <DialogDescription asChild>
                  <p className="text-[#a6a9b2] text-center text-[14px] font-['DM_Sans:Regular',_sans-serif] leading-relaxed mb-6" style={{ fontVariationSettings: "'opsz' 14" }}>
                    Support for {selectedPMS} is not yet available, but it's in the works! Click below to request early access, and our team will be in touch with you soon.
                  </p>
                </DialogDescription>
                <button 
                  onClick={() => setEarlyAccessModalOpen(false)}
                  className="w-full bg-[#3e88f7] hover:bg-[#5296f8] text-white px-6 py-3 rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-colors"
                  style={{ fontVariationSettings: "'opsz' 14" }}
                >
                  Request Early Access
                </button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Subscribe Modal */}
          <SubscribeModal
            isOpen={subscribeModalOpen}
            onClose={() => setSubscribeModalOpen(false)}
            onSubscribe={() => setIsSubscribed(true)}
            onViewPlans={() => onNavigate?.('subscription')}
          />
        </div>
      </div>
    );
  } else if (pmsConnected && !isSubscribed) {
    // PMS connected but not subscribed - show trial banner and action cards
    mainContent = (
      <div className="h-full overflow-y-auto bg-[#0F1117]">
        {/* Free Trial Banner */}
        <div className="w-full bg-[#17191f] border-b border-[#013280] py-3">
          <div className="flex items-center justify-center gap-3 px-6">
            <div className="w-5 h-5 rounded-full border-2 border-[#3e88f7] flex items-center justify-center flex-shrink-0">
              <Clock className="w-3 h-3 text-[#3e88f7]" />
            </div>
            <p className="text-[#d0d3db] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
              <span className="font-['DM_Sans:SemiBold',_sans-serif]">Free Trial</span> — HostBuddy is free for 14 more days. <button onClick={() => setSubscribeModalOpen(true)} className="text-[#3e88f7] hover:underline">Add your billing information</button> to ensure continued access when the trial ends.
            </p>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-[#3e88f7] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14", fontSize: '32px' }}>
              Properties
            </h1>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-[#17191f] border border-[#013280] rounded-lg px-3 py-2">
                <div className={`w-2 h-2 rounded-full ${isHostBuddyOnline ? 'bg-[#00ff88]' : 'bg-[#ff4444]'}`} />
                <span className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Medium',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                  HostBuddy Status
                </span>
              </div>
              {areAnyLocked && (
                <button 
                  onClick={handleUnlockAll}
                  className="bg-[#01255e] hover:bg-[#013a8a] text-[#3e88f7] border border-[#013280] px-4 py-2 rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-colors flex items-center gap-2" 
                  style={{ fontVariationSettings: "'opsz' 14" }}
                >
                  <Lock className="w-4 h-4" />
                  Unlock All
                </button>
              )}
              <button 
                onClick={handleToggleAll}
                className="bg-[#3e88f7] hover:bg-[#5296f8] text-white px-4 py-2 rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-colors" 
                style={{ fontVariationSettings: "'opsz' 14" }}
              >
                {areAllStopped ? 'RESUME ALL' : 'STOP ALL'}
              </button>
            </div>
          </div>

          {/* Import Properties and Subscribe Cards */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            {/* Import Properties */}
            <button
              onClick={() => setImportPropertiesModalOpen(true)}
              className="w-full bg-[#17191f] border-2 border-[#013280] rounded-2xl p-8 shadow-[0_0_20px_rgba(62,136,247,0.15)] hover:border-[#3e88f7] transition-all text-left"
            >
              <h2 className="text-[#3e88f7] text-[20px] font-['DM_Sans:SemiBold',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
                Import Properties
              </h2>
              <p className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif] leading-relaxed" style={{ fontVariationSettings: "'opsz' 14" }}>
                Connected to {selectedPMS}. Click to import your properties.
              </p>
            </button>

            {/* Subscribe */}
            <button 
              onClick={() => setSubscribeModalOpen(true)}
              className="bg-[#17191f] border-2 border-[#2a4a8f] rounded-2xl p-8 hover:border-[#3e88f7] transition-all cursor-pointer shadow-[0_0_20px_rgba(62,136,247,0.15)] hover:shadow-[0_0_30px_rgba(62,136,247,0.3)]"
            >
              <h2 className="text-[#3e88f7] text-[20px] font-['DM_Sans:SemiBold',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
                Subscribe
              </h2>
              <p className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif] leading-relaxed" style={{ fontVariationSettings: "'opsz' 14" }}>
                Get HostBuddy plugged in to your guest communication.
              </p>
            </button>
          </div>

          {/* Properties List */}
          <div className="space-y-4">
            {importedProperties.map((property) => (
              <div
                key={property.id}
                className="bg-[#17191f] border border-[#013280] rounded-lg p-4 flex items-center justify-between hover:bg-[#17191f] transition-colors"
              >
                {/* Left Side: Image and Info */}
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-[72px] h-[72px] rounded-lg overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={property.image}
                      alt={property.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-white text-[16px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                      {property.name}
                    </h3>
                    
                    {property.isLocked ? (
                      <p className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                        This property is locked.{' '}
                        <button 
                          onClick={() => handleUnlockProperty(property.id, property.name)}
                          className="text-[#3e88f7] hover:underline font-['DM_Sans:SemiBold',_sans-serif]"
                          style={{ fontVariationSettings: "'opsz' 14" }}
                        >
                          Unlock it
                        </button>
                        {' '}to access options for responding to guests.
                      </p>
                    ) : (
                      <>
                        <div className="flex items-center gap-3 flex-wrap">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => togglePropertyStatus(property.id)}
                              className={`${
                                propertyStatuses[property.id] === 'stopped'
                                  ? 'bg-[#d4183d]'
                                  : 'bg-[#3e88f7]'
                              } text-white px-3 py-1 rounded text-[12px] font-['DM_Sans:SemiBold',_sans-serif] uppercase transition-colors hover:opacity-90`}
                              style={{ fontVariationSettings: "'opsz' 14" }}
                            >
                              {propertyStatuses[property.id] === 'stopped' ? 'STOPPED' : 'STOP'}
                            </button>
                            <button 
                              onClick={() => openScheduleModal(property.id, property.name)}
                              className="flex items-center gap-1 hover:opacity-80 transition-opacity"
                            >
                              <Clock className="w-4 h-4 text-[#3e88f7]" />
                              <span className="text-[#3e88f7] text-[12px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                                Schedule
                              </span>
                            </button>
                          </div>
                          {/* PMS Connection Status Badge */}
                          {property.pmsLinked === false && (
                            <span className="bg-[#d4183d] border border-[#d4183d] text-white px-2 py-1 rounded text-[11px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                              PMS Not Connected
                            </span>
                          )}
                        </div>
                        <p className="text-[#a6a9b2] text-[12px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                          Currently {propertyStatuses[property.id] === 'stopped' ? (
                            <span className="text-[#d4183d] font-['DM_Sans:SemiBold',_sans-serif]">OFF (Until manually un-stopped)</span>
                          ) : !propertySchedules[property.id] ? (
                            <span className="text-[#d4183d] font-['DM_Sans:SemiBold',_sans-serif]">Off</span>
                          ) : (
                            <span className="text-[#4ade80] font-['DM_Sans:SemiBold',_sans-serif]">RESPONDING</span>
                          )} {propertyStatuses[property.id] !== 'stopped' && !propertySchedules[property.id] ? ' (until scheduled ON)' : propertyStatuses[property.id] !== 'stopped' && propertySchedules[property.id] ? ' to all guests' : ''}
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {/* Right Side: Buttons and Menu */}
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => onPropertySetup?.(property.name, property.image, property.pmsLinked, property.pmsName)}
                    className="bg-[#01255e] hover:bg-[#0F1117] text-[#3e88f7] px-4 py-2 rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-colors" 
                    style={{ fontVariationSettings: "'opsz' 14" }}
                  >
                    Property Setup
                  </button>
                  <button 
                    onClick={() => onTestProperty?.(property.name, property.image)}
                    className="bg-[#3e88f7] hover:bg-[#5296f8] text-white px-4 py-2 rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-colors" 
                    style={{ fontVariationSettings: "'opsz' 14" }}
                  >
                    Test Property
                  </button>
                  
                  {/* Dropdown Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="text-[#a6a9b2] hover:text-white transition-colors p-2">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                      className="bg-[#17191f] border border-[#013280] rounded-lg p-1 min-w-[200px]"
                      align="end"
                    >
                      {/* Edit Property - always shown */}
                      <DropdownMenuItem
                        onClick={() => handleEditProperty(property.id)}
                        className="text-[#d0d3db] hover:bg-[#0F1117] hover:text-white px-3 py-2 text-[14px] font-['DM_Sans:Medium',_sans-serif] cursor-pointer rounded flex items-center gap-2"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit Property
                      </DropdownMenuItem>

                      {/* Options only for unlocked properties */}
                      {!property.isLocked && (
                        <>
                          <DropdownMenuItem
                            onClick={() => handleGetChatLink(property.id)}
                            className="text-[#d0d3db] hover:bg-[#0F1117] hover:text-white px-3 py-2 text-[14px] font-['DM_Sans:Medium',_sans-serif] cursor-pointer rounded flex items-center gap-2"
                            style={{ fontVariationSettings: "'opsz' 14" }}
                          >
                            <Link className="w-4 h-4" />
                            Get Chat Link or Embed
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onClick={() => handleRegenerateChatLink(property.id, property.name)}
                            className="text-[#d0d3db] hover:bg-[#0F1117] hover:text-white px-3 py-2 text-[14px] font-['DM_Sans:Medium',_sans-serif] cursor-pointer rounded flex items-center gap-2"
                            style={{ fontVariationSettings: "'opsz' 14" }}
                          >
                            <RefreshCw className="w-4 h-4" />
                            Regenerate Chat Link
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onClick={() => handleLockProperty(property.id)}
                            className="text-[#d0d3db] hover:bg-[#0F1117] hover:text-white px-3 py-2 text-[14px] font-['DM_Sans:Medium',_sans-serif] cursor-pointer rounded flex items-center gap-2"
                            style={{ fontVariationSettings: "'opsz' 14" }}
                          >
                            <Lock className="w-4 h-4" />
                            Lock Property
                          </DropdownMenuItem>
                        </>
                      )}

                      {/* Delete Property - always shown */}
                      <DropdownMenuItem
                        onClick={() => handleDeleteProperty(property.id, property.name)}
                        className="text-[#d4183d] hover:bg-[#0F1117] px-3 py-2 text-[14px] font-['DM_Sans:Medium',_sans-serif] cursor-pointer rounded flex items-center gap-2"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete Property
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}

            {/* Add New Property */}
            <button 
              onClick={() => setShowCreateProperty(true)}
              className="w-full bg-[#17191f] border border-[#013280] rounded-lg p-4 flex items-center justify-between hover:bg-[#24262e] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-[72px] h-[72px] rounded-lg overflow-hidden flex-shrink-0">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
                    alt="Add New Property"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-[#676a73] text-[16px] font-['DM_Sans:Medium',_sans-serif] italic" style={{ fontVariationSettings: "'opsz' 14" }}>
                  Add New Property (Without PMS)
                </p>
              </div>
              <div className="bg-[#01255e] hover:bg-[#0F1117] text-[#3e88f7] p-2 rounded-lg transition-colors">
                <Plus className="w-6 h-6" />
              </div>
            </button>
          </div>
        </div>

        {/* Subscribe Modal */}
        <SubscribeModal
          isOpen={subscribeModalOpen}
          onClose={() => setSubscribeModalOpen(false)}
          onSubscribe={() => setIsSubscribed(true)}
          onViewPlans={() => onNavigate?.('subscription')}
        />

        {/* Import Properties Modal */}
        <Dialog open={importPropertiesModalOpen} onOpenChange={setImportPropertiesModalOpen}>
          <DialogContent className="bg-[#0F1117] border-2 border-[#013280] max-w-[400px] rounded-2xl p-0">
            <div className="p-6">
              <DialogTitle className="text-white text-center text-[20px] font-['DM_Sans:SemiBold',_sans-serif] mb-6" style={{ fontVariationSettings: "'opsz' 14" }}>
                Import Properties from PMS
              </DialogTitle>
              <DialogDescription className="sr-only">
                Select properties from your property management system to import into HostBuddy
              </DialogDescription>

              {/* Search Input */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search properties..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#17191f] border border-[#013280] rounded-lg px-4 py-3 text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif] placeholder:text-[#676a73] focus:outline-none focus:border-[#3e88f7] focus:ring-1 focus:ring-[#3e88f7]"
                  style={{ fontVariationSettings: "'opsz' 14" }}
                />
              </div>

              {/* Select All */}
              <button
                onClick={toggleSelectAll}
                className="text-[#3e88f7] text-[14px] font-['DM_Sans:Medium',_sans-serif] mb-4 hover:underline"
                style={{ fontVariationSettings: "'opsz' 14" }}
              >
                Select All
              </button>

              {/* Property List */}
              <div className="space-y-3 mb-6 max-h-[400px] overflow-y-auto">
                {filteredPmsProperties.map((property) => {
                  const isImported = importedPropertyNames.includes(property.name);
                  const isSelected = selectedPropertiesToImport.includes(property.name);
                  
                  return (
                    <button
                      key={property.name}
                      onClick={() => togglePropertyImportSelection(property.name)}
                      disabled={isImported}
                      className={`w-full rounded-lg p-4 flex items-center gap-3 transition-colors text-left ${
                        isImported 
                          ? 'bg-[#17191f] border-2 border-[#013280] cursor-not-allowed' 
                          : 'bg-[#0F1117] border-2 border-[#98bffa] hover:bg-[#17191f] cursor-pointer'
                      }`}
                    >
                      {/* Checkbox or Imported Indicator */}
                      {isImported ? (
                        <div className="w-5 h-5 rounded bg-[#10b981] border-2 border-[#10b981] flex items-center justify-center flex-shrink-0">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      ) : (
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                          isSelected
                            ? 'bg-[#98bffa] border-[#98bffa]'
                            : 'border-[#98bffa]'
                        }`}>
                          {isSelected && (
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </div>
                      )}
                      
                      {/* Property Name */}
                      <span className={`flex-1 text-[14px] font-['DM_Sans:Medium',_sans-serif] ${
                        isImported ? 'text-[#676a73]' : 'text-white'
                      }`} style={{ fontVariationSettings: "'opsz' 14" }}>
                        {property.name}
                      </span>

                      {/* Imported Badge */}
                      {isImported && (
                        <span className="bg-[#10b981] text-white text-[11px] font-['DM_Sans:SemiBold',_sans-serif] px-2 py-1 rounded" style={{ fontVariationSettings: "'opsz' 14" }}>
                          IMPORTED
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Import Button */}
              <div className="flex justify-center">
                <button
                  onClick={handleImportProperties}
                  disabled={selectedPropertiesToImport.length === 0}
                  className="bg-[#3e88f7] hover:bg-[#5296f8] text-white px-8 py-3 rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontVariationSettings: "'opsz' 14" }}
                >
                  Import {selectedPropertiesToImport.length > 0 ? `${selectedPropertiesToImport.length} ` : ''}Properties
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Unlock Property Modal */}
        <UnlockPropertyModal
          isOpen={unlockModalOpen}
          onClose={() => setUnlockModalOpen(false)}
          onUnlock={confirmUnlockProperty}
          propertyName={propertyToUnlock?.name}
          isUnlockAll={propertyToUnlock?.id === -1}
        />

        {/* Delete Property Modal */}
        <DeletePropertyModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={confirmDeleteProperty}
          propertyName={propertyToDelete?.name}
        />
      </div>
    );
  } else {
    // Fully subscribed state - full properties list without trial banner
    mainContent = (
    <div className="h-full overflow-y-auto bg-[#0F1117]">
      <div className="max-w-[1200px] mx-auto px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-[#d0d3db] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14", fontSize: '32px' }}>
            Properties
          </h1>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-[#17191f] border border-[#013280] rounded-lg px-3 py-2">
              <div className={`w-2 h-2 rounded-full ${isHostBuddyOnline ? 'bg-[#00ff88]' : 'bg-[#ff4444]'}`} />
              <span className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Medium',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                HostBuddy Status
              </span>
            </div>
            {areAnyLocked && (
              <button 
                onClick={handleUnlockAll}
                className="bg-[#01255e] hover:bg-[#013a8a] text-[#3e88f7] border border-[#013280] px-4 py-2 rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-colors flex items-center gap-2" 
                style={{ fontVariationSettings: "'opsz' 14" }}
              >
                <Lock className="w-4 h-4" />
                Unlock All
              </button>
            )}
            <button 
              onClick={handleToggleAll}
              className="bg-[#3e88f7] hover:bg-[#5296f8] text-white px-4 py-2 rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-colors" 
              style={{ fontVariationSettings: "'opsz' 14" }}
            >
              {areAllStopped ? 'RESUME ALL' : 'STOP ALL'}
            </button>
          </div>
        </div>

        {/* Import Properties Button */}
        <div className="mb-6">
          <button 
            onClick={() => setImportPropertiesModalOpen(true)}
            className="w-full bg-[#17191f] border-2 border-dashed border-[#013280] rounded-lg p-4 hover:bg-[#17191f] transition-colors"
          >
            <div className="flex flex-col items-center gap-2">
              <p className="text-[#3e88f7] text-[16px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                Import Properties
              </p>
              <p className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                Connected to {selectedPMS || 'Guesty'}. Click to import your properties.
              </p>
            </div>
          </button>
        </div>

        {/* Properties List */}
        <div className="space-y-4">
          {importedProperties.length === 0 ? (
            <>
              <div className="bg-[#17191f] border border-[#013280] rounded-lg p-8 text-center">
                <p className="text-[#a6a9b2] text-[16px] font-['DM_Sans:Medium',_sans-serif] mb-4" style={{ fontVariationSettings: "'opsz' 14" }}>
                  No properties imported yet
                </p>
                <p className="text-[#676a73] text-[14px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                  Click "Import Properties" above to get started
                </p>
              </div>

              {/* Add New Property Tile */}
              <button 
                onClick={() => setShowCreateProperty(true)}
                className="w-full bg-[#17191f] border border-[#013280] rounded-lg p-4 flex items-center justify-between hover:bg-[#24262e] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-[72px] h-[72px] rounded-lg overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
                      alt="Add New Property"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-[#676a73] text-[16px] font-['DM_Sans:Medium',_sans-serif] italic" style={{ fontVariationSettings: "'opsz' 14" }}>
                    Add New Property (Without PMS)
                  </p>
                </div>
                <div className="bg-[#01255e] hover:bg-[#0F1117] text-[#3e88f7] p-2 rounded-lg transition-colors">
                  <Plus className="w-6 h-6" />
                </div>
              </button>
            </>
          ) : (
            <>
            {importedProperties.map((property) => (
            <div
              key={property.id}
              className="bg-[#17191f] border border-[#013280] rounded-lg p-4 flex items-center justify-between hover:bg-[#17191f] transition-colors"
            >
              {/* Left Side: Image and Info */}
              <div className="flex items-center gap-4 flex-1">
                <div className="w-[72px] h-[72px] rounded-lg overflow-hidden flex-shrink-0">
                  <ImageWithFallback
                    src={property.image}
                    alt={property.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-white text-[16px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                    {property.name}
                  </h3>
                  
                  {property.isLocked ? (
                    /* Locked State */
                    <p className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                      This property is locked.{' '}
                      <button 
                        onClick={() => handleUnlockProperty(property.id, property.name)}
                        className="text-[#3e88f7] hover:underline font-['DM_Sans:SemiBold',_sans-serif]"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                      >
                        Unlock it
                      </button>
                      {' '}to access options for responding to guests.
                    </p>
                  ) : (
                    /* Unlocked State */
                    <>
                      <div className="flex items-center gap-3 flex-wrap">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => togglePropertyStatus(property.id)}
                            className={`${
                              propertyStatuses[property.id] === 'stopped'
                                ? 'bg-[#d4183d]'
                                : 'bg-[#3e88f7]'
                            } text-white px-3 py-1 rounded text-[12px] font-['DM_Sans:SemiBold',_sans-serif] uppercase transition-colors hover:opacity-90`}
                            style={{ fontVariationSettings: "'opsz' 14" }}
                          >
                            {propertyStatuses[property.id] === 'stopped' ? 'STOPPED' : 'STOP'}
                          </button>
                          <button 
                            onClick={() => openScheduleModal(property.id, property.name)}
                            className="flex items-center gap-1 hover:opacity-80 transition-opacity"
                          >
                            <Clock className="w-4 h-4 text-[#3e88f7]" />
                            <span className="text-[#3e88f7] text-[12px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                              Schedule
                            </span>
                          </button>
                        </div>
                        {/* PMS Connection Status Badge */}
                        {property.pmsLinked === false && (
                          <span className="bg-[#d4183d] border border-[#d4183d] text-white px-2 py-1 rounded text-[11px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                            PMS Not Connected
                          </span>
                        )}
                      </div>
                      <p className="text-[#a6a9b2] text-[12px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                        Currently {propertyStatuses[property.id] === 'stopped' ? (
                          <span className="text-[#d4183d] font-['DM_Sans:SemiBold',_sans-serif]">OFF (Until manually un-stopped)</span>
                        ) : !propertySchedules[property.id] ? (
                          <span className="text-[#d4183d] font-['DM_Sans:SemiBold',_sans-serif]">Off</span>
                        ) : (
                          <span className="text-[#4ade80] font-['DM_Sans:SemiBold',_sans-serif]">RESPONDING</span>
                        )} {propertyStatuses[property.id] !== 'stopped' && !propertySchedules[property.id] ? ' (until scheduled ON)' : propertyStatuses[property.id] !== 'stopped' && propertySchedules[property.id] ? ' to all guests' : ''}
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Right Side: Buttons and Menu */}
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => onPropertySetup?.(property.name, property.image, property.pmsLinked, property.pmsName)}
                  className="bg-[#01255e] hover:bg-[#0F1117] text-[#3e88f7] px-4 py-2 rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-colors" 
                  style={{ fontVariationSettings: "'opsz' 14" }}
                >
                  Property Setup
                </button>
                <button 
                  onClick={() => onTestProperty?.(property.name, property.image)}
                  className="bg-[#3e88f7] hover:bg-[#5296f8] text-white px-4 py-2 rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-colors" 
                  style={{ fontVariationSettings: "'opsz' 14" }}
                >
                  Test Property
                </button>
                
                {/* Dropdown Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="text-[#a6a9b2] hover:text-white transition-colors p-2">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    className="bg-[#17191f] border border-[#013280] rounded-lg p-1 min-w-[200px]"
                    align="end"
                  >
                    {/* Edit Property - always shown */}
                    <DropdownMenuItem
                      onClick={() => handleEditProperty(property.id)}
                      className="text-[#d0d3db] hover:bg-[#0F1117] hover:text-white px-3 py-2 text-[14px] font-['DM_Sans:Medium',_sans-serif] cursor-pointer rounded flex items-center gap-2"
                      style={{ fontVariationSettings: "'opsz' 14" }}
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit Property
                    </DropdownMenuItem>

                    {/* Options only for unlocked properties */}
                    {!property.isLocked && (
                      <>
                        <DropdownMenuItem
                          onClick={() => handleGetChatLink(property.id)}
                          className="text-[#d0d3db] hover:bg-[#0F1117] hover:text-white px-3 py-2 text-[14px] font-['DM_Sans:Medium',_sans-serif] cursor-pointer rounded flex items-center gap-2"
                          style={{ fontVariationSettings: "'opsz' 14" }}
                        >
                          <Link className="w-4 h-4" />
                          Get Chat Link or Embed
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => handleRegenerateChatLink(property.id, property.name)}
                          className="text-[#d0d3db] hover:bg-[#0F1117] hover:text-white px-3 py-2 text-[14px] font-['DM_Sans:Medium',_sans-serif] cursor-pointer rounded flex items-center gap-2"
                          style={{ fontVariationSettings: "'opsz' 14" }}
                        >
                          <RefreshCw className="w-4 h-4" />
                          Regenerate Chat Link
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => handleLockProperty(property.id)}
                          className="text-[#d0d3db] hover:bg-[#0F1117] hover:text-white px-3 py-2 text-[14px] font-['DM_Sans:Medium',_sans-serif] cursor-pointer rounded flex items-center gap-2"
                          style={{ fontVariationSettings: "'opsz' 14" }}
                        >
                          <Lock className="w-4 h-4" />
                          Lock Property
                        </DropdownMenuItem>
                      </>
                    )}

                    {/* Delete Property - always shown */}
                    <DropdownMenuItem
                      onClick={() => handleDeleteProperty(property.id, property.name)}
                      className="text-[#d4183d] hover:bg-[#0F1117] px-3 py-2 text-[14px] font-['DM_Sans:Medium',_sans-serif] cursor-pointer rounded flex items-center gap-2"
                      style={{ fontVariationSettings: "'opsz' 14" }}
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete Property
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}

          {/* Add New Property */}
          <button 
            onClick={() => setShowCreateProperty(true)}
            className="w-full bg-[#17191f] border border-[#013280] rounded-lg p-4 flex items-center justify-between hover:bg-[#24262e] transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-[72px] h-[72px] rounded-lg overflow-hidden flex-shrink-0">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
                  alt="Add New Property"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[#676a73] text-[16px] font-['DM_Sans:Medium',_sans-serif] italic" style={{ fontVariationSettings: "'opsz' 14" }}>
                Add New Property (Without PMS)
              </p>
            </div>
            <div className="bg-[#01255e] hover:bg-[#0F1117] text-[#3e88f7] p-2 rounded-lg transition-colors">
              <Plus className="w-6 h-6" />
            </div>
          </button>
            </>
          )}
        </div>
      </div>

      {/* Unlock Property Modal */}
      <UnlockPropertyModal
        isOpen={unlockModalOpen}
        onClose={() => setUnlockModalOpen(false)}
        onUnlock={confirmUnlockProperty}
        propertyName={propertyToUnlock?.name}
        isUnlockAll={propertyToUnlock?.id === -1}
      />

      {/* Delete Property Modal */}
      <DeletePropertyModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDeleteProperty}
        propertyName={propertyToDelete?.name}
      />

      {/* Import Properties Modal */}
      <Dialog open={importPropertiesModalOpen} onOpenChange={setImportPropertiesModalOpen}>
        <DialogContent className="bg-[#0F1117] border-2 border-[#013280] max-w-[400px] rounded-2xl p-0">
          <div className="p-6">
            <DialogTitle className="text-white text-center text-[20px] font-['DM_Sans:SemiBold',_sans-serif] mb-6" style={{ fontVariationSettings: "'opsz' 14" }}>
              Import Properties from PMS
            </DialogTitle>
            <DialogDescription className="sr-only">
              Select properties from your property management system to import into HostBuddy
            </DialogDescription>

            {/* Search Input */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search properties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#17191f] border border-[#013280] rounded-lg px-4 py-3 text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif] placeholder:text-[#676a73] focus:outline-none focus:border-[#3e88f7] focus:ring-1 focus:ring-[#3e88f7]"
                style={{ fontVariationSettings: "'opsz' 14" }}
              />
            </div>

            {/* Select All */}
            <button
              onClick={toggleSelectAll}
              className="text-[#3e88f7] text-[14px] font-['DM_Sans:Medium',_sans-serif] mb-4 hover:underline"
              style={{ fontVariationSettings: "'opsz' 14" }}
            >
              Select All
            </button>

            {/* Property List */}
            <div className="space-y-3 mb-6 max-h-[400px] overflow-y-auto">
              {filteredPmsProperties.map((property) => {
                const isImported = importedPropertyNames.includes(property.name);
                const isSelected = selectedPropertiesToImport.includes(property.name);
                
                return (
                  <button
                    key={property.name}
                    onClick={() => togglePropertyImportSelection(property.name)}
                    disabled={isImported}
                    className={`w-full rounded-lg p-4 flex items-center gap-3 transition-colors text-left ${
                      isImported 
                        ? 'bg-[#17191f] border-2 border-[#013280] cursor-not-allowed' 
                        : 'bg-[#0F1117] border-2 border-[#98bffa] hover:bg-[#17191f] cursor-pointer'
                    }`}
                  >
                    {/* Checkbox or Imported Indicator */}
                    {isImported ? (
                      <div className="w-5 h-5 rounded bg-[#10b981] border-2 border-[#10b981] flex items-center justify-center flex-shrink-0">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    ) : (
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                        isSelected
                          ? 'bg-[#98bffa] border-[#98bffa]'
                          : 'border-[#98bffa]'
                      }`}>
                        {isSelected && (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                    )}
                    
                    {/* Property Name */}
                    <span className={`flex-1 text-[14px] font-['DM_Sans:Medium',_sans-serif] ${
                      isImported ? 'text-[#676a73]' : 'text-white'
                    }`} style={{ fontVariationSettings: "'opsz' 14" }}>
                      {property.name}
                    </span>

                    {/* Imported Badge */}
                    {isImported && (
                      <span className="bg-[#10b981] text-white text-[11px] font-['DM_Sans:SemiBold',_sans-serif] px-2 py-1 rounded" style={{ fontVariationSettings: "'opsz' 14" }}>
                        IMPORTED
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Import Button */}
            <div className="flex justify-center">
              <button
                onClick={handleImportProperties}
                disabled={selectedPropertiesToImport.length === 0}
                className="bg-[#3e88f7] hover:bg-[#5296f8] text-white px-8 py-3 rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontVariationSettings: "'opsz' 14" }}
              >
                Import {selectedPropertiesToImport.length > 0 ? `${selectedPropertiesToImport.length} ` : ''}Properties
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create New Property Modal */}
      {showCreateProperty && (
        <CreateNewProperty
          onClose={() => setShowCreateProperty(false)}
          onSave={handleCreateProperty}
        />
      )}
    </div>
    );
  }

  // Render main content + shared modals
  return (
    <>
      {mainContent}
      
      {/* Shared Modals - accessible from all states */}
      {currentProperty && (
        <ScheduleModal
          isOpen={scheduleModalOpen}
          onClose={() => setScheduleModalOpen(false)}
          propertyName={currentProperty.name}
          propertyId={currentProperty.id}
          onSave={handleScheduleSaved}
          importedProperties={importedProperties.map(p => ({ id: p.id, name: p.name }))}
        />
      )}

      <ChatEmbedModal
        isOpen={chatEmbedModalOpen}
        onClose={() => setChatEmbedModalOpen(false)}
        propertyName={selectedPropertyForEmbed}
      />

      {propertyToRegenerate && (
        <RegenerateChatLinkModal
          isOpen={regenerateLinkModalOpen}
          onClose={() => {
            setRegenerateLinkModalOpen(false);
            setPropertyToRegenerate(null);
          }}
          onConfirm={confirmRegenerateChatLink}
          propertyName={propertyToRegenerate.name}
        />
      )}
    </>
  );
}
