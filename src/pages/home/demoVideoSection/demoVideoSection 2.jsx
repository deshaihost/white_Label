import React from 'react';
import Container from 'react-bootstrap/Container';
import './demoVideoSection.css';

const DemoVideoSection = ({ load }) => {
    
    return (
        <section className="demoSection">
            <Container>
                <h3>Demo <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                    <path d="M9 0.5L10.2092 8.29085L18 9.5L10.2092 10.7092L9 18.5L7.79085 10.7092L0 9.5L7.79085 8.29085L9 0.5Z" fill="#146EF5"></path>
                    <path d="M15 12.5L15.594 14.906L18 15.5L15.594 16.094L15 18.5L14.406 16.094L12 15.5L14.406 14.906L15 12.5Z" fill="#146EF5"></path>
                </svg></h3>
                <div className="heading heading-center">
                    <h2>Take A Look <strong>Inside</strong></h2>
                </div>

                {/* Video is 80% of screen width, vertical padding is 45% of video width (for 16:9 aspect ratio). Make sure these are always adjusted together */}
                <div style={{ position: 'relative', width: '80%', paddingBottom: '45%', margin: '0 auto' }}>
                    {load ? (
                        <iframe
                            style={{ position:'absolute', top:0, left:0, width:'100%', height:'100%' }}
                            src="https://www.youtube.com/embed/D1lyGfAmLGw?si=whXHB82qimvnE6W9&rel=0"
                            title="Hostbuddy AI Demo Video" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; speaker; picture-in-picture; web-share">
                        </iframe>
                    ) : (
                        <div style={{ width: '100%', height: '100%' }}></div>
                    )}
                </div>
                
            </Container>
        </section>
    )
}

export default DemoVideoSection;