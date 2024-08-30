import React, { useEffect, useState } from "react";
import {callGetConversationsApi} from "./inboxApi";

const GetConversationsTest = () => {
  const [conversations, setConversations] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await callGetConversationsApi();
        setConversations(response.data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchConversations();
  }, []);

  return conversations;

  // return (
  //   <div style={{ color: "white" }}>
  //     <h1 style={{ marginTop: "20px", textAlign: "center" }}>
  //       Conversations Test
  //     </h1>
  //     {error && <p style={{ color: "red" }}>Error: {error}</p>}
  //     {conversations ? (
  //       <pre>{JSON.stringify(conversations, null, 2)}</pre>
  //     ) : (
  //       <p>Loading...</p>
  //     )}
  //   </div>
  // );
};

export default GetConversationsTest;
