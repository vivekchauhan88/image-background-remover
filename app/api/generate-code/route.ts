import { OpenAI } from 'openai';
import { NextRequest, NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const { imageUrl } = await req.json();

  if (!imageUrl) {
    return NextResponse.json(
      { error: 'No image URL provided.' },
      { status: 400 }
    );
  }

  try {
    // Fetch the image and convert to base64
    const imageResponse = await fetch(imageUrl);
    const imageBuffer = await imageResponse.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString('base64');
    const mimeType = imageResponse.headers.get('content-type') || 'image/png';

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful assistant that converts UI screenshots into clean, semantic React components using Tailwind CSS.',
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Convert this UI screenshot into JSX code with Tailwind classes.',
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:${mimeType};base64,${base64Image}`,
              },
            },
          ],
        },
      ],
      max_tokens: 1000,
    });

    const code = response.choices[0].message.content;
    return NextResponse.json({ code });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    );
  }
}
// This code is a Next.js API route that takes an image URL, fetches the image, converts it to base64, and sends it to OpenAI's GPT-4o model for conversion into JSX code with Tailwind CSS classes. It handles errors and returns the generated code or an error message.
