"use client";

import { Button } from "../../../components/ui/contactButton";
import { update } from "firebase/database";
import { Eye, EyeOff } from "lucide-react";
import { ref } from "firebase/database";
import { database } from "../../../Firebase/firebaseConfig";

interface MessageCardProps {
  message: {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    subject: string;
    message: string;
    timestamp: number;
    viewed: boolean;
  };
  onUpdate: () => void;
}

export function MessageCard({ message, onUpdate }: MessageCardProps) {
  const formatTimeAgo = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  };

  const handleMarkViewed = async () => {
    try {
      const messageRef = ref(database, `messages/${message.id}`);
      await update(messageRef, { viewed: !message.viewed });
      onUpdate();
    } catch (error) {
      console.error("Error updating message:", error);
    }
  };

  return (
    <div className={`p-6 rounded-lg shadow-md transition-all ${
      message.viewed ? 'bg-gray-50 opacity-75' : 'bg-white'
    }`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className={`text-lg font-semibold ${message.viewed ? 'text-gray-600' : 'text-gray-900'}`}>
            {message.fullName}
          </h3>
          <p className="text-sm text-gray-500">{formatTimeAgo(message.timestamp)}</p>
        </div>
        <Button
          variant="outline"
          onClick={handleMarkViewed}
          className="flex items-center gap-2"
        >
          {message.viewed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          {message.viewed ? 'Mark Unread' : 'Mark Viewed'}
        </Button>
      </div>
      <div className="space-y-2">
        <p className="text-sm"><span className="font-medium">Subject:</span> {message.subject}</p>
        <p className="text-sm"><span className="font-medium">Email:</span> {message.email}</p>
        <p className="text-sm"><span className="font-medium">Phone:</span> {message.phoneNumber}</p>
        <p className="text-sm text-gray-600 mt-2">{message.message}</p>
      </div>
    </div>
  );
} 