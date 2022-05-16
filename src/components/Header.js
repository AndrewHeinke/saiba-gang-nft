import styles from "styles/Header.module.scss";
import { useState, useEffect } from "react";
import { find } from "lodash";
import { Twitter, Discord, Medium } from "./Icons";
import Image from "next/image";
import LogoImg from "../../public/images/logo.png";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import axios from "axios";
import {
  getParsedNftAccountsByOwner,
  isValidSolanaAddress,
} from "@nfteyez/sol-rayz";
import useWallet from "../../lib/useWallet";
import fetchJSON from "../../lib/fetchJSON";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet as useAdaptorWallet } from "@solana/wallet-adapter-react";

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
  const { publicKey } = useAdaptorWallet();
  const { wallet, mutateWallet } = useWallet();
  const [nfts, setNfts] = useState(null);

  useEffect(() => {
    if (publicKey) {
      getAllNftData();
    } else {
      resetWallet();
    }
  }, [publicKey]);

  useEffect(() => {
    if (nfts || nfts === undefined) {
      setSaibasInWallet();
    }
  }, [nfts]);

  const resetWallet = async () => {
    setNfts(null);
    mutateWallet(await fetchJSON("/api/disconnect", { method: "POST" }), false);
  };

  const findValues = (arr, values) => {
    return find(arr, (elem) => {
      if (elem.data.symbol === values[0]) {
        return elem;
      } else if (elem.data.symbol === values[1]) {
        return elem;
      } else {
        return undefined;
      }
    });
  };

  const setSaibasInWallet = async () => {
    if (wallet?.data?.isSaibaHolder) {
      return;
    }
    try {
      mutateWallet(
        await axios("/api/checkSaiba", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          data: {
            saibaImg: nfts ? nfts.data.uri : null,
            saibaName: nfts ? nfts.data.name : null,
            isSaibaHolder: nfts ? true : null,
          },
        })
      );
    } catch {
      console.log(error);
    }
  };

  const getAllNftData = async () => {
    if (wallet?.data?.connected) {
      return;
    }
    try {
      const result = isValidSolanaAddress(publicKey);
      if (result) {
        mutateWallet(
          await axios("/api/connect", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            data: {
              connected: true,
            },
          })
        );
        const parsedNfts = await getParsedNftAccountsByOwner({
          publicAddress: publicKey,
          serialization: true,
        });
        setNfts(findValues(parsedNfts, ["SBAGNG", "KAZE"]));
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (size?.width < 1200) {
    return (
      <header className={styles["mobile-header"]}>
        <div className={styles["mobile-header-container"]}>
          <div className={styles["mobile-header-top"]}>
            <Logo onClick={() => scroll.scrollToTop()} />

            {size?.width > 480 && (
              <>
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
                  style={{ marginRight: "1rem" }}
                >
                  <Discord className={styles["header-link-social"]} />
                </a>
              </>
            )}

            <WalletMultiButton />
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
              <li className={styles["header-link"]}>
                <ScrollLink
                  activeClass={styles["header-link--active"]}
                  to="buy"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={350}
                >
                  Buy
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
            <li className={styles["header-link"]}>
              <ScrollLink
                activeClass={styles["header-link--active"]}
                to="buy"
                spy={true}
                smooth={true}
                offset={-70}
                duration={350}
              >
                Buy
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
            style={{ marginRight: "1rem" }}
          >
            <Discord className={styles["header-link-social"]} />
          </a>
          <WalletMultiButton />
        </div>
      </div>
    </header>
  );
}
