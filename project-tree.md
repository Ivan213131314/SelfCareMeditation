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
├── assets/                           # Статические ресурсы (корневой уровень)
│   ├── adaptive-icon.png             # Адаптивная иконка приложения
│   ├── favicon.png                   # Favicon
│   ├── icon.png                      # Иконка приложения
│   ├── splash.png                    # Сплэш-скрин
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
│   │   ├── session/                  # Экраны сессии медитации
│   │   ├── index.tsx                 # Точка входа (редирект)
│   │   └── _layout.tsx               # Корневой layout приложения
│   │
│   ├── assets/                       # Ресурсы внутри src
│   │
│   ├── components/                   # UI-компоненты
│   │   ├── auth/                     # Компоненты авторизации
│   │   ├── catalog/                  # Компоненты каталога
│   │   │   ├── CategoryFilter.tsx    # Фильтр по категориям
│   │   │   ├── PracticeCard.tsx      # Карточка практики
│   │   │   └── PracticeList.tsx      # Список практик
│   │   ├── common/                   # Переиспользуемые элементы
│   │   │   ├── AuthGuard.tsx         # Защита авторизованных маршрутов
│   │   │   ├── Button.tsx            # Кнопка
│   │   │   ├── Card.tsx              # Карточка
│   │   │   ├── EmptyState.tsx        # Пустое состояние
│   │   │   ├── ErrorState.tsx        # Состояние ошибки
│   │   │   ├── Input.tsx             # Поле ввода
│   │   │   └── Loading.tsx           # Индикатор загрузки
│   │   ├── journal/                  # Компоненты дневника
│   │   └── meditation/               # Компоненты медитации
│   │       ├── PlayPauseButton.tsx   # Кнопка воспроизведения/паузы
│   │       ├── ProgressRing.tsx      # Кольцо прогресса
│   │       └── SessionTimer.tsx      # Таймер сессии
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
│   │   ├── meditationService.ts      # Сервис медитации
│   │   └── supabase.ts               # Клиент Supabase
│   │
│   ├── store/                        # Управление состоянием (Redux)
│   │   ├── index.ts                  # Конфигурация store
│   │   └── slices/                   # Redux slices
│   │       ├── catalogSlice.ts       # Slice для каталога
│   │       ├── sessionSlice.ts       # Slice для сессии медитации
│   │       └── userSlice.ts          # Slice для пользователя
│   │
│   ├── types/                        # TypeScript типы
│   │   └── models.ts                 # Модели данных
│   │
│   └── utils/                        # Утилиты
│
├── unit-test/                        # Юнит-тесты
│   ├── authService.test.ts           # Тесты сервиса авторизации
│   ├── LoginScreen.test.tsx          # Тесты экрана входа
│   ├── RegisterScreen.test.tsx       # Тесты экрана регистрации
│   └── catalog/                      # Тесты модуля каталога
│       ├── CategoryFilter.test.tsx   # Тесты фильтра категорий
│       ├── PracticeList.test.tsx     # Тесты списка практик
│       └── catalogSlice.test.ts      # Тесты slice каталога
│
├── .env                              # Переменные окружения
├── .env.example                      # Пример переменных окружения
├── .gitignore                        # Git ignore
├── app.json                          # Конфигурация Expo
├── babel.config.js                   # Конфигурация Babel
├── package.json                      # Зависимости Node.js
├── tsconfig.json                     # Конфигурация TypeScript
├── specification.md                  # Спецификация проекта
├── architecture.md                   # Архитектурная спецификация
├── implementation_plan.md            # План реализации
└── project-tree.md                   # Этот документ
```
