
import React from 'react';

interface BeeLogoProps {
  className?: string;
}

const BeeLogo: React.FC<BeeLogoProps> = ({ className }) => {
  // --------------------------------------------------------------------------------
  // TODO: Replace the URL below with your hosted image link (from Imgur, ImgBB, etc.)
  // Make sure the link starts with 'https://' and ends with .png or .jpg
  // --------------------------------------------------------------------------------
  // Updated placeholder to a clearer bee image
  const LOGO_URL = "https://i.imgur.com/kA6N7Ge.png"; 

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
