import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const user = await prisma.user.findFirst();
    const product = await prisma.product.findFirst();
    if (!user || !product) return NextResponse.json({error: 'no user or product'});

    const order = await prisma.order.create({
        data: {
            userId: user.id,
            totalAmount: product.price,
            status: 'PENDING',
            items: {
                create: [{
                    productId: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: 1,
                }]
            }
        }
    });
    return NextResponse.json(order);
  } catch (e: any) {
    return NextResponse.json({ error: e.message, stack: e.stack });
  }
}
