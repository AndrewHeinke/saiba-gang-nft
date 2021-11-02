import React, { useState, useEffect } from "react";
import { traitsTable } from "../../../data/data.js";
import { getName, getRarityName, getRarityPercent } from "./rarityUtils";
import classNames from "classnames";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectCoverflow, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

SwiperCore.use([EffectCoverflow, Navigation]);

export default function RarityCarousel() {
  const [imageArray, setImageArray] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [config, setConfig] = useState({
    filter: "ACCESSORIES",
    rarities: "ALL",
  });
  const [swiper, setSwiper] = useState(null);

  const handleRarity = (e) => {
    setConfig({
      ...config,
      rarities: e.target.value,
    });
    if (swiper) {
      swiper.slideTo(0);
    }
  };

  const handleAttribute = (e) => {
    setConfig({
      ...config,
      filter: e.target.value,
    });
    if (swiper) {
      swiper.slideTo(0);
    }
  };

  useEffect(() => {
    const trait = traitsTable[config.filter.toLowerCase()];

    const selectedRarity = config.rarities.replace(" ", "").toLowerCase();
    setImageArray(
      selectedRarity === "all"
        ? Object.values(trait).flat()
        : trait[selectedRarity]
    );
  }, [config]);

  if (imageArray?.length === 0 || imageArray === undefined) {
    return (
      <div>
        <div className="select-wrapper">
          <label htmlFor="raritySelect">Rarity</label>
          <select name="raritySelect" id="raritySelect" onChange={handleRarity}>
            <option value="ALL">All</option>
            <option value="COMMON">Common</option>
            <option value="UNCOMMON">Uncommon</option>
            <option value="RARE">Rare</option>
            <option value="SUPERRARE">Superrare</option>
            <option value="MYTHIC">Mythic</option>
          </select>
        </div>
        <div className="select-wrapper">
          <label htmlFor="attributeSelect">Attribute</label>
          <select
            name="attributeSelect"
            id="attributeSelect"
            onChange={handleAttribute}
          >
            <option value="ACCESSORIES">Accessories</option>
            <option value="DIVISION">Division</option>
            <option value="EXTRA">Extra</option>
          </select>
        </div>
        <p>No Images to show.</p>
        <p>please choose another filter </p>
      </div>
    );
  }

  const classes = classNames("label-wrapper", {
    [`${getRarityName(
      traitsTable[config.filter.toLowerCase()],
      imageArray[activeIndex]
    )} `]: config.rarities === "ALL",
    common: config.rarities === "COMMON",
    uncommon: config.rarities === "UNCOMMON",
    rare: config.rarities === "RARE",
    superrare: config.rarities === "SUPERRARE",
    mythic: config.rarities === "MYTHIC",
  });

  return (
    <div className="rarities-wrapper">
      <div className="select-wrapper">
        <label htmlFor="raritySelect">Rarity</label>
        <select name="raritySelect" id="raritySelect" onChange={handleRarity}>
          <option value="ALL">All</option>
          <option value="COMMON">Common</option>
          <option value="UNCOMMON">Uncommon</option>
          <option value="RARE">Rare</option>
          <option value="SUPERRARE">Superrare</option>
          <option value="MYTHIC">Mythic</option>
        </select>
      </div>
      <div className="select-wrapper">
        <label htmlFor="attributeSelect">Attribute</label>
        <select
          name="attributeSelect"
          id="attributeSelect"
          onChange={handleAttribute}
        >
          <option value="ACCESSORIES">Accessories</option>
          <option value="DIVISION">Division</option>
          <option value="EXTRA">Extra</option>
        </select>
      </div>

      <Swiper
        className="rarity-swiper"
        navigation={true}
        slidesPerView={"auto"}
        effect={"coverflow"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        initialSlide={0}
        grabCursor={true}
        centeredSlides={true}
        watchOverflow={false}
        onSlideChange={(i) => {
          setActiveIndex(i.activeIndex);
        }}
        onSlidesLengthChange={(i) => {
          i.slideTo(0);
        }}
        updateOnImagesReady={true}
      >
        {imageArray.map((value, index) => {
          return (
            <SwiperSlide key={index}>
              <img src={`./images/${config.filter}/${value}`} alt="" />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className={classes}>
        {activeIndex < imageArray.length && (
          <div>
            <p>{getName(imageArray[activeIndex])}</p>
            <p>
              {getRarityPercent(imageArray[activeIndex], config.filter)} have
              this trait
            </p>
          </div>
        )}
        <p>{config.filter.toLocaleUpperCase()}</p>
        <p>
          {config.rarities === "All"
            ? getName(getRarityName(imageArray[activeIndex]).toString())
            : config.rarities.toUpperCase()}
        </p>
      </div>
    </div>
  );
}
