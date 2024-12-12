/** @format */

'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';
import NavBar from '../components/navbar';
import { useVideosStore } from '../zustand/useVideosStore';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

const VideoGrid = ({ videos, sourceKey = '' }) => (
	<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 m-10'>
		{videos.map((video, index) => (
			<div
				key={video[sourceKey]?.id || video.id || index}
				className='border rounded-md overflow-hidden'>
				<div>
					<ReactPlayer
						url={video[sourceKey]?.videoUrl || video.url}
						width='360px'
						height='180px'
						controls={true}
					/>
				</div>
				<div className='p-4'>
					<h2 className='text-lg font-semibold mb-2'>
						{video[sourceKey]?.title || video.title}
					</h2>
					<p className='text-gray-700'>
						Author - {video[sourceKey]?.author || video.author}
					</p>
					<p className='text-gray-700'>
						{video[sourceKey]?.description || video.description}
					</p>
				</div>
			</div>
		))}
	</div>
);

const YouTubeHome = () => {
	const [videos, setVideos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const { searchedVideos } = useVideosStore();

	useEffect(() => {
		const getVideos = async () => {
			try {
				setLoading(true);
				setError(null);
				const res = await axios.get('http://localhost:8090/watch/home');
				setVideos(res.data);
			} catch (err) {
				console.error('Error in fetching videos:', err);
				setError('Failed to load videos. Please try again later.');
			} finally {
				setLoading(false);
			}
		};
		getVideos();
	}, []);

	return (
		<>
			<NavBar />
			{loading ? (
				<div className='container mx-auto flex justify-center items-center h-screen'>
					<div className='animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500'></div>
				</div>
			) : error ? (
				<div className='text-center text-red-500 mt-10'>{error}</div>
			) : (
				<div>
					{searchedVideos.length > 0 && (
						<VideoGrid
							videos={searchedVideos}
							sourceKey='_source'
						/>
					)}
					{videos.length > 0 && <VideoGrid videos={videos} />}
				</div>
			)}
		</>
	);
};

export default YouTubeHome;
