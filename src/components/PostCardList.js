import styles from "styles/PostCardList.module.scss";
import PostCard from "components/PostCard";

const PostCardList = ({ posts, withImages = false }) => {
  return (
    <ul className={styles["post-card-list"]}>
      {posts.map((post) => (
        <PostCard as="li" key={post.title} post={post} image={withImages} />
      ))}
    </ul>
  );
};

export default PostCardList;
