import fs from "fs";
import path from "path";
import { useEffect } from "react";
import styles from "styles/Manga.module.scss";
import { useRouter } from "next/router";
import Container from "components/Container";
import MangaHeader from "components/MangaHeader";
import Image from "next/image";
import Head from "next/head";
import useWallet from "../../../lib/useWallet";

const Episode = ({ images, isFree }) => {
  const router = useRouter();
  const { wallet } = useWallet();
  console.log(wallet);
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const { episode } = router.query;

  const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

  const toBase64 = (str) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);

  return (
    <>
      <Head>
        <title>Episode: {episode} | Manga | Saiba Gang NFT</title>
      </Head>
      <MangaHeader />
      <Container>
        <h1>Episode: {episode}</h1>
        {isFree &&
          images.map((image, idx) => {
            return (
              <div key={idx} className="manga-image-wrapper">
                <Image
                  className="manga-image"
                  layout="fill"
                  placeholder="blur"
                  blurDataURL={`data:image/svg+xml;base64,${toBase64(
                    shimmer(700, 475)
                  )}`}
                  src={`/images/${episode}/${image}`}
                  alt=""
                />
              </div>
            );
          })}
        {!isFree && !wallet?.data?.connected && (
          <p>Connect wallet to verify access</p>
        )}
        {!isFree &&
          wallet?.data?.connected &&
          wallet?.data?.isSaibaHolder !== undefined &&
          !wallet?.data.isSaibaHolder && (
            <p style={{ marginBottom: "0" }}>
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
        {!isFree &&
          wallet?.data?.isSaibaHolder &&
          images.map((image, idx) => {
            return (
              <div key={idx} className="manga-image-wrapper">
                <Image
                  className="manga-image"
                  layout="fill"
                  placeholder="blur"
                  blurDataURL={`data:image/svg+xml;base64,${toBase64(
                    shimmer(700, 475)
                  )}`}
                  src={`/images/${episode}/${image}`}
                  alt=""
                />
              </div>
            );
          })}
      </Container>
    </>
  );
};

export async function getStaticPaths() {
  return {
    paths: [
      { params: { episode: "episode-1-the-mistake" } },
      { params: { episode: "episode-2-the-beginning" } },
      { params: { episode: "episode-3-death" } },
      { params: { episode: "episode-4" } },
      { params: { episode: "episode-5" } },
      { params: { episode: "episode-6" } },
    ],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const episode = params.episode;
  const postsDirectory = path.join(process.cwd(), `manga/${episode}`);
  const images = fs.readdirSync(postsDirectory);

  // check if route is free episode
  const freeEpisodes = [
    "episode-1-the-mistake",
    "episode-2-the-beginning",
    "episode-3-death",
    "episode-4",
  ];
  const isFreeEpisode = (arr, val) => {
    return arr.some((arrVal) => val === arrVal);
  };

  return {
    props: { images, isFree: isFreeEpisode(freeEpisodes, episode) },
  };
}

export default Episode;
