import React from 'react';

const TestComponent = () => {
  return (
    <div style={{padding: '20px', textAlign: 'center'}}>
      <h1>🎉 Test Route Working!</h1>
      <p>If you can see this, the React server is running correctly.</p>
      <p>Now let's test the white-label routes:</p>
      <div style={{margin: '20px 0'}}>
        <a href="/white-label-login?email=deshai@hostbuddy.ai&password=Ridhi@120$" 
           style={{
             display: 'inline-block',
             padding: '12px 24px',
             backgroundColor: '#007bff',
             color: 'white',
             textDecoration: 'none',
             borderRadius: '5px',
             margin: '10px'
           }}>
          Test White Label Login
        </a>
      </div>
    </div>
  );
};

export default TestComponent;