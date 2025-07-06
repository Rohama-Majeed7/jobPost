"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { logout } from "../../lib/auth";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobile = () => setMobileOpen(!mobileOpen);

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex gap-2">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-indigo-600 tracking-tight">
                JobList
              </span>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/jobs"
              className="text-gray-600 hover:text-indigo-600 transition text-sm font-medium"
            >
              Browse Jobs
            </Link>
            {session ? (
              <>
                <Link
                  href="/jobs/post"
                  className="text-gray-600 hover:text-indigo-600 transition text-sm font-medium"
                >
                  Post Job
                </Link>
                <Link
                  href="/dashboard"
                  className="text-gray-600 hover:text-indigo-600 transition text-sm font-medium"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md transition"
                >
                  Sign Out
                </button>
                <Link href="/admin" className="flex items-center space-x-2 ">
                  <span className=" font-bold p-1 md:p-2 rounded-md text-indigo-600 border-2 border-indigo-700 tracking-tight">
                    Admin
                  </span>
                </Link>
              </>
            ) : (
              <Link
                href="/auth/signin"
                className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md transition"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobile}
            className="md:hidden text-gray-600 hover:text-indigo-600 transition"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow-md px-4 py-4 space-y-3">
          <Link
            href="/jobs"
            onClick={() => setMobileOpen(false)}
            className="block text-gray-700 hover:text-indigo-600 font-medium"
          >
            Browse Jobs
          </Link>

          {session ? (
            <>
              <Link
                href="/jobs/post"
                onClick={() => setMobileOpen(false)}
                className="block text-gray-700 hover:text-indigo-600 font-medium"
              >
                Post Job
              </Link>
              <Link
                href="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="block text-gray-700 hover:text-indigo-600 font-medium"
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  logout();
                }}
                className="w-full text-left text-gray-700 hover:text-indigo-600 font-medium"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              href="/auth/signin"
              onClick={() => setMobileOpen(false)}
              className="block text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md text-sm font-medium"
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
