import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AppSidebar } from "./dashboard/AppSidebar";

const Navigation = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/dashboard");
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
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-72">
                <AppSidebar />
              </SheetContent>
            </Sheet>
            <div className="flex items-center gap-2">
              <img src="/lovable-uploads/06ebdf7c-e118-4380-b69a-9fcb3a5a21ff.png" alt="MovementBrand Logo" className="h-8 w-8" />
              <div className="text-xl font-bold">MovementBrand</div>
            </div>
          </div>
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
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;