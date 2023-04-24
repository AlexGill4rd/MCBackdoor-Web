import { Button, Tooltip } from "@mui/material";

import { FaCheckCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import IServer from "../../../interfaces/IServer";

import "./ServerTab.scss";

function ServerTab(props: { server: IServer }) {
  return (
    <div className="servertab">
      <Tooltip title={props.server.id} disableInteractive placement="top">
        <div className="servertab-id">Hover voor ID</div>
      </Tooltip>
      <div className="servertab-verticalline">|</div>
      <Tooltip
        title={props.server.software_version}
        disableInteractive
        placement="top"
      >
        <div className="servertab-image">
          <img src={props.server.favicon} alt="Server logo" />
        </div>
      </Tooltip>
      <div className="servertab-verticalline">|</div>
      <Tooltip title={props.server.motd} disableInteractive placement="top">
        <div className="servertab-ip">{props.server.ip_address}</div>
      </Tooltip>
      <div className="servertab-verticalline">|</div>
      <div className="servertab-players">
        {props.server.players_online === undefined
          ? "- / " + props.server.players_max
          : props.server.players_online + " / " + props.server.players_max}
      </div>

      {props.server.state ? (
        <>
          <div className="servertab-verticalline">|</div>
          <Link to={"/controller/servers/" + props.server.id}>
            <Button className="servertab-beheren" variant="contained">
              Beheren
            </Button>
          </Link>
        </>
      ) : (
        <></>
      )}
      <div className="servertab-verticalline">|</div>
      {props.server.state ? (
        <Tooltip title="Server ON">
          <div className="servertab-state" style={{ color: "lime" }}>
            <FaCheckCircle />
          </div>
        </Tooltip>
      ) : (
        <Tooltip title="Server OFF">
          <div className="servertab-state" style={{ color: "red" }}>
            <FaMinusCircle />
          </div>
        </Tooltip>
      )}
    </div>
  );
}
export default ServerTab;
