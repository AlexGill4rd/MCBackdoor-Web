import { Tooltip } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import NavTab from "../mainpage/components/NavTab";
import "./SettingSelectorStyle.scss";
import Background from "../../globalscss/background/Background";

function SettingSelector() {
  let { serverid } = useParams();
  return (
    <div className="settingselector">
      <Background />
      <Link to="/controller/servers">
        <Tooltip title="Ga terug naar vorige pagina!">
          <h1>Server Controller Options</h1>
        </Tooltip>
      </Link>
      <div className="settingselector-buttons">
        <NavTab
          title="Player Settings"
          description="Execute specific actions on a player and modify various settings related to them. As a result, you'll have the power to adjust the player's inventory and a host of other features."
          path={"/controller/servers/edit/player/" + serverid}
          image="/icons/controllerpage/playerpanel.png"
        />
        <NavTab
          title="Server Settings"
          description="Do you wish to change the server settings? Or do you want to retrieve certain information from the server? You can do that perfectly through this tab. You will be able to view the console of the server and much more."
          path={"/controller/servers/edit/server/" + serverid}
          image="/icons/controllerpage/serverpanel.png"
        />
      </div>
    </div>
  );
}
export default SettingSelector;
