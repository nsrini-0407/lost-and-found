'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { submitItemSchema, type SubmitItemSchema } from '@/lib/validations';
import { CATEGORIES } from '@/types';
import ImageUpload from '@/components/ImageUpload';

type FormStep = 'form' | 'success';

export default function SubmitPage() {
  const [step, setStep] = useState<FormStep>('form');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubmitItemSchema>({
    resolver: zodResolver(submitItemSchema),
  });

  const onSubmit = async (data: SubmitItemSchema) => {
    setSubmitting(true);
    setServerError(null);

    try {
      // Build multipart form data to include image file
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      if (imageFile) formData.append('image', imageFile);

      const res = await fetch('/api/items', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error ?? 'Submission failed');
      }

      setStep('success');
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  if (step === 'success') {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center animate-slide-up ">
        <div className="w-16 h-16 bg-teal-100 rounded-sm flex items-center
                        justify-center mx-auto mb-6">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <path d="M5 14l7 7L23 7" stroke="#0d9488"
                  strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 className="font-display text-3xl text-navy-800 mb-3">
          Submission received
        </h1>
        <p className="text-slate-500 leading-relaxed mb-8">
          Thank you for turning in a found item. A staff member will review your
          submission and you will receive an email notification once it is approved.
        </p>
        <div className="flex gap-3 justify-center">
          <a href="/items"
             className="px-5 py-2.5 bg-amber text-navy font-semibold text-sm
                        rounded-sm hover:bg-amber/90 transition-colors">
            Browse Items
          </a>
          <button
            onClick={() => setStep('form')}
            className="px-5 py-2.5 border border-slate-200 text-navy-800 font-medium
                       text-sm rounded-sm hover:bg-slate-50 transition-colors"
          >
            Submit Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 animate-fade-in">
      {/* Page header */}
      <div className="mb-10">
        <p className="text-amber text-xs font-semibold tracking-[0.12em] uppercase mb-2">
          Lost and Found
        </p>
        <h1 className="font-display text-3xl text-navy-800">Submit a found item</h1>
        <p className="text-slate-500 mt-2 text-sm leading-relaxed">
          Fill out this form to report an item you found. All fields marked with
          an asterisk (*) are required.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-white border border-slate-200 rounded-2xl p-6 shadow-card"
        aria-label="Submit found item form"
        noValidate
      >
        {serverError && (
          <div
            className="p-3 bg-red-50 border border-red-200 rounded-sm text-sm text-red-700"
            role="alert"
            aria-live="assertive"
          >
            {serverError}
          </div>
        )}

        {/* Item title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-navy-800 mb-1.5">
            Item Title <span aria-hidden="true" className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            {...register('title')}
            placeholder="e.g. Blue North Face Backpack"
            className="w-full px-3 py-2.5 border border-slate-200 rounded-sm text-sm
                       focus:outline-none focus:border-amber focus:ring-1 focus:ring-amber"
            aria-required="true"
            aria-invalid={!!errors.title}
            aria-describedby={errors.title ? 'title-error' : undefined}
          />
          {errors.title && (
            <p id="title-error" className="mt-1.5 text-sm text-red-600" role="alert">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-navy-800 mb-1.5">
            Category <span aria-hidden="true" className="text-red-500">*</span>
          </label>
          <select
            id="category"
            {...register('category')}
            className="w-full px-3 py-2.5 border border-slate-200 rounded-sm text-sm
                       focus:outline-none focus:border-amber focus:ring-1 focus:ring-amber
                       bg-white text-navy-800"
            aria-required="true"
            aria-invalid={!!errors.category}
            defaultValue=""
          >
            <option value="" disabled>Select a category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1.5 text-sm text-red-600" role="alert">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-navy-800 mb-1.5">
            Description <span aria-hidden="true" className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            {...register('description')}
            rows={4}
            placeholder="Describe the item in detail — color, brand, condition, any identifying marks..."
            className="w-full px-3 py-2.5 border border-slate-200 rounded-sm text-sm
                       focus:outline-none focus:border-amber focus:ring-1 focus:ring-amber
                       resize-none"
            aria-required="true"
            aria-invalid={!!errors.description}
            aria-describedby={errors.description ? 'desc-error' : undefined}
          />
          {errors.description && (
            <p id="desc-error" className="mt-1.5 text-sm text-red-600" role="alert">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Location and date in a row on larger screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-navy-800 mb-1.5">
              Where was it found? <span aria-hidden="true" className="text-red-500">*</span>
            </label>
            <input
              id="location"
              type="text"
              {...register('location')}
              placeholder="e.g. Room 204, Main Gym, Cafeteria"
              className="w-full px-3 py-2.5 border border-slate-200 rounded-sm text-sm
                         focus:outline-none focus:border-amber focus:ring-1 focus:ring-amber"
              aria-required="true"
              aria-invalid={!!errors.location}
            />
            {errors.location && (
              <p className="mt-1.5 text-sm text-red-600" role="alert">
                {errors.location.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="date_found" className="block text-sm font-medium text-navy-800 mb-1.5">
              Date Found <span aria-hidden="true" className="text-red-500">*</span>
            </label>
            <input
              id="date_found"
              type="date"
              {...register('date_found')}
              max={new Date().toISOString().split('T')[0]}
              className="w-full px-3 py-2.5 border border-slate-200 rounded-sm text-sm
                         focus:outline-none focus:border-amber focus:ring-1 focus:ring-amber"
              aria-required="true"
              aria-invalid={!!errors.date_found}
            />
            {errors.date_found && (
              <p className="mt-1.5 text-sm text-red-600" role="alert">
                {errors.date_found.message}
              </p>
            )}
          </div>
        </div>

        {/* Photo upload */}
        <div>
          <p className="block text-sm font-medium text-navy-800 mb-1.5" id="image-label">
            Photo (optional but recommended)
          </p>
          <ImageUpload onFileSelect={setImageFile} />
        </div>

        {/* Divider */}
        <div className="border-t border-slate-100 pt-5">
          <p className="text-xs text-slate-500 mb-5 font-medium uppercase tracking-wide">
            Your contact information
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="submitter_name"
                     className="block text-sm font-medium text-navy-800 mb-1.5">
                Your Name <span aria-hidden="true" className="text-red-500">*</span>
              </label>
              <input
                id="submitter_name"
                type="text"
                {...register('submitter_name')}
                autoComplete="name"
                className="w-full px-3 py-2.5 border border-slate-200 rounded-sm text-sm
                           focus:outline-none focus:border-amber focus:ring-1 focus:ring-amber"
                aria-required="true"
              />
              {errors.submitter_name && (
                <p className="mt-1.5 text-sm text-red-600" role="alert">
                  {errors.submitter_name.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="submitter_email"
                     className="block text-sm font-medium text-navy-800 mb-1.5">
                Your Email <span aria-hidden="true" className="text-red-500">*</span>
              </label>
              <input
                id="submitter_email"
                type="email"
                {...register('submitter_email')}
                autoComplete="email"
                className="w-full px-3 py-2.5 border border-slate-200 rounded-sm text-sm
                           focus:outline-none focus:border-amber focus:ring-1 focus:ring-amber"
                aria-required="true"
              />
              {errors.submitter_email && (
                <p className="mt-1.5 text-sm text-red-600" role="alert">
                  {errors.submitter_email.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 bg-amber text-navy font-semibold rounded-sm
                     hover:bg-amber/90 transition-colors disabled:opacity-60
                     disabled:cursor-not-allowed"
          aria-disabled={submitting}
        >
          {submitting ? 'Uploading and submitting...' : 'Submit Found Item'}
        </button>
      </form>
    </div>
  );
}