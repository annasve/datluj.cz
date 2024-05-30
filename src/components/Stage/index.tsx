import { useState } from 'react';
import Wordbox from '../Wordbox';
import wordList from '../../word-list';
import './style.css';

// TODO: temporary disable function - remove next line when you start using it
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
const generateWord = (size: number) => {
  const sizeIndex =
    size === undefined ? Math.floor(Math.random() * wordList.length) : size - 3;

  if (sizeIndex < 0 || sizeIndex >= wordList.length) {
    return null;
  }

  const words = wordList[sizeIndex];
  const wordIndex = Math.floor(Math.random() * words.length);
  return words[wordIndex];
};

const Stage = () => {
  const [words, setWords] = useState<string[]>(['jahoda', 'výhoda', 'pohoda']);

  const [mistakesCount, setMistakesCount] = useState<number>(0);

  //--set the wordset after one word was succesfully completed
  const handleFinish = () => {
    // //setWords([]); //mezikrok - první otestování, zda funguje handleFinish
    // const newWords: string[] = [generateWord(6)]; //mezikrok - ve words bylo nejdřív pouze 1 slovo, generovala sem nejdřív jedno

    //-- remove first word, generate a new last word
    words.shift();
    words.push(generateWord(6));
    const newWords = [...words];
    setWords(newWords);
  };

  const handleMistakeCount = () => {
    setMistakesCount(mistakesCount + 1);
  };

  return (
    <div className="stage">
      <div className="stage__mistakes">Chyb: {mistakesCount}</div>
      <div className="stage__words">
        {words.map((word, index) => (
          <Wordbox
            word={word}
            onFinish={handleFinish}
            key={word}
            active={index === 0 ? true : false}
            onMistake={handleMistakeCount}
          />
        ))}
      </div>
    </div>
  );
};

export default Stage;
