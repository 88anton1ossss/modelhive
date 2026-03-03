-- Phase 2 Schema Fixes for ModelHive
-- This script is robust and idempotent. It will safely update your schema.

-- 1. Updates to profiles table
DO $$ 
BEGIN 
  ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS username TEXT UNIQUE;
  ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS bio TEXT;
  ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS follower_count INT DEFAULT 0;
END $$;

-- 2. Updates to products table
DO $$ 
BEGIN 
  -- First, guarantee all columns exist
  ALTER TABLE public.products ADD COLUMN IF NOT EXISTS product_type TEXT;
  ALTER TABLE public.products ADD COLUMN IF NOT EXISTS avg_rating DECIMAL(5,2) DEFAULT 0;
  ALTER TABLE public.products ADD COLUMN IF NOT EXISTS quality_score INT DEFAULT 0;
  ALTER TABLE public.products ADD COLUMN IF NOT EXISTS master_file_path TEXT DEFAULT 'demo/path/placeholder.zip';
  
  -- Second, safely enforce the correct types (to fix numeric overflow issues)
  ALTER TABLE public.products ALTER COLUMN price TYPE DECIMAL(10,2);
  ALTER TABLE public.products ALTER COLUMN avg_rating TYPE DECIMAL(5,2);
  ALTER TABLE public.products ALTER COLUMN quality_score TYPE INT;
  
  -- Make master_file_path optional just in case old rows don't have it
  ALTER TABLE public.products ALTER COLUMN master_file_path DROP NOT NULL;
  
  -- Remove the restrictive category check
  ALTER TABLE public.products DROP CONSTRAINT IF EXISTS products_category_check;
END $$;

-- 3. Create Follows table
CREATE TABLE IF NOT EXISTS public.follows (
    follower_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    following_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    PRIMARY KEY (follower_id, following_id)
);

ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Follows are viewable by everyone" ON public.follows;
CREATE POLICY "Follows are viewable by everyone" ON public.follows FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can follow/unfollow creators" ON public.follows;
CREATE POLICY "Users can follow/unfollow creators" ON public.follows FOR ALL USING (auth.uid() = follower_id);
