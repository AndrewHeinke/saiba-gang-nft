import Container from "components/Container";
import Link from "next/link";
import Image from "next/image";
import { getPost, getAllPostsWithSlug } from "lib/graphcms";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { MarkdownComponents } from "components/MarkdownComponents";
import Head from "next/head";
import LoreHeader from "components/LoreHeader";
import AuthorLink from "components/AuthorLink";
import moment from "moment";

export default function Post({ post, content }) {
  const formattedTime = moment(post?.publishedAt).format("MMM DD, YYYY");

  return (
    <div>
      <Head>
        <title>{post?.title} | Saiba Gang</title>
        <meta name="robots" content="noindex"></meta>
      </Head>
      <LoreHeader />
      <Container>
        <h1 className="post-title">{post?.title}</h1>
      </Container>

      {post?.heroImage?.url && (
        <div className="post-img-wrapper">
          <Image
            src={post.heroImage.url}
            alt=""
            layout="fill"
            objectFit="cover"
            objectPosition="center center"
            priority
          />
        </div>
      )}
      <div className="author-wrapper-container">
        <div className="author-wrapper">
          {!post.authors[0] ? (
            <AuthorLink
              name="Saiba Gang Team"
              role="author"
              imgSrc="https://media.graphcms.com/iqoTOz3KSHqHEyADFPRA"
            />
          ) : (
            <AuthorLink
              imgSrc={post.authors[0].photo.url}
              name={post?.authors[0]?.name}
              slug={post?.authors[0]?.slug}
              role="author"
            />
          )}
          <p className="published-date">{formattedTime}</p>
        </div>
      </div>

      <Container className="post-wrapper">
        {content && (
          <div className="post-content">
            <MDXRemote {...content} components={MarkdownComponents} />
          </div>
        )}
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
    fallback: "blocking",
  };
}
