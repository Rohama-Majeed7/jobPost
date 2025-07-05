import { prisma } from "../../../lib/prisma";
import Link from "next/link";

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { q, type, location } = await searchParams;

  const query = q as string | undefined;
  const searchType = type as string | undefined;
  const searchLocation = location as string | undefined;

  const jobs = await prisma.job.findMany({
    where: {
      AND: [
        query
          ? {
              OR: [
                { title: { contains: query, mode: "insensitive" } },
                { company: { contains: query, mode: "insensitive" } },
                { description: { contains: query, mode: "insensitive" } },
              ],
            }
          : {},
        searchType ? { type: searchType } : {},
        searchLocation
          ? { location: { contains: searchLocation, mode: "insensitive" } }
          : {},
      ],
    },
    orderBy: { postedAt: "desc" },
    include: { postedBy: true },
  });

  return (
    <div className="min-h-screen rounded-lg px-4 py-10 bg-gradient-to-br from-white to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Search Form */}
        <div className="bg-white dark:bg-gray-900 p-6 md:p-10 rounded-2xl shadow-md border border-gray-200 dark:border-gray-800">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Search Jobs
          </h1>
          <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="q"
              placeholder="Search job title, company or keywords"
              className="border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-lg px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <select
              name="type"
              className="border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-lg px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">All Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
            <input
              type="text"
              name="location"
              placeholder="Location"
              className="border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-lg px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="md:col-span-3 bg-indigo-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
            >
              Search
            </button>
          </form>
        </div>

        {/* Job Listings */}
        <div className="grid gap-6">
          {jobs.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No jobs found. Try different filters.
            </p>
          ) : (
            jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      {job.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 font-medium mb-2">
                      {job.company}
                    </p>
                    <div className="flex flex-wrap text-sm text-gray-500 dark:text-gray-400 mb-3 gap-4">
                      <span>{job.location}</span>
                      <span className="px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-md">
                        {job.type}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {job.description}
                    </p>
                  </div>
                  {job.salary && (
                    <span className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 whitespace-nowrap">
                      {job.salary}
                    </span>
                  )}
                </div>
                <div className="flex justify-between items-center border-t pt-4 mt-4 border-gray-100 dark:border-gray-700">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Posted by {job.postedBy?.name}
                  </span>
                  <Link
                    href={`/jobs/${job.id}`}
                    className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
