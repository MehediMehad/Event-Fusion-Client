export interface TReviewData {
    reviews: TReview[]
    averageRating: number
    totalReviews: number
  }
  
  export interface TReview {
    id: string
    userId: string
    eventId: string
    rating: string
    comment: string
    created_at: string
    updated_at: string
    user: User
  }
  
  export interface User {
    id: string
    name: string
    profilePhoto: string
  }

  export interface Review {
    id: string
    userId: string
    eventId: string
    rating: string
    comment: string
    created_at: string
    updated_at: string
    user: User
  }


  export interface ReviewData {
    id: string;
    userId: string;
    eventId: string;
    rating: number;
    comment: string;
    created_at: string;
    updated_at: string;
    event: {
      title: string;
      location: string;
      date_time: string;
      coverPhoto: string;
      is_paid: boolean;
      is_public: boolean;
      description: string;
    };
    user: {
      name: string;
      email: string;
    };
  }