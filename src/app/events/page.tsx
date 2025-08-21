'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Calendar, MapPin, Clock, Users, Plus } from 'lucide-react'

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  attendees: number
  maxAttendees: number
  isOnline: boolean
}

export default function Events() {
  const [events] = useState<Event[]>([
    {
      id: '1',
      title: 'Community Meetup',
      description: 'Join us for our monthly community meetup where we discuss upcoming features and share ideas.',
      date: '2024-02-15',
      time: '18:00',
      location: 'Community Center',
      attendees: 12,
      maxAttendees: 25,
      isOnline: false
    },
    {
      id: '2',
      title: 'Online Workshop: Building Communities',
      description: 'Learn the best practices for building and managing online communities.',
      date: '2024-02-20',
      time: '14:00',
      location: 'Zoom Meeting',
      attendees: 8,
      maxAttendees: 20,
      isOnline: true
    },
    {
      id: '3',
      title: 'Coffee & Code',
      description: 'Casual meetup for developers to chat about projects and share knowledge.',
      date: '2024-02-25',
      time: '10:00',
      location: 'Local Coffee Shop',
      attendees: 5,
      maxAttendees: 15,
      isOnline: false
    }
  ])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getEventStatus = (event: Event) => {
    if (event.attendees >= event.maxAttendees) {
      return { text: 'Full', color: 'bg-red-100 text-red-800' }
    }
    if (event.attendees >= event.maxAttendees * 0.8) {
      return { text: 'Almost Full', color: 'bg-yellow-100 text-yellow-800' }
    }
    return { text: 'Open', color: 'bg-green-100 text-green-800' }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Community Events</h1>
            <p className="text-gray-600 mt-2">Join our events and connect with fellow community members</p>
          </div>
          <Link href="/events/new" className="btn-primary flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Create Event</span>
          </Link>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => {
            const status = getEventStatus(event)
            return (
              <div key={event.id} className="card hover:shadow-lg transition-shadow">
                {/* Event Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {event.description}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                    {status.text}
                  </span>
                </div>

                {/* Event Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className={event.isOnline ? 'text-blue-600' : ''}>
                      {event.location}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{event.attendees}/{event.maxAttendees} attendees</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Attendance</span>
                    <span>{Math.round((event.attendees / event.maxAttendees) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button className="btn-primary flex-1">
                    {event.attendees >= event.maxAttendees ? 'Join Waitlist' : 'Join Event'}
                  </button>
                  <Link href={`/events/${event.id}`} className="btn-secondary">
                    Details
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        {/* Empty State */}
        {events.length === 0 && (
          <div className="card text-center py-12">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No events scheduled</h3>
            <p className="text-gray-600 mb-6">
              Be the first to create an event and bring the community together!
            </p>
            <Link href="/events/new" className="btn-primary">
              Create First Event
            </Link>
          </div>
        )}

        {/* Upcoming Events Info */}
        <div className="mt-12 card">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About Our Events</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">In-Person Events</h3>
              <p className="text-gray-600">
                Join us for local meetups, workshops, and social gatherings. Connect face-to-face 
                with community members and build lasting relationships.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Online Events</h3>
              <p className="text-gray-600">
                Participate in virtual workshops, webinars, and discussions from anywhere in the world. 
                Perfect for those who can&apos;t attend in-person events.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
