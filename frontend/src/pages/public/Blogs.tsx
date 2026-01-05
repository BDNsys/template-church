import React from 'react';
import { useBlogs } from '../../hooks/blog/useBlog';
import { Link } from 'react-router-dom';

const Blogs: React.FC = () => {
    const { data: blogs, isLoading, error } = useBlogs();
    if (isLoading) return <div className="text-center py-10">Loading blogs...</div>;
    if (error) return <div className="text-center py-10 text-red-500">Error loading blogs</div>;

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    Latest News & Announcements
                </h2>
                <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                    Stay updated with what's happening in our community.
                </p>
            </div>
            <div className="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
                {blogs?.map((blog) => (
                    <div key={blog.id} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                        <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                            <div className="flex-1">
                                <p className="text-sm font-medium text-indigo-600">
                                    {blog.content_type === 'announcement' ? 'Announcement' : 'Blog'}
                                </p>
                                <Link to={`/blogs/${blog.id}`} className="block mt-2">
                                    <p className="text-xl font-semibold text-gray-900">{blog.title}</p>
                                    <p className="mt-3 text-base text-gray-500">{blog.description}</p>
                                </Link>
                            </div>
                            <div className="mt-6 flex items-center">
                                <div className="flex-shrink-0">
                                    <span className="sr-only">{blog.author}</span>
                                    {/* Placeholder avatar */}
                                    <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
                                        {blog.author}
                                    </div>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-900">
                                        Author ID: {blog.author}
                                    </p>
                                    <div className="flex space-x-1 text-sm text-gray-500">
                                        <time dateTime={blog.create_at}>{new Date(blog.create_at).toLocaleDateString()}</time>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Blogs;
