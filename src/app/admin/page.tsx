'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { 
  User, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Search, 
  Filter,
  Eye,
  MessageSquare,
  Building,
  MapPin,
  Code,
  Calendar,
  Shield
} from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface PendingUser {
  id: string
  email: string
  full_name: string
  username: string | null
  job_title: string | null
  company: string | null
  location: string | null
  skills: string[] | null
  bio: string | null
  created_at: string
}

export default function AdminDashboard() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([])
  const [filteredUsers, setFilteredUsers] = useState<PendingUser[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loadingUsers, setLoadingUsers] = useState(true)
  const [approvingUser, setApprovingUser] = useState<string | null>(null)
  const [rejectingUser, setRejectingUser] = useState<string | null>(null)
  const [approvalNotes, setApprovalNotes] = useState('')
  const [showNotesModal, setShowNotesModal] = useState(false)
  const [currentAction, setCurrentAction] = useState<'approve' | 'reject' | null>(null)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)

  // Check authentication and admin status
  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin')
      return
    }

    if (!loading && user) {
      checkAdminStatus()
    }
  }, [user, loading, router])

  // Fetch pending users if admin
  useEffect(() => {
    if (user && !loading) {
      fetchPendingUsers()
    }
  }, [user, loading])

  const checkAdminStatus = async () => {
    if (!user) return

    const { data, error } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', user.id)
      .single()

    if (error || !data?.is_admin) {
      router.push('/')
      return
    }
  }

  const fetchPendingUsers = async () => {
    try {
      setLoadingUsers(true)
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('approval_status', 'pending')
        .order('created_at', { ascending: true })

      if (error) {
        console.error('Error fetching pending users:', error)
        return
      }

      setPendingUsers(data || [])
      setFilteredUsers(data || [])
    } catch (error) {
      console.error('Error fetching pending users:', error)
    } finally {
      setLoadingUsers(false)
    }
  }

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm)
    if (!searchTerm.trim()) {
      setFilteredUsers(pendingUsers)
      return
    }

    const filtered = pendingUsers.filter(user => {
      const searchLower = searchTerm.toLowerCase()
      return (
        user.full_name?.toLowerCase().includes(searchLower) ||
        user.email?.toLowerCase().includes(searchLower) ||
        user.job_title?.toLowerCase().includes(searchLower) ||
        user.company?.toLowerCase().includes(searchLower) ||
        user.location?.toLowerCase().includes(searchLower) ||
        user.skills?.some(skill => skill.toLowerCase().includes(searchLower)) ||
        user.bio?.toLowerCase().includes(searchLower)
      )
    })
    setFilteredUsers(filtered)
  }

  const handleApprove = async (userId: string) => {
    if (!user) return

    try {
      setApprovingUser(userId)
      
      const { error } = await supabase.rpc('approve_user', {
        user_id: userId,
        admin_id: user.id,
        notes: approvalNotes || null
      })

      if (error) {
        console.error('Error approving user:', error)
        alert('Failed to approve user. Please try again.')
        return
      }

      // Refresh the list
      await fetchPendingUsers()
      setApprovalNotes('')
      setShowNotesModal(false)
      alert('User approved successfully!')
    } catch (error) {
      console.error('Error approving user:', error)
      alert('Failed to approve user. Please try again.')
    } finally {
      setApprovingUser(null)
    }
  }

  const handleReject = async (userId: string) => {
    if (!user) return

    try {
      setRejectingUser(userId)
      
      const { error } = await supabase.rpc('reject_user', {
        user_id: userId,
        admin_id: user.id,
        notes: approvalNotes || null
      })

      if (error) {
        console.error('Error rejecting user:', error)
        alert('Failed to reject user. Please try again.')
        return
      }

      // Refresh the list
      await fetchPendingUsers()
      setApprovalNotes('')
      setShowNotesModal(false)
      alert('User rejected successfully!')
    } catch (error) {
      console.error('Error rejecting user:', error)
      alert('Failed to reject user. Please try again.')
    } finally {
      setRejectingUser(null)
    }
  }

  const openNotesModal = (action: 'approve' | 'reject', userId: string) => {
    setCurrentAction(action)
    setCurrentUserId(userId)
    setApprovalNotes('')
    setShowNotesModal(true)
  }

  const confirmAction = () => {
    if (!currentUserId || !currentAction) return

    if (currentAction === 'approve') {
      handleApprove(currentUserId)
    } else {
      handleReject(currentUserId)
    }
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
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
                <p className="text-gray-600">
                  Manage pending user registrations and community settings
                </p>
              </div>
              <div className="flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-lg">
                <Shield className="w-5 h-5" />
                <span className="font-medium">Admin Access</span>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">{pendingUsers.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Approved</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {pendingUsers.filter(u => u.approval_status === 'approved').length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Rejected</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {pendingUsers.filter(u => u.approval_status === 'rejected').length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <User className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-gray-900">{pendingUsers.length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search users by name, email, company, skills..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {filteredUsers.length} of {pendingUsers.length} users
                </span>
              </div>
            </div>
          </div>

          {/* Pending Users List */}
          {loadingUsers ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading pending users...</p>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No pending registrations</h3>
              <p className="text-gray-600">
                {searchTerm ? 'Try adjusting your search terms' : 'All registrations have been processed'}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredUsers.map((pendingUser) => (
                <div key={pendingUser.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    {/* User Info */}
                    <div className="flex-1 mb-4 lg:mb-0">
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-8 h-8 text-gray-400" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-semibold text-gray-900">
                              {pendingUser.full_name}
                            </h3>
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                              Pending
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <div className="flex items-center text-sm text-gray-600">
                                <MessageSquare className="w-4 h-4 mr-2 text-gray-400" />
                                <span>{pendingUser.email}</span>
                              </div>
                              
                              {pendingUser.username && (
                                <div className="flex items-center text-sm text-gray-600">
                                  <User className="w-4 h-4 mr-2 text-gray-400" />
                                  <span>@{pendingUser.username}</span>
                                </div>
                              )}
                              
                              {pendingUser.job_title && (
                                <div className="flex items-center text-sm text-gray-600">
                                  <Building className="w-4 h-4 mr-2 text-gray-400" />
                                  <span>{pendingUser.job_title}</span>
                                </div>
                              )}
                              
                              {pendingUser.company && (
                                <div className="flex items-center text-sm text-gray-600">
                                  <Building className="w-4 h-4 mr-2 text-gray-400" />
                                  <span>{pendingUser.company}</span>
                                </div>
                              )}
                            </div>
                            
                            <div className="space-y-2">
                              {pendingUser.location && (
                                <div className="flex items-center text-sm text-gray-600">
                                  <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                                  <span>{pendingUser.location}</span>
                                </div>
                              )}
                              
                              {pendingUser.skills && pendingUser.skills.length > 0 && (
                                <div className="flex items-start text-sm text-gray-600">
                                  <Code className="w-4 h-4 mr-2 text-gray-400 mt-0.5" />
                                  <div className="flex flex-wrap gap-1">
                                    {pendingUser.skills.slice(0, 3).map((skill, index) => (
                                      <span
                                        key={index}
                                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                                      >
                                        {skill}
                                      </span>
                                    ))}
                                    {pendingUser.skills.length > 3 && (
                                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                        +{pendingUser.skills.length - 3} more
                                      </span>
                                    )}
                                  </div>
                                </div>
                              )}
                              
                              <div className="flex items-center text-sm text-gray-600">
                                <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                                <span>Joined {new Date(pendingUser.created_at).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                          
                          {pendingUser.bio && (
                            <div className="mt-3">
                              <p className="text-sm text-gray-600 line-clamp-2">{pendingUser.bio}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => openNotesModal('approve', pendingUser.id)}
                        disabled={approvingUser === pendingUser.id}
                        className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {approvingUser === pendingUser.id ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        ) : (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Approve
                          </>
                        )}
                      </button>
                      
                      <button
                        onClick={() => openNotesModal('reject', pendingUser.id)}
                        disabled={rejectingUser === pendingUser.id}
                        className="flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {rejectingUser === pendingUser.id ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 mr-2" />
                            Reject
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Notes Modal */}
      {showNotesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {currentAction === 'approve' ? 'Approve' : 'Reject'} User
            </h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes (Optional)
              </label>
              <textarea
                value={approvalNotes}
                onChange={(e) => setApprovalNotes(e.target.value)}
                placeholder={`Add notes about why you're ${currentAction === 'approve' ? 'approving' : 'rejecting'} this user...`}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows={3}
              />
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowNotesModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmAction}
                className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors ${
                  currentAction === 'approve' 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {currentAction === 'approve' ? 'Approve' : 'Reject'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

