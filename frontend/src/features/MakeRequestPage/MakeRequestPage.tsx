import React from 'react';
import ChatBubbles from './ChatBubbles/ChatBubbles';
const MakeRequestPage: React.FC = () => {
    return (
        <>
            <section className="bg-white py-12 min-h-screen">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <h3 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
                        Make a New Request
                    </h3>

                    <ChatBubbles />
                </div>

            </section>

        </>
    );
};

export default MakeRequestPage;