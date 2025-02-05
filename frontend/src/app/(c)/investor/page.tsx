"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const companyData = [
  {
    id: 1,
    name: "TechInnovate Ltd.",
    profile_pic: "https://www.techinnovate.com/images/logo.png",
    market: "Technology, Software Development",
    industry: "Software",
    city: "London",
    founded: "2023-11-10",
    employees: 200,
    events: ["Dreamforce"],
    description: "Innovative software solutions for enterprises.",
    companyWebsite: "https://www.techinnovate.com",
    companySocials: "https://linkedin.com/company/techinnovate",
  },
  {
    id: 2,
    name: "EcoTech Industries",
    profile_pic: "https://www.ecotechindustries.com/images/logo.png",
    market: "Manufacturing, Green Tech",
    industry: "Manufacturing",
    city: "Bangalore",
    founded: "2023-07-15",
    employees: 5000,
    events: ["CES"],
    description: "Eco-friendly products for sustainability.",
    companyWebsite: "https://www.ecotechindustries.com",
    companySocials: "https://linkedin.com/company/ecotechindustries",
  },
  {
    id: 3,
    name: "FinTech Innovations",
    profile_pic: "https://www.fintechinnovations.com/images/logo.png",
    market: "Finance",
    industry: "Financial Technology",
    city: "Denver",
    founded: "2022-03-20",
    employees: 10000,
    events: ["CES"],
    description: "Revolutionizing the financial landscape.",
    companyWebsite: "https://www.fintechinnovations.com",
    companySocials: "https://linkedin.com/company/fintechinnovations",
  },
];

