'use client'
import { useState } from "react";
import dynamic from "next/dynamic";
import Button from "../ui/Button";
import CardContent from "../ui/CardContent";
import Card from "../ui/Card";
import Input from "../ui/Input";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useRouter } from "next/navigation"; // Use only useRouter, do not import `router`
import { YouTubeEmbed } from "react-social-media-embed";

// Dynamically load the Markdown Editor to optimize performance
const MarkdownEditor = dynamic(() => import("../ui/MarkDown"), { ssr: false });

const PitchDeckCreator = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [pitchData, setPitchData] = useState({
    title: "",
    markdownContent: "",
    fetchedArticles: [ {title: ""}, ],
  });
const router = useRouter(); // Correctly initialize useRouter here

  const fetchArticle = async (platform: string) => {
    const url = platform === "medium" ? "Medium" : "Dev.to";
    const articles = await fetch(`https://api.${platform}.com/articles`) // Mock API
      .then((res) => res.json())
      .catch(() => []);
    setPitchData((prev) => ({ ...prev, fetchedArticles: articles }));
  };

  const handleInputChange = (key: string, value: any) => {
    setPitchData({ ...pitchData, [key]: value });
  };

  const handleNext = () => {
    setActiveStep((prev) => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 1));
  };

  const handleRedirectWithVideo = (videoUrl: string, text: string) => {
    router.push(`/library?videoUrl=${encodeURIComponent(videoUrl)}&text=${encodeURIComponent(text)}`); // Use router.push
  };

  return (
    <DefaultLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Create Your Pitch Deck</h1>
        <div className="flex gap-4">
          {/* Navigation Steps */}
          <div className="w-1/4 hidden md:block">
            <Card>
              <CardContent>
                <ul className="space-y-4">
                  <li className={activeStep === 1 ? "text-blue-500" : "text-gray-600"}>Step 1: Fetch Articles</li>
                  <li className={activeStep === 2 ? "text-blue-500" : "text-gray-600"}>Step 2: Add Title</li>
                  <li className={activeStep === 3 ? "text-blue-500" : "text-gray-600"}>Step 3: Write Content</li>
                  <li className={activeStep === 4 ? "text-blue-500" : "text-gray-600"}>Step 4: Finalize & Export</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4 ">
            <Card>
              <CardContent>
                {activeStep === 1 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Step 1: Fetch Articles</h2>
                    <div className="flex gap-4">
                        <input
                            type="text"
                            placeholder="Enter URL (e.g., Medium or Dev.to)"
                            className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 px-4 py-2"
                            id="article-url"
                        />
                        <button
                            className="px-4 py-2 font-medium rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                            onClick={() => {
                            const urlInput = document.getElementById("article-url") as HTMLInputElement;
                            const url = urlInput.value;
                            if (url) {
                                alert(`Fetching article from ${url}`); // Replace this with actual fetch logic
                            } else {
                                alert("Please enter a valid URL.");
                            }
                            }}
                        >
                            Fetch Article
                        </button>
                    </div>
                    {pitchData.fetchedArticles.length > 0 && (
                      <div className="mt-4">
                        <h3 className="text-lg font-medium">Fetched Articles</h3>
                        <ul className="list-disc ml-6">
                          {pitchData.fetchedArticles.map((article, index) => (
                            <li key={index} className="text-sm text-gray-700">
                              {article.title}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {activeStep === 2 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Step 2: Add Title</h2>
                    <Input
                      label="Pitch Title"
                      value={pitchData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      placeholder="Enter your pitch title"
                    />
                  </div>
                )}

                {activeStep === 3 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Step 3: Write Content</h2>
                    <MarkdownEditor
                      value={pitchData.markdownContent}
                      onChange={(value) => handleInputChange("markdownContent", value)}
                      placeholder="Write your pitch here using Markdown..."
                    />
                  </div>
                )}

                {activeStep === 4 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Step 4: Finalize & Export</h2>
                    <p className="mb-4">Review your pitch deck and export as needed.</p>
                    <div className="flex gap-4">
                      <Button variant="primary">Export as PDF</Button>
                      <Button variant="secondary">Export as Markup</Button>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-6">
                  <Button variant="outline" disabled={activeStep === 1} onClick={handleBack}>
                    Back
                  </Button>
                  <Button variant="primary" disabled={activeStep === 4} onClick={handleNext}>
                    Next
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

      {/* Tutorials Section */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Pitch Deck Tutorials</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">How to Create an Impressive Pitch Deck</h3>
            <p className="text-sm text-gray-600 mb-4">Learn the basics of creating a pitch deck that captures attention.</p>
            <div style={{ display: 'flex' }}>
                <YouTubeEmbed url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" width={360} height={220} />
            </div>
            <button
              className="text-blue-500 hover:underline"
              onClick={() => handleRedirectWithVideo("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "Learn the basics of creating a pitch deck that captures attention.")}
            >
              Watch on Library
            </button>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Pitch Deck Examples for Startups</h3>
            <p className="text-sm text-gray-600 mb-4">Explore examples of successful pitch decks used by startups.</p>
            <div style={{ display: 'flex' }}>
                <YouTubeEmbed url="https://www.youtube.com/watch?v=3fumBcKC6RE" width={360} height={220} />
            </div>
            <button
              className="text-blue-500 hover:underline"
              onClick={() => handleRedirectWithVideo("https://www.youtube.com/watch?v=3fumBcKC6RE", "Explore examples of successful pitch decks used by startups.")}
            >
              Watch on Library
            </button>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Tips for Designing a Winning Pitch Deck</h3>
            <p className="text-sm text-gray-600 mb-4">Learn tips and tricks to make your pitch deck stand out.</p>
            <div style={{ display: 'flex' }}>
                <YouTubeEmbed url="https://www.youtube.com/watch?v=ZXsQAXx_ao0" width={360} height={220} />
            </div>
            <button
              className="text-blue-500 hover:underline"
              onClick={() => handleRedirectWithVideo("https://www.youtube.com/watch?v=ZXsQAXx_ao0", "Learn tips and tricks to make your pitch deck stand out.")}
            >
              Watch on Library
            </button>
          </div>
        </div>
      </div>
    
      </div>
    </DefaultLayout>
  );
};

export default PitchDeckCreator;
