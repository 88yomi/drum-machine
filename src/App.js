import { useState, useEffect } from 'react';
import './App.scss';

import Pad from './components/Pad';
import Footer from './components/Footer';

import AUDIO from './components/Audio';
import AUDIO2 from './components/Audio2';

const keys = ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"];
const keyCodes = [81, 87, 69, 65, 83, 68, 90, 88, 67];

function App() {
	const [trigger, setTrigger] = useState('');
	const [changePack, setChangePack] = useState(false);

	useEffect(() => {
		// to prevent the error of no DOM interaction before audio plays
		document.querySelector('.clip').muted = true;

		function handleKeyDown(e) {
			if (keyCodes.includes(e.keyCode)) {
				let alphabet = String.fromCharCode(e.keyCode);
				let alphabetAudioElement = document.getElementById(alphabet);
				alphabetAudioElement.currentTime = null;
				alphabetAudioElement.play();
				setTrigger(alphabetAudioElement.parentElement.id);

				let buttonElement = document.getElementById(alphabet).parentElement;
				buttonElement.classList.add('pressed');
			}
		};

		function handleKeyUp(e) {
			if (keyCodes.includes(e.keyCode)) {
				let alphabet = String.fromCharCode(e.keyCode);
				let buttonElement = document.getElementById(alphabet).parentElement;
				buttonElement.classList.remove('pressed');
			}
		}

		document.addEventListener('keydown', handleKeyDown);
		document.addEventListener('keyup', handleKeyUp);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			document.removeEventListener('keyup', handleKeyUp);
		}
	}, []);

	const handleContact = e => {
		let button = e.target;
		button.classList.add("pressed");
		setTrigger(button.id);

		button.querySelector(".clip").currentTime = null;
		button.querySelector(".clip").muted = false;
		button.querySelector(".clip").play();
	}

	const handleRemoveContact = (e) => {
		// to prevent mouse events from firing
		e.preventDefault();
		let button = e.target;
		button.classList.remove("pressed");
	}

	const handlePack = e => {
		e.target.classList.toggle('first-pack')
		setChangePack(!changePack);
	}

	// change source, description;
	let AUDSRC;
	if (!changePack) {
		AUDSRC = AUDIO;
	}
	else {
		AUDSRC = AUDIO2;
	}

	return (
		<>
			<h1>Drum Machine</h1>
			<section id="drum-machine">
				<div className="drum-machine__wrapper">
					<section id="display">
						{trigger}
					</section>
					<section id="tap">
						{keys.map(item => {
							return <Pad
								source={AUDSRC[item][0]}
								description={AUDSRC[item][1]}
								letter={item}
								key={item}
								contact={handleContact}
								removeContact={handleRemoveContact}
							/>
						})
						}
					</section>

					<div id="change-pack" className="first-pack" onClick={handlePack} />
					<div id="pack-text">Pack 1</div>
				</div>
			</section>
			<Footer />
		</>
	)
}

export default App;