import React, { useState, useCallback } from "react";
import { QRCodeSVG } from "qrcode.react"; // Ensure to import the QRCodeSVG component
import Navbar from "./Navbar";
import Section from "./Section";

function App() {
  const [url, setUrl] = useState("https://example.com");
  const [isValidUrl, setIsValidUrl] = useState(true);

  const isValidUrlCheck = useCallback((input) => {
    try {
      new URL(input);
    } catch (error) {
      return false;
    }
  }, []);

  const handleInputChange = (event) => {
    const inputUrl = event.target.value;
    setUrl(inputUrl);
    setIsValidUrl(isValidUrlCheck(inputUrl));
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => alert("URL copied to clipboard!"))
      .catch(() => alert("Failed to copy URL."));
  };

  const resetUrl = (newUrl) => {
    handleInputChange({ target: { value: newUrl } });
  };

  return (
    <>
      <Navbar />
      <div
        id="mainApp"
        className="flex flex-col items-center justify-center mt-10"
      >
        {" "}
        {/* Added mt for spacing */}
        <h1 className="text-3xl font-bold mb-5">My QR Code</h1>
        <input
          type="text"
          className="p-2 mb-3 border border-gray-300 rounded-md w-80 border-teal-500"
          value={url}
          onChange={handleInputChange}
          placeholder="Enter your website here"
        />
        {!isValidUrl && (
          <p className="text-red-500 mb-2">Please enter a valid URL.</p>
        )}
        <QRCodeSVG
          value={url}
          size={256}
          bgColor="#ffffff"
          fgColor="#000000"
          level="H"
          className="mb-4"
        />
        <button
          onClick={copyToClipboard}
          className="bg-gray-200 py-2 px-4 rounded mb-2"
        >
          Copy URL
        </button>
        <button
          onClick={() => resetUrl("https://new-url.com")}
          className="bg-gray-200 py-2 px-4 rounded mb-2"
        >
          Reset to Default URL
        </button>
      </div>
      <Section />
    </>
  );
}

export default App;
