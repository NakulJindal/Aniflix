import YouTube from "react-youtube";
import { useRecoilValue } from "recoil";
import { trailerAtom } from "../recoil/atoms";

export default function Player() {
  const vidId = useRecoilValue(trailerAtom);

  const opts = {
    height: "540",
    width: "900",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return <YouTube videoId={vidId} opts={opts} />;
}
