import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// This is a simplified implementation - in a real app, you would use
// authentication to identify the current user
export async function GET(request: NextRequest) {
  try {
    // In a real implementation, you would get the user ID from the session
    // For now, we'll get the most recently created user as a demonstration
    const user = await prisma.user.findFirst({
      orderBy: {
        created_at: 'desc'
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Return only the data that was provided during signup
    return NextResponse.json({
      full_name: user.full_name,
      email: user.email,
      phone: user.phone,
      region: user.region,
      wallet_address: user.wallet_address,
      role: user.role
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}