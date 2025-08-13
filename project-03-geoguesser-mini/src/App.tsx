import { useState } from 'react'

import './App.css'
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import 'leaflet/dist/leaflet.css';

import GameSetting from './GameSetting';
import Game from './Game';
import GamePrompter from './GamePrompter';

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

export const MAP_CENTER:[number,number] = [46.6034, 1.8883]; // Center of France

function App() {
  const [inGame, setInGame] = useState(false)
  const [gameMode, setGameMode] = useState<AreaType>('region')
  const [toGuess, setToGuess] = useState<string | null>(null);
  const [guessedCorrectly, setGuessedCorrectly] = useState<string | null>(null);
  const [guessedIncorrectly, setGuesseIncorrectly] = useState<string[]>([]);

  const handleStartGame = () => {
    setInGame(true);
    // @todo : randomize
    setToGuess(gameMode === 'region' ? 'Bretagne' : 'Finistère');
    setGuessedCorrectly(null);
    setGuesseIncorrectly([]);
  }

  const handleAreaClick = (name: string) => {
    if (guessedCorrectly) return; // Do not allow more guesses if already guessed correctly
    if (guessedIncorrectly.indexOf(name) !== -1) return; // Don't guess several times the same area
    if (guessedIncorrectly.length >= 3) return; // Do not allow more than 3 incorrect guesses
    if (name === toGuess) {
      setGuessedCorrectly(name);
    } else {
      setGuesseIncorrectly([...guessedIncorrectly, name]);
    }
  }

  const handleNewRound = () => {
    setGuessedCorrectly(null);
    setGuesseIncorrectly([]); // Reset incorrect guesses
    setToGuess(gameMode === 'region' ? 'Bretagne' : 'Finistère'); // Reset to a new guess
  }

  return (
    <>
      <h1 style={{width: "1000px"}}>Geoguesser Mini</h1>
      {inGame ? (
        <>
          <Game gameMode={gameMode} toGuess={toGuess}
            guessedCorrectly={guessedCorrectly}
            guessedIncorrectly={guessedIncorrectly}
            onAreaClick={handleAreaClick}/>
          <GamePrompter 
            toGuess={toGuess} guessedCorrectly={guessedCorrectly}
            guessedIncorrectly={guessedIncorrectly}
            onNewRoundClick={handleNewRound}/>
        </>  
      ) : (
        <GameSetting 
        gameMode={gameMode}
        onChangeGameMode={(m:AreaType) => setGameMode(m)}
        onStartGame={handleStartGame}/>
      )}
    </>
  )
}

export default App
