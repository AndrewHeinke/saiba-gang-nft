import { ParallaxBanner } from "react-scroll-parallax";
import Container from "./Container";
import styles from "styles/Banner.module.scss";
import Image from "next/image";
import BannerImage from "../../public/images/cyber-bg.jpg";
import LogoImage from "../../public/images/logo.png";

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
            <Image
              priority={true}
              alt="Saiba Gang Logo"
              layout="responsive"
              width={800}
              height={342}
              src={LogoImage}
            />
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
        <Container>
          <div className={styles["banner-content"]}>
            <div className={styles["banner-title"]}>
              <Image
                priority={true}
                alt="Saiba Gang Logo"
                layout="responsive"
                width={800}
                height={342}
                src={LogoImage}
              />
            </div>
          </div>
        </Container>
      </div>
    </ParallaxBanner>
  );
}
