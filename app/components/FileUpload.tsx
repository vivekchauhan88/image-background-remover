'use client';

import { UploadButton } from '@uploadthing/react';
import type { OurFileRouter } from '@/app/api/uploadthing/core';
import { useState } from 'react';

export default function FileUpload({
  onUploadComplete,
}: {
  onUploadComplete: (url: string) => void;
}) {
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <div className='flex flex-col items-center gap-4'>
      <UploadButton<OurFileRouter, any>
        endpoint='imageUploader'
        onClientUploadComplete={(res) => {
          const imageUrl = res?.[0]?.url;
          if (imageUrl) {
            setPreview(imageUrl);
            onUploadComplete(imageUrl);
          }
        }}
        onUploadError={(err) => alert(`Upload error: ${err.message}`)}
      />

      {preview && (
        <div className='mt-4'>
          <p className='text-sm mb-2 text-gray-500'>Preview:</p>
          <img
            src={preview}
            alt='Uploaded UI'
            className='max-w-md rounded border shadow'
          />
        </div>
      )}
    </div>
  );
}