const FilterSidebar: React.FC = () => {
  const router = useRouter();
  const [locationFilter, setLocationFilter] = useState("");
  const [keywords, setKeywords] = useState("");
  const [foundedFilter, setFoundedFilter] = useState("");
  const [eventFilter, setEventFilter] = useState("");
  const [employeeCount, setEmployeeCount] = useState(10000); // Max default employee limit
  const [similarCompanies, setSimilarCompanies] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await fetch("http://localhost:3000/ab/companies", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer YOUR_ACCESS_TOKEN_HERE", // Replace with actual token
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCompanies(data);
      } else {
        console.error("Failed to fetch companies.");
      }
    } catch (error) {
      console.error("Error fetching companies:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setLocationFilter("");
    setKeywords("");
    setFoundedFilter("");
    setEventFilter("");
    setEmployeeCount(10000);
    setSimilarCompanies("");
    setIndustryFilter("");
  };

  const viewCompany = (id: number) => {
    router.push(`/investor/${id}`);
  };

  const filteredCompanies = companyData.filter((company) => {
    const isLocationMatch = locationFilter ? company.city === locationFilter : true;
    const isKeywordMatch = keywords
      ? company.description.toLowerCase().includes(keywords.toLowerCase())
      : true;

    const isFoundedMatch = foundedFilter
      ? (() => {
          const today = new Date();
          const companyDate = new Date(company.founded);
          switch (foundedFilter) {
            case "30":
              return companyDate >= new Date(today.setDate(today.getDate() - 30));
            case "60":
              return companyDate >= new Date(today.setDate(today.getDate() - 60));
            case "90":
              return companyDate >= new Date(today.setDate(today.getDate() - 90));
            case "365":
              return companyDate >= new Date(today.setDate(today.getDate() - 365));
            default:
              return true;
          }
        })()
      : true;

    const isEventMatch = eventFilter ? company.events.includes(eventFilter) : true;
    const isEmployeeMatch = employeeCount ? company.employees <= employeeCount : true;
    const isSimilarCompanyMatch = similarCompanies
      ? company.name.toLowerCase().includes(similarCompanies.toLowerCase())
      : true;
    const isIndustryMatch = industryFilter
      ? company.industry.toLowerCase().includes(industryFilter.toLowerCase())
      : true;

    return (
      isLocationMatch &&
      isKeywordMatch &&
      isFoundedMatch &&
      isEventMatch &&
      isEmployeeMatch &&
      isSimilarCompanyMatch &&
      isIndustryMatch
    );
  });

  return (
    <div className="flex">
      {/* Sidebar Filter Section */}
      <div className="w-1/4 p-4 bg-gray-50">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Filter</h2>
          <button className="text-blue-500" onClick={handleClear}>
            Clear
          </button>
        </div>
        <div className="text-sm text-gray-500 mb-4">
          {filteredCompanies.length} Results
        </div>

        {/* Location Filter */}
        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-semibold">
            Headquarter Location
          </label>
          <select
            id="location"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Select a location</option>
            <option value="London">London</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Denver">Denver</option>
          </select>
        </div>

        {/* Keywords */}
        <div className="mb-4">
          <label htmlFor="keywords" className="block text-sm font-semibold">
            Description Keywords
          </label>
          <input
            type="text"
            id="keywords"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter keywords"
          />
        </div>

        {/* Founded Period */}
        <div className="mb-4">
          <h3 className="font-semibold text-sm">Founded</h3>
          <div className="flex flex-col space-y-2 mt-2">
            {["30", "60", "90", "365"].map((value) => (
              <label key={value} className="flex items-center">
                <input
                  type="radio"
                  name="founded"
                  value={value}
                  onChange={(e) => setFoundedFilter(e.target.value)}
                  checked={foundedFilter === value}
                  className="mr-2"
                />
                <span>{value === "365" ? "Past Year" : `Past ${value} Days`}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Event Filter */}
        <div className="mb-4">
          <label htmlFor="event" className="block text-sm font-semibold">
            Participated in Event
          </label>
          <select
            id="event"
            value={eventFilter}
            onChange={(e) => setEventFilter(e.target.value)}
            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Event</option>
            <option value="Dreamforce">Dreamforce</option>
            <option value="CES">CES</option>
          </select>
        </div>

        {/* Employee Count */}
        <div className="mb-4">
          <label htmlFor="employees" className="block text-sm font-semibold">
            Number of Employees
          </label>
          <input
            type="range"
            id="employees"
            min="0"
            max="10000"
            value={employeeCount}
            onChange={(e) => setEmployeeCount(Number(e.target.value))}
            className="w-full mt-2"
          />
          <div className="text-sm text-gray-600">Up to {employeeCount} employees</div>
        </div>

        {/* Similar Companies */}
        <div className="mb-4">
          <label htmlFor="similar-companies" className="block text-sm font-semibold">
            Companies Similar To
          </label>
          <input
            type="text"
            id="similar-companies"
            value={similarCompanies}
            onChange={(e) => setSimilarCompanies(e.target.value)}
            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md"
            placeholder="E.g. TechInnovate"
          />
        </div>

        {/* Industry Filter */}
        <div className="mb-4">
          <label htmlFor="industry" className="block text-sm font-semibold">
            Industry
          </label>
          <input
            type="text"
            id="industry"
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}
            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md"
            placeholder="E.g. SaaS, FinTech"
          />
        </div>
      </div>

      {/* Company List */}
      <div className="w-3/4 p-4">
        {filteredCompanies.map((company) => (
          <div key={company.id} className="flex items-center mb-4">
            <input type="checkbox" className="mr-4" />
            <img
              src={company.profile_pic}
              alt={`${company.name} Logo`}
              className="w-8 h-8 mr-4"
            />
            <div className="flex-1 cursor-pointer" onClick={() => viewCompany(company.id)}>
              <div className="font-semibold">{company.name}</div>
              <p className="text-sm">{company.description}</p>
            </div>
            <div className="flex items-center space-x-2">
              <a href={company.companySocials} className="text-blue-500" target="_blank">
                LinkedIn
              </a>
              <a href={company.companyWebsite} className="text-blue-500" target="_blank">
                Website
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterSidebar;
