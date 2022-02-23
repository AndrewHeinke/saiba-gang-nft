import styles from "styles/UserCard.module.scss";

export default function UserCard({ isHolder, userImg, name }) {
  if (isHolder && userImg && name) {
    return (
      <div className={styles["user-card"]}>
        <img src={userImg} alt={name} className={styles["user-card-img"]} />
        <p className={styles["user-card-name"]}>{name}</p>
      </div>
    );
  } else if (isHolder === false) {
    return (
      <div className={styles["user-card"]}>
        <div className={styles["user-card-avatar-placeholder"]}></div>
        <p className={`text-dim ${styles["user-card-name"]}`}>
          No Saiba Gang NFTs in wallet
        </p>
      </div>
    );
  }
  return (
    <div className={styles["user-card"]}>
      <div className={styles["user-card-avatar-placeholder"]}></div>
      <p className={`text-dim ${styles["user-card-name"]}`}>
        No connected wallet
      </p>
    </div>
  );
}
