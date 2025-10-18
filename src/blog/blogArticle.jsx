import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FiveBestPMS from './blogArticles/5_best_PMS_6-13';
import automateStr from './blogArticles/automate_str_6-25';
import ownerRezPmsPartners from './blogArticles/ownerRez_pms_partners';
import whyYouNeedAi from './blogArticles/why_you_need_ai';
import hostawayPmsPartners from './blogArticles/hostaway_pms_partners';
import needVirtualAssistant from './blogArticles/need_virtual_assistant';
import tiredOfNegativeReviews from './blogArticles/tired_of_negative_reviews';
import guestyHostbuddyJoin from './blogArticles/guesty_hostbuddy_join';
import smartTemplates from './blogArticles/smart_templates';
import guideToVacationRentalUpsells from './blogArticles/guide_to_vacation_rental_upsells';
import minutAlertsIntoInstantAction from "./blogArticles/minut_alerts_into_instant_action";
import meetTheCoFounders from './blogArticles/meet_the_co_founders';
import strMarket from './blogArticles/str_market_4-22';
import hostfullyGuidebooksArticle from './blogArticles/hostfully_guidebooks_blog';
import inboxBlogArticle from './blogArticles/inbox_blog';
import openPhoneBlogArticle from './blogArticles/openPhone_blog';
import hospitableSenderBlog from './blogArticles/Hospitable_sender_blog';
import MountBlog from './blogArticles/MountBlog';

const BlogArticle = () => {
  const { article_name } = useParams(); // Get the article_name from the path param
  const navigate = useNavigate();
  
  const name_to_article_mapping = {
    "5_best_PMS_6-13": FiveBestPMS,
    "automate_str_6-25": automateStr,
    "ownerRez_pms_partners": ownerRezPmsPartners,
    "why_you_need_ai": whyYouNeedAi,
    "hostaway_pms_partners" : hostawayPmsPartners,
    "need_virtual_assistant" : needVirtualAssistant,
    "tired_of_negative_reviews" :tiredOfNegativeReviews,
    "guesty_hostbuddy_join" :guestyHostbuddyJoin,
    "smart_templates": smartTemplates,
    "guide_to_vacation_rental_upsells":guideToVacationRentalUpsells,    "minut_alerts_into_instant_action":minutAlertsIntoInstantAction,
    "meet_the_co_founders": meetTheCoFounders,
    "str_market_4-22": strMarket,
    "hostfully_guidebooks_blog": hostfullyGuidebooksArticle,
    "inbox_blog": inboxBlogArticle,
    "openphone_blog": openPhoneBlogArticle,
    "hospitable_sender_blog": hospitableSenderBlog,
    "mount_partnership": MountBlog
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