// Section.js
import React from 'react';

const Section = () => {
  return (
    <section className="py-12 bg-gray-200">
      <div className="container mx-auto text-center flex flex-col items-center md:flex-row md:justify-between">
        {/* Container for the image */}
        <div
          className="md:w-1/2 mx-auto mb-4"
          style={{ width: '500px', height: '500px', overflow: 'hidden' }} // Specifying dimensions
        >
          <img
            src="https://www.qr-code-generator.com/wp-content/themes/qr/new_structure/assets/media/images/startpage/v2/hand-qrcodes.png"
            alt="QR Code Example"
            className="w-full h-full object-contain" // Change this to your preferred object-fit value
          />
        </div>

        <div className="md:w-1/2 mb-6 md:mb-0">
          <h2 className="text-3xl font-bold mb-6">What is a QR Code Scanner?</h2>
          <p className="text-lg text-gray-700 mb-4">
            A QR code scanner is a tool that allows you to read and interpret QR codes. 
            These codes can store various types of information, such as website URLs, text, or contact details.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            With a simple scan, you can quickly access content without the need for manual entry.
          </p>
          <div className="mt-4">
            <a
              href="#"
              className="inline-block bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section;
