import prisma from '../../../../lib/prisma';

export default async function handleUpdate(req, res) {
  // const reqID = req.id
  const reqID = req.query.id;

  console.log('[Update params]', 'ID:', reqID, 'Req.Body:', req.body);

  const updateBookReview = await prisma.bookReview.update({
    where: { bookReviewID: Number(reqID) },
    data: {},
  });

  res.json(updateBookReview);
}
