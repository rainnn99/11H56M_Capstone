import React, { useState } from 'react';

function App() {
  const [items, setItems] = useState('');
  const [results, setResults] = useState([]);

  const handleChange = (event) => {
    setItems(event.target.value);
  }

  const startGame = () => {
    const itemList = items.split(',');
    const numItems = itemList.length;
    const numLines = 5; // 사다리 세로 줄 개수
    const resultsList = [];
    
    // 사다리 게임 실행
    for (let i = 0; i < numItems; i++) {
      let currentIndex = i;
      for (let j = 0; j < numLines; j++) {
        const rand = Math.random();
        if (rand < 0.5 && currentIndex > 0) {
          currentIndex--;
        } else if (rand >= 0.5 && currentIndex < numItems - 1) {
          currentIndex++;
        }
      }
      resultsList.push(itemList[currentIndex]);
    }

    setResults(resultsList);
  }

  return (
    <div className="container">
      <h1>사다리게임</h1>
      <div>
        <label htmlFor="items">선택지:</label>
        <input id="items" type="text" value={items} onChange={handleChange} />
      </div>
      <button onClick={startGame}>시작</button>
      {results.length > 0 &&
        <div>
          <h2>결과:</h2>
          <ul>
            {results.map((result, index) => (
              <li key={index}>{result}</li>
            ))}
          </ul>
        </div>
      }
    </div>
  );
}

export default App;
