import Container from "components/Container";
import { getAllTags, getPostsByTag } from "lib/graphcms";
import LoreHeader from "components/LoreHeader";
import Head from "next/head";
import PostCardList from "components/PostCardList";

export default function AllTags({ tag, posts }) {
  return (
    <>
      <Head>
        <title>{tag} | Saiba Gang NFT</title>
        <meta name="robots" content="noindex"></meta>
      </Head>
      <LoreHeader />
      <Container className="lore-page">
        <h1>{tag}</h1>
        {posts.length === 0 && (
          <p>There are currently no posts with this tag</p>
        )}
        {posts.length > 0 && <PostCardList posts={posts} withImages />}
      </Container>
    </>
  );
}

export async function getStaticProps({ params }) {
  const posts = await getPostsByTag(params.slug);
  if (!posts) {
    return {
      notFound: true,
      props: {},
    };
  } else {
    return {
      props: {
        tag: params.slug,
        posts: posts.blogPosts,
      },
      revalidate: 1,
    };
  }
}

export async function getStaticPaths() {
  const data = (await getAllTags()) || [];
  const values = data.__type;
  return {
    paths: values.enumValues.map((tag) => ({
      params: { slug: tag.name },
    })),
    fallback: "blocking",
  };
}
