import { Button } from '@blueprintjs/core';
import type { GamePrompterProps } from '../../types';

function GamePrompter({
  toGuess,
  guessedCorrectly,
  guessedIncorrectly,
  onNewRoundClick,
}: GamePrompterProps) {
  return (
  <>
    <div className="game-prompter">
    <h2>Welcome to GeoGuessr Mini!</h2>
    <p>Guess the area based on the map provided.</p>
    <p>Click on an area to make your guess.</p>
    <p>Good luck!</p>
    </div>
    <p>Where is <i className='to-guess-name'>{toGuess}</i> ?</p>
    {guessedCorrectly && (
    <>
      <p>You guessed correctly !</p>
      <Button
      intent="primary" size="large"
      className="next-round-button"
      onClick={onNewRoundClick}>
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
        onClick={onNewRoundClick}>
        New Round
        </Button>
      </>
      )}
    </>
    )}
  </>
  
  );
}

export default GamePrompter;