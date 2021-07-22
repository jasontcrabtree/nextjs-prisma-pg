import prisma from '../../../../lib/prisma';

export default async function handleUpdate(req, res) {
  // const reqID = req.id
  const reqID = req.query.id;

  console.log(req);

  const updateBookReview = await prisma.bookReview.update({
    where: { bookReviewID: Number(reqID) },
    data: {},
  });

  res.json(updateBookReview);
}
