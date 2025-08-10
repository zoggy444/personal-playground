import { useState } from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import { GeoJSON } from 'react-leaflet/GeoJSON'
import { Button, RadioGroup, Radio } from "@blueprintjs/core";
import './App.css'
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import 'leaflet/dist/leaflet.css';


import departmentsData from '../data/departements-version-simplifiee.json' with { type: "json" };
import regionData from '../data/regions-version-simplifiee.json';
import type { GeoJsonObject } from 'geojson';

import regionGeoJson from '../data/geojson_data';

const MAP_CENTER:[number,number] = [46.6034, 1.8883]; // Center of France

function App() {
  const [inGame, setInGame] = useState(false)
  const [gameMode, setGameMode] = useState('regions')
  const [toGuess, setToGuess] = useState<string | null>(null);
  const [guessedCorrectly, setGuessedCorrectly] = useState<string | null>(null);
  const [guessedIncorrectly, setGuesseIncorrectly] = useState<string[]>([]);

  const geojsonData = regionGeoJson;

  const handleStartGame = () => {
    setInGame(true);
    // @todo : randomize
    setToGuess(gameMode === 'regions' ? 'Bretagne' : 'Finistère');
  }

  return (
    <>
      <h1 style={{width: "1000px"}}>Geoguesser Mini</h1>
      {inGame ? (
        <>
          <MapContainer center={MAP_CENTER} zoom={5} scrollWheelZoom={false}>
            {gameMode === 'regions' && Array.from(geojsonData.entries()).map(([k, v]) => (
              <GeoJSON
                  key={k} data={v.geojson}
                  style={{ 
                    color: `${ v.name == guessedCorrectly ? 'green' : guessedIncorrectly.indexOf(v.name) !== -1 ? 'red' : 'blue'}`,
                    weight: 1,
                    fillColor: `${ v.name == guessedCorrectly ? 'lightgreen' : guessedIncorrectly.indexOf(v.name) !== -1 ? 'lightred' : 'lightblue'}`,
                    fillOpacity: 0.25,
                    className: `region-${k}` }}
                  eventHandlers={{
                    click: () => {
                      console.log(`Clicked on ${v.name}`);
                      if (v.name === toGuess) {
                        setGuessedCorrectly(v.name);
                      }else{
                        setGuesseIncorrectly([...guessedIncorrectly, v.name]);
                      }
                    },
                  }}>

              </GeoJSON>
            ))}
            {gameMode === 'departments' && departmentsData.features.map((feature) => (
              <GeoJSON
                  key={feature.properties.code}
                  data={feature as GeoJsonObject}
                  style={{
                    color: `${ feature.properties.nom == guessedCorrectly ? 'green' : guessedIncorrectly.indexOf(feature.properties.nom) !== -1 ? 'red' : 'blue'}`, weight: 1,
                    fillColor: `${ feature.properties.nom == guessedCorrectly ? 'lightgreen' : guessedIncorrectly.indexOf(feature.properties.nom) !== -1 ? 'lightred' : 'lightblue'}`,
                    fillOpacity: 0.25,
                    className: `department-${feature.properties.code}` }}
                  eventHandlers={{
                    click: () => {
                      console.log(`Clicked on ${feature.properties.nom}`);
                      console.log(`Department code: ${feature.properties.code}`);
                      console.log(feature);
                      if (feature.properties.nom === toGuess) {
                        setGuessedCorrectly(feature.properties.nom);
                      }else {
                        setGuesseIncorrectly([...guessedIncorrectly, feature.properties.nom]);
                      }
                    },
                  }}>
              </GeoJSON>
            ))}
          </MapContainer>
          <p>Where is <i className='to-guess-name'>{toGuess}</i> ?</p>
          {guessedCorrectly && (
            <>
              <p>You guessed correctly !</p>
              <Button
                intent="primary" size="large"
                className="next-round-button"
                onClick={() => {
                  setGuessedCorrectly(null);
                  setToGuess(gameMode === 'regions' ? 'Bretagne' : 'Finistère'); // Reset to a new guess
                }}>
                Next Round
              </Button>
            </>
          )}
          {!guessedCorrectly && guessedIncorrectly.length !== 0 && (
            <>
              <p>You guessed incorrectly... try again!</p>
              {guessedIncorrectly.length >= 3 && (
                <>
                  <p>You have made 3 incorrect guesses. The correct answer was <i className='to-guess-name'>{toGuess}</i>.</p>
                  <Button
                    intent="primary" size="large"
                    className="next-round-button"
                    onClick={() => {
                      setGuessedCorrectly(null);
                      setToGuess(gameMode === 'regions' ? 'Bretagne' : 'Finistère'); // Reset to a new guess
                    }}>
                    Next Round
                  </Button>
                </>
              )}
            </>
          )}
        </>
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
              onClick={handleStartGame}>
                Start Game
            </Button>
          </div>
        )}
    </>
  )
}

export default App
