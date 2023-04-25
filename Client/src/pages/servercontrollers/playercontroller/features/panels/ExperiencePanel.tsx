import { CircularProgress, Tooltip } from "@mui/material";

import "./ExperiencePanelStyle.scss";

import { useEffect, useState } from "react";
import { socket } from "../../../../../socket/socket";
import IServer from "../../../../../interfaces/IServer";
import IPlayer from "../../../../../interfaces/IPlayer";

function ExperiencePanel(props: { server: IServer; player: IPlayer | null }) {
  const [experience, setExperience] = useState<number>(0);

  //INISIALISATION
  function sendExperience() {
    var actionJSON = {
      ExperienceLevel: experience,
      Type: "set",
    };
    socket.emit(
      "feature:player",
      socket.id,
      props.server.id,
      props.player?.uuid,
      "experience",
      actionJSON
    );
  }
  //Listeners & requesters
  useEffect(() => {
    function loadPlayerExperience() {
      var actionJSON = {
        ExperienceLevel: experience,
        Type: "get",
      };
      socket.emit(
        "feature:player",
        socket.id,
        props.server.id,
        props.player?.uuid,
        "experience",
        actionJSON
      );
    }
    function listenPlayerEXP() {
      socket.on(`player:get-experience-${props.player?.uuid}`, (experience) => {
        setExperience(experience);
      });
    }
    loadPlayerExperience();
    listenPlayerEXP();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //Function
  function handleExperienceChange(e: any) {
    setExperience(e.target.value);
  }
  if (props.player === null) {
    return <CircularProgress />;
  }
  return (
    <>
      <div className="panel-header">
        Experience Panel - {props.player.displayname}
      </div>
      <div className="panel-line"></div>
      <div className="experience-container">
        <form className="experience-form">
          <label>Experience Level:</label>
          <input
            type="number"
            onChange={handleExperienceChange}
            placeholder="Geef de experience in..."
            value={experience}
          />
          <Tooltip
            title="Geef de speler opgegeven experience"
            onClick={sendExperience}
          >
            <div className="experience-form-button">Give Experience</div>
          </Tooltip>
        </form>
      </div>
    </>
  );
}
export default ExperiencePanel;
