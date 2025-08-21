# Community Platform Setup Guide

## 🚀 Quick Start

1. **Install dependencies** (already done)
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

3. **Set up Supabase database**
   - Create a new project at [supabase.com](https://supabase.com)
   - Go to Settings > API to get your project URL and anon key
   - Create the required tables (see SQL below)

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Setup

Run these SQL commands in your Supabase SQL editor:

```sql
-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create posts table
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id UUID REFERENCES profiles(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view all profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view all posts" ON posts FOR SELECT USING (true);
CREATE POLICY "Users can create posts" ON posts FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Users can update own posts" ON posts FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Users can delete own posts" ON posts FOR DELETE USING (auth.uid() = author_id);
```

## 🎯 Features Implemented

- ✅ **Authentication System** - Sign up, sign in, profile management
- ✅ **Responsive Design** - Mobile-first approach with Tailwind CSS
- ✅ **Navigation** - Header with mobile menu
- ✅ **Home Page** - Hero section and feature highlights
- ✅ **About Page** - Community information and guidelines
- ✅ **Profile Page** - User profile editing and management
- ✅ **Discussions Page** - Community posts and discussions
- ✅ **Events Page** - Community events and meetups
- ✅ **Members Page** - Community member directory
- ✅ **Supabase Integration** - Database and authentication backend

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🌐 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── auth/              # Authentication pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/             # Reusable components
├── contexts/               # React contexts
└── lib/                    # Utility libraries
```

## 🎨 Customization

- **Colors**: Edit `tailwind.config.ts` to change the color scheme
- **Components**: Modify CSS classes in components to adjust styling
- **Database**: Add new tables and update types in `src/lib/supabase.ts`

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms
- Netlify, Railway, DigitalOcean App Platform, AWS Amplify

## 📱 Responsive Design

The platform is fully responsive with:
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly interactions
- Optimized for all device sizes

## 🔒 Security Features

- Row Level Security (RLS) enabled on all tables
- User authentication required for protected routes
- Profile data isolation between users
- Secure API endpoints

## 🆘 Troubleshooting

### Build Errors
- Ensure all environment variables are set
- Check that Supabase project is properly configured
- Verify database tables exist and have correct structure

### Runtime Errors
- Check browser console for JavaScript errors
- Verify Supabase connection in Network tab
- Ensure user is authenticated for protected routes

### Styling Issues
- Check Tailwind CSS classes are correct
- Verify CSS imports in components
- Check for conflicting CSS rules

## 📚 Next Steps

1. **Add Real Data**: Connect to your actual Supabase project
2. **Customize Design**: Modify colors, fonts, and layout
3. **Add Features**: Implement comments, likes, notifications
4. **Deploy**: Choose your hosting platform and go live!
5. **Monitor**: Set up analytics and error tracking

## 🤝 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review the README.md file
3. Check Supabase documentation
4. Open an issue on GitHub

---

**Happy coding! 🎉**

