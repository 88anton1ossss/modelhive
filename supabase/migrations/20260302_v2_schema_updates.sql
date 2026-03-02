-- Supabase Migration: V2 Schema Updates
-- Supports detailed product categorization, licensing, and detailed creator roles.

-- 1. Updates to the products table
-- Use TEXT for types to allow easy future expansion without complex ENUM migrations in Supabase Studio
ALTER TABLE products 
  ADD COLUMN IF NOT EXISTS product_type TEXT NOT NULL DEFAULT 'ai_model',
  ADD COLUMN IF NOT EXISTS license_type TEXT NOT NULL DEFAULT 'personal',
  ADD COLUMN IF NOT EXISTS image_count INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS max_resolution TEXT,
  ADD COLUMN IF NOT EXISTS contains_faces BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS has_model_releases BOOLEAN DEFAULT FALSE;

-- Add check constraint for product_type
ALTER TABLE products
  DROP CONSTRAINT IF EXISTS check_product_type,
  ADD CONSTRAINT check_product_type 
  CHECK (product_type IN ('model', 'dataset', 'lut', 'preset', 'effect', 'bundle'));

-- Add check constraint for license_type
ALTER TABLE products
  DROP CONSTRAINT IF EXISTS check_license_type,
  ADD CONSTRAINT check_license_type 
  CHECK (license_type IN ('personal', 'commercial', 'extended', 'exclusive'));

-- Create index for performance on product_type
CREATE INDEX IF NOT EXISTS idx_products_product_type ON products(product_type);

-- 2. Updates to the profiles table
-- Support multiple roles per creator as requested (text array)
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS roles TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS style_tags TEXT[] DEFAULT '{}';

-- Optional: Add a helper comment or description
COMMENT ON COLUMN products.product_type IS 'Categories: model, dataset, lut, preset, effect, bundle';
COMMENT ON COLUMN profiles.roles IS 'Roles: ai_creator, photographer, color_grader, video_editor, retoucher, graphic_designer';
