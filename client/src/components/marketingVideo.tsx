'use client';

import React from 'react';
import "../styles/marketingVideo.css";

const VideoComponent: React.FC = () => {

    const videoLink = "";
  return (
    <div className="container mt-4" dir="rtl">
      <h5 className="text-center mb-4">ואם עדיין לא השתכנעתם - מוזמנים לצפות בוידאו הבא</h5>
      <div className="video-container">
        <video controls width="1000">
          <source src={videoLink} type="video/mp4" />
          הדפדפן שלך אינו תומך בניגון וידאו.
        </video>
      </div>
    </div>
  );
};

export default VideoComponent;
