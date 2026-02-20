export interface Profile {
  id: string;
  full_name: string;
  username: string;
  avatar_url: string;
  bio: string;
  is_premium: boolean;
  rating: number;
  vibes: string[] | null; // jsonb/array
  pref_group_size: number;
  pref_availability: string;
}

export interface Plan {
  id: string;
  creator_id: string;
  category: string;
  activity_type: string;
  title: string;
  description: string;
  image_url: string;
  max_spots: number; // 2-4
  event_date: string; // ISO string
  location_name: string;
  latitude: number;
  longitude: number;
  status: 'open' | 'closed' | 'cancelled'; // Assuming status values
}

export interface PlanParticipant {
  plan_id: string;
  profile_id: string;
  status: 'confirmed' | 'pending' | 'cancelled'; // Assuming status values
  created_at?: string;
  profile?: Profile; // Relation
}

export interface SavedPlan {
  plan_id: string;
  profile_id: string;
  created_at?: string;
}
