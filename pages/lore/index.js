import Container from "components/Container";
import { getAllPosts } from "lib/graphcms";
import LoreHeader from "components/LoreHeader";
import Head from "next/head";
import PostCardList from "components/PostCardList";

export default function Lore({ posts }) {
  return (
    <>
      <Head>
        <title>Lore | Saiba Gang NFT</title>
        <meta name="robots" content="noindex"></meta>
      </Head>
      <LoreHeader />
      <Container className="lore-page">
        <h1>Most Recent Posts</h1>
        <PostCardList posts={posts} withImages orientation="vertical" />
      </Container>
    </>
  );
}

export async function getStaticProps() {
  const posts = (await getAllPosts()) || [];
  return {
    props: { posts },
    revalidate: 1,
  };
}
