import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import Image from "next/image"
import logo from "../../../public/Images/Layout/footer_logo.svg" // Make sure to add your logo image to this path
import NewsletterForm from "./newsletter-form"

export function Footer() {
  return (
    <footer className="bg-[#202020] text-white py-12">
      <NewsletterForm/>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold mb-4">Our location</h3>
            <a 
              href="https://maps.app.goo.gl/UTFriomGRV5dyivH8" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="space-y-2 text-sm text-gray-300 hover:underline"
            >
              <div>
                <p>OFFICE & SHOP</p>
                <p>PLOT 402 DIEPKLOOF, MALGAS, WC</p>
                <p>Tar Road Diepkloof</p>
                <p>Next to The Boathouse Pub & Pizza, Malgas, WC, 6740</p>
              </div>
            </a>
          </div>

          <div className="flex flex-col items-center justify-center">
            <Image
              src={logo}
              alt="Destination Malgas Logo"
              width={400}
              height={400}
            />
          </div>

          <div className="text-right">
            <h3 className="font-bold mb-4">Contact Us</h3>
            <p className="text-gray-300 mb-2">
              <a 
                href="mailto:info@destinationmalgas.co.za" 
                className="text-gray-300 hover:underline" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                info@destinationmalgas.co.za
              </a>
            </p>
            <p className="text-gray-300">
              <a 
                href="https://wa.me/27671629081" 
                className="text-gray-300 hover:underline" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                + 27 (0) 671 629 081
              </a>
            </p>
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

