import styles from "styles/BackgroundSection.module.scss";
import Image from "next/image";
import BGSectionImage from "../../public/images/underground-cyberpunk.jpg";
export default function BackgroundSection() {
  return (
    <div className={styles["background-section"]}>
      <Image
        src={BGSectionImage}
        alt="Saiba Gang"
        placeholder="blur"
        layout="fill"
        objectFit="cover"
      />
    </div>
  );
}
