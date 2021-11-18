import Container from "components/Container";
import { getAllPosts } from "lib/graphcms";
import LoreHeader from "components/LoreHeader";
import Link from "next/link";
import Head from "next/head";

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
        <ul>
          {posts.map((post) => (
            <li key={post.title}>
              <Link href={`/lore/${post.slug}`} passHref>
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
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
