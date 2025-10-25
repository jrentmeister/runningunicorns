import { z } from 'zod'

export const merchItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  imageUrl: z.string().url(),
  category: z.enum(['apparel', 'accessories', 'prints']),
  variants: z.array(
    z.object({
      id: z.string(),
      size: z.string().optional(),
      color: z.string().optional(),
      stock: z.number(),
    })
  ),
})

export type MerchItem = z.infer<typeof merchItemSchema>

export const mockMerchItems: MerchItem[] = [
  {
    id: 'm1',
    name: 'Kinetic Logo Tee',
    description: 'Premium cotton tee with gradient Running Unicorns logo',
    price: 32,
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
    category: 'apparel',
    variants: [
      { id: 'm1-s-black', size: 'S', color: 'Black', stock: 15 },
      { id: 'm1-m-black', size: 'M', color: 'Black', stock: 20 },
      { id: 'm1-l-black', size: 'L', color: 'Black', stock: 18 },
      { id: 'm1-xl-black', size: 'XL', color: 'Black', stock: 10 },
    ],
  },
  {
    id: 'm2',
    name: 'Gradient Hoodie',
    description: 'Heavyweight fleece hoodie with geometric pattern',
    price: 68,
    imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800',
    category: 'apparel',
    variants: [
      { id: 'm2-m-navy', size: 'M', color: 'Navy', stock: 12 },
      { id: 'm2-l-navy', size: 'L', color: 'Navy', stock: 15 },
      { id: 'm2-xl-navy', size: 'XL', color: 'Navy', stock: 8 },
    ],
  },
  {
    id: 'm3',
    name: 'Podcast Sticker Pack',
    description: 'Set of 5 weatherproof stickers featuring episode artwork',
    price: 8,
    imageUrl: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800',
    category: 'accessories',
    variants: [{ id: 'm3-standard', stock: 100 }],
  },
  {
    id: 'm4',
    name: 'Community Print',
    description: 'Limited edition 12x18 art print celebrating our listeners',
    price: 25,
    imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=800',
    category: 'prints',
    variants: [{ id: 'm4-print', stock: 50 }],
  },
]
