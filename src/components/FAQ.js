import styles from "styles/FAQ.module.scss";
import Collapse from "./Collapse";

export default function FAQ() {
  return (
    <div className={styles["faq-wrapper"]}>
      <Collapse title="What is the Saiba Gang?">
        <p>
          The Saiba Gang are a group of cybernetically enhanced teens living in
          Wintermoon City. Check out our Twitter and Discord for more details on
          lore.
        </p>
      </Collapse>
      <Collapse title="Where can I learn more about the Saiba Gang?">
        <p>Join us on Twitter and Discord to learn more about our project!</p>
      </Collapse>
    </div>
  );
}
