import { prisma } from "../../../lib/prisma";
import { formatDistanceToNow } from "date-fns";
import AdminActions from "@/components/AdminActions";

export default async function AdminApplicationsPage() {
  const applications = await prisma.application.findMany({
    include: {
      job: true,
      user: true,
    },
    orderBy: { appliedAt: "desc" },
  });

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-6">
      <h1 className="text-2xl font-bold text-indigo-700 text-center">
        All Job Applications
      </h1>
      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <div className="grid gap-4">
          {applications.map((app) => (
            <div key={app.id} className="border rounded-md p-4 shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold">{app.job.title}</p>
                  <p className="text-gray-500">
                    By {app.user.name} • {app.job.company}
                  </p>
                  <p className="text-sm text-gray-400">
                    Applied{" "}
                    {formatDistanceToNow(new Date(app.appliedAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-sm font-medium ${
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

              <div className="mt-4">
                <AdminActions
                  applicationId={app.id}
                  currentStatus={
                    app.status as "PENDING" | "ACCEPTED" | "REJECTED"
                  }
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
