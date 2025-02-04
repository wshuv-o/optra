"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
const FilterSidebar: React.FC = () => {
const router= useRouter();
  const [clear, setClear] = useState(false);
  const handleClear = () => setClear(!clear);

const viewCompany=(arg0: number)=> {
    router.push(`/investor/${arg0}`)
}

  return (
    <DefaultLayout>
    <div className="flex">
      {/* Sidebar Filter Section */}
      <div className="w-1/4 p-4 bg-gray-50">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Filter</h2>
          <button
            className="text-blue-500"
            onClick={handleClear}
          >
            {clear ? 'Clear' : 'Apply'}
          </button>
        </div>
        <div className="text-sm text-gray-500 mb-4">3,317,370 Results</div>

        {/* Overview Section */}
        <div className="mb-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Overview</h3>
            <button className="text-gray-600">↓</button>
          </div>
        </div>

        {/* Location Field */}
        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-semibold text-gray-700">Headquarter Location</label>
          <select
            id="location"
            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md text-gray-700"
          >
            <option>E.g. London</option>
            {/* Add more options here */}
          </select>
        </div>

        {/* Description Keywords */}
        <div className="mb-4">
          <label htmlFor="keywords" className="block text-sm font-semibold text-gray-700">Description Keywords</label>
          <input
            type="text"
            id="keywords"
            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md text-gray-700"
            placeholder="Enter keywords"
          />
        </div>

        {/* New Filter Fields */}
        
        {/* Founded Filter */}
        <div className="mb-4">
          <h3 className="font-semibold text-sm text-gray-700">Founded</h3>
          <div className="flex flex-col space-y-2 mt-2">
            <label className="flex items-center">
              <input type="radio" name="founded" className="mr-2" />
              <span>Past 30 Days</span>
            </label>
            <label className="flex items-center">
              <input type="radio" name="founded" className="mr-2" />
              <span>Past 60 Days</span>
            </label>
            <label className="flex items-center">
              <input type="radio" name="founded" className="mr-2" />
              <span>Past 90 Days</span>
            </label>
            <label className="flex items-center">
              <input type="radio" name="founded" className="mr-2" />
              <span>Past Year</span>
            </label>
          </div>
        </div>

        {/* Participated in Event */}
        <div className="mb-4">
          <label htmlFor="event" className="block text-sm font-semibold text-gray-700">Participated in Event</label>
          <select
            id="event"
            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md text-gray-700"
          >
            <option>E.g. Dreamforce, CES</option>
            {/* Add more options here */}
          </select>
        </div>

        {/* Number of Employees */}
        <div className="mb-4">
          <label htmlFor="employees" className="block text-sm font-semibold text-gray-700">Number of Employees</label>
          <input
            type="range"
            id="employees"
            min="0"
            max="10000"
            className="w-full mt-2"
          />
        </div>

        {/* Companies Similar To */}
        <div className="mb-4">
          <label htmlFor="similar-companies" className="block text-sm font-semibold text-gray-700">Companies Similar To</label>
          <select
            id="similar-companies"
            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md text-gray-700"
          >
            <option>E.g. Lyft, Twitter, Box</option>
            {/* Add more options here */}
          </select>
        </div>

        {/* Industry */}
        <div className="mb-4">
          <label htmlFor="industry" className="block text-sm font-semibold text-gray-700">Industry</label>
          <input
            type="text"
            id="industry"
            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md text-gray-700"
            placeholder="E.g. SaaS, Android, Cloud"
          />
        </div>
      </div>

      {/* Company List Section */}
      <div className="w-3/4 p-4">
        <div className="flex justify-between items-center mb-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Export CSV</button>
        </div>

        {/* Company Item 1 (Y Combinator) */}
        <div className="flex items-center mb-4 " >
          <input type="checkbox" className="mr-4" />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/YCombinator_logo.svg/800px-YCombinator_logo.svg.png"
            alt="Y Combinator Logo"
            className="w-8 h-8 mr-4"
          />
          <div className="flex-1 cursor-pointer" onClick={()=>viewCompany(1)}>
            <div className="font-semibold text-gray-800 ">Y Combinator</div>
            <p className="text-sm text-gray-600">
              Y Combinator is a startup accelerator that provides funding and mentorship to early-stage companies...
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <a href="#" className="text-blue-500">LinkedIn</a>
            <a href="#" className="text-blue-500">Website</a>
          </div>
        </div>

        {/* Company Item 2 (Techstars) */}
        <div className="flex items-center mb-4">
          <input type="checkbox" className="mr-4" />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a7/Techstars_Logo.svg"
            alt="Techstars Logo"
            className="w-8 h-8 mr-4"
          />
          <div className="flex-1">
            <div className="font-semibold text-gray-800">Techstars</div>
            <p className="text-sm text-gray-600">
              Techstars is a global startup accelerator and venture capital firm...
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <a href="#" className="text-blue-500">LinkedIn</a>
            <a href="#" className="text-blue-500">Website</a>
          </div>
        </div>
      </div>
    </div></DefaultLayout>
  );
};

export default FilterSidebar;
