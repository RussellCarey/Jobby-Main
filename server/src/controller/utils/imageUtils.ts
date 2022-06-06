import * as Jimp from 'jimp';

export const convertToSize = async (buffer: Buffer, name: string, width: number, height: number) => {
	const changedImage = await Jimp.read(buffer)
		.then((image) => {
			return image.resize(width, height);
		})
		.catch((err) => {
			console.log('Error with buffer');
		});

	return changedImage;
};
