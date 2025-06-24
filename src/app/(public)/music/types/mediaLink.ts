import { IconType } from "react-icons";
import { FaSpotify, FaYoutube, FaMusic, FaHeadphones } from "react-icons/fa";

export enum MediaType {
  Spotify = "spotify",
  YouTube = "youtube",
  Music = "music",
  Podcast = "podcast",
}

export const mediaIconMap: Record<MediaType, IconType> = {
  [MediaType.Spotify]: FaSpotify,
  [MediaType.YouTube]: FaYoutube,
  [MediaType.Music]: FaMusic,
  [MediaType.Podcast]: FaHeadphones,
};

export const mediaColorMap: Record<MediaType, { base: string; hover: string }> =
  {
    [MediaType.Spotify]: { base: "#1DB954", hover: "#17a44a" },
    [MediaType.YouTube]: { base: "#FF0000", hover: "#cc0000" },
    [MediaType.Music]: { base: "#6b21a8", hover: "#581c87" },
    [MediaType.Podcast]: { base: "#ff3eee", hover: "#c700b5" },
  };

export type MediaLink = {
  type: MediaType;
  url: string;
};
