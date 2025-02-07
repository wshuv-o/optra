"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { decrypt } from "@/utils/decryptJWT";

const Settings = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState([]);
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
    profile_pic: "https://placehold.co/400"
  });

  const router = useRouter();
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

        // Populate formData with the fetched data
        setFormData(response.data);
      } catch (error) {
        alert("Error fetching company data.");
        console.error(error);
      }
    };

    fetchCompanyData();
  }, []);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChangeImage = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleImageSave = async () => {
    if (!selectedFile) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile as any);

    try {
      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setFormData((prev) => ({
        ...prev,
        profile_pic: response.data.imageUrl // Replace with the actual value
      }));
            await axios.patch(
        `http://localhost:3000/ab/${payload.sub}`,
        {profile_pic: formData},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Logo uploaded successfully!');
    } catch (error) {
      console.error('Error uploading the logo:', error);
      alert('Failed to upload logo.');
    }
  };
  const handleSave = async () => {
    const token = localStorage.getItem("authToken");

    console.log(formData)

    try {
      const updatedFields = Object.entries(formData).reduce((acc, [key, value]) => {
        if (value) acc[key] = value;
        return acc;
      }, {} as Record<string, string>);

      if (Object.keys(updatedFields).length === 0) {
        alert("No changes to update.");
        return;
      }

      await axios.patch(
        `http://localhost:3000/ab/${payload.sub}`,
        updatedFields,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Company information updated successfully.");
    } catch (error) {
      alert("Error updating company information.");
      console.error(error);
    }
  };

  const handleFileChange = (event: any) => {
    const files = Array.from(event.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };


  return (
    <div className="mx-auto max-w-270">
      <Breadcrumb pageName="Settings" />

      <div className="grid grid-cols-5 gap-8">
        {/* Left Column: Forms */}
        <div className="col-span-5 xl:col-span-3 space-y-8">
          {/* Personal Information */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Contact Information
              </h3>
            </div>
            <div className="p-7">
              <div>
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                  <label htmlFor="emailAddress" className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Email Address
                  </label>
                  <input type="email" onChange={handleInputChange} value={formData.emailAddress} id="emailAddress" name="emailAddress" placeholder="example@gmail.com" className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary" />
                  </div>

                  <div className="w-full sm:w-1/2">
                    <label htmlFor="phoneNumber" className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Phone Number
                    </label>
                    <input type="text" onChange={handleInputChange} value={formData.phoneNumber} id="phoneNumber" name="phoneNumber" placeholder="+123 345 7865" className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary" />
                  </div>
                </div>

                <div className="mb-5.5">
                  <label htmlFor="bio" className="mb-3 block text-sm font-medium text-black dark:text-white">
                    BIO
                  </label>
                  <textarea id="bio" name="bio" onChange={handleInputChange} value={formData.bio} placeholder="Write something about yourself..." className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"></textarea>
                </div>

                <div className="mb-5.5">
                  <label htmlFor="companySocials" className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Company Social Media Links
                  </label>
                  <input type="text" id="companySocials" onChange={handleInputChange} value={formData.companySocials} name="companySocials" placeholder="https://linkedin.com/company/example" className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary" />
                </div>

                <button onClick={handleSave} type="submit" className="mt-5 rounded bg-primary px-6 py-3 text-white hover:bg-primary-dark focus:outline-none">
                  Save
                </button>
              </div>
            </div>
          </div>



          {/* Company Information */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Company Information
              </h3>
            </div>
            <div className="p-7">
              <div>
                <div className="mb-5.5">
                  <label
                    htmlFor="companyName"
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    onChange={handleInputChange} value={formData.companyName}
                    placeholder="Your Company Name"
                    className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-5.5 grid grid-cols-1 sm:grid-cols-2 gap-5.5">
                  <div>
                    <label
                      htmlFor="registrationNumber"
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                    >
                      Registration Number
                    </label>
                    <input
                      type="text"
                      id="registrationNumber"
                      onChange={handleInputChange} value={formData.registrationNumber}
                      name="registrationNumber"
                      placeholder="e.g., 123456789"
                      className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="industry"
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                    >
                      Industry
                    </label>
                    <input
                      type="text"
                      id="industry"
                      onChange={handleInputChange} value={formData.industry}
                      name="industry"
                      placeholder="e.g., Technology"
                      className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-5.5 grid grid-cols-1 sm:grid-cols-2 gap-5.5">
                  <div>
                    <label
                      htmlFor="companyEmail"
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                    >
                      Company Email
                    </label>
                    <input
                      type="email"
                      id="companyEmail"
                      name="companyEmail"
                      onChange={handleInputChange} value={formData.companyEmail}
                      placeholder="company@example.com"
                      className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="companyPhone"
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                    >
                      Company Phone
                    </label>
                    <input
                      type="text"
                      id="companyPhone"
                      name="companyPhone"
                      placeholder="+1 234 567 890"
                      onChange={handleInputChange} value={formData.companyPhone}
                      className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-5.5">
                  <label
                    htmlFor="companyWebsite"
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                  >
                    Company Website
                  </label>
                  <input
                    type="url"
                    id="companyWebsite"
                    name="companyWebsite"
                    onChange={handleInputChange} value={formData.companyWebsite}
                    placeholder="https://www.yourcompany.com"
                    className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-5.5">
                  <label
                    htmlFor="address"
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                  >
                    Address
                  </label>
                  <div className="space-y-4">
                    <input
                      type="text"
                      id="street"
                      name="street"
                      onChange={handleInputChange} value={formData.street}
                      placeholder="Street Address"
                      className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <input
                        type="text"
                        id="city"
                        name="city"
                        onChange={handleInputChange} value={formData.city}
                        placeholder="City"
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      />
                      <input
                        type="text"
                        id="state"
                        name="state"
                        onChange={handleInputChange} value={formData.state}
                        placeholder="State"
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      />
                      <input
                        type="text"
                        id="zip"
                        name="zip"
                        onChange={handleInputChange} value={formData.zip}
                        placeholder="ZIP Code"
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      onChange={handleInputChange} value={formData.country}
                      placeholder="Country"
                      className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-5.5">
                  <label
                    htmlFor="companyDescription"
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                  >
                    Company Description
                  </label>
                  <textarea
                    id="companyDescription"
                    name="companyDescription"
                    rows={6}
                    onChange={handleInputChange} value={formData.companyDescription}
                    placeholder="Describe your company..."
                    className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  ></textarea>
                </div>

                <div className="flex justify-end gap-4.5">
                  <button
                    type="reset"
                    className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                  >
                    Cancel
                  </button>
                  <button
                  onClick={handleSave}
                    type="submit"
                    className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Photos */}
        <div className="col-span-5 xl:col-span-2 space-y-8">


          {/* Company Logo */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Company Logo
              </h3>
            </div>
            <div className="p-7">
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-14 w-14 rounded-full">
                  {formData.profile_pic ? (
                <img src={formData.profile_pic} width={55} height={55} alt="Company Logo" />
                  ) : (
                    <img
                      src="/images/brand/brand-04.svg"
                      width={55}
                      height={55}
                      alt="Default Logo"
                    />
                  )}
                  </div>
                </div>

                <div
                  id="LogoUpload"
                  className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5"
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChangeImage}
                    className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                  />
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M2 9.333a.667.667 0 01.667-.667h10.667a.667.667 0 010 1.333H2.667A.667.667 0 012 9.333zm0 3.333a.667.667 0 01.667-.667h10.667a.667.667 0 010 1.333H2.667A.667.667 0 012 12.667zM7.529 1.529a.667.667 0 01.942 0l3.333 3.333a.667.667 0 11-.942.942L8 2.47 5.138 5.292a.667.667 0 11-.942-.942l3.333-3.333z"
                          fill="#3C50E0"
                        />
                      </svg>
                    </span>
                    <p>
                      <span className="text-primary">Click to upload</span> or drag and drop
                    </p>
                    <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                    <p>(max, 800 X 800px)</p>
                  </div>
                </div>

                <div className="flex justify-end gap-4.5">
                  <button
                    onClick={handleImageSave}
                    type="button"
                    className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">Personal Information</h3>
      </div>
      <div className="p-7">
        <div>
          <div className="mb-5.5">
            <label htmlFor="documents" className="mb-3 block text-sm font-medium text-black dark:text-white">
              Upload Documents
            </label>
            <input
              type="file"
              id="documents"
              name="documents"
              multiple
              onChange={handleFileChange}
              className="w-full rounded border border-dashed border-primary bg-gray px-4.5 py-3 text-black focus:border-primary focus:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            />
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">You can upload multiple documents to share with investors.</p>
          </div>

          {selectedFiles.length > 0 && (
            <div className="mb-5.5">
              <h4 className="text-sm font-medium text-black dark:text-white mb-2">Selected Files</h4>
              <ul className="list-disc pl-5">
                {selectedFiles.map((file: any, index) => (
                  <li key={index} className="flex justify-between items-center text-sm text-black dark:text-white py-1">
                    {file.name}
                    <button
                      type="button"
                      onClick={() => handleFileChange(index)}
                      className="ml-3 text-red-500 hover:text-red-700"
                    >
                      ✖
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mb-5.5 flex items-center gap-3">
            <input type="checkbox" id="shareWithInvestors" name="shareWithInvestors" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
            <label htmlFor="shareWithInvestors" className="text-sm text-black dark:text-white">
              Allow investors to view uploaded documents
            </label>
          </div>

          <button onClick={handleSave} type="submit" className="mt-5 rounded bg-primary px-6 py-3 text-white hover:bg-primary-dark focus:outline-none">
            Save
          </button>
        </div>
      </div>
    </div>

        </div>
      </div>
    </div>
  );
};

export default Settings;
