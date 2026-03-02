-- 1. Create Sample Creators (if not exist)
INSERT INTO profiles (id, full_name, username, avatar_url, bio, subscription_tier, roles, style_tags)
VALUES 
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Sarah Chen', 'sarahai', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200', 'Digital artist specializing in cinematic AI portrait models and LoRAs.', 'pro', '{ai_creator, retoucher}', '{cinematic, portrait, realism}'),
  ('b1ffbc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'Mike Rodriguez', 'mikerender', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200', 'Architectural visualizer and environment artist. Creating Flux-optimized models.', 'studio', '{ai_creator, graphic_designer}', '{architecture, interior, landscape}'),
  ('c2eedc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'Emma Liu', 'emmadatasets', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200', 'Deep learning researcher providing high-quality, ethically sourced image datasets.', 'free', '{photographer, ai_creator}', '{fashion, street, editorial}')
ON CONFLICT (id) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  username = EXCLUDED.username,
  avatar_url = EXCLUDED.avatar_url,
  subscription_tier = EXCLUDED.subscription_tier,
  roles = EXCLUDED.roles,
  style_tags = EXCLUDED.style_tags;

-- 2. Create Sample Products
INSERT INTO products (
  id, 
  seller_id, 
  title, 
  description, 
  price, 
  is_pwyw, 
  product_type, 
  license_type, 
  category, 
  status, 
  preview_urls, 
  metadata,
  quality_score,
  base_model
)
VALUES 
  -- Product 1: Cinematic Portrait LoRA
  ('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a44', 
   'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 
   'Cinematic Portrait Pro', 
   'A highly optimized LoRA for SDXL that produces stunning cinematic portraits with natural skin textures and dramatic lighting. Perfect for editorial and fashion AI art.', 
   24.99, 
   false, 
   'model', 
   'personal', 
   'SDXL', 
   'active', 
   '{"https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200"}', 
   '{"base_model": "SDXL", "type": "LoRA", "steps": 2500, "trigger_words": ["cinematic_portrait", "high_skin_detail"]}',
   9.8,
   'SDXL'
  ),

  -- Product 2: Architectural Render Flux Model
  ('e1ffbc99-9c0b-4ef8-bb6d-6bb9bd380a55', 
   'b1ffbc99-9c0b-4ef8-bb6d-6bb9bd380a22', 
   'Architectural Render LoRA', 
   'Transform your Flux generations into professional architectural renders. This model excels at lighting, materials, and structural accuracy for both interior and exterior views.', 
   19.99, 
   true, 
   'model', 
   'commercial', 
   'Flux', 
   'active', 
   '{"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200"}', 
   '{"base_model": "Flux.1 [dev]", "type": "LoRA", "steps": 3000, "trigger_words": ["modern_arch", "photo_rendering"]}',
   9.5,
   'Flux'
  ),

  -- Product 3: Fashion Dataset 2024
  ('f2eedc99-9c0b-4ef8-bb6d-6bb9bd380a66', 
   'c2eedc99-9c0b-4ef8-bb6d-6bb9bd380a33', 
   'Fashion Dataset 2024', 
   'A curated collection of over 500 high-resolution editorial fashion images, professionally tagged for training high-conformance AI models. Includes diverse models and lighting conditions.', 
   49.99, 
   false, 
   'dataset', 
   'extended', 
   'Dataset', 
   'active', 
   '{"https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1200"}', 
   '{"image_count": 520, "max_resolution": "4K", "contains_faces": true, "has_model_releases": true}',
   8.9,
   'Dataset'
  ),

  -- Product 4: CyberPunk Aesthetic LoRA
  ('03eedc99-9c0b-4ef8-bb6d-6bb9bd380a77', 
   'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 
   'CyberPunk Portrait LoRA', 
   'Infuse your images with neon lights, futuristic fashion, and dark urban vibes. Tuned specifically for close-up portraits and character design.', 
   29.00, 
   false, 
   'model', 
   'commercial', 
   'SDXL', 
   'active', 
   '{"https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1200"}', 
   '{"base_model": "SDXL", "type": "LoRA", "trigger_words": ["cyberpunk", "neon_glow"]}',
   9.2,
   'SDXL'
  ),

  -- Product 5: Urban Architecture Pack
  ('14eedc99-9c0b-4ef8-bb6d-6bb9bd380a88', 
   'b1ffbc99-9c0b-4ef8-bb6d-6bb9bd380a22', 
   'Urban Architecture Pack', 
   'A comprehensive collection of 200+ raw photos of modern architecture. Perfect for training LoRAs or as reference material for 3D modeling.', 
   39.00, 
   false, 
   'dataset', 
   'personal', 
   'Dataset', 
   'active', 
   '{"https://images.unsplash.com/photo-1449156001433-400fb864ee39?auto=format&fit=crop&q=80&w=1200"}', 
   '{"image_count": 215, "max_resolution": "6K", "contains_faces": false}',
   8.5,
   'Dataset'
  )
ON CONFLICT (id) DO NOTHING;
