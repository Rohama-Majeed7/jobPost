"use client";

import { FormEvent } from "react";

export default function PostJobPage() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title"),
      company: formData.get("company"),
      location: formData.get("location"),
      type: formData.get("type"),
      description: formData.get("description"),
      salary: formData.get("salary"),
    };

    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert("Job Posted Successfully");
        window.location.href = "/jobs";
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen rounded-lg bg-gradient-to-br from-white to-indigo-50 dark:from-gray-900 dark:to-gray-800 px-2 py-6 flex justify-center items-start">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-5 space-y-6 border border-gray-200 dark:border-gray-800">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
          Post a Job Opportunity
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Form Group */}
          {[
            { label: "Job Title", id: "title", type: "text", required: true },
            { label: "Company", id: "company", type: "text", required: true },
            { label: "Location", id: "location", type: "text", required: true },
            {
              label: "Salary (optional)",
              id: "salary",
              type: "text",
              placeholder: "e.g., $80,000 - $100,000",
            },
          ].map(({ label, id, type, required, placeholder }) => (
            <div key={id}>
              <label
                htmlFor={id}
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                {label}
              </label>
              <input
                type={type}
                name={id}
                id={id}
                required={required}
                placeholder={placeholder}
                className="mt-1 block w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          ))}

          {/* Job Type */}
          <div>
            <label
              htmlFor="type"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              Job Type
            </label>
            <select
              name="type"
              id="type"
              required
              className="mt-1 block w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select a type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows={6}
              required
              className="mt-1 block w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2.5 rounded-xl shadow-md hover:bg-indigo-700 transition duration-200"
          >
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
}
