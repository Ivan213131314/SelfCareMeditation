# Настройка Supabase для SelfCareMeditation

## 📋 Настройка проекта

### 1. Получение API ключей

1. Откройте [Supabase Dashboard](https://supabase.com/dashboard)
2. Выберите проект **SelfCareMeditation** (`ocjqlyajyrrlbsrynspd`)
3. Перейдите в **Project Settings** → **API**
4. Скопируйте **URL** и **anon public** ключ

### 2. Настройка переменных окружения

1. Скопируйте `.env.example` в `.env`:
   ```bash
   cp .env.example .env
   ```

2. Откройте `.env` и замените `your_anon_key_here` на ваш реальный **anon public** ключ

### 3. Создание таблиц в Supabase

Выполните следующие SQL команды в Supabase SQL Editor:

```sql
-- Таблица категорий практик
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Таблица практик
CREATE TABLE practices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  duration INTEGER NOT NULL, -- длительность в секундах
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  image_url TEXT,
  audio_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Таблица профилей пользователей
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Таблица записей дневника
CREATE TABLE journal_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  emoji TEXT NOT NULL,
  shortcuts TEXT[] DEFAULT '{}',
  text TEXT,
  practice_id UUID REFERENCES practices(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Включение Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE practices ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;

-- Политики доступа для categories (публичное чтение)
CREATE POLICY "Категории доступны всем для чтения"
  ON categories FOR SELECT
  TO authenticated
  USING (true);

-- Политики доступа для practices (публичное чтение)
CREATE POLICY "Практики доступны всем для чтения"
  ON practices FOR SELECT
  TO authenticated
  USING (true);

-- Политики для profiles
CREATE POLICY "Пользователи видят только свой профиль"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Пользователи могут создавать свой профиль"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Политики для journal_entries
CREATE POLICY "Пользователи видят только свои записи"
  ON journal_entries FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Пользователи могут создавать свои записи"
  ON journal_entries FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Пользователи могут обновлять свои записи"
  ON journal_entries FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Пользователи могут удалять свои записи"
  ON journal_entries FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
```

### 4. Создание Storage buckets

1. В Supabase Dashboard перейдите в **Storage**
2. Создайте два bucket'а:
   - `practice-images` (публичный)
   - `practice-audio` (публичный)

### 5. Заполнение базы данных тестовыми данными

После создания таблиц, запустите скрипт заполнения:

```bash
# Установите ts-node если еще не установлен
npm install -g ts-node

# Установите dotenv
npm install dotenv

# Запустите скрипт
ts-node scripts/seed.ts
```

## 🔐 Безопасность

- ⚠️ **НЕ коммитьте файл `.env`** - он уже добавлен в `.gitignore`
- ✅ Используйте только `.env.example` для шаблона
- ✅ Row Level Security (RLS) настроен для защиты пользовательских данных

## 📚 Дополнительная информация

- **Supabase URL**: https://ocjqlyajyrrlbsrynspd.supabase.co
- **Project ID**: ocjqlyajyrrlbsrynspd
- **Документация Supabase**: https://supabase.com/docs
