'use client';

import FileUpload from './components/FileUpload';
import { useState } from 'react';

export default function Home() {
  const [imageUrl, setImageUrl] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleUpload(url: string) {
    setImageUrl(url);
    setLoading(true);
    setCode('');

    const res = await fetch('/api/generate-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageUrl: url }),
    });

    const data = await res.json();
    if (data.code) {
      setCode(data.code);
    } else {
      setCode('// Error generating code');
    }

    setLoading(false);
  }

  return (
    <main className='flex flex-col items-center p-6 min-h-screen'>
      <h1 className='text-2xl font-semibold mb-6'>Screenshot to Code</h1>
      <FileUpload onUploadComplete={handleUpload} />

      {loading && <p className='mt-6 text-gray-500'>Generating code...</p>}

      {code && (
        <pre className='mt-6 p-4 bg-gray-900 rounded w-full max-w-3xl overflow-auto text-sm'>
          {code}
        </pre>
      )}
    </main>
  );
}
