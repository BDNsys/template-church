// frontend/src/pages/dashboard/DashboardHome.tsx
import React from 'react';
import { useGroups, useMembers, useFinanceRecords } from '../../hooks/useManagement';
import { useBlogs } from '../../hooks/blog/useBlog';
import { useVideos } from '../../hooks/video/useVideo';
import { useGallery } from '../../hooks/gallery/useGallery';


const DashboardHome: React.FC = () => {

    const { data: groups } = useGroups();
    const { data: members } = useMembers();
    const { data: finance } = useFinanceRecords();
    const { data: blogs } = useBlogs();
    const { data: videos } = useVideos();
    const { data: gallery } = useGallery();

    const stats = [
        { name: 'Total Groups', value: groups?.length || 0 },
        { name: 'Total Members', value: members?.length || 0 },
        { name: 'Finance Records', value: finance?.length || 0 },
        { name: 'Blog Posts', value: blogs?.length || 0 },
        { name: 'Videos', value: videos?.length || 0 },
        { name: 'Gallery Images', value: gallery?.length || 0 },
    ];

    return (
        <div>
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                Dashboard Overview
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {stats.map((item) => (
                    <div key={item.name} className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <dt className="text-sm font-medium text-gray-500 truncate">
                                {item.name}

                            </dt>
                            <dd className="mt-1 text-3xl font-semibold text-gray-900">
                                {item.value}
                            </dd>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardHome;
