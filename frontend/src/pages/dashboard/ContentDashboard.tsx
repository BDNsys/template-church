import React, { useState } from 'react';
import { useCreateBlog, useUploadVideo, useUploadGalleryImage } from '../../hooks/useContent';

const ContentDashboard: React.FC = () => {
    const createBlog = useCreateBlog();
    const uploadVideo = useUploadVideo();
    const uploadImage = useUploadGalleryImage();

    const [activeTab, setActiveTab] = useState<'blog' | 'video' | 'gallery'>('blog');

    // Blog State
    const [blogData, setBlogData] = useState({ title: '', description: '', text: '', content_type: 'blog' });

    // Video State
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [videoTitle, setVideoTitle] = useState('');

    // Gallery State
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageTitle, setImageTitle] = useState('');

    const handleBlogSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createBlog.mutate(blogData as any);
        setBlogData({ title: '', description: '', text: '', content_type: 'blog' });
    };

    const handleVideoSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (videoFile) {
            const formData = new FormData();
            formData.append('video', videoFile);
            formData.append('video1', videoTitle);
            uploadVideo.mutate(formData);
            setVideoFile(null);
            setVideoTitle('');
        }
    };

    const handleImageSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (imageFile) {
            const formData = new FormData();
            formData.append('image', imageFile);
            formData.append('title', imageTitle);
            uploadImage.mutate(formData);
            setImageFile(null);
            setImageTitle('');
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Content Management</h2>

            <div className="bg-white shadow sm:rounded-lg">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex" aria-label="Tabs">
                        <button
                            onClick={() => setActiveTab('blog')}
                            className={`${activeTab === 'blog' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm`}
                        >
                            Blog / Announcement
                        </button>
                        <button
                            onClick={() => setActiveTab('video')}
                            className={`${activeTab === 'video' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm`}
                        >
                            Video
                        </button>
                        <button
                            onClick={() => setActiveTab('gallery')}
                            className={`${activeTab === 'gallery' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm`}
                        >
                            Gallery
                        </button>
                    </nav>
                </div>

                <div className="p-6">
                    {activeTab === 'blog' && (
                        <form onSubmit={handleBlogSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Type</label>
                                <select
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border"
                                    value={blogData.content_type}
                                    onChange={(e) => setBlogData({ ...blogData, content_type: e.target.value })}
                                >
                                    <option value="blog">Blog Post</option>
                                    <option value="announcement">Announcement</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border"
                                    value={blogData.title}
                                    onChange={(e) => setBlogData({ ...blogData, title: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border"
                                    value={blogData.description}
                                    onChange={(e) => setBlogData({ ...blogData, description: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Content</label>
                                <textarea
                                    rows={5}
                                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border"
                                    value={blogData.text}
                                    onChange={(e) => setBlogData({ ...blogData, text: e.target.value })}
                                    required
                                />
                            </div>
                            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Publish
                            </button>
                        </form>
                    )}

                    {activeTab === 'video' && (
                        <form onSubmit={handleVideoSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border"
                                    value={videoTitle}
                                    onChange={(e) => setVideoTitle(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Video File</label>
                                <input
                                    type="file"
                                    accept="video/*"
                                    className="mt-1 block w-full"
                                    onChange={(e) => setVideoFile(e.target.files ? e.target.files[0] : null)}
                                    required
                                />
                            </div>
                            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Upload Video
                            </button>
                        </form>
                    )}

                    {activeTab === 'gallery' && (
                        <form onSubmit={handleImageSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border"
                                    value={imageTitle}
                                    onChange={(e) => setImageTitle(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Image File</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="mt-1 block w-full"
                                    onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
                                    required
                                />
                            </div>
                            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Upload Image
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContentDashboard;
