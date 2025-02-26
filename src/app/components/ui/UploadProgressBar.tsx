import React from 'react';

interface UploadProgressBarProps {
  progress: number;
  currentChunk: number;
  totalChunks: number;
}

export default function UploadProgressBar({ progress, currentChunk, totalChunks }: UploadProgressBarProps) {
  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between text-sm text-gray-600">
        <span>Uploading chunk {currentChunk} of {totalChunks}</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-indigo-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}