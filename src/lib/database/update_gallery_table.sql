-- 更新nano_user_images表以支持Supabase存储桶功能

-- 如果表不存在，创建表
CREATE TABLE IF NOT EXISTS nano_user_images (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  storage_path TEXT, -- 新增：存储桶中的路径
  prompt TEXT,
  style TEXT,
  size TEXT,
  is_public BOOLEAN DEFAULT true,
  is_favorited BOOLEAN DEFAULT false, -- 新增：是否收藏
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 如果表已存在，添加新列
DO $$ 
BEGIN
  -- 添加storage_path列（如果不存在）
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'nano_user_images' AND column_name = 'storage_path') THEN
    ALTER TABLE nano_user_images ADD COLUMN storage_path TEXT;
  END IF;
  
  -- 添加is_favorited列（如果不存在）
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'nano_user_images' AND column_name = 'is_favorited') THEN
    ALTER TABLE nano_user_images ADD COLUMN is_favorited BOOLEAN DEFAULT false;
  END IF;
END $$;

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_nano_user_images_user_id ON nano_user_images(user_id);
CREATE INDEX IF NOT EXISTS idx_nano_user_images_favorited ON nano_user_images(is_favorited);
CREATE INDEX IF NOT EXISTS idx_nano_user_images_public ON nano_user_images(is_public);
CREATE INDEX IF NOT EXISTS idx_nano_user_images_created_at ON nano_user_images(created_at);

-- 创建RLS策略
ALTER TABLE nano_user_images ENABLE ROW LEVEL SECURITY;

-- 用户只能查看自己的图片和公开图片
CREATE POLICY "Users can view their own images" ON nano_user_images
  FOR SELECT USING (auth.uid() = user_id OR is_public = true);

-- 用户只能插入自己的图片
CREATE POLICY "Users can insert their own images" ON nano_user_images
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 用户只能更新自己的图片
CREATE POLICY "Users can update their own images" ON nano_user_images
  FOR UPDATE USING (auth.uid() = user_id);

-- 用户只能删除自己的图片
CREATE POLICY "Users can delete their own images" ON nano_user_images
  FOR DELETE USING (auth.uid() = user_id);

-- 创建更新时间触发器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_nano_user_images_updated_at 
  BEFORE UPDATE ON nano_user_images 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
