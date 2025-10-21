import { useState } from 'react';
import { File, Home, List, ConciergeBell, FileText, ShieldAlert, Upload, X, Edit2, ChevronDown, ChevronUp } from 'lucide-react';
import propertyImage from 'figma:asset/b2cadd2276e8e864b8c6108470c2a626dd704d20.png';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import FieldEditButton from './FieldEditButton';
import SOPFieldModal from './SOPFieldModal.tsx';
import AddTopicModal from './AddTopicModal.tsx';
import AddSOPModal from './AddSOPModal.tsx';
import ReservationPhaseSelector from './ReservationPhaseSelector';
import { showSaveSuccess } from './useSaveNotification';

interface PropertySetupProps {
  propertyName: string;
  propertyImage?: string;
  pmsLinked?: boolean;
  pmsName?: string;
  onBack: () => void;
}

type Tab = 'resources' | 'basics' | 'listing' | 'amenities' | 'sops' | 'topics';

export default function PropertySetup({ propertyName, propertyImage, pmsLinked, pmsName, onBack }: PropertySetupProps) {
  const [activeTab, setActiveTab] = useState<Tab>('resources');
  const [propertyNameInput, setPropertyNameInput] = useState(propertyName);
  const [thumbnailFile, setThumbnailFile] = useState<string>('No .jpg .png selected');
  
  // Basics tab state
  const [propertyType, setPropertyType] = useState('Apartment');
  const [propertyTypeInfo, setPropertyTypeInfo] = useState('This bungalow apartment is located in a vibrant neighborhood in San Diego, offering a cozy and convenient stay.');
  const [streetAddress, setStreetAddress] = useState('1811 Adams Ave');
  const [unitNumber, setUnitNumber] = useState('10');
  const [city, setCity] = useState('San Diego');
  const [state, setState] = useState('CA');
  const [areaCode, setAreaCode] = useState('92116');
  const [country, setCountry] = useState('US');
  
  // Additional Info Modal state (deprecated - now using Field Notes Modal)
  const [additionalInfoOpen, setAdditionalInfoOpen] = useState(false);
  const [currentFieldLabel, setCurrentFieldLabel] = useState('');
  const [currentFieldValue, setCurrentFieldValue] = useState('');
  const [selectedPhases, setSelectedPhases] = useState<Set<string>>(new Set(['future', 'inquiry', 'current']));
  
  // Listing Details field notes state
  const [listingFieldNotes, setListingFieldNotes] = useState<{[key: string]: { note: string; phases: { current: boolean; future: boolean; inquiryPast: boolean } }}>({});
  
  // Reservation Phases Modal state
  const [showReservationPhases, setShowReservationPhases] = useState(false);
  const [editingSource, setEditingSource] = useState<string | null>(null);
  
  // Reservation phases for each KB source
  const [reservationPhases, setReservationPhases] = useState<{
    [key: string]: { current: boolean; future: boolean; inquiryPast: boolean }
  }>({
    pmsPropertyDetails: { current: true, future: true, inquiryPast: true },
    pmsAvailability: { current: true, future: true, inquiryPast: true },
    pmsGuestData: { current: true, future: true, inquiryPast: true },
    pmsPastConversations: { current: true, future: true, inquiryPast: false },
    docBellevue: { current: true, future: true, inquiryPast: true },
    docUnit10: { current: true, future: false, inquiryPast: false },
    docNotion: { current: false, future: true, inquiryPast: true },
    propertyProfile: { current: true, future: true, inquiryPast: true },
  });
  
  // Temporary reservation phases for modal (for cancel/save functionality)
  const [tempReservationPhases, setTempReservationPhases] = useState<{ current: boolean; future: boolean; inquiryPast: boolean }>({ current: true, future: true, inquiryPast: true });
  
  // Documents Modal state
  const [documentsModalOpen, setDocumentsModalOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploadFileName, setUploadFileName] = useState('No file chosen');
  
  // PMS Integration state
  const [isPmsLinked, setIsPmsLinked] = useState(pmsLinked !== undefined ? pmsLinked : true);
  const [unlinkConfirmOpen, setUnlinkConfirmOpen] = useState(false);
  const [selectedPmsProperty, setSelectedPmsProperty] = useState('');
  const [linkedPmsProperty, setLinkedPmsProperty] = useState(''); // Store the linked property name
  const [pmsDisplayName, setPmsDisplayName] = useState(pmsName || 'Hostfully'); // The connected PMS name
  
  // Copy Data Modal state
  const [copyDataModalOpen, setCopyDataModalOpen] = useState(false);
  const [selectedSourceProperty, setSelectedSourceProperty] = useState('');
  const [copyDataConfirmOpen, setCopyDataConfirmOpen] = useState(false);
  
  // Document management state
  const [documents, setDocuments] = useState([
    { id: 1, name: 'Bellevue (HF Guidebook)', hiddenStages: '', sourceKey: 'docBellevue' },
    { id: 2, name: 'Unit 10 1811 Adams Ave–Welcome Doc–docx.pdf', hiddenStages: '', sourceKey: 'docUnit10' },
    { id: 3, name: 'notion_Adams – 10 – Guest.txt', hiddenStages: '', sourceKey: 'docNotion' }
  ]);
  const [deleteDocModalOpen, setDeleteDocModalOpen] = useState(false);
  const [docToDelete, setDocToDelete] = useState<{ id: number; name: string; sourceKey: string } | null>(null);
  
  const availableProperties = [
    '1811 Adams - 10',
    'Mountain View Lodge',
    'Sunset Beach House',
    'Lakeside Retreat'
  ];
  
  // Listing Details state
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['booking', 'checkin', 'details']));
  
  // Booking section
  const [airbnbCancellation, setAirbnbCancellation] = useState('Firm');
  const [vrboCancellation, setVrboCancellation] = useState('Moderate');
  const [directBookingCancel, setDirectBookingCancel] = useState('To cancel or reduce duration of their stay, guests will need to wait');
  const [fullBalanceCharged, setFullBalanceCharged] = useState('50% at time of booking, 50% due before check in. We also have a');
  const [advanceBooking, setAdvanceBooking] = useState('9 months');
  
  // Check-in & Check-out section
  const [supportHours, setSupportHours] = useState('Everyday 8am-10pm');
  const [checkInTime, setCheckInTime] = useState('4PM');
  const [checkOutTime, setCheckOutTime] = useState('10AM');
  const [findProperty, setFindProperty] = useState('The property is located at 1811 Adams Ave, Unit 10, San Diego, CA 92116. Walk to the front of the building, and on your left, you will see a Smart Lock. Enter the building entrance code provided on the day of your arrival.\n\nThe front door is located on Adams Ave. If you\'re parked, you may plug in the following coordinates to your GPS which will take you straight to parking provided.');
  const [parkingProvided, setParkingProvided] = useState('If the guests ask for parking availability, inform them that parking');
  const [closestParking, setClosestParking] = useState('Where is the closest parking spot for additional vehicles? More spots to');
  const [accessProperty, setAccessProperty] = useState('The apartment uses a keyless entry system. Instead of using a key to unlock and lock your door. On the day of your arrival, we will send you the access codes. The first code will be for the front door, and the second will be for the unit door. Please view the photos provided in the first pages of this document to guide you during your arrival.');
  const [backupLockbox, setBackupLockbox] = useState('Only provide the following backup lockbox code if the guest confirms that the door code is not working. Always verify that the guest is at the correct unit before sharing this information.\n\nIf needed, the key can be retrieved from a lockbox located at the base door. The code is 36500. If there are issues with the Smart Lock, please ask the guest to confirm the code at the base.');
  const [accessTroubleshooting, setAccessTroubleshooting] = useState('If the Smart Lock does not work, ensure you are entering the code slowly and firmly. Check that the code is valid for the check-in time (at/not it simply a simple syntax correct. The Smart Lock may freeze or die. 325-4333 for support.');
  const [earlyCheckInOut, setEarlyCheckInOut] = useState('Early check-in and late check-out are subject to availability and i');
  const [trashPlaced, setTrashPlaced] = useState('Trash and Recycling are located on the east side of the building. It');
  
  // Details section
  const [minimumStay, setMinimumStay] = useState('2 nights');
  const [maximumStay, setMaximumStay] = useState('365 nights');
  const [minimumGuestAge, setMinimumGuestAge] = useState('18');
  const [maximumGuests, setMaximumGuests] = useState('3');
  const [propertySize, setPropertySize] = useState('450 SF');
  const [numberOfFloors, setNumberOfFloors] = useState('2');
  const [bedroomDescription, setBedroomDescription] = useState('The bedroom has a comfortable queen bed that can sleep 2 people comfortably. There is an additional sleeper sofa in the living room. Bedding for the queen bed can be found in the closet.');
  const [additionalSleeping, setAdditionalSleeping] = useState('A sleeper sofa is the living room - bedding can be found in the cl');
  const [bathroomLayout, setBathroomLayout] = useState('1 bathroom with a shower');
  const [wifiNetwork, setWifiNetwork] = useState('Select Stays 10');
  const [wifiPassword, setWifiPassword] = useState('Ilovegreatdays!');
  const [propertyDescription, setPropertyDescription] = useState('Stay in the heart of University Heights, San Diego. This urban room boasts high-end finishes, a fully stocked kitchen, and a dedicated workspace for professionals. North Park is a community staple and dinner. This prime location immerses you in the vibrant local scene, situated steps away from trendy cafes, restaurants, and breweries. Across the street is a sprawling park and you\'re only 15 minutes away from the vibrant North Park, which features taco Tuesday at nearly every bar and restaurant within the area.');
  const [neighborhoodDescription, setNeighborhoodDescription] = useState('Enjoy a comfortable and convenient stay in University Heights, with everything you need right at your fingertips. This prime location immerses you in the vibrant local scene, situated steps away from trendy cafes, restaurants, and breweries. Across the street is a sprawling park and you\'re only 15 minutes away from the airport, I-town, and local businesses. The neighborhood is lively, with restaurants, shops, and bars nearby. Due to its proximity to the city center, it is walking distance to a wide range of restaurants, cafés, and shops.');
  
  // Topics to Avoid state
  const [topicsToAvoid, setTopicsToAvoid] = useState<{[key: string]: { title: string; description: string }}>({
    refund_requests: {
      title: 'Refund Requests',
      description: 'Guests asking to refund the payment due to not liking/preferring a certain aspect of their stay.'
    },
  });
  const [topicsFieldPhases, setTopicsFieldPhases] = useState<Record<string, { current: boolean; future: boolean; inquiryPast: boolean }>>({});
  const [showTopicsFieldModal, setShowTopicsFieldModal] = useState(false);
  const [currentTopicsFieldLabel, setCurrentTopicsFieldLabel] = useState('');
  const [showAddTopicModal, setShowAddTopicModal] = useState(false);
  
  // SOPs state - Check-in & Check-Out
  const [sopCheckInOutEarlyLate, setSopCheckInOutEarlyLate] = useState('If a guest wants to check in early or check out late, offer them to check on availability, inform them it\'s based on the property\'s availability, and that early check-ins are typically from 8 AM to the regular check-in time, and late check-outs are from the regular check-out time to 5 PM. The fee for early check-in and late check-out is half of the daily rate, or we can offer them to extend their reservation for a full day at the regular rate if they require both.');
  const [sopOversizedItems, setSopOversizedItems] = useState('No, we do not allow guests to leave oversized items or luggage at the property before check-in or after check-out.');
  const [sopEarlyLateRequests, setSopEarlyLateRequests] = useState('If a guest requests an early check-in or late check-out for free, politely inform them that we can accommodate upon availability with a fee. Early check-ins can be accommodated from 8 AM to the regular check-in time, and late check-outs from the regular check-out time to 5 PM. The fee is half of the daily rate for either one, or they can extend their reservation for a full day at the regular rate if they need both.');
  const [sopLastRequests, setSopLastRequests] = useState('If a guest makes a last-minute request (within 24 hours of check-in or check-out), inform them we will do our best to accommodate but cannot guarantee due to limited time. For cleaning or maintenance issues, we\'ll send someone as soon as possible. For amenities requests, let them know we\'ll try but may need to charge an expedited service fee.');
  const [sopWeatherPrecautions, setSopWeatherPrecautions] = useState('During severe weather, guests should stay indoors and follow local weather advisories. Outdoor amenities may be temporarily closed for safety. In case of power outages, we have backup lighting and emergency supplies in the utility closet. If flooding is possible, sandbags are available in the garage. Always prioritize guest safety and inform them to contact emergency services (911) if needed.');
  
  // SOPs state - Guest Requests
  const [sopExtraTowel, setSopExtraTowel] = useState('For towel or linens requests: We provide a standard set of towels and linens per guest. Extra towels are available in the linen closet. If guests need additional items beyond what\'s provided, we can arrange delivery for a small fee of $15.');
  const [sopMidCleaningRequest, setSopMidCleaningRequest] = useState('Mid-stay cleaning is available upon request for stays longer than 7 nights. Please give us at least 48 hours notice. The fee is $75 for a studio/1BR, $100 for 2BR, and $125 for 3BR+. This includes fresh linens and towels. If the guest wants daily cleaning service, we can arrange that at a discounted rate for multiple days.');
  const [sopAcceptCleaningRequest, setSopAcceptCleaningRequest] = useState('When accepting a mid-stay cleaning request:\n1. Confirm the date and time that works best for the guest (typically between 10 AM - 3 PM)\n2. Send them our booking link or request payment via the platform\n3. Arrange for our cleaning team to have access\n4. Remind guests to secure valuables and that the cleaning typically takes 2-3 hours\n5. Follow up after cleaning to ensure satisfaction');
  
  // SOPs state - Rules
  const [sopRule1, setSopRule1] = useState('No smoking inside the property. Smoking is only permitted in designated outdoor areas. A $250 cleaning fee will be charged if evidence of indoor smoking is found. This includes cigarettes, cigars, vaping, and any other smoking devices. Please use the ashtray provided on the patio and dispose of butts properly.');
  
  // SOPs state - Guest Issues
  const [sopLockout, setSopLockout] = useState('If a guest gets locked out:\n1. First, verify their identity and booking\n2. Check if they tried the backup lockbox code (if applicable)\n3. For smart locks, we can sometimes generate a temporary code remotely\n4. If needed, contact our local co-host who can be there within 30-60 minutes\n5. After hours (11 PM - 7 AM), there may be an emergency service fee of $50\n6. Remind them to save the door code in their phone for future reference');
  const [sopEmergencyContact, setSopEmergencyContact] = useState('Primary: John Smith - (555) 123-4567\nSecondary: Sarah Johnson - (555) 987-6543\nMaintenance: Apex Property Services - (555) 246-8135\nFor life-threatening emergencies, always call 911 first, then notify us.');
  const [sopNoiseComplaints, setSopNoiseComplaints] = useState('If neighbors complain about noise:\n1. Apologize for the disturbance and thank them for letting us know\n2. Immediately contact the guest to remind them of quiet hours (10 PM - 8 AM)\n3. Reference the house rules they agreed to\n4. For first offense, give a friendly warning\n5. For repeat offenses, may result in immediate eviction without refund\n6. Document all incidents with timestamps');
  const [sopWaterMoisture, setSopWaterMoisture] = useState('Small leaks: Turn off water supply valve and place towels/buckets to contain water. Call maintenance immediately.\n\nMajor flooding: Shut off main water valve (located in [location]), evacuate if necessary, call emergency plumber at (555) 246-8135, and notify us.\n\nCondensation/moisture: Ensure bathroom fan runs during and after showers, open windows for ventilation. Dehumidifier available in storage closet if needed.');
  const [sopEmergencyProcedures, setSopEmergencyProcedures] = useState('FIRE: Evacuate immediately, call 911, meet at [designated meeting spot]. Fire extinguisher in kitchen.\n\nMEDICAL: Call 911, render first aid if qualified. First aid kit under bathroom sink.\n\nSECURITY THREAT: Lock doors, call 911, go to safe interior room. Security cameras recording 24/7.\n\nPOWER OUTAGE: Flashlights in kitchen drawer. Report to utility company and notify us. Generator available for extended outages.\n\nGAS LEAK: Evacuate, don\'t use lights/electronics, call gas company emergency line from outside.');
  
  // SOPs state - Emergencies
  const [sopSafetyConcerns, setSopSafetyConcerns] = useState("Ask for additional information on the safety concern. If the concern involves an active risk, recommend the guest move to a different location or get out of harm's way. If it's not an immediate threat, let them know you will have to get back to them on the issue. Request information on how they would like to see the safety concern addressed. Request any documentation that may be relevant for us to review.");
  const [sopUtilityOutages, setSopUtilityOutages] = useState('For water heater outages, ask how long they have run the hot water and if the issue affects all sinks and showers. For power outages, confirm if the outage affects the whole house or specific areas.');
  const [sopWeatherEmergencies, setSopWeatherEmergencies] = useState('e.g., Refer the guest to the weather-related policies in the welcome document. Provide them with local emergency resource contacts and ensure their safety is prioritized.');
  const [sopMaintenanceEmergencies, setSopMaintenanceEmergencies] = useState('For urgent maintenance issues disrupting the stay, ask the guest to call 619-374-8939. We may have delays for overnight support due to our maintenance persons working hours. For non-urgent issues, request documentation (photos or videos), assess the problem, and ask if they want it addressed during or after their stay.');
  
  // SOPs state - Other
  const [sopVacation, setSopVacation] = useState('What to do on vacation: Check out our guidebook for local recommendations! We\'ve compiled a list of our favorite restaurants, attractions, hiking trails, and hidden gems. The guidebook is available on the coffee table or digitally at [link]. For personalized recommendations, feel free to ask us anytime!');
  const [sopPropertyInspections, setSopPropertyInspections] = useState('Routine property inspections occur quarterly, always with 48-hour advance notice to guests. Housekeeping is scheduled between stays. Pest control visits are monthly on the second Tuesday, typically 10 AM - 12 PM. For occupied properties, we coordinate with guests and can reschedule if needed. All service providers carry ID and will respect guest privacy.');
  
  // Property documents state
  const [propertyDocs, setPropertyDocs] = useState({
    operationalDetails: false,
    maintenanceDocuments: false
  });

  // Knowledge base sources (matching the screenshot)
  const [kbSources, setKbSources] = useState({
    pmsPropertyDetails: true,
    pmsAvailability: true,
    pmsGuestData: true,
    pmsPastConversations: false,
    docBellevue: true,
    docUnit10: true,
    docNotion: true,
    propertyProfile: true
  });

  // Auto-Fill Modal state
  const [showAutoFillModal, setShowAutoFillModal] = useState(false);
  const [showAutoFillProgress, setShowAutoFillProgress] = useState(false);
  const [autoFillSources, setAutoFillSources] = useState({
    hostfullyData: true,
    conversationHistory: true,
    bellevue: true,
    unit10Doc: true,
    notionDoc: true
  });

  // Field Notes Modal state
  const [showFieldNotesModal, setShowFieldNotesModal] = useState(false);
  const [currentFieldName, setCurrentFieldName] = useState('');
  const [fieldNotes, setFieldNotes] = useState<{[key: string]: { note: string; phases: { current: boolean; future: boolean; inquiryPast: boolean } }}>({});
  const [currentNote, setCurrentNote] = useState('');
  const [currentNotePhases, setCurrentNotePhases] = useState({ current: true, future: true, inquiryPast: true });
  const [showCopyToProperties, setShowCopyToProperties] = useState(false);
  const [selectedCopyProperties, setSelectedCopyProperties] = useState<Set<string>>(new Set());
  
  // Copy Documents to Properties state
  const [showCopyDocuments, setShowCopyDocuments] = useState(false);
  const [selectedDocCopyProperties, setSelectedDocCopyProperties] = useState<Set<string>>(new Set());
  const [showCopyDocModal, setShowCopyDocModal] = useState(false);
  const [selectedCopyDocument, setSelectedCopyDocument] = useState<{id: number; name: string; sourceKey: string} | null>(null);
  const [selectedDocModalProperties, setSelectedDocModalProperties] = useState<Set<string>>(new Set());
  const [docCopyModalPhases, setDocCopyModalPhases] = useState({ current: true, future: true, inquiryPast: true });
  
  // Amenities field notes state
  const [amenitiesFieldNotes, setAmenitiesFieldNotes] = useState<{[key: string]: { note: string; phases: { current: boolean; future: boolean; inquiryPast: boolean } }}>({});
  
  // SOP Field Modal state
  const [showSOPFieldModal, setShowSOPFieldModal] = useState(false);
  
  // Add SOP Modal state
  const [showAddSOPModal, setShowAddSOPModal] = useState(false);
  const [addSOPSection, setAddSOPSection] = useState('');
  const [currentSOPFieldLabel, setCurrentSOPFieldLabel] = useState('');
  const [sopFieldPhases, setSOPFieldPhases] = useState<Record<string, { current: boolean; future: boolean; inquiryPast: boolean }>>({});
  
  // Dynamic SOPs state
  const [dynamicSOPs, setDynamicSOPs] = useState<Record<string, Array<{ title: string; description: string }>>>({
    'Check-in & Check-Out': [],
    'Guest Requests': [],
    'Rules': [],
    'Guest Issues': [],
    'Emergencies': [],
    'Other': []
  });

  const tabs = [
    { id: 'resources' as Tab, label: 'Resources', icon: File },
    { id: 'basics' as Tab, label: 'Basics', icon: Home },
    { id: 'listing' as Tab, label: 'Listing Details', icon: List },
    { id: 'amenities' as Tab, label: 'Amenities', icon: ConciergeBell },
    { id: 'sops' as Tab, label: 'SOPs', icon: FileText },
    { id: 'topics' as Tab, label: 'Topics to Avoid', icon: ShieldAlert }
  ];
  
  const handleUnlink = () => {
    setIsPmsLinked(false);
    setLinkedPmsProperty('');
    setUnlinkConfirmOpen(false);
    showSaveSuccess(`Property unlinked from ${pmsDisplayName} successfully`);
  };
  
  const handleLinkProperty = () => {
    if (selectedPmsProperty) {
      setIsPmsLinked(true);
      setLinkedPmsProperty(selectedPmsProperty);
      setSelectedPmsProperty('');
      showSaveSuccess(`Property linked to ${pmsDisplayName} successfully`);
    }
  };
  
  const handleEditSource = (sourceName: string) => {
    setEditingSource(sourceName);
    // Initialize temp state with current saved phases
    setTempReservationPhases(reservationPhases[sourceName] || { current: true, future: true, inquiryPast: true });
    setShowReservationPhases(true);
  };
  
  const hasModifiedReservationPhases = (sourceName: string) => {
    const phases = reservationPhases[sourceName];
    // Check if phases exist and if any phase is deselected (not all three are true)
    return phases && (!phases.current || !phases.future || !phases.inquiryPast);
  };
  
  const togglePhase = (phase: 'current' | 'future' | 'inquiryPast') => {
    if (!editingSource) return;
    // Update temporary state instead of actual state
    setTempReservationPhases(prev => ({
      ...prev,
      [phase]: !prev[phase]
    }));
  };
  
  const handleSaveReservationPhases = () => {
    if (!editingSource) return;
    // Save temp state to actual state
    setReservationPhases(prev => ({
      ...prev,
      [editingSource]: tempReservationPhases
    }));
    setShowReservationPhases(false);
    setEditingSource(null);
    showSaveSuccess('Reservation phases updated successfully');
  };
  
  const getHiddenStages = (sourceKey: string): string => {
    const phases = reservationPhases[sourceKey];
    if (!phases) return '—';
    
    const hiddenPhases: string[] = [];
    if (!phases.inquiryPast) hiddenPhases.push('Inquiry/Past');
    if (!phases.future) hiddenPhases.push('Future');
    if (!phases.current) hiddenPhases.push('Current');
    
    return hiddenPhases.length > 0 ? hiddenPhases.join(', ') : '—';
  };
  
  const handleCancelReservationPhases = () => {
    // Just close without saving
    setShowReservationPhases(false);
    setEditingSource(null);
  };
  
  const openFieldNote = (fieldName: string, fieldLabel: string) => {
    setCurrentFieldName(fieldName);
    setCurrentFieldLabel(fieldLabel);
    setCurrentNote(fieldNotes[fieldName]?.note || '');
    setCurrentNotePhases(fieldNotes[fieldName]?.phases || { current: true, future: true, inquiry: true });
    setShowFieldNotesModal(true);
  };
  
  const openSOPField = (fieldName: string, fieldLabel: string) => {
    setCurrentFieldName(fieldName);
    setCurrentSOPFieldLabel(fieldLabel);
    setShowSOPFieldModal(true);
  };
  
  const handleSaveSOPField = (phases: { current: boolean; future: boolean; inquiryPast: boolean }) => {
    setSOPFieldPhases(prev => ({
      ...prev,
      [currentFieldName]: phases
    }));
    showSaveSuccess('SOP field updated successfully');
  };
  
  const hasSOPFieldModifications = (fieldKey: string) => {
    const phases = sopFieldPhases[fieldKey];
    const hasPhaseChange = phases && (!phases.current || !phases.future || !phases.inquiry);
    return {
      hasNote: false, // SOPs don't have notes
      hasPhaseChange: !!hasPhaseChange
    };
  };
  
  const handleDeleteDocument = (doc: { id: number; name: string; sourceKey: string }) => {
    setDocToDelete(doc);
    setDeleteDocModalOpen(true);
  };

  const confirmDeleteDocument = () => {
    if (docToDelete) {
      // Remove document from documents list
      setDocuments(prev => prev.filter(doc => doc.id !== docToDelete.id));
      
      // Also disable the corresponding knowledge base source
      setKbSources(prev => ({
        ...prev,
        [docToDelete.sourceKey]: false
      }));
      
      // Clear selection and close modal
      setDocToDelete(null);
      setDeleteDocModalOpen(false);
      showSaveSuccess('Document deleted successfully');
    }
  };

  const handleSaveAndNext = () => {
    const tabs: Tab[] = ['resources', 'basics', 'listing', 'amenities', 'sops', 'topics'];
    const currentIndex = tabs.indexOf(activeTab);
    
    showSaveSuccess('Property setup saved successfully');
    
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    } else {
      // If on the last tab, exit
      onBack();
    }
  };

  const handleSaveAndExit = () => {
    // Save all changes and exit
    showSaveSuccess('Property setup saved successfully');
    onBack();
  };

  const openTopicsField = (fieldName: string, fieldLabel: string) => {
    setCurrentFieldName(fieldName);
    setCurrentTopicsFieldLabel(fieldLabel);
    setShowTopicsFieldModal(true);
  };
  
  const handleSaveTopicsField = (phases: { current: boolean; future: boolean; inquiryPast: boolean }) => {
    setTopicsFieldPhases(prev => ({
      ...prev,
      [currentFieldName]: phases
    }));
    showSaveSuccess('Topic configuration saved successfully');
  };
  
  const hasTopicsFieldModifications = (fieldKey: string) => {
    const phases = topicsFieldPhases[fieldKey];
    const hasPhaseChange = phases && (!phases.current || !phases.future || !phases.inquiry);
    return {
      hasNote: false,
      hasPhaseChange: !!hasPhaseChange
    };
  };
  
  const handleAddTopic = (topicName: string, description: string) => {
    const topicKey = topicName.toLowerCase().replace(/[^a-z0-9]/g, '_');
    setTopicsToAvoid(prev => ({
      ...prev,
      [topicKey]: {
        title: topicName,
        description: description
      }
    }));
  };
  
  const handleOpenAddSOP = (sectionName: string) => {
    setAddSOPSection(sectionName);
    setShowAddSOPModal(true);
  };
  
  const handleAddSOP = (title: string, description: string) => {
    setDynamicSOPs(prev => ({
      ...prev,
      [addSOPSection]: [...(prev[addSOPSection] || []), { title, description }]
    }));
    showSaveSuccess('SOP question added successfully');
  };
  
  const handleUpdateDynamicSOPTitle = (section: string, index: number, newTitle: string) => {
    setDynamicSOPs(prev => ({
      ...prev,
      [section]: prev[section].map((sop, i) => 
        i === index ? { ...sop, title: newTitle } : sop
      )
    }));
  };
  
  const handleUpdateDynamicSOPDescription = (section: string, index: number, newDescription: string) => {
    setDynamicSOPs(prev => ({
      ...prev,
      [section]: prev[section].map((sop, i) => 
        i === index ? { ...sop, description: newDescription } : sop
      )
    }));
  };
  
  const handleUpdateTopicTitle = (topicKey: string, newTitle: string) => {
    setTopicsToAvoid(prev => ({
      ...prev,
      [topicKey]: {
        ...prev[topicKey],
        title: newTitle
      }
    }));
  };
  
  const handleUpdateTopicDescription = (topicKey: string, newDescription: string) => {
    setTopicsToAvoid(prev => ({
      ...prev,
      [topicKey]: {
        ...prev[topicKey],
        description: newDescription
      }
    }));
  };
  
  const handleDeleteTopic = (topicKey: string) => {
    setTopicsToAvoid(prev => {
      const newTopics = { ...prev };
      delete newTopics[topicKey];
      return newTopics;
    });
    setTopicsFieldPhases(prev => {
      const newPhases = { ...prev };
      delete newPhases[topicKey];
      return newPhases;
    });
    showSaveSuccess('Topic deleted successfully');
  };
  
  // Copy Documents handlers
  const toggleDocCopyProperty = (property: string) => {
    setSelectedDocCopyProperties(prev => {
      const newSet = new Set(prev);
      if (newSet.has(property)) {
        newSet.delete(property);
      } else {
        newSet.add(property);
      }
      return newSet;
    });
  };
  
  const handleCopyToAllDocProperties = () => {
    if (selectedDocCopyProperties.size === availableProperties.length) {
      setSelectedDocCopyProperties(new Set());
    } else {
      setSelectedDocCopyProperties(new Set(availableProperties));
    }
  };
  
  const handleCopyDocuments = () => {
    // This would copy all documents to selected properties
    console.log('Copying documents to:', Array.from(selectedDocCopyProperties));
    // Reset after copying
    setShowCopyDocuments(false);
    setSelectedDocCopyProperties(new Set());
  };
  
  const handleOpenCopyDocModal = (doc: {id: number; name: string; sourceKey: string}) => {
    setSelectedCopyDocument(doc);
    setSelectedDocModalProperties(new Set());
    // Load existing phases for this document
    setDocCopyModalPhases(reservationPhases[doc.sourceKey] || { current: true, future: true, inquiry: true });
    setShowCopyDocModal(true);
  };
  
  const toggleDocModalProperty = (property: string) => {
    setSelectedDocModalProperties(prev => {
      const newSet = new Set(prev);
      if (newSet.has(property)) {
        newSet.delete(property);
      } else {
        newSet.add(property);
      }
      return newSet;
    });
  };
  
  const handleCopyToAllDocModalProperties = () => {
    if (selectedDocModalProperties.size === availableProperties.length) {
      setSelectedDocModalProperties(new Set());
    } else {
      setSelectedDocModalProperties(new Set(availableProperties));
    }
  };
  
  const handleCopyDocumentToProperties = () => {
    if (selectedCopyDocument) {
      // Save reservation phases for this document
      setReservationPhases(prev => ({
        ...prev,
        [selectedCopyDocument.sourceKey]: docCopyModalPhases
      }));
      
      // If properties are selected, copy to those properties
      if (selectedDocModalProperties.size > 0) {
        console.log('Copying document:', selectedCopyDocument.name, 'to:', Array.from(selectedDocModalProperties), 'with phases:', docCopyModalPhases);
      }
      
      // Reset after saving
      setShowCopyDocModal(false);
      setSelectedCopyDocument(null);
      setSelectedDocModalProperties(new Set());
      setDocCopyModalPhases({ current: true, future: true, inquiry: true });
    }
  };
  
  const toggleDocCopyModalPhase = (phase: 'current' | 'future' | 'inquiry') => {
    setDocCopyModalPhases(prev => ({
      ...prev,
      [phase]: !prev[phase]
    }));
  };
  
  const openAdditionalInfo = (label: string, value: string, amenityKey?: string) => {
    // Convert label to a key-friendly format
    let fieldKey = label.toLowerCase().replace(/[^a-z0-9]/g, '_');
    
    // If this is from amenities tab, prepend 'amenity_' and use the amenity key if provided
    if (activeTab === 'amenities') {
      fieldKey = amenityKey ? `amenity_${amenityKey}` : `amenity_${fieldKey}`;
    }
    
    setCurrentFieldName(fieldKey);
    setCurrentFieldLabel(label);
    setCurrentFieldValue(value);
    
    // Load notes from appropriate state based on active tab
    if (activeTab === 'amenities') {
      setCurrentNote(amenitiesFieldNotes[fieldKey]?.note || '');
      setCurrentNotePhases(amenitiesFieldNotes[fieldKey]?.phases || { current: true, future: true, inquiry: true });
    } else {
      setCurrentNote(listingFieldNotes[fieldKey]?.note || '');
      setCurrentNotePhases(listingFieldNotes[fieldKey]?.phases || { current: true, future: true, inquiry: true });
    }
    
    setShowFieldNotesModal(true);
  };

  const handleSaveListingFieldNote = () => {
    setListingFieldNotes(prev => ({
      ...prev,
      [currentFieldName]: {
        note: currentNote,
        phases: currentNotePhases
      }
    }));
    handleSaveFieldNote();
  };

  // Helper function to check if field has modifications
  const hasFieldModifications = (fieldKey: string) => {
    // Check amenities fields first if on amenities tab
    if (activeTab === 'amenities' || fieldKey.startsWith('amenity_')) {
      const field = amenitiesFieldNotes[fieldKey];
      if (!field) return { hasNote: false, hasPhaseChange: false };
      
      const hasNote = field.note.trim().length > 0;
      const hasPhaseChange = !(field.phases.current && field.phases.future && field.phases.inquiry);
      
      return { hasNote, hasPhaseChange };
    }
    
    // Check listing details fields
    if (activeTab === 'listing' || fieldKey.includes('_')) {
      const field = listingFieldNotes[fieldKey];
      if (!field) return { hasNote: false, hasPhaseChange: false };
      
      const hasNote = field.note.trim().length > 0;
      const hasPhaseChange = !(field.phases.current && field.phases.future && field.phases.inquiry);
      
      return { hasNote, hasPhaseChange };
    }
    
    // Check basics fields
    const field = fieldNotes[fieldKey];
    if (!field) return { hasNote: false, hasPhaseChange: false };
    
    const hasNote = field.note.trim().length > 0;
    const hasPhaseChange = !(field.phases.current && field.phases.future && field.phases.inquiry);
    
    return { hasNote, hasPhaseChange };
  };
  
  const toggleAdditionalInfoPhase = (phase: string) => {
    setSelectedPhases(prev => {
      const newSet = new Set(prev);
      if (newSet.has(phase)) {
        newSet.delete(phase);
      } else {
        newSet.add(phase);
      }
      return newSet;
    });
  };

  const toggleNotePhase = (phase: 'current' | 'future' | 'inquiry') => {
    setCurrentNotePhases(prev => ({
      ...prev,
      [phase]: !prev[phase]
    }));
  };

  const handleSaveFieldNote = () => {
    // Check if this is a listing details field, amenities field, or basics field
    if (activeTab === 'listing') {
      setListingFieldNotes(prev => ({
        ...prev,
        [currentFieldName]: {
          note: currentNote,
          phases: currentNotePhases
        }
      }));
    } else if (activeTab === 'amenities') {
      setAmenitiesFieldNotes(prev => ({
        ...prev,
        [currentFieldName]: {
          note: currentNote,
          phases: currentNotePhases
        }
      }));
    } else {
      setFieldNotes(prev => ({
        ...prev,
        [currentFieldName]: {
          note: currentNote,
          phases: currentNotePhases
        }
      }));
    }
    setShowFieldNotesModal(false);
    setShowCopyToProperties(false);
    setSelectedCopyProperties(new Set());
    showSaveSuccess('Field note saved successfully');
  };

  const toggleCopyProperty = (property: string) => {
    setSelectedCopyProperties(prev => {
      const newSet = new Set(prev);
      if (newSet.has(property)) {
        newSet.delete(property);
      } else {
        newSet.add(property);
      }
      return newSet;
    });
  };

  const handleCopyToAllProperties = () => {
    setSelectedCopyProperties(new Set(availableProperties));
  };
  
  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  };
  
  // Amenities state
  const [amenities, setAmenities] = useState({
    // Indoor
    wifi: true, tv: false, airConditioning: true, heating: false, 
    freeParking: false, paidParking: false, kitchen: true, workspace: true,
    washer: true, dryer: true, pool: false, hotTub: false, fireplace: false,
    patio: false, grill: false, outdoorDining: false, firepit: false,
    gardenYard: false, beachAccess: false, lakeAccess: false, skiInOut: false,
    // Outdoor
    evCharger: false, gymAccess: false, sauna: false, smokingAllowed: false,
    // Family
    babyGear: false, crib: false, bedroomLocks: false, games: false,
    changingTable: false, highChair: false, babyMonitor: false, petFriendly: false,
    // More
    elevator: true, shampoo: true, conditioner: true, bodyWash: true,
    firstAidKit: true, hairDryer: true, essentials: true, hangers: true,
    iron: true, dishesUtensils: true, coffeeMaker: true, pets: false
  });

  return (
    <div className="h-full bg-[#0F1117] flex flex-col">
      {/* Header with Tabs */}
      <div className="border-b border-[#013280] flex-shrink-0">
        <div className="max-w-[900px] mx-auto px-6 py-6">
          <h1 className="text-white text-[28px] font-['DM_Sans:Bold',_sans-serif] mb-6 text-center" style={{ fontVariationSettings: "'opsz' 14" }}>
            {propertyName}
          </h1>
          
          {/* Tab Navigation */}
          <div className="flex justify-between max-w-[800px] mx-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                    isActive 
                      ? 'bg-[#3e88f7] shadow-lg' 
                      : 'bg-[#17191f] border border-[#013280]'
                  }`}
                    style={isActive ? { boxShadow: '0 0 10px rgba(62, 136, 247, 0.3)' } : {}}
                  >
                    <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-[#676a73]'}`} />
                  </div>
                  <span className={`text-[11px] font-['DM_Sans:SemiBold',_sans-serif] ${
                    isActive ? 'text-[#3e88f7]' : 'text-[#676a73]'
                  }`} style={{ fontVariationSettings: "'opsz' 14" }}>
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto scroll-smooth">
        <div className="max-w-[900px] mx-auto px-6 py-8 pb-24">
        {activeTab === 'resources' && (
          <div className="space-y-8">
            {/* Property Name & Thumbnail */}
            <div>
              <h2 className="text-white text-[20px] font-['DM_Sans:Bold',_sans-serif] mb-4" style={{ fontVariationSettings: "'opsz' 14" }}>
                Property Name & Thumbnail
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[#a6a9b2] text-[12px] font-['DM_Sans:Medium',_sans-serif] mb-2 block" style={{ fontVariationSettings: "'opsz' 14" }}>
                    Property Name
                  </label>
                  <input
                    type="text"
                    value={propertyNameInput}
                    onChange={(e) => setPropertyNameInput(e.target.value)}
                    className="w-full bg-[#01255e] border border-[#013280] rounded-lg px-4 py-3 text-white text-[14px] focus:outline-none focus:border-[#3e88f7] transition-all"
                    style={{ fontVariationSettings: "'opsz' 14" }}
                  />
                </div>
                <div>
                  <label className="text-[#a6a9b2] text-[12px] font-['DM_Sans:Medium',_sans-serif] mb-2 block" style={{ fontVariationSettings: "'opsz' 14" }}>
                    Thumbnail Photo (.png, .jpg, .jpeg supported)
                  </label>
                  <div className="flex gap-2">
                    <button className="bg-[#3e88f7] hover:bg-[#5296f8] text-white px-4 py-3 rounded-lg text-[13px] font-['DM_Sans:SemiBold',_sans-serif] transition-all shadow-lg"
                      style={{ 
                        fontVariationSettings: "'opsz' 14",
                        boxShadow: '0 0 10px rgba(62, 136, 247, 0.2)'
                      }}
                    >
                      Choose File
                    </button>
                    <div className="flex-1 bg-[#17191f] border border-[#013280] rounded-lg px-4 py-3 flex items-center">
                      <span className="text-[#676a73] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                        {thumbnailFile}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* PMS Integration */}
            <div>
              <h2 className={`text-[20px] font-['DM_Sans:Bold',_sans-serif] mb-4 ${!isPmsLinked ? 'text-[#d4183d]' : 'text-white'}`} style={{ fontVariationSettings: "'opsz' 14" }}>
                PMS Integration {!isPmsLinked && <span className="text-[13px] font-['DM_Sans:Regular',_sans-serif]">(Not Connected)</span>}
              </h2>
              {isPmsLinked ? (
                <div className="bg-[#17191f] border border-[#013280] rounded-lg p-4">
                  <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>
                    Linked to {pmsDisplayName} property: <span className="text-white font-['DM_Sans:SemiBold',_sans-serif]">{linkedPmsProperty || propertyNameInput}</span>
                  </p>
                  <button 
                    onClick={() => setUnlinkConfirmOpen(true)}
                    className="text-[#3e88f7] text-[13px] font-['DM_Sans:SemiBold',_sans-serif] hover:opacity-80 transition-opacity" 
                    style={{ fontVariationSettings: "'opsz' 14" }}
                  >
                    UNLINK
                  </button>
                </div>
              ) : (
                <div className="bg-[#0F1117] border-2 border-[#d4183d] rounded-lg p-4 space-y-4" style={{ boxShadow: '0 0 15px rgba(212, 24, 61, 0.2)' }}>
                  <Select value={selectedPmsProperty} onValueChange={setSelectedPmsProperty}>
                    <SelectTrigger className="w-full bg-[#01255e] border-[#013280] text-white">
                      <SelectValue placeholder="Click to select property..." />
                    </SelectTrigger>
                    <SelectContent className="bg-[#01255e] border-[#013280]">
                      {availableProperties.map((prop) => (
                        <SelectItem key={prop} value={prop} className="text-white hover:bg-[#01255e]">
                          {prop}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <button 
                    onClick={handleLinkProperty}
                    disabled={!selectedPmsProperty}
                    className="w-full bg-[#3e88f7] hover:bg-[#5296f8] disabled:bg-[#17191f] disabled:text-[#676a73] text-white px-6 py-3 rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-all shadow-lg"
                    style={{ 
                      fontVariationSettings: "'opsz' 14",
                      boxShadow: selectedPmsProperty ? '0 0 10px rgba(62, 136, 247, 0.2)' : 'none'
                    }}
                  >
                    Link To This Property
                  </button>
                </div>
              )}
            </div>

            {/* Property Documents */}
            <div>
              <h2 className="text-white text-[20px] font-['DM_Sans:Bold',_sans-serif] mb-4" style={{ fontVariationSettings: "'opsz' 14" }}>
                Property Documents
              </h2>
              <div className="space-y-3">
                <button
                  onClick={() => setDocumentsModalOpen(true)}
                  className="text-[#3e88f7] text-[14px] font-['DM_Sans:Regular',_sans-serif] hover:opacity-80 transition-opacity flex items-center gap-2"
                  style={{ fontVariationSettings: "'opsz' 14" }}
                >
                  <File className="w-4 h-4" />
                  View Uploaded Documents
                </button>
                <button
                  onClick={() => setUploadModalOpen(true)}
                  className="text-[#3e88f7] text-[14px] font-['DM_Sans:Regular',_sans-serif] hover:opacity-80 transition-opacity flex items-center gap-2"
                  style={{ fontVariationSettings: "'opsz' 14" }}
                >
                  <Upload className="w-4 h-4" />
                  + Upload New Document
                </button>
              </div>
            </div>

            {/* HostBuddy Knowledge Base */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white text-[20px] font-['DM_Sans:Bold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                  HostBuddy Knowledge Base
                </h2>
                <button className="text-[#3e88f7] text-[13px] font-['DM_Sans:SemiBold',_sans-serif] hover:opacity-80 transition-opacity" style={{ fontVariationSettings: "'opsz' 14" }}>
                  {pmsName} Connected
                </button>
              </div>
              
              <div className="bg-[#0F1117] border-2 border-[#013280] rounded-xl p-6 space-y-6">
                {/* PMS Integration */}
                <div>
                  <h3 className="text-[#a6a9b2] text-[16px] font-['DM_Sans:SemiBold',_sans-serif] mb-4" style={{ fontVariationSettings: "'opsz' 14" }}>
                    PMS Integration
                  </h3>
                  <div className="space-y-3">
                    <div className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-[#0F1117] transition-all group">
                      <button
                        onClick={() => setKbSources(prev => ({ ...prev, pmsPropertyDetails: !prev.pmsPropertyDetails }))}
                        className="flex items-center gap-3 flex-1"
                      >
                        <div className={`w-5 h-5 rounded flex items-center justify-center transition-all ${
                          kbSources.pmsPropertyDetails 
                            ? 'bg-[#3e88f7] shadow-lg' 
                            : 'bg-[#17191f] border border-[#013280]'
                        }`}
                          style={kbSources.pmsPropertyDetails ? { boxShadow: '0 0 5px rgba(62, 136, 247, 0.25)' } : {}}
                        >
                          {kbSources.pmsPropertyDetails && (
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </div>
                        <span className={`text-[14px] font-['DM_Sans:Regular',_sans-serif] ${
                          kbSources.pmsPropertyDetails ? 'text-white' : 'text-[#676a73]'
                        }`} style={{ fontVariationSettings: "'opsz' 14" }}>
                          PMS property details
                        </span>
                      </button>
                      <div className="flex items-center gap-2">
                        {hasModifiedReservationPhases('pmsPropertyDetails') && (
                          <div className="w-2 h-2 rounded-full bg-[#FB923C]" style={{ boxShadow: '0 0 4px rgba(251, 146, 60, 0.4)' }} />
                        )}
                        <button 
                          onClick={() => handleEditSource('pmsPropertyDetails')}
                          className="p-1 hover:bg-[#17191f] rounded transition-colors"
                        >
                          <Edit2 className={`w-4 h-4 transition-colors ${
                            kbSources.pmsPropertyDetails ? 'text-[#3e88f7]' : 'text-[#676a73]'
                          } group-hover:text-[#3e88f7]`} />
                        </button>
                      </div>
                    </div>
                    <div className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-[#0F1117] transition-all group">
                      <button
                        onClick={() => setKbSources(prev => ({ ...prev, pmsAvailability: !prev.pmsAvailability }))}
                        className="flex items-center gap-3 flex-1"
                      >
                        <div className={`w-5 h-5 rounded flex items-center justify-center transition-all ${
                          kbSources.pmsAvailability 
                            ? 'bg-[#3e88f7] shadow-lg' 
                            : 'bg-[#17191f] border border-[#013280]'
                        }`}
                          style={kbSources.pmsAvailability ? { boxShadow: '0 0 5px rgba(62, 136, 247, 0.25)' } : {}}
                        >
                          {kbSources.pmsAvailability && (
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </div>
                        <span className={`text-[14px] font-['DM_Sans:Regular',_sans-serif] ${
                          kbSources.pmsAvailability ? 'text-white' : 'text-[#676a73]'
                        }`} style={{ fontVariationSettings: "'opsz' 14" }}>
                          Property availability and pricing
                        </span>
                      </button>
                      <div className="flex items-center gap-2">
                        {hasModifiedReservationPhases('pmsAvailability') && (
                          <div className="w-2 h-2 rounded-full bg-[#FB923C]" style={{ boxShadow: '0 0 4px rgba(251, 146, 60, 0.4)' }} />
                        )}
                        <button 
                          onClick={() => handleEditSource('pmsAvailability')}
                          className="p-1 hover:bg-[#17191f] rounded transition-colors"
                        >
                          <Edit2 className={`w-4 h-4 transition-colors ${
                            kbSources.pmsAvailability ? 'text-[#3e88f7]' : 'text-[#676a73]'
                          } group-hover:text-[#3e88f7]`} />
                        </button>
                      </div>
                    </div>
                    <div className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-[#0F1117] transition-all group">
                      <button
                        onClick={() => setKbSources(prev => ({ ...prev, pmsGuestData: !prev.pmsGuestData }))}
                        className="flex items-center gap-3 flex-1"
                      >
                        <div className={`w-5 h-5 rounded flex items-center justify-center transition-all ${
                          kbSources.pmsGuestData 
                            ? 'bg-[#3e88f7] shadow-lg' 
                            : 'bg-[#17191f] border border-[#013280]'
                        }`}
                          style={kbSources.pmsGuestData ? { boxShadow: '0 0 5px rgba(62, 136, 247, 0.25)' } : {}}
                        >
                          {kbSources.pmsGuestData && (
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </div>
                        <span className={`text-[14px] font-['DM_Sans:Regular',_sans-serif] ${
                          kbSources.pmsGuestData ? 'text-white' : 'text-[#676a73]'
                        }`} style={{ fontVariationSettings: "'opsz' 14" }}>
                          Guest and reservation data
                        </span>
                      </button>
                      <div className="flex items-center gap-2">
                        {hasModifiedReservationPhases('pmsGuestData') && (
                          <div className="w-2 h-2 rounded-full bg-[#FB923C]" style={{ boxShadow: '0 0 4px rgba(251, 146, 60, 0.4)' }} />
                        )}
                        <button 
                          onClick={() => handleEditSource('pmsGuestData')}
                          className="p-1 hover:bg-[#17191f] rounded transition-colors"
                        >
                          <Edit2 className={`w-4 h-4 transition-colors ${
                            kbSources.pmsGuestData ? 'text-[#3e88f7]' : 'text-[#676a73]'
                          } group-hover:text-[#3e88f7]`} />
                        </button>
                      </div>
                    </div>
                    <div className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-[#0F1117] transition-all group">
                      <button
                        onClick={() => setKbSources(prev => ({ ...prev, pmsPastConversations: !prev.pmsPastConversations }))}
                        className="flex items-center gap-3 flex-1"
                      >
                        <div className={`w-5 h-5 rounded flex items-center justify-center transition-all ${
                          kbSources.pmsPastConversations 
                            ? 'bg-[#3e88f7] shadow-lg' 
                            : 'bg-[#17191f] border border-[#013280]'
                        }`}
                          style={kbSources.pmsPastConversations ? { boxShadow: '0 0 5px rgba(62, 136, 247, 0.25)' } : {}}
                        >
                          {kbSources.pmsPastConversations && (
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </div>
                        <span className={`text-[14px] font-['DM_Sans:Regular',_sans-serif] ${
                          kbSources.pmsPastConversations ? 'text-white' : 'text-[#676a73]'
                        }`} style={{ fontVariationSettings: "'opsz' 14" }}>
                          Past conversations <span className="text-[#676a73]">(last 6 months)</span>
                        </span>
                      </button>
                      <div className="flex items-center gap-2">
                        {hasModifiedReservationPhases('pmsPastConversations') && (
                          <div className="w-2 h-2 rounded-full bg-[#FB923C]" style={{ boxShadow: '0 0 4px rgba(251, 146, 60, 0.4)' }} />
                        )}
                        <button 
                          onClick={() => handleEditSource('pmsPastConversations')}
                          className="p-1 hover:bg-[#17191f] rounded transition-colors"
                        >
                          <Edit2 className={`w-4 h-4 transition-colors ${
                            kbSources.pmsPastConversations ? 'text-[#3e88f7]' : 'text-[#676a73]'
                          } group-hover:text-[#3e88f7]`} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Property Documents */}
                <div>
                  <h3 className="text-[#a6a9b2] text-[16px] font-['DM_Sans:SemiBold',_sans-serif] mb-4" style={{ fontVariationSettings: "'opsz' 14" }}>
                    Property Documents
                  </h3>
                  <div className="space-y-3">
                    {documents.map((doc) => (
                      <div key={doc.id} className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-[#0F1117] transition-all group">
                        <button
                          onClick={() => setKbSources(prev => ({ ...prev, [doc.sourceKey]: !(prev as any)[doc.sourceKey] }))}
                          className="flex items-center gap-3 flex-1"
                        >
                          <div className={`w-5 h-5 rounded flex items-center justify-center transition-all ${
                            (kbSources as any)[doc.sourceKey]
                              ? 'bg-[#3e88f7] shadow-lg' 
                              : 'bg-[#17191f] border border-[#013280]'
                          }`}
                            style={(kbSources as any)[doc.sourceKey] ? { boxShadow: '0 0 5px rgba(62, 136, 247, 0.25)' } : {}}
                          >
                            {(kbSources as any)[doc.sourceKey] && (
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                          </div>
                          <span className={`text-[14px] font-['DM_Sans:Regular',_sans-serif] ${
                            (kbSources as any)[doc.sourceKey] ? 'text-white' : 'text-[#676a73]'
                          }`} style={{ fontVariationSettings: "'opsz' 14" }}>
                            {doc.name}
                          </span>
                        </button>
                        <div className="flex items-center gap-2">
                          {hasModifiedReservationPhases(doc.sourceKey) && (
                            <div className="w-2 h-2 rounded-full bg-[#FB923C]" style={{ boxShadow: '0 0 4px rgba(251, 146, 60, 0.4)' }} />
                          )}
                          <div className="flex items-center gap-1">
                            <button 
                              onClick={() => handleOpenCopyDocModal(doc)}
                              className="p-1 hover:bg-[#17191f] rounded transition-colors"
                            >
                              <Edit2 className={`w-4 h-4 transition-colors ${
                                (kbSources as any)[doc.sourceKey] ? 'text-[#3e88f7]' : 'text-[#676a73]'
                              } group-hover:text-[#3e88f7]`} />
                            </button>
                            <button 
                              onClick={() => handleDeleteDocument(doc)}
                              className="p-1 hover:bg-[#17191f] rounded transition-colors"
                            >
                              <X className="w-4 h-4 text-[#676a73] hover:text-[#d4183d] transition-colors" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Property Profile */}
                <div>
                  <h3 className="text-[#a6a9b2] text-[16px] font-['DM_Sans:SemiBold',_sans-serif] mb-4" style={{ fontVariationSettings: "'opsz' 14" }}>
                    Property Profile
                  </h3>
                  <div className="space-y-3">
                    <div className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-[#0F1117] transition-all group">
                      <button
                        onClick={() => setKbSources(prev => ({ ...prev, propertyProfile: !prev.propertyProfile }))}
                        className="flex items-center gap-3 flex-1"
                      >
                        <div className={`w-5 h-5 rounded flex items-center justify-center transition-all ${
                          kbSources.propertyProfile 
                            ? 'bg-[#3e88f7] shadow-lg' 
                            : 'bg-[#17191f] border border-[#013280]'
                        }`}
                          style={kbSources.propertyProfile ? { boxShadow: '0 0 5px rgba(62, 136, 247, 0.25)' } : {}}
                        >
                          {kbSources.propertyProfile && (
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </div>
                        <span className={`text-[14px] font-['DM_Sans:Regular',_sans-serif] ${
                          kbSources.propertyProfile ? 'text-white' : 'text-[#676a73]'
                        }`} style={{ fontVariationSettings: "'opsz' 14" }}>
                          Data Entered
                        </span>
                      </button>
                      <div className="flex items-center gap-2">
                        {hasModifiedReservationPhases('propertyProfile') && (
                          <div className="w-2 h-2 rounded-full bg-[#FB923C]" style={{ boxShadow: '0 0 4px rgba(251, 146, 60, 0.4)' }} />
                        )}
                        <button 
                          onClick={() => handleEditSource('propertyProfile')}
                          className="p-1 hover:bg-[#17191f] rounded transition-colors"
                        >
                          <Edit2 className={`w-4 h-4 transition-colors ${
                            kbSources.propertyProfile ? 'text-[#3e88f7]' : 'text-[#676a73]'
                          } group-hover:text-[#3e88f7]`} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <button 
                onClick={() => setShowAutoFillModal(true)}
                className="bg-[#3e88f7] hover:bg-[#5296f8] text-white px-8 py-3 rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-all shadow-lg"
                style={{ 
                  fontVariationSettings: "'opsz' 14",
                  boxShadow: '0 0 10px rgba(62, 136, 247, 0.2)'
                }}
              >
                Auto-Fill Property Details
              </button>
              <button 
                onClick={() => setCopyDataModalOpen(true)}
                className="bg-[#01255e] hover:bg-[#01255e] text-[#3e88f7] px-8 py-3 rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-colors border border-[#013280]"
                style={{ fontVariationSettings: "'opsz' 14" }}
              >
                Copy Data From Other Property
              </button>
            </div>
          </div>
        )}

        {/* Basics Tab */}
        {activeTab === 'basics' && (
          <div className="space-y-8">
            <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif] text-center" style={{ fontVariationSettings: "'opsz' 14" }}>
              All fields are optional, but the more details you provide, the better HostBuddy can serve your guests.
            </p>

            {/* Location Section */}
            <div>
              <h2 className="text-white text-[20px] font-['DM_Sans:Bold',_sans-serif] mb-6" style={{ fontVariationSettings: "'opsz' 14" }}>
                Location
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-white text-[13px] font-['DM_Sans:Medium',_sans-serif] mb-2 block flex items-center gap-2" style={{ fontVariationSettings: "'opsz' 14" }}>
                      Property Type
                      <FieldEditButton
                        fieldKey="propertyType"
                        {...hasFieldModifications('propertyType')}
                        onClick={() => openFieldNote('propertyType', 'Property Type')}
                      />
                    </label>
                    <input
                      type="text"
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full bg-[#01255e] border border-[#013280] rounded-lg px-4 py-3 text-white text-[14px] focus:outline-none focus:border-[#3e88f7] transition-all"
                      style={{ fontVariationSettings: "'opsz' 14" }}
                    />
                  </div>
                  <div>
                    <label className="text-white text-[13px] font-['DM_Sans:Medium',_sans-serif] mb-2 block flex items-center gap-2" style={{ fontVariationSettings: "'opsz' 14" }}>
                      Street Address
                      <FieldEditButton
                        fieldKey="streetAddress"
                        {...hasFieldModifications('streetAddress')}
                        onClick={() => openFieldNote('streetAddress', 'Street Address')}
                      />
                    </label>
                    <input
                      type="text"
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                      className="w-full bg-[#01255e] border border-[#013280] rounded-lg px-4 py-3 text-white text-[14px] focus:outline-none focus:border-[#3e88f7] transition-all"
                      style={{ fontVariationSettings: "'opsz' 14" }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-white text-[13px] font-['DM_Sans:Medium',_sans-serif] mb-2 block flex items-center gap-2" style={{ fontVariationSettings: "'opsz' 14" }}>
                      Unit Number
                      <FieldEditButton
                        fieldKey="unitNumber"
                        {...hasFieldModifications('unitNumber')}
                        onClick={() => openFieldNote('unitNumber', 'Unit Number')}
                      />
                    </label>
                    <input
                      type="text"
                      value={unitNumber}
                      onChange={(e) => setUnitNumber(e.target.value)}
                      className="w-full bg-[#01255e] border border-[#013280] rounded-lg px-4 py-3 text-white text-[14px] focus:outline-none focus:border-[#3e88f7] transition-all"
                      style={{ fontVariationSettings: "'opsz' 14" }}
                    />
                  </div>
                  <div>
                    <label className="text-white text-[13px] font-['DM_Sans:Medium',_sans-serif] mb-2 block flex items-center gap-2" style={{ fontVariationSettings: "'opsz' 14" }}>
                      City
                      <FieldEditButton
                        fieldKey="city"
                        {...hasFieldModifications('city')}
                        onClick={() => openFieldNote('city', 'City')}
                      />
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-[#01255e] border border-[#013280] rounded-lg px-4 py-3 text-white text-[14px] focus:outline-none focus:border-[#3e88f7] transition-all"
                      style={{ fontVariationSettings: "'opsz' 14" }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-white text-[13px] font-['DM_Sans:Medium',_sans-serif] mb-2 block flex items-center gap-2" style={{ fontVariationSettings: "'opsz' 14" }}>
                      State
                      <FieldEditButton
                        fieldKey="state"
                        {...hasFieldModifications('state')}
                        onClick={() => openFieldNote('state', 'State')}
                      />
                    </label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full bg-[#01255e] border border-[#013280] rounded-lg px-4 py-3 text-white text-[14px] focus:outline-none focus:border-[#3e88f7] transition-all"
                      style={{ fontVariationSettings: "'opsz' 14" }}
                    />
                  </div>
                  <div>
                    <label className="text-white text-[13px] font-['DM_Sans:Medium',_sans-serif] mb-2 block flex items-center gap-2" style={{ fontVariationSettings: "'opsz' 14" }}>
                      Area Code
                      <button
                        onClick={() => {
                          setCurrentFieldName('areaCode');
                          setCurrentNote(fieldNotes['areaCode']?.note || '');
                          setCurrentNotePhases(fieldNotes['areaCode']?.phases || { current: true, future: true, inquiry: true });
                          setShowFieldNotesModal(true);
                        }}
                        className="text-[#3e88f7] hover:opacity-80 transition-opacity"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </label>
                    <input
                      type="text"
                      value={areaCode}
                      onChange={(e) => setAreaCode(e.target.value)}
                      className="w-full bg-[#01255e] border border-[#013280] rounded-lg px-4 py-3 text-white text-[14px] focus:outline-none focus:border-[#3e88f7] transition-all"
                      style={{ fontVariationSettings: "'opsz' 14" }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-white text-[13px] font-['DM_Sans:Medium',_sans-serif] mb-2 block flex items-center gap-2" style={{ fontVariationSettings: "'opsz' 14" }}>
                      Country
                      <FieldEditButton
                        fieldKey="country"
                        {...hasFieldModifications('country')}
                        onClick={() => openFieldNote('country', 'Country')}
                      />
                    </label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full bg-[#01255e] border border-[#013280] rounded-lg px-4 py-3 text-white text-[14px] focus:outline-none focus:border-[#3e88f7] transition-all"
                      style={{ fontVariationSettings: "'opsz' 14" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Amenities Tab */}
        {activeTab === 'amenities' && (
          <div className="space-y-6">
            <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif] text-center" style={{ fontVariationSettings: "'opsz' 14" }}>
              Select which amenities are available at your property. Click the edit icon to add notes or modify reservation phases.
            </p>

            {/* Indoor Section */}
            <div className="border-b border-[#013280] pb-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-white text-[18px] font-['DM_Sans:Bold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                  Indoor
                </h2>
                <button 
                  onClick={() => toggleSection('amenitiesIndoor')}
                  className="text-[#a6a9b2] hover:text-white transition-colors"
                >
                  {expandedSections.has('amenitiesIndoor') ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
              </div>
              
              {expandedSections.has('amenitiesIndoor') && (
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { key: 'tv', label: 'TV' },
                    { key: 'airConditioning', label: 'Air Conditioning' },
                    { key: 'heating', label: 'Heating' },
                    { key: 'wifi', label: 'WiFi' },
                    { key: 'ethernetConnection', label: 'Ethernet connection' },
                    { key: 'washer', label: 'Washer' },
                    { key: 'dryer', label: 'Dryer' },
                    { key: 'fireplace', label: 'Fireplace' },
                    { key: 'singleLevelHome', label: 'Single level home' },
                    { key: 'catOnProperty', label: 'Cat on the property' },
                    { key: 'dogOnProperty', label: 'Dog on the property' },
                    { key: 'otherPetsOnProperty', label: 'Other pets on property' },
                    { key: 'smokeDetector', label: 'Smoke detector' },
                    { key: 'fireExtinguisher', label: 'Fire extinguisher' },
                    { key: 'deadboltLock', label: 'Deadbolt lock' },
                    { key: 'outdoorLighting', label: 'Outdoor lighting' },
                    { key: 'essentials', label: 'Essentials' },
                    { key: 'babyHighChair', label: 'Baby high chair' },
                    { key: 'cdDvdPlayer', label: 'CD/DVD player' },
                    { key: 'boardGames', label: 'Board games' },
                    { key: 'ceilingFan', label: 'Ceiling fan' },
                    { key: 'ventilationFan', label: 'Ventilation fan' },
                    { key: 'hairDryer', label: 'Hair dryer' },
                    { key: 'crockeryAndCutlery', label: 'Crockery and cutlery' },
                    { key: 'potsAndPans', label: 'Pots and pans' },
                    { key: 'oven', label: 'Oven' },
                    { key: 'microwave', label: 'Microwave' },
                    { key: 'waterKettle', label: 'Water kettle' },
                    { key: 'coffeeMaker', label: 'Coffee maker' },
                    { key: 'dishwasher', label: 'Dishwasher' },
                    { key: 'toaster', label: 'Toaster' },
                    { key: 'fridge', label: 'Fridge' },
                    { key: 'diningTable', label: 'Dining table' },
                    { key: 'alarmSystem', label: 'Alarm system' },
                    { key: 'desk', label: 'Desk' },
                    { key: 'deskChair', label: 'Desk chair' },
                    { key: 'computerMonitor', label: 'Computer monitor' },
                    { key: 'printer', label: 'Printer' },
                    { key: 'safeBox', label: 'Safe box' },
                    { key: 'closetDrawers', label: 'Closet/drawers' },
                    { key: 'iron', label: 'Iron' },
                    { key: 'shampoo', label: 'Shampoo' },
                    { key: 'conditioner', label: 'Conditioner' },
                    { key: 'bodyWash', label: 'Body wash' },
                    { key: 'buzzer', label: 'Buzzer' },
                    { key: 'firstAidKit', label: 'First aid kit' },
                    { key: 'safetyCard', label: 'Safety card' },
                    { key: 'hangers', label: 'Hangers' },
                    { key: 'laptopFriendly', label: 'Laptop friendly' },
                    { key: 'stove', label: 'Stove' },
                    { key: 'linensProvided', label: 'Linens provided' },
                    { key: 'towelsProvided', label: 'Towels provided' },
                    { key: 'hotWater', label: 'Hot water' },
                    { key: 'cookingBasics', label: 'Cooking basics' },
                    { key: 'airFilter', label: 'Air filter' },
                    { key: 'enhancedCleaning', label: 'Enhanced cleaning' },
                    { key: 'disinfectantsUsed', label: 'Disinfectants used on surfaces' },
                    { key: 'bakingSheet', label: 'Baking sheet' },
                    { key: 'bidet', label: 'Bidet' },
                    { key: 'blender', label: 'Blender' },
                    { key: 'cleaningProductsAvailable', label: 'Cleaning products available' },
                    { key: 'dryingRackForClothing', label: 'Drying rack for clothing' },
                    { key: 'exerciseEquipment', label: 'Exercise equipment' },
                    { key: 'extraPillowsAndBlankets', label: 'Extra pillows and blankets' },
                    { key: 'freezer', label: 'Freezer' },
                    { key: 'miniFridge', label: 'Mini fridge' },
                    { key: 'pingPongTable', label: 'Ping pong table' },
                    { key: 'pocketWifi', label: 'Pocket WiFi' },
                    { key: 'portableFans', label: 'Portable fans' },
                    { key: 'rainShower', label: 'Rain shower' },
                    { key: 'recordPlayer', label: 'Record player' },
                    { key: 'riceMaker', label: 'Rice maker' },
                    { key: 'soundSystem', label: 'Sound system' },
                    { key: 'trashCompactor', label: 'Trash compactor' },
                    { key: 'wineGlasses', label: 'Wine glasses' },
                  ].map(item => {
                    const { hasNote, hasPhaseChange } = hasFieldModifications(`amenity_${item.key}`);
                    return (
                      <div key={item.key} className="flex items-center gap-2 bg-[#17191f] border border-[#013280] rounded-lg p-3">
                        <button
                          onClick={() => setAmenities(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof prev] }))}
                          className="flex-1 flex items-center gap-3"
                        >
                          <div className={`w-5 h-5 rounded flex items-center justify-center transition-all flex-shrink-0 ${
                            amenities[item.key as keyof typeof amenities]
                              ? 'bg-[#3e88f7] shadow-lg'
                              : 'bg-[#17191f] border border-[#013280]'
                          }`}
                            style={amenities[item.key as keyof typeof amenities] ? { boxShadow: '0 0 5px rgba(62, 136, 247, 0.25)' } : {}}
                          >
                            {amenities[item.key as keyof typeof amenities] && (
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                          </div>
                          <span className={`text-[13px] font-['DM_Sans:Regular',_sans-serif] text-left ${
                            amenities[item.key as keyof typeof amenities] ? 'text-white' : 'text-[#676a73]'
                          }`} style={{ fontVariationSettings: "'opsz' 14" }}>
                            {item.label}
                          </span>
                        </button>
                        <FieldEditButton
                          fieldKey={`amenity_${item.key}`}
                          hasNote={hasNote}
                          hasPhaseChange={hasPhaseChange}
                          onClick={() => openAdditionalInfo(item.label, amenities[item.key as keyof typeof amenities] ? 'Available' : 'Not available', item.key)}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Outdoor Section */}
            <div className="border-b border-[#013280] pb-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-white text-[18px] font-['DM_Sans:Bold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                  Outdoor
                </h2>
                <button 
                  onClick={() => toggleSection('amenitiesOutdoor')}
                  className="text-[#a6a9b2] hover:text-white transition-colors"
                >
                  {expandedSections.has('amenitiesOutdoor') ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
              </div>
              
              {expandedSections.has('amenitiesOutdoor') && (
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { key: 'pool', label: 'Pool' },
                    { key: 'fencedYard', label: 'Fenced yard' },
                    { key: 'mosquitoNet', label: 'Mosquito net' },
                    { key: 'surveillance', label: 'Surveillance' },
                    { key: 'hotTub', label: 'Hot tub' },
                    { key: 'freeParkingOnPremises', label: 'Free parking on premises' },
                    { key: 'freeParkingOnStreet', label: 'Free parking on street' },
                    { key: 'paidParkingOffPremises', label: 'Paid parking off premises' },
                    { key: 'paidParkingOnPremises', label: 'Paid parking on premises' },
                    { key: 'evCarCharger', label: 'EV car charger' },
                    { key: 'barbecue', label: 'Barbecue' },
                    { key: 'barbecueUtensils', label: 'Barbecue utensils' },
                    { key: 'garden', label: 'Garden' },
                    { key: 'deckPatio', label: 'Deck/patio' },
                    { key: 'privateEntrance', label: 'Private entrance' },
                    { key: 'beachEssentials', label: 'Beach essentials' },
                    { key: 'bikes', label: 'Bikes' },
                    { key: 'boatSlip', label: 'Boat slip' },
                    { key: 'firePit', label: 'Fire pit' },
                    { key: 'hammock', label: 'Hammock' },
                    { key: 'kayak', label: 'Kayak' },
                    { key: 'outdoorKitchen', label: 'Outdoor kitchen' },
                    { key: 'outdoorSeating', label: 'Outdoor seating' },
                  ].map(item => {
                    const { hasNote, hasPhaseChange } = hasFieldModifications(`amenity_${item.key}`);
                    return (
                      <div key={item.key} className="flex items-center gap-2 bg-[#17191f] border border-[#013280] rounded-lg p-3">
                        <button
                          onClick={() => setAmenities(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof prev] }))}
                          className="flex-1 flex items-center gap-3"
                        >
                          <div className={`w-5 h-5 rounded flex items-center justify-center transition-all flex-shrink-0 ${
                            amenities[item.key as keyof typeof amenities]
                              ? 'bg-[#3e88f7] shadow-lg'
                              : 'bg-[#17191f] border border-[#013280]'
                          }`}
                            style={amenities[item.key as keyof typeof amenities] ? { boxShadow: '0 0 5px rgba(62, 136, 247, 0.25)' } : {}}
                          >
                            {amenities[item.key as keyof typeof amenities] && (
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                          </div>
                          <span className={`text-[13px] font-['DM_Sans:Regular',_sans-serif] text-left ${
                            amenities[item.key as keyof typeof amenities] ? 'text-white' : 'text-[#676a73]'
                          }`} style={{ fontVariationSettings: "'opsz' 14" }}>
                            {item.label}
                          </span>
                        </button>
                        <FieldEditButton
                          fieldKey={`amenity_${item.key}`}
                          hasNote={hasNote}
                          hasPhaseChange={hasPhaseChange}
                          onClick={() => openAdditionalInfo(item.label, amenities[item.key as keyof typeof amenities] ? 'Available' : 'Not available', item.key)}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Family Section */}
            <div className="border-b border-[#013280] pb-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-white text-[18px] font-['DM_Sans:Bold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                  Family
                </h2>
                <button 
                  onClick={() => toggleSection('amenitiesFamily')}
                  className="text-[#a6a9b2] hover:text-white transition-colors"
                >
                  {expandedSections.has('amenitiesFamily') ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
              </div>
              
              {expandedSections.has('amenitiesFamily') && (
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { key: 'babyBath', label: 'Baby bath' },
                    { key: 'babyMonitor', label: 'Baby monitor' },
                    { key: 'babysitterRecommendations', label: 'Babysitter recommendations' },
                    { key: 'bathtub', label: 'Bathtub' },
                    { key: 'changingTable', label: 'Changing table' },
                    { key: 'childrenBooksAndToys', label: 'Children books & toys' },
                    { key: 'childrenDinnerware', label: 'Children dinnerware' },
                    { key: 'fireplaceGuards', label: 'Fireplace guards' },
                    { key: 'gameConsole', label: 'Game console' },
                    { key: 'outletCovers', label: 'Outlet covers' },
                    { key: 'packNPlayOrTravelCrib', label: 'Pack n Play or travel crib' },
                    { key: 'roomDarkeningShades', label: 'Room darkening shades' },
                    { key: 'stairGates', label: 'Stair gates' },
                    { key: 'tableCornerGuards', label: 'Table corner guards' },
                    { key: 'windowGuards', label: 'Window guards' },
                  ].map(item => {
                    const { hasNote, hasPhaseChange } = hasFieldModifications(`amenity_${item.key}`);
                    return (
                      <div key={item.key} className="flex items-center gap-2 bg-[#17191f] border border-[#013280] rounded-lg p-3">
                        <button
                          onClick={() => setAmenities(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof prev] }))}
                          className="flex-1 flex items-center gap-3"
                        >
                          <div className={`w-5 h-5 rounded flex items-center justify-center transition-all flex-shrink-0 ${
                            amenities[item.key as keyof typeof amenities]
                              ? 'bg-[#3e88f7] shadow-lg'
                              : 'bg-[#17191f] border border-[#013280]'
                          }`}
                            style={amenities[item.key as keyof typeof amenities] ? { boxShadow: '0 0 5px rgba(62, 136, 247, 0.25)' } : {}}
                          >
                            {amenities[item.key as keyof typeof amenities] && (
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                          </div>
                          <span className={`text-[13px] font-['DM_Sans:Regular',_sans-serif] text-left ${
                            amenities[item.key as keyof typeof amenities] ? 'text-white' : 'text-[#676a73]'
                          }`} style={{ fontVariationSettings: "'opsz' 14" }}>
                            {item.label}
                          </span>
                        </button>
                        <FieldEditButton
                          fieldKey={`amenity_${item.key}`}
                          hasNote={hasNote}
                          hasPhaseChange={hasPhaseChange}
                          onClick={() => openAdditionalInfo(item.label, amenities[item.key as keyof typeof amenities] ? 'Available' : 'Not available', item.key)}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* More Section */}
            <div className="border-b border-[#013280] pb-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-white text-[18px] font-['DM_Sans:Bold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                  More
                </h2>
                <button 
                  onClick={() => toggleSection('amenitiesMore')}
                  className="text-[#a6a9b2] hover:text-white transition-colors"
                >
                  {expandedSections.has('amenitiesMore') ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
              </div>
              
              {expandedSections.has('amenitiesMore') && (
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { key: 'wheelchairAccessible', label: 'Wheelchair accessible' },
                    { key: 'elevator', label: 'Elevator' },
                    { key: 'gym', label: 'Gym' },
                    { key: 'poolTable', label: 'Pool table' },
                    { key: 'piano', label: 'Piano' },
                    { key: 'breakfastIncluded', label: 'Breakfast included' },
                    { key: 'doorman', label: 'Doorman' },
                    { key: 'carbonMonoxideDetector', label: 'Carbon monoxide detector' },
                    { key: 'lakeAccess', label: 'Lake access' },
                    { key: 'beachFront', label: 'Beach front' },
                    { key: 'waterFront', label: 'Water front' },
                    { key: 'skiInSkiOut', label: 'Ski-in/Ski-out' },
                    { key: 'contactlessCheckIn', label: 'Contactless check-in' },
                    { key: 'arcadeGames', label: 'Arcade games' },
                    { key: 'battingCage', label: 'Batting cage' },
                    { key: 'booksAndReadingMaterial', label: 'Books and reading material' },
                    { key: 'bowlingAlley', label: 'Bowling alley' },
                    { key: 'climbingWall', label: 'Climbing wall' },
                    { key: 'laserTag', label: 'Laser tag' },
                    { key: 'lifeSizeGames', label: 'Life size games' },
                    { key: 'miniGolf', label: 'Mini golf' },
                    { key: 'movieTheater', label: 'Movie theater' },
                    { key: 'skateRamp', label: 'Skate ramp' },
                    { key: 'themeRoom', label: 'Theme room' },
                    { key: 'laundromatNearby', label: 'Laundromat nearby' },
                    { key: 'resortAccess', label: 'Resort access' },
                  ].map(item => {
                    const { hasNote, hasPhaseChange } = hasFieldModifications(`amenity_${item.key}`);
                    return (
                      <div key={item.key} className="flex items-center gap-2 bg-[#17191f] border border-[#013280] rounded-lg p-3">
                        <button
                          onClick={() => setAmenities(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof prev] }))}
                          className="flex-1 flex items-center gap-3"
                        >
                          <div className={`w-5 h-5 rounded flex items-center justify-center transition-all flex-shrink-0 ${
                            amenities[item.key as keyof typeof amenities]
                              ? 'bg-[#3e88f7] shadow-lg'
                              : 'bg-[#17191f] border border-[#013280]'
                          }`}
                            style={amenities[item.key as keyof typeof amenities] ? { boxShadow: '0 0 5px rgba(62, 136, 247, 0.25)' } : {}}
                          >
                            {amenities[item.key as keyof typeof amenities] && (
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                          </div>
                          <span className={`text-[13px] font-['DM_Sans:Regular',_sans-serif] text-left ${
                            amenities[item.key as keyof typeof amenities] ? 'text-white' : 'text-[#676a73]'
                          }`} style={{ fontVariationSettings: "'opsz' 14" }}>
                            {item.label}
                          </span>
                        </button>
                        <FieldEditButton
                          fieldKey={`amenity_${item.key}`}
                          hasNote={hasNote}
                          hasPhaseChange={hasPhaseChange}
                          onClick={() => openAdditionalInfo(item.label, amenities[item.key as keyof typeof amenities] ? 'Available' : 'Not available', item.key)}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Listing Details Tab */}
        {activeTab === 'listing' && (
          <div className="space-y-6">
            <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif] text-center" style={{ fontVariationSettings: "'opsz' 14" }}>
              All fields are optional, but the more details you provide, the better HostBuddy can serve your guests.
            </p>

            {/* Booking */}
            <div className="border-b border-[#013280] pb-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-white text-[18px] font-['DM_Sans:Bold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                  Booking
                </h2>
                <button 
                  onClick={() => toggleSection('booking')}
                  className="text-[#a6a9b2] hover:text-white transition-colors"
                >
                  {expandedSections.has('booking') ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
              </div>
              
              {expandedSections.has('booking') && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                          If you're listed on Airbnb, what is your cancellation policy?
                        </p>
                        <FieldEditButton
                          fieldKey="airbnb_cancellation_policy"
                          {...hasFieldModifications('airbnb_cancellation_policy')}
                          onClick={() => openAdditionalInfo('Airbnb Cancellation Policy', airbnbCancellation)}
                        />
                      </div>
                      <div className="bg-[#01255e] border border-[#013280] rounded-lg p-4">
                        <textarea
                          value={airbnbCancellation}
                          onChange={(e) => setAirbnbCancellation(e.target.value)}
                          className="w-full bg-transparent text-white text-[13px] font-['DM_Sans:Regular',_sans-serif] border-none outline-none resize-none min-h-[40px] focus:ring-0"
                          style={{ fontVariationSettings: "'opsz' 14" }}
                          rows={1}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                          If you're listed on VRBO, what is your cancellation policy?
                        </p>
                        <FieldEditButton
                          fieldKey="vrbo_cancellation_policy"
                          {...hasFieldModifications('vrbo_cancellation_policy')}
                          onClick={() => openAdditionalInfo('VRBO Cancellation Policy', vrboCancellation)}
                        />
                      </div>
                      <div className="bg-[#01255e] border border-[#013280] rounded-lg p-4">
                        <textarea
                          value={vrboCancellation}
                          onChange={(e) => setVrboCancellation(e.target.value)}
                          className="w-full bg-transparent text-white text-[13px] font-['DM_Sans:Regular',_sans-serif] border-none outline-none resize-none min-h-[40px] focus:ring-0"
                          style={{ fontVariationSettings: "'opsz' 14" }}
                          rows={1}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                        How can guests change or cancel their direct booking?
                      </p>
                      <FieldEditButton
                        fieldKey="direct_booking_cancellation"
                        {...hasFieldModifications('direct_booking_cancellation')}
                        onClick={() => openAdditionalInfo('Direct Booking Cancellation', directBookingCancel)}
                      />
                    </div>
                    <div className="bg-[#01255e] border border-[#013280] rounded-lg p-4">
                      <textarea
                        value={directBookingCancel}
                        onChange={(e) => setDirectBookingCancel(e.target.value)}
                        className="w-full bg-transparent text-white text-[13px] font-['DM_Sans:Regular',_sans-serif] border-none outline-none resize-none min-h-[40px] focus:ring-0"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                        rows={2}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                        For bookings outside of Airbnb, is the full balance charged to guests at the time of booking?
                      </p>
                      <FieldEditButton
                        fieldKey="full_balance_charged"
                        {...hasFieldModifications('full_balance_charged')}
                        onClick={() => openAdditionalInfo('Full Balance Charged', fullBalanceCharged)}
                      />
                    </div>
                    <div className="bg-[#01255e] border border-[#013280] rounded-lg p-4">
                      <textarea
                        value={fullBalanceCharged}
                        onChange={(e) => setFullBalanceCharged(e.target.value)}
                        className="w-full bg-transparent text-white text-[13px] font-['DM_Sans:Regular',_sans-serif] border-none outline-none resize-none min-h-[40px] focus:ring-0"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                        rows={2}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                        How far in advance can guests book?
                      </p>
                      <FieldEditButton
                        fieldKey="advance_booking"
                        {...hasFieldModifications('advance_booking')}
                        onClick={() => openAdditionalInfo('Advance Booking', advanceBooking)}
                      />
                    </div>
                    <div className="bg-[#01255e] border border-[#013280] rounded-lg p-4">
                      <textarea
                        value={advanceBooking}
                        onChange={(e) => setAdvanceBooking(e.target.value)}
                        className="w-full bg-transparent text-white text-[13px] font-['DM_Sans:Regular',_sans-serif] border-none outline-none resize-none min-h-[40px] focus:ring-0"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                        rows={1}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Check-in and Check-out */}
            <div className="border-b border-[#013280] pb-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-white text-[18px] font-['DM_Sans:Bold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                  Check-in and Check-out
                </h2>
                <button 
                  onClick={() => toggleSection('checkin')}
                  className="text-[#a6a9b2] hover:text-white transition-colors"
                >
                  {expandedSections.has('checkin') ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
              </div>
              
              {expandedSections.has('checkin') && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                          What hours are you available to support guests?
                        </p>
                        <FieldEditButton
                          fieldKey="support_hours"
                          {...hasFieldModifications('support_hours')}
                          onClick={() => openAdditionalInfo('Support Hours', supportHours)}
                        />
                      </div>
                      <div className="bg-[#01255e] border border-[#013280] rounded-lg p-4">
                        <textarea
                          value={supportHours}
                          onChange={(e) => setSupportHours(e.target.value)}
                          className="w-full bg-transparent text-white text-[13px] font-['DM_Sans:Regular',_sans-serif] border-none outline-none resize-none min-h-[40px] focus:ring-0"
                          style={{ fontVariationSettings: "'opsz' 14" }}
                          rows={1}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                          Check-In Time
                        </p>
                        <FieldEditButton
                          fieldKey="check_in_time"
                          {...hasFieldModifications('check_in_time')}
                          onClick={() => openAdditionalInfo('Check-In Time', checkInTime)}
                        />
                      </div>
                      <div className="bg-[#01255e] border border-[#013280] rounded-lg p-4">
                        <textarea
                          value={checkInTime}
                          onChange={(e) => setCheckInTime(e.target.value)}
                          className="w-full bg-transparent text-white text-[13px] font-['DM_Sans:Regular',_sans-serif] border-none outline-none resize-none min-h-[40px] focus:ring-0"
                          style={{ fontVariationSettings: "'opsz' 14" }}
                          rows={1}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                        Check-Out Time
                      </p>
                      <FieldEditButton
                        fieldKey="check_out_time"
                        {...hasFieldModifications('check_out_time')}
                        onClick={() => openAdditionalInfo('Check-Out Time', checkOutTime)}
                      />
                    </div>
                    <div className="bg-[#01255e] border border-[#013280] rounded-lg p-4">
                      <textarea
                        value={checkOutTime}
                        onChange={(e) => setCheckOutTime(e.target.value)}
                        className="w-full bg-transparent text-white text-[13px] font-['DM_Sans:Regular',_sans-serif] border-none outline-none resize-none min-h-[40px] focus:ring-0"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                        rows={1}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                        How to find the property
                      </p>
                      <FieldEditButton
                        fieldKey="how_to_find_property"
                        {...hasFieldModifications('how_to_find_property')}
                        onClick={() => openAdditionalInfo('How to Find Property', findProperty)}
                      />
                    </div>
                    <div className="bg-[#01255e] border border-[#013280] rounded-lg p-4">
                      <textarea
                        value={findProperty}
                        onChange={(e) => setFindProperty(e.target.value)}
                        className="w-full bg-transparent text-white text-[13px] font-['DM_Sans:Regular',_sans-serif] border-none outline-none resize-none min-h-[100px] focus:ring-0"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                        rows={5}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                          Is parking provided?
                        </p>
                        <FieldEditButton
                          fieldKey="parking_provided"
                          {...hasFieldModifications('parking_provided')}
                          onClick={() => openAdditionalInfo('Parking Provided', parkingProvided)}
                        />
                      </div>
                      <div className="bg-[#01255e] border border-[#013280] rounded-lg p-4">
                        <textarea
                          value={parkingProvided}
                          onChange={(e) => setParkingProvided(e.target.value)}
                          className="w-full bg-transparent text-white text-[13px] font-['DM_Sans:Regular',_sans-serif] border-none outline-none resize-none min-h-[40px] focus:ring-0"
                          style={{ fontVariationSettings: "'opsz' 14" }}
                          rows={2}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                          Where is the closest parking spot for additional vehicles?
                        </p>
                        <FieldEditButton
                          fieldKey="closest_parking"
                          {...hasFieldModifications('closest_parking')}
                          onClick={() => openAdditionalInfo('Closest Parking', closestParking)}
                        />
                      </div>
                      <div className="bg-[#01255e] border border-[#013280] rounded-lg p-4">
                        <textarea
                          value={closestParking}
                          onChange={(e) => setClosestParking(e.target.value)}
                          className="w-full bg-transparent text-white text-[13px] font-['DM_Sans:Regular',_sans-serif] border-none outline-none resize-none min-h-[40px] focus:ring-0"
                          style={{ fontVariationSettings: "'opsz' 14" }}
                          rows={2}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                        How to access the property
                      </p>
                      <FieldEditButton
                        fieldKey="access_property"
                        {...hasFieldModifications('access_property')}
                        onClick={() => openAdditionalInfo('Access Property', accessProperty)}
                      />
                    </div>
                    <div className="bg-[#01255e] border border-[#013280] rounded-lg p-4">
                      <textarea
                        value={accessProperty}
                        onChange={(e) => setAccessProperty(e.target.value)}
                        className="w-full bg-transparent text-white text-[13px] font-['DM_Sans:Regular',_sans-serif] border-none outline-none resize-none min-h-[100px] focus:ring-0"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                        rows={5}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                        Backup Access
                      </p>
                      <FieldEditButton
                        fieldKey="backup_lockbox_code"
                        {...hasFieldModifications('backup_lockbox_code')}
                        onClick={() => openAdditionalInfo('Backup Access', backupLockbox)}
                      />
                    </div>
                    <div className="bg-[#01255e] border border-[#013280] rounded-lg p-4">
                      <textarea
                        value={backupLockbox}
                        onChange={(e) => setBackupLockbox(e.target.value)}
                        className="w-full bg-transparent text-white text-[13px] font-['DM_Sans:Regular',_sans-serif] border-none outline-none resize-none min-h-[100px] focus:ring-0"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                        rows={5}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                        Access Troubleshooting
                      </p>
                      <FieldEditButton
                        fieldKey="access_troubleshooting"
                        {...hasFieldModifications('access_troubleshooting')}
                        onClick={() => openAdditionalInfo('Access Troubleshooting', accessTroubleshooting)}
                      />
                    </div>
                    <div className="bg-[#01255e] border border-[#013280] rounded-lg p-4">
                      <textarea
                        value={accessTroubleshooting}
                        onChange={(e) => setAccessTroubleshooting(e.target.value)}
                        className="w-full bg-transparent text-white text-[13px] font-['DM_Sans:Regular',_sans-serif] border-none outline-none resize-none min-h-[80px] focus:ring-0"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                        rows={4}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                          Do you allow early check-in or late check-out?
                        </p>
                        <FieldEditButton
                          fieldKey="early_check_in_late_check_out"
                          {...hasFieldModifications('early_check_in_late_check_out')}
                          onClick={() => openAdditionalInfo('Early Check-in/Late Check-out', earlyCheckInOut)}
                        />
                      </div>
                      <div className="bg-[#01255e] border border-[#013280] rounded-lg p-4">
                        <textarea
                          value={earlyCheckInOut}
                          onChange={(e) => setEarlyCheckInOut(e.target.value)}
                          className="w-full bg-transparent text-white text-[13px] font-['DM_Sans:Regular',_sans-serif] border-none outline-none resize-none min-h-[40px] focus:ring-0"
                          style={{ fontVariationSettings: "'opsz' 14" }}
                          rows={2}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                          Where is trash placed?
                        </p>
                        <FieldEditButton
                          fieldKey="trash_placement"
                          {...hasFieldModifications('trash_placement')}
                          onClick={() => openAdditionalInfo('Trash Placement', trashPlaced)}
                        />
                      </div>
                      <div className="bg-[#01255e] border border-[#013280] rounded-lg p-4">
                        <textarea
                          value={trashPlaced}
                          onChange={(e) => setTrashPlaced(e.target.value)}
                          className="w-full bg-transparent text-white text-[13px] font-['DM_Sans:Regular',_sans-serif] border-none outline-none resize-none min-h-[40px] focus:ring-0"
                          style={{ fontVariationSettings: "'opsz' 14" }}
                          rows={2}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="border-b border-[#013280] pb-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-white text-[18px] font-['DM_Sans:Bold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                  Details
                </h2>
                <button 
                  onClick={() => toggleSection('details')}
                  className="text-[#a6a9b2] hover:text-white transition-colors"
                >
                  {expandedSections.has('details') ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
              </div>
              
              {expandedSections.has('details') && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                          Minimum Stay
                        </p>
                        <FieldEditButton
                          fieldKey="minimum_stay"
                          {...hasFieldModifications('minimum_stay')}
                          onClick={() => openAdditionalInfo('Minimum Stay', minimumStay)}
                        />
                      </div>
                      <div className="bg-[#01255e] border border-[#013280] rounded-lg p-4">
                        <textarea
                          value={minimumStay}
                          onChange={(e) => setMinimumStay(e.target.value)}
                          className="w-full bg-transparent text-white text-[13px] font-['DM_Sans:Regular',_sans-serif] border-none outline-none resize-none min-h-[40px] focus:ring-0"
                          style={{ fontVariationSettings: "'opsz' 14" }}
                          rows={1}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                          Maximum Stay
                        </p>
                        <FieldEditButton
                          fieldKey="maximum_stay"
                          {...hasFieldModifications('maximum_stay')}
                          onClick={() => openAdditionalInfo('Maximum Stay', maximumStay)}
                        />
                      </div>
                      <div className="bg-[#01255e] border border-[#013280] rounded-lg p-4">
                        <textarea
                          value={maximumStay}
                          onChange={(e) => setMaximumStay(e.target.value)}
                          className="w-full bg-transparent text-white text-[13px] font-['DM_Sans:Regular',_sans-serif] border-none outline-none resize-none min-h-[40px] focus:ring-0"
                          style={{ fontVariationSettings: "'opsz' 14" }}
                          rows={1}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                          Minimum Guest Age
                        </p>
                        <FieldEditButton
                          fieldKey="minimum_guest_age"
                          {...hasFieldModifications('minimum_guest_age')}
                          onClick={() => openAdditionalInfo('Minimum Guest Age', minimumGuestAge)}
                        />
                      </div>
                      <div className="bg-[#01255e] border border-[#013280] rounded-lg p-4">
                        <textarea
                          value={minimumGuestAge}
                          onChange={(e) => setMinimumGuestAge(e.target.value)}
                          className="w-full bg-transparent text-white text-[13px] font-['DM_Sans:Regular',_sans-serif] border-none outline-none resize-none min-h-[40px] focus:ring-0"
                          style={{ fontVariationSettings: "'opsz' 14" }}
                          rows={1}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                          Maximum Number of Guests
                        </p>
                        <FieldEditButton
                          fieldKey="maximum_number_of_guests"
                          {...hasFieldModifications('maximum_number_of_guests')}
                          onClick={() => openAdditionalInfo('Maximum Guests', maximumGuests)}
                        />
                      </div>
                      <div className="bg-[#01255e] border border-[#013280] rounded-lg p-4">
                        <textarea
                          value={maximumGuests}
                          onChange={(e) => setMaximumGuests(e.target.value)}
                          className="w-full bg-transparent text-white text-[13px] font-['DM_Sans:Regular',_sans-serif] border-none outline-none resize-none min-h-[40px] focus:ring-0"
                          style={{ fontVariationSettings: "'opsz' 14" }}
                          rows={1}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                          Property Size
                        </p>
                        <FieldEditButton
                          fieldKey="property_size"
                          {...hasFieldModifications('property_size')}
                          onClick={() => openAdditionalInfo('Property Size', propertySize)}
                        />
                      </div>
                      <div className="bg-[#01255e] border border-[#013280] rounded-lg p-4">
                        <textarea
                          value={propertySize}
                          onChange={(e) => setPropertySize(e.target.value)}
                          className="w-full bg-transparent text-white text-[13px] font-['DM_Sans:Regular',_sans-serif] border-none outline-none resize-none min-h-[40px] focus:ring-0"
                          style={{ fontVariationSettings: "'opsz' 14" }}
                          rows={1}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                          Number of Floors
                        </p>
                        <FieldEditButton
                          fieldKey="number_of_floors"
                          {...hasFieldModifications('number_of_floors')}
                          onClick={() => openAdditionalInfo('Number of Floors', numberOfFloors)}
                        />
                      </div>
                      <div className="bg-[#01255e] border border-[#013280] rounded-lg p-4">
                        <textarea
                          value={numberOfFloors}
                          onChange={(e) => setNumberOfFloors(e.target.value)}
                          className="w-full bg-transparent text-white text-[13px] font-['DM_Sans:Regular',_sans-serif] border-none outline-none resize-none min-h-[40px] focus:ring-0"
                          style={{ fontVariationSettings: "'opsz' 14" }}
                          rows={1}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                        Describe each bedroom and sleeping arrangement
                      </p>
                      <FieldEditButton
                        fieldKey="bedroom_description"
                        {...hasFieldModifications('bedroom_description')}
                        onClick={() => openAdditionalInfo('Bedroom Description', bedroomDescription)}
                      />
                    </div>
                    <div className="bg-[#01255e] border border-[#013280] rounded-lg p-4">
                      <textarea
                        value={bedroomDescription}
                        onChange={(e) => setBedroomDescription(e.target.value)}
                        className="w-full bg-transparent text-white text-[13px] font-['DM_Sans:Regular',_sans-serif] border-none outline-none resize-none min-h-[80px] focus:ring-0"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                        rows={4}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                        Additional Sleeping Arrangements
                      </p>
                      <FieldEditButton
                        fieldKey="additional_sleeping_arrangements"
                        {...hasFieldModifications('additional_sleeping_arrangements')}
                        onClick={() => openAdditionalInfo('Additional Sleeping', additionalSleeping)}
                      />
                    </div>
                    <div className="bg-[#01255e] border border-[#013280] rounded-lg p-4">
                      <textarea
                        value={additionalSleeping}
                        onChange={(e) => setAdditionalSleeping(e.target.value)}
                        className="w-full bg-transparent text-white text-[13px] font-['DM_Sans:Regular',_sans-serif] border-none outline-none resize-none min-h-[40px] focus:ring-0"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                        rows={2}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                        Number of Bathrooms and Layout
                      </p>
                      <FieldEditButton
                        fieldKey="bathroom_layout"
                        {...hasFieldModifications('bathroom_layout')}
                        onClick={() => openAdditionalInfo('Bathroom Layout', bathroomLayout)}
                      />
                    </div>
                    <div className="bg-[#01255e] border border-[#013280] rounded-lg p-4">
                      <textarea
                        value={bathroomLayout}
                        onChange={(e) => setBathroomLayout(e.target.value)}
                        className="w-full bg-transparent text-white text-[13px] font-['DM_Sans:Regular',_sans-serif] border-none outline-none resize-none min-h-[40px] focus:ring-0"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                        rows={1}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                          WiFi Network
                        </p>
                        <FieldEditButton
                          fieldKey="wifi_network"
                          {...hasFieldModifications('wifi_network')}
                          onClick={() => openAdditionalInfo('WiFi Network', wifiNetwork)}
                        />
                      </div>
                      <div className="bg-[#01255e] border border-[#013280] rounded-lg p-4">
                        <textarea
                          value={wifiNetwork}
                          onChange={(e) => setWifiNetwork(e.target.value)}
                          className="w-full bg-transparent text-white text-[13px] font-['DM_Sans:Regular',_sans-serif] border-none outline-none resize-none min-h-[40px] focus:ring-0"
                          style={{ fontVariationSettings: "'opsz' 14" }}
                          rows={1}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                          WiFi Password
                        </p>
                        <FieldEditButton
                          fieldKey="wifi_password"
                          {...hasFieldModifications('wifi_password')}
                          onClick={() => openAdditionalInfo('WiFi Password', wifiPassword)}
                        />
                      </div>
                      <div className="bg-[#01255e] border border-[#013280] rounded-lg p-4">
                        <textarea
                          value={wifiPassword}
                          onChange={(e) => setWifiPassword(e.target.value)}
                          className="w-full bg-transparent text-white text-[13px] font-['DM_Sans:Regular',_sans-serif] border-none outline-none resize-none min-h-[40px] focus:ring-0"
                          style={{ fontVariationSettings: "'opsz' 14" }}
                          rows={1}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                        Describe the property
                      </p>
                      <FieldEditButton
                        fieldKey="property_description"
                        {...hasFieldModifications('property_description')}
                        onClick={() => openAdditionalInfo('Property Description', propertyDescription)}
                      />
                    </div>
                    <div className="bg-[#01255e] border border-[#013280] rounded-lg p-4">
                      <textarea
                        value={propertyDescription}
                        onChange={(e) => setPropertyDescription(e.target.value)}
                        className="w-full bg-transparent text-white text-[13px] font-['DM_Sans:Regular',_sans-serif] border-none outline-none resize-none min-h-[120px] focus:ring-0"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                        rows={6}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                        Describe the neighborhood
                      </p>
                      <FieldEditButton
                        fieldKey="neighborhood_description"
                        {...hasFieldModifications('neighborhood_description')}
                        onClick={() => openAdditionalInfo('Neighborhood Description', neighborhoodDescription)}
                      />
                    </div>
                    <div className="bg-[#01255e] border border-[#013280] rounded-lg p-4">
                      <textarea
                        value={neighborhoodDescription}
                        onChange={(e) => setNeighborhoodDescription(e.target.value)}
                        className="w-full bg-transparent text-white text-[13px] font-['DM_Sans:Regular',_sans-serif] border-none outline-none resize-none min-h-[120px] focus:ring-0"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                        rows={6}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* SOPs Tab */}
        {activeTab === 'sops' && (
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif] text-center" style={{ fontVariationSettings: "'opsz' 14" }}>
                In this section, you can add any operational details that you want HostBuddy AI to be able to communicate when your guests ask. It is meant to serve as a quick reference for answers to common questions or unique aspects of the property that you want HostBuddy AI to explain accurately and with detail.
              </p>
              <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif] text-center" style={{ fontVariationSettings: "'opsz' 14" }}>
                Need help writing SOPs? View the full guide with step-by-step instructions in the <a href="#" className="text-[#3e88f7] hover:opacity-80 transition-opacity">HostBuddy User Guide</a>.
              </p>
            </div>

            {/* Check-in & Check-Out */}
            <div className="border-b border-[#013280] pb-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-white text-[18px] font-['DM_Sans:Bold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                  Check-in & Check-Out
                </h2>
                <button 
                  onClick={() => toggleSection('sopsCheckin')}
                  className="text-[#a6a9b2] hover:text-white transition-colors"
                >
                  {expandedSections.has('sopsCheckin') ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
              </div>
              
              {expandedSections.has('sopsCheckin') && (
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                        How to check-in/check-out early or late
                      </p>
                      <FieldEditButton
                        fieldKey="how_to_checkin_checkout_early_late"
                        {...hasSOPFieldModifications('how_to_checkin_checkout_early_late')}
                        onClick={() => openSOPField('how_to_checkin_checkout_early_late', 'How to check-in/check-out early or late')}
                      />
                    </div>
                    <div className="bg-[#01255e] border border-[#013280] rounded-lg p-4">
                      <textarea
                        value={sopCheckInOutEarlyLate}
                        onChange={(e) => setSopCheckInOutEarlyLate(e.target.value)}
                        className="w-full bg-transparent text-white text-[13px] font-['DM_Sans:Regular',_sans-serif] border-none outline-none resize-none min-h-[100px] focus:ring-0"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                        rows={5}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                        Do you host/ship oversized items or equipment
                      </p>
                      <FieldEditButton
                        fieldKey="oversized_items_equipment"
                        {...hasSOPFieldModifications('oversized_items_equipment')}
                        onClick={() => openSOPField('oversized_items_equipment', 'Do you host/ship oversized items or equipment')}
                      />
                    </div>
                    <div className="bg-[#01255e] border border-[#013280] rounded-lg p-4">
                      <textarea
                        value={sopOversizedItems}
                        onChange={(e) => setSopOversizedItems(e.target.value)}
                        className="w-full bg-transparent text-white text-[13px] font-['DM_Sans:Regular',_sans-serif] border-none outline-none resize-none min-h-[60px] focus:ring-0"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                        rows={3}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                        How to handle/ship early or late requests
                      </p>
                      <FieldEditButton
                        fieldKey="handle_early_late_requests"
                        {...hasSOPFieldModifications('handle_early_late_requests')}
                        onClick={() => openSOPField('handle_early_late_requests', 'How to handle/ship early or late requests')}
                      />
                    </div>
                    <div className="bg-[#01255e] border border-[#013280] rounded-lg p-4">
                      <textarea
                        value={sopEarlyLateRequests}
                        onChange={(e) => setSopEarlyLateRequests(e.target.value)}
                        className="w-full bg-transparent text-white text-[13px] font-['DM_Sans:Regular',_sans-serif] border-none outline-none resize-none min-h-[100px] focus:ring-0"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                        rows={5}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                        How to handle/ship last requests
                      </p>
                      <FieldEditButton
                        fieldKey="handle_last_requests"
                        {...hasSOPFieldModifications('handle_last_requests')}
                        onClick={() => openSOPField('handle_last_requests', 'How to handle/ship last requests')}
                      />
                    </div>
                    <div className="bg-[#01255e] border border-[#013280] rounded-lg p-4">
                      <textarea
                        value={sopLastRequests}
                        onChange={(e) => setSopLastRequests(e.target.value)}
                        className="w-full bg-transparent text-white text-[13px] font-['DM_Sans:Regular',_sans-serif] border-none outline-none resize-none min-h-[100px] focus:ring-0"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                        rows={5}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                        Weather precautions
                      </p>
                      <FieldEditButton
                        fieldKey="weather_precautions"
                        {...hasSOPFieldModifications('weather_precautions')}
                        onClick={() => openSOPField('weather_precautions', 'Weather precautions')}
                      />
                    </div>
                    <div className="bg-[#01255e] border border-[#013280] rounded-lg p-4">
                      <textarea
                        value={sopWeatherPrecautions}
                        onChange={(e) => setSopWeatherPrecautions(e.target.value)}
                        className="w-full bg-transparent text-white text-[13px] font-['DM_Sans:Regular',_sans-serif] border-none outline-none resize-none min-h-[120px] focus:ring-0"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                        rows={6}
                      />
                    </div>
                  </div>

                  {/* Dynamic SOPs */}
                  {dynamicSOPs['Check-in & Check-Out']?.map((sop, index) => (
                    <div key={index}>
                      <div className="flex items-center gap-2 mb-2">
                        <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                          {sop.title}
                        </p>
                      </div>
                      <div className="bg-[#01255e] border border-[#013280] rounded-lg p-4">
                        <textarea
                          value={sop.description}
                          onChange={(e) => handleUpdateDynamicSOPDescription('Check-in & Check-Out', index, e.target.value)}
                          className="w-full bg-transparent text-white text-[13px] font-['DM_Sans:Regular',_sans-serif] border-none outline-none resize-none min-h-[80px] focus:ring-0"
                          style={{ fontVariationSettings: "'opsz' 14" }}
                          rows={4}
                        />
                      </div>
                    </div>
                  ))}

                  {/* Add More Button */}
                  <button 
                    onClick={() => handleOpenAddSOP('Check-in & Check-Out')}
                    className="text-[#3e88f7] text-[13px] font-['DM_Sans:Regular',_sans-serif] mt-2 hover:opacity-80 transition-opacity" 
                    style={{ fontVariationSettings: "'opsz' 14" }}
                  >
                    + Add more
                  </button>
                </div>
              )}
            </div>

            {/* Guest Requests */}
            <div className="border-b border-[#013280] pb-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-white text-[18px] font-['DM_Sans:Bold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                  Guest Requests
                </h2>
                <button 
                  onClick={() => toggleSection('sopsGuestRequests')}
                  className="text-[#a6a9b2] hover:text-white transition-colors"
                >
                  {expandedSections.has('sopsGuestRequests') ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
              </div>
              
              {expandedSections.has('sopsGuestRequests') && (
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                        How to handle/ship extra towel
                      </p>
                      <FieldEditButton
                        fieldKey="handle_extra_towel"
                        {...hasSOPFieldModifications('handle_extra_towel')}
                        onClick={() => openSOPField('handle_extra_towel', 'How to handle/ship extra towel')}
                      />
                    </div>
                    <div className="bg-[#01255e] border border-[#013280] rounded-lg p-4">
                      <textarea
                        value={sopExtraTowel}
                        onChange={(e) => setSopExtraTowel(e.target.value)}
                        className="w-full bg-transparent text-white text-[13px] font-['DM_Sans:Regular',_sans-serif] border-none outline-none resize-none min-h-[60px] focus:ring-0"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                        rows={3}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                        How to handle/ship mid king-cleaning request
                      </p>
                      <FieldEditButton
                        fieldKey="handle_mid_cleaning_request"
                        {...hasSOPFieldModifications('handle_mid_cleaning_request')}
                        onClick={() => openSOPField('handle_mid_cleaning_request', 'How to handle/ship mid king-cleaning request')}
                      />
                    </div>
                    <div className="bg-[#01255e] border border-[#013280] rounded-lg p-4">
                      <textarea
                        value={sopMidCleaningRequest}
                        onChange={(e) => setSopMidCleaningRequest(e.target.value)}
                        className="w-full bg-transparent text-white text-[13px] font-['DM_Sans:Regular',_sans-serif] border-none outline-none resize-none min-h-[100px] focus:ring-0"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                        rows={5}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                        How to accept/ship cleaning request
                      </p>
                      <FieldEditButton
                        fieldKey="accept_cleaning_request"
                        {...hasSOPFieldModifications('accept_cleaning_request')}
                        onClick={() => openSOPField('accept_cleaning_request', 'How to accept/ship cleaning request')}
                      />
                    </div>
                    <div className="bg-[#01255e] border border-[#013280] rounded-lg p-4">
                      <textarea
                        value={sopAcceptCleaningRequest}
                        onChange={(e) => setSopAcceptCleaningRequest(e.target.value)}
                        className="w-full bg-transparent text-white text-[13px] font-['DM_Sans:Regular',_sans-serif] border-none outline-none resize-none min-h-[100px] focus:ring-0"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                        rows={5}
                      />
                    </div>
                  </div>

                  {/* Dynamic SOPs */}
                  {dynamicSOPs['Guest Requests']?.map((sop, index) => (
                    <div key={index}>
                      <div className="flex items-center gap-2 mb-2">
                        <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                          {sop.title}
                        </p>
                        <FieldEditButton
                          fieldKey={`dynamic_guest_requests_${index}`}
                          {...hasSOPFieldModifications(`dynamic_guest_requests_${index}`)}
                          onClick={() => openSOPField(`dynamic_guest_requests_${index}`, sop.title)}
                        />
                      </div>
                      <div className="bg-[#01255e] border border-[#013280] rounded-lg p-4">
                        <textarea
                          value={sop.description}
                          onChange={(e) => handleUpdateDynamicSOPDescription('Guest Requests', index, e.target.value)}
                          className="w-full bg-transparent text-white text-[13px] font-['DM_Sans:Regular',_sans-serif] border-none outline-none resize-none min-h-[80px] focus:ring-0"
                          style={{ fontVariationSettings: "'opsz' 14" }}
                          rows={4}
                        />
                      </div>
                    </div>
                  ))}

                  {/* Add More Button */}
                  <button 
                    onClick={() => handleOpenAddSOP('Guest Requests')}
                    className="text-[#3e88f7] text-[13px] font-['DM_Sans:Regular',_sans-serif] mt-2 hover:opacity-80 transition-opacity" 
                    style={{ fontVariationSettings: "'opsz' 14" }}
                  >
                    + Add more
                  </button>
                </div>
              )}
            </div>

            {/* Rules */}
            <div className="border-b border-[#013280] pb-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-white text-[18px] font-['DM_Sans:Bold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                  Rules
                </h2>
                <button 
                  onClick={() => toggleSection('sopsRules')}
                  className="text-[#a6a9b2] hover:text-white transition-colors"
                >
                  {expandedSections.has('sopsRules') ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
              </div>
              
              {expandedSections.has('sopsRules') && (
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                        What is Rule 1
                      </p>
                      <FieldEditButton
                        fieldKey="rule_1"
                        {...hasSOPFieldModifications('rule_1')}
                        onClick={() => openSOPField('rule_1', 'What is Rule 1')}
                      />
                    </div>
                    <div className="bg-[#01255e] border border-[#013280] rounded-lg p-4">
                      <textarea
                        value={sopRule1}
                        onChange={(e) => setSopRule1(e.target.value)}
                        className="w-full bg-transparent text-white text-[13px] font-['DM_Sans:Regular',_sans-serif] border-none outline-none resize-none min-h-[100px] focus:ring-0"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                        rows={5}
                      />
                    </div>
                  </div>

                  {/* Dynamic SOPs */}
                  {dynamicSOPs['Rules']?.map((sop, index) => (
                    <div key={index}>
                      <div className="flex items-center gap-2 mb-2">
                        <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                          {sop.title}
                        </p>
                        <FieldEditButton
                          fieldKey={`dynamic_rules_${index}`}
                          {...hasSOPFieldModifications(`dynamic_rules_${index}`)}
                          onClick={() => openSOPField(`dynamic_rules_${index}`, sop.title)}
                        />
                      </div>
                      <div className="bg-[#01255e] border border-[#013280] rounded-lg p-4">
                        <textarea
                          value={sop.description}
                          onChange={(e) => handleUpdateDynamicSOPDescription('Rules', index, e.target.value)}
                          className="w-full bg-transparent text-white text-[13px] font-['DM_Sans:Regular',_sans-serif] border-none outline-none resize-none min-h-[80px] focus:ring-0"
                          style={{ fontVariationSettings: "'opsz' 14" }}
                          rows={4}
                        />
                      </div>
                    </div>
                  ))}

                  {/* Add More Button */}
                  <button 
                    onClick={() => handleOpenAddSOP('Rules')}
                    className="text-[#3e88f7] text-[13px] font-['DM_Sans:Regular',_sans-serif] mt-2 hover:opacity-80 transition-opacity" 
                    style={{ fontVariationSettings: "'opsz' 14" }}
                  >
                    + Add more
                  </button>
                </div>
              )}
            </div>

            {/* Guest Issues */}
            <div className="border-b border-[#013280] pb-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-white text-[18px] font-['DM_Sans:Bold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                  Guest Issues
                </h2>
                <button 
                  onClick={() => toggleSection('sopsGuestIssues')}
                  className="text-[#a6a9b2] hover:text-white transition-colors"
                >
                  {expandedSections.has('sopsGuestIssues') ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
              </div>
              
              {expandedSections.has('sopsGuestIssues') && (
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                        How to handle/ship a lockout
                      </p>
                      <FieldEditButton
                        fieldKey="handle_lockout"
                        {...hasSOPFieldModifications('handle_lockout')}
                        onClick={() => openSOPField('handle_lockout', 'How to handle/ship a lockout')}
                      />
                    </div>
                    <div className="bg-[#01255e] border border-[#013280] rounded-lg p-4">
                      <textarea
                        value={sopLockout}
                        onChange={(e) => setSopLockout(e.target.value)}
                        className="w-full bg-transparent text-white text-[13px] font-['DM_Sans:Regular',_sans-serif] border-none outline-none resize-none min-h-[100px] focus:ring-0"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                        rows={5}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                        Emergency contact information
                      </p>
                      <FieldEditButton
                        fieldKey="emergency_contact"
                        {...hasSOPFieldModifications('emergency_contact')}
                        onClick={() => openSOPField('emergency_contact', 'Emergency contact information')}
                      />
                    </div>
                    <div className="bg-[#01255e] border border-[#013280] rounded-lg p-4">
                      <textarea
                        value={sopEmergencyContact}
                        onChange={(e) => setSopEmergencyContact(e.target.value)}
                        className="w-full bg-transparent text-white text-[13px] font-['DM_Sans:Regular',_sans-serif] border-none outline-none resize-none min-h-[60px] focus:ring-0"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                        rows={3}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                        How to handle/ship noise complaints
                      </p>
                      <FieldEditButton
                        fieldKey="handle_noise_complaints"
                        {...hasSOPFieldModifications('handle_noise_complaints')}
                        onClick={() => openSOPField('handle_noise_complaints', 'How to handle/ship noise complaints')}
                      />
                    </div>
                    <div className="bg-[#01255e] border border-[#013280] rounded-lg p-4">
                      <textarea
                        value={sopNoiseComplaints}
                        onChange={(e) => setSopNoiseComplaints(e.target.value)}
                        className="w-full bg-transparent text-white text-[13px] font-['DM_Sans:Regular',_sans-serif] border-none outline-none resize-none min-h-[100px] focus:ring-0"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                        rows={5}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                        How to handle/ship water/moisture
                      </p>
                      <FieldEditButton
                        fieldKey="handle_water_moisture"
                        {...hasSOPFieldModifications('handle_water_moisture')}
                        onClick={() => openSOPField('handle_water_moisture', 'How to handle/ship water/moisture')}
                      />
                    </div>
                    <div className="bg-[#01255e] border border-[#013280] rounded-lg p-4">
                      <textarea
                        value={sopWaterMoisture}
                        onChange={(e) => setSopWaterMoisture(e.target.value)}
                        className="w-full bg-transparent text-white text-[13px] font-['DM_Sans:Regular',_sans-serif] border-none outline-none resize-none min-h-[60px] focus:ring-0"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                        rows={3}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                        Emergency procedures
                      </p>
                      <FieldEditButton
                        fieldKey="emergency_procedures"
                        {...hasSOPFieldModifications('emergency_procedures')}
                        onClick={() => openSOPField('emergency_procedures', 'Emergency procedures')}
                      />
                    </div>
                    <div className="bg-[#01255e] border border-[#013280] rounded-lg p-4">
                      <textarea
                        value={sopEmergencyProcedures}
                        onChange={(e) => setSopEmergencyProcedures(e.target.value)}
                        className="w-full bg-transparent text-white text-[13px] font-['DM_Sans:Regular',_sans-serif] border-none outline-none resize-none min-h-[100px] focus:ring-0"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                        rows={5}
                      />
                    </div>
                  </div>

                  {/* Dynamic SOPs */}
                  {dynamicSOPs['Guest Issues']?.map((sop, index) => (
                    <div key={index}>
                      <div className="flex items-center gap-2 mb-2">
                        <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                          {sop.title}
                        </p>
                        <FieldEditButton
                          fieldKey={`dynamic_guest_issues_${index}`}
                          {...hasSOPFieldModifications(`dynamic_guest_issues_${index}`)}
                          onClick={() => openSOPField(`dynamic_guest_issues_${index}`, sop.title)}
                        />
                      </div>
                      <div className="bg-[#01255e] border border-[#013280] rounded-lg p-4">
                        <textarea
                          value={sop.description}
                          onChange={(e) => handleUpdateDynamicSOPDescription('Guest Issues', index, e.target.value)}
                          className="w-full bg-transparent text-white text-[13px] font-['DM_Sans:Regular',_sans-serif] border-none outline-none resize-none min-h-[80px] focus:ring-0"
                          style={{ fontVariationSettings: "'opsz' 14" }}
                          rows={4}
                        />
                      </div>
                    </div>
                  ))}

                  {/* Add More Button */}
                  <button 
                    onClick={() => handleOpenAddSOP('Guest Issues')}
                    className="text-[#3e88f7] text-[13px] font-['DM_Sans:Regular',_sans-serif] mt-2 hover:opacity-80 transition-opacity" 
                    style={{ fontVariationSettings: "'opsz' 14" }}
                  >
                    + Add more
                  </button>
                </div>
              )}
            </div>

            {/* Emergencies */}
            <div className="border-b border-[#013280] pb-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-white text-[18px] font-['DM_Sans:Bold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                  Emergencies
                </h2>
                <button 
                  onClick={() => toggleSection('sopsEmergencies')}
                  className="text-[#a6a9b2] hover:text-white transition-colors"
                >
                  {expandedSections.has('sopsEmergencies') ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
              </div>
              
              {expandedSections.has('sopsEmergencies') && (
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                        How to handle guests concerned with safety
                      </p>
                      <FieldEditButton
                        fieldKey="safety_concerns"
                        {...hasSOPFieldModifications('safety_concerns')}
                        onClick={() => openSOPField('safety_concerns', 'How to handle guests concerned with safety')}
                      />
                    </div>
                    <div className="bg-[#01255e] border border-[#013280] rounded-lg p-4">
                      <textarea
                        value={sopSafetyConcerns}
                        onChange={(e) => setSopSafetyConcerns(e.target.value)}
                        className="w-full bg-transparent text-white text-[13px] font-['DM_Sans:Regular',_sans-serif] border-none outline-none resize-none min-h-[100px] focus:ring-0"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                        rows={5}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                        How to handle utility outages
                      </p>
                      <FieldEditButton
                        fieldKey="utility_outages"
                        {...hasSOPFieldModifications('utility_outages')}
                        onClick={() => openSOPField('utility_outages', 'How to handle utility outages')}
                      />
                    </div>
                    <div className="bg-[#01255e] border border-[#013280] rounded-lg p-4">
                      <textarea
                        value={sopUtilityOutages}
                        onChange={(e) => setSopUtilityOutages(e.target.value)}
                        className="w-full bg-transparent text-white text-[13px] font-['DM_Sans:Regular',_sans-serif] border-none outline-none resize-none min-h-[100px] focus:ring-0"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                        rows={5}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                        How to handle weather-related emergencies
                      </p>
                      <FieldEditButton
                        fieldKey="weather_emergencies"
                        {...hasSOPFieldModifications('weather_emergencies')}
                        onClick={() => openSOPField('weather_emergencies', 'How to handle weather-related emergencies')}
                      />
                    </div>
                    <div className="bg-[#01255e] border border-[#013280] rounded-lg p-4">
                      <textarea
                        value={sopWeatherEmergencies}
                        onChange={(e) => setSopWeatherEmergencies(e.target.value)}
                        className="w-full bg-transparent text-white text-[13px] font-['DM_Sans:Regular',_sans-serif] border-none outline-none resize-none min-h-[100px] focus:ring-0"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                        rows={5}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                        How to handle maintenance emergencies
                      </p>
                      <FieldEditButton
                        fieldKey="maintenance_emergencies"
                        {...hasSOPFieldModifications('maintenance_emergencies')}
                        onClick={() => openSOPField('maintenance_emergencies', 'How to handle maintenance emergencies')}
                      />
                    </div>
                    <div className="bg-[#01255e] border border-[#013280] rounded-lg p-4">
                      <textarea
                        value={sopMaintenanceEmergencies}
                        onChange={(e) => setSopMaintenanceEmergencies(e.target.value)}
                        className="w-full bg-transparent text-white text-[13px] font-['DM_Sans:Regular',_sans-serif] border-none outline-none resize-none min-h-[100px] focus:ring-0"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                        rows={5}
                      />
                    </div>
                  </div>

                  {/* Dynamic SOPs */}
                  {dynamicSOPs['Emergencies']?.map((sop, index) => (
                    <div key={index}>
                      <div className="flex items-center gap-2 mb-2">
                        <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                          {sop.title}
                        </p>
                        <FieldEditButton
                          fieldKey={`dynamic_emergencies_${index}`}
                          {...hasSOPFieldModifications(`dynamic_emergencies_${index}`)}
                          onClick={() => openSOPField(`dynamic_emergencies_${index}`, sop.title)}
                        />
                      </div>
                      <div className="bg-[#01255e] border border-[#013280] rounded-lg p-4">
                        <textarea
                          value={sop.description}
                          onChange={(e) => handleUpdateDynamicSOPDescription('Emergencies', index, e.target.value)}
                          className="w-full bg-transparent text-white text-[13px] font-['DM_Sans:Regular',_sans-serif] border-none outline-none resize-none min-h-[80px] focus:ring-0"
                          style={{ fontVariationSettings: "'opsz' 14" }}
                          rows={4}
                        />
                      </div>
                    </div>
                  ))}

                  {/* Add More Button */}
                  <button 
                    onClick={() => handleOpenAddSOP('Emergencies')}
                    className="text-[#3e88f7] text-[13px] font-['DM_Sans:Regular',_sans-serif] mt-2 hover:opacity-80 transition-opacity" 
                    style={{ fontVariationSettings: "'opsz' 14" }}
                  >
                    + Add more
                  </button>
                </div>
              )}
            </div>

            {/* Other */}
            <div className="border-b border-[#013280] pb-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-white text-[18px] font-['DM_Sans:Bold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                  Other
                </h2>
                <button 
                  onClick={() => toggleSection('sopsOther')}
                  className="text-[#a6a9b2] hover:text-white transition-colors"
                >
                  {expandedSections.has('sopsOther') ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
              </div>
              
              {expandedSections.has('sopsOther') && (
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                        What to do in vacation or
                      </p>
                      <FieldEditButton
                        fieldKey="what_to_do_vacation"
                        {...hasSOPFieldModifications('what_to_do_vacation')}
                        onClick={() => openSOPField('what_to_do_vacation', 'What to do in vacation or')}
                      />
                    </div>
                    <div className="bg-[#01255e] border border-[#013280] rounded-lg p-4">
                      <textarea
                        value={sopVacation}
                        onChange={(e) => setSopVacation(e.target.value)}
                        className="w-full bg-transparent text-white text-[13px] font-['DM_Sans:Regular',_sans-serif] border-none outline-none resize-none min-h-[60px] focus:ring-0"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                        rows={3}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                        When are property inspections, housekeeping, and pest control?
                      </p>
                      <FieldEditButton
                        fieldKey="property_inspections"
                        {...hasSOPFieldModifications('property_inspections')}
                        onClick={() => openSOPField('property_inspections', 'When are property inspections, housekeeping, and pest control?')}
                      />
                    </div>
                    <div className="bg-[#01255e] border border-[#013280] rounded-lg p-4">
                      <textarea
                        value={sopPropertyInspections}
                        onChange={(e) => setSopPropertyInspections(e.target.value)}
                        className="w-full bg-transparent text-white text-[13px] font-['DM_Sans:Regular',_sans-serif] border-none outline-none resize-none min-h-[60px] focus:ring-0"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                        rows={3}
                      />
                    </div>
                  </div>

                  {/* Dynamic SOPs */}
                  {dynamicSOPs['Other']?.map((sop, index) => (
                    <div key={index}>
                      <div className="flex items-center gap-2 mb-2">
                        <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                          {sop.title}
                        </p>
                        <FieldEditButton
                          fieldKey={`dynamic_other_${index}`}
                          {...hasSOPFieldModifications(`dynamic_other_${index}`)}
                          onClick={() => openSOPField(`dynamic_other_${index}`, sop.title)}
                        />
                      </div>
                      <div className="bg-[#01255e] border border-[#013280] rounded-lg p-4">
                        <textarea
                          value={sop.description}
                          onChange={(e) => handleUpdateDynamicSOPDescription('Other', index, e.target.value)}
                          className="w-full bg-transparent text-white text-[13px] font-['DM_Sans:Regular',_sans-serif] border-none outline-none resize-none min-h-[80px] focus:ring-0"
                          style={{ fontVariationSettings: "'opsz' 14" }}
                          rows={4}
                        />
                      </div>
                    </div>
                  ))}

                  {/* Add More Button */}
                  <button 
                    onClick={() => handleOpenAddSOP('Other')}
                    className="text-[#3e88f7] text-[13px] font-['DM_Sans:Regular',_sans-serif] mt-2 hover:opacity-80 transition-opacity" 
                    style={{ fontVariationSettings: "'opsz' 14" }}
                  >
                    + Add more
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Topics to Avoid Tab */}
        {activeTab === 'topics' && (
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                In this section, you can <span className="text-[#FB923C]">add any conversation topics that you want HostBuddy to avoid</span> while communicating with your guests. If a guest's message relates to any of the topics you add here, HostBuddy will not respond to it.
              </p>
              <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                Unsure what topics to avoid? View the full guide with examples and setup tips in the <a href="#" className="text-[#3e88f7] hover:opacity-80 transition-opacity">HostBuddy User Guide</a>.
              </p>
            </div>

            {/* Topics List */}
            <div className="space-y-4">
              {Object.entries(topicsToAvoid).map(([key, topic]) => {
                return (
                  <div key={key}>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                        {topic.title}
                      </p>
                      <FieldEditButton
                        fieldKey={key}
                        {...hasTopicsFieldModifications(key)}
                        onClick={() => openTopicsField(key, topic.title)}
                      />
                    </div>
                    <div className="bg-[#01255e] border border-[#013280] rounded-lg p-4">
                      <textarea
                        value={topic.description}
                        onChange={(e) => handleUpdateTopicDescription(key, e.target.value)}
                        className="w-full bg-transparent text-white text-[13px] font-['DM_Sans:Regular',_sans-serif] border-none outline-none resize-none min-h-[60px] focus:ring-0"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                        rows={3}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Add New Topic */}
            <div className="border-t border-[#013280] pt-4">
              <button
                onClick={() => setShowAddTopicModal(true)}
                className="bg-[#01255e] hover:bg-[#01255e] text-[#3e88f7] px-6 py-3 rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-colors w-full"
                style={{ fontVariationSettings: "'opsz' 14" }}
              >
                + Add New Topic to Avoid
              </button>
            </div>
          </div>
        )}
        </div>
      </div>

      {/* SOP Field Modal */}
      <SOPFieldModal
        isOpen={showSOPFieldModal}
        onClose={() => setShowSOPFieldModal(false)}
        fieldLabel={currentSOPFieldLabel}
        onSave={handleSaveSOPField}
        initialPhases={sopFieldPhases[currentFieldName] || { current: true, future: true, inquiry: true }}
      />

      {/* Topics to Avoid Field Modal */}
      <SOPFieldModal
        isOpen={showTopicsFieldModal}
        onClose={() => setShowTopicsFieldModal(false)}
        fieldLabel={currentTopicsFieldLabel}
        onSave={handleSaveTopicsField}
        initialPhases={topicsFieldPhases[currentFieldName] || { current: true, future: true, inquiry: true }}
        onDelete={() => {
          handleDeleteTopic(currentFieldName);
          setShowTopicsFieldModal(false);
        }}
        allowDelete={currentFieldName !== 'refund_requests'}
        allowTitleEdit={true}
        onTitleChange={(newTitle) => handleUpdateTopicTitle(currentFieldName, newTitle)}
      />

      {/* Add Topic Modal */}
      <AddTopicModal
        isOpen={showAddTopicModal}
        onClose={() => setShowAddTopicModal(false)}
        onAdd={handleAddTopic}
      />

      {/* Bottom Action Buttons - Fixed */}
      <div className="border-t border-[#013280] bg-[#0F1117] flex-shrink-0">
        <div className="max-w-[900px] mx-auto px-6 py-6 flex justify-between">
          <button 
            onClick={handleSaveAndExit}
            className="bg-[#01255e] hover:bg-[#01255e] text-[#3e88f7] px-8 py-3 rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-colors"
            style={{ fontVariationSettings: "'opsz' 14" }}
          >
            Save & Exit
          </button>
          <button 
            onClick={handleSaveAndNext}
            className="bg-[#3e88f7] hover:bg-[#5296f8] text-white px-8 py-3 rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-all shadow-lg"
            style={{ 
              fontVariationSettings: "'opsz' 14",
              boxShadow: '0 0 10px rgba(62, 136, 247, 0.2)'
            }}
          >
            Save & Next
          </button>
        </div>
      </div>

      {/* Documents Modal */}
      <Dialog open={documentsModalOpen} onOpenChange={setDocumentsModalOpen}>
        <DialogContent className="bg-[#01255e] border-2 border-[#013280] rounded-2xl max-w-[700px] p-0 overflow-hidden">
          <DialogTitle className="sr-only">Documents Uploaded For This Property</DialogTitle>
          <DialogDescription className="sr-only">View and manage documents uploaded for this property</DialogDescription>
          <div className="p-6">
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-white text-[24px] font-['DM_Sans:Bold',_sans-serif] text-center" style={{ fontVariationSettings: "'opsz' 14" }}>
                Documents Uploaded For This Property
              </h2>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-[2fr_2fr_1fr] gap-4 pb-3 border-b border-[#013280] mb-4">
              <span className="text-[#a6a9b2] text-[13px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                FILE NAME
              </span>
              <span className="text-[#a6a9b2] text-[13px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                HIDDEN RESERVATION STAGES
              </span>
              <span className="text-[#a6a9b2] text-[13px] font-['DM_Sans:SemiBold',_sans-serif] text-center" style={{ fontVariationSettings: "'opsz' 14" }}>
                ACTION
              </span>
            </div>

            {/* Documents List */}
            <div className="space-y-4 mb-6">
              {documents.map((doc) => (
                <div key={doc.id} className="grid grid-cols-[2fr_2fr_1fr] gap-4 items-center">
                  <span className="text-white text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                    {doc.name}
                  </span>
                  <span className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                    {getHiddenStages(doc.sourceKey)}
                  </span>
                  <div className="flex items-center justify-center gap-3">
                    <button 
                      onClick={() => handleDeleteDocument(doc)}
                      className="text-white hover:text-[#d4183d] transition-colors"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M2 2L14 14M2 14L14 2" strokeLinecap="round" />
                      </svg>
                    </button>
                    <button className="text-white hover:text-[#3e88f7] transition-colors">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M3 3H13V13H3V3ZM6 6H10M6 8H10M6 10H10" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Upload Document Modal */}
      <Dialog open={uploadModalOpen} onOpenChange={setUploadModalOpen}>
        <DialogContent className="bg-[#0F1117] border-2 border-[#013280] rounded-2xl max-w-[500px] p-0 overflow-hidden">
          <DialogTitle className="sr-only">Upload Property Documents</DialogTitle>
          <DialogDescription className="sr-only">Upload new documents for this property</DialogDescription>
          <div className="p-6">
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-white text-[24px] font-['DM_Sans:Bold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                Property Documents
              </h2>
            </div>

            {/* View Uploaded Documents Link */}
            <button 
              onClick={() => {
                setUploadModalOpen(false);
                setDocumentsModalOpen(true);
              }}
              className="text-[#3e88f7] text-[14px] font-['DM_Sans:Regular',_sans-serif] hover:opacity-80 transition-opacity flex items-center gap-2 mb-6"
              style={{ fontVariationSettings: "'opsz' 14" }}
            >
              <File className="w-4 h-4" />
              View Uploaded Documents
            </button>

            {/* Upload Section */}
            <div className="space-y-4">
              <label className="text-white text-[13px] font-['DM_Sans:Medium',_sans-serif] block" style={{ fontVariationSettings: "'opsz' 14" }}>
                Documents (.txt, .docx, .pdf supported)
              </label>
              
              <div className="flex gap-3">
                <div className="flex-1 bg-[#01255e] border border-[#013280] rounded-lg px-4 py-3 flex items-center">
                  <label className="cursor-pointer flex items-center gap-3 flex-1">
                    <span className="bg-[#3e88f7] hover:bg-[#5296f8] text-white px-4 py-2 rounded-lg text-[13px] font-['DM_Sans:SemiBold',_sans-serif] transition-all"
                      style={{ fontVariationSettings: "'opsz' 14" }}
                    >
                      Choose File
                    </span>
                    <span className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                      {uploadFileName}
                    </span>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept=".txt,.docx,.pdf"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setUploadFileName(file.name);
                        }
                      }}
                    />
                  </label>
                </div>
                <button className="bg-[#3e88f7] hover:bg-[#5296f8] text-white px-8 py-3 rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-all shadow-lg"
                  style={{ 
                    fontVariationSettings: "'opsz' 14",
                    boxShadow: '0 0 10px rgba(62, 136, 247, 0.2)'
                  }}
                  onClick={() => {
                    // Handle upload
                    if (uploadFileName !== 'No file chosen') {
                      showSaveSuccess('Document uploaded successfully');
                    }
                    setUploadModalOpen(false);
                    setUploadFileName('No file chosen');
                  }}
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Unlink Confirmation Modal */}
      <Dialog open={unlinkConfirmOpen} onOpenChange={setUnlinkConfirmOpen}>
        <DialogContent className="bg-[#0F1117] border-2 border-[#013280] rounded-2xl max-w-[500px] p-0 overflow-hidden">
          <DialogTitle className="sr-only">Unlink PMS Property</DialogTitle>
          <DialogDescription className="sr-only">Confirm unlinking this property from the PMS</DialogDescription>
          <div className="p-6">
            <h2 className="text-white text-[24px] font-['DM_Sans:Bold',_sans-serif] mb-4" style={{ fontVariationSettings: "'opsz' 14" }}>
              Unlink PMS Property
            </h2>
            <p className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif] mb-6" style={{ fontVariationSettings: "'opsz' 14" }}>
              Are you sure you want to unlink this property from the PMS? This will remove all PMS integration data.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setUnlinkConfirmOpen(false)}
                className="flex-1 bg-[#01255e] hover:bg-[#01255e] text-[#3e88f7] px-6 py-3 rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-colors"
                style={{ fontVariationSettings: "'opsz' 14" }}
              >
                Cancel
              </button>
              <button 
                onClick={handleUnlink}
                className="flex-1 bg-[#d4183d] hover:bg-[#e02347] text-white px-6 py-3 rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-colors"
                style={{ fontVariationSettings: "'opsz' 14" }}
              >
                Unlink
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Copy Data Modal */}
      <Dialog open={copyDataModalOpen} onOpenChange={setCopyDataModalOpen}>
        <DialogContent className="bg-[#0F1117] border-2 border-[#013280] rounded-2xl max-w-[600px] p-0 overflow-hidden">
          <DialogTitle className="sr-only">Copy Data From Other Property</DialogTitle>
          <DialogDescription className="sr-only">Choose a source property to copy data from</DialogDescription>
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-[24px] font-['DM_Sans:Bold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                Choose A Source Property
              </h2>
              <button 
                onClick={() => setCopyDataModalOpen(false)}
                className="text-[#a6a9b2] hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <Select value={selectedSourceProperty} onValueChange={setSelectedSourceProperty}>
                <SelectTrigger className="w-full bg-[#01255e] border-[#013280] text-white h-14 text-[16px]">
                  <SelectValue placeholder="1811 Adams - 10" />
                </SelectTrigger>
                <SelectContent className="bg-[#01255e] border-[#013280]">
                  {availableProperties.map((prop) => (
                    <SelectItem key={prop} value={prop} className="text-white hover:bg-[#01255e] text-[16px]">
                      {prop}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <button 
                onClick={() => {
                  if (selectedSourceProperty) {
                    setCopyDataModalOpen(false);
                    setCopyDataConfirmOpen(true);
                  }
                }}
                disabled={!selectedSourceProperty}
                className="w-full bg-[#3e88f7] hover:bg-[#5296f8] disabled:bg-[#17191f] disabled:text-[#676a73] text-white px-8 py-3 rounded-full text-[16px] font-['DM_Sans:Bold',_sans-serif] transition-all shadow-lg"
                style={{ 
                  fontVariationSettings: "'opsz' 14",
                  boxShadow: selectedSourceProperty ? '0 0 10px rgba(62, 136, 247, 0.2)' : 'none'
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Copy Data Confirmation Modal */}
      <Dialog open={copyDataConfirmOpen} onOpenChange={setCopyDataConfirmOpen}>
        <DialogContent className="bg-[#0F1117] border-2 border-[#013280] rounded-2xl max-w-[720px] p-0 overflow-hidden">
          <DialogTitle className="sr-only">Confirm Copy Data</DialogTitle>
          <DialogDescription className="sr-only">Confirm that you want to copy data from the selected property</DialogDescription>
          <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-[24px] font-['DM_Sans:Bold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                Choose A Source Property
              </h2>
              <button 
                onClick={() => {
                  setCopyDataConfirmOpen(false);
                  setCopyDataModalOpen(true);
                }}
                className="text-[#a6a9b2] hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="mb-8">
              <p className="text-white text-[16px] font-['DM_Sans:Regular',_sans-serif] leading-relaxed" style={{ fontVariationSettings: "'opsz' 14" }}>
                This will overwrite any data previously added to this property from this form. Files and integrations will not be copied or overwritten. Proceed?
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 justify-center">
              <button 
                onClick={() => {
                  setCopyDataConfirmOpen(false);
                  setCopyDataModalOpen(true);
                }}
                className="bg-[#d4183d] hover:bg-[#e02347] text-white px-8 py-3 rounded-lg text-[16px] font-['DM_Sans:SemiBold',_sans-serif] transition-colors min-w-[120px]"
                style={{ fontVariationSettings: "'opsz' 14" }}
              >
                NO
              </button>
              <button 
                onClick={() => {
                  // Handle copy data
                  const sourceName = selectedSourceProperty;
                  setCopyDataConfirmOpen(false);
                  setSelectedSourceProperty('');
                  showSaveSuccess(`Property data copied from '${sourceName}' successfully`);
                }}
                className="bg-[#3e88f7] hover:bg-[#5296f8] text-white px-8 py-3 rounded-lg text-[16px] font-['DM_Sans:SemiBold',_sans-serif] transition-colors min-w-[120px]"
                style={{ 
                  fontVariationSettings: "'opsz' 14",
                  boxShadow: '0 0 10px rgba(62, 136, 247, 0.2)'
                }}
              >
                YES
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Auto-Fill Progress Modal */}
      {showAutoFillProgress && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#0F1117] border-2 border-[#013280] rounded-2xl w-[500px] shadow-2xl p-8"
            style={{ boxShadow: '0 0 30px rgba(62, 136, 247, 0.2)' }}
          >
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto mb-4">
                <div className="w-16 h-16 border-4 border-[#3e88f7] border-t-transparent rounded-full animate-spin"
                  style={{ boxShadow: '0 0 10px rgba(62, 136, 247, 0.3)' }}
                ></div>
              </div>
              <h3 className="text-white text-[20px] font-['DM_Sans:Bold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                Auto-Fill In Progress
              </h3>
              <p className="text-[#a6a9b2] text-[15px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                We're auto-filling your property details. This will take about a minute.
              </p>
              <p className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                You can continue working on other tasks while this completes.
              </p>
              <button
                onClick={() => setShowAutoFillProgress(false)}
                className="bg-[#3e88f7] hover:bg-[#5296f8] text-white px-8 py-2.5 rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-all shadow-lg mt-4"
                style={{ 
                  fontVariationSettings: "'opsz' 14",
                  boxShadow: '0 0 10px rgba(62, 136, 247, 0.2)'
                }}
              >
                Continue Working
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Auto-Fill Modal */}
      {showAutoFillModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#0F1117] border-2 border-[#013280] rounded-2xl w-[650px] shadow-2xl"
            style={{ boxShadow: '0 0 30px rgba(62, 136, 247, 0.2)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#013280]">
              <h3 className="text-white text-[20px] font-['DM_Sans:Bold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                Auto-Fill Property Details
              </h3>
              <button
                onClick={() => setShowAutoFillModal(false)}
                className="text-[#a6a9b2] hover:text-white transition-colors p-2"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-white text-[15px] font-['DM_Sans:Regular',_sans-serif] mb-4 text-center" style={{ fontVariationSettings: "'opsz' 14" }}>
                You can auto-fill the property details form using the information in the PMS, and from any uploaded documents. This can make HostBuddy's knowledge base easier to visualize and manage.
              </p>
              
              <p className="text-white text-[15px] font-['DM_Sans:Regular',_sans-serif] mb-6 text-center" style={{ fontVariationSettings: "'opsz' 14" }}>
                If you have entered any data into the form, auto-fill will try to preserve that information while adding any new details. It may take about a minute to complete.
              </p>

              <p className="text-white text-[15px] font-['DM_Sans:SemiBold',_sans-serif] mb-4 text-center" style={{ fontVariationSettings: "'opsz' 14" }}>
                Choose the sources you want to use for auto-fill:
              </p>

              <div className="space-y-3 mb-8">
                <button
                  onClick={() => setAutoFillSources(prev => ({ ...prev, hostfullyData: !prev.hostfullyData }))}
                  className="flex items-center gap-3 w-full px-4 py-2"
                >
                  <div className={`w-5 h-5 rounded flex items-center justify-center transition-all ${
                    autoFillSources.hostfullyData
                      ? 'bg-[#3e88f7] shadow-lg'
                      : 'bg-[#17191f] border-2 border-[#013280]'
                  }`}
                    style={autoFillSources.hostfullyData ? { boxShadow: '0 0 8px rgba(62, 136, 247, 0.3)' } : {}}
                  >
                    {autoFillSources.hostfullyData && (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <span className="text-white text-[15px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                    Hostfully data
                  </span>
                </button>

                <button
                  onClick={() => setAutoFillSources(prev => ({ ...prev, conversationHistory: !prev.conversationHistory }))}
                  className="flex items-center gap-3 w-full px-4 py-2"
                >
                  <div className={`w-5 h-5 rounded flex items-center justify-center transition-all ${
                    autoFillSources.conversationHistory
                      ? 'bg-[#3e88f7] shadow-lg'
                      : 'bg-[#17191f] border-2 border-[#013280]'
                  }`}
                    style={autoFillSources.conversationHistory ? { boxShadow: '0 0 8px rgba(62, 136, 247, 0.3)' } : {}}
                  >
                    {autoFillSources.conversationHistory && (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <span className="text-white text-[15px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                    Conversation history
                  </span>
                </button>

                <button
                  onClick={() => setAutoFillSources(prev => ({ ...prev, bellevue: !prev.bellevue }))}
                  className="flex items-center gap-3 w-full px-4 py-2"
                >
                  <div className={`w-5 h-5 rounded flex items-center justify-center transition-all ${
                    autoFillSources.bellevue
                      ? 'bg-[#3e88f7] shadow-lg'
                      : 'bg-[#17191f] border-2 border-[#013280]'
                  }`}
                    style={autoFillSources.bellevue ? { boxShadow: '0 0 8px rgba(62, 136, 247, 0.3)' } : {}}
                  >
                    {autoFillSources.bellevue && (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <span className="text-white text-[15px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                    Bellevue (HF Guidebook)
                  </span>
                </button>

                <button
                  onClick={() => setAutoFillSources(prev => ({ ...prev, unit10Doc: !prev.unit10Doc }))}
                  className="flex items-center gap-3 w-full px-4 py-2"
                >
                  <div className={`w-5 h-5 rounded flex items-center justify-center transition-all ${
                    autoFillSources.unit10Doc
                      ? 'bg-[#3e88f7] shadow-lg'
                      : 'bg-[#17191f] border-2 border-[#013280]'
                  }`}
                    style={autoFillSources.unit10Doc ? { boxShadow: '0 0 8px rgba(62, 136, 247, 0.3)' } : {}}
                  >
                    {autoFillSources.unit10Doc && (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <span className="text-white text-[15px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                    Unit 10 1811 Adams Ave-Welcome Doc-docx.pdf
                  </span>
                </button>

                <button
                  onClick={() => setAutoFillSources(prev => ({ ...prev, notionDoc: !prev.notionDoc }))}
                  className="flex items-center gap-3 w-full px-4 py-2"
                >
                  <div className={`w-5 h-5 rounded flex items-center justify-center transition-all ${
                    autoFillSources.notionDoc
                      ? 'bg-[#3e88f7] shadow-lg'
                      : 'bg-[#17191f] border-2 border-[#013280]'
                  }`}
                    style={autoFillSources.notionDoc ? { boxShadow: '0 0 8px rgba(62, 136, 247, 0.3)' } : {}}
                  >
                    {autoFillSources.notionDoc && (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <span className="text-white text-[15px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                    notion_Adams - 10 - Guest.txt
                  </span>
                </button>
              </div>

              {/* Start Auto-Fill Button */}
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    setShowAutoFillModal(false);
                    setShowAutoFillProgress(true);
                    // Simulate auto-fill process
                    setTimeout(() => {
                      setShowAutoFillProgress(false);
                    }, 60000); // 1 minute
                  }}
                  className="bg-[#3e88f7] hover:bg-[#5296f8] text-white px-12 py-3 rounded-lg text-[16px] font-['DM_Sans:SemiBold',_sans-serif] transition-all shadow-lg"
                  style={{ 
                    fontVariationSettings: "'opsz' 14",
                    boxShadow: '0 0 10px rgba(62, 136, 247, 0.2)'
                  }}
                >
                  Start Auto-Fill
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Field Notes Modal */}
      {showFieldNotesModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0F1117] border-2 border-[#013280] rounded-2xl w-full max-w-[700px] shadow-2xl max-h-[90vh] overflow-hidden flex flex-col"
            style={{ boxShadow: '0 0 25px rgba(62, 136, 247, 0.15)' }}
          >
            {/* Header */}
            <div className="p-6 border-b border-[#013280] flex items-center justify-between flex-shrink-0">
              <h2 className="text-white text-[20px] font-['DM_Sans:Bold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                Additional Information
              </h2>
              <button
                onClick={() => {
                  setShowFieldNotesModal(false);
                  setShowCopyToProperties(false);
                  setSelectedCopyProperties(new Set());
                }}
                className="text-[#a6a9b2] hover:text-white transition-colors p-2"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {/* Field Name Display */}
                <div className="bg-[#17191f] border border-[#013280] rounded-lg p-4">
                  <p className="text-[#a6a9b2] text-[12px] font-['DM_Sans:Medium',_sans-serif] mb-1" style={{ fontVariationSettings: "'opsz' 14" }}>
                    FIELD
                  </p>
                  <p className="text-white text-[16px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                    {currentFieldLabel}
                  </p>
                </div>

                {/* Note Input */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <label className="text-white text-[15px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                      Additional Notes
                    </label>
                    {currentNote.trim().length > 0 && (
                      <div className="flex items-center gap-1.5 px-2 py-1 bg-[#3e88f7]/10 border border-[#3e88f7]/30 rounded-full">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#3e88f7]" 
                          style={{ boxShadow: '0 0 4px rgba(62, 136, 247, 0.6)' }}
                        />
                        <span className="text-[#3e88f7] text-[11px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                          Note Added
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
                    Add context or special instructions for this field. This information will be used by HostBuddy AI when responding to guests.
                  </p>
                  <textarea
                    value={currentNote}
                    onChange={(e) => setCurrentNote(e.target.value)}
                    placeholder="Enter additional information..."
                    className="w-full bg-[#01255e] border border-[#013280] rounded-lg px-4 py-3 text-white text-[14px] font-['DM_Sans:Regular',_sans-serif] focus:outline-none focus:border-[#3e88f7] transition-all min-h-[140px] resize-vertical placeholder:text-[#8A8E98]"
                    style={{ fontVariationSettings: "'opsz' 14" }}
                  />
                </div>

                {/* Reservation Phases */}
                <div className="bg-[#17191f] border border-[#013280] rounded-lg p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-white text-[15px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                      Reservation Stages
                    </p>
                    {!(currentNotePhases.current && currentNotePhases.future && currentNotePhases.inquiry) && (
                      <div className="flex items-center gap-1.5 px-2 py-1 bg-[#F97316]/10 border border-[#F97316]/30 rounded-full">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#F97316]" 
                          style={{ boxShadow: '0 0 4px rgba(249, 115, 22, 0.6)' }}
                        />
                        <span className="text-[#F97316] text-[11px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                          Phases Modified
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif] mb-5" style={{ fontVariationSettings: "'opsz' 14" }}>
                    Select which reservation stages should have access to this information. Deselected stages will not see this information.
                  </p>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => toggleNotePhase('future')}
                      className={`py-3 px-4 rounded-lg text-[13px] font-['DM_Sans:Medium',_sans-serif] transition-all ${
                        currentNotePhases.future 
                          ? 'bg-[#3e88f7] text-white border-2 border-[#3e88f7]' 
                          : 'bg-[#0F1117] text-[#676a73] border-2 border-[#013280]'
                      }`}
                      style={{ 
                        fontVariationSettings: "'opsz' 14",
                        ...(currentNotePhases.future ? { boxShadow: '0 0 12px rgba(62, 136, 247, 0.15)' } : {})
                      }}
                    >
                      Future
                    </button>
                    <button
                      onClick={() => toggleNotePhase('inquiry')}
                      className={`py-3 px-4 rounded-lg text-[13px] font-['DM_Sans:Medium',_sans-serif] transition-all ${
                        currentNotePhases.inquiry 
                          ? 'bg-[#3e88f7] text-white border-2 border-[#3e88f7]' 
                          : 'bg-[#0F1117] text-[#676a73] border-2 border-[#013280]'
                      }`}
                      style={{ 
                        fontVariationSettings: "'opsz' 14",
                        ...(currentNotePhases.inquiry ? { boxShadow: '0 0 12px rgba(62, 136, 247, 0.15)' } : {})
                      }}
                    >
                      Inquiry/Past
                    </button>
                    <button
                      onClick={() => toggleNotePhase('current')}
                      className={`py-3 px-4 rounded-lg text-[13px] font-['DM_Sans:Medium',_sans-serif] transition-all ${
                        currentNotePhases.current 
                          ? 'bg-[#3e88f7] text-white border-2 border-[#3e88f7]' 
                          : 'bg-[#0F1117] text-[#676a73] border-2 border-[#013280]'
                      }`}
                      style={{ 
                        fontVariationSettings: "'opsz' 14",
                        ...(currentNotePhases.current ? { boxShadow: '0 0 12px rgba(62, 136, 247, 0.15)' } : {})
                      }}
                    >
                      Current
                    </button>
                  </div>
                </div>

                {/* Copy to Properties Section */}
                <div className="bg-[#17191f] border border-[#013280] rounded-lg p-5">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-white text-[15px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                      Copy to Properties
                    </p>
                    {showCopyToProperties && (
                      <button
                        onClick={handleCopyToAllProperties}
                        className="text-[#3e88f7] text-[13px] font-['DM_Sans:SemiBold',_sans-serif] hover:opacity-80 transition-opacity"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                      >
                        Select All
                      </button>
                    )}
                  </div>
                  
                  {!showCopyToProperties ? (
                    <div>
                      <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
                        Copy this field including all notes and reservation stages to other properties in your account.
                      </p>
                      <button
                        onClick={() => setShowCopyToProperties(true)}
                        className="text-[#3e88f7] text-[14px] font-['DM_Sans:SemiBold',_sans-serif] hover:opacity-80 transition-opacity flex items-center gap-2"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                      >
                        <span>+</span> Select Properties
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-[180px] overflow-y-auto">
                      {availableProperties.map((property) => (
                        <button
                          key={property}
                          onClick={() => toggleCopyProperty(property)}
                          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg hover:bg-[#0F1117] transition-all"
                        >
                          <div className={`w-5 h-5 rounded flex items-center justify-center transition-all ${
                            selectedCopyProperties.has(property)
                              ? 'bg-[#3e88f7] shadow-lg'
                              : 'bg-[#17191f] border border-[#013280]'
                          }`}
                            style={selectedCopyProperties.has(property) ? { boxShadow: '0 0 5px rgba(62, 136, 247, 0.25)' } : {}}
                          >
                            {selectedCopyProperties.has(property) && (
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                          </div>
                          <span className={`text-[14px] font-['DM_Sans:Regular',_sans-serif] ${
                            selectedCopyProperties.has(property) ? 'text-white' : 'text-[#676a73]'
                          }`} style={{ fontVariationSettings: "'opsz' 14" }}>
                            {property}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer with Save Button */}
            <div className="border-t border-[#013280] p-6 flex-shrink-0 bg-[#0F1117]">
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => {
                    setShowFieldNotesModal(false);
                    setShowCopyToProperties(false);
                    setSelectedCopyProperties(new Set());
                  }}
                  className="bg-[#17191f] hover:bg-[#1f2127] text-[#a6a9b2] px-10 py-3 rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-all border border-[#013280]"
                  style={{ fontVariationSettings: "'opsz' 14" }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveFieldNote}
                  className="bg-[#3e88f7] hover:bg-[#5296f8] text-white px-10 py-3 rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-all shadow-lg"
                  style={{ 
                    fontVariationSettings: "'opsz' 14",
                    boxShadow: '0 0 10px rgba(62, 136, 247, 0.2)'
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reservation Phases Modal */}
      {showReservationPhases && editingSource && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#0F1117] border-2 border-[#013280] rounded-2xl w-[550px] shadow-2xl"
            style={{ boxShadow: '0 0 30px rgba(62, 136, 247, 0.2)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#013280]">
              <h3 className="text-white text-[20px] font-['DM_Sans:Bold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                Reservation Phases
              </h3>
              <button
                onClick={handleCancelReservationPhases}
                className="text-[#a6a9b2] hover:text-white transition-colors p-2"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              <ReservationPhaseSelector
                phases={tempReservationPhases}
                onToggle={togglePhase}
                title="Reservation Stages"
                description="Select which reservation stages should have access to this information."
                variant="buttons"
              />

              {/* Cancel and Save Buttons */}
              <div className="flex justify-center gap-3">
                <button
                  onClick={handleCancelReservationPhases}
                  className="bg-[#17191f] hover:bg-[#1f2127] text-[#a6a9b2] px-10 py-3 rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-all border border-[#013280]"
                  style={{ fontVariationSettings: "'opsz' 14" }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveReservationPhases}
                  className="bg-[#3e88f7] hover:bg-[#5296f8] text-white px-10 py-3 rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-all shadow-lg"
                  style={{ 
                    fontVariationSettings: "'opsz' 14",
                    boxShadow: '0 0 10px rgba(62, 136, 247, 0.2)'
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Additional Information Modal */}
      <Dialog open={additionalInfoOpen} onOpenChange={setAdditionalInfoOpen}>
        <DialogContent className="bg-[#0F1117] border-2 border-[#013280] rounded-2xl max-w-[600px] p-0 overflow-hidden">
          <DialogTitle className="sr-only">Additional Information</DialogTitle>
          <DialogDescription className="sr-only">Edit field information and reservation phases</DialogDescription>
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-[24px] font-['DM_Sans:Bold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                Additional Information
              </h2>
              <button 
                onClick={() => setAdditionalInfoOpen(false)}
                className="text-[#a6a9b2] hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <div>
                <h3 className="text-white text-[16px] font-['DM_Sans:SemiBold',_sans-serif] mb-3 text-center" style={{ fontVariationSettings: "'opsz' 14" }}>
                  {currentFieldLabel}
                </h3>
                <div className="bg-[#01255e] border border-[#013280] rounded-lg p-4">
                  <p className="text-white text-[14px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                    {currentFieldValue}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif] mb-6 text-center" style={{ fontVariationSettings: "'opsz' 14" }}>
                  Information from this question will only be provided to guests at the selected (blue) reservation stages. You can de-select stages below to prevent HostBuddy from sharing this information with those guests.
                </p>
                
                <div className="flex justify-center gap-4 mb-6">
                  <button
                    onClick={() => toggleAdditionalInfoPhase('current')}
                    className={`px-8 py-3 rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-all ${
                      selectedPhases.has('current')
                        ? 'bg-[#3e88f7] text-white shadow-lg'
                        : 'bg-[#17191f] text-[#676a73] border border-[#013280]'
                    }`}
                    style={{ 
                      fontVariationSettings: "'opsz' 14",
                      boxShadow: selectedPhases.has('current') ? '0 0 10px rgba(62, 136, 247, 0.3)' : 'none'
                    }}
                  >
                    Current
                  </button>
                  <button
                    onClick={() => toggleAdditionalInfoPhase('future')}
                    className={`px-8 py-3 rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-all ${
                      selectedPhases.has('future')
                        ? 'bg-[#3e88f7] text-white shadow-lg'
                        : 'bg-[#17191f] text-[#676a73] border border-[#013280]'
                    }`}
                    style={{ 
                      fontVariationSettings: "'opsz' 14",
                      boxShadow: selectedPhases.has('future') ? '0 0 10px rgba(62, 136, 247, 0.3)' : 'none'
                    }}
                  >
                    Future
                  </button>
                  <button
                    onClick={() => toggleAdditionalInfoPhase('inquiry')}
                    className={`px-8 py-3 rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-all ${
                      selectedPhases.has('inquiry')
                        ? 'bg-[#3e88f7] text-white shadow-lg'
                        : 'bg-[#17191f] text-[#676a73] border border-[#013280]'
                    }`}
                    style={{ 
                      fontVariationSettings: "'opsz' 14",
                      boxShadow: selectedPhases.has('inquiry') ? '0 0 10px rgba(62, 136, 247, 0.3)' : 'none'
                    }}
                  >
                    Inquiry/Past
                  </button>
                </div>
              </div>

              {/* Save Button */}
              <button 
                onClick={() => setAdditionalInfoOpen(false)}
                className="w-full bg-[#3e88f7] hover:bg-[#5296f8] text-white px-8 py-3 rounded-full text-[16px] font-['DM_Sans:Bold',_sans-serif] transition-all shadow-lg"
                style={{ 
                  fontVariationSettings: "'opsz' 14",
                  boxShadow: '0 0 10px rgba(62, 136, 247, 0.2)'
                }}
              >
                Save
              </button>

              {/* Copy Link */}
              <div className="text-center">
                <button className="text-[#3e88f7] text-[14px] font-['DM_Sans:SemiBold',_sans-serif] hover:opacity-80 transition-opacity" style={{ fontVariationSettings: "'opsz' 14" }}>
                  Copy To Other Properties
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {/* Delete Document Confirmation Modal */}
      {deleteDocModalOpen && docToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#0F1117] border-2 border-[#013280] rounded-2xl w-[500px] shadow-2xl"
            style={{ boxShadow: '0 0 30px rgba(62, 136, 247, 0.2)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#013280]">
              <h3 className="text-white text-[20px] font-['DM_Sans:Bold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                Delete Document
              </h3>
              <button
                onClick={() => {
                  setDeleteDocModalOpen(false);
                  setDocToDelete(null);
                }}
                className="text-[#a6a9b2] hover:text-white transition-colors p-2"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-white text-[15px] font-['DM_Sans:Regular',_sans-serif] mb-2 text-center" style={{ fontVariationSettings: "'opsz' 14" }}>
                Are you sure you want to delete this document?
              </p>
              <p className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Medium',_sans-serif] mb-6 text-center" style={{ fontVariationSettings: "'opsz' 14" }}>
                {docToDelete.name}
              </p>
              <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif] mb-6 text-center" style={{ fontVariationSettings: "'opsz' 14" }}>
                This action cannot be undone. The document will be permanently removed from the property's knowledge base.
              </p>

              {/* Buttons */}
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => {
                    setDeleteDocModalOpen(false);
                    setDocToDelete(null);
                  }}
                  className="bg-[#17191f] hover:bg-[#24262e] text-white border border-[#013280] px-6 py-2.5 rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-colors"
                  style={{ fontVariationSettings: "'opsz' 14" }}
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDeleteDocument}
                  className="bg-[#d4183d] hover:bg-[#b01530] text-white px-6 py-2.5 rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-colors"
                  style={{ fontVariationSettings: "'opsz' 14" }}
                >
                  Delete Document
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Reservation Stages Modal */}
      {showCopyDocModal && selectedCopyDocument && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#0F1117] border-2 border-[#013280] rounded-2xl w-[600px] shadow-2xl"
            style={{ boxShadow: '0 0 30px rgba(62, 136, 247, 0.2)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#013280]">
              <div>
                <h3 className="text-white text-[20px] font-['DM_Sans:Bold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                  Edit Reservation Stages
                </h3>
                <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif] mt-1" style={{ fontVariationSettings: "'opsz' 14" }}>
                  {selectedCopyDocument.name}
                </p>
              </div>
              <button
                onClick={() => {
                  setShowCopyDocModal(false);
                  setSelectedCopyDocument(null);
                  setSelectedDocModalProperties(new Set());
                }}
                className="text-[#a6a9b2] hover:text-white transition-colors p-2"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Reservation Phases Section - PRIMARY */}
              <div>
                <ReservationPhaseSelector
                  phases={docCopyModalPhases}
                  onToggle={toggleDocCopyModalPhase}
                  title="Reservation Stages"
                  description="Select which reservation stages should have access to this document."
                  variant="buttons"
                />
              </div>

              {/* Optional: Copy to Properties Section */}
              <div className="border-t border-[#013280] pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-white text-[15px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                      Copy to Properties <span className="text-[#676a73] text-[13px] font-['DM_Sans:Regular',_sans-serif]">(Optional)</span>
                    </p>
                    <p className="text-[#a6a9b2] text-[12px] font-['DM_Sans:Regular',_sans-serif] mt-1" style={{ fontVariationSettings: "'opsz' 14" }}>
                      Apply these settings to other properties
                    </p>
                  </div>
                  <button
                    onClick={handleCopyToAllDocModalProperties}
                    className="text-[#3e88f7] text-[13px] font-['DM_Sans:SemiBold',_sans-serif] hover:opacity-80 transition-opacity"
                    style={{ fontVariationSettings: "'opsz' 14" }}
                  >
                    {selectedDocModalProperties.size === availableProperties.length ? 'Deselect All' : 'Select All'}
                  </button>
                </div>

                <div className="space-y-2 max-h-[180px] overflow-y-auto">
                  {availableProperties.map((property) => (
                    <button
                      key={property}
                      onClick={() => toggleDocModalProperty(property)}
                      className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-[#17191f] transition-all"
                    >
                      <div className={`w-5 h-5 rounded flex items-center justify-center transition-all ${
                        selectedDocModalProperties.has(property)
                          ? 'bg-[#3e88f7] shadow-lg'
                          : 'bg-[#17191f] border border-[#013280]'
                      }`}
                        style={selectedDocModalProperties.has(property) ? { boxShadow: '0 0 5px rgba(62, 136, 247, 0.25)' } : {}}
                      >
                        {selectedDocModalProperties.has(property) && (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <span className="text-white text-[14px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                        {property}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 justify-end border-t border-[#013280] pt-6">
                <button
                  onClick={() => {
                    setShowCopyDocModal(false);
                    setSelectedCopyDocument(null);
                    setSelectedDocModalProperties(new Set());
                  }}
                  className="bg-[#17191f] hover:bg-[#24262e] text-white border border-[#013280] px-6 py-2.5 rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-colors"
                  style={{ fontVariationSettings: "'opsz' 14" }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleCopyDocumentToProperties}
                  className="bg-[#3e88f7] hover:bg-[#5296f8] text-white px-6 py-2.5 rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-all shadow-lg"
                  style={{ 
                    fontVariationSettings: "'opsz' 14",
                    boxShadow: '0 0 10px rgba(62, 136, 247, 0.2)'
                  }}
                >
                  {selectedDocModalProperties.size > 0 
                    ? `Save & Copy to ${selectedDocModalProperties.size} ${selectedDocModalProperties.size === 1 ? 'Property' : 'Properties'}`
                    : 'Save Changes'
                  }
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reservation Phases Modal for KB Sources */}
      {showReservationPhases && editingSource && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60] p-4">
          <div className="bg-[#0F1117] border-2 border-[#013280] rounded-2xl w-full max-w-[500px] shadow-2xl relative"
            style={{ boxShadow: '0 0 25px rgba(62, 136, 247, 0.15)' }}
          >
            {/* Header */}
            <div className="p-6 border-b border-[#013280] flex items-center justify-between">
              <h2 className="text-white text-[20px] font-['DM_Sans:Bold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                Reservation Phases
              </h2>
              <button
                onClick={handleCancelReservationPhases}
                className="text-[#a6a9b2] hover:text-white transition-colors p-2"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <ReservationPhaseSelector
                phases={tempReservationPhases}
                onToggle={togglePhase}
                title="Reservation Stages"
                description="Select which reservation stages should have access to this information."
                variant="buttons"
              />
            </div>

            {/* Footer Buttons */}
            <div className="flex gap-3 justify-end px-6 pb-6 pt-6 border-t border-[#013280]">
              <button
                onClick={handleCancelReservationPhases}
                className="bg-[#17191f] hover:bg-[#24262e] text-white border border-[#013280] px-6 py-2.5 rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-colors"
                style={{ fontVariationSettings: "'opsz' 14" }}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveReservationPhases}
                className="bg-[#3e88f7] hover:bg-[#5296f8] text-white px-6 py-2.5 rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-all shadow-lg"
                style={{ 
                  fontVariationSettings: "'opsz' 14",
                  boxShadow: '0 0 10px rgba(62, 136, 247, 0.2)'
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add SOP Modal */}
      <AddSOPModal
        open={showAddSOPModal}
        onOpenChange={setShowAddSOPModal}
        onSave={handleAddSOP}
        sectionName={addSOPSection}
      />
    </div>
  );
}
