import React from 'react';
import HomePageHero from './HomePageHero';
const HomePage: React.FC = () => {
    return (
        <>
            <HomePageHero />
            <section className="bg-white py-12">
                <div className="max-w-5xl mx-auto px-4 pb-100 text-center">
                    <h3 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
                        Welcome to Voice2Care
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Voice2Care is a platform designed to help care teams efficiently manage and respond to client
                        requests. Whether you're coordinating services, handling communication, or streamlining
                        documentation, our tools are built to support your workflow with simplicity and clarity.
                    </p>
                </div>
            </section>
        </>
    );
};

export default HomePage;