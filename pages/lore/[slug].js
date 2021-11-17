import Container from "components/Container";
import Link from "next/link";
import Image from "next/image";
import { getPost, getAllPostsWithSlug } from "lib/graphcms";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { MarkdownComponents } from "components/MarkdownComponents";
import Head from "next/head";
import LoreHeader from "components/LoreHeader";
import moment from "moment";

export default function Post({ post, content }) {
  const formattedTime = moment(post?.publishedAt).format("MMMM DD, YYYY");

  return (
    <div>
      <Head>
        <title>{post?.title} | Saiba Gang</title>
        <meta name="robots" content="noindex"></meta>
      </Head>
      <LoreHeader />
      <Container className="lore">
        <Link href="/lore" passHref>
          Back to main lore page
        </Link>
        <div className="post-img-wrapper">
          {post?.heroImage?.url && (
            <Image
              src={post.heroImage.url}
              alt=""
              layout="fill"
              objectFit="contain"
            />
          )}
        </div>

        <h1>{post?.title}</h1>
        <div className="author-wrapper">
          {post?.authors[0]?.photo?.url && (
            <Image
              src={post.authors[0].photo.url}
              alt=""
              width={44}
              height={44}
              layout="fixed"
            />
          )}

          <Link href={`/lore/authors/${post?.authors[0]?.slug}`} passHref>
            <a>Written By: {post?.authors[0]?.name}</a>
          </Link>
          <p>{formattedTime}</p>
        </div>
        {content && <MDXRemote {...content} components={MarkdownComponents} />}
      </Container>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const data = await getPost(params.slug);
  if (!data.blogPost) {
    return {
      notFound: true,
      props: {
        post: null,
        content: null,
      },
    };
  } else {
    const mdxSource = await serialize(data.blogPost.content.markdown);
    return {
      props: {
        post: data.blogPost,
        content: mdxSource,
      },
      revalidate: 1,
    };
  }
}

export async function getStaticPaths() {
  const posts = await getAllPostsWithSlug();
  return {
    paths: posts.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: false,
  };
}
