import Image from "next/image"
import marketingImage from "../../../../public/Images/Marketing/marketing/directMarketing.jpg"

export default function BaitAndTacklePage() {
  return (
    <main 
      className="w-full bg-white min-h-screen pt-40 pb-32" 
      data-nav-theme="dark"  // This will make the text black
    >
      <div className="container mx-auto px-4 flex flex-col items-center">
        {/* Title */}
        <h1 className="text-4xl font-custom4 text-black mb-8">DIRECT MARKETING</h1>
        
        {/* Decorative Line */}
        <div className="w-24 h-1 bg-black mb-16"></div>
        
        {/* Description Text */}
        <p className="text-center max-w-3xl mb-20 text-black text-lg">
        Direct marketing allows Destination Malgas to connect personally with potential customers, offering tailored travel experiences that suit their needs. Through email campaigns, flyers, and targeted promotions, we can highlight special offers, exclusive getaway deals, and personalized recommendations. This approach fosters stronger relationships with our audience, ensuring they receive relevant and engaging information that encourages them to book their next adventure with us.
        </p>

        {/* Main Image */}
        <div className="w-full max-w-4xl mb-32">
          <Image 
            src={marketingImage}
            alt="Direct Marketing"
            width={1200}
            height={800}
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </main>
  )
}