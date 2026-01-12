
import React from 'react';

interface BeeLogoProps {
  className?: string;
}

const BeeLogo: React.FC<BeeLogoProps> = ({ className }) => {
  // Update to local webp logo
  const LOGO_URL = "/images/speechive-logo.webp"; 

  return (
    <img 
      src={LOGO_URL} 
      alt="Speechive Bee Logo" 
      className={className}
      crossOrigin="anonymous" // Helps with some CORS issues when printing/exporting
    />
  );
};

export default BeeLogo;
