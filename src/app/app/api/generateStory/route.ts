import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function isArabic(text: string): boolean {
  return /[\u0600-\u06FF]/.test(text);
}

export async function POST(req: Request) {
  try {
    const { childName, favoriteAnimal, topic } = await req.json();

    const isArabicInput =
      isArabic(childName) || isArabic(favoriteAnimal) || isArabic(topic);
    const language = isArabicInput ? "Arabic" : "English";

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: isArabicInput
            ? "أنت كاتب قصص أطفال تكتب قصصًا تعليمية ممتعة باللغة العربية مع قيم وأخلاق."
            : "You are a children's story writer who creates engaging, educational stories with morals and values.",
        },
        {
          role: "user",
          content: isArabicInput
            ? `اكتب قصة قصيرة للأطفال عن ${favoriteAnimal}، الطفل اسمه ${childName} الذي يتعلم عن ${topic}. يجب أن تكون القصة جذابة، بها درس أخلاقي واضح ومناسبة للأطفال.`
            : `Create a short children's story about a ${favoriteAnimal}, featuring ${childName} who learns about ${topic}. The story should be engaging, have a clear moral lesson, and be appropriate for children.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return NextResponse.json({
      story: completion.choices[0].message.content,
      isArabic: isArabicInput,
    });
  } catch (error) {
    console.error("Story generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate story. Please try again." },
      { status: 500 }
    );
  }
}
