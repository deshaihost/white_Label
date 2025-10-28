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
const minut_alerts_into_instant_action_thumbnail = "https://i.postimg.cc/hvLQ6vJc/minut-alerts-into-instant-action.webp";
const meet_the_co_founders_thumbnail = "https://i.postimg.cc/8sgVdssK/Headshots-blog.webp";
const str_market_thumbnail = "https://hostbuddylb.com/blog/str_market_4-22/Official%20STR%20Market%20Logo.webp";
const hostfully_guidebooks_thumbnail = "https://hostbuddylb.com/blog/hostfully_guidebooks/Blog%20Header%20(19).webp";
const inbox_blog_thumbnail = "https://storage.googleapis.com/frontend_media/blog/inbox_blog/10%20Minute%20Demo%20Thumbnail%20(1).webp";
const openphone_blog_thumbnail = "https://hostbuddylb.com/blog/OpenPhone_Blog/10%20Minute%20Demo%20Thumbnail.webp";
const hospitable_sender_blog_thumbnail = "https://hostbuddylb.com/blog/Hospitable_Blog/Hospitable%20sender%20(2).webp";
const mount_blog_thumbnail = "https://storage.googleapis.com/frontend_media/blog/MountBlog/Mount%20%2B%20HostBuddy%20Partnership.png";
const elevate_partnership_thumbnail = "https://hostbuddylb.com/blog/elevate_blog/Ele.webp";

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
      { id:"minut_alerts_into_instant_action", title:"Turn Minut Alerts into Instant Action: HostBuddy AI's Game-Changing Integration with Minut", date:"Dec 03, 2024", img:minut_alerts_into_instant_action_thumbnail, description:"Streamline hosting with Minut and HostBuddy AI—automated alerts and real-time guest messaging for smarter rental management." },
      { id:"meet_the_co_founders", title:"Meet the Co-Founders of HostBuddy AI", date:"Jan 08, 2025", img:meet_the_co_founders_thumbnail, description:"Discover the visionaries behind HostBuddy AI—Jay Ullrich, Sam Mayes, and Michael Boddie—redefining the short-term rental industry with cutting-edge technology and innovation." },      { id:"str_market_4-22", title:"STR Market: The Ultimate Marketplace for Short-Term Rental Success", date:"Apr 22, 2025", img:str_market_thumbnail, description:"Discover STR Market—the curated marketplace for short-term rental hosts. Find vetted tools, software, and products at exclusive discounts to boost your rental business." },
      { id:"hostfully_guidebooks_blog", title:"Integration Alert: Our New Hostfully Guidebook Integration Takes AI Messaging for Short Term Rentals to the Next Level", date:"May 30, 2025", img:hostfully_guidebooks_thumbnail, description:"Discover how our new Hostfully Digital Guidebook integration transforms AI messaging for short-term rentals with comprehensive knowledge bases and personalized guest responses." },
      { id:"inbox_blog", title:"The Future of Guest Communication is Here: Introducing the new HostBuddy Inbox 🚀", date:"June 11, 2025", img:inbox_blog_thumbnail, description:"Discover the most powerful inbox update in HostBuddy history. Complete UI transformation, WhatsApp integration, intelligent auto-tagging, and advanced filtering." },
      { id:"openphone_blog", title:"Revolutionary AI Messaging for OpenPhone: Transform Your Short Term Rental Communication 📞", date:"Aug 03, 2025", img:openphone_blog_thumbnail, description:"Discover how OpenPhone AI messaging integration revolutionizes short-term rental communication with automatic phone number matching, call summaries, and unified messaging." },
      { id:"hospitable_sender_blog", title:"HostBuddy Now Supports Hospitable Sender Selection for Airbnb", date:"Sept 9, 2025", img:hospitable_sender_blog_thumbnail, description:"Finally, the control you've been asking for is here. Choose exactly which host profile sends your automated AI messages with HostBuddy's new Hospitable Sender Selection feature." },
      { id:"mount_partnership", title:"HostBuddy AI Partners with Mount to Automate Local Experience Upsells", date:"Oct 08, 2025", img:mount_blog_thumbnail, description:"Discover how HostBuddy AI's partnership with Mount enables automatic 24/7 upselling of local experiences through AI-powered guest communication." },
      { id:"elevate_partnership", title:"HostBuddy AI and Elevate Software Announce Strategic Partnership", date:"Oct 28, 2025", img:elevate_partnership_thumbnail, description:"HostBuddy AI and Elevate Software partner to create the most advanced hospitality ecosystem for short-term rentals, combining AI automation with seamless property management." },
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
