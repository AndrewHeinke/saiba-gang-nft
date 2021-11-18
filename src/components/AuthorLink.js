import Link from "next/link";
import Image from "next/image";

export default function AuthorLink({ slug, imgSrc, name, role }) {
  return (
    <Link href={`/lore/authors/${slug}`} passHref>
      <a className="author-link">
        {imgSrc && (
          <Image
            src={imgSrc}
            className="author-img"
            alt={`${name} - Saiba Gang Author`}
            width={40}
            height={40}
            layout="fixed"
          />
        )}
        <div>
          {role && <span className="author-rank">{role}</span>}
          <p>{name}</p>
        </div>
      </a>
    </Link>
  );
}
