# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Development Server
```bash
npm run dev          # Start development server with hot reload and logging
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Database Operations
```bash
npm run db:push      # Push schema changes to database
npm run db:generate  # Generate Prisma client
npm run db:migrate   # Run database migrations
npm run db:reset     # Reset database and migrations
```

## Architecture Overview

This is a **Next.js 15** application with **App Router** using a **custom server** setup that integrates **Socket.IO** for real-time functionality.

### Core Architecture

- **Framework**: Next.js 15 with App Router and TypeScript 5
- **Server**: Custom HTTP server (`server.ts`) that handles both Next.js requests and Socket.IO connections
- **Database**: SQLite with Prisma ORM for type-safe database operations
- **Styling**: Tailwind CSS 4 with shadcn/ui component library
- **State Management**: Zustand for global state, TanStack Query for server state
- **Real-time**: Socket.IO integration with echo server functionality

### Project Structure

```
src/
├── app/                    # Next.js App Router pages and API routes
│   ├── admin/             # Admin panel pages
│   ├── budget-planner/    # Travel budget planning functionality
│   ├── blog/              # Blog functionality
│   └── api/               # API routes
├── components/
│   └── ui/                # shadcn/ui components
├── hooks/                 # Custom React hooks
└── lib/
    ├── socket.ts          # Socket.IO setup and event handlers
    ├── db.ts              # Prisma client configuration
    └── utils.ts           # Utility functions
```

### Database Schema

The application uses a **travel planning and blog** data model with the following key entities:

- **User**: Authentication and user profiles
- **Post**: Blog posts with categories, tags, and location data
- **TravelPlan**: Travel itineraries with budget tracking
- **Expense**: Travel expense management with categories
- **Day/Activity**: Detailed travel itinerary structure

### Key Features

1. **Custom Server Setup**: Uses `server.ts` for Next.js + Socket.IO integration
2. **Travel Budget Planner**: Complete travel planning system with expense tracking
3. **Blog System**: Full-featured blog with categories, tags, and location support
4. **Real-time Communication**: WebSocket echo server via Socket.IO
5. **Admin Panel**: Administrative interface for content management

### Database Configuration

- **Provider**: SQLite (development)
- **ORM**: Prisma with client generated from `prisma/schema.prisma`
- **Connection**: Managed via `src/lib/db.ts` with development caching

### Socket.IO Integration

- **Path**: `/api/socketio`
- **Functionality**: Echo server that broadcasts messages back to sender
- **Setup**: Configured in `src/lib/socket.ts` and initialized in `server.ts`

### Development Notes

- The custom server logs output to `dev.log` (development) and `server.log` (production)
- Socket.IO runs alongside Next.js on the same port (3000)
- Database URL should be configured via `DATABASE_URL` environment variable
- Prisma client is globally cached in development for performance