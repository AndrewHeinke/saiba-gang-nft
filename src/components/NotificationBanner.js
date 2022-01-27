import styles from "styles/NotificationBanner.module.scss";
import Container from "./Container";

export default function NotifcationBanner() {
  return (
    <a
      className={styles["notification-banner"]}
      rel="noreferrer"
      target="_blank"
      href="https://www.webtoons.com/en/challenge/saiba-gang/list?title_no=722467"
    >
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
  );
}
