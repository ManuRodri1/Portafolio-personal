export const OFFICIAL_NAME = "Jose Manuel De Jesus Rodriguez"
export const JMDR_PERSONAL_LOGO_URL =
  "https://res.cloudinary.com/dzebed7jw/image/upload/v1777480679/32a74608-c781-4ba9-bf04-72d9b61c5d36_mfqdc9.png"

export const profile = {
  name: OFFICIAL_NAME,
  fullName: OFFICIAL_NAME,
  location: "Dominican Republic",
  email: "edejesus292@gmail.com",
  resumeUrl:
    "https://drive.google.com/file/d/1VwCk_tNuh5EotRqaao2qeWFOAmldfY6W/view?usp=sharing",
  urls: {
    linkedIn:
      "https://www.linkedin.com/in/jose-manuel-de-jesus-rodriguez-5a0981177",
    github: "https://github.com/ManuRodri1",
    site: "https://www.jmrodri.site",
    commercialSite: "https://www.jmrodri.site",
  },
  logo: {
    src: JMDR_PERSONAL_LOGO_URL,
    width: 2048,
    height: 2048,
    alt: `${OFFICIAL_NAME} personal JMDR logo`,
  },
  photos: {
    hero: {
      src: "https://res.cloudinary.com/dzebed7jw/image/upload/v1787062866/Session_de_fotos_1_ftzxuv.jpg",
      width: 1536,
      height: 2048,
      alt: `${OFFICIAL_NAME} seated in a blue studio portrait`,
    },
    about: {
      src: "https://res.cloudinary.com/dzebed7jw/image/upload/v1787062866/Session_de_fotos_2_pzxnrb.jpg",
      width: 1536,
      height: 2048,
      alt: `${OFFICIAL_NAME} standing in a blue studio portrait`,
    },
  },
} as const
