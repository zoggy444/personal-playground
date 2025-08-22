import { Button, RadioGroup, Radio } from "@blueprintjs/core";
import type { AreaType } from "./../../App";

import "../../index.css"

type GameSettingProps = {
  gameMode: string;
  onChangeGameMode: (mode: AreaType) => void;
  onStartGame: () => void;
};

function GameSetting({gameMode, onChangeGameMode, onStartGame}: GameSettingProps) {
  return (
  <div className='game-setting'>
    <p>Welcome to Geoguesser Mini! Click the button below to start playing.</p>
    <RadioGroup
      label="Game Mode: " className="game-mode-selector"
      inline={true}
      onChange={(e) => onChangeGameMode(e.currentTarget.value as AreaType)}
      selectedValue={gameMode}>
      <Radio label="Regions" value="region" />
      <Radio label="Departments" value="department" />
    </RadioGroup>
    <Button 
      intent="primary" size="large"
      className="start-game-button"
      onClick={onStartGame}>
      Start Game
    </Button>
  </div>
  )
}

export default GameSetting;