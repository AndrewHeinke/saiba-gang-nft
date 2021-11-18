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
      <div className="post-img-wrapper">
        {post?.heroImage?.url && (
          <Image
            src={post.heroImage.url}
            alt=""
            layout="fill"
            objectFit="cover"
          />
        )}
      </div>
      <Container className="lore">
        <div className="author-wrapper">
          <Link href={`/lore/authors/${post?.authors[0]?.slug}`} passHref>
            <a className="author-link">
              {post?.authors[0]?.photo?.url && (
                <Image
                  src={post.authors[0].photo.url}
                  className="author-img"
                  alt={`${post?.authors[0]?.name} - Saiba Gang Author`}
                  width={40}
                  height={40}
                  layout="fixed"
                />
              )}
              <div>
                <span className="author-rank">Author</span>
                <p>{post?.authors[0]?.name}</p>
              </div>
            </a>
          </Link>
          <p className="published-date">{formattedTime}</p>
        </div>
        {content && (
          <div className="lore-content">
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
