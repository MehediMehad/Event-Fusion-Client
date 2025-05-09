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


  export interface TEventResponse {
    metadata: Metadata
    review: Review[]
    invitation: any[]
    participation: participation[]
  }
  
  export interface Metadata {
    id: string
    title: string
    date_time: string
    venue: string
    description: string
    registration_fee: number
    coverPhoto: string
    organizer: Organizer
    is_public: boolean
    is_paid: boolean
    location: string
    createdAt: string
  }
  
  export interface Organizer {
    id: string
    name: string
    email: string
    profilePhoto: string
  }

  export interface participation {
    id: string
    userId: string
    eventId: string
    status: string
    payment_status: string
    paymentId: any
    joined_at: string
    user: User
  }
  
interface Review {
    id: string
    userId: string
    eventId: string
    rating: number
    comment: string
    created_at: string
    updated_at: string
    user: User
  }

interface User {
    id: string
    name: string
    profilePhoto: string
    email: string
  }
