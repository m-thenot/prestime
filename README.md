# Prestime

A modern service booking platform built with Next.js, enabling users to discover, book, and manage professional services.

## Features

- 🔐 **Authentication** - Secure user authentication with Supabase
- 📅 **Service Booking** - Browse and book professional services
- 💳 **Payment Processing** - Integrated Stripe payments
- 📱 **Responsive Design** - Mobile-first design with Tailwind CSS
- 🗺️ **Location Services** - Google Maps integration for service areas
- 📧 **Notifications** - Real-time notifications via Novu
- 📝 **Content Management** - Dynamic content powered by Contentful
- 👤 **User Accounts** - Complete account management and profile settings
- 📊 **Analytics** - User behavior tracking with Hotjar and Google Analytics


## Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Authentication:** [Supabase Auth](https://supabase.com/auth)
- **Database:** [Supabase](https://supabase.com/)
- **CMS:** [Contentful](https://www.contentful.com/)
- **Payments:** [Stripe](https://stripe.com/)
- **Maps:** [Google Maps API](https://developers.google.com/maps)
- **Notifications:** [Novu](https://novu.co/)
- **State Management:** [React Query](https://tanstack.com/query/latest)
- **Forms:** [React Hook Form](https://react-hook-form.com/)
- **Analytics:** [Hotjar](https://www.hotjar.com/), [Google Analytics](https://analytics.google.com/)


## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.17.1 or higher (managed via [Volta](https://volta.sh/))
- **npm** 9.x or higher
- **Git**


## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd prestime
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.dist .env
```
## Getting Started

1. Start the development server:

```bash
npm run dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser

3. The application will automatically reload when you make changes to the code


## Project Structure

```
prestime/
├── app/                    # Next.js 14 App Router
│   ├── (booking)/         # Booking flow routes
│   └── (default)/         # Main application routes
├── src/
│   ├── components/        # Reusable React components
│   ├── constants/         # Application constants
│   ├── contexts/          # React Context providers
│   ├── features/          # Feature-specific modules
│   ├── hooks/             # Custom React hooks
│   ├── icons/             # SVG icons and icon components
│   ├── queries/           # React Query hooks
│   ├── services/          # API service layer
│   ├── styles/            # Global styles
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Utility functions
├── public/                # Static assets
├── supabase/              # Supabase configuration
├── admin/                 # Admin panel
└── middleware.ts          # Next.js middleware

```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Create a production build
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code linting
- `npm run contentful-typescript-codegen` - Generate TypeScript types from Contentful schema


## API Integration

The application integrates with multiple services:

- **Supabase**: Authentication, database, and storage
- **Contentful**: Headless CMS for managing dynamic content
- **Stripe**: Payment processing and subscription management
- **Google Maps**: Location services and geocoding
- **Novu**: Multi-channel notification delivery

