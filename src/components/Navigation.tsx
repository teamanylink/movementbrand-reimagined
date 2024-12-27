import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-lg border-b border-white/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="text-xl font-bold">MovementBrand</div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#how-it-works" className="text-gray-600 hover:text-gray-900">How it works</a>
            <a href="#benefits" className="text-gray-600 hover:text-gray-900">Benefits</a>
            <a href="#services" className="text-gray-600 hover:text-gray-900">Services</a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
            <a href="#faqs" className="text-gray-600 hover:text-gray-900">FAQs</a>
            <Button variant="default" onClick={() => navigate("/dashboard")}>Login</Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;