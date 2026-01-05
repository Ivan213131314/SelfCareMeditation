# Структура проекта

Этот документ описывает ТЕКУЩУЮ файловую структуру проекта.
Он обновляется по мере развития проекта.

---

## Связь модулей и структуры

| Модуль | Спецификация | Экран | Сервис | Компоненты | Хук |
|--------|--------------|-------|--------|------------|-----|
| **Catalog** | [specs/catalog.md](specs/catalog.md) | `src/app/(tabs)/catalog.tsx` | `catalogService.ts` | `src/components/catalog/` | `useCatalog.ts` |
| **Meditation** | [specs/meditation.md](specs/meditation.md) | `src/app/(tabs)/meditation.tsx` | `meditationService.ts` | `src/components/meditation/` | — |
| **Journal** | [specs/journal.md](specs/journal.md) | `src/app/(tabs)/journal.tsx` | `journalService.ts` | `src/components/journal/` | `useJournal.ts` |
| **Auth** | [specs/auth.md](specs/auth.md) | — | `authService.ts` | — | `useAuth.ts` |

---

## Текущая структура проекта

```
SelfCareMeditation/
│
├── .agent/                           # Конфигурация агента
│
├── assets/                           # Статические ресурсы (корневой уровень)
│   ├── default-practice/             # Практики по умолчанию
│   └── generated_practices/          # Сгенерированные практики
│
├── docs/                             # Документация
│   └── SUPABASE_SETUP.md             # Инструкция по настройке Supabase
│
├── reference design/                 # Дизайн-референсы
│   └── stitch_meditation_catalog/
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
│   │   └── _layout.tsx               # Корневой layout приложения
│   │
│   ├── assets/                       # Ресурсы внутри src (пустая)
│   │
│   ├── components/                   # UI-компоненты
│   │   ├── common/                   # Переиспользуемые элементы
│   │   │   ├── AuthGuard.tsx         # Защита маршрутов авторизации
│   │   │   ├── Button.tsx            # Кнопка
│   │   │   ├── Card.tsx              # Карточка
│   │   │   ├── EmptyState.tsx        # Пустое состояние
│   │   │   ├── ErrorState.tsx        # Состояние ошибки
│   │   │   ├── Input.tsx             # Поле ввода
│   │   │   └── Loading.tsx           # Индикатор загрузки
│   │   ├── catalog/                  # Компоненты каталога (пустая)
│   │   ├── meditation/               # Компоненты медитации (пустая)
│   │   └── journal/                  # Компоненты дневника (пустая)
│   │
│   ├── constants/                    # Константы приложения
│   │   ├── colors.ts                 # Цветовая палитра
│   │   └── defaultPractice.ts        # Дефолтная практика
│   │
│   ├── hooks/                        # Кастомные хуки
│   │   └── useAuth.ts                # Хук авторизации
│   │
│   ├── services/                     # Сервисный слой
│   │   ├── authService.ts            # Сервис авторизации
│   │   └── supabase.ts               # Клиент Supabase
│   │
│   ├── store/                        # Управление состоянием (Redux)
│   │   ├── index.ts                  # Конфигурация store
│   │   └── slices/                   # Redux slices
│   │       ├── sessionSlice.ts       # Slice для сессии медитации
│   │       └── userSlice.ts          # Slice для пользователя
│   │
│   ├── types/                        # TypeScript типы (пустая)
│   │
│   └── utils/                        # Утилиты (пустая)
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
