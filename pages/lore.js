import Container from "components/Container";
import styles from "styles/Header.module.scss";
import { Twitter, Discord, Medium } from "../src/components/Icons";
import Image from "next/image";
import LogoImg from "../public/images/logo.png";
import { getAllPosts } from "lib/graphcms";
import Link from "next/link";
import Head from "next/head";

const Logo = ({ ...restOfProps }) => (
  <div tabIndex={0} className={styles["header-logo"]} {...restOfProps}>
    <Image
      src={LogoImg}
      priority={true}
      alt="Saiba Gang Logo"
      layout="responsive"
      width={800}
      height={342}
    />
  </div>
);

export default function Lore({ posts }) {
  return (
    <>
      <Head>
        <title>Lore | Saiba Gang NFT</title>
      </Head>
      <header className={styles["header"]}>
        <div className={styles["header-container"]}>
          <Link href="/" passHref>
            <a>
              <Logo />
            </a>
          </Link>

          <div className={styles["header-social-section"]}>
            <a
              href="https://medium.com/@saibagang"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Medium className={styles["header-link-social"]} />
            </a>
            <a
              href="https://twitter.com/SaibaGang"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className={styles["header-link-social"]} />
            </a>
            <a
              href="https://discord.gg/aRPTxj5FMA"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Discord className={styles["header-link-social"]} />
            </a>
          </div>
        </div>
      </header>
      <Container className="lore">
        <h1>Saiba Gang Lore</h1>
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
  };
}
