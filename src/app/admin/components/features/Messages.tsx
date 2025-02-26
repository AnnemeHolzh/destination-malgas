"use client";

import { useEffect, useState } from 'react';
import { ref, query, orderByChild, onValue } from "firebase/database";
import { database } from "../../../Firebase/firebaseConfig";
import { MessageCard } from './MessageCard';

interface Message {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  subject: string;
  message: string;
  timestamp: number;
  viewed: boolean;
  // Add other fields as necessary
}

export default function Messages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const messagesRef = query(ref(database, 'messages'), orderByChild('timestamp'));
    
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const messagesData: Message[] = [];
      snapshot.forEach((childSnapshot) => {
        messagesData.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      setMessages(messagesData.reverse()); // Newest first
      console.log(messagesData); // Log the messages data
    });

    return () => unsubscribe();
  }, []);

  const filteredMessages = messages.filter(message =>
    message.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Messages</h2>
        <input
          type="text"
          placeholder="Search messages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-md w-64"
        />
      </div>
      
      <div className="space-y-4">
        {filteredMessages.map((message) => (
          <MessageCard
            key={message.id}
            message={message}
            onUpdate={() => setMessages([...messages])}
          />
        ))}
        {filteredMessages.length === 0 && (
          <p className="text-gray-500 text-center py-8">No messages found</p>
        )}
      </div>
    </div>
  );
} 