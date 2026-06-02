import Hero from '../components/Hero';
import About from '../components/About';
import HorizontalWrapper from '../components/HorizontalWrapper';
import Services from '../components/Services';
import Projects from '../components/Projects';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <HorizontalWrapper id="services" height="400vh">
        <Services />
      </HorizontalWrapper>
      <HorizontalWrapper id="projects" height="300vh">
        <Projects />
      </HorizontalWrapper>
      <Contact />
    </>
  );
}
