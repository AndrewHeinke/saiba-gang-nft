import { useEffect, useState } from "react";
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

export default function Manga() {
  const { wallet, mutateWallet } = useWallet();
  const [phantom, setPhantom] = useState(null);
  const [nfts, setNfts] = useState(null);
  const [connectedWallet, setConnectedWallet] = useState(false);

  useEffect(() => {
    console.log("window.solana", window?.solana);
    if (window["solana"]?.isPhantom) {
      setPhantom(window["solana"]);
    }
  }, []);

  useEffect(() => {
    console.log("window", window);
  }, [window]);

  console.log("phantom", phantom);

  useEffect(() => {
    if (connectedWallet && nfts) {
      setSaibasInWallet(nfts);
    }
  }, [connectedWallet, nfts]);

  console.log("wallet", wallet);

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
      const result = isValidSolanaAddress(phantom.publicKey);
      if (result) {
        const parsedNfts = await getParsedNftAccountsByOwner({
          publicAddress: phantom.publicKey,
          serialization: true,
        });
        setNfts(findValue(parsedNfts, "SBAGNG"));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async (publicKey) => {
    console.log("connectWallet publicKey", publicKey);
    console.log("phantom.publicKey", phantom?.publicKey);
    try {
      mutateWallet(
        await axios("/api/connect", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          data: {
            publicKey: publicKey,
            connected: true,
          },
        })
      );
      getAllNftData();
      setConnectedWallet(true);
    } catch (error) {
      console.error("An unexpected error happened:", error);
    }
  };

  const connectHandler = () => {
    console.log("phantom in connectHandler", phantom);
    phantom?.connect().then(() => connectWallet(phantom.publicKey));
  };

  const disconnectHandler = () => {
    phantom?.disconnect();
    setConnectedWallet(false);

    const disconnectWallet = async () => {
      mutateWallet(
        await fetchJSON("/api/disconnect", { method: "POST" }),
        false
      );
    };
    disconnectWallet();
  };

  return (
    <>
      <Head>
        <title>Manga | Saiba Gang NFT</title>
      </Head>
      <MangaHeader />
      <Container>
        {!wallet?.data?.connected && !wallet?.connected ? (
          <button onClick={connectHandler}>Connect to Phantom</button>
        ) : (
          <button onClick={disconnectHandler}>Disconnect from Phantom</button>
        )}

        <h1>Episodes</h1>
        {wallet?.data?.isSaibaHolder ? (
          <>
            <p>{wallet.data.name}</p>
            <img
              src={wallet.data.img}
              style={{
                width: "75px",
                height: "75px",
                border: "1px solid white",
              }}
            />
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
