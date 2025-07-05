"use client";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className=" bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-6 py-10">
      <div className="max-w-4xl mx-auto text-center space-y-10">
        <Image
          src="/next.svg"
          alt="JobList logo"
          width={180}
          height={40}
          className="mx-auto dark:invert"
        />

        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
          Welcome to <span className="text-indigo-600">JobList</span>
        </h1>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Your go-to platform to discover career opportunities or post new job openings.
          Whether you are hiring or job hunting, we have got you covered.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8">
          <Link
            href="/jobs"
            className="bg-indigo-600 text-white px-6 py-3 rounded-full font-medium hover:bg-indigo-700 transition"
          >
            Find Jobs
          </Link>

          <Link
            href="/jobs/post"
            className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-full font-medium hover:bg-indigo-50 transition"
          >
            Post a Job
          </Link>
        </div>

        <footer className="pt-10 text-sm text-gray-400">
          Built by ❤️ Rohama Majeed
        </footer>
      </div>
    </div>
  );
}
