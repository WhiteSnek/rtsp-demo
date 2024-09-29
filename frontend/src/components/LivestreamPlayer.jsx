import React from 'react';
import ReactPlayer from 'react-player';

const LivestreamPlayer = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
      <ReactPlayer
        url='rtsp://1701954d6d07.entrypoint.cloud.wowza.com:1935/app-m75436g0/27122ffc_stream2'
        controls
        volume={0.8}
        width="80%"
        height="auto"
        className="rounded-md shadow-lg"
      />
    </div>
  );
};

export default LivestreamPlayer;
