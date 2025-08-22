import departmentData from '../data/departements-version-simplifiee.json' with { type: "json" };
import regionData from '../data/regions-version-simplifiee.json';

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

const dptCodes = departmentData.features.map(f => f.properties.code);
const regCodes = regionData.features.map(f => f.properties.code);

const dptNames = departmentData.features.map(f => f.properties.nom);
const regNames = regionData.features.map(f => f.properties.nom);



export type AreaType = 'region' | 'department';

export type ControlPositionType = "bottomleft" | "bottomright" | "topleft" | "topright";

export type GuessStateType = {
  gameMode: AreaType;
  regLeftToGuess: Map<string, string>;
  regToGuess: string;
  regGuessed: boolean;
  regWrongGuesses: string[];
  deptLeftToGuess: Map<string, string>;
  deptToGuess: string;
  deptGuessed: boolean;
  deptWrongGuesses: string[];
}

export type GameSettingProps = {
  gameMode: string;
  onChangeGameMode: (mode: AreaType) => void;
  onStartGame: () => void;
};

export type GameProps = {
  gameMode: AreaType;
  victory: boolean;
  toGuess: string | null;
  guessedCorrectly: string | null;
  guessedIncorrectly: string[];
  onAreaClick: (name: string) => void;
  onNewRoundClick: () => void;
  onSettingsClick: () => void;
};

export type MapControlProps = {
  position: ControlPositionType;
  children?: React.ReactNode;
}

export type GamePrompterProps = {
  victory: boolean;
  toGuess: string | null;
  guessedCorrectly: string | null;
  guessedIncorrectly: string[];
  onNewRoundClick: () => void;
};

