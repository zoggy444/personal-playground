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

export type ControlPositionType = "bottomleft" | "bottomright" | "topleft" | "topright";

export type GameSettingProps = {
  gameMode: string;
  onChangeGameMode: (mode: AreaType) => void;
  onStartGame: () => void;
};

export type GameProps = {
  gameMode: AreaType;
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
  toGuess: string | null;
  guessedCorrectly: string | null;
  guessedIncorrectly: string[];
  onNewRoundClick: () => void;
};

