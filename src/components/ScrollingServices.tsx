import React from 'react';

const services = [
  { name: 'Landing Pages', color: 'border-black' },
  { name: 'AI Images', color: 'border-black' },
  { name: 'Blogs', color: 'border-black' },
  { name: 'Carousels', color: 'border-black' },
  { name: 'Branding', color: 'border-black' },
  { name: 'Logos', color: 'border-black' },
  { name: 'Slide Decks', color: 'border-black' },
  { name: 'Automations', color: 'border-black' },
];

const ScrollingServices = () => {
  return (
    <div className="w-full overflow-hidden bg-[#F8F8F8] py-12">
      <div className="max-w-[992px] mx-auto">
        <div className="relative flex">
          <div className="animate-scroll flex whitespace-nowrap gap-6">
            {[...services, ...services].map((service, index) => (
              <div
                key={index}
                className="inline-flex items-center justify-center px-8 py-3 rounded-full text-black font-['Caveat'] text-xl border-2 border-black bg-transparent hover:bg-black hover:text-white transition-all duration-300 cursor-pointer min-w-max shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
              >
                {service.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollingServices;