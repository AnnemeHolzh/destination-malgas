import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold mb-4">Our location</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>OFFICE & SHOP</p>
              <p>PLOT 402 DIEPKLOOF, MALGAS, WC</p>
              <p>Tar Road Diepkloof</p>
              <p>Next to The Boathouse Pub & Pizza, Malgas, WC, 6740</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-white rounded-full mb-4" />
            <p className="text-lg italic">We do the forerunning for you!</p>
          </div>

          <div className="text-right">
            <h3 className="font-bold mb-4">Contact Us</h3>
            <p className="text-gray-300 mb-2">info@destinationmalgas.co.za</p>
            <p className="text-gray-300">+ 27 (0) 671 629 081</p>
            <div className="flex justify-end space-x-4 mt-4">
              <Facebook className="w-6 h-6" />
              <Twitter className="w-6 h-6" />
              <Instagram className="w-6 h-6" />
              <Linkedin className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

