import React, { useState } from 'react';
import { useGroups, useCreateGroup } from '../../hooks/useManagement';

const GroupManagement: React.FC = () => {
    const { data: groups, isLoading } = useGroups();
    const createGroup = useCreateGroup();
    const [newGroup, setNewGroup] = useState({ name: '', group_type: 'GENERAL' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createGroup.mutate(newGroup as any);
        setNewGroup({ name: '', group_type: 'GENERAL' });
    };

    if (isLoading) return <div>Loading groups...</div>;

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Group Management</h2>

            {/* Create Group Form */}
            <div className="bg-white shadow sm:rounded-lg mb-8">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Create New Group</h3>
                    <form onSubmit={handleSubmit} className="mt-5 sm:flex sm:items-center">
                        <div className="w-full sm:max-w-xs">
                            <label htmlFor="name" className="sr-only">Name</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                placeholder="Group Name"
                                value={newGroup.name}
                                onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mt-3 w-full sm:mt-0 sm:ml-3 sm:max-w-xs">
                            <label htmlFor="group_type" className="sr-only">Type</label>
                            <select
                                id="group_type"
                                name="group_type"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                value={newGroup.group_type}
                                onChange={(e) => setNewGroup({ ...newGroup, group_type: e.target.value })}
                            >
                                <option value="GENERAL">General</option>
                                <option value="LEADERSHIP">Leadership</option>
                                <option value="FINANCE">Finance</option>
                                <option value="TECH">Tech Team</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                            Create
                        </button>
                    </form>
                </div>
            </div>

            {/* Groups List */}
            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Type
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Created By (ID)
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {groups?.map((group) => (
                                        <tr key={group.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {group.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {group.group_type}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {group.created_by}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GroupManagement;
