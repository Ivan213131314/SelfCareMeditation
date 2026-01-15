-- Этот скрипт создает триггер, который автоматически создает профиль
-- в таблице 'profiles' при регистрации нового пользователя в 'auth.users'.
-- Это решает проблему отсутствия профиля и ошибок Foreign Key.

-- 1. Создаем функцию-обработчик
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Создаем триггер
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
