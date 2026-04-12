'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { claimSchema, type ClaimSchema } from '@/lib/validations';

interface ClaimFormProps {
  itemId: string;
  itemTitle: string;
}

export default function ClaimForm({ itemId, itemTitle }: ClaimFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClaimSchema>({
    resolver: zodResolver(claimSchema),
    defaultValues: { item_id: itemId },
  });

  const onSubmit = async (data: ClaimSchema) => {
    setSubmitting(true);
    setServerError(null);

    try {
      const res = await fetch('/api/claims', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error ?? 'Failed to submit claim');
      }

      setSubmitted(true);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  // Show success message after submission
  if (submitted) {
    return (
      <div className="text-center py-4">
        <div className="w-10 h-10 bg-teal-100 rounded-sm flex items-center
                        justify-center mx-auto mb-3">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4 10l4 4 8-8" stroke="#0d9488"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="font-medium text-navy-800 text-sm mb-1">Claim submitted</p>
        <p className="text-slate-500 text-xs">
          We will review your claim and contact you within 1-2 school days.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
      aria-label={`Claim form for ${itemTitle}`}
      noValidate
    >
      <input type="hidden" {...register('item_id')} />

      {serverError && (
        <div
          className="p-3 bg-red-50 border border-red-200 rounded-sm text-sm text-red-700"
          role="alert"
          aria-live="assertive"
        >
          {serverError}
        </div>
      )}

      {/* Name */}
      <div>
        <label htmlFor="claimant_name"
          className="block text-sm font-medium text-navy-800 mb-1.5">
          Your Full Name <span aria-hidden="true" className="text-red-500">*</span>
        </label>
        <input
          id="claimant_name"
          type="text"
          {...register('claimant_name')}
          autoComplete="name"
          className="w-full px-3 py-2.5 border border-slate-200 rounded-sm text-sm
                     focus:outline-none focus:border-amber focus:ring-1 focus:ring-amber"
          aria-required="true"
          aria-invalid={!!errors.claimant_name}
        />
        {errors.claimant_name && (
          <p className="mt-1.5 text-sm text-red-600" role="alert">
            {errors.claimant_name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="claimant_email"
          className="block text-sm font-medium text-navy-800 mb-1.5">
          Your Email <span aria-hidden="true" className="text-red-500">*</span>
        </label>
        <input
          id="claimant_email"
          type="email"
          {...register('claimant_email')}
          autoComplete="email"
          className="w-full px-3 py-2.5 border border-slate-200 rounded-sm text-sm
                     focus:outline-none focus:border-amber focus:ring-1 focus:ring-amber"
          aria-required="true"
          aria-invalid={!!errors.claimant_email}
        />
        {errors.claimant_email && (
          <p className="mt-1.5 text-sm text-red-600" role="alert">
            {errors.claimant_email.message}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="claim-desc"
          className="block text-sm font-medium text-navy-800 mb-1.5">
          Describe how you know this is yours{' '}
          <span aria-hidden="true" className="text-red-500">*</span>
        </label>
        <p className="text-xs text-slate-500 mb-2">
          Include specific identifying details (color, brand, contents, etc.)
        </p>
        <textarea
          id="claim-desc"
          {...register('description')}
          rows={4}
          className="w-full px-3 py-2.5 border border-slate-200 rounded-sm text-sm
                     focus:outline-none focus:border-amber focus:ring-1 focus:ring-amber
                     resize-none"
          aria-required="true"
          aria-invalid={!!errors.description}
        />
        {errors.description && (
          <p className="mt-1.5 text-sm text-red-600" role="alert">
            {errors.description.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-3 bg-amber text-navy font-semibold text-sm rounded-sm
                   hover:bg-amber/90 transition-colors disabled:opacity-60
                   disabled:cursor-not-allowed"
        aria-disabled={submitting}
      >
        {submitting ? 'Submitting...' : 'Submit Claim Request'}
      </button>
    </form>
  );
}