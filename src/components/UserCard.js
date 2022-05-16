import styles from "styles/UserCard.module.scss";
import Image from "next/image";

export default function UserCard({ isHolder, userImg, name, loading }) {
  if (isHolder && name) {
    return (
      <div className={styles["user-card"]}>
        {userImg ? (
          <Image
            src={userImg}
            alt={name}
            className={styles["user-card-img"]}
            priority
            width={75}
            height={75}
          />
        ) : (
          <div className={styles["user-card-avatar-placeholder"]}></div>
        )}
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
