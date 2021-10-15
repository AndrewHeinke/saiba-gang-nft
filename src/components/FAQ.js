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
      <Collapse title="When is the launch?">
        <p>The launch will be at the end of October / early November.</p>
      </Collapse>
      <Collapse title="How much is the mint?">
        <p>
          Mint price will be announced closer to launch date, depending on sol
          price and community opinion. Expect a 1-2 sol mint price.
        </p>
      </Collapse>
      <Collapse title="Is there a whitelist?">
        <p>We have made the decision as a project to not have a whitelist.</p>
      </Collapse>
      <Collapse title="Where can I learn more about the Saiba Gang?">
        <p>Join us on Twitter and Discord to learn more about our project!</p>
      </Collapse>
    </div>
  );
}
