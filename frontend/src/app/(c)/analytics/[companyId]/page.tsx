"use client"
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; // To get dynamic params from the URL
import { Line, Bar } from 'react-chartjs-2';

// Importing required Chart.js components and registering them
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import DefaultLayout from '@/components/Layouts/DefaultLayout';

// Registering components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,   // Registering the PointElement (for Line charts)
  Title,
  Tooltip,
  Legend
);

const CompanyDashboard = () => {
  const { companyId } = useParams(); // Get the companyId from the URL
  const [companyData, setCompanyData] = useState<any>(null);

  useEffect(() => {
    // Fetch company data based on companyId (You can replace with an actual API call)
    const fetchCompanyData = async () => {
      // Example of company data (replace with API data fetching logic)
      const data = {
        id: companyId,
        name: 'TechCorp',
        category: 'Technology',
        region: 'USA',
        revenue: 5000000,
        profit: 1200000,
        employees: 250,
        marketCap: 1000000000,
        stockPrice: 120,
        competitors: ['MedTech', 'FinTech', 'GreenTech'],
        news: [
          { date: '2023-01-01', title: 'TechCorp announced new AI initiative' },
          { date: '2023-01-02', title: 'TechCorp stock jumps 5% after earnings report' },
        ],
        industryAnalysis: {
          marketShare: 25,
          growthRate: 12,
          majorTrends: ['AI', 'Cloud Computing', 'Blockchain'],
        },
        financialPerformance: [1000000, 2000000, 1500000, 1800000, 2100000],
        marketTrend: [20, 40, 60, 80, 100],
      };
      setCompanyData(data);
    };

    fetchCompanyData();
  }, [companyId]); // Fetch when companyId changes

  if (!companyData) {
    return <div>Loading...</div>;
  }

  const marketTrendData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5'],
    datasets: [
      {
        label: 'Market Trend',
        data: companyData.marketTrend,
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
    ],
  };

  const financialPerformanceData = {
    labels: ['2018', '2019', '2020', '2021', '2022'],
    datasets: [
      {
        label: 'Revenue',
        data: companyData.financialPerformance,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Company Analytics - {companyData.name}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 shadow rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Company Overview</h3>
          <p><strong>Category:</strong> {companyData.category}</p>
          <p><strong>Region:</strong> {companyData.region}</p>
          <p><strong>Revenue:</strong> ${companyData.revenue.toLocaleString()}</p>
          <p><strong>Profit:</strong> ${companyData.profit.toLocaleString()}</p>
          <p><strong>Employees:</strong> {companyData.employees}</p>
          <p><strong>Market Cap:</strong> ${companyData.marketCap.toLocaleString()}</p>
        </div>

        <div className="bg-white p-4 shadow rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Market Trend</h3>
          <Line data={marketTrendData} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="bg-white p-4 shadow rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Financial Performance</h3>
          <Bar data={financialPerformanceData} />
        </div>

        <div className="bg-white p-4 shadow rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Competitors</h3>
          <ul>
            {companyData.competitors.map((competitor: string, index: number) => (
              <li key={index}>{competitor}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white p-4 shadow rounded-lg mt-4">
        <h3 className="text-xl font-semibold mb-4">Industry Analysis</h3>
        <p><strong>Market Share:</strong> {companyData.industryAnalysis.marketShare}%</p>
        <p><strong>Growth Rate:</strong> {companyData.industryAnalysis.growthRate}%</p>
        <p><strong>Major Trends:</strong> {companyData.industryAnalysis.majorTrends.join(', ')}</p>
      </div>

      <div className="bg-white p-4 shadow rounded-lg mt-4">
        <h3 className="text-xl font-semibold mb-4">Company News</h3>
        <ul>
          {companyData.news.map((newsItem: { date: string; title: string }, index: number) => (
            <li key={index}>
              <strong>{newsItem.date}:</strong> {newsItem.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CompanyDashboard;
