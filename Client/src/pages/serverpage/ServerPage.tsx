import { Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import Background from "../../globalscss/background/Background";
import ServerList from "./components/ServerList";

import "./styling/ServerPageStyling.scss";

function ServerPage() {
  return (
    <div className="serverpage-container">
      <Background />
      <Link to="/controller/homepage">
        <Tooltip title="Ga terug naar vorige pagina!">
          <h1>Server List</h1>
        </Tooltip>
      </Link>
      <ServerList />
    </div>
  );
}
export default ServerPage;
