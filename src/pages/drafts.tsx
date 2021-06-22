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

  // Return drafts associated with the author session email
  const drafts = await prisma.post.findMany({
    where: {
      author: { email: session.user.email },
      published: false,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return { props: { drafts } };
};

type DraftPostProps = {
  drafts: PostProps[];
};

function Drafts(props: DraftPostProps) {
  const [session] = useSession();

  console.log(props);

  if (!session) {
    return (
      <Layout>
        <h1>My Drafts</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page">
        <h1>My Drafts</h1>
        <main>
          {props.drafts.map((post) => (
            <div key={post.postId} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
    </Layout>
  );
}

export default Drafts;
