

export function AboutSection() {
  return (
    <section className="relative min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-24">
        <h2 className="text-6xl md:text-7xl font-script text-white mb-16">About Us</h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="aspect-video bg-gray-700 rounded-lg" />

          <div className="bg-black/50 backdrop-blur-sm p-8 rounded-lg">
            <h3 className="text-3xl font-bold text-white mb-4">Get to know us!</h3>
            <p className="text-gray-300 mb-8">
              Our mission is to provide a comprehensive umbrella of services designed to enhance your experience,
              whether you're here for boating, accommodation, business, tourism, or events. Explore the best of Malgas
              with us and discover everything this charming destination has to offer.
            </p>
            <button className="text-white border-white hover:bg-white hover:text-black">Our Services</button>
          </div>
        </div>
      </div>
    </section>
  )
}

