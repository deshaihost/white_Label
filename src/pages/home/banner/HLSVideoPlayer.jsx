import React, { useEffect, useRef } from 'react';

// HLSVideoPlayer is a functional component that plays an HLS video stream.
// For browsers that support HLS natively, it simply returns a video element that plays the provided HLS video using its native player.
// For browsers that don't support HLS natively, it lazy-loads hls.js and uses it to play the video.
// UPDATE: hls.js functionality not working due to issue described below. Instead, if HLS not natively supported, fall back to MP4 video - av1 if supported, h264 if not.
const HLSVideoPlayer = ({ src, mp4Backupav1, mp4Backuph264, ImgBackup }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    async function setupHLS() {
      const video = videoRef.current;
      if (video) {
        if (video.canPlayType('application/vnd.apple.mpegurl')) { video.src = src; } // Native HLS support
        else if (!window.Hls) {
          if (false) { // Use hls player from hls.js. DISABLED because this isn't working - chrome is reporting some CORS issues loading the hls playlist, but it loads the other resources just fine, so I doubt it's really a CORS issue.
            const { default: Hls } = await import('hls.js'); // Lazy-load hls.js if there's no native support
            if (Hls.isSupported()) {
              const hls = new Hls();
              hls.loadSource(src);
              hls.attachMedia(video);
              hls.on(Hls.Events.MANIFEST_PARSED, function() {
                video.play();
              });
            }
          } else { // Fallback to H.264 if AV1 is not supported
            if (video.canPlayType('video/mp4; codecs="av01"')) { video.src = mp4Backupav1; }
            else { video.src = mp4Backuph264; }
          }
        }
      }
    }
    setupHLS();
  }, [src]); // Effect runs whenever the 'src' prop changes

  return (
    <video ref={videoRef} autoPlay loop muted playsInline poster={ImgBackup} preload>
      Your browser does not support HTML video.
    </video>
  );
};

export default HLSVideoPlayer;