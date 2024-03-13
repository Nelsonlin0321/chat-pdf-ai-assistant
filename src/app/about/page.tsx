import React from "react";

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tl from-yellow-100 to-pink-100">
      <header className="pt-20">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800">PDF AI Assistant</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            About Us
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We are a pioneering AI software company dedicated to pushing the
            boundaries of artificial intelligence and delivering innovative
            solutions to businesses across various industries. Our team of
            experts combines cutting-edge technology with deep domain knowledge
            to create powerful AI applications that drive efficiency,
            productivity, and competitive advantage.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Our Specialties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Machine Learning
              </h3>
              <p className="text-gray-600">
                Our machine learning algorithms are designed to process vast
                amounts of data, identifying patterns and providing valuable
                insights to drive better decision-making.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Natural Language Processing
              </h3>
              <p className="text-gray-600">
                Our NLP solutions enable seamless communication between humans
                and machines, unlocking new possibilities for enhanced customer
                experiences and efficient data analysis.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Computer Vision
              </h3>
              <p className="text-gray-600">
                Leveraging advanced computer vision techniques, we develop
                applications capable of accurately identifying and analyzing
                visual data, enabling automation and intelligent
                decision-making.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600 leading-relaxed">
            My mission is to harness the power of artificial intelligence to
            solve complex problems and create transformative solutions that
            drive innovation and growth for our clients. We strive to be at the
            forefront of AI technology, constantly exploring new frontiers and
            pushing the boundaries of what is possible.
          </p>
        </section>
      </main>

      <footer className="bg-gray-800 py-6 fixed w-full bottom-0">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white">
            &copy; {new Date().getFullYear()} PDF-AI-Assistant. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
