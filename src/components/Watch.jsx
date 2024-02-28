import Player from "./Player";
import Anicard from "./Anicard";

export default function Watch() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Player />
      </div>
      <br />
      <Anicard />
    </div>
  );
}
