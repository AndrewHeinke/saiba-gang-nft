import Container from "components/Container";
import Link from "next/link";
import Image from "next/image";
import { getPost, getAllPostsWithSlug } from "lib/graphcms";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { MarkdownComponents } from "components/MarkdownComponents";
import Head from "next/head";
import LoreHeader from "components/LoreHeader";
import useSWR from "swr";
import moment from "moment";

export default function Post({ post, content }) {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data } = useSWR(["/api/get-post", post.slug], fetcher, {
    fallbackData: post,
  });

  const formattedTime = moment(data?.publishedAt).format("MMMM DD, YYYY");

  return (
    <div>
      <Head>
        <title>{data?.title} | Saiba Gang</title>
        <meta name="robots" content="noindex"></meta>
      </Head>
      <LoreHeader />
      <Container className="lore">
        <Link href="/lore" passHref>
          Back to main lore page
        </Link>
        <div className="post-img-wrapper">
          {data?.heroImage?.url && (
            <Image
              src={data.heroImage.url}
              alt=""
              layout="fill"
              objectFit="contain"
            />
          )}
        </div>

        <h1>{data?.title}</h1>
        <div className="author-wrapper">
          {data?.authors[0]?.photo?.url && (
            <Image
              src={data.authors[0].photo.url}
              alt=""
              width={44}
              height={44}
              layout="fixed"
            />
          )}

          <Link href={`/lore/authors/${data?.authors[0]?.slug}`} passHref>
            <a>Written By: {data?.authors[0]?.name}</a>
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
      revalidate: 5,
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
