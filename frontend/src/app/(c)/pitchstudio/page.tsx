'use client';
import { useState } from "react";
import dynamic from "next/dynamic";
import Button from "../../ui/Button";
import CardContent from "../../ui/CardContent";
import Card from "../../ui/Card";
import Input from "../../ui/Input";
import { useRouter } from "next/navigation";
import axios from "axios";
import { getDevToMarkdown } from "../../../utils/devtomarkdown"; // Import the utility function
import jsPDF from "jspdf"; // For generating PDFs
import { saveAs } from "file-saver"; // For saving files

const MarkdownEditor = dynamic(() => import("../../ui/MarkDown"), { ssr: false });

const PitchDeckCreator = () => {
  const [articleUrl, setArticleUrl] = useState('');
  const [activeStep, setActiveStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pitchData, setPitchData] = useState({
    title: "",
    markdownContent: "",
    valuation: "",
    funding: "",
    pitchDate: "",
    fetchedArticles: [],
  });

  const router = useRouter();
  const authToken=localStorage.getItem("authToken");

  async function fetchDevToBlog(url: string) {
    try {
      setLoading(true);
      setError('');
      const parsedUrl = new URL(url);
      const pathSegments = parsedUrl.pathname.split('/').filter(Boolean);

      if (pathSegments.length === 2) {
        // If it's a specific article URL
        const articleUrl = `https://dev.to/api/articles/${pathSegments[1]}`;
        const { data } = await axios.get(articleUrl);

        // Fetch markdown content using the utility function
        const markdown = await getDevToMarkdown(url);

        setPitchData((prev: any) => ({
          ...prev,
          title: data.title,
          markdownContent: markdown || 'Markdown content unavailable',
          fetchedArticles: [],
        }));
      } else if (pathSegments.length === 1) {
        // If it's a username URL
        const apiUrl = `https://dev.to/api/articles?username=${pathSegments[0]}`;
        const { data } = await axios.get(apiUrl);

        if (Array.isArray(data)) {
          setPitchData((prev: any) => ({
            ...prev,
            fetchedArticles: data.map((blog) => ({
              title: blog.title,
              url: `https://dev.to/${pathSegments[0]}/${blog.slug}`, // Full URL to the article
            })),
          }));
        } else {
          setError("No articles found for this username.");
        }
      } else {
        throw new Error('Invalid URL format');
      }
    } catch (error) {
      setError('Error fetching data. Please check the URL and try again.');
    } finally {
      setLoading(false);
    }
  }

  const handleFetchArticle = () => {
    if (!articleUrl.trim()) {
      setError('Please enter a valid URL.');
      return;
    }
    fetchDevToBlog(articleUrl);
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

  const handleSelectArticle = async (articleUrl: string) => {
    try {
      setLoading(true);
      const markdown = await getDevToMarkdown(articleUrl);
      const { title } = pitchData.fetchedArticles.find(
        (article) => article.url === articleUrl
      ) || { title: "Article" };

      setPitchData({
        ...pitchData,
        title,
        markdownContent: markdown,
      });
      setActiveStep(2);
    } catch (error) {
      setError("Error fetching article content.");
    } finally {
      setLoading(false);
    }
  };

  // Function to save PDF
  const saveAsPDF = () => {
    const doc = new jsPDF();
    doc.text(pitchData.title, 10, 10);
    doc.text(pitchData.markdownContent, 10, 20);
    doc.save(`${pitchData.title}.pdf`);
  };

  // Function to save as Markdown
  const saveAsMarkdown = () => {
    const blob = new Blob([pitchData.markdownContent], {
      type: "text/markdown;charset=utf-8",
    });
    saveAs(blob, `${pitchData.title}.md`);
  };

  // Post to network
  const postToNetwork = async () => {
    try {
      const { title, markdownContent, valuation, funding, pitchDate } = pitchData;

      if (!valuation || !funding || !pitchDate) {
        setError("Please fill out valuation, funding, and pitch date.");
        return;
      }
      const headers = {
        "Authorization": `Bearer ${authToken}`  
      };
      const response = await axios.post("http://localhost:3000/ab/1/pitchdeck", {
        valuation,
        funding,
        pitch_date:Date.now,
        markup: markdownContent,
      }, {headers});

      if (response.status === 200) {
        alert("Pitch deck posted successfully!");
      } else {
        alert("Failed to post pitch deck.");
      }
    } catch (error) {
      setError("Error posting to network.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Create Your Pitch Deck</h1>
      <div className="flex gap-4">
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

        <div className="w-full md:w-3/4">
          <Card>
            <CardContent>
              {activeStep === 1 && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Step 1: Fetch Articles</h2>
                  <div className="flex gap-4">
                    <input
                      type="text"
                      placeholder="Enter URL (e.g., dev.to/username or dev.to/article)"
                      className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 px-4 py-2"
                      id="article-url"
                      value={articleUrl}
                      onChange={(e) => setArticleUrl(e.target.value)}
                    />
                    <Button onClick={handleFetchArticle} disabled={loading}>
                      {loading ? 'Fetching...' : 'Fetch Article'}
                    </Button>
                  </div>
                  {pitchData.fetchedArticles.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-lg font-medium">Fetched Articles</h3>
                      <ul className="list-disc ml-6">
                        {pitchData.fetchedArticles.map((article, index) => (
                          <li
                            key={index}
                            className="text-sm text-blue-500 cursor-pointer hover:underline"
                            onClick={() => handleSelectArticle(article.url)}
                          >
                            {article?.title}
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
                  <Input
                    label="Valuation"
                    value={pitchData.valuation}
                    onChange={(e) => handleInputChange("valuation", e.target.value)}
                    placeholder="Enter your valuation"
                  />
                  <Input
                    label="Funding"
                    value={pitchData.funding}
                    onChange={(e) => handleInputChange("funding", e.target.value)}
                    placeholder="Enter funding"
                  />

                    <input
                      type="date"
                      id="pitchDate"
                      value={pitchData.pitchDate}
                      onChange={(e) => handleInputChange("pitchDate", e.target.value)}
                      className="block w-full mt-2 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
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
                    <Button variant="primary" onClick={saveAsPDF}>Export as PDF</Button>
                    <Button variant="secondary" onClick={saveAsMarkdown}>Export as Markdown</Button>
                    <Button variant="outline" onClick={postToNetwork}>Post to Network</Button>
                  </div>
                </div>
              )}

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
    </div>
  );
};

export default PitchDeckCreator;
