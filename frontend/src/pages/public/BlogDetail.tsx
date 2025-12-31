import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBlog } from '../../hooks/useContent';

const BlogDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data: blog, isLoading, error } = useBlog(id || '');

    if (isLoading) return <div className="text-center py-10">Loading...</div>;
    if (error) return <div className="text-center py-10 text-red-500">Error loading blog post</div>;
    if (!blog) return <div className="text-center py-10">Blog post not found</div>;

    return (
        <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
                <Link to="/blogs" className="text-indigo-600 hover:text-indigo-500">
                    &larr; Back to Blogs
                </Link>
            </div>
            <article className="prose lg:prose-xl mx-auto">
                <h1>{blog.title}</h1>
                <div className="text-gray-500 mb-6">
                    <span>{new Date(blog.create_at).toLocaleDateString()}</span>
                    <span className="mx-2">•</span>
                    <span>{blog.content_type === 'announcement' ? 'Announcement' : 'Blog'}</span>
                </div>
                <div className="whitespace-pre-wrap">{blog.text}</div>

                {blog.sections && blog.sections.length > 0 && (
                    <div className="mt-8 space-y-8">
                        {blog.sections.map((section) => (
                            <div key={section.id}>
                                {section.sub_title && <h3>{section.sub_title}</h3>}
                                {section.image && (
                                    <img
                                        src={section.image}
                                        alt={section.sub_title || 'Section image'}
                                        className="rounded-lg shadow-lg my-4 w-full"
                                    />
                                )}
                                <div className="whitespace-pre-wrap">{section.text}</div>
                            </div>
                        ))}
                    </div>
                )}
            </article>
        </div>
    );
};

export default BlogDetail;
