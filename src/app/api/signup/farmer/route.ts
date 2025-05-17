import { NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma';
import { UserRole } from '@prisma/client';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { full_name, email, phone, region, country, farmInfo, wallet_address } = body;

    if (!full_name || !email || !phone || !region || !country || !wallet_address) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    // Log the farmInfo for future reference but don't try to store it
    // since there's no metadata field in the schema
    if (farmInfo) {
      console.log('Farm info received:', farmInfo);
      // In the future, consider adding a farmInfo field to the User model
    }

    const user = await prisma.user.create({
      data: {
        full_name,
        email,
        phone,
        region,
        country,
        wallet_address,
        role: UserRole.FARMER
      }
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to register farmer' }, { status: 500 });
  }
}
