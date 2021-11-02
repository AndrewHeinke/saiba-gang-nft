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
              Our official mint date is November 1st 2021 at 2:00PM EST.
            </>
          }
          status="active"
        />
        <RoadmapStep
          title="Establish a Community Fund"
          description="Immediately after the project launches, we will be contributing 20% of royalties from NFT sales into a community wallet. More on community fund management below."
          status="incomplete"
        />
      </div>

      <div className={styles["roadmap"]}>
        <h2>Season One</h2>
        <RoadmapStep
          title="First Airdrop"
          description="The first Lore Prompt will be establishing the hideouts of each division. Once the description of the hideouts have been chosen, the Saiba Gang team will commission an artist(s) to create a graphic of these hideouts. The four hideouts will be airdropped to Saiba Gang holders with the respective divisions. The aim is to perform this airdrop within the first week of the launch."
          status="incomplete"
        />
        <RoadmapStep
          title="Continuous Airdrops"
          description="The Saiba Gang team plans to continuously airdrop lore based NFTs to our community. Some will go to all members, some will be more rare and only dropped to a select number of holders."
          status="incomplete"
        />
        <RoadmapStep
          title="Burn + Fusion Mechanics"
          description="Our team has noticed in the Solana ecosystem that there aren’t widely available solutions to perform burn mechanics and fusion mechanics. The Saiba Gang team wants to employ burn and/or fusion mechanics for future drops, so we plan to use the community fund to help pay Solana developers to help us create and then open source this utility so that we can provide value to our community and the wider Solana community."
          status="incomplete"
        />
        <RoadmapStep
          title="Kaze Collective Drop"
          description="The evil force that occupies Wintermoon City is known as the Kaze Collective. As we flesh out the details of the Kaze Collective as a community, we will begin working on a collection of Kaze Collective members. We are planning for this collection to drop within the first few months of the main Saiba Gang launch. This introduction of the Kaze Collective will be a fun division within the community where we plan on having interactions between holders of both collections. Are you team Saiba, or team Kaze?"
          status="incomplete"
        />
        <RoadmapStep
          title="Manga / Comic Series"
          description="The ultimate goal of this project is to develop a manga / comic series based on the Saiba Gang with plot details crowd sourced by our community. Our loremaster is a published fantasy author and has worked previously with graphic novel authors to develop stories. She will be working with the community to establish the story details while working in parallel with an artist to produce the manga / comic. It would be disingenuous to commit to a timeframe for this, as it is very hard to tell at this stage of the project. We will say that our goal is to have something created within three to six months following our launch."
          status="incomplete"
        />
        <RoadmapStep
          title="DAO"
          description="The Saiba Gang team wants to create a proper DAO. We think that creating a true decentralized governance for a project is an extremely arduous task that many projects get wrong, so we will not be rushing this part of our roadmap. We will bring in experts to build a proper DAO structure, and plan to divide our DAO between Saiba Gang and Kaze Collective holders. We will build a rock solid foundation for this community, as we plan to be around for the long term as a staple in the Solana community. When the proper DAO structure is in place, they will control what happens with the community funds."
          status="incomplete"
        />
      </div>
    </>
  );
}
