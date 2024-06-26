import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FiveBestPMS from './blogArticles/5_best_PMS_6-13';
import automateStr from './blogArticles/automate_str_6-25';

const BlogArticle = () => {
  const { article_name } = useParams(); // Get the article_name from the path param
  const navigate = useNavigate();
  
  const name_to_article_mapping = {
    "5_best_PMS_6-13": FiveBestPMS,
    "automate_str_6-25": automateStr,
  };

  useEffect(() => {
    if (!name_to_article_mapping[article_name]) {
      navigate('/page-not-found'); // navigate to 404 page if blog not found, with link to return to HostBuddy home
    }
  }, [article_name, navigate, name_to_article_mapping]);

  if (!name_to_article_mapping[article_name]) {
    return null; // Stop rendering if the article is not found
  }

  return (
    <div className="blog-article">
      {React.createElement(name_to_article_mapping[article_name])}
    </div>
  );
};

export default BlogArticle;