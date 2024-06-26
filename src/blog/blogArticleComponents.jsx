import React from 'react';

const author_profiles = {
  "Jay Ullrich": "https://hostbuddylb.com/blog/jay_profile.webp",
  "Sam": "https://hostbuddylb.com/blog/sam_profile.webp"
}

export const BlogArticleSidebar = ({ contents }) => {
  return (
    <div className="sidebar">
      <h2>Contents</h2>
      <ul>
        {contents.map((content, index) => (
          <li key={index}><a href={`#${content.id}`}>{content.name}</a></li>
        ))}
      </ul>
      <hr />
      <a href="/blog" className="return-to-blog">&lt; More Articles</a>
    </div>
  );
};

export const BlogArticleHeader = ({ title, author, date, headerImage }) => {
  return (
    <>
      <div className="blog-article-header-banner">
        <h1>{title}</h1>
        <div className="blog-article-header-info flex-wrap">
          <p className="author"> <img src={author_profiles[author]} alt="Author Profile Img" className="author-img" />{author}</p>
          <p className="date">{date}</p>
        </div>
        <img src={headerImage} alt={title} className="blog-article-header-image" />
      </div>
    </>
  );
};