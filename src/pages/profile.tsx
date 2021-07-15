import React from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import Layout from '../components/Layout';
import prisma from '../lib/prisma';
import { PostProps } from '../components/Post';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });

  const feed = await prisma.post.findMany({
    where: {
      postProfileId: 2,
    },
  });
  return { props: { feed } };
};

type Props = {
  feed: PostProps[];
};

// TODO: Remove FC
const Profile: React.FC<Props> = ({ feed }) => {
  console.log(feed);
  return (
    <Layout>
      <section>
        <h1>Test</h1>
      </section>
      <section>
        {feed.map((profileTest) => (
          <div key={profileTest.postId}>{profileTest.title}</div>
        ))}
      </section>
    </Layout>
  );
};

export default Profile;
