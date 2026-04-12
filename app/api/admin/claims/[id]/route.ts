import { NextRequest, NextResponse } from 'next/server';
import { createAdminSupabaseClient } from '../../../../../lib/supabase/server';
import { cookies } from 'next/headers';

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

  // Fetch the claim to get item_id and claimant details
  const { data: claim } = await supabase
    .from('claims')
    .select('item_id, claimant_name, claimant_email')
    .eq('id', id)
    .single();

  if (!claim) {
    return NextResponse.json({ error: 'Claim not found' }, { status: 404 });
  }

  // Update this claim's status
  const { error } = await supabase
    .from('claims')
    .update({ status: body.status })
    .eq('id', id);

  if (error) {
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
  }

  return NextResponse.json({ success: true });
}