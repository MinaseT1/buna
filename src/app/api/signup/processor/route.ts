import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { UserRole } from '@prisma/client';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { businessName, contactPerson, location, capacity, method, wallet_address } = body;

    if (!businessName || !contactPerson || !location || !capacity || !method || !wallet_address) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { full_name: businessName },
          { wallet_address }
        ]
      }
    });

    if (existingUser) {
      return NextResponse.json({ error: 'Business name or wallet address already in use.' }, { status: 409 });
    }

    const user = await prisma.user.create({
      data: {
        full_name: businessName,
        email: body.email || `${businessName.replace(/\s+/g, '').toLowerCase()}@example.com`,
        phone: body.phone || contactPerson,
        region: location,
        wallet_address,
        role: UserRole.PROCESSOR
      }
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to register processor' }, { status: 500 });
  }
}