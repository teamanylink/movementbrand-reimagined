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
  // Duplicate services for continuous scroll effect
  { name: 'Branding', color: 'bg-[#FFD700]' },
  { name: 'Logos', color: 'bg-[#40E0D0]' },
  { name: 'Design', color: 'bg-[#FF6B6B]' },
  { name: 'Digital Products', color: 'bg-[#4169E1]' },
];

const ScrollingServices = () => {
  return (
    <div className="w-full overflow-hidden bg-white py-8">
      <div className="animate-[scroll_20s_linear_infinite] flex whitespace-nowrap">
        {services.map((service, index) => (
          <div
            key={index}
            className={`inline-block mx-2 ${service.color} px-6 py-3 rounded-full text-white font-medium shadow-md hover:scale-105 transition-transform cursor-pointer`}
          >
            {service.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollingServices;