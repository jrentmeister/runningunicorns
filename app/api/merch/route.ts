import { NextResponse } from 'next/server'
import { db, merchItems, merchVariants } from '@/db'
import { eq } from 'drizzle-orm'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    // Query merch items with their variants
    let query = db
      .select({
        item: merchItems,
        variant: merchVariants,
      })
      .from(merchItems)
      .leftJoin(merchVariants, eq(merchItems.id, merchVariants.itemId))

    if (category) {
      query = query.where(eq(merchItems.category, category)) as any
    }

    const results = await query

    // Group variants by item
    const itemsMap = new Map()
    for (const row of results) {
      const itemId = row.item.id
      if (!itemsMap.has(itemId)) {
        itemsMap.set(itemId, {
          ...row.item,
          variants: [],
        })
      }
      if (row.variant) {
        itemsMap.get(itemId).variants.push(row.variant)
      }
    }

    const items = Array.from(itemsMap.values()).map((item) => ({
      id: item.externalId || item.id,
      name: item.name,
      description: item.description,
      price: Number(item.price),
      imageUrl: item.imageUrl,
      category: item.category,
      variants: item.variants.map((v: any) => ({
        id: v.externalId || v.id,
        size: v.size,
        color: v.color,
        stock: v.stock,
      })),
    }))

    return NextResponse.json({
      items,
      meta: {
        total: items.length,
        categories: ['apparel', 'accessories', 'prints'],
      },
    })
  } catch (error) {
    console.error('Merch API error:', error)
    return NextResponse.json({ error: 'Failed to fetch merch items' }, { status: 500 })
  }
}
