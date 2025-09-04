# Supabase存储桶设置指南

## 1. 创建存储桶

在Supabase控制台中：

1. 进入 **Storage** 部分
2. 点击 **Create a new bucket**
3. 输入存储桶名称：`nano-banana`
4. 选择 **Public** 访问权限（这样用户可以通过公共URL访问图片）

## 2. 配置存储桶策略

### 策略名称：`Allow authenticated users to upload images`

**Policy name**: `Allow authenticated users to upload images`

**Allowed operation**: 选择以下操作：
- ✅ `INSERT` (上传)
- ✅ `SELECT` (查看)
- ✅ `UPDATE` (更新)
- ✅ `DELETE` (删除)

**Target roles**: 选择 `authenticated` 角色

**Policy definition** (SQL):
```sql
(auth.role() = 'authenticated')
```

### 策略名称：`Allow public access to images`

**Policy name**: `Allow public access to images`

**Allowed operation**: 选择以下操作：
- ✅ `SELECT` (查看)

**Target roles**: 选择 `anon` 角色

**Policy definition** (SQL):
```sql
true
```

### 策略名称：`Allow users to manage their own images`

**Policy name**: `Allow users to manage their own images`

**Allowed operation**: 选择以下操作：
- ✅ `INSERT` (上传)
- ✅ `SELECT` (查看)
- ✅ `UPDATE` (更新)
- ✅ `DELETE` (删除)

**Target roles**: 选择 `authenticated` 角色

**Policy definition** (SQL):
```sql
(auth.role() = 'authenticated') AND (bucket_id = 'nano-banana')
```

## 3. 文件夹结构

存储桶将自动创建以下文件夹结构：
```
nano-banana/
├── gallery/
│   └── {user_id}/
│       ├── {timestamp}_{random}.png
│       └── ...
└── ...
```

## 4. 权限说明

- **认证用户**：可以上传、查看、更新、删除自己的图片
- **匿名用户**：只能查看公开的图片
- **图片路径**：`gallery/{user_id}/{timestamp}_{random}.png`
- **公共访问**：所有图片都可以通过公共URL访问

## 5. 安全考虑

- 用户只能访问自己的图片文件夹
- 图片文件名包含时间戳和随机字符串，避免冲突
- 支持图片的完整生命周期管理（上传、收藏、取消收藏、删除）

## 6. 测试

创建策略后，可以测试：
1. 用户登录后上传图片
2. 查看图片是否出现在画廊中
3. 测试爱心按钮的收藏/取消收藏功能
4. 验证图片是否正确存储在存储桶中
