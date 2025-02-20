import Image from "next/image"
import socialMediaImage from "../../../../public/Images/Marketing/socialMedia/social-media.jpg" // Update path as needed

export default function BaitAndTacklePage() {
  return (
    <main 
      className="w-full bg-white min-h-screen pt-40 pb-32" 
      data-nav-theme="dark"  // This will make the text black
    >
      <div className="container mx-auto px-4 flex flex-col items-center">
        {/* Title */}
        <h1 className="text-4xl font-custom4 text-black mb-8">SOCIAL MEDIA</h1>
        
        {/* Decorative Line */}
        <div className="w-24 h-1 bg-black mb-16"></div>
        
        {/* Description Text */}
        <p className="text-center max-w-3xl mb-20 text-black text-lg">
        Social media is a powerful tool for showcasing the beauty and unique experiences that Destination Malgas offers. By sharing stunning visuals, customer testimonials, and behind-the-scenes glimpses, we create an engaging and interactive space for travel enthusiasts. Platforms like Facebook and Instagram help us build a loyal community, promote special deals, and drive direct inquiries, making it easier for travelers to envision and plan their perfect getaway.        </p>

        {/* Main Image */}
        <div className="w-full max-w-4xl mb-32">
          <Image 
            src={socialMediaImage}
            alt="Social Media"
            width={1200}
            height={800}
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </main>
  )
}