import Layout from '../components/Layout';
import prisma from '../lib/prisma';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

type Props = {};

/*
  TODO
  This page is a test case for a simple set of CRUD actions using prisma and nextjs api routes

  Actions:
  CREATE: Create a new item

  READ: Read the single item

  UPDATE: Update the single item

  DELETE: Delete the item when done

  For simplicity sake, we will work on a single model item with no connections. We're gonna use a book-review as the model

  BookReview
  - Create BookReview (id 1)
  - Read BookReview (id 1)
  - Update BookReview (id 1)
  - Delete BookReview (id 1)
*/

/**
 * Represents a message
 * @constructor
 * @param {string} person - The person receiving the message
 * */
function helloWorld(person: string): void {
  console.log(`Hello, ${person}!`);
}

/**
 * @constructor
 * @param
 * @returns
 */
// const bookReview = await prisma.bookReview.create({})

const CrudActions: React.FC<Props> = () => {
  helloWorld('Jason');

  const [bookTitle, setBookTitle] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewBody, setReviewBody] = useState('');
  const [recommended, setRecommended] = useState(false);
  const [rating, setRating] = useState(0);
  const [author, setAuthor] = useState('');

  const router = useRouter();

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log('Save');
    try {
      const body = {
        bookTitle,
        reviewTitle,
        reviewBody,
        recommended,
        rating,
        author,
      };

      await fetch('/api/bookReview/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      console.log(body);
    } catch (error) {
      console.error(error);
    }
    router.push('/');
  };

  return (
    <Layout>
      <section>
        <h1>
          A focused implementation of CRUD Actions using NextJS, Prisma and
          Typescript
        </h1>
      </section>
      <section>
        <form onSubmit={submitData}>
          <h1>Book Review</h1>
          <label htmlFor="bookTitle">
            Book Title
            <input
              name="bookTitle"
              onChange={(e) => setBookTitle(e.target.value)}
              placeholder="bookTitle"
              type="text"
              value={bookTitle}
            />
          </label>
          <label htmlFor="author">
            Author
            <input
              name="author"
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Author"
              type="text"
              value={author}
            />
          </label>
          <label htmlFor="reviewTitle">
            Review Title
            <input
              name="reviewTitle"
              onChange={(e) => setReviewTitle(e.target.value)}
              placeholder="Title"
              type="text"
              value={reviewTitle}
            />
          </label>
          <label htmlFor="rating">
            Rating
            <input
              type="number"
              name="rating"
              id="rating"
              value={rating}
              onChange={(e) => setRating(e.target.valueAsNumber)}
            />
          </label>
          <label htmlFor="recommended">
            Recommended
            <input
              type="checkbox"
              name="recommended"
              id="recommended"
              onChange={(e) => setRecommended(e.target.defaultChecked)}
            />
          </label>
          <label htmlFor="reviewBody">
            Review
            <textarea
              name="reviewBody"
              cols={96}
              onChange={(e) => setReviewBody(e.target.value)}
              placeholder="Review"
              rows={4}
              value={reviewBody}
            />
          </label>
          <input
            disabled={!reviewBody || !bookTitle}
            type="submit"
            value="Save Review"
          />
          <Link href="/">Delete Review</Link>
        </form>
      </section>
    </Layout>
  );
};

export default CrudActions;
