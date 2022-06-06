export const checkImageIsEven = async (url: string) => {
	const image = new Image();
	image.src = url;
	const isEven = await new Promise((res, rej) => (image.onload = () => (image.width === image.height ? res(true) : res(false))));
	return isEven;
};

// export const checkFileSize = (file: File) => {
// 	if (file.size > 10000000) return false
// 	if (file.size <= 10000000) return true;
// };
