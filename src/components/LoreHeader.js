import { Twitter, Discord, Medium } from "./Icons";
import styles from "styles/Header.module.scss";
import Image from "next/image";
import LogoImg from "../../public/images/logo.png";
import Link from "next/link";

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

export default function LoreHeader() {
  return (
    <header className={styles["header"]}>
      <div className={styles["header-container"]}>
        <Link href="/" passHref>
          <a>
            <Logo />
          </a>
        </Link>
        <Link href="/lore" passHref>
          <a className="lore-header-title">Lore</a>
        </Link>

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
  );
}
