import { Twitter, Discord, Medium } from "./Icons";
import styles from "styles/Header.module.scss";
import Image from "next/image";
import LogoImg from "../../public/images/logo.png";
import Link from "next/link";
import useWindowSize from "hooks/useWindowSize";
import Container from "./Container";
import Breadcrumbs from "nextjs-breadcrumbs";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

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
            <WalletMultiButton />
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
