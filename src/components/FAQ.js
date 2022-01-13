import styles from "styles/FAQ.module.scss";
import Collapse from "./Collapse";

export default function FAQ() {
  return (
    <div className={styles["faq-wrapper"]}>
  <Collapse title="How do I buy a Saiba?">
        <p>
          You can buy Solana on most major crypto exchanges. A good starting exhange is Coinbase.
        </p>
      </Collapse>
 <Collapse title="What is Solana?">
        <p>
          Solana is a decentralized blockchain built to enable scalable, user&mdash;friendly apps for the world. Solana is the fastest blockchain in the world and the fastest growing ecosystem in crypto, with over 400 projects spanning DeFI, NFTs, Web3 and more. Solana is both ultra&mdash;fast and low cost, making it a good blockchain for NFT projects such as ours.
        </p>
      </Collapse>
 <Collapse title="What are some common terms in NFTs I need to understand?">
        <p>
          This article has a comprehensive list of most of the main NFT terms you hear around the space. It has Ethereum NFTs in mind, however most of the terms there are the exact same as used in Solana. <a className="content-link" rel="noreferrer" target="_blank" href="https://medium.datadriveninvestor.com/23-nft-terms-you-need-to-know-74ebd46c78be?gi=2a9e4abefe93">https://medium.datadriveninvestor.com/23-nft-terms-you-need-to-know-74ebd46c78be?gi=2a9e4abefe93</a>
        </p>
      </Collapse>
 <Collapse title="What does Web3 mean?">
        <p>
         At a basic level, Web3 refers to a decentralized online ecosystem based on the blockchain. It&apos;s referenced as the next phase of the internet, moving on from Web 2.0 which is considered quite a centralized space, where huge companies like Google, Facebook, and Amazon dominate most activity. The general ethos of Web3 is to give the power back to the people, where platforms and apps will be owned by users rather than a central gatekeeper. The users then earn their ownership by helping to add value to those services.
        </p>
      </Collapse>
<Collapse title="What is the rewards program?">
        <p>
          Our reward system is an internally managed &apos;currency&apos; which is awarded to those who help promote Saiba Gang on social media. It allows people to help the project, and then be rewarded in a meangingful way by doing so. Details of the rules can be found in our Discord, and in the following Medium article: <a className="content-link" rel="noreferrer" target="_blank" href="https://saibagang.medium.com/the-saiya-rewards-system-3f382bb58a27">https://saibagang.medium.com/the-saiya-rewards-system-3f382bb58a27</a>
        </p>
      </Collapse>
<Collapse title="Why is your manga on Webtoons?">
        <p>
          Webtoons is the platform we chose to publish our manga due to it&apos;s ever increasing popularity, and ease of publishing. We think that reading on Webtoons is quite enjoyable, and makes for a more dynamic experience. It allows us to take advantage of an already flourishing ecosystem of manga to help promote our project and creative work!
        </p>
      </Collapse>
<Collapse title="How do I participate in the lore?">
        <p>
         We will be putting out lore prompts on our Discord which people can participate in to earn Saiba Gang NFT rewards. Should an individual&apos;s lore submissions be accepted, it will officially become part of the Saiba Gang universe!
        </p>
      </Collapse>
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
