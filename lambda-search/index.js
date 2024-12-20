/** @format */

import express from 'express';
import { Client } from '@opensearch-project/opensearch';
import serverless from 'serverless-http';
const app = express();

// Route for handling search requests
app.get('/search', async (req, res) => {
	try {
		console.log('Inside search query');
		// Extract query parameter from the request
		const searchTerm = req.query.q || '';

		console.log('search term is ', searchTerm);
		// Example search query

		var host =
			'https://viewtube-search:Nikhil!7@search-viewtube-search-7x2t5xknagw6si2oixf7tfv3iy.us-east-2.es.amazonaws.com';
		var client = new Client({
			node: host,
		});

		const { body } = await client.search({
			index: 'video', // Index name in OpenSearch
			body: {
				query: {
					simple_query_string: {
						query: searchTerm,
						fields: ['title', 'author', 'description', 'videoUrl'],
					},
				},
			},
		});

		// Process search results
		const hits = body.hits.hits;
		console.log(hits);

		res.status(200).json(hits);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
});

// Wrap the Express app with serverless-http
const wrappedApp = serverless(app);

// Export the wrapped app for Serverless Framework
export const handler = wrappedApp;
