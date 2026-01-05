# Структура проекта

Этот документ описывает ТЕКУЩУЮ файловую структуру проекта.
Он обновляется по мере развития проекта.

---

## Связь модулей и структуры

| Модуль | Спецификация | Экран | Сервис | Компоненты | Хук |
|--------|--------------|-------|--------|------------|-----|
| **Catalog** | [specs/catalog.md](specs/catalog.md) | `src/app/(tabs)/catalog.tsx` | `src/services/catalogService.ts` | `src/components/catalog/` | `src/hooks/useCatalog.ts` |
| **Meditation** | [specs/meditation.md](specs/meditation.md) | `src/app/(tabs)/meditation.tsx` | `src/services/meditationService.ts` | `src/components/meditation/` | — |
| **Journal** | [specs/journal.md](specs/journal.md) | `src/app/(tabs)/journal.tsx` | `src/services/journalService.ts` | `src/components/journal/` | `src/hooks/useJournal.ts` |
| **Auth** | [specs/auth.md](specs/auth.md) | `src/app/auth/` | `src/services/authService.ts` | `src/components/auth/` | `src/hooks/useAuth.ts` |

---

## Текущая структура проекта

```
SelfCareMeditation/
│
├── .agent/                           # Конфигурация агента
│   ├── rules/                        # Правила для агента
│   │   └── main-project-rule.md
│   └── workflows/                    # Рабочие процессы
│       └── update-tree.md
│
├── app/                              # Дубликат/Временная папка (в корне)
│   └── (tabs)/
│       └── catalog.tsx
│
├── assets/                           # Статические ресурсы (корневой уровень)
│   ├── default-practice/             # Практики по умолчанию
│   │   └── default.mp3
│   └── generated_practices/          # Сгенерированные обложки практик
│       ├── antistress.png
│       ├── energy.png
│       ├── mindfulness.png
│       ├── relaxation.png
│       └── sleep.png
│
├── docs/                             # Документация
│   └── SUPABASE_SETUP.md             # Инструкция по настройке Supabase
│
├── reference design/                 # Дизайн-референсы
│   └── stitch_meditation_catalog/    # Скриншоты и макеты
│
├── scripts/                          # Скрипты для разработки
│   ├── create_tables.sql             # SQL-скрипт создания таблиц
│   └── seed.ts                       # TypeScript-скрипт для сидинга БД
│
├── specs/                            # Спецификации модулей
│   ├── auth.md                       # Модуль: Аутентификация
│   ├── catalog.md                    # Модуль: Каталог практик
│   ├── journal.md                    # Модуль: Дневник самочувствия
│   └── meditation.md                 # Модуль: Медитация
│
├── src/                              # Исходный код приложения
│   │
│   ├── app/                          # Expo Router — экраны и навигация
│   │   ├── (tabs)/                   # Tab-навигация (3 вкладки)
│   │   │   ├── _layout.tsx           # Конфигурация таб-бара
│   │   │   ├── catalog.tsx           # Экран: Каталог
│   │   │   ├── meditation.tsx        # Экран: Медитация
│   │   │   └── journal.tsx           # Экран: Дневник
│   │   ├── auth/                     # Экраны авторизации
│   │   │   ├── _layout.tsx           # Layout для auth-экранов
│   │   │   ├── login.tsx             # Экран: Вход
│   │   │   └── register.tsx          # Экран: Регистрация
│   │   ├── index.tsx                 # Точка входа (редирект)
│   │   └── _layout.tsx               # Корневой layout приложения
│   │
│   ├── assets/                       # Ресурсы внутри src
│   │
│   ├── components/                   # UI-компоненты
│   │   ├── auth/                     # Компоненты авторизации
│   │   ├── catalog/                  # Компоненты каталога
│   │   │   ├── CategoryFilter.tsx
│   │   │   ├── PracticeCard.tsx
│   │   │   └── PracticeList.tsx
│   │   ├── common/                   # Переиспользуемые элементы
│   │   │   ├── AuthGuard.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   ├── ErrorState.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Loading.tsx
│   │   ├── journal/                  # Компоненты дневника
│   │   └── meditation/               # Компоненты медитации
│   │
│   ├── constants/                    # Константы приложения
│   │   ├── colors.ts                 # Цветовая палитра
│   │   └── defaultPractice.ts        # Дефолтная практика
│   │
│   ├── hooks/                        # Кастомные хуки
│   │   ├── useAuth.ts                # Хук авторизации
│   │   └── useCatalog.ts             # Хук каталога
│   │
│   ├── services/                     # Сервисный слой
│   │   ├── authService.ts            # Сервис авторизации
│   │   ├── catalogService.ts         # Сервис каталога
│   │   └── supabase.ts               # Клиент Supabase
│   │
│   ├── store/                        # Управление состоянием (Redux)
│   │   ├── index.ts                  # Конфигурация store
│   │   └── slices/                   # Redux slices
│   │       ├── sessionSlice.ts       # Slice для сессии медитации
│   │       └── userSlice.ts          # Slice для пользователя
│   │
│   ├── types/                        # TypeScript типы
│   │   └── models.ts                 # Модели данных
│   │
│   └── utils/                        # Утилиты
│
├── unit-test/                        # Юнит-тесты
│   ├── authService.test.ts
│   ├── LoginScreen.test.tsx
│   └── RegisterScreen.test.tsx
│
├── .env                              # Переменные окружения
├── .env.example                      # Пример переменных окружения
├── .gitignore                        # Git ignore
├── app.json                          # Конфигурация Expo
├── package.json                      # Зависимости Node.js
├── tsconfig.json                     # Конфигурация TypeScript
├── specification.md                  # Спецификация проекта
├── architecture.md                   # Архитектурная спецификация
├── implementation_plan.md            # План реализации
└── project-tree.md                   # Этот документ
```
