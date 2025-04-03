import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { childName, favoriteAnimal, topic } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are a children's story writer who creates engaging, educational stories with morals and values.",
        },
        {
          role: "user",
          content: `Create a short children's story about a ${favoriteAnimal} named ${childName} who learns about ${topic}. The story should be engaging, have a clear moral lesson, and be appropriate for children.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return NextResponse.json({ story: completion.choices[0].message.content });
  } catch (error) {
    console.error("Story generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate story. Please try again." },
      { status: 500 }
    );
  }
}
