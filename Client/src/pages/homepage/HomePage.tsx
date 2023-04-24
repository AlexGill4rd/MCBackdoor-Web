import { Button, IconButton } from "@mui/material";
import { Link } from "react-router-dom";

import "./styling/HomePageStyling.scss";
import Background from "../../globalscss/background/Background";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

function HomePage() {
  return (
    <div className="homepage-container">
      <Background />
      <div className="homepage-panel">
        <div className="homepage-panel-info">
          <div className="homepage-tab2" style={{ borderRadius: "20px 0 0 0" }}>
            <QuestionMarkIcon />

            <h4>Why did I make this?</h4>
            <p>
              Created a project to expand my knowledge. Out of making you learn
              the most from projects.
            </p>
          </div>
          <div className="homepage-tab" style={{ borderRadius: "0 20px 0 0" }}>
            <HelpOutlineIcon />
            <h4>How does it work?</h4>
            <p>
              When injecting the code into a minecraft plugin you will like
              owner will be able to access the entire server.
            </p>
          </div>
          <div className="homepage-tab2" style={{ borderRadius: "0 0 0 20px" }}>
            <DashboardIcon />
            <h4>What can you do?</h4>
            <p>
              The panel allows you to take full control of a particular server.
              This way you can adjust the files and more.
            </p>
          </div>
          <div className="homepage-tab" style={{ borderRadius: "0 0 20px 0" }}>
            <WarningAmberIcon />
            <h4>Warning!</h4>
            <p>
              This project is made for educational purposes only. So you are not
              allowed to use it outside your own development/testing zone!
            </p>
          </div>
        </div>
        <div className="homepage-panel-button">
          <Link to="/controller/homepage">
            <Button
              variant="contained"
              startIcon={<ArrowForwardIosIcon />}
              sx={{ width: "100%" }}
            >
              Go Further
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default HomePage;
