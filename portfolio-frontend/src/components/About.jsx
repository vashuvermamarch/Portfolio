import { motion } from 'framer-motion';
import { Code2, Database, Layout, Terminal, BrainCircuit, Cloud, Bot } from 'lucide-react';

import ScrollReveal from './ScrollReveal';
import LogoWall from './LogoWall';
import CurvedLoop from './CurvedLoop';
import ShinyText from './ShinyText';

export default function About() {
  const skills = [
    { name: "Frontend", icon: <Layout className="w-10 h-10 text-white" />, items: ["React.js", "Next.js", "Tailwind CSS", "JavaScript", "HTML/CSS"] },
    { name: "AI & Automation", icon: <BrainCircuit className="w-10 h-10 text-white" />, items: ["OpenAI", "Groq", "Gemini", "n8n", "AI Agents", "RAG", "Vector DB"] },
    { name: "Backend", icon: <Terminal className="w-10 h-10 text-white" />, items: ["FastAPI", "Django", "Node.js", "Express.js", "REST APIs", "JWT Auth"] },
    { name: "Database", icon: <Database className="w-10 h-10 text-white" />, items: ["PostgreSQL", "MongoDB", "Neon DB", "Redis", "SQL", "Vector DB"] },
    { name: "Cloud & DevOps", icon: <Cloud className="w-10 h-10 text-white" />, items: ["Docker", "GitHub Actions", "Linux", "CI/CD", "Cloud Deployment"] },
    { name: "Languages", icon: <Code2 className="w-10 h-10 text-white" />, items: ["Python", "JavaScript", "TypeScript", "Java", "C++"] }
  ];

  const logoMsgs = [
    { imgUrl: 'https://cdn.simpleicons.org/react/white', altText: 'React' },
    { imgUrl: 'https://cdn.simpleicons.org/nextdotjs/white', altText: 'Next.js' },
    { imgUrl: 'https://cdn.simpleicons.org/tailwindcss/white', altText: 'Tailwind CSS' },
    { imgUrl: 'https://cdn.simpleicons.org/python/white', altText: 'Python' },
    { imgUrl: 'https://cdn.simpleicons.org/fastapi/white', altText: 'FastAPI' },
    { imgUrl: 'https://cdn.simpleicons.org/nodedotjs/white', altText: 'Node.js' },
    { imgUrl: 'https://cdn.simpleicons.org/postgresql/white', altText: 'PostgreSQL' },
    { imgUrl: 'https://cdn.simpleicons.org/mongodb/white', altText: 'MongoDB' },
    { imgUrl: 'https://cdn.simpleicons.org/docker/white', altText: 'Docker' },
    { imgUrl: 'https://cdn.simpleicons.org/githubactions/white', altText: 'GitHub Actions' },
    { imgUrl: 'https://cdn.simpleicons.org/n8n/white', altText: 'n8n' },
    { icon: <Bot className="w-full h-full text-white" /> }
  ];

  const aboutText = "I'm Vashu Verma, an AI Builder and Software Developer passionate about creating intelligent products, automation systems, and scalable web applications. <br/> <br/> My work focuses on AI agents, workflow automation, backend engineering, and full-stack product development. I enjoy transforming complex ideas into practical solutions using technologies like FastAPI, n8n, PostgreSQL, cloud platforms, and modern AI models. <br/> <br/> Over the years, I've built and shipped AI-powered applications, automation workflows, and SaaS solutions that help businesses streamline operations, improve productivity, and deliver better user experiences. <br/> <br/> I'm constantly exploring new technologies, building innovative projects, and sharing my journey while contributing to the future of AI and automation.";

  return (
    <section id="about" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-32 flex flex-col items-center text-center"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 uppercase tracking-wider flex justify-center">
            <ShinyText text="ABOUT ME" speed={3} className="text-white" />
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-white/80 to-transparent mx-auto rounded-full" />
        </motion.div>

        <div className="flex flex-col gap-24 items-center w-full">
          <ScrollReveal 
            text={aboutText}
            className="text-xl md:text-2xl lg:text-4xl font-display text-white leading-relaxed max-w-5xl justify-start text-left font-bold"
          />

          <div className="w-full max-w-[100vw] mt-16 mb-16">
            <LogoWall
              items={logoMsgs}
              direction='horizontal'
              pauseOnHover={true}
              size='clamp(4rem, 1rem + 15vmin, 8rem)'
              duration='40s'
              bgColor='transparent'
              bgClass='bg-transparent'
            />
          </div>

          <div className="flex flex-col w-full max-w-5xl pb-[30vh]">
            {skills.map((skillGroup, index) => (
              <motion.div
                key={skillGroup.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="sticky w-full p-10 md:p-14 rounded-[2.5rem] border border-white/10 bg-[#0a0a0a] flex flex-col md:flex-row items-start md:items-center gap-10 shadow-[0_-20px_40px_rgba(0,0,0,0.8)]"
                style={{
                  top: `calc(15vh + ${index * 40}px)`,
                  zIndex: index,
                  marginBottom: '40vh' // Apply to ALL cards so the last card has room to stick
                }}
              >
                <div className="flex flex-col gap-6 md:w-1/3">
                  <div className="p-5 bg-white/5 rounded-2xl self-start border border-white/5">
                    {skillGroup.icon}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-display font-bold text-white tracking-wide">
                    {skillGroup.name}
                  </h3>
                </div>
                
                <ul className="flex flex-wrap gap-4 md:w-2/3">
                  {skillGroup.items.map(item => (
                    <li 
                      key={item} 
                      className="text-lg md:text-xl text-gray-300 font-medium px-5 py-2.5 bg-white/5 border border-white/10 rounded-full flex items-center gap-3 shadow-inner"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full flex justify-center pb-20 -mt-[40vh] relative z-20 pointer-events-auto"
          >
            <CurvedLoop 
              marqueeText="AI AUTOMATION • FULL STACK DEVELOPMENT • SCALABLE ARCHITECTURE • INNOVATIVE SOLUTIONS •" 
              speed={2} 
              curveAmount={400}
              className="font-display text-[4rem] font-bold tracking-widest" 
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
