import restaurantsData from '@/data/restaurants.json';
import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
  try {
    return NextResponse.json(restaurantsData);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load data' }, { status: 500 });
  }
}
