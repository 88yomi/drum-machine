function Pad({ source, description, letter, contact, removeContact }) {
	return (
		<button
			id={description}
			className="drum-pad"
			onMouseDown={contact}
			onMouseUp={removeContact}
			onTouchStart={contact}
			onTouchEnd={removeContact}
		>
			{letter}
			<audio
				src={source}
				className="clip"
				id={letter}
				muted
			/>
		</button>
	)
}

export default Pad;