import { useState } from 'react'
import Header from '../components/Header.jsx'
import Hero from '../components/Hero.jsx'
import TestsSection from '../components/TestsSection.jsx'
import PackagesSection from '../components/PackagesSection.jsx'
import WhyApollo from '../components/WhyApollo.jsx'
import HomeCollection from '../components/HomeCollection.jsx'
import CentresSection from '../components/CentresSection.jsx'
import OffersSection from '../components/OffersSection.jsx'
import Testimonials from '../components/Testimonials.jsx'
import Footer from '../components/Footer.jsx'
import FloatingButtons from '../components/FloatingButtons.jsx'
import BookingModal from '../components/BookingModal.jsx'

export default function Home() {
  const [selectedCentre, setSelectedCentre] = useState('Tirupati (MG Road)')
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedTest, setSelectedTest] = useState(null)
  const [selectedPkg, setSelectedPkg] = useState(null)

  const openBooking = (test, pkg = null) => {
    setSelectedTest(test)
    setSelectedPkg(pkg)
    setModalOpen(true)
  }

  const closeBooking = () => {
    setModalOpen(false)
    setSelectedTest(null)
    setSelectedPkg(null)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        selectedCentre={selectedCentre}
        onCentreChange={setSelectedCentre}
        onBookTest={(test) => openBooking(test)}
      />

      <main className="flex-1">
        <Hero
          onBook={(test) => openBooking(test)}
          selectedCentre={selectedCentre}
        />

        <TestsSection
          onBook={(test) => openBooking(test)}
          selectedCentre={selectedCentre}
        />

        <PackagesSection
          onBook={(test, pkg) => openBooking(test, pkg)}
          selectedCentre={selectedCentre}
        />

        <WhyApollo />

        <HomeCollection />

        <CentresSection />

        <OffersSection onBook={openBooking} />

        <Testimonials />
      </main>

      <Footer />
      <FloatingButtons />

      <BookingModal
        test={selectedTest}
        pkg={selectedPkg}
        isOpen={modalOpen}
        onClose={closeBooking}
        selectedCentre={selectedCentre}
      />
    </div>
  )
}
