"use client";

import { useState } from "react";

export default function AdminActions({
  applicationId,
  currentStatus,
}: {
  applicationId: string;
  currentStatus: "PENDING" | "ACCEPTED" | "REJECTED";
}) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (newStatus: "ACCEPTED" | "REJECTED") => {
    setLoading(true);
    try {
      await fetch(`/api/admin/applications/${applicationId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      setStatus(newStatus);
    } catch (err) {
      console.log(err);
      
      alert("Failed to update status.");
    } finally {
      setLoading(false);
    }
  };

  if (status !== "PENDING") return null;

  return (
    <div className="flex space-x-2">
      <button
        onClick={() => handleUpdate("ACCEPTED")}
        disabled={loading}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded text-sm"
      >
        Approve
      </button>
      <button
        onClick={() => handleUpdate("REJECTED")}
        disabled={loading}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded text-sm"
      >
        Reject
      </button>
    </div>
  );
}
