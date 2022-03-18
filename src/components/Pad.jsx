function Pad({ source, description, letter, handleClick }) {
	return (
		<button
			id={description}
			className="drum-pad"
			onClick={handleClick}
		>
			{letter}
			<audio
				src={source}
				className="clip"
				id={letter}
			/>
		</button>
	)
}

export default Pad;