import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import { Button, RadioGroup, Radio } from "@blueprintjs/core";
import './App.css'
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import 'leaflet/dist/leaflet.css';
import { useState } from 'react'

const MAP_CENTER:[number,number] = [46.6034, 1.8883]; // Center of France

function App() {
  const [inGame, setInGame] = useState(false)
  const [gameMode, setGameMode] = useState('regions')

  return (
    <>
      <h1>Geoguesser Mini</h1>
      {inGame ? (
        <div id="map" style={{height: "500px", width: "100%", display:"block"}}>
          <MapContainer center={MAP_CENTER} zoom={5} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </MapContainer>
        </div>
      ) : (
        <div>
          <p>Welcome to Geoguesser Mini! Click the button below to start playing.</p>
          <RadioGroup
              label="Game Mode: " className="game-mode-selector"
              inline={true}
              onChange={(e) => setGameMode(e.currentTarget.value)}
              selectedValue={gameMode}>
            <Radio label="Regions" value="regions" />
            <Radio label="Departments" value="departments" />
          </RadioGroup>
          <Button 
            intent="primary" size="large"
            className="start-game-button"
            onClick={() => setInGame(true)}>
              Start Game
          </Button>
        </div>
      )}
    </>
  )
}

export default App
