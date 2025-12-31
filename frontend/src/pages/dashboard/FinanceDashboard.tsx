import React, { useState } from 'react';
import { useFinanceRecords, useCreateFinanceRecord, useGroups } from '../../hooks/useManagement';

const FinanceDashboard: React.FC = () => {
    const { data: records, isLoading } = useFinanceRecords();
    const { data: groups } = useGroups();
    const createRecord = useCreateFinanceRecord();
    const [newRecord, setNewRecord] = useState({ amount: 0, description: '', group: '', date: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createRecord.mutate({
            ...newRecord,
            group: parseInt(newRecord.group),
            date: new Date().toISOString() // Simplified date handling
        } as any);
        setNewRecord({ amount: 0, description: '', group: '', date: '' });
    };

    if (isLoading) return <div>Loading finance records...</div>;

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Finance Dashboard</h2>

            {/* Create Record Form */}
            <div className="bg-white shadow sm:rounded-lg mb-8">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Add Finance Record</h3>
                    <form onSubmit={handleSubmit} className="mt-5 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                        <div>
                            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
                            <div className="mt-1">
                                <input
                                    type="number"
                                    name="amount"
                                    id="amount"
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                    value={newRecord.amount}
                                    onChange={(e) => setNewRecord({ ...newRecord, amount: parseFloat(e.target.value) })}
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="group" className="block text-sm font-medium text-gray-700">Group</label>
                            <div className="mt-1">
                                <select
                                    id="group"
                                    name="group"
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                    value={newRecord.group}
                                    onChange={(e) => setNewRecord({ ...newRecord, group: e.target.value })}
                                    required
                                >
                                    <option value="">Select Group</option>
                                    {groups?.map(g => (
                                        <option key={g.id} value={g.id}>{g.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                            <div className="mt-1">
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={3}
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                                    value={newRecord.description}
                                    onChange={(e) => setNewRecord({ ...newRecord, description: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <button
                                type="submit"
                                className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Add Record
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Records List */}
            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Description
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Amount
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Group ID
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {records?.map((record) => (
                                        <tr key={record.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(record.date).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {record.description}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                ${record.amount}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {record.group}
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

export default FinanceDashboard;
