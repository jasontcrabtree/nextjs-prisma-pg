import prisma from '../../../../lib/prisma';

export default async function handle(req, res) {
  /**
   * @param id passed via url
   */
  const bookReviewID = req.query.id;

  if (req.method === 'DELETE') {
    /**
     * when the request method *delete* is called, call the prisma delete function for the
     * passed in ID
     */
    const bookReview = await prisma.bookReview.delete({
      //  where: {
      //   id: Number(bookReviewID)
      // },
      where: {
        bookReviewID: Number(bookReviewID),
      },
    });
    /**
     * Return the deleted item
     */
    res.json(bookReview);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route`,
    );
  }
}
