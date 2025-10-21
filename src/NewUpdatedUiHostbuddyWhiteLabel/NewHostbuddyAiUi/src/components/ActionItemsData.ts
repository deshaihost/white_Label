// Shared action items data and state
import { showSaveSuccess } from './useSaveNotification';

export interface ActionItem {
  id: number;
  date: string;
  time: string;
  property: string;
  guest: string;
  category?: string;
  action: string;
  completedBy?: string;
  completed: boolean;
}

// Initial action items data
let actionItemsData: ActionItem[] = [
  {
    id: 1,
    date: 'Oct 11',
    time: '12:53pm',
    property: 'Halle Sweetsclaw',
    guest: 'Sweetsclaw',
    category: 'SPECIAL REQUESTS',
    action: 'The guest requested to reserve one parking spot for October 11-17 or any available day after.',
    completed: false,
  },
  {
    id: 2,
    date: 'Oct 11',
    time: '11:32am',
    property: 'Bill Adams - 10',
    guest: 'Little Nemesis',
    category: 'MAINTENANCE',
    action: 'The guest requested a mid-stay cleaning service with fresh towels and shower clearing; confirm and arrange the service as soon as possible.',
    completed: false,
  },
  {
    id: 3,
    date: 'Oct 11',
    time: '11:04am',
    property: 'Bill Adams - 2',
    guest: 'Cheyenne Calzetta',
    category: 'RESERVATION CHANGES',
    action: 'The guest has requested confirmation that they will receive a full refund if they cancel their reservation in order to rebook and select payment details.',
    completed: false,
  },
  {
    id: 4,
    date: 'Oct 11',
    time: '11:07am',
    property: 'Bill Adams - 10',
    guest: 'Little Nemesis',
    category: 'MAINTENANCE',
    action: 'The guest is awaiting manual adjustment and confirmation of their reservation extension to reflect the new checkout date of Monday, October 13th, as they wish to extend for an additional 3 days and seek confirmation to any price.',
    completed: false,
  },
  {
    id: 5,
    date: 'Oct 11',
    time: '10:48am',
    property: 'Bill Adams - 8',
    guest: 'Kyle Kubiszewski',
    category: 'MAINTENANCE',
    action: 'The guest reported ongoing difficulty with fully opening the sleeper sofa; host team needs to assist the guest immediately.',
    completed: false,
  },
  {
    id: 6,
    date: 'Oct 11',
    time: '9:57am',
    property: '32nd Sunset',
    guest: 'Julie Rocha',
    category: 'CLEANLINESS',
    action: 'The guest reported that a part of the fridge was broken at checkout and clarified it was not caused by them.',
    completed: false,
  },
  {
    id: 7,
    date: 'Oct 11',
    time: '8:30am',
    property: 'Leo 506',
    guest: 'Sarah Mitchell',
    category: 'SPECIAL REQUESTS',
    action: 'The guest requested early check-in for 11am instead of standard 3pm check-in.',
    completed: false,
  },
  {
    id: 8,
    date: 'Oct 10',
    time: '6:15pm',
    property: '1B1 Adams - 4',
    guest: 'Michael Chang',
    category: 'OTHER',
    action: 'The guest asked about wifi password and requested the welcome book information.',
    completed: false,
  },
];

// Listeners for state changes
const listeners: Set<() => void> = new Set();

export function getActionItems(): ActionItem[] {
  return actionItemsData;
}

export function toggleActionItemCompletion(id: number, completedBy: string = 'Sam Demo') {
  const item = actionItemsData.find(item => item.id === id);
  const wasCompleted = item?.completed;
  
  actionItemsData = actionItemsData.map(item => 
    item.id === id 
      ? { ...item, completed: !item.completed, completedBy: item.completed ? undefined : completedBy }
      : item
  );
  notifyListeners();
  
  if (!wasCompleted) {
    showSaveSuccess('Action item marked as complete');
  } else {
    showSaveSuccess('Action item marked as incomplete');
  }
}

export function subscribeToActionItems(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function notifyListeners() {
  listeners.forEach(listener => listener());
}
