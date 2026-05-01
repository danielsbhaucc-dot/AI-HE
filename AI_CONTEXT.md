# 🤖 AI Context - Weight Loss Course System

## System Overview
Mobile-first, AI-ready course system for weight loss with RTL support, built with Next.js 15 + Supabase + Tailwind CSS.

## 📁 Project Structure

```
AI HE/
├── apps/
│   ├── web/                    # Main Next.js application
│   │   ├── app/
│   │   │   ├── (auth)/        # Auth routes (login, register)
│   │   │   ├── (dashboard)/   # Protected user routes
│   │   │   ├── api/           # API routes for future mobile app
│   │   │   ├── layout.tsx     # Root layout with RTL
│   │   │   ├── page.tsx       # Landing page
│   │   │   └── globals.css    # Global styles
│   │   ├── components/
│   │   │   ├── shared/        # Shared components
│   │   │   │   ├── MobileHeader.tsx
│   │   │   │   ├── BottomNav.tsx
│   │   │   │   └── CourseCard.tsx
│   │   │   └── course/        # Course-specific components
│   │   ├── lib/
│   │   │   ├── cn.ts          # Tailwind class merger
│   │   │   ├── types/         # TypeScript types
│   │   │   │   └── database.ts
│   │   │   └── supabase/      # Supabase clients
│   │   │       ├── client.ts  # Browser client
│   │   │       ├── server.ts  # Server client
│   │   │       └── admin.ts   # Admin client
│   │   ├── middleware.ts      # Auth middleware
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── tailwind.config.ts
│   │   └── next.config.js
│   └── admin/                 # Admin panel (future)
├── packages/                  # Shared packages
│   ├── shared/               # Shared utilities
│   └── ui/                   # Shared UI components
├── supabase/
│   └── migrations/
│       └── 000001_initial_schema.sql
├── package.json              # Root workspace config
├── turbo.json               # Turborepo config
├── .env.local               # Environment variables
└── AI_CONTEXT.md           # This file
```

## 🗄️ Database Schema

### Core Tables
1. **profiles** - User profiles (extends Supabase Auth)
   - id, full_name, avatar_url, phone, birth_date, role

2. **courses** - Course information
   - id, title, description, thumbnail_url, is_published, is_premium

3. **lessons** - Lesson content
   - id, course_id, title, description, lesson_type, text_content, tasks, habits

4. **media_files** - Media storage (Uploadthing + Video URLs)
   - id, lesson_id, file_type, uploadthing_key/url/name/size, video_provider/external_id

5. **enrollments** - User course enrollments
   - id, user_id, course_id, enrolled_at, completed_at

6. **lesson_progress** - User progress tracking
   - id, user_id, lesson_id, is_completed, task_progress, habit_progress

### Key Features
- RLS policies for security
- Indexes for performance
- Triggers for updated_at
- Auto-profile creation on signup

## 🔐 Security

### RLS Policies Summary
- **Profiles**: Users see only own profile, admins see all
- **Courses**: Published courses public, only admin can modify
- **Lessons**: Enrolled users + admin only
- **Media**: Enrolled users + admin only
- **Enrollments**: Users see own, admin sees all
- **Progress**: Users manage own progress only

### Middleware Protection
- Route-level auth checks
- Role-based access control
- Automatic redirects for unauthenticated users

## 🎨 Design System

### Colors (Tailwind)
```
primary: pink-purple gradient (500: #d946ef)
secondary: warm orange (500: #f97316)
success: green for achievements
background: light gray (#fafafa)
text: dark gray with secondary/muted variants
```

### Key Components
- `card-premium` - White rounded cards with shadows
- `btn-primary` - Gradient buttons with hover effects
- `input-premium` - Styled form inputs
- `container-mobile` - Mobile-first responsive container

### Mobile First Features
- Bottom navigation (BottomNav)
- Fixed mobile header (MobileHeader)
- Safe area insets support
- Touch-optimized buttons
- Scrollbar hiding

## 🔌 API Structure

### Web Routes (User)
- `/` - Landing page
- `/login` - Login page
- `/register` - Registration page
- `/courses` - My courses list
- `/courses/[id]` - Course detail
- `/lessons/[id]` - Lesson detail
- `/progress` - Progress tracking

### API Routes (For Future Mobile App)
- `/api/v1/auth/*` - Authentication
- `/api/v1/courses/*` - Course data
- `/api/v1/lessons/*` - Lesson data
- `/api/v1/progress/*` - Progress updates

## 📤 Media Strategy

| Type | Storage | Notes |
|------|---------|-------|
| Text & Links | Supabase DB | Fast queries |
| Audio | Uploadthing | CDN delivery |
| PDF | Uploadthing | Viewer support |
| Presentations | Uploadthing | PDF conversion |
| Video | URL in DB | Modular providers (Bunny/HeyGen/YouTube) |

## 🚀 Next Steps

### To Complete Setup
1. Install dependencies: `npm install` (in apps/web)
2. Set up Supabase project
3. Run SQL migrations
4. Configure environment variables
5. Set up Uploadthing account
6. Run dev server: `npm run dev`

### Future Enhancements
- Admin panel (apps/admin)
- Video player integration (modular)
- AI recommendation engine
- Mobile app (React Native/Flutter)
- Real-time features (WebSockets)

## 📝 Naming Conventions

### Files
- Components: PascalCase (CourseCard.tsx)
- Utils: camelCase (cn.ts)
- Pages: page.tsx (Next.js convention)
- Layouts: layout.tsx

### Database
- Tables: lowercase, plural (courses, lessons)
- Columns: lowercase, snake_case (created_at, is_published)
- Primary keys: id (UUID)
- Foreign keys: table_id (course_id, lesson_id)

### TypeScript
- Interfaces: PascalCase (CourseProps)
- Types: PascalCase (VideoProvider)
- Enums: PascalCase (LessonType)

## 🤖 For AI Assistants

When extending this codebase:
1. Always use the cn() utility for Tailwind classes
2. Follow mobile-first responsive design
3. Maintain RTL support (dir="rtl")
4. Use Server Components by default, Client Components when needed
5. Follow RLS policies for security
6. Use TypeScript strict types
7. Add animations with Framer Motion
8. Use Lucide icons
9. Follow the established color scheme

## 🔗 Key Files Reference

| Purpose | File |
|---------|------|
| Database Types | `apps/web/lib/types/database.ts` |
| Supabase Client | `apps/web/lib/supabase/client.ts` |
| Supabase Server | `apps/web/lib/supabase/server.ts` |
| Tailwind Config | `apps/web/tailwind.config.ts` |
| Global Styles | `apps/web/app/globals.css` |
| Auth Middleware | `apps/web/middleware.ts` |
| DB Schema | `supabase/migrations/000001_initial_schema.sql` |

---

**Built with ❤️ for AI-powered weight loss journey**
