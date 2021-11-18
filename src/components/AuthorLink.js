import Link from "next/link";
import Image from "next/image";
import styles from "styles/AuthorLinks.module.scss";

const AuthorLink = ({
  slug,
  imgSrc,
  name,
  role,
  imgSize = 40,
  textSizeLg = false,
}) => {
  return (
    <Link href={`/lore/authors/${slug}`} passHref>
      <a className={styles["author-link"]}>
        {imgSrc && (
          <Image
            src={imgSrc}
            className="author-img"
            alt={`${name} - Saiba Gang Author`}
            width={imgSize}
            height={imgSize}
            layout="fixed"
          />
        )}
        <div>
          {role && <span className={styles["author-rank"]}>{role}</span>}
          {textSizeLg && <h2>{name}</h2>}
          {!textSizeLg && <p>{name}</p>}
        </div>
      </a>
    </Link>
  );
};

export default AuthorLink;
