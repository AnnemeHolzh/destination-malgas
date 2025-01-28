import Image from "next/image"
import baitImage from "../../../../public/Images/Boating/bait.jpg" // Update path as needed

export default function BaitAndTacklePage() {
  return (
    <main 
      className="w-full bg-white min-h-screen pt-40 pb-32" 
      data-nav-theme="dark"  // This will make the text black
    >
      <div className="container mx-auto px-4 flex flex-col items-center">
        {/* Title */}
        <h1 className="text-4xl font-custom4 text-black mb-8">BAIT AND TACKLE</h1>
        
        {/* Decorative Line */}
        <div className="w-24 h-1 bg-black mb-16"></div>
        
        {/* Description Text */}
        <p className="text-center max-w-3xl mb-20 text-black text-lg">
          Located at Plot 402 Diepkloof, our bait and tackle shop is your one-stop destination for all your fishing needs on the Breede River. We stock a comprehensive range of fishing equipment, from rods and reels to an extensive selection of lures, hooks, and lines. Our knowledgeable staff can provide expert advice on local fishing conditions and the best gear for targeting specific species. Whether you're an experienced angler or just starting out, we have everything you need for a successful day on the water. Fresh bait is available daily, and we also offer a variety of fishing accessories and basic boating supplies.
        </p>

        {/* Main Image */}
        <div className="w-full max-w-4xl mb-32">
          <Image 
            src={baitImage}
            alt="Bait and Tackle"
            width={1200}
            height={800}
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </main>
  )
}