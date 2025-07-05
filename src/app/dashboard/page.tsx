import { auth } from "../../../auth";
import { prisma } from "../../../lib/prisma";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) redirect("/auth/signin");

  const [applications, postedJobs] = await Promise.all([
    prisma.application.findMany({
      where: { userId: session.user.id },
      include: { job: { include: { postedBy: true } } },
      orderBy: { appliedAt: "desc" },
    }),
    prisma.job.findMany({
      where: { postById: session.user.id },
      include: {
        _count: { select: { applications: true } },
      },
      orderBy: { postedAt: "desc" },
    }),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gradient-to-b from-slate-50 to-white min-h-screen">
      <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">
        Welcome to Your Dashboard
      </h1>

      <div className="grid gap-10 md:grid-cols-2">
        {/* Posted Jobs */}
        <section className="bg-white rounded-xl p-6 shadow-md border border-gray-100 transition hover:shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Posted Jobs</h2>
            <Link
              href="/jobs/post"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
            >
              + Post New Job
            </Link>
          </div>

          <div className="divide-y divide-gray-100">
            {postedJobs.length === 0 ? (
              <p className="p-6 text-gray-500 text-center">
                You haven’t posted any jobs yet.
              </p>
            ) : (
              postedJobs.map((job) => (
                <div key={job.id} className="py-5">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {job.title}
                      </h3>
                      <p className="text-sm text-gray-600">{job.company}</p>
                      <div className="text-xs text-gray-500 mt-1 space-x-2">
                        <span>{job.location}</span>
                        <span>•</span>
                        <span>{job.type}</span>
                        <span>•</span>
                        <span>
                          {formatDistanceToNow(new Date(job.postedAt), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                    </div>
                    <span className="h-fit px-3 py-1 text-xs font-semibold bg-indigo-100 text-indigo-700 rounded-full self-start">
                      {job._count.applications} applied
                    </span>
                  </div>
                  <div className="mt-3 text-right">
                    <Link
                      href={`/jobs/${job.id}`}
                      className="text-sm text-indigo-600 hover:underline"
                    >
                      View Job →
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Applications */}
        <section className="bg-white rounded-xl p-6 shadow-md border border-gray-100 transition hover:shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Your Applications
          </h2>

          <div className="divide-y divide-gray-100">
            {applications.length === 0 ? (
              <p className="p-6 text-gray-500 text-center">
                You haven’t applied to any jobs yet.
              </p>
            ) : (
              applications.map((app) => (
                <div key={app.id} className="py-5">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {app.job.title}
                      </h3>
                      <p className="text-sm text-gray-600">{app.job.company}</p>
                      <div className="text-xs text-gray-500 mt-1 space-x-2">
                        <span>{app.job.location}</span>
                        <span>•</span>
                        <span>{app.job.type}</span>
                        <span>•</span>
                        <span>
                          Applied{" "}
                          {formatDistanceToNow(new Date(app.appliedAt), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`h-fit px-3 py-1 text-xs font-semibold rounded-full self-start ${
                        app.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-800"
                          : app.status === "ACCEPTED"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {app.status}
                    </span>
                  </div>
                  <div className="mt-3 text-right">
                    <Link
                      href={`/jobs/${app.job.id}`}
                      className="text-sm text-indigo-600 hover:underline"
                    >
                      View Job →
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
