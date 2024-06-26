import React from 'react';
import { BlogArticleSidebar, BlogArticleHeader } from '../blogArticleComponents';

const thumbnailImg = "https://hostbuddylb.com/blog/thumbnail.webp";
const smartLockImg = "https://hostbuddylb.com/blog/automate_str_6-25/smartLock.jpg";
const HostBuddyImg = "https://hostbuddylb.com/blog/automate_str_6-25/HostBuddy_logo.webp";
const TurnoImg = "https://hostbuddylb.com/blog/automate_str_6-25/turno-banner.webp";

const sideBarContents = [
]

const FiveBestPMS = () => {
  return (
    <div className="blog-article-page">
      <BlogArticleHeader title="How to Automate Your Short Term Rental Business" author="Jay Ullrich" date="June 25, 2024" headerImage={thumbnailImg} />
      
      <div className="blog-article-sidebar-and-content">
        <BlogArticleSidebar contents={sideBarContents} />
        <div className="blog-article-content">
          
          
        </div>
      </div>
    </div>
  );
};

export default FiveBestPMS;


