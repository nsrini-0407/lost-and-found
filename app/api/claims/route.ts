import { NextRequest, NextResponse } from 'next/server';
import { createAdminSupabaseClient } from '@/lib/supabase/server';
import { claimSchema } from '@/lib/validations';
import { checkRateLimit } from '@/lib/utils';
import { sendClaimSubmitted } from '@/lib/email/resend';

// POST /api/claims — submit a claim on an item
export async function POST(request: NextRequest) {
  // Rate limiting: max 3 claims per IP per minute
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown';
  if (!checkRateLimit(`claim:${ip}`, 3, 60_000)) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait a moment.' },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const parseResult = claimSchema.safeParse(body);
  if (!parseResult.success) {
    return NextResponse.json(
      { error: 'Invalid claim data', details: parseResult.error.flatten() },
      { status: 400 }
    );
  }

  const data = parseResult.data;
  const supabase = await createAdminSupabaseClient();

  // Verify the item exists and is approved (not claimed/rejected)
  const { data: item, error: itemError } = await supabase
  .from('items')
  .select('id, title, status')
  .eq('id', data.item_id)
  .single();

  console.log('Item lookup result:', item);
  console.log('Item lookup error:', itemError);
  console.log('Item ID being searched:', data.item_id);

if (!item || item.status !== 'approved') {
  return NextResponse.json(
    { error: 'This item is not available for claiming.' },
    { status: 400 }
  );
}

  // Insert claim
  const { error: insertError } = await supabase
  .from('claims')
  .insert(data);

  console.log('Claim insert error:', insertError);
  console.log('Data being inserted:', data);

  if (insertError) {
    console.error('Claim insert failed:', insertError);
    return NextResponse.json(
      { error: 'Failed to submit claim. Please try again.' },
      { status: 500 }
    );
  }

  // Send confirmation email to claimant
  sendClaimSubmitted({
    to:          data.claimant_email,
    claimantName: data.claimant_name,
    itemTitle:   item.title,
    itemId:      item.id,
  }).catch(console.error);

  return NextResponse.json({ success: true }, { status: 201 });
}