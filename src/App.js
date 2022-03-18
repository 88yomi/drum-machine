import { useState, useEffect } from 'react';
import './App.css';

import Pad from './components/Pad';
import AUDIO from './components/Audio';

const keys = Object.keys(AUDIO); //Q, W, E...
const keyCodes = [81, 87, 69, 65, 83, 68, 90, 88, 67];

function App() {
	const [trigger, setTrigger] = useState('');

	useEffect(() => {
		function handleKeyPress(e) {
			if (keyCodes.includes(e.keyCode)) {
				let char = String.fromCharCode(e.keyCode);
				document.getElementById(char).play();
			}
		};
		document.addEventListener('keydown', handleKeyPress);
		return () => document.removeEventListener(handleKeyPress);
	}, []);

	const handleClick = e => {
		setTrigger(e.target.id);
		e.target.querySelector(".clip").play();
	}

	return (
		<main id="drum-machine">
			<section id="display">
				{trigger}
			</section>
			<section id="tap">
				{keys.map(item => {
					return <Pad
						source={AUDIO[item][0]}
						description={AUDIO[item][1]}
						letter={item}
						key={item}
						handleClick={handleClick}
					/>
				})
				}
			</section>
		</main>
	)
}

export default App;