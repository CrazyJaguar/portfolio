import PortfolioHome from './components/PortfolioHome'
import AboutSection from './components/AboutSection'
import WorkSection from './components/WorkSection'
import ContactSection from './components/ContactSection'

export default function Home() {
  return (
    <main>
      <PortfolioHome />
      <AboutSection />
      <WorkSection />
      <ContactSection />
    </main>
  )
}