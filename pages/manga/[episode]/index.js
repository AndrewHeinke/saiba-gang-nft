import styles from "styles/Manga.module.scss";
import { useRouter } from "next/router";
import { normalizeEpisodeName } from "utils/normalize-episode-name";
import Container from "components/Container";
import MangaHeader from "components/MangaHeader";
import Image from "next/image";
import Head from "next/head";
import useWallet from "../../../lib/useWallet";

function naturalTitleCompare(a, b) {
  var ax = [],
    bx = [];

  a.title.replace(/(\d+)|(\D+)/g, function (_, $1, $2) {
    ax.push([$1 || Infinity, $2 || ""]);
  });
  b.title.replace(/(\d+)|(\D+)/g, function (_, $1, $2) {
    bx.push([$1 || Infinity, $2 || ""]);
  });

  while (ax.length && bx.length) {
    var an = ax.shift();
    var bn = bx.shift();
    var nn = an[0] - bn[0] || an[1].localeCompare(bn[1]);
    if (nn) return nn;
  }

  return ax.length - bx.length;
}

const Episode = ({ isFree, cloudImages }) => {
  const router = useRouter();
  const { wallet } = useWallet();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const { episode } = router.query;

  return (
    <>
      <Head>
        <title>{normalizeEpisodeName(episode)} | Manga | Saiba Gang NFT</title>
      </Head>
      <MangaHeader />
      <Container className={styles["manga-container"]}>
        <h1>{normalizeEpisodeName(episode)}</h1>
        {isFree &&
          cloudImages &&
          cloudImages.map((image, idx) => {
            return (
              <div key={idx} className="manga-image-wrapper">
                <Image
                  className="manga-image"
                  layout="fill"
                  src={image.image}
                  alt={image.title}
                  placeholder="blur"
                  blurDataURL={image.blurDataURL}
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
          cloudImages.map((image, idx) => {
            return (
              <div key={idx} className="manga-image-wrapper">
                <Image
                  className="manga-image"
                  layout="fill"
                  src={image.image}
                  alt={image.title}
                  placeholder="blur"
                  blurDataURL={image.blurDataURL}
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
      { params: { episode: "episode-4-weapons" } },
      { params: { episode: "episode-5" } },
      { params: { episode: "episode-6" } },
    ],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const episode = params.episode;

  const cloudinaryParams = {
    expression: `folder=saiba-gang/${episode}`,
  };

  const paramString = Object.keys(cloudinaryParams)
    .map((key) => `${key}=${encodeURIComponent(cloudinaryParams[key])}`)
    .join("&");

  const { resources } = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/resources/search?${paramString}`,
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY +
            ":" +
            process.env.NEXT_PUBLIC_CLOUDINARY_SECRET
        ).toString("base64")}`,
      },
    }
  ).then((r) => r.json());

  const cloudImages = resources
    .map((resource) => {
      const { width, height } = resource;
      return {
        id: resource.asset_id,
        title: resource.public_id,
        image: resource.secure_url,
        width,
        height,
        blurDataURL: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/w_640/e_blur:1000,q_1,f_auto/${resource.public_id}`,
      };
    })
    .sort(naturalTitleCompare);

  const freeEpisodes = [
    "episode-1-the-mistake",
    "episode-2-the-beginning",
    "episode-3-death",
    "episode-4-weapons",
  ];

  const isFreeEpisode = (arr, val) => {
    return arr.some((arrVal) => val === arrVal);
  };

  return {
    props: {
      cloudImages,
      isFree: isFreeEpisode(freeEpisodes, episode),
    },
  };
}

export default Episode;
