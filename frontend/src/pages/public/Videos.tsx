import React from 'react';
import { useVideos } from '../../hooks/useContent';

const Videos: React.FC = () => {
    const { data: videos, isLoading, error } = useVideos();

    if (isLoading) return <div className="text-center py-10">Loading videos...</div>;
    if (error) return <div className="text-center py-10 text-red-500">Error loading videos</div>;

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    Sermons & Videos
                </h2>
                <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                    Watch our latest sermons and video content.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {videos?.map((video) => (
                    <div key={video.id} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                        <div className="flex-shrink-0">
                            {video.video ? (
                                <video controls className="h-48 w-full object-cover">
                                    <source src={video.video} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            ) : (
                                <div className="h-48 w-full bg-gray-200 flex items-center justify-center">
                                    <span className="text-gray-500">No video source</span>
                                </div>
                            )}
                        </div>
                        <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                            <div className="flex-1">
                                <p className="text-xl font-semibold text-gray-900">{video.video1 || 'Untitled Video'}</p>
                                <div className="flex space-x-1 text-sm text-gray-500 mt-2">
                                    <time dateTime={video.create_at}>{new Date(video.create_at).toLocaleDateString()}</time>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Videos;
