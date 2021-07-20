import prisma from '../../../../lib/prisma';
import { GetServerSideProps } from 'next';

/* export default async function handle() {
  const bookReviews = await prisma.bookReview.findMany();
}

export const getServerSideProps: GetServerSideProps = async () => {
  const bookReviews = await prisma.bookReview.findMany();
  return { bookReviews };
}; */

// export const getServerSideProps: GetServerSideProps = async () => {
//   const bookReviews = await prisma.bookReview.findMany();
//   console.log(bookReviews);

//   return { bookReviews };

//   // return {
//   //   props: { bookReviews },
//   // };
// };

/**
 * @function handle api-call to book-review read endpoint
 * @param {object} req
 * @param res {json}
 * @returns {object}
 */
export default async function handle(req: object, res) {
  const bookReviews = await prisma.bookReview.findMany();

  res.json(bookReviews);
}
