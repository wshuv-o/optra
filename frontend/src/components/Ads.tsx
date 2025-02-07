import React from "react";

const InvestmentAd = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-lg shadow-lg">
      <div className="max-w-xl mx-auto">
        {/* Headline */}
        <h2 className="text-3xl font-bold mb-4">
          Grow Your Wealth with Smart Investments
        </h2>

        {/* Description */}
        <p className="text-lg mb-6">
          Take control of your financial future today. Our expert investment
          strategies are designed to maximize returns and minimize risks. Start
          investing now, and watch your money grow.
        </p>

        {/* Call-to-Action Button */}
        <div className="flex justify-center">
          <a
            href="/investment-signup"
            className="bg-yellow-500 text-black font-bold py-2 px-6 rounded-lg hover:bg-yellow-600 transition duration-300"
          >
            Start Investing Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default InvestmentAd;
