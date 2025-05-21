import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-6 px-6 md:px-8 text-center bg-white dark:bg-gray-800 shadow-inner transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            © {new Date().getFullYear()} BEHZAD's Downloading. All rights reserved.
          </p>
          
          <div className="text-xs text-gray-500 dark:text-gray-400 max-w-xl text-center md:text-right">
            <p className="mb-2 font-medium">Legal Disclaimer:</p>
            <p>
              BEHZAD's Downloading is designed for downloading content for personal use only. Users are responsible 
              for complying with applicable copyright laws and the terms of service of content platforms. 
              Do not download copyrighted content without proper authorization.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;