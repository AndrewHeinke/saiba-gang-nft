import { ParallaxBanner } from "react-scroll-parallax";
import Container from "./Container";
import styles from "styles/Banner.module.scss";
import mintStyles from "styles/MintCountdown.module.scss";
import Image from "next/image";
import BannerImage from "../../public/images/cyber-bg.jpg";
import { MagicEdenLogo } from "./Icons";

const HomeBannerImg = () => (
  <div className={styles["banner-image-wrapper"]}>
    <Image
      src={BannerImage}
      alt="Saiba Gang"
      placeholder="blur"
      layout="fill"
      objectFit="cover"
    />
  </div>
);

export default function Banner({ size }) {
  if (size?.width < 720) {
    return (
      <div className={styles["mobile-banner"]}>
        <Image
          src={BannerImage}
          alt="Saiba Gang NFT Project"
          width={720}
          height={405}
          placeholder="blur"
          layout="responsive"
          priority
        />
        <div className={styles["mobile-banner-content"]}>
          <div className={styles["mobile-banner-title"]}>
            <h1 className="sr-only">Saiba Gang</h1>
            <div className={mintStyles["mint-countdown"]}>
              <p style={{ textAlign: "center" }}>
                Purchase Saiba Gang NFTs
                <br />
                on these marketplaces:
              </p>
              <div className="secondary-wrapper">
                <a
                  className="secondary-link"
                  href="https://solanart.io/collections/saibagang"
                >
                  <img
                    src="images/solanart-logo.png"
                    alt="Saiba Gang on Solanart"
                  />
                  Solanart
                </a>
                <a
                  className="secondary-link"
                  href="https://magiceden.io/marketplace/saiba_gang"
                >
                  <MagicEdenLogo className="magic-eden" />
                  <span className="sr-only">
                    Buy Saiba Gang NFT on Magic Eden
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ParallaxBanner
      className="foo"
      layers={[
        {
          amount: 1,
          expanded: false,
          children: <HomeBannerImg />,
        },
      ]}
      style={{
        height: "100vh",
        position: "relative",
        width: "100%",
      }}
    >
      <div className={styles["banner-container"]}>
        <h1 className="sr-only">Saiba Gang</h1>
        <Container>
          <div className={styles["banner-content"]}>
            <p style={{ textAlign: "center", marginTop: "16px" }}>
              Purchase Saiba Gang NFTs
              <br />
              on these marketplaces:
            </p>
            <div className="secondary-wrapper">
              <a
                className="secondary-link"
                href="https://solanart.io/collections/saibagang"
              >
                <img
                  src="images/solanart-logo.png"
                  alt="Saiba Gang on Solanart"
                />
                Solanart
              </a>
              <a
                className="secondary-link"
                href="https://magiceden.io/marketplace/saiba_gang"
              >
                <MagicEdenLogo className="magic-eden" />
                <span className="sr-only">
                  Buy Saiba Gang NFT on Magic Eden
                </span>
              </a>
            </div>
          </div>
        </Container>
      </div>
    </ParallaxBanner>
  );
}
