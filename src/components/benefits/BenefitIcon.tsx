import { FileText, Repeat } from "lucide-react";

interface BenefitIconProps {
  type: 'project' | 'automation' | 'pricing' | 'content' | 'flexibility' | 'unique';
}

export function BenefitIcon({ type }: BenefitIconProps) {
  switch (type) {
    case 'project':
      return (
        <div className="w-24 h-24 bg-[#3EDAD9] rounded-full flex items-center justify-center relative">
          <div className="w-12 h-12 bg-[#FFD700] rounded-lg rotate-45 grid place-items-center">
            <div className="grid grid-cols-2 grid-rows-2 gap-1 -rotate-45">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-2 h-2 bg-black rounded-sm" />
              ))}
            </div>
          </div>
        </div>
      );
    case 'automation':
      return (
        <div className="w-24 h-24 bg-[#FF4500] rounded-full flex items-center justify-center">
          <div className="text-white">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 3L4 14H11L11 21L20 10H13L13 3Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      );
    case 'pricing':
      return (
        <div className="w-24 h-24 bg-[#4169E1] rounded-full flex items-center justify-center">
          <div className="w-16 h-16 relative">
            <div className="absolute inset-0 bg-white rounded-lg rotate-45"></div>
            <div className="absolute inset-2 flex items-center justify-center">
              <span className="text-2xl font-bold">$</span>
            </div>
          </div>
        </div>
      );
    case 'content':
      return (
        <div className="w-24 h-24 bg-[#8A2BE2] rounded-full flex items-center justify-center">
          <div className="text-[#FFD700]">
            <FileText size={40} />
          </div>
        </div>
      );
    case 'flexibility':
      return (
        <div className="w-24 h-24 bg-[#FFD700] rounded-full flex items-center justify-center">
          <div className="w-16 h-8 border-4 border-black rounded-full relative">
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-4 bg-[#FF4500]"></div>
          </div>
        </div>
      );
    case 'unique':
      return (
        <div className="w-24 h-24 bg-[#FFC0CB] rounded-full flex items-center justify-center">
          <div className="text-black">
            <Repeat size={40} />
          </div>
        </div>
      );
  }
}