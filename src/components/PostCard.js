import Link from "next/link";
import styles from "styles/PostCard.module.scss";
import Tags from "components/Tags";
import Image from "next/image";

const PostCard = ({
  post,
  as: Component = "div",
  image = false,
  orientation = "horizontal",
}) => {
  return (
    <Component
      className={`${styles["post-card"]} ${
        orientation === "hoizontal" ? "horizontal" : "vertical"
      }`}
    >
      {image && (
        <Link href={`/lore/${post.slug}`} passHref>
          <a className={styles["post-card-image"]}>
            <Image
              layout="fill"
              objectFit="cover"
              src={post.heroImage.url}
              alt=""
            />
          </a>
        </Link>
      )}
      <div className={styles["post-card-content"]}>
        <Link href={`/lore/${post.slug}`}>{post.title}</Link>
        {post.tags && <Tags tags={post.tags} />}
      </div>
    </Component>
  );
};

export default PostCard;
