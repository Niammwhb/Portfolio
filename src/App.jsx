import { useRef, useState, useEffect } from "react";
import ProfileCard from "./components/ProfileCard/ProfileCard";
import ShinyText from "./components/ShinyText/ShinyText";
import BlurText from "./components/BlurText/BlurText";
import Lanyard from "./components/Lanyard/Lanyard";
import { listTools, listProyek } from "./data";
import ChromaGrid from "./components/ChromaGrid/ChromaGrid";
import ProjectModal from "./components/ProjectModal/ProjectModal";
import Aurora from "./components/Aurora/Aurora";
import ChatRoom from "./components/ChatRoom";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import ContactForm from "./components/ContactForm";
import {
  Instagram,
  Github,
  Linkedin,
  Youtube,
  Mail,
  Phone,
} from "lucide-react";

AOS.init({ once: true });

export default function App() {
  const aboutRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <>
      {/* ================= BACKGROUND AURORA ================= */}
      <div className="fixed inset-0 -z-10">
        <Aurora
          colorStops={["#4FC3F7", "#bf00ff", "#4FC3F7"]}
          blend={0.9}
          amplitude={1}
          speed={0.5}
        />
      </div>

      {/* ================= HEADER ================= */}
      <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#0b2c3a]/95 via-[#2a0b3d]/95 to-[#020617]/95 backdrop-blur-lg border-b border-sky-400/20">
        <div className="max-w-7xl mx-auto h-[72px] px-5 flex items-center justify-between">
          <h1 className="text-lg font-bold tracking-wide text-white/80">
            PORTFOLIO
          </h1>

          <nav className="hidden md:flex gap-8 text-sm">
            {["Home", "About", "Project", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-white/80 transition-all duration-300 hover:text-sky-300 drop-shadow-[0_0_6px_rgba(79,195,247,0.6)] hover:drop-shadow-[0_0_14px_rgba(191,0,255,0.9)]"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="pt-[85px] max-w-7xl mx-auto px-4">
        {/* ================= HERO ================= */}
        <section
          id="home"
          className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center min-h-[80vh] pb-16"
        >
          <div>
            <div className="flex items-center gap-3 mb-6 bg-zinc-900/70 p-4 rounded-2xl w-fit">
              <img src="./assets/doscom.png" className="w-10 rounded-md" />
              <q className="text-sm text-white/80">
                Avoid or just undertake it
              </q>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              <ShinyText text="Hi I'm Ni'am Mawahib" speed={3} />
            </h1>

            <BlurText
              text="A passionate application and web developer dedicated to crafting modern, high-performance digital experiences through innovative and user-friendly solutions."
              delay={150}
              animateBy="words"
              direction="top"
              align="left"
              className="mb-8 text-white/70 max-w-xl"
            />

            <div className="flex flex-wrap gap-4">
              {["Download CV", "My Projects"].map((label, i) => (
                <a
                  key={label}
                  href={i === 0 ? "./assets/CV.pdf" : "#project"}
                  download={i === 0}
                  className="px-7 py-4 rounded-full text-sky-300 font-medium border border-sky-400/40 bg-gradient-to-r from-sky-500/10 via-purple-500/10 to-sky-500/10 backdrop-blur-md shadow-[0_0_30px_rgba(79,195,247,0.35)] hover:text-white hover:border-purple-400/70 hover:shadow-[0_0_45px_rgba(191,0,255,0.6)] transition-all"
                >
                  <ShinyText text={label} speed={3} />
                </a>
              ))}
            </div>
          </div>

          <div className="mx-auto md:ml-auto md:mr-0 md:translate-x-0">
            <ProfileCard
              name="Ni'am Mawahib"
              title="Web Developer | Network Engineer"
              handle="niammwhb."
              status="Online"
              contactText="Contact Me"
              avatarUrl="./assets/doscom.png"
              showUserInfo
              enableTilt
            />
          </div>
        </section>

        {/* ================= ABOUT ================= */}
        <section
          id="about"
          ref={aboutRef}
          className="mt-32 pt-8 pb-8 px-6 sm:px-8 rounded-3xl bg-gradient-to-br from-[#060b18] via-[#0b1d2a] to-[#12091f] border border-sky-400/30 shadow-[0_0_60px_rgba(79,195,247,0.25)]"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* TEXT SIDE */}
            <div className="flex flex-col items-center text-center w-full">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white drop-shadow-[0_0_10px_rgba(79,195,247,0.7)]">
                About Me
              </h2>

              <div className="max-w-lg">
                <BlurText
                  text="I’m Ni'am Mawahib, a full-stack developer passionate about building modern, high-performance applications with an intuitive user experience. I enjoy working with the latest technologies like Artificial Intelligence, Machine Learning, and cloud-based development."
                  delay={120}
                  animateBy="words"
                  direction="top"
                  className="text-white/70 mb-10"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-10 justify-center">
                <Stat value="1+" label="Projects" color="sky" />
                <Stat value="1+" label="Years" color="sky" />
                <Stat value="2.00/3.00" label="GPA" color="purple" />
              </div>

              <p className="mt-8 text-sky-400 text-sm">
                Working with heart, creating with mind.
              </p>
            </div>

            {/* IMAGE SIDE */}
            <div className="relative flex justify-center items-center h-[520px]">
              <div className="relative w-[420px] flex justify-center mt-15">
                {/* FOTO */}
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[190px] h-[190px] rounded-full overflow-hidden border-4 border-[#0b1d2a] shadow-[0_0_40px_rgba(79,195,247,0.35)] z-20 bg-black">
                  <img
                    src={`${import.meta.env.BASE_URL}assets/profile.png`}
                    alt="Ni'am Mawahib"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* CARD */}
                <div
                  className="
   w-[310px]
    h-[390px]
    rounded-3xl
    bg-gradient-to-br
    from-[#060b18]
    via-[#0b1d2a]
    to-[#12091f]
    border border-sky-400/30
    shadow-[0_0_60px_rgba(79,195,247,0.25)]
    flex flex-col items-center
    pt-36
  "
                >
                  {/* GREETING */}
                  <p
                    className="
                    mt-5
  text-white
  text-4xl
  font-semibold
  mb-5
  tracking-wide
"
                  >
                    Hi Netizen!!
                  </p>

                  {/* BUTTON */}
                  <a
                    href="#contact"
                    className="
                        mt-5
      px-8 py-3
      rounded-full
      bg-black
      text-white
      font-medium
      transition-all duration-300
      hover:scale-105
      hover:shadow-[0_0_25px_rgba(79,195,247,0.5)]
    "
                  >
                    Let's Talk
                  </a>

                  {/* ICON ROW */}
                  <div className="flex gap-3 mt-5">
                    {[Phone, Mail, Linkedin, Github].map((Icon, index) => (
                      <div
                        key={index}
                        className="
          w-10 h-10
          rounded-full
          bg-black
          flex items-center justify-center
          text-white
          shadow-lg
          transition-all duration-300
          hover:scale-110
          hover:shadow-[0_0_25px_rgba(79,195,247,0.6)]
        "
                      >
                        <Icon size={15} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ================= TOOLS & TECHNOLOGIES ================= */}
        <section className="mt-32 overflow-hidden">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-white">
            Tools & Technologies
          </h2>
          <p className="text-white/60 mb-12 max-w-xl">
            My professional skills and technologies I work with
          </p>

          {/* ===== BARIS ATAS (KIRI ➜ KANAN) ===== */}
          <div className="relative w-full overflow-hidden mb-8">
            <div className="flex gap-6 w-max marquee-right">
              {[
                ...listTools.slice(0, Math.ceil(listTools.length / 2)),
                ...listTools.slice(0, Math.ceil(listTools.length / 2)),
              ].map((tool, index) => (
                <ToolCard key={`top-${index}`} tool={tool} />
              ))}
            </div>
          </div>

          {/* ===== BARIS BAWAH (KANAN ➜ KIRI) ===== */}
          <div className="relative w-full overflow-hidden">
            <div className="flex gap-6 w-max marquee-left">
              {[
                ...listTools.slice(Math.ceil(listTools.length / 2)),
                ...listTools.slice(Math.ceil(listTools.length / 2)),
              ].map((tool, index) => (
                <ToolCard key={`bottom-${index}`} tool={tool} />
              ))}
            </div>
          </div>
        </section>

        {/* ================= PROJECT ================= */}
        <section
          id="project"
          className="
            mt-32 py-24 rounded-3xl
            bg-gradient-to-br from-[#060b18] via-[#0b1d2a] to-[#020617]
            border border-sky-400/30
            shadow-[0_0_60px_rgba(79,195,247,0.25)]
          "
        >
          <h2 className="text-4xl font-bold text-center text-white mb-3">
            Project
          </h2>
          <p className="text-center text-white/60 max-w-3xl mx-auto">
            Showcasing selected works that reflect creativity and performance.
          </p>

          <div className="mt-16">
            <ChromaGrid
              items={listProyek}
              onItemClick={setSelectedProject}
              radius={500}
              damping={0.45}
              fadeOut={0.6}
            />
          </div>
        </section>

        {/* ================= CONTACT ================= */}
        <section id="contact" className="mt-32 pb-24">
          <h2
            className="
      text-3xl sm:text-4xl
      font-bold 
      text-center 
      text-white 
      mb-16
      drop-shadow-[0_0_10px_rgba(79,195,247,0.7)]
    "
          >
            Contact & Chat
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
            {/* ================= LEFT SIDE ================= */}
            <div className="space-y-6">
              <ContactItem
                icon={Mail}
                title="Email"
                value="niamabadi25@gmail.com"
              />

              <ContactItem
                icon={Phone}
                title="WhatsApp"
                value="0821 3567 8636"
              />

              <ContactItem
                icon={Linkedin}
                title="LinkedIn"
                value="linkedin.com/in/niam-mawahib"
              />

              <ContactItem
                icon={Github}
                title="GitHub"
                value="https://github.com/Niammwhb"
              />
            </div>

            {/* ================= RIGHT SIDE ================= */}
            <div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      {/* ================= MODAL ================= */}
      <ProjectModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />
    </>
  );
}

/* ================= COMPONENTS ================= */
function Stat({ value, label, color }) {
  const map = {
    sky: "text-sky-400 drop-shadow-[0_0_8px_rgba(79,195,247,0.9)]",
    purple: "text-purple-400 drop-shadow-[0_0_8px_rgba(191,0,255,0.9)]",
  };
  return (
    <div>
      <h3 className={`text-3xl font-bold ${map[color]}`}>{value}</h3>
      <p className="text-white/60 text-sm">{label}</p>
    </div>
  );
}

function ContactItem({ icon: Icon, title, value }) {
  return (
    <div
      className="
      flex items-center gap-4
      p-6 rounded-2xl
      bg-gradient-to-br
      from-[#060b18]
      via-[#0b1d2a]
      to-[#12091f]
      border border-sky-400/20
      hover:border-purple-400/40
      transition-all duration-300
      shadow-[0_0_30px_rgba(79,195,247,0.15)]
    "
    >
      <div
        className="
        w-12 h-12
        flex items-center justify-center
        rounded-full
        bg-gradient-to-br
        from-sky-500
        to-purple-600
        text-white
        shadow-[0_0_20px_rgba(191,0,255,0.6)]
      "
      >
        <Icon size={20} />
      </div>

      <div>
        <h4 className="text-white font-semibold">{title}</h4>
        <p className="text-white/60 text-sm">{value}</p>
      </div>
    </div>
  );
}

function ToolCard({ tool }) {
  return (
    <div
      className="
        relative
        min-w-[260px]
        rounded-2xl
        p-[1.5px]
        bg-gradient-to-br
        from-sky-400/40
        via-purple-500/40
        to-sky-400/40
      "
    >
      <div
        className="
          h-full w-full
          rounded-2xl
          bg-gradient-to-br
          from-[#060b18]
          via-[#0b1d2a]
          to-[#12091f]
          backdrop-blur-xl
          p-5
          flex items-center gap-4
          transition-all duration-500
          hover:shadow-[0_0_35px_rgba(168,85,247,0.45)]
        "
      >
        <div
          className="
            w-12 h-12
            flex items-center justify-center
            rounded-xl
            bg-gradient-to-br
            from-sky-500/20
            to-purple-500/20
          "
        >
          <img
            src={tool.gambar}
            alt={tool.nama}
            className="w-7 h-7 object-contain"
          />
        </div>

        <div className="flex flex-col">
          <span className="text-white font-semibold leading-tight">
            {tool.nama}
          </span>
          <span className="text-sm text-white/50">{tool.ket}</span>
        </div>
      </div>
    </div>
  );
}
