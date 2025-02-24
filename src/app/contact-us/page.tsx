import Image from "next/image"
import { Phone } from "lucide-react"
import ContactForm from "./contact-form"
import headerImage from "../../../public/Images/ContactUs/headerImage.jpg"




export default function ContactPage() {
  return (
    <main className="w-full bg-black" data-logo-theme="white">
      <div className="relative w-full h-[50vh] min-h-[400px]">
        <Image 
          src={headerImage} 
          alt="Contact Us" 
          fill
          priority
          className="object-cover"
        />
      </div>
      <div className="container mx-auto px-4 pb-12 space-y-12">
        {/* Get in Touch Section */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-lg max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 h-full">
            {/* Map Section */}
            <div className="h-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3293.957545033745!2d20.592555975530185!3d-34.351558573045814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dd16edfbebf10bf%3A0xd448d75e14c41156!2sThe%20Boathouse%20Pizzas%20%26%20Pub!5e0!3m2!1sen!2sza!4v1737712364923!5m2!1sen!2sza"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Contact Information */}
            <div className="p-8 flex flex-col justify-center space-y-8">
              <div className="space-y-6">
                <h1 className="text-6xl font-custom1">Get in Touch</h1>
                <p className="text-gray-600">
                  Reach out to us and let&apos;s make your Malgas experience extraordinary.
                </p>
              </div>

              <div className="h-px bg-gray-600 w-full"/>
              
              <a 
                href="https://maps.app.goo.gl/UTFriomGRV5dyivH8" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="space-y-2 text-sm text-gray-800 hover:underline"
              >
                <div>
                  <p>OFFICE & SHOP</p>
                  <p>PLOT 402 DIEPKLOOF, MALGAS, WC</p>
                  <p>Tar Road Diepkloof</p>
                  <p>Next to The Boathouse Pub & Pizza, Malgas, WC, 6740</p>
                </div>
              </a>
              
              <div className="flex items-start gap-6">
                <div className="border-2 border-black rounded-full p-4">
                  <Phone className="w-8 h-8" />
                </div>
                <div>
                <p className="text-black">
                <a 
                  href="https://wa.me/27671629081" 
                  className="text-black font-custom4 text-3xl hover:underline" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  + 27 (0) 671 629 081
                </a>
              </p>
                  <a 
                  href="mailto:info@destinationmalgas.co.za" 
                  className="text-gray-600 hover:underline" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  info@destinationmalgas.co.za
                </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <ContactForm />
      </div>
    </main>
  )
}

