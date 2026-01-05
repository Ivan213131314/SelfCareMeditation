-- ============================================
-- Создание базы данных для SelfCareMeditation
-- ============================================

-- 1. Таблица категорий практик
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Таблица практик
CREATE TABLE IF NOT EXISTS practices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  duration INTEGER NOT NULL, -- длительность в секундах
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  image_url TEXT,
  audio_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Таблица профилей пользователей
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Таблица записей дневника
CREATE TABLE IF NOT EXISTS journal_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  emoji TEXT NOT NULL,
  shortcuts TEXT[] DEFAULT '{}',
  text TEXT,
  practice_id UUID REFERENCES practices(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Row Level Security (RLS)
-- ============================================

-- Включение RLS для всех таблиц
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE practices ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;

-- ============================================
-- Политики доступа для categories
-- ============================================

-- Публичное чтение категорий для авторизованных пользователей
DROP POLICY IF EXISTS "Категории доступны всем для чтения" ON categories;
CREATE POLICY "Категории доступны всем для чтения"
  ON categories FOR SELECT
  TO authenticated
  USING (true);

-- ============================================
-- Политики доступа для practices
-- ============================================

-- Публичное чтение практик для авторизованных пользователей
DROP POLICY IF EXISTS "Практики доступны всем для чтения" ON practices;
CREATE POLICY "Практики доступны всем для чтения"
  ON practices FOR SELECT
  TO authenticated
  USING (true);

-- ============================================
-- Политики доступа для profiles
-- ============================================

-- Пользователи видят только свой профиль
DROP POLICY IF EXISTS "Пользователи видят только свой профиль" ON profiles;
CREATE POLICY "Пользователи видят только свой профиль"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Пользователи могут создавать свой профиль
DROP POLICY IF EXISTS "Пользователи могут создавать свой профиль" ON profiles;
CREATE POLICY "Пользователи могут создавать свой профиль"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- ============================================
-- Политики доступа для journal_entries
-- ============================================

-- Пользователи видят только свои записи
DROP POLICY IF EXISTS "Пользователи видят только свои записи" ON journal_entries;
CREATE POLICY "Пользователи видят только свои записи"
  ON journal_entries FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Пользователи могут создавать свои записи
DROP POLICY IF EXISTS "Пользователи могут создавать свои записи" ON journal_entries;
CREATE POLICY "Пользователи могут создавать свои записи"
  ON journal_entries FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Пользователи могут обновлять свои записи
DROP POLICY IF EXISTS "Пользователи могут обновлять свои записи" ON journal_entries;
CREATE POLICY "Пользователи могут обновлять свои записи"
  ON journal_entries FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Пользователи могут удалять свои записи
DROP POLICY IF EXISTS "Пользователи могут удалять свои записи" ON journal_entries;
CREATE POLICY "Пользователи могут удалять свои записи"
  ON journal_entries FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- ============================================
-- Готово! ✅
-- ============================================
