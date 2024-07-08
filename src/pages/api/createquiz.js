// pages/api/createQuiz.js
import prisma from "../../lib/postgres/prisma";

export default async function handler(req, res) {

  if (req.method !== 'POST') {
    await prisma.$disconnect();
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { title, description, questions } = req.body;

  try {
    const createdQuiz = await prisma.quiz.create({
      data: {
        title,
        description,
        Questions: {
          createMany: {
            data: questions.map(question => ({
              question_text: question.question_text,
              answer: question.answer,
              options: question.options,
              type: question.type
            }))
          }
        }
      },
      include: {
        Questions: true
      }
    });

    await prisma.$disconnect();
    res.status(201).json(createdQuiz);
  } catch (error) {
    console.error('Error creating quiz:', error);
    await prisma.$disconnect();
    res.status(500).json({ error: 'Failed to create quiz' });
  }
}
