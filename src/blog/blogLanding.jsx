import React from 'react';
import './blog.css';
import five_best_thumbnail from '../public/img/blog/5_best_PMS_6-13/Thumbnail.jpg';
import AiBrainImg from '../public/img/blog/intelligence.png';

const BlogLandingPage = () => {

    const articles = [
        { id: "5_best_PMS_6-13", title: "5 Best Property Management Software of 2024 (Updated)", description: "Are you ready to revolutionize your short term rental management game? Today, we're diving into the realm of Property Management Software (PMS) to unveil the best solutions of 2024.", img: five_best_thumbnail },
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
              <p className="blog-tile-description">{article.description}</p>
            </a>
          ))}
        </div>
      </div>
    );
};

export default BlogLandingPage;
