import styles from "styles/NotificationBanner.module.scss";
import Container from "./Container";

export default function NotifcationBanner() {
  return (
    <div className={styles["notification-banner"]}>
      <Container>
        <div className={styles["notification-banner-wrapper"]}>
          <p className={styles["notification-banner-message"]}>
            We launched a manga! Check out our Webtoons dashboard to stay
            updated on the latest episodes!
          </p>
          <a
            className={styles["notification-banner-link"]}
            rel="noreferrer"
            target="_blank"
            href="https://www.webtoons.com/en/challenge/saiba-gang/list?title_no=722467"
          >
            View Webtoons
          </a>
        </div>
      </Container>
    </div>
  );
}
