import React from 'react';


const HomePageHero: React.FC = () => {
    return (
        <>
            <section className="relative w-full h-[60vh] bg-cover bg-center" style={{ backgroundImage: "url('/widehomepage.jpg')" }}>
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
                <h2 className="text-4xl md:text-8xl font-bold mb-2">Voice2Care</h2>
                <p className="text-lg md:text-xl font-medium">Your tool for managing client requests</p>
            </div>
            </section>

        </>
    );
};


export default HomePageHero;