import React from 'react';
import { useGallery } from '../../hooks/gallery/useGallery';

const Gallery: React.FC = () => {
    const { data: images, isLoading, error } = useGallery();

    if (isLoading) return <div className="text-center py-10">Loading gallery...</div>;
    if (error) return <div className="text-center py-10 text-red-500">Error loading gallery</div>;

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    Our Gallery
                </h2>
                <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                    Moments captured from our events and gatherings.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images?.map((image) => (
                    <div key={image.id} className="relative group">
                        <img
                            className="h-auto max-w-full rounded-lg object-cover w-full aspect-square"
                            src={image.image}
                            alt={image.title}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                            <p className="text-white opacity-0 group-hover:opacity-100 font-semibold text-lg transition-opacity duration-300 px-4 text-center">
                                {image.title}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gallery;
