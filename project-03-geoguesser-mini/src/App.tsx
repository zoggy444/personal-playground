import { useState } from 'react'

import './index.css'
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import 'leaflet/dist/leaflet.css';

import GameSetting from './components/pages/GameSetting';
import Game from './components/pages/Game';
import type { AreaType } from './types';

import departmentData from '../data/departements-version-simplifiee.json' with { type: "json" };
import regionData from '../data/regions-version-simplifiee.json';

export const MAP_CENTER:[number,number] = [46.6034, 1.8883]; // Center of France

const regInitKVMap = new Map<string, string>(
  regionData.features.map(feature => [feature.properties.code, feature.properties.nom]
));
const dptInitKVMap = new Map<string, string>(
  departmentData.features.map(feature => [feature.properties.code, feature.properties.nom])
);

function getRandomKey(collection:Map<string, string>) {
    let keys = Array.from(collection.keys());
    return keys[Math.floor(Math.random() * keys.length)];
}

function App() {
  const [inGame, setInGame] = useState(false);
  const [victory, setVictory] = useState(false);
  const [gameMode, setGameMode] = useState<AreaType>('region');
  const [dptGuessMap, setDptGuessMap] = useState(new Map(dptInitKVMap))
  const [regGuessMap, setRegGuessMap] = useState(new Map(regInitKVMap))
  const [toGuess, setToGuess] = useState<string | null>(null);
  const [guessedCorrectly, setGuessedCorrectly] = useState<string | null>(null);
  const [guessedIncorrectly, setGuesseIncorrectly] = useState<string[]>([]);

  const setNewToGuess = function () {
    if (gameMode == 'region') {
      const newKey = getRandomKey(regGuessMap)
      setToGuess(regGuessMap.get(newKey) || null)
    }else{
      const newKey = getRandomKey(dptGuessMap)
      setToGuess(dptGuessMap.get(newKey) || null)
    }
  }

  const handleStartGame = () => {
    setInGame(true);
    // @todo : randomize
    setNewToGuess();
    setGuessedCorrectly(null);
    setGuesseIncorrectly([]);
    setVictory(false);
    setDptGuessMap(new Map(dptInitKVMap))
    setRegGuessMap(new Map(regInitKVMap))
    console.log(regGuessMap)
  }

  const handleAreaClick = (name: string) => {
    if (guessedCorrectly) return; // Do not allow more guesses if already guessed correctly
    if (guessedIncorrectly.indexOf(name) !== -1) return; // Don't guess several times the same area
    if (guessedIncorrectly.length >= 3) return; // Do not allow more than 3 incorrect guesses
    if (name === toGuess) {
      setGuessedCorrectly(name);
      if (gameMode == 'region') {
        const newRegMap = new Map(
          [...regGuessMap]
          .filter(([, v]) => v !== toGuess )
        );
        if (newRegMap.size === 0) setVictory(true)
        setRegGuessMap(newRegMap)
      }else{
        const newDptMap = new Map(
          [...dptGuessMap]
          .filter(([, v]) => v !== toGuess )
        );
        if (newDptMap.size === 0) setVictory(true)
        setDptGuessMap(newDptMap)
      }
    } else {
      setGuesseIncorrectly([...guessedIncorrectly, name]);
    }
  }

  const handleNewRound = () => {
    setGuessedCorrectly(null);
    setGuesseIncorrectly([]); // Reset incorrect guesses
    setNewToGuess();
  }

  const handleSettingsClick = () => {
    setInGame(false);
  }

  return (
    <>
      {inGame ? (
        <>
          <Game gameMode={gameMode} toGuess={toGuess}
            victory={victory}
            guessedCorrectly={guessedCorrectly}
            guessedIncorrectly={guessedIncorrectly}
            onAreaClick={handleAreaClick}
            onNewRoundClick={handleNewRound}
            onSettingsClick={handleSettingsClick}
            onStartGameClick={handleStartGame}/>
        </>  
      ) : (
        <>
          <h1>Geoguesser Mini</h1>
          <GameSetting 
          gameMode={gameMode}
          onChangeGameMode={(m:AreaType) => setGameMode(m)}
          onStartGame={handleStartGame}/>
        </>
      )}
    </>
  )
}

export default App
