import './App.scss';

import Cities from '../Cities/Cities';
import CityStorage from '../CityStorage/CityStorage';
import Storage from '../Storage/Storage';
import Transportations from '../Transportations/Transportations';

function App() {
  return (
    <div className="app">
      <h1 className="app-name">
        Спекулянт
      </h1>

      <Cities />

      <div className="content">
        <div className="column">
          <div className="storage">
            <Storage />
          </div>
          <div className="transportations">
            <Transportations />
          </div>
        </div>
        <div className="column">
          <div className="city-storage">
            <CityStorage />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
