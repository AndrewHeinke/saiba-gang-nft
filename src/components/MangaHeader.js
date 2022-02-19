import { Twitter, Discord, Medium } from "./Icons";
import styles from "styles/Header.module.scss";
import Image from "next/image";
import LogoImg from "../../public/images/logo.png";
import Link from "next/link";
import useWindowSize from "hooks/useWindowSize";
import Container from "./Container";
import Breadcrumbs from "nextjs-breadcrumbs";

const Logo = ({ ...restOfProps }) => (
  <div tabIndex={0} className={styles["header-logo"]} {...restOfProps}>
    <Image
      src={LogoImg}
      priority={true}
      alt="Saiba Gang Logo"
      layout="responsive"
      width={800}
      height={342}
    />
  </div>
);

export default function MangaHeader() {
  const size = useWindowSize();
  return (
    <>
      <header className={`lore-header ${styles["header"]}`}>
        <div className={styles["header-container"]}>
          <Link href="/" passHref>
            <a>
              <Logo />
            </a>
          </Link>
          {size?.width > 480 && (
            <Link href="/manga" passHref>
              <a className="lore-header-title">Manga</a>
            </Link>
          )}

          <div className={styles["header-social-section"]}>
            <a
              href="https://medium.com/@saibagang"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Medium className={styles["header-link-social"]} />
            </a>
            <a
              href="https://twitter.com/SaibaGang"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className={styles["header-link-social"]} />
            </a>
            <a
              href="https://discord.gg/aRPTxj5FMA"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Discord className={styles["header-link-social"]} />
            </a>
          </div>
        </div>
      </header>
      <Container>
        <Breadcrumbs
          containerClassName="breadcrumbs"
          replaceCharacterList={[{ from: "-", to: " " }]}
          labelsToUppercase
          activeItemClassName="current-page"
          rootLabel="Home"
        />
      </Container>
    </>
  );
}
