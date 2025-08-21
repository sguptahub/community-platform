'use client'

import Link from 'next/link'
import { Users, Calendar, MessageCircle, Star } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6 animate-fade-in">
            Welcome to Our Community
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto animate-slide-up">
            Connect, collaborate, and grow with like-minded individuals in our vibrant community platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Link href="/auth/signup" className="btn-primary text-lg px-8 py-3">
              Join Community
            </Link>
            <Link href="/about" className="btn-secondary text-lg px-8 py-3">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Why Join Our Community?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <Users className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Connect</h3>
              <p className="text-gray-600">Build meaningful relationships with community members</p>
            </div>
            <div className="text-center p-6">
              <Calendar className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Events</h3>
              <p className="text-gray-600">Participate in exciting community events and activities</p>
            </div>
            <div className="text-center p-6">
              <MessageCircle className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Discuss</h3>
              <p className="text-gray-600">Engage in meaningful discussions and share ideas</p>
            </div>
            <div className="text-center p-6">
              <Star className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Grow</h3>
              <p className="text-gray-600">Learn and develop new skills together</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-gray-600 max-w-2xl mx-auto">
            Join thousands of members who are already part of our growing community.
          </p>
          <Link href="/auth/signup" className="btn-primary text-lg px-8 py-3">
            Join Now
          </Link>
        </div>
      </section>
    </div>
  )
}
