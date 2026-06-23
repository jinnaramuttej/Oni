-- =============================================================================
-- Oni — Supabase Row Level Security (RLS) Policies
-- Run this entire script in your Supabase SQL Editor before going to production.
-- =============================================================================

-- =============================================================================
-- STEP 1: Enable RLS on all tables
-- =============================================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE chats ENABLE ROW LEVEL SECURITY;

-- =============================================================================
-- STEP 2: profiles table policies
-- 
-- NOTE: Oni uses custom HMAC session tokens, not Supabase Auth.
-- Server-side API routes use the service role key which bypasses RLS.
-- These policies protect the data in case client-side access is ever added
-- or if the service role key is accidentally exposed.
-- =============================================================================

-- Drop existing policies if re-running
DROP POLICY IF EXISTS "profiles_insert_own" ON profiles;
DROP POLICY IF EXISTS "profiles_select_own" ON profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON profiles;
DROP POLICY IF EXISTS "profiles_delete_own" ON profiles;

-- No public inserts — all profile creation goes through server-side API
CREATE POLICY "profiles_insert_own"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid()::text = id);

-- Users can only read their own profile
CREATE POLICY "profiles_select_own"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = id);

-- Users can only update their own profile
CREATE POLICY "profiles_update_own"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = id)
  WITH CHECK (auth.uid()::text = id);

-- Users can only delete their own profile
CREATE POLICY "profiles_delete_own"
  ON profiles
  FOR DELETE
  TO authenticated
  USING (auth.uid()::text = id);

-- =============================================================================
-- STEP 3: chats table policies
--
-- visitor_id is the UUID stored in the user's browser (localStorage).
-- These policies ensure chats are only accessible to the visitor who owns them.
-- =============================================================================

-- Drop existing policies if re-running
DROP POLICY IF EXISTS "chats_select_own" ON chats;
DROP POLICY IF EXISTS "chats_insert_own" ON chats;
DROP POLICY IF EXISTS "chats_update_own" ON chats;
DROP POLICY IF EXISTS "chats_delete_own" ON chats;

-- Users can read only their own chats
CREATE POLICY "chats_select_own"
  ON chats
  FOR SELECT
  USING (visitor_id::text = auth.uid()::text);

-- Users can only insert chats for themselves
CREATE POLICY "chats_insert_own"
  ON chats
  FOR INSERT
  WITH CHECK (visitor_id::text = auth.uid()::text);

-- Users can only update their own chats
CREATE POLICY "chats_update_own"
  ON chats
  FOR UPDATE
  USING (visitor_id::text = auth.uid()::text)
  WITH CHECK (visitor_id::text = auth.uid()::text);

-- Users can only delete their own chats
CREATE POLICY "chats_delete_own"
  ON chats
  FOR DELETE
  USING (visitor_id::text = auth.uid()::text);

-- =============================================================================
-- STEP 4: Recommended indexes (if not already created)
-- =============================================================================

CREATE INDEX IF NOT EXISTS chats_visitor_id_idx ON chats (visitor_id);
CREATE INDEX IF NOT EXISTS chats_updated_at_idx ON chats (updated_at DESC);
CREATE UNIQUE INDEX IF NOT EXISTS profiles_email_idx ON profiles (email);

-- =============================================================================
-- VERIFICATION: Run this to confirm RLS is enabled
-- =============================================================================
-- SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public';
