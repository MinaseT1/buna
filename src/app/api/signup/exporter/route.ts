import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { UserRole } from '@prisma/client';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { companyName, contactPerson, license, region, capacity, wallet_address } = body;

    if (!companyName || !contactPerson || !license || !region || !capacity || !wallet_address) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { full_name: companyName },
          { wallet_address }
        ]
      }
    });
    if (existingUser) {
      return NextResponse.json({ error: 'Company name or wallet address already in use.' }, { status: 409 });
    }

    const user = await prisma.user.create({
      data: {
        full_name: companyName,
        email: body.email || `${companyName.replace(/\s+/g, '').toLowerCase()}@example.com`,
        phone: body.phone || contactPerson,
        region,
        wallet_address,
        role: UserRole.EXPORTER
      }
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to register exporter' }, { status: 500 });
  }
}