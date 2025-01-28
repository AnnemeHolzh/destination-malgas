import Image from "next/image"
import chartersImage from "../../../../public/Images/Boating/charters/charterSub.jpg" // Update path as needed

export default function ChartersPage() {
  return (
    <main 
      className="w-full bg-white min-h-screen pt-40 pb-32" 
      data-nav-theme="dark"  // This will make the text black
    >
      <div className="container mx-auto px-4 flex flex-col items-center">
        {/* Title */}
        <h1 className="text-4xl font-custom4 text-black mb-8">CHARTERS</h1>
        
        {/* Decorative Line */}
        <div className="w-24 h-1 bg-[#2F5D63] mb-16"></div>
        
        {/* Description Text */}
        <p className="text-center max-w-3xl mb-8 text-black text-lg">
          Breede River in the Overberg region of the Western Cape. It is situated 25 kilometres north-west of the Breede River mouth at Witsand. Outfit running trips with friendly, knowledgeable, English and Afrikaans speaking guide. There is excellent accommodation, to suit any taste or pocket.
        </p>
        
        <div className="text-center text-black text-lg mb-20">
          <p className="font-bold mb-2">Max 4 pax</p>
          <p className="font-bold">Starts from R4000</p>
        </div>

        {/* Main Image */}
        <div className="w-full max-w-4xl mb-32">
          <Image 
            src={chartersImage}
            alt="Charters"
            width={1200}
            height={800}
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </main>
  )
}