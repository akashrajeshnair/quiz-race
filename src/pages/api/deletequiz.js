import prisma from "../../lib/postgres/prisma";

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { q_id } = req.body;

    try {
      const deletedQuiz = await prisma.quiz.delete({
        where: {
            q_id: q_id
        }
      });

      res.status(200).json({ deletedQuiz });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while deleting the quiz: has statistics associated with it.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
