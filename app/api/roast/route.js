// app/api/roast/route.js
import { NextResponse } from 'next/server';
import { fetchGitHubProfile } from '@/lib/github';
import { generateRoast } from '@/lib/roast';

export async function POST(req) {
  try {
    const body = await req.json();
    const { user, compare } = body;

    console.log('Received user:', user);
    console.log('Comparing with:', compare);

    const userData = await fetchGitHubProfile(user);
    const compareData = await fetchGitHubProfile(compare);
    const roast = await generateRoast(userData, compareData);

    return NextResponse.json({ roast });
  } catch (error) {
    console.error('❌ Error generating roast:', error.message);
    return NextResponse.json({ roast: 'Error roasting. Please try again.' }, { status: 500 });
  }
}
