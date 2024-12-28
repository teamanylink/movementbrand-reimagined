import { useEffect } from 'react';

const CalendlyBadge = () => {
  useEffect(() => {
    // Wait for Calendly to be loaded
    const interval = setInterval(() => {
      // @ts-ignore
      if (window.Calendly) {
        // @ts-ignore
        window.Calendly.initBadgeWidget({
          url: 'https://calendly.com/movementbrand/movement-brand-discovery-call',
          text: 'Book a call',
          color: '#0069ff',
          textColor: '#ffffff'
        });
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return null;
};

export default CalendlyBadge;