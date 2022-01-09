import styles from "styles/Header.module.scss";
import { Twitter, Discord, Medium } from "./Icons";
import Image from "next/image";
import LogoImg from "../../public/images/logo.png";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";

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

export default function Header({ size }) {
  if (size?.width < 992) {
    return (
      <header className={styles["mobile-header"]}>
        <div className={styles["mobile-header-container"]}>
          <div className={styles["mobile-header-top"]}>
            <Logo onClick={() => scroll.scrollToTop()} />
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
          <nav>
            <ul className={styles["header-links"]}>
              <li className={styles["header-link"]}>
                <ScrollLink
                  activeClass={styles["header-link--active"]}
                  to="about"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={350}
                >
                  About
                </ScrollLink>
              </li>
              <li className={styles["header-link"]}>
                <ScrollLink
                  activeClass={styles["header-link--active"]}
                  to="roadmap"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={350}
                >
                  Roadmap
                </ScrollLink>
              </li>
              {/* <li className={styles["header-link"]}>
                <ScrollLink
                  activeClass={styles["header-link--active"]}
                  to="rarity"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={350}
                >
                  Rarity
                </ScrollLink>
              </li> */}
              <li className={styles["header-link"]}>
                <ScrollLink
                  activeClass={styles["header-link--active"]}
                  to="team"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={350}
                >
                  Team
                </ScrollLink>
              </li>
              <li className={styles["header-link"]}>
                <ScrollLink
                  activeClass={styles["header-link--active"]}
                  to="faq"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={350}
                >
                  FAQ
                </ScrollLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }

  return (
    <header className={styles["header"]}>
      <div className={styles["header-container"]}>
        <Logo onClick={() => scroll.scrollToTop()} />
        <nav>
          <ul className={styles["header-links"]}>
            <li className={styles["header-link"]}>
              <ScrollLink
                activeClass={styles["header-link--active"]}
                to="about"
                spy={true}
                smooth={true}
                offset={-70}
                duration={350}
              >
                About
              </ScrollLink>
            </li>
            <li className={styles["header-link"]}>
              <ScrollLink
                activeClass={styles["header-link--active"]}
                to="roadmap"
                spy={true}
                smooth={true}
                offset={-70}
                duration={350}
              >
                Roadmap
              </ScrollLink>
            </li>
            {/* <li className={styles["header-link"]}>
              <ScrollLink
                activeClass={styles["header-link--active"]}
                to="rarity"
                spy={true}
                smooth={true}
                offset={-70}
                duration={350}
              >
                Rarity
              </ScrollLink>
            </li> */}
            <li className={styles["header-link"]}>
              <ScrollLink
                activeClass={styles["header-link--active"]}
                to="team"
                spy={true}
                smooth={true}
                offset={-70}
                duration={350}
              >
                Team
              </ScrollLink>
            </li>
            <li className={styles["header-link"]}>
              <ScrollLink
                activeClass={styles["header-link--active"]}
                to="faq"
                spy={true}
                smooth={true}
                offset={-70}
                duration={350}
              >
                FAQs
              </ScrollLink>
            </li>
          </ul>
        </nav>
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
