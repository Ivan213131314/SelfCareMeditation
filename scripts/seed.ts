/**
 * Скрипт для первоначального заполнения базы данных Supabase
 * Запуск: ts-node scripts/seed.ts
 * 
 * Заполняет:
 * - categories (категории практик)
 * - practices (медитативные практики)
 */

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Ошибка: SUPABASE_URL и SUPABASE_ANON_KEY должны быть установлены в .env файле');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Категории практик
const categories = [
    { name: 'Релаксация', icon: '🧘‍♀️' },
    { name: 'Сон', icon: '😴' },
    { name: 'Осознанность', icon: '🌟' },
    { name: 'Антистресс', icon: '🌿' },
];

// Практики (пока без реальных audio/image URL - они будут добавлены позже)
const practices = [
    {
        title: 'Дыхание спокойствия',
        description: 'Простая практика осознанного дыхания для снятия стресса',
        duration: 300, // 5 минут в секундах
        category_name: 'Релаксация',
        image_url: null,
        audio_url: null,
    },
    {
        title: 'Вечерняя медитация',
        description: 'Практика для подготовки ко сну и расслабления',
        duration: 600, // 10 минут
        category_name: 'Сон',
        image_url: null,
        audio_url: null,
    },
    {
        title: 'Сканирование тела',
        description: 'Медитация осознанности с фокусом на ощущениях тела',
        duration: 900, // 15 минут
        category_name: 'Осознанность',
        image_url: null,
        audio_url: null,
    },
    {
        title: 'Быстрое восстановление',
        description: 'Короткая практика для снятия напряжения в течение дня',
        duration: 180, // 3 минуты
        category_name: 'Антистресс',
        image_url: null,
        audio_url: null,
    },
    {
        title: 'Утренняя энергия',
        description: 'Практика для бодрого начала дня',
        duration: 420, // 7 минут
        category_name: 'Релаксация',
        image_url: null,
        audio_url: null,
    },
];

async function seed() {
    console.log('🌱 Начинаем заполнение базы данных...');

    try {
        // 1. Заполнение категорий
        console.log('\n📁 Добавление категорий...');
        const { data: insertedCategories, error: categoriesError } = await supabase
            .from('categories')
            .insert(categories)
            .select();

        if (categoriesError) {
            throw new Error(`Ошибка добавления категорий: ${categoriesError.message}`);
        }

        console.log(`✅ Добавлено категорий: ${insertedCategories?.length || 0}`);

        // Создаём мапу категорий для связи с практиками
        const categoryMap = new Map(
            insertedCategories?.map((cat) => [cat.name, cat.id]) || []
        );

        // 2. Заполнение практик
        console.log('\n🧘 Добавление практик...');
        const practicesWithCategoryId = practices.map((practice) => ({
            title: practice.title,
            description: practice.description,
            duration: practice.duration,
            category_id: categoryMap.get(practice.category_name),
            image_url: practice.image_url,
            audio_url: practice.audio_url,
        }));

        const { data: insertedPractices, error: practicesError } = await supabase
            .from('practices')
            .insert(practicesWithCategoryId)
            .select();

        if (practicesError) {
            throw new Error(`Ошибка добавления практик: ${practicesError.message}`);
        }

        console.log(`✅ Добавлено практик: ${insertedPractices?.length || 0}`);

        console.log('\n🎉 Заполнение базы данных завершено успешно!');
        console.log('\n📊 Статистика:');
        console.log(`   Категорий: ${insertedCategories?.length || 0}`);
        console.log(`   Практик: ${insertedPractices?.length || 0}`);
    } catch (error) {
        console.error('\n❌ Ошибка при заполнении базы данных:');
        console.error(error);
        process.exit(1);
    }
}

// Запуск скрипта
seed();
