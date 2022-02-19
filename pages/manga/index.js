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
  const [connected, setConnected] = useState(false);
  const [nfts, setNfts] = useState(null);
  const [saiba, setSaiba] = useState(null);

  useEffect(() => {
    if (window["solana"]?.isPhantom) {
      setPhantom(window["solana"]);
    }
  }, []);

  useEffect(() => {
    phantom?.on("connect", () => {
      setConnected(true);
    });

    phantom?.on("disconnect", () => {
      setConnected(false);
    });
  }, [phantom]);

  useEffect(() => {
    if (connected) {
      const getAllNftData = async () => {
        try {
          let ownerToken = phantom.publicKey;
          const result = isValidSolanaAddress(ownerToken);
          if (result) {
            const parsedNfts = await getParsedNftAccountsByOwner({
              publicAddress: ownerToken,
              serialization: true,
            });
            setNfts(parsedNfts);
          }
        } catch (error) {
          console.log(error);
        }
      };

      getAllNftData();
    }
  }, [phantom, connected]);

  useEffect(() => {
    if (nfts) {
      getNftTokenData(getSaibas(nfts)).then((response) =>
        setSaiba(response.data)
      );
    }
  }, [nfts]);

  const connectHandler = () => {
    phantom?.connect();
    const connectWallet = async () => {
      try {
        mutateWallet(
          await axios("/api/connect", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            data: { publicKey: phantom.publicKey },
          })
        );
      } catch (error) {
        console.error("An unexpected error happened:", error);
      }
    };

    connectWallet();
  };

  const disconnectHandler = () => {
    phantom?.disconnect();
    setSaiba(null);

    const disconnectWallet = async (e) => {
      mutateWallet(
        await fetchJSON("/api/disconnect", { method: "POST" }),
        false
      );
    };
    disconnectWallet();
  };

  const findValue = (arr, value) => {
    return find(arr, (elem) => {
      return elem.data.symbol === value ? elem : undefined;
    });
  };

  const getSaibas = (nfts) => {
    return findValue(nfts, "SBAGNG");
  };

  const getNftTokenData = async (saiba) => {
    try {
      const val = await axios.get(saiba.data.uri);
      return val;
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
        {!wallet?.data?.connected && !wallet?.connected ? (
          <button onClick={connectHandler}>Connect to Phantom</button>
        ) : (
          <button onClick={disconnectHandler}>Disconnect from Phantom</button>
        )}

        {saiba && (
          <div style={{ display: "flex" }}>
            <img
              style={{
                width: "75px",
                height: "auto",
                borderRadius: "5rem",
                border: "1px solid white",
              }}
              src={saiba.image}
            />
            <p>{saiba.name}</p>
          </div>
        )}

        <h1>Episodes</h1>
        {saiba && (
          <ul>
            <li>
              <Link href="/manga/episode-1-the-mistake">
                <a className={styles["manga-link"]}>Episode 1: The Mistake</a>
              </Link>
            </li>
            <li>
              <Link href="/manga/episode-2-the-beginning">
                <a className={styles["manga-link"]}>Episode 2: The Beginning</a>
              </Link>
            </li>
            <li>
              <Link href="/manga/episode-3-death">
                <a className={styles["manga-link"]}>Episode 3: Death</a>
              </Link>
            </li>
          </ul>
        )}
        {!saiba && (
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
