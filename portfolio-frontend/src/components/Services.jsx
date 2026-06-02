import { motion } from 'framer-motion';
import { Layers, ArrowUpRight } from 'lucide-react';
import CylinderCard from './CylinderCard';
import PixelCard from './PixelCard';
import ShinyText from './ShinyText';


export default function Services() {
  const services = [
    {
      title: "AI Development",
      items: ["AI Agents", "LLM Applications", "RAG Systems", "Chatbots", "Prompt Engineering"]
    },
    {
      title: "Automation",
      items: ["n8n Workflows", "Business Automation", "CRM Integration", "Email Automation", "Process Optimization"]
    },
    {
      title: "Backend Development",
      items: ["FastAPI", "Node.js", "REST APIs", "Authentication", "Microservices"]
    },
    {
      title: "Full-Stack Development",
      items: ["Web Applications", "SaaS Platforms", "Admin Dashboards", "Custom Solutions", "Responsive Design"]
    },
    {
      title: "Database Solutions",
      items: ["PostgreSQL", "MongoDB", "Database Design", "Query Optimization", "Data Modeling"]
    },
    {
      title: "API Integration",
      items: ["Third-Party APIs", "Payment Gateways", "AI Integrations", "Webhooks", "System Connectivity"]
    },
    {
      title: "Cloud & Deployment",
      items: ["Docker", "Cloud Hosting", "CI/CD Pipelines", "Server Management", "Production Deployment"]
    },
    {
      title: "Product Development",
      items: ["MVP Development", "Prototype Building", "System Architecture", "Scalable Solutions", "Technical Consulting"]
    },
    {
      title: "AI Consulting",
      items: ["AI Strategy", "Workflow Design", "Automation Planning", "Solution Architecture", "Technology Guidance"]
    },
    {
      title: "Custom Software",
      items: ["Business Tools", "Internal Systems", "Management Portals", "Custom Dashboards", "Enterprise Solutions"]
    }
  ];

  return (
    <div className="flex gap-8 h-full items-center mr-32 shrink-0">
      
      {/* Services Title Card */}
      <CylinderCard>
        <div className="w-[80vw] md:w-max min-w-[400px] h-[600px] flex flex-col justify-center shrink-0 pr-16 md:pr-24 relative overflow-hidden group bg-[#0a0a0a] rounded-none border border-transparent">
          <div className="z-10 relative flex flex-col w-full h-full justify-center p-10 md:p-16">
            <h2 className="text-6xl md:text-[100px] font-display font-bold mb-6 uppercase tracking-wider leading-none whitespace-nowrap flex">
              <ShinyText text="SERVICES" speed={3} className="text-white" />
            </h2>
            <div className="h-2 w-32 bg-white mb-8" />
            <p className="text-gray-400 text-xl md:text-2xl font-mono uppercase tracking-widest leading-relaxed max-w-[500px]">
              What I bring to the table.
              <br />
              A comprehensive suite of engineering & AI solutions.
            </p>
          </div>
        </div>
      </CylinderCard>

      {/* Services Cards */}
      {services.map((service, index) => (
        <CylinderCard key={service.title}>
          <PixelCard
            colors="#ffffff,#a3a3a3,#525252"
            className="w-[85vw] md:w-[450px] h-[600px] shrink-0 group bg-[#111111] rounded-none border border-white/10 hover:border-white/40 transition-colors relative overflow-hidden"
          >
            <div className="z-10 relative flex flex-col h-full w-full pointer-events-none p-10">
              {/* Subtle background icon/number */}
              <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                <span className="font-display text-[180px] font-bold leading-none">
                  {(index + 1).toString().padStart(2, '0')}
                </span>
              </div>

              <div className="flex items-center gap-6 mb-12">
                <div className="w-14 h-14 border border-white/20 flex items-center justify-center bg-white/5 shrink-0">
                  <Layers className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white uppercase tracking-wide leading-tight">
                  {service.title}
                </h3>
              </div>
              
              <ul className="flex flex-col gap-5 flex-grow z-10 pointer-events-auto">
                {service.items.map((item) => (
                  <li key={item} className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-white/50 group-hover:bg-white transition-colors rounded-none shrink-0" />
                    <span className="text-gray-400 font-mono text-[15px] uppercase tracking-widest group-hover:text-gray-200 transition-colors">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </PixelCard>
        </CylinderCard>
      ))}
    </div>
  );
}
