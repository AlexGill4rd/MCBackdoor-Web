import { Route, Routes } from 'react-router-dom';
import ControllerHomePage from './pages/controllerhome/ControllerHomePage';
import HomePage from './pages/homepage/HomePage';
import './globalscss/MainSCSS.scss';
import ServerPage from './pages/serverpage/ServerPage';
import PlayerControllerPage from './pages/servercontrollers/playercontroller/PlayerControllerPage';
import ServerControllerPage from './pages/servercontrollers/servercontroller/ServerControllerPage';
import ExtraControllerPage from './pages/servercontrollers/extracontroller/ExtraControllerPage';
import APIpage from './pages/api/APIpage';

import './globalscss/FancyScrollbar.scss';
import LogginControllerPage from './pages/servercontrollers/loggingcontroller/LogginControllerPage';
import SettingSelector from './pages/settingselectorpage/SettingSelector';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/controller/homepage' element={<ControllerHomePage />} />
      <Route path='/controller/servers' element={<ServerPage />} />
      <Route path='/controller/servers/:serverid' element={<SettingSelector />} />
      <Route path='/controller/servers/edit/player/:serverid' element={<PlayerControllerPage />} />
      <Route path='/controller/servers/edit/server/:serverid' element={<ServerControllerPage />} />
      <Route path='/controller/servers/edit/extra/:serverid' element={<ExtraControllerPage />} />
      <Route path='/controller/servers/logging/:serverid' element={<LogginControllerPage />} />
      <Route path='/API' element={<APIpage />} />
    </Routes>
  );
}

export default App;
