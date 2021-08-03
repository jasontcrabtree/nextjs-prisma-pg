import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { FiTrash2 } from 'react-icons/fi';
import { HiPencil, HiStar } from 'react-icons/hi';
import Link from 'next/link';
import Layout from '../components/Layout';

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

type Props = {
  bookReviews: any;
  response: any;
};

// export const getServerSideProps: GetServerSideProps = async () => {
//   const res = await fetch('/api/book-review/read');

//   const response = res.json;

//   return {
//     props: {
//       response,
//     },
//   };
// };

export const getServerSideProps: GetServerSideProps = async () => {
  // const bookReviews = await prisma.bookReview.findMany();
  // return { props: { bookReviews } };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/book-review/read`,
  );

  const bookReviews = await res.json();

  return {
    props: { bookReviews },
  };
};

const CrudActions: React.FC<Props> = ({ bookReviews }) => {
  // helloWorld('Jason');

  const reviews = bookReviews;

  // const [reviews, setReviews] = useState(bookReviews);

  // console.log(reviews);

  const [bookTitle, setBookTitle] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewBody, setReviewBody] = useState('');
  const [recommended, setRecommended] = useState(false);
  const [rating, setRating] = useState(0);
  const [bookAuthor, setBookAuthor] = useState('');
  const [editReview, setEditReview] = useState(false);

  const [updateReviewSelection, setUpdateReviewSelection] = useState(0);

  const [displayUpdateUI, setdisplayUpdateUI] = useState(false);

  const [filteredResult, setFilteredResult] = useState({});

  const [updatedBookReview, setUpdatedBookReview] = useState({
    updatedBookTitle: '',
    updatedReviewTitle: '',
    updatedReviewBody: '',
    updatedRecommended: false,
    updatedRating: 0,
    updatedBookAuthor: '',
  });

  const router = useRouter();

  /**
   * @function
   * We call this whenever we update state to force revalidate serverside props.
   *
   * E.g. on create, update, delete functions
   */
  function refreshServerSide() {
    router.replace(router.asPath);
  }

  const submitBookReview = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    // console.log('Save');

    try {
      const body = {
        bookTitle,
        reviewTitle,
        reviewBody,
        recommended,
        rating,
        bookAuthor,
      };

      await fetch('/api/book-review/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      // console.log(body);
      refreshServerSide();
    } catch (error) {
      console.error(error);
    }
    // router.push('/');
  };

  async function deleteReview(id: number): Promise<void> {
    await fetch(`/api/book-review/delete/${id}`, {
      method: 'delete',
    });
    // .then(() => {
    //   router.push('/', undefined, { shallow: true });
    // });
    refreshServerSide();
  }

  /*
  1. Figure out which review has been clicked to edit
  2. Give the user a way to change editable fields
  3. Capture the changes to fields
  4. Submit the new values to the update function
  5. Refresh the displayed values
  6. Lock editing until options again until needed
  */

  async function updateReview(id: number): Promise<void> {
    // console.log(id);
    await fetch(`/api/book-review/update/${id}`, {
      method: 'post',
    });
    refreshServerSide();
  }

  function filterReviewsByID(reviews, id) {
    const filteredResult = reviews.filter(
      // (review) => review.bookReviewID === id,
      (review) => review.bookReviewID === id,
    );

    filteredResult ? filteredResult : null;

    // console.log(filteredResult);

    setFilteredResult(filteredResult);

    return filteredResult;
  }

  // filterReviewsByID(reviews, 6);

  // TODO: This function currently logs whichever child of the list we click on. I think that can be used to update the from > when the edit button is clicked, display/render an update form for that specific item, then send it to the book-review/update route
  async function updateHandler(id: number): Promise<void> {
    // console.log(id);
    setdisplayUpdateUI(!displayUpdateUI);
    setUpdateReviewSelection(id);
    filterReviewsByID(reviews, id);
    // console.log(filteredResult);
    // refreshServerSide();
  }

  // console.log(bookReviews);

  const bookReviewsArray = [bookReviews];

  // console.log(bookReviewsArray);

  const filteredById = bookReviews.find((filterID) => filterID.id === '7');

  const arrayFilteredById = bookReviewsArray.find(
    (filterID) => filterID.id === '7',
  );

  // async function deleteReview(id: number): Promise<void> {
  //   await fetch(`/api/book-review/delete/${id}`, {
  //     method: 'delete',
  //   });
  //   // .then(() => {
  //   //   router.push('/', undefined, { shallow: true });
  //   // });
  //   refreshServerSide();
  // }

  const updateBody = {
    bookTitle,
    reviewTitle,
    reviewBody,
    recommended,
    rating,
    bookAuthor,
  };

  setUpdatedBookReview;

  function updateReviewHandler(e) {
    setUpdatedBookReview({
      ...updatedBookReview,
      [e.target.name]: e.target.value,
    });
  }

  async function updateBookReview(id: number): Promise<void> {
    setdisplayUpdateUI(!displayUpdateUI);
    setUpdateReviewSelection(id);
    // console.log(id);
    await fetch(`/api/book-review/update/${id}`, {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedBookReview),
    }).then(() => {
      // router.push('/', undefined, { shallow: true });
      // refreshServerSide();
      // console.log('Updating done eh');
    });
  }

  // const result = arrayFilteredById[1].find(function (item, index, array) {
  //   console.log(item, index, array);
  // });

  // result();

  // console.log(reviews);

  // const filter = reviews.filter(() => {
  //   // (item) => item.bookReviewID < 8;
  //   // console.log(reviews);
  //   reviews.map((filteredReview) => {
  //     filteredReview.bookReviewID = 7;
  //     console.log(filteredReview);
  //   });
  // });

  // function filterItems(objectToFilter: any, args: any) {
  //   const filteredItems = objectToFilter.find(
  //     (item) => item.bookReviewID === Number(args.id),
  //   );
  //   return filteredItems;
  // }

  // const bigCities = reviews.filter((city) => city.bookReviewID === 7);
  // console.log(bigCities);

  // function filterReviews() {}
  // console.log(filter);

  // const filteredReviews = reviews
  //   .filter(function (id) {
  //     bookReviewID === 7;
  //   })
  //   .map((review) => {
  //     // console.log(review);
  //     return <li key={review.bookReviewID}>{review.reviewTitle}</li>;
  //   });

  // console.log(`the filtered reviews are:`, filteredReviews);

  // console.log(arrayFilteredById);
  // console.log(filteredById);

  function UpdateReviewForm(props: any, filteredResult) {
    // console.log(props);
    const updateIdProp = props.updateId;
    // console.log(reviews);

    // const mappedReviews = reviews.map((revi) => console.log(revi));

    // const mappedReviewsF = reviews.filter.map(
    //   (revi) => revi.bookReviewID === updateIdProp,
    // );

    // const totalJediScore = personnel
    //   .filter((person) => person.isForceUser)
    //   .map((jedi) => jedi.pilotingScore + jedi.shootingScore)
    //   .reduce((acc, score) => acc + score, 0);

    // const mapFilterReviews = reviews
    //   .filter(
    //     (filteredReviews) => filteredReviews.bookReviewID === updateIdProp,
    //   )
    //   .map((mappedFilteredReview) => console.log(mappedFilteredReview));

    // // console.log(mappedReviews);

    const updateReviewViaID = reviews.filter(
      (rev) => rev.bookReviewID === updateIdProp,
    )[0];
    console.log(updateReviewViaID);

    // console.log(filteredResult);

    // useEffect(() => {
    //   setFilteredResult(res);
    //   return () => {
    //     console.log('clean up');
    //   };
    // }, []);

    // // const rebels = pilots.filter((pilot) => pilot.faction === 'Rebels');

    // const filteredReviewUpdateID = reviews.filter(
    //   (filteredReview) => filteredReview,
    // );

    // console.log(reviews[0]);

    // console.log(typeof reviews[1]);

    // console.log(updateIdProp);

    // const filteredHomes = reviews.filter(
    //   (x) => x.bookReviewID === updateIdProp,
    // );

    // console.log(filteredHomes);

    // console.log(reviews[1]);
    // console.log(reviews);

    // console.log(filteredReviewUpdateID);

    // console.log(res);
    // const result = words.filter((word) => word.length > 6);
    // bookReviewID;
    // console.log(reviews[id]);
    // filterReviewsByID(reviews, props.updateId);
    return (
      <div className="update-form__wrapper">
        <p>Hey, we're going to update review number {props.updateId}</p>
        <form onSubmit={submitBookReview} className="review-form__wrapper">
          <label htmlFor="bookTitle">
            Book Title
            <input
              name="bookTitle"
              onChange={(e) => setBookTitle(e.target.value)}
              placeholder="Book Title"
              type="text"
              value={updateReviewViaID?.bookTitle || 'Add a new book'}
            />
          </label>
          <label htmlFor="bookAuthor">
            Author
            <input
              name="bookAuthor"
              onChange={(e) => setBookAuthor(e.target.value)}
              placeholder="Author"
              type="text"
              value={updateReviewViaID?.bookAuthor || 'Add a new book'}
            />
          </label>
          <label htmlFor="reviewTitle">
            Review Title
            <input
              name="reviewTitle"
              onChange={(e) => setReviewTitle(e.target.value)}
              placeholder="Title"
              type="text"
              value={updateReviewViaID?.reviewTitle || 'Add a new book'}
            />
          </label>
          <label htmlFor="rating">
            Rating
            <input
              type="number"
              name="rating"
              id="rating"
              value={updateReviewViaID?.rating || 'Add a new book'}
              onChange={(e) => setRating(e.target.valueAsNumber)}
            />
          </label>
          <div>
            <label htmlFor="recommended">Recommended</label>
            <input
              type="radio"
              name="recommendation"
              id="recommended"
              onChange={(e) => setRecommended(e.target.checked)}
            />
            <label htmlFor="not-recommended">Not Recommended</label>
            <input
              type="radio"
              name="recommendation"
              id="not-recommended"
              onChange={(e) => setRecommended(!e.target.checked)}
            />
          </div>
          <label htmlFor="reviewBody" className="review-form__body-input">
            Review
            <textarea
              name="reviewBody"
              cols={96}
              onChange={(e) => setReviewBody(e.target.value)}
              placeholder="Review"
              rows={4}
              value={updateReviewViaID?.reviewBody || 'Add a new book'}
            />
          </label>
          <input
            disabled={!reviewBody || !bookTitle}
            type="submit"
            value="Save Review"
          />
        </form>
      </div>
    );
  }

  // useEffect((): any => {
  //   const res = fetch('/api/book-review/read');
  //   return () => {
  //     res;
  //   };
  // }, []);

  return (
    <Layout>
      <section>
        <h1>
          A focused implementation of CRUD Actions using NextJS, Prisma and
          Typescript
        </h1>
      </section>
      <section className="reviews-list__wrapper">
        <h2>Past Reviews</h2>
        <ul className="reviews-list__list-parent">
          {reviews.map((review) => {
            // console.log(review);
            return (
              <li
                className="reviews-list__item-wrapper"
                key={review.bookReviewID}
              >
                <h3 className="reviews-list__item-title">
                  {review.reviewTitle} <span>{review.rating} Stars</span>
                  <button
                    className="btn--icon-only"
                    type="button"
                    onClick={() => deleteReview(review.bookReviewID)}
                  >
                    <FiTrash2 className="btn__feather-icon" />
                  </button>
                  <button
                    className="btn--icon-only"
                    type="button"
                    // onClick={() => updateReview(review.bookReviewID)}
                    // onClick={() => setEditReview(true)}
                    // onClick={() => updateHandler(review.bookReviewID)}
                    onClick={() => updateBookReview(review.bookReviewID)}
                  >
                    <HiPencil className="btn__feather-icon" />
                  </button>
                </h3>
                <p className="reviews-list__item-subhead">
                  {review.bookTitle} by {review.bookAuthor} |{' '}
                  {review.recommended ? <HiStar /> : 'Na'}
                </p>
                <p>{review.reviewBody}</p>
              </li>
            );
          })}
        </ul>
      </section>
      {displayUpdateUI ? (
        <UpdateReviewForm updateId={updateReviewSelection} />
      ) : null}
      <section>
        <h2>New Review</h2>
        <form onSubmit={submitBookReview} className="review-form__wrapper">
          <label htmlFor="bookTitle">
            Book Title
            <input
              name="bookTitle"
              onChange={(e) => setBookTitle(e.target.value)}
              placeholder="Book Title"
              type="text"
              value={bookTitle}
            />
          </label>
          <label htmlFor="bookAuthor">
            Author
            <input
              name="bookAuthor"
              onChange={(e) => setBookAuthor(e.target.value)}
              placeholder="Author"
              type="text"
              value={bookAuthor}
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
          <div>
            <label htmlFor="recommended">Recommended</label>
            <input
              type="radio"
              name="recommendation"
              id="recommended"
              onChange={(e) => setRecommended(e.target.checked)}
            />
            <label htmlFor="not-recommended">Not Recommended</label>
            <input
              type="radio"
              name="recommendation"
              id="not-recommended"
              onChange={(e) => setRecommended(!e.target.checked)}
            />
          </div>
          <label htmlFor="reviewBody" className="review-form__body-input">
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
