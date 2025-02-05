"use client"
import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaArrowDown, FaArrowUp } from 'react-icons/fa';
import Image from 'next/image'; // For rendering company logos
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import { useRouter } from 'next/navigation';
interface Company {
  id: number;
  name: string;
  category: string;
  region: string;
  revenue: number;
  employees: number;
  logo: string; // Add logo to company data
}

const CompanyListing = () => {
  const router=useRouter();
  const [companies, setCompanies] = useState<Company[]>([]); // Correctly type companies
  const [filters, setFilters] = useState({
    category: '',
    region: '',
    revenue: '',
    employeeCount: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [sorted, setSorted] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [companiesPerPage] = useState(10);

  useEffect(() => {
    // Simulating an API call to fetch companies data
    const fetchCompanies = async () => {
      const data: Company[] = [
        { id: 1, name: 'TechCorp', category: 'Technology', region: 'USA', revenue: 5000000, employees: 250, logo: '/images/techcorp-logo.png' },
        { id: 2, name: 'MedTech', category: 'Healthcare', region: 'Canada', revenue: 3000000, employees: 120, logo: '/images/medtech-logo.png' },
        { id: 3, name: 'FinTech', category: 'Finance', region: 'USA', revenue: 8000000, employees: 450, logo: '/images/fintech-logo.png' },
        { id: 4, name: 'GreenTech', category: 'Environment', region: 'Europe', revenue: 7000000, employees: 150, logo: '/images/greentech-logo.png' },
      ];
      setCompanies(data);
    };

    fetchCompanies();
  }, []);

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filters.category ? company.category === filters.category : true;
    const matchesRegion = filters.region ? company.region === filters.region : true;
    const matchesRevenue = filters.revenue ? company.revenue >= parseFloat(filters.revenue) : true;
    const matchesEmployeeCount = filters.employeeCount ? company.employees >= parseInt(filters.employeeCount) : true;
    return matchesSearch && matchesCategory && matchesRegion && matchesRevenue && matchesEmployeeCount;
  });

  const handleSort = (key: keyof Company) => {
    const sortedCompanies = [...filteredCompanies];
    if (sorted === key) {
      sortedCompanies.reverse();
      setSorted(null);
    } else {
      sortedCompanies.sort((a, b) => a[key].toString().localeCompare(b[key].toString()));
      setSorted(key);
    }
    setCompanies(sortedCompanies);
  };

  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = filteredCompanies.slice(indexOfFirstCompany, indexOfLastCompany);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Company Listings</h2>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search Companies"
            className="p-2 border rounded text-gray-800 dark:text-white bg-gray-200 dark:bg-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="p-2 bg-blue-500 text-white rounded flex items-center hover:bg-blue-600">
            <FaFilter className="mr-2" /> Filter
          </button>
        </div>
      </div>

      <div className="flex gap-4 mb-4">
        <select
          className="p-2 border rounded bg-gray-200 text-gray-800 dark:text-white dark:bg-gray-700"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="">Select Category</option>
          <option value="Technology">Technology</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Finance">Finance</option>
        </select>

        <select
          className="p-2 border rounded bg-gray-200 text-gray-800 dark:text-white dark:bg-gray-700"
          value={filters.region}
          onChange={(e) => setFilters({ ...filters, region: e.target.value })}
        >
          <option value="">Select Region</option>
          <option value="USA">USA</option>
          <option value="Canada">Canada</option>
          <option value="Europe">Europe</option>
        </select>

        <select
          className="p-2 border rounded bg-gray-200 text-gray-800 dark:text-white dark:bg-gray-700"
          value={filters.revenue}
          onChange={(e) => setFilters({ ...filters, revenue: e.target.value })}
        >
          <option value="">Minimum Revenue</option>
          <option value="1000000">1M</option>
          <option value="5000000">5M</option>
          <option value="10000000">10M</option>
        </select>

        <select
          className="p-2 border rounded bg-gray-200 text-gray-800 dark:text-white dark:bg-gray-700"
          value={filters.employeeCount}
          onChange={(e) => setFilters({ ...filters, employeeCount: e.target.value })}
        >
          <option value="">Minimum Employees</option>
          <option value="50">50+</option>
          <option value="100">100+</option>
          <option value="500">500+</option>
        </select>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <div className="grid grid-cols-5 bg-gray-100 p-4 text-sm font-semibold text-gray-700 dark:bg-gray-800 dark:text-white">
          <div className="text-center p-2">Company</div>
          <div className="text-center p-2">Category</div>
          <div className="text-center p-2">Region</div>
          <div className="text-center p-2">Revenue</div>
          <div className="text-center p-2">Employees</div>
        </div>

        {currentCompanies.map((company) => (
          <div
            className="grid grid-cols-5 p-4 text-sm text-gray-800 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-700"
            key={company.id}
            onClick={() => router.push(`/analytics/${company.id}`)} // Navigate to the analytics page
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
            <div className="flex-shrink-0">
                <Image src={company.logo} alt={company.name} width={40} height={40} />
            </div>
            <p className="hidden text-black dark:text-white sm:block">
                {company.name}
            </p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{company.category}K</p>
            </div>
            <div className="text-center">{company.region}</div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">${company.revenue}</p>
            </div>            
            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-5">{company.employees}%</p>
            </div>          
            </div>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <button
          className="p-2 border bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <button
          className="p-2 border bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage * companiesPerPage >= filteredCompanies.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CompanyListing;
