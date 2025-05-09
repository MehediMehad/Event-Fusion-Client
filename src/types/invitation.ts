
export interface TInvitations {
  id: string
  senderId: string
  receiverId: string
  event_id: string
  status: string
  invited_at: string
  respondedAt: string
  sender: Sender
  event: Event
}

export interface Sender {
  id: string
  name: string
  profilePhoto: any
  contactNumber: string
  email: string
  password: string
  role: string
  gender: string
  needPasswordChange: boolean
  isDeleted: boolean
  status: string
  createdAt: string
  updatedAt: string
}

export interface Event {
  id: string
  title: string
  description: string
  coverPhoto: string
  date_time: string
  venue: string
  location: string
  is_public: boolean
  is_paid: boolean
  registration_fee: number
  isDeleted: boolean
  status: string
  createdAt: string
  updatedAt: string
  organizerId: string
}
