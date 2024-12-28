import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useRef, useState } from "react";

interface BookingDialogProps {
  children: React.ReactNode;
}

const BookingDialog = ({ children }: BookingDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Clean up any existing TidyCal elements
      const existingScript = document.querySelector('script[src*="tidycal"]');
      if (existingScript) {
        existingScript.remove();
      }

      // Create and load TidyCal script
      const script = document.createElement("script");
      script.src = "https://asset-tidycal.b-cdn.net/js/embed.js";
      script.async = true;
      script.crossOrigin = "anonymous";
      
      script.onload = () => {
        setTimeout(() => {
          if (window.TidyCal && containerRef.current) {
            try {
              window.TidyCal.init({
                baseUrl: "https://tidycal.com",
              });
            } catch (error) {
              console.error("Error initializing TidyCal:", error);
            }
          }
        }, 500);
      };

      script.onerror = (error) => {
        console.error("Error loading TidyCal script:", error);
      };

      document.body.appendChild(script);
      scriptRef.current = script;
    }

    return () => {
      if (scriptRef.current) {
        scriptRef.current.remove();
        scriptRef.current = null;
      }
    };
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Schedule a Meeting</DialogTitle>
          <DialogDescription>
            Choose a time that works best for you to discuss your project.
          </DialogDescription>
        </DialogHeader>
        <div 
          ref={containerRef}
          className="tidycal-embed w-full min-h-[600px]"
          data-path="denis5/15-minute-meeting"
        />
      </DialogContent>
    </Dialog>
  );
};

// Add TypeScript type for TidyCal
declare global {
  interface Window {
    TidyCal?: {
      init: (config?: { baseUrl?: string }) => void;
    };
  }
}

export default BookingDialog;