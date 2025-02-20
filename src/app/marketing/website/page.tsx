import Image from "next/image"
import websiteImage from "../../../../public/Images/Marketing/website/webSub.jpg" // Update path as needed

export default function BaitAndTacklePage() {
  return (
    <main 
      className="w-full bg-white min-h-screen pt-40 pb-32" 
      data-nav-theme="dark"  // This will make the text black
    >
      <div className="container mx-auto px-4 flex flex-col items-center">
        {/* Title */}
        <h1 className="text-4xl font-custom4 text-black mb-8">WEBSITE</h1>
        
        {/* Decorative Line */}
        <div className="w-24 h-1 bg-black mb-16"></div>
        
        {/* Description Text */}
        <p className="text-center max-w-3xl mb-20 text-black text-lg">
        Our website serves as the ultimate gateway for travelers looking to explore Destination Malgas. With an intuitive layout, rich imagery, and easy booking options, it provides a seamless experience from inspiration to reservation. Through SEO optimization, blog content, and special offers, we ensure our site attracts and retains visitors, turning interest into confirmed bookings. The website is not just an informational tool—it’s an invitation to discover and experience Malgas like never before.
        </p>

        {/* Main Image */}
        <div className="w-full max-w-4xl mb-32">
          <Image 
            src={websiteImage}
            alt="Website"
            width={1200}
            height={800}
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </main>
  )
}