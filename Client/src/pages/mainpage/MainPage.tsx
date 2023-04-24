import { Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import Background from "../../globalscss/background/Background";
import NavTab from "./components/NavTab";

import "./styling/MainPageStyling.scss";

function ControllerHomePage() {
  return (
    <div className="controllerhome-container">
      <Background />
      <Link to="/">
        <Tooltip title="Ga terug naar vorige pagina!">
          <h1>Selecteer één van de optie's om verder te gaan!</h1>
        </Tooltip>
      </Link>
      <div className="controllerhome-buttons">
        <NavTab
          title="Statistics"
          description="As an administrator you can view all the statistics of the plugins in this tab. This way you can see in which server the plugin is currently located and where which version is available. Click here to see more information!"
          path="/controller/servers"
          image="/icons/controllerpage/statistics.png"
        />
        <NavTab
          title="Hacked Servers"
          description="If you wish to manage the servers, you can navigate to this tab. You will receive a list of all the active servers and those that you can manage. Do you wish to continue? Then click on this tab."
          path="/controller/servers"
          image="/icons/controllerpage/servers.png"
        />
        <NavTab
          title="Updater"
          description="If you would like to upload a newer version of the plugin in all the servers, you can do so via this menu. You will be able to upload your new jar and send the jar to all the servers that are currently connected to the server."
          path="/controller/servers"
          image="/icons/controllerpage/updater.png"
        />
      </div>
    </div>
  );
}
export default ControllerHomePage;
