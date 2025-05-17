import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const timestamp = Date.now();
    const email = `${body.companyName.toLowerCase().replace(/\s+/g, '')}-${timestamp}@bunachain.com`;
    
    const user = await prisma.user.create({
      data: {
        full_name: body.companyName,
        email: email,
        phone: "0000000000", // Default phone
        role: body.role,
        region: body.location,
        country: "Ethiopia", // Default country
        wallet_address: body.walletAddress
      }
    });
    
    return NextResponse.json(user);
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A user with similar details already exists' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: error.message || 'Registration failed' },
      { status: 500 }
    );
  }
}