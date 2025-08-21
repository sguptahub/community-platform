'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { MessageSquare, User, Calendar, ThumbsUp, MessageCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface Post {
  id: string
  title: string
  content: string
  author_id: string
  created_at: string
  author_name?: string
}

export default function Discussions() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles!posts_author_id_fkey(full_name)
        `)
        .order('created_at', { ascending: false })

      if (error) throw error

      const postsWithAuthorNames = data?.map(post => ({
        ...post,
        author_name: post.profiles?.full_name || 'Anonymous'
      })) || []

      setPosts(postsWithAuthorNames)
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading discussions...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Community Discussions</h1>
            <p className="text-gray-600 mt-2">Join the conversation and share your thoughts</p>
          </div>
          <Link href="/discussions/new" className="btn-primary">
            Start Discussion
          </Link>
        </div>

        {/* Posts List */}
        {posts.length === 0 ? (
          <div className="card text-center py-12">
            <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No discussions yet</h3>
            <p className="text-gray-600 mb-6">
              Be the first to start a discussion and get the conversation going!
            </p>
            <Link href="/discussions/new" className="btn-primary">
              Start First Discussion
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post.id} className="card hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <Link 
                      href={`/discussions/${post.id}`}
                      className="text-xl font-semibold text-gray-900 hover:text-primary-600 transition-colors"
                    >
                      {post.title}
                    </Link>
                    <p className="text-gray-600 mt-2 line-clamp-3">
                      {post.content}
                    </p>
                    
                    {/* Post Meta */}
                    <div className="flex items-center space-x-6 mt-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        <span>{post.author_name}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{new Date(post.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        <span>0 likes</span>
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        <span>0 replies</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More */}
        {posts.length > 0 && (
          <div className="text-center mt-8">
            <button className="btn-secondary">
              Load More Discussions
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

