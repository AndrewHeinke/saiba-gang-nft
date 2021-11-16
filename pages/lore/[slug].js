import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "components/Container";
import Link from "next/link";
import styles from "styles/Header.module.scss";
import { Twitter, Discord, Medium } from "../../src/components/Icons";
import Image from "next/image";
import LogoImg from "../../public/images/logo.png";
import { getPost, getAllPostsWithSlug } from "lib/graphcms";

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

export default function Post({ post }) {
  const router = useRouter();

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  const content = () => {
    return { __html: post.content.html };
  };

  return (
    <div>
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
        <Link href="/lore" passHref>
          Back to main lore page
        </Link>
        <div className="post-img-wrapper">
          <Image
            src={post.heroImage.url}
            alt=""
            layout="fill"
            objectFit="contain"
          />
        </div>

        <h1>{post.title}</h1>
        <div className="author-wrapper">
          <Image
            src={post.authors[0].photo.url}
            alt=""
            width={44}
            height={44}
            layout="fixed"
          />
          <div>
            <p>Written By: {post.authors[0].name}</p>
            <p>{post.publishedAt}</p>
          </div>
        </div>
        <div className="post-content" dangerouslySetInnerHTML={content()} />
      </Container>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const data = await getPost(params.slug);
  return {
    props: {
      post: data.blogPost,
    },
  };
}

export async function getStaticPaths() {
  const posts = await getAllPostsWithSlug();
  return {
    paths: posts.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: true,
  };
}
