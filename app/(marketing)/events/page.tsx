import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { mockEvents } from '@/lib/events/placeholder'
import { Calendar, MapPin, Users } from 'lucide-react'

export const metadata = {
  title: 'Events | Running Unicorns',
  description: 'Join us at upcoming community events and live recordings',
}

export default function EventsPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <h1 className="font-erbaum text-5xl font-black uppercase mb-4 gradient-text">
          Community Events
        </h1>
        <p className="font-poppins text-lg text-muted-foreground mb-12">
          Connect in person. Build together.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {mockEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden">
              <div className="relative h-48">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-brand-blue border-0 text-white">
                  {event.type.replace('-', ' ').toUpperCase()}
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="font-erbaum text-2xl">{event.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-poppins text-sm text-muted-foreground">{event.description}</p>

                <div className="space-y-2 text-sm font-poppins">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-brand-blue" />
                    <span>{new Date(event.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                    })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-brand-mint" />
                    <span>{event.location}</span>
                  </div>
                  {event.capacity && (
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-brand-pink" />
                      <span>Capacity: {event.capacity}</span>
                    </div>
                  )}
                </div>

                {event.rsvpUrl && (
                  <Button className="w-full bg-gradient-to-r from-brand-blue to-brand-mint">
                    RSVP Now
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
