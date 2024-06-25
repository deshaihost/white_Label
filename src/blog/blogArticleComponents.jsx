import React from 'react';

const thumbnailImg = "https://storage.googleapis.com/frontend_media/blog/5_best_PMS_6-13/Thumbnail.webp";
const hostawayImg = "https://storage.googleapis.com/frontend_media/blog/5_best_PMS_6-13/hostaway.webp";
const lodgifyImg = "https://storage.googleapis.com/frontend_media/blog/5_best_PMS_6-13/Lodgify.webp";
const hostfullyImg = "https://storage.googleapis.com/frontend_media/blog/5_best_PMS_6-13/Hostfully.webp";
const hospitableImg = "https://storage.googleapis.com/frontend_media/blog/5_best_PMS_6-13/Hospitable.webp";
const guestyImg = "https://storage.googleapis.com/frontend_media/blog/5_best_PMS_6-13/Guesty.webp";

const author_profiles = {
  "Jay Ullrich": "https://storage.googleapis.com/frontend_media/blog/jay_profile.webp",
  "Sam": "https://storage.googleapis.com/frontend_media/blog/sam_profile.webp"
}


export const BlogArticleSidebar = ({contents}) => {
  return (
    <div className="sidebar">
      <h2>Contents</h2>
      <ul>
        {contents.map((content, index) => (
          <li key={index}><a href={`#${content.id}`}>{content.name}</a></li>
        ))}
      </ul>
    </div>
  );
};

export const BlogArticleHeader = ({title, author, date, headerImage}) => {
  return (
    <>
      <div className="blog-article-header-banner">
        <h1>{title}</h1>
        <div className="blog-article-header-info">
          <p className="author"> <img src={author_profiles[author]} alt="Author Profile Img" className="author-img" />{author}</p>
          <p className="date">{date}</p>
        </div>
        <img src={headerImage} alt={title} className="blog-article-header-image" />
      </div>
    </>
  );
};