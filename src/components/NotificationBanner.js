import Link from "next/link";
import styles from "styles/NotificationBanner.module.scss";
import Container from "./Container";

export default function NotificationBanner() {
  return (
    <Link href="/manga" passHref>
      <a className={styles["notification-banner"]}>
        <Container>
          <div className={styles["notification-banner-wrapper"]}>
            <p className={styles["notification-banner-message"]}>
              <span className={styles["notification-banner-underline"]}>
                Explore Saiba Gang Manga!
              </span>
            </p>
          </div>
        </Container>
      </a>
    </Link>
  );
}
