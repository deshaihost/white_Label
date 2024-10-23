import { Link } from 'react-router-dom';
import React, { useState} from 'react';
import BookDemoModal from  '../component/bookDemoModal';

const author_profiles = {
  "Jay Ullrich": "https://hostbuddylb.com/blog/jay_profile.webp",
  "Sam": "https://hostbuddylb.com/blog/sam_profile.webp"
}

export const BlogArticleSidebar = ({ contents }) => {
  const [demoModalShow, setDemoModalShow] = useState(false);
  
  return (
    <section className='sidebar_container'>
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
    <div className='sidebarCTA'>
      <div className="started" style={{ padding: '20px 15px', margin: '20px 0px', background: '#000212' }}>
        <div className="started-content">
          <h4>Get Started Today!</h4>
          <p className='blog-change'>Sign up now to get a 2 week free trial.</p>
          <div style={{ marginBottom: '10px' }}>
            <Link className='explore-link' to="/signup">Start Your trial Today 
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13" fill="none">
                  <path d="M13.0303 7.03033C13.3232 6.73744 13.3232 6.26256 13.0303 5.96967L8.25736 1.1967C7.96447 0.903806 7.48959 0.903806 7.1967 1.1967C6.90381 1.48959 6.90381 1.96447 7.1967 2.25736L11.4393 6.5L7.1967 10.7426C6.90381 11.0355 6.90381 11.5104 7.1967 11.8033C7.48959 12.0962 7.96447 12.0962 8.25736 11.8033L13.0303 7.03033ZM0.5 7.25H12.5V5.75H0.5V7.25Z" fill="#146EF5"></path>
              </svg>
            </Link>
          </div>
          <div>
            <a style={{ cursor:"pointer" }}className='explore-link' target="_blank" rel="noopener noreferrer" onClick={(e) => {
                e.preventDefault(); // Don't go to the link - just open the modal
                setDemoModalShow(true);
            }}>
              Book a Demo
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13" fill="none">
                  <path d="M13.0303 7.03033C13.3232 6.73744 13.3232 6.26256 13.0303 5.96967L8.25736 1.1967C7.96447 0.903806 7.48959 0.903806 7.1967 1.1967C6.90381 1.48959 6.90381 1.96447 7.1967 2.25736L11.4393 6.5L7.1967 10.7426C6.90381 11.0355 6.90381 11.5104 7.1967 11.8033C7.48959 12.0962 7.96447 12.0962 8.25736 11.8033L13.0303 7.03033ZM0.5 7.25H12.5V5.75H0.5V7.25Z" fill="#146EF5"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
        <BookDemoModal show={demoModalShow} onHide={() => setDemoModalShow(false)} sourceMsg='blog cta'/>
    </div>
    </section>
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