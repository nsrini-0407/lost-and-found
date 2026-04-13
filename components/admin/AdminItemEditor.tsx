'use client';

import { useState } from 'react';

interface AdminItemEditorProps {
  itemId: string;
  initialDescription: string;
}

export default function AdminItemEditor({
  itemId,
  initialDescription,
}: AdminItemEditorProps) {
  const [description, setDescription] = useState(initialDescription);
  const [editing, setEditing]         = useState(false);
  const [draft, setDraft]             = useState(initialDescription);
  const [saving, setSaving]           = useState(false);
  const [error, setError]             = useState<string | null>(null);
  const [saved, setSaved]             = useState(false);

  const handleEdit = () => {
    setDraft(description);
    setEditing(true);
    setSaved(false);
    setError(null);
  };

  const handleCancel = () => {
    setDraft(description);
    setEditing(false);
    setError(null);
  };

  const handleSave = async () => {
    if (!draft.trim()) {
      setError('Description cannot be empty.');
      return;
    }
    if (draft.trim().length < 10) {
      setError('Description must be at least 10 characters.');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/items/${itemId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: draft.trim() }),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error ?? 'Failed to save');
      }

      setDescription(draft.trim());
      setEditing(false);
      setSaved(true);

      // Clear saved confirmation after 3 seconds
      setTimeout(() => setSaved(false), 3000);

    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An error occurred. Please try again.'
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-sm p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
          Description
        </h2>

        <div className="flex items-center gap-2">
          {/* Saved confirmation */}
          {saved && (
            <span className="text-xs text-teal-600 font-medium flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 6l3 3 5-5" stroke="currentColor"
                      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Saved
            </span>
          )}

          {!editing ? (
            <button
              onClick={handleEdit}
              className="inline-flex items-center gap-1.5 px-3 py-1.5
                         text-xs font-medium text-slate-600 border border-slate-200
                         rounded-sm hover:bg-slate-50 hover:border-slate-300
                         transition-colors"
              aria-label="Edit description"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M8 2l2 2-6 6H2V8l6-6z" stroke="currentColor"
                      strokeWidth="1.2" strokeLinejoin="round" />
              </svg>
              Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                disabled={saving}
                className="px-3 py-1.5 text-xs font-medium text-slate-600
                           border border-slate-200 rounded-sm hover:bg-slate-50
                           transition-colors disabled:opacity-50"
                aria-label="Cancel editing"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-3 py-1.5 text-xs font-semibold text-navy
                           bg-amber rounded-sm hover:bg-amber/90
                           transition-colors disabled:opacity-60"
                aria-label="Save description"
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div
          className="mb-3 p-2.5 bg-red-50 border border-red-200 rounded-sm
                     text-xs text-red-700"
          role="alert"
        >
          {error}
        </div>
      )}

      {/* Description display or edit */}
      {editing ? (
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={6}
          className="w-full px-3 py-2.5 border border-slate-200 rounded-sm
                     text-sm text-slate-700 leading-relaxed resize-none
                     focus:outline-none focus:border-amber focus:ring-1
                     focus:ring-amber"
          aria-label="Edit item description"
          autoFocus
        />
      ) : (
        <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
          {description}
        </p>
      )}

      {/* Character count while editing */}
      {editing && (
        <p className="mt-1.5 text-xs text-slate-400 text-right">
          {draft.length} / 1000 characters
        </p>
      )}
    </div>
  );
}