'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';

interface ImageUploadProps {
  onFileSelect: (file: File | null) => void;
  error?: string;
}

export default function ImageUpload({ onFileSelect, error }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const processFile = (file: File) => {
    // Validate file type client-side
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a JPEG, PNG, or WebP image.');
      return;
    }
    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be under 5MB.');
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);
    onFileSelect(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const removeImage = () => {
    setPreview(null);
    onFileSelect(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleChange}
        className="sr-only"
        id="image-upload"
        aria-label="Upload item photo"
      />

      {preview ? (
        // Image preview
        <div className="relative rounded-sm overflow-hidden border border-slate-200">
          <div className="relative aspect-[16/9]">
            <Image
              src={preview}
              alt="Preview of selected item image"
              fill
              className="object-cover"
            />
          </div>
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-2 right-2 w-8 h-8 bg-navy/80 text-white
                       rounded-sm flex items-center justify-center
                       hover:bg-navy transition-colors"
            aria-label="Remove selected image"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 2l10 10M12 2L2 12" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      ) : (
        // Drop zone
        <label
          htmlFor="image-upload"
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center gap-3 p-10
                      border-2 border-dashed rounded-sm cursor-pointer
                      transition-colors duration-150
                      ${dragOver
                        ? 'border-amber bg-amber-50'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                      }
                      ${error ? 'border-red-300' : ''}`}
          aria-describedby={error ? 'image-error' : undefined}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <rect x="2" y="6" width="28" height="20" rx="2"
                  stroke="#94a3b8" strokeWidth="1.5" />
            <circle cx="11" cy="14" r="3" stroke="#94a3b8" strokeWidth="1.5" />
            <path d="M2 22l7-6 6 5 5-4 10 7" stroke="#94a3b8"
                  strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
          <div className="text-center">
            <p className="text-sm font-medium text-navy-800">
              Drop image here or{' '}
              <span className="text-amber underline underline-offset-2">browse</span>
            </p>
            <p className="text-xs text-slate-400 mt-1">
              JPEG, PNG, or WebP, up to 5MB
            </p>
          </div>
        </label>
      )}

      {error && (
        <p id="image-error" className="mt-1.5 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}