'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useState } from "react";
import TableOne from "@/components/Tables/TableOne";

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

  return (
    <DefaultLayout>
      <div className="max-w-7xl mx-auto p-4">
        <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg p-6 text-white">
          <div className="absolute top-4 right-4">
            <button className="bg-white text-black px-4 py-2 rounded-lg shadow">
              Edit Profile
            </button>
          </div>
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white">
              <Image
                src="/images/user/user-06.png"
                width={112}
                height={112}
                alt="Profile"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold">ByteVerse inc.</h1>
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
                <span className="text-base font-semibold text-gray-800">Dhaka, Bangladesh</span>
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
                {activeTab !== "investment" && (
                  <div>
                    <p className="text-gray-600">Content for {activeTab} will be added here.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

      </div>
    </DefaultLayout>
  );
};

export default Profile;
