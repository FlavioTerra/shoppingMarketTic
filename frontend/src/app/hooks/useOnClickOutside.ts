import { RefObject, useEffect } from 'react';

const useOnClickOutside = (
	ref: RefObject<HTMLUListElement>,
	handler: (parans: unknown) => void
 ) => {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent | TouchEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				handler(event);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("touchstart", handleClickOutside);
		
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("touchstart", handleClickOutside);
		}
	}, [ref, handler]);
};

export { useOnClickOutside };