import { useEffect, useState } from 'react';

export default function useDetectWidth() {
	const [width, setWidth] = useState<number>(0);

	useEffect(() => {
		const getResize = () => {
			setWidth(window.innerWidth);
		};

		window.addEventListener('resize', getResize);

		getResize();

		return () => {
			window.removeEventListener('resize', getResize);
		};
	}, []);

	return width;
}
