import React, { useState } from 'react';
import api from '../../api';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        try {
            await api.post('/contacts/', formData);
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error('Error submitting contact form:', error);
            setStatus('error');
        }
    };

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg mx-auto md:max-w-none md:grid md:grid-cols-2 md:gap-8">
                <div>
                    <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                        Contact Us
                    </h2>
                    <div className="mt-3">
                        <p className="text-lg text-gray-500">
                            Have questions or want to get involved? We'd love to hear from you.
                        </p>
                    </div>
                    <div className="mt-9">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                {/* Phone Icon */}
                                <svg className="h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <div className="ml-3 text-base text-gray-500">
                                <p>+1 (555) 123-4567</p>
                                <p className="mt-1">Mon-Fri 9am to 6pm PST</p>
                            </div>
                        </div>
                        <div className="mt-6 flex">
                            <div className="flex-shrink-0">
                                {/* Mail Icon */}
                                <svg className="h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div className="ml-3 text-base text-gray-500">
                                <p>support@churchapp.com</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-12 sm:mt-16 md:mt-0">
                    <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                        Send us a message
                    </h2>
                    <form onSubmit={handleSubmit} className="mt-9 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                        <div className="sm:col-span-2">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    autoComplete="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                            <div className="mt-1">
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
                                ></textarea>
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <button
                                type="submit"
                                disabled={status === 'submitting'}
                                className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                            >
                                {status === 'submitting' ? 'Sending...' : 'Send Message'}
                            </button>
                        </div>
                    </form>
                    {status === 'success' && (
                        <div className="mt-4 text-green-600 font-medium">Message sent successfully!</div>
                    )}
                    {status === 'error' && (
                        <div className="mt-4 text-red-600 font-medium">Failed to send message. Please try again.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Contact;
