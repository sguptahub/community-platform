'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { User, Search, MapPin, Briefcase, Code } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface Member {
  id: string
  full_name: string
  email: string
  job_title: string | null
  company: string | null
  location: string | null
  skills: string[] | null
  bio: string | null
  avatar_url: string | null
  created_at: string
}

export default function Members() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [members, setMembers] = useState<Member[]>([])
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loadingMembers, setLoadingMembers] = useState(true)

  // Check authentication
  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin')
    }
  }, [user, loading, router])

  // Fetch members only if authenticated
  useEffect(() => {
    if (user) {
      fetchMembers()
    }
  }, [user])

  const fetchMembers = async () => {
    try {
      setLoadingMembers(true)
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('approval_status', 'approved') // Only show approved users
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching members:', error)
        return
      }

      setMembers(data || [])
      setFilteredMembers(data || [])
    } catch (error) {
      console.error('Error fetching members:', error)
    } finally {
      setLoadingMembers(false)
    }
  }

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm)
    if (!searchTerm.trim()) {
      setFilteredMembers(members)
      return
    }

    const filtered = members.filter(member => {
      const searchLower = searchTerm.toLowerCase()
      return (
        member.full_name?.toLowerCase().includes(searchLower) ||
        member.job_title?.toLowerCase().includes(searchLower) ||
        member.company?.toLowerCase().includes(searchLower) ||
        member.location?.toLowerCase().includes(searchLower) ||
        member.skills?.some(skill => skill.toLowerCase().includes(searchLower)) ||
        member.bio?.toLowerCase().includes(searchLower)
      )
    })
    setFilteredMembers(filtered)
  }

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render anything if not authenticated (will redirect via useEffect)
  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Community Members</h1>
            <p className="text-xl text-gray-600">
              Connect with {members.length} professionals from around the world
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search members by name, skills, company..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Members Grid */}
          {loadingMembers ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading members...</p>
            </div>
          ) : filteredMembers.length === 0 ? (
            <div className="text-center py-12">
              <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No members found</h3>
              <p className="text-gray-600">
                {searchTerm ? 'Try adjusting your search terms' : 'No members have joined yet'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMembers.map((member) => (
                <div key={member.id} className="card hover:shadow-lg transition-shadow duration-200">
                  {/* Avatar */}
                  <div className="text-center mb-4">
                    <div className="w-20 h-20 mx-auto rounded-full bg-gray-200 flex items-center justify-center">
                      {member.avatar_url ? (
                        <img
                          src={member.avatar_url}
                          alt={member.full_name}
                          className="w-20 h-20 rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-10 h-10 text-gray-400" />
                      )}
                    </div>
                  </div>

                  {/* Member Info */}
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {member.full_name}
                    </h3>
                    {member.job_title && (
                      <p className="text-gray-600 mb-1">{member.job_title}</p>
                    )}
                    {member.company && (
                      <p className="text-gray-500 text-sm">{member.company}</p>
                    )}
                  </div>

                  {/* Details */}
                  <div className="space-y-2 mb-4">
                    {member.location && (
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{member.location}</span>
                      </div>
                    )}
                    {member.skills && member.skills.length > 0 && (
                      <div className="flex items-start text-sm text-gray-600">
                        <Code className="w-4 h-4 mr-2 text-gray-400 mt-0.5" />
                        <div className="flex flex-wrap gap-1">
                          {member.skills.slice(0, 3).map((skill, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                          {member.skills.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                              +{member.skills.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bio */}
                  {member.bio && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 line-clamp-3">{member.bio}</p>
                    </div>
                  )}

                  {/* Member Since */}
                  <div className="text-center">
                    <p className="text-xs text-gray-500">
                      Member since {new Date(member.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Search Results Info */}
          {searchTerm && (
            <div className="text-center mt-8 text-sm text-gray-600">
              Showing {filteredMembers.length} of {members.length} members
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
