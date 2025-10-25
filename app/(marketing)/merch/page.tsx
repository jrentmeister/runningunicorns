import { Card, CardContent } from '@/components/ui/card'
import { mockMerchItems } from '@/lib/merch/placeholder'
import Image from 'next/image'

export const metadata = {
  title: 'Merch | Running Unicorns',
  description: 'Shop Running Unicorns merch and support the community',
}

export default function MerchPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <h1 className="font-erbaum text-5xl font-black uppercase mb-4 gradient-text">
          Community Merch
        </h1>
        <p className="font-poppins text-lg text-muted-foreground mb-12">
          Wear your passion. Support the movement.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockMerchItems.map((item) => (
            <Card key={item.id} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
              <div className="relative aspect-square">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-erbaum text-lg font-bold uppercase mb-1">{item.name}</h3>
                <p className="font-poppins text-sm text-muted-foreground mb-2">{item.description}</p>
                <p className="font-poppins text-xl font-bold">${item.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
