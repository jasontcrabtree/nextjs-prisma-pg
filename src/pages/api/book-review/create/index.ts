/*

This code implements the handler function for any requests coming in at the /api/post/ route. The implementation does the following: First it extracts the title and cotent from the body of the incoming HTTP POST request. After that, it checks whether the request is coming from an authenticated user with the getSession helper function from NextAuth.js. And finally, it uses Prisma Client to create a new Post record in the database.

IMPORTANT DETAILS-

- getSession method from next-auth to verify user and associate with user author
- prisma.post is a method on the Post schema type
- prisma.[x].create is a method to create (CRUD) on our database
- pass the result data on the body
- Uses NextJS API route magic

*/

// import { getSession } from 'next-auth/client';
import prisma from '../../../../lib/prisma';

const db = prisma;

export default async function handle(req, res) {
  console.log(req.body);

  const {
    bookTitle,
    reviewTitle,
    reviewBody,
    recommended,
    rating,
    bookAuthor,
  } = req.body;
  //   const session = await getSession({ req });

  const bookReview = await db.bookReview.create({
    data: {
      bookTitle,
      reviewTitle,
      reviewBody,
      recommended,
      rating,
      bookAuthor,
    },
  });

  res.json(bookReview);
}
