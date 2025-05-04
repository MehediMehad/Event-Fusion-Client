export type EventType = {
    id: string;
    title: string;
    description: string;
    coverPhoto: string;
    date_time: string;
    venue: string;
    location: string;
    is_public: boolean;
    is_paid: boolean;
    registration_fee: number;
    isDeleted: boolean;
    status: 'UPCOMING' | 'ONGOING' | 'COMPLETED' | 'CANCELLED'; // assuming EventStatus enum values
    createdAt: string; // ISO string
    updatedAt: string; // ISO string
  
    organizerId: string;
    organizer?: any; // optional if not always populated
    invitation?: any[]; // optional
    review?: any | null; // nullable
  };