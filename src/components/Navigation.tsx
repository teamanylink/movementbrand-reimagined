import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const Navigation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = () => {
    navigate("/dashboard");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed out successfully",
      description: "You have been logged out of your account.",
    });
    navigate("/");
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-lg border-b border-white/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="text-xl font-bold">MovementBrand</div>
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('how-it-works')} 
              className="text-gray-600 hover:text-gray-900"
            >
              How it works
            </button>
            <button 
              onClick={() => scrollToSection('benefits')} 
              className="text-gray-600 hover:text-gray-900"
            >
              Benefits
            </button>
            <button 
              onClick={() => scrollToSection('pricing')} 
              className="text-gray-600 hover:text-gray-900"
            >
              Pricing
            </button>
            <button 
              onClick={() => scrollToSection('faqs')} 
              className="text-gray-600 hover:text-gray-900"
            >
              FAQs
            </button>
            <Button variant="default" onClick={handleLogin}>Login</Button>
            <Button variant="destructive" onClick={handleLogout}>Logout</Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;