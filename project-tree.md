# Структура проекта

Этот документ описывает ТЕКУЩУЮ файловую структуру проекта и ПЛАНИРУЕМУЮ архитектуру.
Он может и должен обновляться по мере развития проекта.
---

## Связь модулей и структуры

| Модуль | Спецификация | Экран (План) | Сервис (План) | Компоненты (План) | Хук (План) |
|--------|--------------|--------------|---------------|-------------------|------------|
| **Catalog** | [specs/catalog.md](specs/catalog.md) | `app/(tabs)/catalog.tsx` | `catalogService.ts` | `src/components/catalog/` | `useCatalog.ts` |
| **Meditation** | [specs/meditation.md](specs/meditation.md) | `app/(tabs)/meditation.tsx` | `meditationService.ts` | `src/components/meditation/` | — |
| **Journal** | [specs/journal.md](specs/journal.md) | `app/(tabs)/journal.tsx` | `journalService.ts` | `src/components/journal/` | `useJournal.ts` |
| **Auth** | [specs/auth.md](specs/auth.md) | — | `authService.ts` | — | `useAuth.ts` |

---

## Текущая структура (Документация и ресурсы)

```
SelfCareMeditation/
│
├── specs/                        # Спецификации модулей (Markdown)
│   ├── auth.md                   # Модуль: Аутентификация
│   ├── catalog.md                # Модуль: Каталог практик
│   ├── journal.md                # Модуль: Дневник самочувствия
│   └── meditation.md             # Модуль: Медитация
│
├── reference design/             # Дизайн-референсы и ассеты
│   └── stitch_meditation_catalog/
│
├── specification.md              # Верхнеуровневая спецификация проекта
├── architecture.md               # Архитектурная спецификация
├── project-tree.md               # Этот документ
├── implementation_plan.md        # Текущий план реализации проекта
└── ... (конфигурационные файлы)
```

## Целевая структура приложения (React Native + Expo)

```
SelfCareMeditation/
│
├── app/                          # Expo Router — экраны и навигация
│   ├── (tabs)/                   # Tab-навигация (3 вкладки)
│   │   ├── _layout.tsx           # Конфигурация таб-бара
│   │   ├── catalog.tsx           # Экран: Каталог
│   │   ├── meditation.tsx        # Экран: Медитация
│   │   └── journal.tsx           # Экран: Дневник
│   ├── _layout.tsx               # Корневой layout приложения
│   └── index.tsx                 # Точка входа / редирект
│
├── src/
│   ├── components/               # UI-компоненты
│   │   ├── common/               # Переиспользуемые элементы
│   │   ├── catalog/
│   │   ├── meditation/
│   │   └── journal/
│   │
│   ├── services/                 # Сервисный слой (логика, API)
│   │   ├── supabase.ts           # Клиент базы данных
│   │   ├── authService.ts
│   │   ├── catalogService.ts
│   │   ├── meditationService.ts
│   │   └── journalService.ts
│   │
│   ├── store/                    # Управление состоянием (Store)
│   ├── hooks/                    # Кастомные хуки
│   ├── types/                    # TypeScript определения типов
│   ├── constants/                # Константы (цвета, строки)
│   └── utils/                    # Вспомогательные функции
│
├── assets/                       # Статические ресурсы (картинки, аудио)
```
