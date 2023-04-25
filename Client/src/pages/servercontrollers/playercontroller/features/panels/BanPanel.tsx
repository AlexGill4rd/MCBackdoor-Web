import { Button, CircularProgress } from "@mui/material";
import "./PanelStyle.scss";

import "./BanPanelStyle.scss";

import { useState } from "react";
import { socket } from "../../../../../socket/socket";

import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import frLocale from "date-fns/locale/fr";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import IServer from "../../../../../interfaces/IServer";
import IPlayer from "../../../../../interfaces/IPlayer";

function BanPanel(props: { server: IServer; player: IPlayer | null }) {
  const [banMessage, setBanMessage] = useState<string>("");
  const [banDuration, setBanDuration] = useState<Date | null>(null);
  const [typeBan, setTypeBan] = useState<string>("permban");

  function banPlayer() {
    var actionJSON = {
      Message: banMessage,
      EndBan: banDuration,
      Type: typeBan,
    };
    if (typeBan === "duration" && banDuration === null) {
      socket.emit(
        "feature:player-log",
        socket.id,
        "Niet al de waarden zijn ingegeven!",
        "warning"
      );
      return;
    }
    socket.emit(
      "feature:player",
      socket.id,
      props.server.id,
      props.player?.uuid,
      "ban",
      actionJSON
    );
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTypeBan((event.target as HTMLInputElement).value);
    setBanDuration(null);
  };
  function handeleBanMessageChange(e: any) {
    setBanMessage(e.target.value);
  }
  if (props.player === null) {
    return <CircularProgress />;
  }
  return (
    <>
      <div className="panel-header">Ban Panel - {props.player.displayname}</div>
      <div className="panel-line"></div>
      <div className="banpanel-container">
        <form className="banpanel-form">
          <TextField
            className="banpanel-form-messagebox"
            id="standard-basic"
            onChange={handeleBanMessageChange}
            label="Ban message"
            variant="standard"
            value={banMessage}
          />
          <RadioGroup
            className="banpanel-mid"
            row
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="permban"
            name="radio-buttons-group"
            onChange={handleChange}
          >
            <FormControlLabel
              value="permban"
              control={<Radio />}
              label="Perm Banned"
            />
            <FormControlLabel
              value="duration"
              control={<Radio />}
              label="Time Banned"
            />

            {typeBan === "duration" ? (
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={frLocale}
              >
                <DateTimePicker
                  minDate={new Date()}
                  InputProps={{
                    sx: {
                      width: "200px",
                    },
                  }}
                  renderInput={(props) => <TextField {...props} />}
                  label="DateTimePicker"
                  inputFormat="dd/MM/yyyy hh:mm"
                  value={banDuration}
                  onChange={(newValue) => {
                    setBanDuration(newValue);
                  }}
                />
              </LocalizationProvider>
            ) : (
              <></>
            )}
          </RadioGroup>
          <Button variant="outlined" sx={{ width: "100%" }} onClick={banPlayer}>
            Speler Verbannen
          </Button>
        </form>
      </div>
    </>
  );
}
export default BanPanel;
