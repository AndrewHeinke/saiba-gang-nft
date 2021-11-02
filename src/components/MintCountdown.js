import styles from "styles/MintCountdown.module.scss";
import Countdown from "react-countdown";

const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    return (
      <p className={styles["mint-countdown-completed"]}>
        Minting is live!{" "}
        <a
          rel="noreferrer"
          target="_blank"
          href="https://saiba-gang.mint-nfts.page/"
          className={styles["mint-countdown-button"]}
        >
          Saiba Gang Mint →
        </a>
      </p>
    );
  } else {
    let tempHour =
      hours.toString().length === 1 ? "0" + hours.toString() : hours;
    let tempMin =
      minutes.toString().length === 1 ? "0" + minutes.toString() : minutes;
    let tempSec =
      seconds.toString().length === 1 ? "0" + seconds.toString() : seconds;

    return (
      <div className="box">
        <div className="countdown-column">
          <div className="countdown-number">{days}</div>
          <div className="countdown-word">Days</div>
        </div>
        <div className="countdown-colon">:</div>
        <div className="countdown-column">
          <div className="countdown-number">{tempHour}</div>
          <div className="countdown-word">Hours</div>
        </div>
        <div className="countdown-colon">:</div>
        <div className="countdown-column">
          <div className="countdown-number">{tempMin}</div>
          <div className="countdown-word">Mins</div>
        </div>
        <div className="countdown-colon">:</div>
        <div className="countdown-column">
          <div className="countdown-number">{tempSec}</div>
          <div className="countdown-word">Secs</div>
        </div>
      </div>
    );
  }
};

export default function MintCountdown() {
  return (
    <div className={styles["mint-countdown"]}>
      <p className={styles["mint-countdown-title"]}>Mint Countdown</p>
      <div className={styles["mint-countdown-wrapper"]}>
        <Countdown date="01 Nov 2021 18:00:00 UTC" renderer={renderer} />
      </div>
    </div>
  );
}
