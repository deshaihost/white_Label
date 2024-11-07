import React from 'react';
import './blog.css';
import { Helmet } from 'react-helmet';

const five_best_thumbnail = "https://i.postimg.cc/GtkGyqCm/5-Best-Property-Management-Software-of-2024.webp";
const automate_str_thumbnail = "https://i.postimg.cc/2ym3PYsC/How-to-Automate-Your-Short-Term-Rental-Business.webp";
const ownerRez_pms_partners_thumbnail = "https://i.postimg.cc/RZhsVfsx/update-owner-Rez-pms-partners-mianimg.webp";
const why_you_need_ai_thumbnail = "https://i.postimg.cc/vB0xB12C/why-you-need-ai-thumbnail.webp";
const hostaway_pms_partners_thumbnail = "https://i.postimg.cc/GhGkTmKh/Blog-Header-3.webp";
const need_virtual_assistant_thumbnail = "https://i.postimg.cc/5yPKZ4Xz/Do-I-Need-a-Virtual-Assistant-for-My-Airbnb-Business.webp";
const tired_of_negative_reviews_thumbnail = "https://i.postimg.cc/tR8P0GDW/Tired-of-Negative-Reviews-Hostbuddy-AI.webp";
const guesty_hostbuddy_join_thumbnail = "https://i.postimg.cc/nrwSJpWP/guesty-and-host-Buddy-ai-join-forces-revolutionizing-vacation-rental-management.webp";
const smart_templates_thumbnail = "https://i.postimg.cc/T3ZgqVyY/smart-templates.webp";
const guide_to_vacation_rental_upsells_thumbnail = "https://i.postimg.cc/sxD47dsD/a-happy-vacation-rental-guest.webp";

const BlogLandingPage = () => {

    const articles = [
      { id:"automate_str_6-25", title:"How to Automate Your Short Term Rental Business", date:"Jun 25, 2024", img:automate_str_thumbnail, description:"STR automation mastery: Uncover tech-driven solutions, AI-powered tools, and clever hacks to minimize effort and maximize returns for your short-term rentals." },
      { id:"5_best_PMS_6-13", title:"5 Best Property Management Software of 2024 (Updated)", date:"Jun 13, 2024", img:five_best_thumbnail, description:"Elevate your STR game with 2024's best management software. Find out which tools offer the latest tech and clever automation for hosts." },
      { id:"ownerRez_pms_partners", title:"OwnerRez Partners with HostBuddy AI for Advanced Guest Communication", date:"Sept 17, 2024", img:ownerRez_pms_partners_thumbnail, description:"Discover how OwnerRez integrates with HostBuddy AI to deliver automated guest communication, revenue-boosting upsells, and seamless property management." },
      { id:"why_you_need_ai", title:"5 Reasons Why You Need AI For Your STR Business", date:"Sept 25, 2024", img:why_you_need_ai_thumbnail, description:"AI in short-term rentals is making a transformative impact on the industry. Learn how AI can enhance guest experiences, service operations, and optimize revenue." },
      { id:"hostaway_pms_partners", title:"HostBuddy AI and Hostaway Partner to Transform Rental Management", date:"Oct 01, 2024", img:hostaway_pms_partners_thumbnail, description:"HostBuddy AI partners with Hostaway, revolutionizing vacation rental management with AI-powered guest communication, boosting revenue, and streamlining operations." },
      { id:"need_virtual_assistant", title:"Do I Need a Virtual Assistant for My Airbnb Business?", date:"Oct 03, 2024", img:need_virtual_assistant_thumbnail, description:"Discover how virtual assistants can streamline your operations, improve guest communication, and manage tasks for better efficiency and growth." },
      { id:"tired_of_negative_reviews", title:"Tired of Negative Reviews? This AI Tool Helps You Get Them Removed", date:"Oct 08, 2024", img:tired_of_negative_reviews_thumbnail, description:"Learn how HostBuddy AI can help short-term rental hosts manage and remove negative reviews by leveraging AI-powered tools for better guest communication." },
      { id:"guesty_hostbuddy_join", title:"Guesty and HostBuddy AI Join Forces: Revolutionizing Vacation Rental Management", date:"Oct 11, 2024", img:guesty_hostbuddy_join_thumbnail, description:"Explore how Guesty and HostBuddy AI boost guest communication and simplify property management." },
      { id:"smart_templates", title:"Smart Templates: Transform Your Short Term Rental Communication with AI-Powered Automation", date:"Oct 29, 2024", img:smart_templates_thumbnail, description:"Enhance your rental management with HostBuddy AI’s Smart Templates, offering personalized, AI-driven guest communication." },
      { id:"guide_to_vacation_rental_upsells", title:"The Ultimate Guide to Vacation Rental Upsells: Boost Your Revenue with AI", date:"Nov 06, 2024", img:guide_to_vacation_rental_upsells_thumbnail, description:"Discover how AI-driven upselling strategies can boost your vacation rental revenue and enhance guest experiences with personalized offerings." },
    ];

    const reversedArticles = articles.reverse();

    return (
      <>
        <Helmet>
          <meta name="description" content="Discover game-changing STR strategies, from smart home tech to AI-powered software. Your go-to resource for short-term rental innovation and success." />
        </Helmet>
        <div className="blog-landing-page">
          <h1 className="blog-landing-page-title">HostBuddy AI - Blog</h1>
          <h2 id='landing-page-description'>Discover game-changing STR strategies, from smart home tech to AI-powered software. Your go-to resource for short-term rental innovation and success.</h2>
          <div className="blog-tiles">
            {reversedArticles.map(article => (
              <a href={`/blog/${article.id}`} key={article.id} className="blog-tile">
                <div className="blog-tile-image-container">
                  <img src={article.img} alt={article.title} className="blog-tile-image" />
                </div>
                <h3 className="blog-tile-title">{article.title}</h3>
                <p className="blog-tile-date">{article.date}</p>
                <p className="blog-tile-description">{article.description}</p>
              </a>
            ))}
          </div>
        </div>
      </>
    );
};

export default BlogLandingPage;
