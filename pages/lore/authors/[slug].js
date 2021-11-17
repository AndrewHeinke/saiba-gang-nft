import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "components/Container";
import Link from "next/link";
import Image from "next/image";
import { getAuthor, getAllAuthorsWithSlug } from "lib/graphcms";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { MarkdownComponents } from "components/MarkdownComponents";
import Head from "next/head";
import LoreHeader from "components/LoreHeader";

export default function Author({ author, bio }) {
  const router = useRouter();
  if (!router.isFallback && !author) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <div>
      <Head>
        <title>{author?.name} | Saiba Gang</title>
        <meta name="robots" content="noindex"></meta>
      </Head>
      <LoreHeader />
      <Container>
        <div className="author-bio-wrapper">
          <Image
            src={author?.photo.url}
            alt=""
            width={300}
            height={300}
            layout="fixed"
          />
          <div>
            <h1>{author?.name}</h1>
            {bio && <MDXRemote {...bio} components={MarkdownComponents} />}
          </div>
        </div>

        {author?.blogPosts?.length > 0 && (
          <div>
            <h2>Posts by this author</h2>
            <ul className="author-posts-list">
              {author.blogPosts.map((post) => (
                <li key={post.title}>
                  <Link href={`/lore/${post.slug}`} passHref>
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const data = await getAuthor(params.slug);
  const mdxSource = await serialize(data.author.bio.markdown);
  return {
    props: {
      author: data.author,
      bio: mdxSource,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const authors = await getAllAuthorsWithSlug();
  return {
    paths: authors.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: true,
  };
}
