import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { secret } = await request.json();

    if (!secret || secret !== process.env.ADMIN_SECRET_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const response = NextResponse.json({ success: true });

    response.cookies.set({
      name: 'admin_token',
      value: process.env.ADMIN_SECRET_KEY!,
      httpOnly: true,
      secure: false,       // false for local development
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 8, // 8 hours
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}