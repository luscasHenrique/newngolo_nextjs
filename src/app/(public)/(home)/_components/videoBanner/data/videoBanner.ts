// src/data/videoBanner.ts

export interface VideoBannerData {
  title: string;
  buttonText: string;
  buttonHref: string;
  videoSrc: string;
}

export const videoBanner: VideoBannerData = {
  title: "BEGIN YOUR JOURNEY TODAY",
  buttonText: "FREE TRIAL",
  buttonHref: "/free-trial",
  videoSrc: "https://youtu.be/8yvGCAvOAfM?si=a0m2gBDVD9fKCcT9",
};
