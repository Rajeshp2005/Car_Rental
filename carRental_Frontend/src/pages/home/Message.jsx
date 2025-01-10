
import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Message = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'general',
    message: ''
  });

  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: true
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-teal-950 py-20 px-4" id="booking">
      <div 
        className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20"
        data-aos="fade-up"
      >
        <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-8 text-center"
            data-aos="zoom-in">
          Get in Touch
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            <div className="space-y-2">
              <label className="text-white/90 text-lg font-medium">Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400 text-white placeholder-white/50 transition duration-300"
                placeholder="Your name"
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-white/90 text-lg font-medium">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400 text-white placeholder-white/50 transition duration-300"
                placeholder="your@email.com"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div 
            className="space-y-2"
            data-aos="fade-left"
            data-aos-delay="400"
          >
            <label className="text-white/90 text-lg font-medium">Topic</label>
            <select 
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400 text-white transition duration-300"
              onChange={(e) => setFormData({...formData, topic: e.target.value})}
            >
              <option value="general">General Inquiry</option>
              <option value="reservation">Car Reservation</option>
              <option value="support">Technical Support</option>
              <option value="feedback">Feedback</option>
              <option value="partnership">Business Partnership</option>
            </select>
          </div>

          <div 
            className="space-y-2"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            <label className="text-white/90 text-lg font-medium">Message</label>
            <textarea
              rows={6}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400 text-white placeholder-white/50 transition duration-300"
              placeholder="Your message here..."
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-500 hover:to-cyan-500 text-white font-bold text-lg transform hover:scale-105 transition duration-300 shadow-lg hover:shadow-xl"
            data-aos="zoom-in"
            data-aos-delay="800"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Message;