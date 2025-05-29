'use client';

import FileUpload from './components/FileUpload';
import { useState } from 'react';

export default function Home() {
  const [imageUrl, setImageUrl] = useState('');
  const [processedUrl, setProcessedUrl] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleUpload(url: string) {
    setImageUrl(url);
    setLoading(true);
    setProcessedUrl('');

    const res = await fetch('/api/remove-background', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageUrl: url }),
    });

    const blob = await res.blob();
    const outputUrl = URL.createObjectURL(blob);
    setProcessedUrl(outputUrl);
    setLoading(false);
  }

  return (
    <main className='flex flex-col items-center p-6 min-h-screen'>
      <h1 className='text-2xl font-semibold mb-6'>Image Background Remover</h1>
      <FileUpload onUploadComplete={handleUpload} />

      {loading && <p className='mt-6 text-gray-500'>Processing image...</p>}

      {processedUrl && (
        <div className='mt-6'>
          <h2 className='text-lg mb-2'>Result:</h2>
          <img
            src={processedUrl}
            alt='Background removed'
            className='max-w-full'
          />
        </div>
      )}
    </main>
  );
}
