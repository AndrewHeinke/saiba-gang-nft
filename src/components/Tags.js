import Link from "next/link";
import styles from "styles/Tags.module.scss";

const Tags = ({ tags = [] }) => {
  return (
    <div className={styles["tags"]}>
      {tags.map((tag) => (
        <Link key={tag} href={`/lore/tags/${tag}`}>
          {tag}
        </Link>
      ))}
    </div>
  );
};

export default Tags;
