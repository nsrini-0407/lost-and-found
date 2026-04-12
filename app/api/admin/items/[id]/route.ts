import { NextRequest, NextResponse } from 'next/server';
import { createAdminSupabaseClient } from '@/lib/supabase/server';
import { sendItemApproved, sendItemRejected } from '@/lib/email/resend';
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

  let body: { status: string; rejection_reason?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const validStatuses = ['pending', 'approved', 'claimed', 'rejected'];
  if (!validStatuses.includes(body.status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }

  const supabase = await createAdminSupabaseClient();

  const { data: item } = await supabase
    .from('items')
    .select('*')
    .eq('id', id)
    .single();

  if (!item) {
    return NextResponse.json({ error: 'Item not found' }, { status: 404 });
  }

  const { error } = await supabase
    .from('items')
    .update({ status: body.status })
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
  }

  if (body.status === 'approved') {
    sendItemApproved({
      to:            item.submitter_email,
      submitterName: item.submitter_name,
      itemTitle:     item.title,
      itemId:        item.id,
    }).catch(console.error);
  } else if (body.status === 'rejected') {
    sendItemRejected({
      to:            item.submitter_email,
      submitterName: item.submitter_name,
      itemTitle:     item.title,
      reason:        body.rejection_reason,
    }).catch(console.error);
  }

  return NextResponse.json({ success: true });
}