# Synk — Setup Guide

This will get your synced calendar app live in about 15 minutes. No coding required, just copy-pasting.

---

## Step 1: Create a Supabase Account (Free)

1. Go to **https://supabase.com** and click "Start your project"
2. Sign up with GitHub or email
3. Click "New Project"
4. Name it `synk` (or whatever you want)
5. Set a database password (save this somewhere)
6. Choose a region close to you
7. Click "Create new project" and wait ~2 minutes

---

## Step 2: Set Up the Database

Once your project is ready:

1. In the left sidebar, click **SQL Editor**
2. Click "New query"
3. Copy and paste this entire block:

```sql
-- Create the assignments table
CREATE TABLE assignments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  class_name TEXT DEFAULT 'General',
  category TEXT DEFAULT 'default',
  due_date TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;

-- Users can only see their own assignments
CREATE POLICY "Users can view own assignments"
  ON assignments FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own assignments
CREATE POLICY "Users can insert own assignments"
  ON assignments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own assignments
CREATE POLICY "Users can update own assignments"
  ON assignments FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own assignments
CREATE POLICY "Users can delete own assignments"
  ON assignments FOR DELETE
  USING (auth.uid() = user_id);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE assignments;
```

4. Click **Run** (or Cmd/Ctrl + Enter)
5. You should see "Success" ✓

---

## Step 3: Get Your API Keys

1. In the left sidebar, click **Settings** (gear icon)
2. Click **API** in the settings menu
3. You'll see two values you need:
   - **Project URL** — looks like `https://xxxxx.supabase.co`
   - **anon public key** — a long string starting with `eyJ...`

Keep this page open, you'll need these in the next step.

---

## Step 4: Create a Vercel Account (Free)

1. Go to **https://vercel.com** and sign up with GitHub
2. Once logged in, click **Add New → Project**

---

## Step 5: Deploy the App

### Option A: Deploy from GitHub (Recommended)

1. Create a new GitHub repository
2. Upload all the files from this `synk-full` folder to it
3. In Vercel, click "Import" next to your new repo
4. Before deploying, click **Environment Variables** and add:
   - `VITE_SUPABASE_URL` = your Project URL from Step 3
   - `VITE_SUPABASE_ANON_KEY` = your anon public key from Step 3
5. Click **Deploy**

### Option B: Deploy with Vercel CLI

1. Install Vercel CLI: `npm install -g vercel`
2. In this folder, create a file called `.env`:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```
3. Run `vercel` and follow the prompts
4. Run `vercel --prod` to deploy to production

---

## Step 6: You're Done! 🎉

Your app is now live at something like `https://synk-xxxxx.vercel.app`

### Share with friends:
- Send them the link
- They create an account
- Their assignments sync across all their devices!

### Install as an app:
**iPhone/Android:**
1. Open the link in Safari (iPhone) or Chrome (Android)
2. Tap the share button
3. Tap "Add to Home Screen"
4. Now it's an app icon!

**Desktop:**
1. Open in Chrome
2. Click the install icon in the address bar (or Menu → Install Synk)

---

## Troubleshooting

**"Invalid API key"**
- Double-check your environment variables in Vercel
- Make sure there are no extra spaces

**"User not found"**
- Make sure you ran the SQL in Step 2
- Check that Row Level Security is enabled

**Changes not syncing**
- Refresh the page
- Check your internet connection

---

## Optional: Custom Domain

In Vercel:
1. Go to your project settings
2. Click "Domains"
3. Add your custom domain (e.g., `synk.yourdomain.com`)

---

Made with ☕
