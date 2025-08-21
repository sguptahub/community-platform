'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, User, LogOut } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary-600">
          Community
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/about" className="text-gray-600 hover:text-primary-600 transition-colors">
            About
          </Link>
          <Link href="/events" className="text-gray-600 hover:text-primary-600 transition-colors">
            Events
          </Link>
          <Link href="/discussions" className="text-gray-600 hover:text-primary-600 transition-colors">
            Discussions
          </Link>
          {/* Only show Members link for authenticated users */}
          {user && (
            <Link href="/members" className="text-gray-600 hover:text-primary-600 transition-colors">
              Members
            </Link>
          )}
          {/* Only show Admin link for admin users */}
          {user && (
            <Link href="/admin" className="text-gray-600 hover:text-primary-600 transition-colors">
              Admin
            </Link>
          )}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <Link href="/profile" className="flex items-center space-x-2 text-gray-600 hover:text-primary-600">
                <User className="w-5 h-5" />
                <span>Profile</span>
              </Link>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 text-gray-600 hover:text-red-600"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <>
              <Link href="/auth/signin" className="text-gray-600 hover:text-primary-600 transition-colors">
                Sign In
              </Link>
              <Link href="/auth/signup" className="btn-primary">
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-md text-gray-600 hover:text-primary-600 hover:bg-gray-100"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden py-4 border-t border-gray-200">
          <div className="flex flex-col space-y-4">
            <Link href="/about" className="text-gray-600 hover:text-primary-600 transition-colors">
              About
            </Link>
            <Link href="/events" className="text-gray-600 hover:text-primary-600 transition-colors">
              Events
            </Link>
            <Link href="/discussions" className="text-gray-600 hover:text-primary-600 transition-colors">
              Discussions
            </Link>
            {/* Only show Members link for authenticated users on mobile */}
            {user && (
              <Link href="/members" className="text-gray-600 hover:text-primary-600 transition-colors">
                Members
              </Link>
            )}
            {/* Only show Admin link for admin users on mobile */}
            {user && (
              <Link href="/admin" className="text-gray-600 hover:text-primary-600 transition-colors">
                Admin
              </Link>
            )}
            {user ? (
              <>
                <Link href="/profile" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Profile
                </Link>
                <button
                  onClick={handleSignOut}
                  className="text-left text-gray-600 hover:text-red-600 transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/signin" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Sign In
                </Link>
                <Link href="/auth/signup" className="btn-primary text-center">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
