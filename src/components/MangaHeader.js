import React, { useEffect, useState } from "react";
import { find } from "lodash";
import axios from "axios";
import {
  getParsedNftAccountsByOwner,
  isValidSolanaAddress,
} from "@nfteyez/sol-rayz";
import useWallet from "../../lib/useWallet";
import fetchJSON from "../../lib/fetchJSON";
import styles from "styles/Header.module.scss";
import Image from "next/image";
import LogoImg from "../../public/images/logo.png";
import Link from "next/link";
import useWindowSize from "hooks/useWindowSize";
import Container from "./Container";
import Breadcrumbs from "nextjs-breadcrumbs";
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

export default function MangaHeader() {
  const { publicKey } = useAdaptorWallet();
  const { wallet, mutateWallet } = useWallet();
  const [nfts, setNfts] = useState(null);
  const size = useWindowSize();

  useEffect(() => {
    if (publicKey) {
      getAllNftData();
    } else {
      resetWallet();
    }
  }, [publicKey]);

  useEffect(() => {
    if (nfts) {
      setSaibasInWallet();
    }
  }, [nfts]);

  const resetWallet = async () => {
    setNfts(null);
    mutateWallet(await fetchJSON("/api/disconnect", { method: "POST" }), false);
  };

  const findValue = (arr, value) => {
    return find(arr, (elem) => {
      return elem.data.symbol === value ? elem : undefined;
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
        setNfts(findValue(parsedNfts, "SBAGNG"));
      }
    } catch (error) {
      console.log(error);
    }
  };

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
