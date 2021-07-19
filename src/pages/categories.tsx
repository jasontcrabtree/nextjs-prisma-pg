import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/client';
import React from 'react';
import Layout from '../components/Layout';

import Post, { PostProps } from '../components/Post';

import prisma from '../lib/prisma';

// Server side API call requesting session and drafts
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  // Get the current session
  const session = await getSession({ req });

  if (!session) {
    res.statusCode = 403;
    return { props: { drafts: [] } };
  }

  // Return all categories
  /*   const categories = await prisma.post.findMany({
    where: {
      // author: { email: session.user.email },
      published: false,
      // category: { category: true },
      // category: { category: 'React' },
    },
    // include: {
    //   author: {
    //     select: { name: true },
    //   },
    // },
  }); */

  /* TODO: Can we filter author by post author id? */
  const categories = await prisma.post.findMany({
    where: {
      // postCategoryId: 9,
      authorId: 2,
    },
    // include related records in query
    // https://www.prisma.io/docs/concepts/components/prisma-client/crud#include-related-records
    include: {
      category: true,
    },
  });

  return { props: { categories } };
};

type CategoriesProps = {
  categories: PostProps[];
};

function Categories(props: CategoriesProps) {
  const [session] = useSession();

  console.log(props);

  if (!session) {
    return (
      <Layout>
        <h1>My Categories</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page">
        <h1>My Categories</h1>
        <main>
          The number of categories is
          <h2>{props?.categories?.length}</h2>
          {/* {props.categories.map(post => (
            <div key={post.postId} className="post">
              <Post post={post} />
            </div>
          ))} */}
        </main>
      </div>
    </Layout>
  );
}

export default Categories;
