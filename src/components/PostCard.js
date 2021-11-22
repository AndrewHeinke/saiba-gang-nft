import Link from "next/link";
import styles from "styles/PostCard.module.scss";
import Tags from "components/Tags";
import Image from "next/image";
import classNames from "classnames";

const PostCard = ({
  post,
  as: Component = "div",
  image = false,
  orientation = "horizontal",
}) => {
  const classes = classNames(
    styles["post-card"],
    styles[`post-card--${orientation}`]
  );

  return (
    <Component className={classes}>
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
        {orientation === "vertical" && (
          <div className={styles["post-card-spacer"]}></div>
        )}
        {post.tags && <Tags tags={post.tags} />}
      </div>
    </Component>
  );
};

export default PostCard;
