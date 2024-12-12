/** @format */

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { Client } from '@opensearch-project/opensearch';

dotenv.config();
const app = express();
const port = process.env.PORT || 9010;

app.use(
	cors({
		allowedHeaders: ['*'],
		origin: '*',
	})
);
app.use(express.json());

// Route for uploading a video
app.post('/upload', async (req, res) => {
	try {
		console.log('Inside upload call');
		// Process video upload and extract metadata
		const { title, description, author, videoUrl } = req.body;

		var host =
			'https://viewtube-search:Nikhil!7@search-viewtube-search-7x2t5xknagw6si2oixf7tfv3iy.us-east-2.es.amazonaws.com';
		var client = new Client({
			node: host,
		});

		var index_name = 'video';
		var document = {
			title: title,
			author: author,
			description: description,
			videoUrl: videoUrl,
		};

		var response = await client.index({
			id: title, // id should ideally be db id
			index: index_name,
			body: document,
			refresh: true,
		});

		console.log('Adding document:');
		console.log(response.body);

		// Respond with success message
		res.status(200).json({ message: 'Video uploaded successfully' });
	} catch (error) {
		// Respond with error message
		console.log(error.message);
		res.status(500).json({ error: 'Internal server error' });
	}
});

app.get('/', (req, res) => {
	res.send('HHLD OpenSearch Demo');
});
app.listen(port, () => {
	console.log(`Server is listening at http://localhost:${port}`);
});
