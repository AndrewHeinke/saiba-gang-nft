import Link from "next/link";
import styles from "styles/NotificationBanner.module.scss";
import Container from "./Container";

export default function NotifcationBanner() {
  return (
    <Link href="/manga" passHref>
      <a className={styles["notification-banner"]}>
        <Container>
          <div className={styles["notification-banner-wrapper"]}>
            <p className={styles["notification-banner-message"]}>
              We launched a manga!{" "}
              <span className={styles["notification-banner-underline"]}>
                Saiba Gang Webtoons
              </span>
            </p>
          </div>
        </Container>
      </a>
    </Link>
  );
}
