import React from 'react';

const Hero = () => {
  return (
    <section className="relative h-[80vh] overflow-hidden pt-16">
      {/* Video background */}
      <div className="absolute inset-0 bg-black/60">
        {/* This would be a video in production, using a background div for the demo */}
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1571019613914-85f342c6a11e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80')",
            opacity: 0.6
          }}
        />
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/80 to-transparent" />
      
      {/* Hero content */}
      <div className="container mx-auto px-4 relative h-full flex flex-col justify-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Know Your Body. Own Your Health.</h1>
          <p className="text-lg md:text-xl text-[#a0a0a0] mb-8">
            WHOOP delivers personalized fitness, sleep, and recovery data to help you optimize your performance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#" 
              className="bg-[#009ffd] hover:bg-[#009ffd]/90 text-white font-semibold px-8 py-3 rounded-full text-center transition-colors"
            >
              Join Now
            </a>
            <a 
              href="#" 
              className="bg-transparent border border-white/30 hover:border-white text-white font-semibold px-8 py-3 rounded-full text-center transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
