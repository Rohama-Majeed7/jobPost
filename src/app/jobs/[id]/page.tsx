import { prisma } from "../../../../lib/prisma";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { notFound } from "next/navigation";
import ApplyButton from "./ApplyButton";

export default async function JobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const jobId = (await params).id;

  const job = await prisma.job.findUnique({
    where: { id: jobId },
    include: { postedBy: true },
  });

  if (!job) {
    notFound();
  }

  return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-b from-white to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-8 border border-gray-200 dark:border-gray-700">
          {/* Top section */}
          <div className="mb-8">
            <Link
              href="/jobs"
              className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 font-medium mb-4 inline-block"
            >
              ← Back to Jobs
            </Link>

            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {job.title}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
              {job.company}
            </p>

            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-6">
              <span>{job.location}</span>
              <span>•</span>
              <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-md">
                {job.type}
              </span>
              {job.salary && (
                <>
                  <span>•</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                    {job.salary}
                  </span>
                </>
              )}
            </div>

            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <span>Posted by {job.postedBy.name}</span>
              <span className="mx-2">•</span>
              <span>
                {formatDistanceToNow(new Date(job.postedAt), { addSuffix: true })}
              </span>
            </div>
          </div>

          {/* Job Description */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Job Description
            </h2>
            <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
              {job.description}
            </div>
          </div>

          {/* Apply Button */}
          <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-700">
            <ApplyButton jobId={job.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
