"use client"
import React from "react";
import { useRouter } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useSearchParams } from "next/navigation";
import { YouTubeEmbed } from 'react-social-media-embed';

const LibraryPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Access the query parameter
  const videoUrl = searchParams.get("videoUrl");
  const text = searchParams.get("text");
  return (    
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Video Library</h1>

      {videoUrl ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <YouTubeEmbed url={videoUrl} width={1200} height={800} />
            <p className="text-gray-700 text-lg pl-5 leading-relaxed">
            {text}</p>
        </div>
      ) : (
        <p className="text-gray-600">No video URL provided. Please select a video from the tutorials page.</p>
      )}

      <div className="mt-6">
        <button
          onClick={() => router.push("/pitchstudio")}
          className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Back to Pitch Studio
        </button>
      </div>
    </div>    
  );
};

export default LibraryPage;