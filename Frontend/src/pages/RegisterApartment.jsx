import { useState } from "react";
import { motion } from "framer-motion";
import { registerProperty } from "../services/propertyRegistrationService";


export default function RegisterApartment() {
  const [formData, setFormData] = useState({
  companyName: "",
  contactPersonName: "",
  email: "",
  phone: "",
  propertyType: "APARTMENT",
  numberOfApartments: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await registerProperty(formData);

      alert(response.message);
      console.log(response);

      setFormData({
        companyName: "",
        contactPersonName: "",
        email: "",
        phone: "",
        propertyType: "APARTMENT",
        numberOfApartments: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
      });

    } catch (error) {
      console.error(error);

      const message =
        error.response?.data?.message ||
        "Registration failed.";

      alert(message);
    }
  };
  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-sky-100 via-white to-cyan-100 dark:from-slate-950 dark:to-black flex items-center justify-center px-4">

      {/* Background Glow */}
      <div className="absolute w-[700px] h-[700px] bg-blue-300/20 blur-[180px] rounded-full"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-2xl"
      >

        <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-3xl shadow-2xl p-10">

          <h1 className="text-4xl font-bold text-center text-blue-600">
            Register Your Apartment
          </h1>

          <p className="text-center text-gray-500 dark:text-gray-300 mt-3 mb-8">
            Start managing your apartment with AquaTrack
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              name="companyName"
              placeholder="Company Name"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full p-4 rounded-xl border dark:bg-slate-800 dark:border-slate-700"
              required
            />

            <input
              name="contactPersonName"
              placeholder="Contact Person Name"
              value={formData.contactPersonName}
              onChange={handleChange}
              className="w-full p-4 rounded-xl border dark:bg-slate-800 dark:border-slate-700"
              required
            />

            <div className="grid md:grid-cols-2 gap-4">

              <input
                type="email"
                name="email"
                placeholder="Official Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-4 rounded-xl border dark:bg-slate-800 dark:border-slate-700"
                required
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-4 rounded-xl border dark:bg-slate-800 dark:border-slate-700"
                required
              />

            </div>

            <div className="grid md:grid-cols-2 gap-4">

              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                className="w-full p-4 rounded-xl border dark:bg-slate-800 dark:border-slate-700"
              >
                <option value="APARTMENT">Apartment</option>
                <option value="VILLA">Villa</option>
                <option value="GATED_COMMUNITY">Gated Community</option>
              </select>

              
              <input
    type="number"
    name="numberOfApartments"
    min="1"
    step="1"
    placeholder="Number of Apartments"
    value={formData.numberOfApartments}
    onChange={handleChange}
    className="w-full p-4 rounded-xl border dark:bg-slate-800 dark:border-slate-700"
    required
/>

            </div>

            <textarea
              name="address"
              placeholder="Complete Address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              className="w-full p-4 rounded-xl border resize-none dark:bg-slate-800 dark:border-slate-700"
              required
            />

            <div className="grid md:grid-cols-3 gap-4">

              <input
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="w-full p-4 rounded-xl border dark:bg-slate-800 dark:border-slate-700"
                required
              />

              <input
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                className="w-full p-4 rounded-xl border dark:bg-slate-800 dark:border-slate-700"
                required
              />

              <input
                name="pincode"
                placeholder="Pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="w-full p-4 rounded-xl border dark:bg-slate-800 dark:border-slate-700"
                required
              />

            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl font-semibold"
            >
              Register Apartment
            </motion.button>

          </form>

        </div>

      </motion.div>

    </section>
  );
}