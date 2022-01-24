import styles from "styles/Roadmap.module.scss";
import classNames from "classnames";
import { Checkmark, Circle } from "./Icons";

const RoadmapStep = ({ status, title, description }) => {
  const classes = classNames(
    styles["roadmap-step"],
    styles[`roadmap-step--${status}`]
  );

  return (
    <div className={classes}>
      {status === "complete" && (
        <Checkmark className={styles["roadmap-step-icon"]} />
      )}
      {status === "active" && (
        <Circle className={styles["roadmap-step-icon"]} />
      )}
      <p className={styles["roadmap-step-title"]}>{title}</p>
      <p className={styles["roadmap-step-description"]}>{description}</p>
    </div>
  );
};

export default function Roadmap() {
  return (
    <>
      <div className={styles["roadmap"]}>
        <RoadmapStep
          title="Begin Building the Saiba Gang Community"
          description="Begin establishing a strong Saiba Gang community organically. We want to draw people to the project with our art, and then we want to hook them with our vision, team, and potential. Lore details being crafted by our loremaster, who is a published fantasy author, will be continually announced in the weeks leading up to launch."
          status="complete"
        />
        <RoadmapStep
          title="Lore Prompts"
          description="The Saiba Gang community will be given weekly prompts of lore topics to write in what they think would make a good addition to the Saiba Gang universe. Our team will curate answers, and give the community a vote on which answers to the prompt they like the best. The winner’s response will be officially made canon in the Saiba Gang lore. The member who submitted the answer will be recognized for their addition to the Saiba Gang story, and rewarded."
          status="complete"
        />
        <RoadmapStep
          title="Mint Launch"
          description={
            <>
              We will be minting 4,444 Saibas. The mint price will be 0.88 sol.
              The Saiba Gang technical team includes{" "}
              <a
                rel="noreferrer"
                target="_blank"
                href="https://twitter.com/levicook"
              >
                @levicook
              </a>{" "}
              and{" "}
              <a
                rel="noreferrer"
                target="_blank"
                href="https://twitter.com/ExiledApes"
              >
                @ExiledApes
              </a>
              , who are both accomplished technical minds in the Solana space.
            </>
          }
          status="complete"
        />
        <RoadmapStep
          title="Establish a Community Fund"
          description="Immediately after the project launches, we will be contributing 20% of royalties from NFT sales into a community wallet."
          status="complete"
        />
      </div>

      <div className={styles["roadmap"]}>
        <h2>Season One</h2>
        <RoadmapStep
          title="Saiba Gang Hideouts"
          description="One of the first loreprompts given to the community was to establish the bases of each division of the Saiba Gang. From those descriptions that the community decided on, the team would create NFT art representing those hideouts. A free mint was then given to the community."
          status="complete"
        />
        <RoadmapStep
          title="Saiba Gang Manga Series"
          description="The ultimate goal of this project is to create an awesome manga series revolving around the Saiba Gang universe. Our initial goal is to release the first episode on Webtoons in mid January, and then have biweekly releases of the manga going forward."
          status="complete"
        />
        <RoadmapStep
          title="Kaze Collective Drop"
          description="The evil force that occupies Wintermoon City is known as the Kaze Collective. As we flesh out the details of the Kaze Collective as a community, we will begin working on a collection of Kaze Collective members. We are planning to drop the Kaze at the end of Q1 2022. This introduction of the Kaze Collective will be a fun division within the community where we plan on having interactions between holders of both collections. We will introduce burn mechanics of current Saiba Gang NFTs to deflate the supply, and give holders the opportunity to earn free Kaze NFTs. Are you team Saiba, or team Kaze?"
          status="active"
        />
      </div>
    </>
  );
}
