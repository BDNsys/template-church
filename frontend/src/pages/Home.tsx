import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative bg-gray-900 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        className="w-full h-full object-cover"
                        src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                        alt="Church gathering"
                    />
                    <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
                </div>
                <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                        Welcome to our Church Community
                    </h1>
                    <p className="mt-6 text-xl text-gray-300 max-w-3xl">
                        Join us in worship, fellowship, and service. We are a community dedicated to growing in faith and love, welcoming everyone with open arms.
                    </p>
                    <div className="mt-10 max-w-sm sm:flex sm:max-w-none">
                        <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                            <Link
                                to="/register"
                                className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-indigo-50 sm:px-8"
                            >
                                Join Us
                            </Link>
                            <Link
                                to="/blogs"
                                className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 sm:px-8"
                            >
                                Latest News
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Feature Section */}
            <div className="py-16 bg-gray-50 overflow-hidden lg:py-24">
                <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
                    <div className="relative">
                        <h2 className="text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            Our Ministries
                        </h2>
                        <p className="mt-4 max-w-3xl mx-auto text-center text-xl text-gray-500">
                            Discover the various ways you can get involved and grow with us.
                        </p>
                    </div>

                    <div className="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
                        <div className="relative">
                            <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">
                                A place for everyone
                            </h3>
                            <p className="mt-3 text-lg text-gray-500">
                                Whether you are looking for a small group to study the Bible, opportunities to serve the community, or simply a place to belong, we have something for you.
                            </p>

                            <dl className="mt-10 space-y-10">
                                <div className="relative">
                                    <dt>
                                        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                                            {/* Icon: User Group */}
                                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                        </div>
                                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Community Groups</p>
                                    </dt>
                                    <dd className="mt-2 ml-16 text-base text-gray-500">
                                        Connect with others in small groups for fellowship, prayer, and Bible study.
                                    </dd>
                                </div>

                                <div className="relative">
                                    <dt>
                                        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                                            {/* Icon: Video Camera */}
                                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Sermons & Media</p>
                                    </dt>
                                    <dd className="mt-2 ml-16 text-base text-gray-500">
                                        Watch past sermons and access our media library anytime, anywhere.
                                    </dd>
                                </div>
                            </dl>
                        </div>

                        <div className="mt-10 -mx-4 relative lg:mt-0" aria-hidden="true">
                            <img
                                className="relative mx-auto"
                                width={490}
                                src="https://tailwindui.com/img/features/feature-example-1.png"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-indigo-700">
                <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                        <span className="block">Ready to dive in?</span>
                        <span className="block">Start your journey today.</span>
                    </h2>
                    <p className="mt-4 text-lg leading-6 text-indigo-200">
                        We'd love to have you join us for our next service or event.
                    </p>
                    <Link
                        to="/contact"
                        className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto"
                    >
                        Contact Us
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
