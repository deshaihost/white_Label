import React from 'react';
import './blog.css';

const five_best_thumbnail = "https://hostbuddylb.com/blog/5_best_PMS_6-13/Thumbnail_small.webp";
const automate_str_thumbnail = "https://hostbuddylb.com/blog/thumbnail.webp";

const BlogLandingPage = () => {

    const articles = [
      { id:"automate_str_6-25", title:"How to Automate Your Short Term Rental Business", date:"Jun 25, 2024", img:automate_str_thumbnail, description:"In this post, we'll dive into the essentials of short term rental automation, from integrating a Property Management System (PMS) to implementing artificial intelligence for guest communication." },
      { id:"5_best_PMS_6-13", title:"5 Best Property Management Software of 2024 (Updated)", date:"Jun 13, 2024", img:five_best_thumbnail, description:"Are you ready to revolutionize your short term rental management game? Today, we're diving into the realm of Property Management Software (PMS) to unveil the best solutions of 2024." },
    ];

    return (
      <div className="blog-landing-page">
        <h1 className="blog-landing-page-title">HostBuddy AI - Blog</h1>
        <div className="blog-tiles">
          {articles.map(article => (
            <a href={`/blog/${article.id}`} key={article.id} className="blog-tile">
              <div className="blog-tile-image-container">
                <img src={article.img} alt={article.title} className="blog-tile-image" />
              </div>
              <h2 className="blog-tile-title">{article.title}</h2>
              <p className="blog-tile-date">{article.date}</p>
              <p className="blog-tile-description">{article.description}</p>
            </a>
          ))}
        </div>
      </div>
    );
};

export default BlogLandingPage;
