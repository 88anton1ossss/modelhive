-- Phase 2 Seed: Realistic Samples for ModelHive (Dynamic User ID Version)
-- This script automatically picks the first available user from auth.users to avoid foreign key errors.

DO $$
DECLARE
    target_user_id UUID;
BEGIN
    -- 1. Get the first available user from auth.users
    SELECT id INTO target_user_id FROM auth.users LIMIT 1;
    
    IF target_user_id IS NULL THEN
        RAISE EXCEPTION 'No users found in auth.users. Please sign up on the site first to create a user account!';
    END IF;

    -- 2. Ensure the profile exists for this user
    INSERT INTO public.profiles (id, full_name, username, role, avatar_url, bio, follower_count)
    VALUES (
        target_user_id, 
        'Julian Artiste', 
        'julian_creatif', 
        'seller', 
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
        'AI Research Artist focusing on cinematic aesthetics and architectural photography datasets.',
        1240
    ) ON CONFLICT (id) DO UPDATE SET 
        username = EXCLUDED.username,
        role = EXCLUDED.role,
        bio = EXCLUDED.bio;

    -- 3. Add Realistic Products for this user
    INSERT INTO public.products (
        seller_id, title, category, product_type, price, status, quality_score, preview_urls, metadata, master_file_path
    ) VALUES 
    -- A LoRA Model
    (
        target_user_id,
        'Cinematic Interior Portrait XL',
        'model',
        'model',
        25.00,
        'active',
        98,
        ARRAY['https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop'],
        '{
            "base_model": "SDXL 1.0",
            "trigger_word": "cinterior",
            "license_prices": {
                "personal": 25,
                "commercial": 85,
                "extended": 250,
                "exclusive": 1200
            },
            "description": "High-fidelity LoRA for generating photorealistic architectural interiors with soft lighting."
        }',
        'demo/lora-sample.safetensors'
    ),
    -- A Dataset
    (
        target_user_id,
        'Street Life 10k RAW Dataset',
        'dataset',
        'dataset',
        45.00,
        'active',
        94,
        ARRAY['https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1000&auto=format&fit=crop'],
        '{
            "image_count": 10000,
            "max_resolution": "8K",
            "license_prices": {
                "personal": 45,
                "commercial": 150,
                "extended": 500
            },
            "description": "Premium collection of candid street photography from 12 major cities."
        }',
        'demo/street-dataset.zip'
    ),
    -- A LUT
    (
        target_user_id,
        'Midnight Noir LUT Pack',
        'lut',
        'lut',
        15.00,
        'active',
        92,
        ARRAY['https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=1000&auto=format&fit=crop'],
        '{
            "is_pwyw": true,
            "min_price": 10,
            "license_prices": {
                "personal": 15,
                "commercial": 45
            },
            "description": "Moody, high-contrast LUTs for cinematic night scenes."
        }',
        'demo/noir.cube'
    ),
    -- A Preset
    (
        target_user_id,
        'Ethereal Glow Lightroom Presets',
        'preset',
        'preset',
        19.00,
        'active',
        89,
        ARRAY['https://images.unsplash.com/photo-1492691523567-6170d0275df1?q=80&w=1000&auto=format&fit=crop'],
        '{
            "license_prices": {
                "personal": 19,
                "commercial": 59
            },
            "description": "Soft, dreamy presets for outdoor portraiture."
        }',
        'demo/ethereal.xmp'
    ),
    -- A Bundle
    (
        target_user_id,
        'The Creator Ultimate Bundle',
        'bundle',
        'bundle',
        99.00,
        'active',
        96,
        ARRAY['https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop'],
        '{
            "license_prices": {
                "personal": 99,
                "commercial": 299,
                "extended": 999
            },
            "description": "Complete toolkit including 3 models, 2 datasets, and 10 LUTs."
        }',
        'demo/bundle.zip'
    );

    RAISE NOTICE 'Seed successful for user ID: %', target_user_id;
END $$;
