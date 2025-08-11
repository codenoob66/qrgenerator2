import React, { useState, useCallback, useEffect, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import Navbar from "./Navbar";
import Section from "./Section";

function App() {
  const [url, setUrl] = useState("write your url/website here");
  const [isValidUrl, setIsValidUrl] = useState(true);
  const [downloadQrCode, setDownloadQrCode] = useState("");
  const qrRef = useRef(null);

  const isValidUrlCheck = useCallback((input) => {
    try {
      new URL(input);
      return true;
    } catch {
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

  // Generate downloadable QR whenever URL changes
  useEffect(() => {
    if (!qrRef.current) return;

    const svg = qrRef.current.querySelector("svg");
    if (!svg) return;

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);

    // Create a Blob URL for the SVG
    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const urlBlob = URL.createObjectURL(blob);
    setDownloadQrCode(urlBlob);

    // Cleanup old object URLs
    return () => URL.revokeObjectURL(urlBlob);
  }, [url]);

  return (
    <>
      <Navbar />
      <div
        id="mainApp"
        className="flex flex-col items-center justify-center mt-10"
      >
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

        <div ref={qrRef}>
          <QRCodeSVG
            value={url}
            size={256}
            bgColor="#ffffff"
            fgColor="#000000"
            level="H"
            className="mb-4"
          />
        </div>

        <button
          onClick={copyToClipboard}
          className="bg-gray-200 py-2 px-4 rounded mb-2"
        >
          Copy URL
        </button>
        <button
          onClick={() => resetUrl("write your url/website here")}
          className="bg-gray-200 py-2 px-4 rounded mb-2"
        >
          Reset to Default URL
        </button>

        {downloadQrCode && (
          <a href={downloadQrCode} download="qrcode.svg">
            <button className="bg-green-500 text-white py-2 px-4 rounded">
              Download QR Code
            </button>
          </a>
        )}
      </div>
      <Section />
    </>
  );
}

export default App;
