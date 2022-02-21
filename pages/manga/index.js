import React, { useCallback, useEffect, useState } from "react";
import { find } from "lodash";
import axios from "axios";
import {
  getParsedNftAccountsByOwner,
  isValidSolanaAddress,
} from "@nfteyez/sol-rayz";
import Container from "components/Container";
import MangaHeader from "components/MangaHeader";
import Head from "next/head";
import Link from "next/link";
import styles from "styles/Manga.module.scss";
import useWallet from "../../lib/useWallet";
import fetchJSON from "../../lib/fetchJSON";
import {
  useConnection,
  useWallet as useAdaptorWallet,
} from "@solana/wallet-adapter-react";

export default function Manga() {
  const [loading, setLoading] = useState(true);
  const { wallet, mutateWallet } = useWallet();
  const [nfts, setNfts] = useState(null);
  const { publicKey } = useAdaptorWallet();

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
    try {
      const result = isValidSolanaAddress(publicKey);
      if (result) {
        const parsedNfts = await getParsedNftAccountsByOwner({
          publicAddress: publicKey,
          serialization: true,
        });
        setNfts(findValue(parsedNfts, "SBAGNG")).then(() => setLoading(false));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Manga | Saiba Gang NFT</title>
      </Head>
      <MangaHeader />
      <Container>
        {wallet?.data?.isSaibaHolder && (
          <div>
            <div
              style={{
                display: "inline-flex",
                height: "75px",
              }}
            >
              <img
                src={wallet.data.img}
                style={{
                  width: "75px",
                  height: "75px",
                  border: "1px solid white",
                  marginRight: "1rem",
                }}
              />
              <p>{wallet.data.name}</p>
            </div>
          </div>
        )}
        {publicKey && !nfts && !loading && (
          <p>No Saiba Gang NFTs in connected wallet.</p>
        )}

        <h1>Episodes</h1>
        {publicKey && wallet?.data?.isSaibaHolder ? (
          <>
            <ul>
              <li>
                <Link href="/manga/episode-1-the-mistake">
                  <a className={styles["manga-link"]}>Episode 1: The Mistake</a>
                </Link>
              </li>
              <li>
                <Link href="/manga/episode-2-the-beginning">
                  <a className={styles["manga-link"]}>
                    Episode 2: The Beginning
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/manga/episode-3-death">
                  <a className={styles["manga-link"]}>Episode 3: Death</a>
                </Link>
              </li>
            </ul>
          </>
        ) : (
          <p
            style={{
              padding: "1rem",
              border: "1px solid #B23A48",
              background: "#C34655",
            }}
          >
            This content is restricted to Saiba Gang NFT holders. Please connect
            your wallet to verify and access the content.
          </p>
        )}
      </Container>
    </>
  );
}
