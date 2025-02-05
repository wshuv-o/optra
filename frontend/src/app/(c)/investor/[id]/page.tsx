"use client"
import React from "react";
import { useParams } from 'next/navigation'; // To get dynamic params from the URL
import { FaLink, FaPhoneAlt, FaEnvelope } from "react-icons/fa"; // Icons for contact info
import { Metadata } from "next";
  import Image from "next/image";
  import Card from "../../../ui/Card";
  import CardContent from "../../../ui/CardContent";
  import Button from "../../../ui/Button"
import DefaultLayout from "@/components/Layouts/DefaultLayout";
  
  export default function Home() {
    return (
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="col-span-1 flex flex-col space-y-6">
          {/* Company Header */}
          <div className="flex flex-col items-start space-y-4">
            <div className="flex items-center space-x-4">
            <Image src={"/images/brand/brand-01.svg"} alt={"photo"} width={100} height={100} className="rounded-full" />
                
              <div>
                    <h1 className="text-2xl font-bold">Y Combinator</h1>
                <p className="text-gray-500">Signal active • Investment Firm</p>
              </div>
              <Button>Follow</Button>
            </div>
            
          </div>
          
          {/* Overview */}
          <Card>
            <CardContent >
              <h2 className="text-xl font-semibold">Overview</h2>
              <p>
                Y Combinator is a startup accelerator that provides funding and mentorship to early-stage companies. The organization helps founders develop their business models and products across technology, healthcare, and finance.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div><strong>Founded:</strong> 2005</div>
                <div><strong>Industry:</strong> Financial Services</div>
                <div><strong>Employees:</strong> 101-250</div>
                <div><strong>Investment:</strong> 7095</div>
                <div><strong>Lead Investment:</strong> 2729</div>
                <div><strong>Exits:</strong> 604</div>
              </div>
            </CardContent>
          </Card>
  
          {/* Socials and Profile Resume */}
          <Card>
            <CardContent >
              <h2 className="text-xl font-semibold">Social</h2>
              <Button variant="outline">Website</Button>
              <Button variant="outline">LinkedIn</Button>
              <h2 className="text-xl font-semibold mt-4">Profile Resume</h2>
              <p>
                Y Combinator specializes in Seed, Early Stage Venture, Late Stage Venture, and Private Equity investments across various industries.
              </p>
            </CardContent>
          </Card>
  
          {/* Employees */}
          <Card>
          <CardContent >
            <h2 className="text-xl font-semibold">Employees</h2>
            <div className="grid grid-cols-1 gap-4">
              {[
                { name: "Brad Flora", role: "Group Partner", image: "/brad-flora.jpg" },
                { name: "Carolynn Levy", role: "Partner", image: "/carolynn-levy.jpg" },
                { name: "Jared Friedman", role: "Group Partner", image: "/jared-friedman.jpg" },
                { name: "Michael Seibel", role: "Managing Director and Partner", image: "/michael-seibel.jpg" },
                { name: "Jessica Livingston", role: "Partner", image: "/jessica-livingston.jpg" },
                { name: "Dalton Caldwell", role: "Partner and Managing Director", image: "/dalton-caldwell.jpg" },
              ].map((employee) => (
                <div key={employee.name} className="flex items-center justify-between border p-3 rounded-lg">
                  <div className="flex items-center space-x-3">
                    
                      <Image src={employee.image} alt={employee.name} width={40} height={40} className="rounded-full" />

                    <div>
                      <span className="font-semibold">{employee.name}</span>
                      <p className="text-gray-500 text-sm">{employee.role}</p>
                    </div>
                  </div>
                  <Button>View</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        </div>
        
        {/* Right Section */}
        <div className="col-span-2 space-y-6">
          {/* Call to Action */}
        {/* Call to Action */}
        <div className="rounded-md bg-gradient-to-r from-pink-200 via-pink-300 to-red-300 text-black">
          <div className="p-6 flex justify-between items-center">
            <h1 className="text-lg font-semibold">
              Find email and phone number of Y Combinator and 280k+ other Investment Firms.
            </h1>
            <button className="bg-blue-600 hover:bg-purple-400 text-white px-4 py-2 rounded-lg">START FREE</button>
          </div>
        </div>
  
          {/* Investment Portfolio */}
        {/* Investment Portfolio */}
        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold">Investment Portfolio</h2>
            <p className="mt-2 text-gray-600">
              Y Combinator has made 6765 investments. Their most recent investment was on Jan 13, 2025, when OpenCopilot raised $1.5M.
            </p>
            <div className="grid grid-cols-3 gap-4 text-center mt-4">
              <div className="p-3 border rounded-lg">
                <p className="text-lg font-bold">Investments</p>
                <p className="text-gray-500">7095</p>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="text-lg font-bold">Lead Investments</p>
                <p className="text-gray-500">2729</p>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="text-lg font-bold">Number of Exits</p>
                <p className="text-gray-500">604</p>
              </div>
            </div>
            <table className="w-full mt-4 border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Announced Date</th>
                  <th className="border p-2">Organization Name</th>
                  <th className="border p-2">Industry</th>
                  <th className="border p-2">Money Raised</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { date: "Jan 13, 2025", company: "OpenCopilot", industry: "Software", money: "1.5M" },
                  { date: "Jan 07, 2025", company: "Fazeshift", industry: "Financial Services", money: "4.0M" },
                  { date: "Dec 18, 2024", company: "Hamming AI", industry: "-", money: "3.8M" },
                  { date: "Dec 16, 2024", company: "Boom Supersonic", industry: "Manufacturing", money: "100.0M" }
                ].map((investment, index) => (
                  <tr key={index} className="border">
                    <td className="border p-2">{investment.date}</td>
                    <td className="border p-2">{investment.company}</td>
                    <td className="border p-2">{investment.industry}</td>
                    <td className="border p-2">{investment.money}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 text-center">
              <Button variant="outline">Show More</Button>
            </div>
          </CardContent>
        </Card>
  
          {/* Exits */}
          <Card>
          <CardContent >
            <h2 className="text-xl font-semibold">Exits • 604</h2>
            <div className="grid grid-cols-2 gap-6">
              {[
                { name: "Machine Zone", description: "Machine Zone develops mobile games in various genres that include fantasy/RPG/MMO. It offers its games for Android and iPad.", image: "/machine-zone.png" },
                { name: "Airbnb", description: "Airbnb operates an online platform that connects hosts with guests seeking short-term accommodations.", image: "/airbnb.png" },
                { name: "Lingt", description: "Lingt empowers teachers to speak more with their students. Create and manage online speaking assignments.", image: "/lingt.png" },
                { name: "Whereoscope", description: "Whereoscope is a service designed to help parents keep track of where their kids are.", image: "/whereoscope.png" },
                { name: "Kippt", description: "Kippt is a collaborative bookmarking system for professional networks.", image: "/kippt.png" },
                { name: "OMGPOP", description: "OMGPOP is a leading developer of social games for Facebook, iPhone, and the open web.", image: "/omgpop.png" },
                { name: "Data Marketplace", description: "Data Marketplace helps people find, buy, and sell data online.", image: "/data-marketplace.png" },
                { name: "DoorDash", description: "DoorDash provides restaurant food delivery services connecting customers with local businesses.", image: "/doordash.png" },
                { name: "SHIFT", description: "SHIFT is the leading cross-network social advertising platform for brands and agencies.", image: "/shift.png" }
              ].map((exit) => (
                <div key={exit.name} className="flex space-x-4 items-start">
                  <Image src={exit.image} alt={exit.name} width={50} height={50} className="rounded-md" />
                  <div>
                    <h3 className="font-semibold">{exit.name}</h3>
                    <p className="text-sm text-gray-500">{exit.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline">Show More</Button>
            </div>
          </CardContent>
        </Card>
  
          {/* Funding Timeline */}
          <Card>
          <CardContent>
            <h2 className="text-xl font-semibold">Funding Timeline</h2>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 border rounded-lg">
                <p className="text-lg font-bold">Funding rounds</p>
                <p className="text-gray-500">2466</p>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="text-lg font-bold">Investors</p>
                <p className="text-gray-500">1</p>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="text-lg font-bold">Funds</p>
                <p className="text-gray-500">4</p>
              </div>
            </div>
            <p className="mt-4 text-gray-600">
              Y Combinator has raised 2466 rounds. Their latest funding was raised on Oct 10, 2024 from a Seed Round - Cartage round.
            </p>
            <table className="w-full mt-4 border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Announced Date</th>
                  <th className="border p-2">Transaction Name</th>
                  <th className="border p-2">Number of Investors</th>
                  <th className="border p-2">Money Raised</th>
                  <th className="border p-2">Lead Investor</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { date: "Oct 10, 2024", transaction: "Seed Round - Cartage", investors: "-", money: "3.3M", lead: "-" },
                  { date: "Oct 01, 2024", transaction: "Seed Round - Entangl", investors: "-", money: "0", lead: "-" },
                  { date: "Sep 26, 2024", transaction: "Pre Seed Round - Quetzal Labs", investors: "-", money: "500.0K", lead: "-" },
                  { date: "Sep 25, 2024", transaction: "Pre Seed Round - Pharos", investors: "-", money: "500.0K", lead: "-" }
                ].map((funding, index) => (
                  <tr key={index} className="border">
                    <td className="border p-2">{funding.date}</td>
                    <td className="border p-2">{funding.transaction}</td>
                    <td className="border p-2">{funding.investors}</td>
                    <td className="border p-2">{funding.money}</td>
                    <td className="border p-2">{funding.lead}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 text-center">
              <Button variant="outline">Show More</Button>
            </div>
          </CardContent>
        </Card>
                {/* Investors */}
                <Card>
          <CardContent >
            <h2 className="text-xl font-semibold">Investors • 1</h2>
            <p className="mt-2 text-gray-600">
              Y Combinator is funded by 1 investor(s). Y Combinator Kantor is the most recent investor.
            </p>
            <table className="w-full mt-4 border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Investor Name</th>
                  <th className="border p-2">Lead Investor</th>
                  <th className="border p-2">Funding Round</th>
                  <th className="border p-2">Money Raised</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border">
                  <td className="border p-2">Y Combinator</td>
                  <td className="border p-2">Yes</td>
                  <td className="border p-2">Pre Seed Round - Y Combinator</td>
                  <td className="border p-2">500.0K</td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Fund Raised */}
        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold">Fund Raised • 2</h2>
            <p className="mt-2 text-gray-600">
              Susa Ventures has raised a total of $590M across 6 funds, their latest being Susa Ventures Opportunities II. This fund was announced on Aug 30, 2021 and raised a total of $250M.
            </p>
            <table className="w-full mt-4 border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Announced Date</th>
                  <th className="border p-2">Fund Name</th>
                  <th className="border p-2">Money Raised</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border">
                  <td className="border p-2">May 11, 2013</td>
                  <td className="border p-2">OTPPLess</td>
                  <td className="border p-2">1.0M</td>
                </tr>
                <tr className="border">
                  <td className="border p-2">May 10, 2013</td>
                  <td className="border p-2">OTPPLess</td>
                  <td className="border p-2">1.0M</td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
  
        {/* Invest in Industries */}
        <Card>
          <CardContent >
            <h2 className="text-xl font-semibold">Invest in industries</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {["Financial Services", "Venture Capital", "Augmented Reality", "Finance", "Artificial Intelligence (AI)", "Robotics"].map((industry) => (
                <span key={industry} className="px-3 py-1 border rounded-lg text-sm text-gray-600 bg-gray-100">{industry}</span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold">Recent Activity</h2>
            <div className="mt-4 space-y-4">
              {[
                { date: "Jan 13, 2025", company: "Open", amount: "$1,520,000", round: "Pre Seed Round" },
                { date: "Jan 07, 2025", company: "Fazeshift", amount: "$4,000,000", round: "Seed Round" },
                { date: "Dec 18, 2024", company: "Hamming AI", amount: "$3,800,000", round: "Seed Round" },
                { date: "Dec 16, 2024", company: "Boom Supersonic", amount: "$100,000,000", round: "Series A" },
                { date: "Dec 06, 2024", company: "Nowadays", amount: "$2,000,000", round: "Seed Round" },
              ].map((activity, index) => (
                <div key={index} className="border-b pb-2">
                  <p className="text-gray-500 text-sm">Funding Round • {activity.date}</p>
                  <p className="text-gray-700 text-sm">{activity.company} raised {activity.amount} on {activity.date} in {activity.round}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    );
  }
  