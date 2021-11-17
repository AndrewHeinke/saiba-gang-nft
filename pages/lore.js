import Container from "components/Container";
import { getAllPosts } from "lib/graphcms";
import LoreHeader from "components/LoreHeader";
import Link from "next/link";
import Head from "next/head";
import useSWR from "swr";

export default function Lore({ posts }) {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data } = useSWR("/api", fetcher, {
    fallbackData: posts,
    refreshInterval: 1000,
  });

  return (
    <>
      <Head>
        <title>Lore | Saiba Gang NFT</title>
        <meta name="robots" content="noindex"></meta>
      </Head>
      <LoreHeader />
      <Container className="lore">
        <h1>Most Recent Posts</h1>
        <ul>
          {data.map((post) => (
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
