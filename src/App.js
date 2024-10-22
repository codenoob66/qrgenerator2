import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

function App() {
  const [url, setUrl] = useState("https://example.com");
  const [isValidUrl, setIsValidUrl] = useState(true);

  const handleInputChange = (event) => {
    const inputUrl = event.target.value;
    setUrl(inputUrl);
    setIsValidUrl(isValidUrlCheck(inputUrl));
  };

  const isValidUrlCheck = (input) => {
    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\\.)+([a-z]{2,}|[a-z0-9-]{2,})|' +
      'localhost|' +
      '\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|' +
      '\\[?[a-fA-F0-9]*:[a-fA-F0-9:]+\\]?)' +
      '(\\:\\d+)?(\\/[-a-z0-9+&@#/%=~_|]*\\.[a-z0-9()\\-_.?,:&%#=~]*)?$', 'i');
    return !!pattern.test(input);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    alert("URL copied to clipboard!");
  };

  // Reusable function for resetting the URL
  const resetUrl = (newUrl) => {
    handleInputChange({ target: { value: newUrl } });
  };

  return (
    <div style={{ display: 'flex', alignItems: "center", flexDirection: "column" }}>
      <h1>My QR Code</h1>
      <input 
        type="text" 
        value={url} 
        onChange={handleInputChange} 
        placeholder="Enter your website here" 
        style={{ marginBottom: '20px', padding: '10px', width: '300px' }}
      />
      {!isValidUrl && <p style={{ color: 'red' }}>Please enter a valid URL.</p>}
      <QRCodeSVG 
        value={url} 
        size={256} 
        bgColor="#ffffff" 
        fgColor="#000000" 
        level="H" 
        style={{ margin: 'auto' }} 
      />
      <button onClick={copyToClipboard} style={{ marginTop: '20px', padding: '10px' }}>
        Copy URL
      </button>
      <button onClick={() => resetUrl("https://new-url.com")} style={{ marginTop: '10px', padding: '10px' }}>
        Reset to Default URL
      </button>
      <button onClick={() => resetUrl(url)} style={{ marginTop: '10px', padding: '10px' }}>
        Reuse Current URL
      </button>
    </div>

  
    
  );
}

export default App;
