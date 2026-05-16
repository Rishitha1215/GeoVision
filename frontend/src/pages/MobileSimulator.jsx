import React from 'react';

const MobileSimulator = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] py-8 z-10 relative">
      {/* Phone Frame Simulator */}
      <div className="relative w-[360px] h-[740px] bg-gray-950 border-[14px] border-gray-900 rounded-[3rem] shadow-[0_0_50px_rgba(0,212,255,0.15)] overflow-hidden">
        {/* Notch Area */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-7 bg-gray-900 rounded-b-3xl w-40 z-20 flex justify-center items-center gap-2">
          <div className="w-12 h-1.5 bg-gray-800 rounded-full"></div>
          <div className="w-2.5 h-2.5 bg-gray-800 rounded-full"></div>
        </div>
        
        {/* Inner Iframe loading the app */}
        <iframe 
          src={window.location.origin} 
          title="Mobile View Simulator"
          className="w-full h-full border-0 bg-transparent relative z-10"
        />
      </div>
    </div>
  );
};

export default MobileSimulator;
