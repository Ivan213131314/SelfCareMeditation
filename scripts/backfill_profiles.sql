-- Этот скрипт найдет всех пользователей, у которых нет профиля, и создаст их.
-- Это починит проблему для вашего ТЕКУЩЕГО аккаунта без необходимости регистрировать новый.

INSERT INTO public.profiles (id, email)
SELECT id, email
FROM auth.users
WHERE id NOT IN (SELECT id FROM public.profiles);
