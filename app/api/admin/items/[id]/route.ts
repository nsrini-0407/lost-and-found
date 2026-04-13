import { NextRequest, NextResponse } from 'next/server';
import { createAdminSupabaseClient } from '../../../../../lib/supabase/server';
import { cookies } from 'next/headers';
import { sendItemApproved, sendItemRejected } from '../../../../../lib/email/resend';

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

  let body: { status?: string; description?: string; rejection_reason?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const supabase = await createAdminSupabaseClient();
  const updatePayload: Record<string, string> = {};

  if (body.status !== undefined) {
    const validStatuses = ['pending', 'approved', 'claimed', 'rejected'];
    if (!validStatuses.includes(body.status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }
    updatePayload.status = body.status;
  }

  if (body.description !== undefined) {
    const cleaned = body.description.replace(/<[^>]*>/g, '').trim();
    if (cleaned.length < 10) {
      return NextResponse.json(
        { error: 'Description must be at least 10 characters.' },
        { status: 400 }
      );
    }
    updatePayload.description = cleaned;
  }

  if (Object.keys(updatePayload).length === 0) {
    return NextResponse.json(
      { error: 'No valid fields to update.' },
      { status: 400 }
    );
  }

  // Fetch item for email notification
  const { data: item } = await supabase
    .from('items')
    .select('*')
    .eq('id', id)
    .single();

  if (!item) {
    return NextResponse.json({ error: 'Item not found' }, { status: 404 });
  }

  // Apply the update
  const { error: updateError } = await supabase
    .from('items')
    .update(updatePayload)
    .eq('id', id);

  if (updateError) {
    return NextResponse.json(
      { error: 'Failed to update item' },
      { status: 500 }
    );
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const supabase = await createAdminSupabaseClient();

  const { error } = await supabase
    .from('items')
    .delete()
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}