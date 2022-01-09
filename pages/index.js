import Layout from "components/Layout";
import Section from "components/Section";
import Banner from "components/Banner";
import Container from "components/Container";
import Roadmap from "components/Roadmap";
import FAQ from "components/FAQ";
import BackgroundSection from "components/BackgroundSection";
import RarityCarousel from "components/RarityCarousel";
import Image from "next/image";
import { Parallax } from "react-scroll-parallax";
import useWindowSize from "../src/hooks/useWindowSize";
import { Twitter } from "components/Icons";

export default function Home() {
  const size = useWindowSize();

  return (
    <Layout size={size}>
      <Banner size={size} />
      <Section id="about">
        <Container className="mb-2">
          <h2>About Us</h2>
          <p>
            Oppressed and ready to fight, the Saiba Gang live under the tyranny
            of the Kaze Collective in Wintermon City, waiting for their moment
            to strike.
          </p>
          <p>
            There does not exist a richer storyline within the Solana ecosystem
            than that of the Saiba Gang. The initial Saiba Gang NFT launch was
            performed on the Solana ecosystem due to Solana&apos;s favorable gas
            prices. Solana is a top five marketcap blockchain with incredible
            speed and performance, as well as efficient networking costs which
            result in notably less money spent on transaction fees. With that
            said, the Saiba Gang team and community support cross-chain ideals!
          </p>
          <p>
            The Saiba Gang team aims to produce a manga that rivals the highest
            quality mainstream manga. We will do all of this while
            community-sourcing lore to add in to our story. Our manga will be
            released on a set cadence on the Webtoons platform.
          </p>
          <p>
            Together, with our community, Saiba Gang will create one of the most
            badass manga out there.
          </p>
        </Container>
        <div className="overflow-scroll">
          <Parallax
            x={[-30, 0]}
            disabled={size?.width < 720}
            styleInner={{ display: "flex" }}
          >
            <div className="gallery-img">
              <Image
                src="/images/blue-man.jpg"
                alt="Saiba Gang"
                height={300}
                width={300}
                layout="responsive"
              />
            </div>
            <div className="gallery-img">
              <Image
                src="/images/guy.jpg"
                alt="Saiba Gang"
                height={300}
                width={300}
                layout="responsive"
              />
            </div>
            <div className="gallery-img">
              <Image
                src="/images/Goku.png"
                alt="Saiba Gang"
                height={300}
                width={300}
                layout="responsive"
              />
            </div>
            <div className="gallery-img">
              <Image
                src="/images/Zooks.png"
                alt="Saiba Gang"
                height={300}
                width={300}
                layout="responsive"
              />
            </div>
            <div className="gallery-img">
              <Image
                src="/images/Leisure-Boi.png"
                alt="Saiba Gang"
                height={300}
                width={300}
                layout="responsive"
              />
            </div>
          </Parallax>
        </div>
      </Section>
      <Container>
        <Section id="roadmap">
          <h2>Roadmap</h2>
          <Roadmap />
        </Section>
        {/* <Section id="rarity">
          <h2>Rarity</h2>
          <RarityCarousel />
        </Section> */}
        <Section id="buy">
          <Container>
            <h2>How to Buy</h2>
            <p>
              Saiba Gang NFTs are held on the Solana blockchain. A huge benefit
              to that is that it is extremely user friendly to get started
              getting your first Solana NFT compared to other ecosystems!
            </p>
            <p>
              Your first step is to get a wallet. “Wallets” let a user hold
              cryptocurrency and NFTs. In the Solana ecosystem, the preferred
              wallet is the Phantom wallet. To create your first wallet, visit{" "}
              <a
                className="content-link"
                rel="noreferrer"
                target="_blank"
                href="https://phantom.app/"
              >
                https://phantom.app/
              </a>{" "}
              and follow the instructions to add the wallet to your browser.
              Help for that can be found at this link:{" "}
              <a
                className="content-link"
                rel="noreferrer"
                target="_blank"
                href="https://help.phantom.app/hc/en-us/articles/4406388623251-How-to-create-a-new-wallet"
              >
                https://help.phantom.app/hc/en-us/articles/4406388623251-How-to-create-a-new-wallet
              </a>
            </p>
            <p>
              Once you are finished creating your wallet, and you have all of
              your wallet details written down and stored in a secure location,
              you are ready to add some SOL to your wallet. The easiest way to
              do this is to send SOL from your preferred cryptocurrency
              exchange, like Coinbase, to the wallet address that you have just
              created. You can see a detailed guide here:{" "}
              <a
                className="content-link"
                rel="noreferrer"
                target="_blank"
                href="https://decentralizedcreator.com/deposit-solana-to-phantom-wallet/"
              >
                https://decentralizedcreator.com/deposit-solana-to-phantom-wallet/
              </a>
            </p>
            <p>
              Now that you&apos;ve added SOL to your wallet, you are ready to
              purchase some NFTs!
            </p>
            <p>
              At this moment, the preferred marketplace is Magic Eden. The
              founders are a great group of developers, and they have proven
              themselves to be hard working and reliable. You can visit their
              website here:{" "}
              <a
                className="content-link"
                rel="noreferrer"
                target="_blank"
                href="https://www.magiceden.io/marketplace"
              >
                https://www.magiceden.io/marketplace
              </a>
              . Once on their site, connect your Phantom wallet.
            </p>
            <p>
              To buy a Saiba Gang, you can simply search for us on Magic Eden,
              or follow this link to find our project:{" "}
              <a
                className="content-link"
                rel="noreferrer"
                target="_blank"
                href="https://www.magiceden.io/marketplace/saiba_gang"
              >
                https://www.magiceden.io/marketplace/saiba_gang
              </a>
              .
            </p>
          </Container>
        </Section>
        <Section id="team">
          <h2>The Team</h2>
          <div className="grid">
            <div className="team-member-card">
              <Image
                src="/images/Zooks.png"
                alt="Zooks Saiba Gang"
                height={500}
                width={500}
              />
              <a
                rel="noreferrer"
                target="_blank"
                href="https://twitter.com/ZooksSol"
                className="twitterLink"
              >
                <Twitter />
                Zooks
                <br />
                Founder / Visual Director
              </a>
            </div>
            <div className="team-member-card">
              <Image
                src="/images/Leisure-Boi.png"
                alt="Saiba Gang"
                height={500}
                width={500}
              />
              <a
                rel="noreferrer"
                target="_blank"
                href="https://twitter.com/SaibaLeisureBoi"
                className="twitterLink"
              >
                <Twitter />
                LeisureBoi
                <br />
                Lead Developer
              </a>
            </div>
            <div className="team-member-card">
              <Image
                src="/images/davo.png"
                alt="Dav0 Gang"
                height={500}
                width={500}
              />
              <a
                rel="noreferrer"
                target="_blank"
                href="https://twitter.com/Davestat0r"
                className="twitterLink"
              >
                <Twitter />
                Dav0
                <br />
                Community Manager
              </a>
            </div>
            <div className="team-member-card">
              <Image
                src="/images/Jessica.png"
                alt="Jessica Saiba Gang"
                height={500}
                width={500}
              />
              <a
                rel="noreferrer"
                target="_blank"
                href="https://twitter.com/JessArtemisia"
                className="twitterLink"
              >
                <Twitter />
                Jessica Artemisia
                <br />
                Loremaster
              </a>
            </div>
          </div>
        </Section>
        <Section id="faq">
          <h2>FAQs</h2>
          <FAQ />
        </Section>
      </Container>
      <BackgroundSection />
    </Layout>
  );
}
