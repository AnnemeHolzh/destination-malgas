"use client"

import { Button } from "../components/ui/contactButton"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textArea"
import { useFormStatus } from "react-dom"
import { useState } from "react"
import { sendEmail } from "../actions/contact"
import { ref, set } from "firebase/database"
import { database } from "../Firebase/firebaseConfig.js"

export default function ContactForm() {
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [showOptions, setShowOptions] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault() // Prevent form from submitting and clearing
    const formData = new FormData(e.target as HTMLFormElement)

    // Reset only error message, not the form
    setError("")
    setMessage("")

    // Get form values
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const subject = formData.get("subject") as string
    const messageText = formData.get("message") as string

    // Validate all fields are filled
    const missingFields = []
    if (!name) missingFields.push("name")
    if (!email) missingFields.push("email")
    if (!phone) missingFields.push("phone")
    if (!subject) missingFields.push("subject")
    if (!messageText) missingFields.push("message")

    if (missingFields.length > 0) {
      setError(`Please fill in the following fields: ${missingFields.join(", ")}`)
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    // Validate phone number (basic format)
    const phoneRegex = /^[\d\s()+.-]+$/
    if (!phoneRegex.test(phone)) {
      setError("Please enter a valid phone number using only numbers and basic symbols ()+.-")
      return
    }

    // Show options without resetting form
    setShowOptions(true)
    setMessage("Please choose how you'd like to send your message:")

    // After successful validation
    try {
      const messageRef = ref(database, 'messages/' + Math.random().toString(36).substr(2, 9));
      await set(messageRef, {
        fullName: name,
        email,
        phoneNumber: phone,
        subject,
        message: messageText,
        timestamp: Date.now(),
        viewed: false
      });
      
      // Show options without resetting form
      setShowOptions(true);
      setMessage("Please choose how you'd like to send your message:");
    } catch {
      setError("Failed to save message. Please try again.");
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold">Write a Message</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input 
            name="name" 
            placeholder="Full Name" 
            required 
            className="bg-gray-100 border-0" 
          />
          <Input 
            name="email" 
            type="email" 
            placeholder="Email" 
            required 
            className="bg-gray-100 border-0" 
          />
          <Input 
            name="phone" 
            type="tel" 
            placeholder="Phone Number (e.g., 0712345678)" 
            required 
            className="bg-gray-100 border-0" 
          />
          <Input 
            name="subject" 
            placeholder="Subject" 
            required 
            className="bg-gray-100 border-0" 
          />
        </div>

        <Textarea
          name="message"
          placeholder="Write a Message"
          required
          className="bg-gray-100 border-0 min-h-[200px]"
        />

        <div className="text-center">
          <SubmitButton />
        </div>

        {error && <p className="text-center text-red-600">{error}</p>}
        {showOptions && (
          <>
            <p className="text-center text-green-600 mb-4">{message}</p>
            <div className="flex justify-center gap-4">
              <Button
                type="button"
                onClick={() => {
                  const whatsappNumber = "27671629081"
                  const formData = new FormData(document.querySelector('form') as HTMLFormElement)
                  const subject = formData.get('subject') as string
                  const name = formData.get('name') as string
                  const email = formData.get('email') as string
                  const phone = formData.get('phone') as string
                  const messageText = formData.get('message') as string

                  const formattedMessage = `
New Contact Form Submission
---------------------------
Name: ${name}
Email: ${email}
Phone: ${phone}
Subject: ${subject}
---------------------------
Message:
${messageText}
                  `.trim()

                  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(formattedMessage)}`
                  window.open(whatsappUrl, '_blank')
                  
                  // Reset form and hide options after sending
                  const form = document.querySelector('form') as HTMLFormElement
                  form?.reset()
                  setShowOptions(false)
                  setMessage("Message sent successfully via WhatsApp!")
                }}
                className="bg-green-600 hover:bg-green-700"
              >
                Send via WhatsApp
              </Button>
              <Button
                type="button"
                onClick={async () => {
                  const formData = new FormData(document.querySelector('form') as HTMLFormElement)
                  console.log('Subject:', formData.get('subject')) // Debug log
                  
                  const result = await sendEmail(formData)
                  
                  if (result.success) {
                    // Reset form and hide options after successful send
                    const form = document.querySelector('form') as HTMLFormElement
                    form?.reset()
                    setShowOptions(false)
                    setMessage(result.message)
                  } else {
                    setError(result.message)
                  }
                }}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Send via Email
              </Button>
            </div>
          </>
        )}
      </form>
    </div>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending} className="bg-[#556B2F] text-white hover:bg-[#556B2F]/90 px-8">
      {pending ? "Validating..." : "CONTINUE"}
    </Button>
  )
}

