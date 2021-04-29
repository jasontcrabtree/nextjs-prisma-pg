import React from 'react';
import { GetServerSideProps } from 'next';
import ReactMarkdown from 'react-markdown';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { PostProps } from '../../components/Post';
import prisma from '../../lib/prisma';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(params?.id) || -1,
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });
  return {
    props: post,
  };
};

// const Post: React.FC<PostProps> = (props) => {

// TODO: Remove FC
const Post = (props: PostProps) => {
  // const Post: { PostProps: post } = (props) => {
  const [session, loading] = useSession();
  const router = useRouter();

  async function publishPost(id: number): Promise<void> {
    await fetch(`/api/publish/${id}`, {
      method: 'PUT',
    }).then(() => {
      router.push('/');
    });
  }

  async function deletePost(id: number): Promise<void> {
    await fetch(`/api/post/${id}`, {
      method: 'DELETE',
    }).then(() => {
      router.push('/');
    });
  }

  const userHasValidSession = Boolean(session);

  const postBelongsToUser = session?.user?.email === props.author?.email;

  let { title } = props;

  if (!props.published) {
    title = `${title} (Draft)`;
  }

  if (loading) {
    return <div>Authenticating ...</div>;
  }

  return (
    <Layout>
      <div>
        <h2>{title}</h2>
        <p>By {props?.author?.name || 'Unknown author'}</p>
        <ReactMarkdown>{props.content}</ReactMarkdown>
        {!props.published && userHasValidSession && postBelongsToUser && (
          <button type="button" onClick={() => publishPost(props.id)}>
            Publish
          </button>
        )}
        {userHasValidSession && postBelongsToUser && (
          <button type="button" onClick={() => deletePost(props.id)}>
            Delete
          </button>
        )}
      </div>
    </Layout>
  );
};

export default Post;
