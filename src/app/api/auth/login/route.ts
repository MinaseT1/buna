import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, walletAddress } = body;

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    // If wallet address is provided, verify it matches (optional additional security)
    if (walletAddress && user.wallet_address !== walletAddress) {
      console.warn(`Wallet address mismatch for user ${user.id}. Expected: ${user.wallet_address}, Got: ${walletAddress}`);
      // You might want to log this but still allow login if password is correct
    }

    // Return user data (excluding password)
    const { password: _, ...userWithoutPassword } = user;
    
    return NextResponse.json({
      ...userWithoutPassword,
      message: 'Login successful'
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ 
      message: `Authentication failed: ${error instanceof Error ? error.message : 'Unknown error'}` 
    }, { status: 500 });
  }
}