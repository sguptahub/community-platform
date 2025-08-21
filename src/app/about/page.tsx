import Link from 'next/link'
import { Heart, Users, Shield, Zap } from 'lucide-react'

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            About Our Community
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We&apos;re building a vibrant, inclusive community where people can connect, 
            share knowledge, and grow together.
          </p>
        </div>

        {/* Mission Section */}
        <div className="card mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            Our mission is to create a safe, welcoming space where individuals from all 
            walks of life can come together to share experiences, learn from each other, 
            and build meaningful connections. We believe that communities thrive when 
            people feel heard, valued, and supported.
          </p>
        </div>

        {/* Values Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="card">
            <div className="flex items-center mb-4">
              <Heart className="w-8 h-8 text-red-500 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900">Inclusivity</h3>
            </div>
            <p className="text-gray-600">
              We welcome everyone regardless of background, beliefs, or experience level. 
              Diversity makes our community stronger and more vibrant.
            </p>
          </div>

          <div className="card">
            <div className="flex items-center mb-4">
              <Shield className="w-8 h-8 text-green-500 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900">Safety</h3>
            </div>
            <p className="text-gray-600">
              We prioritize creating a safe environment where everyone feels comfortable 
              sharing and participating without fear of judgment or harassment.
            </p>
          </div>

          <div className="card">
            <div className="flex items-center mb-4">
              <Users className="w-8 h-8 text-blue-500 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900">Connection</h3>
            </div>
            <p className="text-gray-600">
              We believe in the power of human connection and strive to facilitate 
              meaningful relationships between community members.
            </p>
          </div>

          <div className="card">
            <div className="flex items-center mb-4">
              <Zap className="w-8 h-8 text-yellow-500 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900">Growth</h3>
            </div>
            <p className="text-gray-600">
              We encourage continuous learning and personal development, supporting 
              each other&apos;s journeys of growth and discovery.
            </p>
          </div>
        </div>

        {/* Community Guidelines */}
        <div className="card mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Community Guidelines</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p className="text-gray-600">
                <strong>Be respectful:</strong> Treat others with kindness and respect, even when you disagree.
              </p>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p className="text-gray-600">
                <strong>Listen and learn:</strong> Be open to different perspectives and experiences.
              </p>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p className="text-gray-600">
                <strong>Share constructively:</strong> Contribute positively to discussions and help others.
              </p>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p className="text-gray-600">
                <strong>Report issues:</strong> Help us maintain a safe environment by reporting inappropriate behavior.
              </p>
            </div>
          </div>
        </div>

        {/* Get Involved Section */}
        <div className="card text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Join Our Community?
          </h2>
          <p className="text-gray-600 mb-6">
            Start your journey with us today and become part of something special.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/auth/signup" className="btn-primary">
              Join Now
            </Link>
            <Link href="/" className="btn-secondary">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
