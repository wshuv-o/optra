'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useEffect, useState } from "react";
import TableOne from "@/components/Tables/TableOne";

import axios from "axios";
import { PitchDeckCard } from "@/components/PitchDeckCard";
import { decrypt } from "@/utils/decryptJWT";

const Profile = () => {
  const [filter, setFilter] = useState("");
  const [orderType, setOrderType] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [activeTab, setActiveTab] = useState("investment");
  const handleFilterReset = () => {
    setFilter("");
    setOrderType("");
    setOrderStatus("");
  };

  const [formData, setFormData] = useState({
    emailAddress: "",
    phoneNumber: "",
    bio: "",
    companySocials: "",
    companyName: "",
    registrationNumber: "",
    industry: "",
    companyEmail: "",
    companyPhone: "",
    companyWebsite: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    companyDescription: "",
    profile_pic: "/images/brand/brand-01.svg"
  });






  const token = localStorage.getItem("authToken") 
  const payload= decrypt(token as string);
  
  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        if (!token) {
          alert("You are not authenticated.");
          return;
        }

        const response = await axios.get(
          `http://localhost:3000/ab/${payload.sub}/me`, 
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setFormData({
          ...formData,
          ...response.data, // Populate the form data with the API response
        });
        // Populate formData with the fetched data
      } catch (error) {
        alert("Error fetching company data.");
        console.error(error);
      }
    };

    fetchCompanyData();
  }, []);


const PitchDecks = () => {
  const [pitchDecks, setPitchDecks] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredPitchDecks, setFilteredPitchDecks] = useState<any[]>([]);

  // Fetch the list of all pitch decks



  useEffect(() => {
    const fetchPitchDecks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/ab/1/pitchdecks");
        setPitchDecks(response.data);
        setFilteredPitchDecks(response.data); // Set initial filtered data to all pitch decks
      } catch (error) {
        console.error("Error fetching pitch decks:", error);
      }
    };

    fetchPitchDecks();
  }, []);

  // Filter pitch decks based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredPitchDecks(pitchDecks);
    } else {
      const filtered = pitchDecks.filter((deck) =>
        deck.markup?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deck.valuation?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deck.funding?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPitchDecks(filtered);
    }
  }, [searchQuery, pitchDecks]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Pitch Decks</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by markdown content, valuation, funding..."
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* PitchDeck List */}
      <div className="space-y-6">
        {filteredPitchDecks.length === 0 ? (
          <p>No pitch decks found.</p>
        ) : (
          filteredPitchDecks.map((deck) => (
            <PitchDeckCard key={deck.id} id={deck.id} />
          ))
        )}
      </div>
    </div>
  );
};



  return (
      <div className="max-w-7xl mx-auto p-4">
        <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg p-6 text-white">
          <div className="absolute top-4 right-4">
            <button className="bg-white text-black px-4 py-2 rounded-lg shadow">
              Edit Profile
            </button>
          </div>
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white">
              <img
                src={formData.profile_pic}
                width={112}
                height={112}
                alt="Profile"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{formData.companyName}</h1>
              <p className="text-sm mt-1">Member Since, April 2024</p>
              <p className="text-sm">April 23, 2024 1:49 am</p>
              <p className="text-sm">21 Profile Views</p>
            </div>
          </div>
        </div>

        <div className="py-6 grid grid-cols-4 gap-4">

            <div className="col-span-1 hidden md:block bg-white shadow rounded-lg">
              <div className="p-4 space-y-1">
                <span className="text-sm font-medium text-gray-500">Launch Date </span>
                <span className="text-base font-semibold text-gray-800">Feb 22, 2024</span>
              </div>
              <div className="px-4 space-y-1">
                <span className="text-sm font-medium text-gray-500">Employees </span>
                <span className="text-base font-semibold text-gray-800">5001-100000 people</span>
              </div>
              <div className="px-4 space-y-1">
                <span className="text-sm font-medium text-gray-500">Location </span>
                <span className="text-base font-semibold text-gray-800">{formData.city} { formData.country}</span>
              </div>
              <div className="px-4 space-y-1">
                <span className="text-sm font-medium text-gray-500">Funding Type </span>
                <span className="text-base font-semibold text-gray-800">Funded Company</span>
              </div>
              <div className=" px-4 space-y-1">
                <span className="text-sm font-medium text-gray-500">Type </span>
                <span className="text-base font-semibold text-gray-800">EdTech</span>
              </div>
              <div className="px-4 space-y-1">
                <span className="text-sm font-medium text-gray-500">Evaluation </span>
                <span className="text-base font-semibold text-gray-800">$10.3 Million</span>
              </div>
            </div>

            <div className="col-span-4 md:col-span-3">
              <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                <button
                  onClick={() => setActiveTab("investment")}
                  className={`px-4 py-2 text-sm font-medium border-b-2 ${
                    activeTab === "investment" ? "border-blue-500 text-blue-500" : "border-transparent text-gray-500"
                  }`}
                >
                  Investment
                </button>
                <button
                  onClick={() => setActiveTab("pitchdeck")}
                  className={`px-4 py-2 text-sm font-medium border-b-2 ${
                    activeTab === "pitchdeck" ? "border-blue-500 text-blue-500" : "border-transparent text-gray-500"
                  }`}
                >
                  Pitch Deck
                </button>
                <button
                  onClick={() => setActiveTab("investors")}
                  className={`px-4 py-2 text-sm font-medium border-b-2 ${
                    activeTab === "investors" ? "border-blue-500 text-blue-500" : "border-transparent text-gray-500"
                  }`}
                >
                  All Investors
                </button>
                <button
                  onClick={() => setActiveTab("more")}
                  className={`px-4 py-2 text-sm font-medium border-b-2 ${
                    activeTab === "more" ? "border-blue-500 text-blue-500" : "border-transparent text-gray-500"
                  }`}
                >
                  More
                </button>
              </div>

              <div className="mt-6">
                {activeTab === "investment" && (
                  <div className="mt-10">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold hidden md:block">Investment</h2>
                    <div className="flex flex-wrap gap-4">
                      <input
                        type="date"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="px-4 py-2 border rounded-lg"
                      />
                      <select
                        value={orderType}
                        onChange={(e) => setOrderType(e.target.value)}
                        className="px-4 py-2 border rounded-lg"
                      >
                        <option value="">Order Type</option>
                        <option value="electric">Electric</option>
                        <option value="book">Book</option>
                        <option value="medicine">Medicine</option>
                        <option value="mobile">Mobile</option>
                      </select>
                      <select
                        value={orderStatus}
                        onChange={(e) => setOrderStatus(e.target.value)}
                        className="px-4 py-2 border rounded-lg"
                      >
                        <option value="">Order Status</option>
                        <option value="completed">Completed</option>
                        <option value="processing">Processing</option>
                        <option value="rejected">Rejected</option>
                      </select>
                      <button
                        onClick={handleFilterReset}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg shadow"
                      >
                        Reset Filter
                      </button>
                    </div>
                  </div>
                  <TableOne/>
                </div>
                )}
                 {activeTab == "pitchdeck" && (
                    <PitchDecks/>
                )}

                {activeTab !== "investment" && (
                  <div>
                    <p className="text-gray-600">Content for {activeTab} will be added here.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

      </div>
  );
};

export default Profile;
