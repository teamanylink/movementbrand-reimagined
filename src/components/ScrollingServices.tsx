import React from 'react';

const services = [
  { name: 'Landing Pages', color: 'border-[#FF69B4]' },
  { name: 'AI Images', color: 'border-[#32CD32]' },
  { name: 'Blogs', color: 'border-[#FF4500]' },
  { name: 'Carousels', color: 'border-[#9370DB]' },
  { name: 'Branding', color: 'border-[#FFD700]' },
];

const ScrollingServices = () => {
  return (
    <div className="w-full overflow-hidden bg-white py-12">
      <div className="relative flex">
        <div className="animate-scroll flex whitespace-nowrap gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className={`inline-flex items-center justify-center ${service.color} px-8 py-4 rounded-full text-black font-['Caveat'] text-xl border-2 hover:scale-105 transition-transform cursor-pointer min-w-max`}
            >
              {service.name}
            </div>
          ))}
        </div>
        <div className="animate-scroll2 flex whitespace-nowrap gap-6 absolute left-[100%] top-0">
          {services.map((service, index) => (
            <div
              key={`duplicate-${index}`}
              className={`inline-flex items-center justify-center ${service.color} px-8 py-4 rounded-full text-black font-['Caveat'] text-xl border-2 hover:scale-105 transition-transform cursor-pointer min-w-max`}
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