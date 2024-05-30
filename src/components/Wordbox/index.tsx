import React, { useState, useEffect } from 'react';
import './style.css';

interface IWordboxProp {
  word: string;
  onFinish: () => void;
  active: boolean;
  onMistake: () => void;
}

const Wordbox: React.FC<IWordboxProp> = ({
  word,
  onFinish,
  active,
  onMistake,
}) => {
  const [lettersLeft, setLettersLeft] = useState<string>(word);
  const [mistake, setMistake] = useState<boolean>(false);

  //(this: Document, ev: KeyboardEvent) => any
  const handleKeyUp = (evt: KeyboardEvent) => {
    //--remove correctly written first letter
    if (lettersLeft[0] === evt.key) {
      //--always make the field green
      setMistake(false);

      setLettersLeft(lettersLeft.slice(1));
      if (lettersLeft.length === 1) {
        onFinish(); //--new word appears
      }
    }

    //--incorrect user input
    if (lettersLeft[0] !== evt.key) {
      setMistake(true); //color changes to red
      onMistake(); //updates count info in Stage
    }
  };

  useEffect(() => {
    if (active) {
      document.addEventListener('keyup', handleKeyUp);
      return () => {
        document.removeEventListener('keyup', handleKeyUp);
      };
    }
  }, [lettersLeft, active, onMistake]);

  return (
    <div className={mistake ? 'wordbox wordbox--mistake' : 'wordbox'}>
      {lettersLeft}
    </div>
  );
};

export default Wordbox;
