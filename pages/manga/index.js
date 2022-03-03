import MangaHeader from "components/MangaHeader";
import UserCard from "components/UserCard";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "styles/Manga.module.scss";
import useWallet from "../../lib/useWallet";
import { Container, Row, Col } from "react-grid-system";
import { useWallet as useAdaptorWallet } from "@solana/wallet-adapter-react";

export default function Manga() {
  const { wallet } = useWallet();
  const { publicKey } = useAdaptorWallet();

  return (
    <>
      <Head>
        <title>Manga | Saiba Gang NFT</title>
      </Head>
      <MangaHeader />
      <Container sm md lg style={{ maxWidth: "1200px" }}>
        <Row wrap="reverse">
          <Col md={8}>
            <h1>Episodes</h1>
            <ul className={styles["manga-episode-list"]}>
              <li className={styles["manga-episode-row"]}>
                <Image
                  src="/images/thumbnails/1.png"
                  alt=""
                  width={100}
                  height={100}
                />
                <Link href="/manga/episode-1-the-mistake">
                  <a className={styles["manga-link"]}>Episode 1: The Mistake</a>
                </Link>
              </li>
              <li className={styles["manga-episode-row"]}>
                <Image
                  src="/images/thumbnails/2.png"
                  alt=""
                  width={100}
                  height={100}
                />
                <Link href="/manga/episode-2-the-beginning">
                  <a className={styles["manga-link"]}>
                    Episode 2: The Beginning
                  </a>
                </Link>
              </li>
              <li className={styles["manga-episode-row"]}>
                <Image
                  src="/images/thumbnails/3.png"
                  alt=""
                  width={100}
                  height={100}
                />
                <Link href="/manga/episode-3-death">
                  <a className={styles["manga-link"]}>Episode 3: Death</a>
                </Link>
              </li>
              <li className={styles["manga-episode-row"]}>
                <div className={styles["manga-thumbnail-placeholder"]}></div>
                <Link href="/manga/episode-4">
                  <a className={styles["manga-link"]}>
                    Episode 4: The next episode!!!
                  </a>
                </Link>
              </li>
              {publicKey && wallet?.data?.isSaibaHolder && (
                <>
                  <li className={styles["manga-episode-row"]}>
                    <div
                      className={styles["manga-thumbnail-placeholder"]}
                    ></div>
                    <Link href="/manga/episode-5">
                      <a className={styles["manga-link"]}>
                        Episode 5: Foo bar baz
                      </a>
                    </Link>
                  </li>
                  <li className={styles["manga-episode-row"]}>
                    <div
                      className={styles["manga-thumbnail-placeholder"]}
                    ></div>
                    <Link href="/manga/episode-6">
                      <a className={styles["manga-link"]}>
                        Episode 6: Dun dun dunnnn
                      </a>
                    </Link>
                  </li>
                </>
              )}
              {!wallet?.data?.connected && (
                <p
                  style={{
                    padding: ".25rem 1rem",
                    border: "1px solid #B23A48",
                    background: "#C34655",
                  }}
                >
                  Future manga episodes are restricted to Saiba Gang NFT
                  holders. Please connect your wallet to verify and access the
                  content.
                </p>
              )}
              {wallet?.data?.connected &&
                wallet.data?.isSaibaHolder !== undefined &&
                !wallet?.data.isSaibaHolder && (
                  <p
                    style={{
                      padding: ".25rem 1rem",
                      border: "1px solid #B23A48",
                      background: "#C34655",
                    }}
                  >
                    No Saiba Gang NFTs in connected wallet.
                    <br />
                    <a
                      className={styles["manga-link"]}
                      rel="noreferrer"
                      target="_blank"
                      href="https://www.magiceden.io/marketplace"
                    >
                      Purchase Saiba Gang NFT
                    </a>
                  </p>
                )}
            </ul>
          </Col>
          <Col md={4}>
            <UserCard
              loading={wallet?.data?.loading}
              isHolder={wallet?.data?.isSaibaHolder}
              name={wallet?.data?.name}
              userImg={wallet?.data?.img}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}
