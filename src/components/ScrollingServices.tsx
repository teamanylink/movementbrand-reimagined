import React from 'react';

const services = [
  { name: 'Branding', color: 'bg-[#FFD700]' },
  { name: 'Logos', color: 'bg-[#40E0D0]' },
  { name: 'Design', color: 'bg-[#FF6B6B]' },
  { name: 'Digital Products', color: 'bg-[#4169E1]' },
  { name: 'Landing Pages', color: 'bg-[#FF69B4]' },
  { name: 'AI Images', color: 'bg-[#32CD32]' },
  { name: 'Blogs', color: 'bg-[#FF4500]' },
  { name: 'Carousels', color: 'bg-[#9370DB]' },
];

const ScrollingServices = () => {
  return (
    <div className="w-full overflow-hidden bg-white py-12">
      <div className="relative flex">
        <div className="animate-scroll flex whitespace-nowrap gap-6">
          {[...services, ...services, ...services].map((service, index) => (
            <div
              key={index}
              className={`inline-block ${service.color} px-8 py-4 rounded-full text-white font-medium shadow-md hover:scale-105 transition-transform cursor-pointer`}
            >
              {service.name}
            </div>
          ))}
        </div>
        <div className="animate-scroll2 flex whitespace-nowrap gap-6 absolute left-[100%]">
          {[...services, ...services, ...services].map((service, index) => (
            <div
              key={`duplicate-${index}`}
              className={`inline-block ${service.color} px-8 py-4 rounded-full text-white font-medium shadow-md hover:scale-105 transition-transform cursor-pointer`}
            >
              {service.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollingServices;