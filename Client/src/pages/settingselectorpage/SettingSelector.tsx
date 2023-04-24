import { Tooltip } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import NavTab from "../mainpage/components/NavTab";
import "./SettingSelectorStyle.scss";

function SettingSelector() {
  let { serverid } = useParams();
  return (
    <div className="settingselector">
      <Link to="/controller/servers">
        <Tooltip title="Ga terug naar vorige pagina!">
          <h1>Server Controller Optie's</h1>
        </Tooltip>
      </Link>
      <div className="settingselector-buttons">
        <NavTab
          title="Player Settings"
          description="Voer bepaalde acties bij een speler uit. Ben ook in staat om verschillende instellingen van de speler aan te passen. Zo zal je in staat zijn de speler zijn inventaris aan te passen en veel meer."
          path={"/controller/servers/edit/player/" + serverid}
          image="/icons/controllerpage/playerpanel.png"
        />
        <NavTab
          title="Server Settings"
          description="Wens je de server instellingen aan te passen. Of wil je bepaalde informatie van de sverer ophalen? Dat kan perfect via deze tab. Je zal in staat zijn de console van de server te bekijken en veel meer."
          path={"/controller/servers/edit/server/" + serverid}
          image="/icons/controllerpage/serverpanel.png"
        />
      </div>
    </div>
  );
}
export default SettingSelector;
