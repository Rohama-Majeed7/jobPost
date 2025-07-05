"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ApplyButton({ jobId }: { jobId: string }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleApply = async () => {
    if (!session) {
      router.push("/auth/signin");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setSuccess(false);

    try {
      const res = await fetch(`/api/jobs/${jobId}/apply`, {
        method: "POST",
      });

      if (!res.ok) {
        throw new Error("Something went wrong while applying.");
      }

      setSuccess(true);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        console.error("Unknown error", error);
      }
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <button
        disabled
        className="w-full px-6 py-3 rounded-md bg-indigo-500 text-white opacity-60 cursor-wait"
      >
        Checking session...
      </button>
    );
  }

  if (success) {
    return (
      <div className="text-center">
        <p className="text-green-600 dark:text-green-400 font-medium mb-3">
          🎉 Application submitted successfully!
        </p>
        <Link
          href="/dashboard"
          className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
        >
          View your applications →
        </Link>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={handleApply}
        disabled={loading}
        className={`w-full flex justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-6 py-3 rounded-md font-medium transition ${
          loading ? "opacity-60 cursor-wait" : ""
        }`}
      >
        {loading ? (
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        ) : (
          "Apply for this position"
        )}
      </button>

      {errorMessage && (
        <p className="mt-3 text-center text-red-600 dark:text-red-400 text-sm">
          {errorMessage}
        </p>
      )}
    </>
  );
}
