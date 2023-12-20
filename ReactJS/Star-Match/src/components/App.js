import React, { useState } from 'react';

// STAR MATCH - V9
import Game from './Game.js';

const StarMatch = () => {
	const [gameId, setGameId] = useState(1);
	return <Game key={gameId} startNewGame={() => setGameId(gameId + 1)}/>;
}

export default function App() {
  return <StarMatch />;
}