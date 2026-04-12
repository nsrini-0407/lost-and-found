
// TYPE DEFINITIONS
// Central location for all TypeScript interfaces and types

export type ItemStatus = 'pending' | 'approved' | 'claimed' | 'rejected';
export type ClaimStatus = 'pending' | 'approved' | 'denied';

export const CATEGORIES = [
  'Electronics',
  'Clothing',
  'Accessories',
  'Books & School Supplies',
  'Sports Equipment',
  'Keys & ID',
  'Bags & Backpacks',
  'Other',
] as const;

export type Category = typeof CATEGORIES[number];

export interface Item {
  id: string;
  title: string;
  description: string;
  category: Category;
  location: string;
  date_found: string;       // ISO date string
  image_url: string | null;
  status: ItemStatus;
  submitter_name: string;
  submitter_email: string;
  created_at: string;
  updated_at: string;
}

export interface Claim {
  id: string;
  item_id: string;
  claimant_name: string;
  claimant_email: string;
  description: string;
  status: ClaimStatus;
  created_at: string;
  updated_at: string;
  // Joined field from admin queries
  item?: Item;
}

// Form input types (subset of full DB record)
export interface SubmitItemInput {
  title: string;
  description: string;
  category: Category;
  location: string;
  date_found: string;
  submitter_name: string;
  submitter_email: string;
  image?: File;
}

export interface ClaimInput {
  item_id: string;
  claimant_name: string;
  claimant_email: string;
  description: string;
}

export interface SearchFilters {
  query: string;
  category: string;
  sortBy: 'newest' | 'oldest';
  page: number;
}