import React from "react";

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tl from-yellow-100 to-pink-10">
      <header className="py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800">PDF AI Assistant</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Contact Us
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Have a question or interested in our services? Feel free to reach
            out to us using the contact form below, and our team will get back
            to you as soon as possible.
          </p>

          <form className="max-w-lg">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-semibold mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full border border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full border border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-gray-700 font-semibold mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                className="w-full border border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="Enter your message"
              ></textarea>
            </div>
            <div className="text-right">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
              >
                Submit
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default ContactPage;
