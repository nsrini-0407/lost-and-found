import { NextRequest, NextResponse } from 'next/server';
import { createAdminSupabaseClient } from '@/lib/supabase/server';
import { submitItemSchema } from '@/lib/validations';
import { checkRateLimit } from '@/lib/utils';

export async function POST(request: NextRequest) {
  // Rate limiting
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown';
  if (!checkRateLimit(`submit:${ip}`, 5, 60_000)) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait a moment.' },
      { status: 429 }
    );
  }

  try {
    const formData = await request.formData();

    // Extract text fields
    const rawData = {
      title:           formData.get('title'),
      description:     formData.get('description'),
      category:        formData.get('category'),
      location:        formData.get('location'),
      date_found:      formData.get('date_found'),
      submitter_name:  formData.get('submitter_name'),
      submitter_email: formData.get('submitter_email'),
    };

    // Validate text fields
    const parseResult = submitItemSchema.safeParse(rawData);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: 'Invalid submission', details: parseResult.error.flatten() },
        { status: 400 }
      );
    }

    const data = parseResult.data;
    const supabase = await createAdminSupabaseClient();

    // Handle image upload
    let imageUrl: string | null = null;
    const imageFile = formData.get('image') as File | null;

    if (imageFile && imageFile.size > 0) {
      // Validate file type server-side
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(imageFile.type)) {
        return NextResponse.json(
          { error: 'Invalid image type. Use JPEG, PNG, or WebP.' },
          { status: 400 }
        );
      }

      // Validate file size (5MB max)
      if (imageFile.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          { error: 'Image must be under 5MB.' },
          { status: 400 }
        );
      }

      // Generate unique filename
      const ext = imageFile.name.split('.').pop()?.toLowerCase() ?? 'jpg';
      const filename = `${crypto.randomUUID()}.${ext}`;

      // Convert File to ArrayBuffer for upload
      const arrayBuffer = await imageFile.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);

      // Upload to Supabase storage
      const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from('item-images')
        .upload(filename, uint8Array, {
          contentType: imageFile.type,
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) {
        console.error('Image upload failed:', uploadError);
        // Continue without image rather than failing the whole submission
      } else {
        // Get the public URL for the uploaded image
        const { data: urlData } = supabase
          .storage
          .from('item-images')
          .getPublicUrl(uploadData.path);

        imageUrl = urlData.publicUrl;
        console.log('Image uploaded successfully:', imageUrl);
      }
    }

    // Insert item into database
    const { data: item, error: insertError } = await supabase
      .from('items')
      .insert({
        title:           data.title,
        description:     data.description,
        category:        data.category,
        location:        data.location,
        date_found:      data.date_found,
        submitter_name:  data.submitter_name,
        submitter_email: data.submitter_email,
        image_url:       imageUrl,
        status:          'pending',
      })
      .select()
      .single();

    if (insertError) {
      console.error('Insert failed:', insertError);
      return NextResponse.json(
        { error: 'Failed to save submission. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: item.id }, { status: 201 });

  } catch (err) {
    console.error('Unexpected error in POST /api/items:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}