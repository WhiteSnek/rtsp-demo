import React, { useState } from 'react';
import LivestreamPlayer from './components/LivestreamPlayer';
import OverlayForm from './components/OverlayForm';
import OverlayManager from './components/OverlayManager';
import axios from 'axios';
import Header from './components/Header';


axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL
function App() {
  const [text, setText] = useState('');
  const [logoUrl, setLogoUrl] = useState('');

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col gap-4">
      <Header />
      <LivestreamPlayer />
      <OverlayForm setText={setText} setLogoUrl={setLogoUrl} />
      <OverlayManager text={text} logoUrl={logoUrl} setText={setText} setLogoUrl={setLogoUrl} />
    </div>
  );
}

export default App;
