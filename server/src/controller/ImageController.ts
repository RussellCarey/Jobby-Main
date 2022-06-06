import { Response, Request, NextFunction } from 'express';
import * as Jimp from 'jimp';
import { nextTick } from 'process';
import * as Slugify from 'slugify';

import catchAsync from '../utils/catchAsync';
import * as ImageUtils from './utils/imageUtils';

const AWS = require('aws-sdk');
const multer = require('multer');
const AppError = require('../utils/AppError');
const storage = multer.memoryStorage();

const s3Client = new AWS.S3({
	endpoint: process.env.SPACES_ENDPOINT,
	accessKeyId: process.env.AWS_KEY,
	secretAccessKey: process.env.AWS_SECRET,
	ACL: 'public-read',
});

let uploadParams = {
	Bucket: process.env.SPACES_BUCKET,
	Key: '',
	Body: '',
	ACL: 'public-read',
};

exports.uploadAll = multer({ storage: storage }).fields([{ name: 'image', maxCount: 1 }]);

exports.uploadProjectImages = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const projectName = Slugify.default(req.body.name);

	// Create slugged names for each iamge..
	const thumbnailImageName = `thumbnail-${projectName}-${+Date.now()}.png`;
	const largerImageName = `${projectName}-${+Date.now()}.png`;

	// Convert image to correct size..
	const thumbnail = await ImageUtils.convertToSize(req.files.image[0].buffer, thumbnailImageName, 250, 250);
	const larger = await ImageUtils.convertToSize(req.files.image[0].buffer, largerImageName, 600, Jimp.AUTO);

	// Set upload params for first image and send
	uploadParams.Key = thumbnailImageName;
	//@ts-ignore
	uploadParams.Body = await thumbnail.getBufferAsync(Jimp.MIME_PNG);
	await s3Client.upload(uploadParams, (err: Error) => {
		if (err) {
			throw new AppError(`Error uploading image thumbnail for project ${projectName}`, 500);
		}
	});

	// Set upload params for second image and send
	uploadParams.Key = largerImageName;
	//@ts-ignore
	uploadParams.Body = await larger.getBufferAsync(Jimp.MIME_PNG);
	await s3Client.upload(uploadParams, (err: Error) => {
		if (err) {
			throw new AppError(`Error uploading image large for project ${projectName}`, 500);
		}
	});

	// Add image URL to the request object to pass to the project controller
	req.project = { thumbnail: thumbnailImageName, larger: largerImageName };

	next();
});

exports.uploadUserImage = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const username = req.user.username;

	// Create slugged names for each iamge..
	const thumbnailImageName = `userthumbnail-${username}-${+Date.now()}.png`;
	const largerImageName = `userimage-${username}-${+Date.now()}.png`;

	// Convert image to correct size..
	const thumbnail = await ImageUtils.convertToSize(req.files.image[0].buffer, thumbnailImageName, 250, 250);
	const larger = await ImageUtils.convertToSize(req.files.image[0].buffer, largerImageName, 600, Jimp.AUTO);

	// Set upload params for first image and send
	uploadParams.Key = thumbnailImageName;
	//@ts-ignore
	uploadParams.Body = await thumbnail.getBufferAsync(Jimp.MIME_PNG);
	await s3Client.upload(uploadParams, (err: Error) => {
		if (err) {
			throw new AppError(`Error uploading image file for user ${username}`, 500);
		}
	});

	// Set upload params for second image and send
	uploadParams.Key = largerImageName;
	//@ts-ignore
	uploadParams.Body = await larger.getBufferAsync(Jimp.MIME_PNG);
	await s3Client.upload(uploadParams, (err: Error) => {
		if (err) {
			throw new AppError(`Error uploading image large for project ${username}`, 500);
		}
	});

	// Add image URL to the request object to pass to the user controller
	req.user.thumbnail = `${process.env.SPACES_NAME}/${thumbnailImageName}`;
	req.user.image = `${process.env.SPACES_NAME}/${largerImageName}`;

	next();
});

// Need image name to delete from the space
exports.deleteFileFromSpace = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const image = req.body.imageName;

	var params = { Bucket: 'droppyspace', Key: image };
	s3Client.deleteObject(params, (err: Error) => {
		if (err) {
			throw new AppError('Error uploading image file', 500);
		}
	});

	next();
});
