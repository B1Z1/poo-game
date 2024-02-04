import { useCallback, useState } from "react";

enum Direction {
	LEFT = 'LEFT',
	RIGHT = 'RIGHT',
	MIDDLE = 'MIDDLE'
}

export const App = () => {
	const [direction, setDirection] = useState<Direction>(Direction.MIDDLE);
	const startAcceleration = useCallback(() => {
		DeviceMotionEvent.requestPermission()
			.then(response => {
				if (response === 'granted') {
					window.addEventListener('deviceorientation', (event: DeviceOrientationEvent) => {
						const { alpha } = event;

						if (!alpha) {
							return;
						}

						if (alpha > 10 && alpha < 100) {
							setDirection(Direction.LEFT)
						} else if (alpha < 350 && alpha > 260) {
							setDirection(Direction.RIGHT);
						} else {
							setDirection(Direction.MIDDLE);
						}
					})
				}
			})
	}, [])

	return (
		<>
			<button onClick={startAcceleration}>Start</button>

			<span>Direction: {direction}</span>
		</>
	)
}
