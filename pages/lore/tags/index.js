import Container from "components/Container";
import { getAllTags } from "lib/graphcms";
import Link from "next/link";
import LoreHeader from "components/LoreHeader";
import Head from "next/head";
import humanize from "utils/humanize";

export default function AllTags({ tags }) {
  return (
    <>
      <Head>
        <title>Tags | Saiba Gang NFT</title>
        <meta name="robots" content="noindex"></meta>
      </Head>
      <LoreHeader />
      <Container className="lore-page">
        <h1>Tags</h1>
        <ul>
          {tags.map((tag) => {
            return (
              <li key={tag}>
                <Link href={`/lore/tags/${tag.name}`}>
                  {humanize(tag.name)}
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </>
  );
}

export async function getStaticProps() {
  const data = (await getAllTags()) || [];
  const values = data.__type;

  return {
    props: {
      tags: values.enumValues,
    },
    revalidate: 1,
  };
}
