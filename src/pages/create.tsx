/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Layout from '../components/Layout';

const Draft = () => {
  // State defines the types for our state items (string)
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const router = useRouter();

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    console.log('Save');

    try {
      const body = { title, content };
      await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      console.log(body);
    } catch (error) {
      console.error(error);
    }

    router.push('/drafts');
  };

  return (
    <Layout>
      <div>
        <form onSubmit={submitData}>
          <h1>New Draft</h1>
          <input
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            value={title}
          />
          <textarea
            cols={64}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            rows={8}
            value={content}
          />
          <input disabled={!content || !title} type="submit" value="Create" />
          {/* <a className="back" href="#" onClick={() => router.push('/')}>
            or Cancel
          </a> */}
          <Link href="/">Cancel</Link>
        </form>
      </div>
    </Layout>
  );
};

export default Draft;
