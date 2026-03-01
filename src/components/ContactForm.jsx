import { useState } from "react";
import { Send } from "lucide-react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      alert("Please fill all fields");
      return;
    }

    setSuccess(true);
    setForm({ name: "", email: "", message: "" });

    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div
      className="
      p-8 rounded-3xl
      bg-gradient-to-br
      from-[#060b18]
      via-[#0b1d2a]
      to-[#12091f]
      border border-sky-400/30
      shadow-[0_0_60px_rgba(79,195,247,0.25)]
    "
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="text-white/70 text-sm">Nama Lengkap</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full mt-2 p-3 rounded-xl bg-black/40 text-white border border-white/10 focus:outline-none focus:border-sky-400 transition"
          />
        </div>

        <div>
          <label className="text-white/70 text-sm">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full mt-2 p-3 rounded-xl bg-black/40 text-white border border-white/10 focus:outline-none focus:border-purple-400 transition"
          />
        </div>

        <div>
          <label className="text-white/70 text-sm">Pesan</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows="5"
            className="w-full mt-2 p-3 rounded-xl bg-black/40 text-white border border-white/10 focus:outline-none focus:border-sky-400 transition resize-none"
          />
        </div>

        <button
          type="submit"
          className="
            w-full py-4
            rounded-full
            bg-gradient-to-r
            from-sky-500
            to-purple-600
            text-white font-semibold
            flex items-center justify-center gap-2
            hover:scale-105
            transition-all duration-300
            shadow-[0_0_25px_rgba(191,0,255,0.6)]
          "
        >
          <Send size={18} />
          Kirim Pesan
        </button>

        {success && (
          <p className="text-green-400 text-center text-sm">
            Pesan berhasil dikirim!
          </p>
        )}
      </form>
    </div>
  );
}
