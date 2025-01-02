import React, { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";

const Pricing = () => {
  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  const plans = [
    { name: "Basic", price: "$29/day", features: ["Compact Cars", "Limited Miles", "24/7 Support"] },
    { name: "Standard", price: "$49/day", features: ["Sedans & SUVs", "Unlimited Miles", "Road Assistance"] },
    { name: "Premium", price: "$89/day", features: ["Luxury Cars", "Unlimited Miles", "Chauffeur Service"] },
  ];

  return (
    <div className="bg-neutral-800 text-white py-28" id="pricing">
      <div className="max-w-5xl mx-auto px-4 xl:px-0 text-center">
        <h2
          className="text-4xl font-bold"
          data-aos="fade-up"
        >
          Pricing Plans
        </h2>
        <p
          className="mt-4 text-neutral-400 text-lg"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Flexible pricing tailored to your travel needs.
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="bg-neutral-900 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
              data-aos="fade-up"
              data-aos-delay={`${index * 100}`}
            >
              <h3 className="text-2xl font-semibold mb-4">{plan.name}</h3>
              <p className="text-4xl font-bold text-yellow-500">{plan.price}</p>
              <ul className="mt-6 text-neutral-400 space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i}>✓ {feature}</li>
                ))}
              </ul>
              <button
                className="mt-6 bg-yellow-500 text-black py-2 px-6 rounded-lg hover:bg-yellow-600 transition-colors"
              >
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
