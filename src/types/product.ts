/**
 * ModelHive Product & User Types
 * Refined for V2 Schema with detailed categorization and licensing.
 */

export type ProductType =
    | 'model'
    | 'dataset'
    | 'lut'
    | 'preset'
    | 'effect'
    | 'bundle';

export type LicenseType =
    | 'personal'
    | 'commercial'
    | 'extended'
    | 'exclusive';

export type CreatorRole =
    | 'ai_creator'
    | 'photographer'
    | 'color_grader'
    | 'video_editor'
    | 'retoucher'
    | 'graphic_designer';

export interface ProductMetadata {
    base_model?: string;
    trigger_word?: string;
    recommended_settings?: string;
    // New dataset-specific metadata
    image_count?: number;
    max_resolution?: string;
    contains_faces?: boolean;
    has_model_releases?: boolean;
    [key: string]: any;
}

export interface Product {
    id: string;
    seller_id: string;
    title: string;
    description: string | null;
    price: number;
    category: string; // Legacy field
    product_type: ProductType;
    license_type: LicenseType;

    metadata: ProductMetadata;
    master_file_path: string;
    preview_urls: string[];

    quality_score: number;
    avg_rating: number;
    review_count: number;

    status: 'draft' | 'pending_approval' | 'active' | 'disabled';
    created_at: string;
}

export interface SellerProfile {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
    role: 'seller' | 'buyer' | 'admin';
    roles: CreatorRole[]; // Multiple roles supported
    style_tags: string[];
    stripe_connect_id: string | null;
    earnings_total: number;
    follower_count?: number;
    created_at: string;
}
