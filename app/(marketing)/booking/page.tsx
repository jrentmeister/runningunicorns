import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata = {
  title: 'Be a Guest | Running Unicorns',
  description: 'Share your story on Running Unicorns podcast',
}

export default function BookingPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <h1 className="font-erbaum text-5xl font-black uppercase mb-4 gradient-text text-center">
          Be Our Guest
        </h1>
        <p className="font-poppins text-lg text-muted-foreground mb-12 text-center">
          Share your journey with our community
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="font-erbaum text-xl">What We're Looking For</CardTitle>
            </CardHeader>
            <CardContent className="font-poppins text-sm space-y-2">
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Athletes with unique stories beyond the scoreboard</li>
                <li>Artists and creatives influenced by sports culture</li>
                <li>Community builders and activists making impact</li>
                <li>Entrepreneurs bridging sport and innovation</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-erbaum text-xl">What to Expect</CardTitle>
            </CardHeader>
            <CardContent className="font-poppins text-sm space-y-2">
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>45-60 minute conversational interview</li>
                <li>Remote recording via Zoom (flexible scheduling)</li>
                <li>Pre-interview prep call to align on themes</li>
                <li>Edited episode with professional production</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-br from-brand-blue/10 to-brand-mint/10 border-brand-blue/20">
          <CardHeader>
            <CardTitle className="font-erbaum text-2xl text-center">Book Your Session</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-poppins text-center text-muted-foreground mb-6">
              Calendly integration will be loaded here. Set{' '}
              <code className="bg-muted px-2 py-1 rounded">NEXT_PUBLIC_CALENDLY_URL</code> in your
              environment variables.
            </p>
            <div className="h-64 bg-muted/50 rounded-lg flex items-center justify-center">
              <p className="font-poppins text-muted-foreground">Calendly Embed Placeholder</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
