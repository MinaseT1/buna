import { NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma';
import { UserRole } from '@prisma/client';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { full_name, email, phone, region, country, farmInfo, wallet_address, password } = body;

    if (!full_name || !email || !phone || !region || !country || !wallet_address || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    // Log the farmInfo for future reference but don't try to store it
    // since there's no metadata field in the schema
    if (farmInfo) {
      console.log('Farm info received:', farmInfo);
      // In the future, consider adding a farmInfo field to the User model
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await prisma.user.create({
      data: {
        full_name,
        email,
        phone,
        region,
        country,
        wallet_address,
        password: hashedPassword,
        role: UserRole.FARMER
      }
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error('Error registering farmer:', error);
    return NextResponse.json({ error: `Failed to register farmer: ${error instanceof Error ? error.message : 'Unknown error'}` }, { status: 500 });
  }
}
