import { BenefitIcon } from "./BenefitIcon";

interface BenefitItemProps {
  type: 'project' | 'automation' | 'pricing' | 'content' | 'flexibility' | 'unique';
  title: string;
  description: string;
  isInView: boolean;
  index: number;
}

export function BenefitItem({ type, title, description, isInView, index }: BenefitItemProps) {
  return (
    <div 
      className="flex flex-col items-center text-center"
      style={{
        transform: isInView ? "none" : "translateY(50px)",
        opacity: isInView ? 1 : 0,
        transition: `all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) ${0.5 + (index * 0.1)}s`
      }}
    >
      <BenefitIcon type={type} />
      <h3 className="text-2xl font-bold mt-6 mb-3">{title}</h3>
      <p className="text-gray-600 text-lg">{description}</p>
    </div>
  );
}