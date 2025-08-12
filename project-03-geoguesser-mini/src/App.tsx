import { useState } from 'react'
import { MapContainer } from 'react-leaflet'
import { GeoJSON } from 'react-leaflet/GeoJSON'
import { Button, RadioGroup, Radio } from "@blueprintjs/core";
import './App.css'
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import 'leaflet/dist/leaflet.css';


import departmentData from '../data/departements-version-simplifiee.json' with { type: "json" };
import regionData from '../data/regions-version-simplifiee.json';
import type { GeoJsonObject } from 'geojson';
import GameSetting from './GameSetting';

export type GeoDataType = {
    type: string;
    features: ({
        type: string;
        geometry: {
            type: string;
            coordinates: number[][][];
        };
        properties: {
            code: string;
            nom: string;
        };
    } | {
        type: string;
        geometry: {
            type: string;
            coordinates: number[][][][];
        };
        properties: {
            code: string;
            nom: string;
        };
    })[];
}
export type AreaType = 'region' | 'department';

const MAP_CENTER:[number,number] = [46.6034, 1.8883]; // Center of France

function App() {
  const [inGame, setInGame] = useState(false)
  const [gameMode, setGameMode] = useState<AreaType>('region')
  const [toGuess, setToGuess] = useState<string | null>(null);
  const [guessedCorrectly, setGuessedCorrectly] = useState<string | null>(null);
  const [guessedIncorrectly, setGuesseIncorrectly] = useState<string[]>([]);

  const geojsonData: GeoDataType = gameMode === 'region' ? regionData : departmentData;;

  const handleStartGame = () => {
    setInGame(true);
    // @todo : randomize
    setToGuess(gameMode === 'region' ? 'Bretagne' : 'Finistère');
    setGuessedCorrectly(null);
    setGuesseIncorrectly([]);
  }

  return (
    <>
      <h1 style={{width: "1000px"}}>Geoguesser Mini</h1>
      {inGame ? (
        <>
          <MapContainer center={MAP_CENTER} zoom={5} scrollWheelZoom={false}>
            {/* special key for area to guess to force a rerender on third fail guess and allow className to change*/}
            {geojsonData.features.map((feature) => (
              <GeoJSON
                  key={`${feature.properties.nom === toGuess ? guessedIncorrectly.length >=3 ? 'failed-' : 'to-guess-' : '' }${feature.properties.code}`}
                  data={feature as GeoJsonObject}
                  style={{
                    color: `${ feature.properties.nom == guessedCorrectly ? 'green' : guessedIncorrectly.indexOf(feature.properties.nom) !== -1 ? 'red' : 'blue'}`, weight: 1,
                    fillColor: `${ feature.properties.nom == guessedCorrectly ? 'lightgreen' : guessedIncorrectly.indexOf(feature.properties.nom) !== -1 ? 'lightred' : 'lightblue'}`,
                    fillOpacity: 0.25,
                    className: `area-${feature.properties.code} ${feature.properties.nom === toGuess ? guessedIncorrectly.length >=3 ? 'failed' : 'to-guess' : '' }` }}
                  eventHandlers={{
                    click: () => {
                      console.log(`Clicked on ${feature.properties.nom}`);
                      console.log(`Department code: ${feature.properties.code}`);
                      console.log(feature);
                      if (guessedCorrectly) return; // Do not allow more guesses if already guessed correctly
                      if (guessedIncorrectly.indexOf(feature.properties.nom) !== -1) return; // Do guess several times the same area
                      if (guessedIncorrectly.length >= 3) return; // Do not allow more than 3 incorrect guesses
                      if (feature.properties.nom === toGuess) {
                        setGuessedCorrectly(feature.properties.nom);
                      }else{
                        setGuesseIncorrectly([...guessedIncorrectly, feature.properties.nom]);
                      }
                    },
                    mouseover: (e) => {
                      const layer = e.target;
                      // Highlight the hovered area without changing color
                      layer.setStyle({
                        weight: 3, // Increase stroke width to highlight
                        fillOpacity: 1 // Increase fill opacity
                      });
                    },
                    mouseout: (e) => {
                      const layer = e.target;
                      // Reset the style when mouse leaves
                      layer.setStyle({
                        weight: 1, // Reset stroke width
                        fillOpacity: 0.25 // Reset fill opacity
                      });
                    }
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
                  setGuesseIncorrectly([]); // Reset incorrect guesses
                  setToGuess(gameMode === 'region' ? 'Bretagne' : 'Finistère'); // Reset to a new guess
                }}>
                New Round
              </Button>
            </>
          )}
          {!guessedCorrectly && guessedIncorrectly.length !== 0 && (
            <>
              {guessedIncorrectly.length < 3 && (
                <p>You guessed incorrectly... try again!</p>
              )}
              {guessedIncorrectly.length >= 3 && (
                <>
                  <p>You have made 3 incorrect guesses.</p>
                  <Button
                    intent="primary" size="large"
                    className="next-round-button"
                    onClick={() => {
                      setGuessedCorrectly(null);
                      setGuesseIncorrectly([]); // Reset incorrect guesses
                      setToGuess(gameMode === 'region' ? 'Bretagne' : 'Finistère'); // Reset to a new guess
                    }}>
                    New Round
                  </Button>
                </>
              )}
            </>
          )}
        </>
        ) : (
          <GameSetting 
            gameMode={gameMode}
            onChangeGameMode={(m:AreaType) => setGameMode(m)}/>
        )}
    </>
  )
}

export default App
