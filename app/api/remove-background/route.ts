export async function POST(req: Request) {
  const { imageUrl } = await req.json();
  const response = await fetch(imageUrl);
  const blob = await response.blob();

  const rembgResponse = await fetch('http://127.0.0.1:8000/remove-bg', {
    method: 'POST',
    body: blob,
    headers: {
      'Content-Type': blob.type,
    },
  });

  const buffer = await rembgResponse.arrayBuffer();

  return new Response(buffer, {
    headers: {
      'Content-Type': 'image/png',
    },
  });
}
