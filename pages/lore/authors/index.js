import AuthorLink from "components/AuthorLink";
import Head from "next/head";
import LoreHeader from "components/LoreHeader";
import Container from "components/Container";
import { getAllAuthorsWithSlug } from "lib/graphcms";

export default function Authors({ authors }) {
  return (
    <div>
      <Head>
        <title>Author List | Saiba Gang</title>
        <meta name="robots" content="noindex"></meta>
      </Head>
      <LoreHeader />
      <Container className="lore-page">
        <h1>Authors of Saiba Gang</h1>
        <div className="authors-list">
          {authors.map((author) => (
            <AuthorLink
              key={author.name}
              imgSrc={author.photo.url}
              name={author.name}
              slug={author.slug}
              imgSize={100}
              textSizeLg
            />
          ))}
        </div>
      </Container>
    </div>
  );
}

export async function getStaticProps() {
  const data = await getAllAuthorsWithSlug();

  if (!data) {
    return {
      notFound: true,
      props: {},
    };
  } else {
    return {
      props: {
        authors: data,
      },
      revalidate: 1,
    };
  }
}
