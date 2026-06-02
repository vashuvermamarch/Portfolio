import { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import CylinderCard from './CylinderCard';
import BorderGlow from './BorderGlow';
import SpotlightCard from './SpotlightCard';
import StarBorder from './StarBorder';
import ShinyText from './ShinyText';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const repoResponse = await fetch('https://api.github.com/users/vashuvermamarch/repos?sort=updated&per_page=10');
        
        if (!repoResponse.ok) {
          throw new Error('Failed to fetch repositories. Rate limit might be exceeded.');
        }
        
        const rawRepos = await repoResponse.json();
        const repos = rawRepos.filter(r => !r.fork).slice(0, 5);
        
        const detailedRepos = await Promise.all(
          repos.map(async (repo) => {
            let tech = [];
            try {
              const langResponse = await fetch(repo.languages_url);
              if (langResponse.ok) {
                const langs = await langResponse.json();
                tech = Object.keys(langs).slice(0, 4);
              }
            } catch (e) {
              console.warn(`Failed to fetch languages for ${repo.name}`);
            }

            let description = repo.description || "No description provided.";
            try {
              let readmeResponse = await fetch(`https://raw.githubusercontent.com/vashuvermamarch/${repo.name}/main/README.md`);
              if (readmeResponse.status === 404) {
                readmeResponse = await fetch(`https://raw.githubusercontent.com/vashuvermamarch/${repo.name}/master/README.md`);
              }
              
              if (readmeResponse.ok) {
                const readmeText = await readmeResponse.text();
                const lines = readmeText.split('\n');
                for (const line of lines) {
                  const trimmed = line.trim();
                  if (
                    trimmed && 
                    !trimmed.startsWith('#') && 
                    !trimmed.startsWith('[') && 
                    !trimmed.startsWith('<') && 
                    !trimmed.startsWith('!') &&
                    !trimmed.startsWith('-') &&
                    trimmed.length > 20
                  ) {
                    description = trimmed;
                    if (description.length > 180) {
                      description = description.substring(0, 177) + '...';
                    }
                    break;
                  }
                }
              }
            } catch (e) {
              console.warn(`Failed to fetch README for ${repo.name}`);
            }

            return {
              title: repo.name.replace(/[-_]/g, ' '),
              description,
              tech: tech.length > 0 ? tech : ["JavaScript", "HTML"],
              github: repo.html_url,
              live: repo.homepage || repo.html_url,
            };
          })
        );
        
        setProjects(detailedRepos);
      } catch (err) {
        console.error(err);
        // Fallback projects in case of GitHub API rate limits
        setProjects([
          {
            title: "Portfolio Frontend",
            description: "My personal interactive portfolio built with React, Vite, Tailwind CSS, and Framer Motion, featuring 3D effects and smooth animations.",
            tech: ["JavaScript", "React", "TailwindCSS"],
            github: "https://github.com/vashuvermamarch/portfolio-frontend",
            live: "https://github.com/vashuvermamarch/portfolio-frontend",
          },
          {
            title: "Portfolio Backend",
            description: "The backend services and APIs powering my personal portfolio, built for scale and performance.",
            tech: ["Python", "Django", "REST API"],
            github: "https://github.com/vashuvermamarch/portfolio-backend",
            live: "https://github.com/vashuvermamarch/portfolio-backend",
          },
          {
            title: "AI Development Projects",
            description: "Various LLM applications, RAG systems, and AI agent implementations.",
            tech: ["Python", "OpenAI API", "LangChain"],
            github: "https://github.com/vashuvermamarch",
            live: "https://github.com/vashuvermamarch",
          }
        ]);
        // We don't set an error here so the UI still renders the fallback cards instead of an error message
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  return (
    <div className="flex gap-8 h-full items-center mr-32 shrink-0">
      
      {/* Projects Title Card */}
      <CylinderCard>
        <div className="w-[80vw] md:w-max min-w-[400px] h-[600px] flex flex-col justify-center shrink-0 pr-16 md:pr-24">
          <h2 className="text-6xl md:text-[100px] font-display font-bold mb-6 uppercase tracking-wider leading-none whitespace-nowrap flex flex-col items-start">
            <ShinyText text="FEATURED" speed={3} className="text-white" />
            <ShinyText text="PROJECTS" speed={3} className="text-white" />
          </h2>
          <div className="h-2 w-32 bg-white mb-8" />
          <p className="text-gray-400 text-xl md:text-2xl font-mono uppercase tracking-widest leading-relaxed max-w-[500px]">
            Live from GitHub. <br/> Built for scale and performance.
          </p>
        </div>
      </CylinderCard>

      {/* Loading State */}
      {loading && (
        Array.from({ length: 3 }).map((_, i) => (
          <CylinderCard key={`loading-${i}`}>
            <div className="w-[85vw] md:w-[600px] h-[600px] shrink-0 bg-[#111111] border border-white/5 p-10 flex flex-col justify-between animate-pulse">
               <div>
                 <div className="h-10 w-3/4 bg-white/10 mb-6" />
                 <div className="h-4 w-full bg-white/5 mb-3" />
                 <div className="h-4 w-full bg-white/5 mb-3" />
                 <div className="h-4 w-2/3 bg-white/5 mb-8" />
                 <div className="flex gap-3">
                   <div className="h-8 w-24 bg-white/10" />
                   <div className="h-8 w-24 bg-white/10" />
                 </div>
               </div>
            </div>
          </CylinderCard>
        ))
      )}

      {/* Error State */}
      {error && (
        <CylinderCard>
          <div className="w-[85vw] md:w-[600px] h-[600px] shrink-0 bg-[#111111] border border-red-500/30 p-10 flex flex-col justify-center items-center">
             <span className="text-red-400 font-mono tracking-widest uppercase mb-4">API Fetch Error</span>
             <p className="text-gray-400 text-center font-mono max-w-sm">{error}</p>
          </div>
        </CylinderCard>
      )}

      {/* Project Cards */}
      {!loading && !error && projects.map((project, index) => (
        <CylinderCard key={project.title}>
          <BorderGlow 
            borderRadius={0}
            backgroundColor="#111111"
            glowColor="40 80 80"
            className="w-[85vw] md:w-[600px] h-[600px] shrink-0 group rounded-none"
          >
            <SpotlightCard
              spotlightColor="rgba(255, 255, 255, 0.4)"
              className="w-full h-full p-10 flex flex-col justify-between"
            >
              <div className="z-10 relative flex flex-col justify-between h-full w-full pointer-events-none">
                <div>
                  <h3 className="text-3xl font-display font-bold text-white mb-6 uppercase tracking-wide truncate">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-lg leading-relaxed mb-8 line-clamp-4 pointer-events-auto">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-3 pointer-events-auto">
                    {project.tech.map(tech => (
                      <span 
                        key={tech} 
                        className="px-4 py-1.5 text-sm font-mono border border-white/20 text-white uppercase tracking-widest"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-6 mt-12 pt-8 border-t border-white/10 pointer-events-auto">
                  <StarBorder
                    as="a"
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    color="white"
                    speed="6s"
                    className="cursor-pointer"
                  >
                    <div className="flex items-center gap-2 font-mono uppercase text-sm tracking-widest text-white/90 hover:text-white transition-colors">
                      <FaGithub className="w-5 h-5" /> View Full Source Code
                    </div>
                  </StarBorder>
                  {project.live !== project.github && (
                    <a href={project.live} target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition-colors flex items-center gap-2 font-mono uppercase text-sm tracking-widest">
                      <ExternalLink className="w-6 h-6" /> Live
                    </a>
                  )}
                </div>
              </div>
            </SpotlightCard>
          </BorderGlow>
        </CylinderCard>
      ))}
    </div>
  );
}
