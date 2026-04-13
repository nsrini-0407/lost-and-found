import { NextRequest, NextResponse } from 'next/server';
import { createAdminSupabaseClient } from '../../../../../lib/supabase/server';
import { cookies } from 'next/headers';
import { sendClaimDecision } from '../../../../../lib/email/resend';

async function isAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  return token === process.env.ADMIN_SECRET_KEY;
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  let body: { status: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (!['approved', 'denied'].includes(body.status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }

  const supabase = await createAdminSupabaseClient();

  // Fetch the claim to get claimant details and item ID
  const { data: claim, error: claimFetchError } = await supabase
    .from('claims')
    .select('item_id, claimant_name, claimant_email')
    .eq('id', id)
    .single();

  console.log('Claim fetch result:', claim);
  console.log('Claim fetch error:', claimFetchError);

  if (!claim) {
    return NextResponse.json({ error: 'Claim not found' }, { status: 404 });
  }

  // Fetch the item title for the email
  const { data: item } = await supabase
    .from('items')
    .select('title')
    .eq('id', claim.item_id)
    .single();

  if (!item) {
    return NextResponse.json({ error: 'Item not found' }, { status: 404 });
  }

  // Update this claim's status
  const { error: claimError } = await supabase
    .from('claims')
    .update({ status: body.status })
    .eq('id', id);

  if (claimError) {
    return NextResponse.json({ error: 'Failed to update claim' }, { status: 500 });
  }

  if (body.status === 'approved') {
    // Mark the item as claimed
    await supabase
      .from('items')
      .update({ status: 'claimed' })
      .eq('id', claim.item_id);

    // Deny all other pending claims for the same item
    await supabase
      .from('claims')
      .update({ status: 'denied' })
      .eq('item_id', claim.item_id)
      .eq('status', 'pending')
      .neq('id', id);

    // Email the approved claimant
    sendClaimDecision({
      to:           claim.claimant_email,
      claimantName: claim.claimant_name,
      itemTitle:    item.title,
      approved:     true,
    }).catch(console.error);

  } else if (body.status === 'denied') {
    // Email the denied claimant
    sendClaimDecision({
      to:           claim.claimant_email,
      claimantName: claim.claimant_name,
      itemTitle:    item.title,
      approved:     false,
    }).catch(console.error);
  }

  return NextResponse.json({ success: true });
}