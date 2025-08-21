# Community Platform

A modern community platform built with Next.js 14, TypeScript, Tailwind CSS, and Supabase.

## Features

- 🚀 **Next.js 14** - Latest React framework with App Router
- 🔒 **Authentication** - User sign up, sign in, and profile management
- 🎨 **Tailwind CSS** - Utility-first CSS framework with custom design system
- 🗄️ **Supabase** - Backend-as-a-Service with real-time database
- 📱 **Responsive Design** - Mobile-first approach with modern UI/UX
- 🔧 **TypeScript** - Type-safe development experience
- ⚡ **Performance** - Optimized for speed and SEO

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd community-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

4. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Go to Settings > API to get your project URL and anon key
   - Create the following tables in your database:

   **Profiles table:**
   ```sql
   CREATE TABLE profiles (
     id UUID REFERENCES auth.users(id) PRIMARY KEY,
     email TEXT NOT NULL,
     full_name TEXT NOT NULL,
     avatar_url TEXT,
     bio TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

   **Posts table:**
   ```sql
   CREATE TABLE posts (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     title TEXT NOT NULL,
     content TEXT NOT NULL,
     author_id UUID REFERENCES profiles(id) NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── auth/              # Authentication pages
│   │   ├── signin/        # Sign in page
│   │   └── signup/        # Sign up page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/             # Reusable components
│   └── Navigation.tsx     # Navigation component
├── contexts/               # React contexts
│   └── AuthContext.tsx    # Authentication context
└── lib/                    # Utility libraries
    └── supabase.ts        # Supabase client
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Customization

### Colors
The color scheme can be customized in `tailwind.config.ts`. The primary colors are defined in the `extend.colors` section.

### Components
All components use Tailwind CSS classes and can be easily customized by modifying the CSS classes or extending the component styles.

### Database Schema
The database schema is defined in `src/lib/supabase.ts`. You can modify the types and add new tables as needed.

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms
The app can be deployed to any platform that supports Node.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

If you have any questions or need help, please open an issue on GitHub or contact the maintainers.

