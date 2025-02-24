import Image from "next/image"
import rentalsImage from "../../../../public/Images/Boating/rentals/rentalsImage.jpg" // Update path as needed

export default function RentalsPages() {
  return (
    <main 
      className="w-full bg-white min-h-screen pt-40 pb-32" 
      data-nav-theme="dark"  // This will make the text black
    >
      <div className="container mx-auto px-4 flex flex-col items-center">
        {/* Title */}
        <h1 className="text-4xl font-custom4 text-black mb-8">RENTALS</h1>
        
        {/* Decorative Line */}
        <div className="w-24 h-1 bg-[#2F5D63] mb-16"></div>
        
        {/* Description Text */}
        <p className="text-center max-w-3xl mb-8 text-black text-lg">
        Enjoy fishing, boating, swimming, floating and skiing. Picnicking on the water&apos;s edge, watching the birds dart through the reeds and the river life gently cruising by with the slow days. Discover the bliss of the Breede River. Indemnity and compliance regulations apply, ensuring your safety and a hassle-free experience on the water. Let us help you make the most of your fishing adventure!
        </p>
        
        <div className="text-center text-black text-lg mb-20">
          <p className="font-bold mb-2">Max 4 pax</p>
          <p className="font-bold">Starts from R4000</p>
        </div>

        {/* Main Image */}
        <div className="w-full max-w-4xl mb-32">
          <Image 
            src={rentalsImage}
            alt="Rentals"
            width={1200}
            height={800}
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </main>
  )
}