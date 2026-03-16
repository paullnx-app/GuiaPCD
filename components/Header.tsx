"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import OpenLeadButton from "@/components/OpenLeadButton";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="Guia PCD Despachante"
              width={200}
              height={93}
              className="h-auto w-auto max-h-16"
              priority
            />
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition">
              Home
            </Link>
            <Link href="/sobre-nos" className="text-gray-700 hover:text-blue-600 transition">
              Sobre Nós
            </Link>
            <Link href="#servicos" className="text-gray-700 hover:text-blue-600 transition">
              Serviços
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-blue-600 transition">
              Blog
            </Link>
            <OpenLeadButton source="header" as="a" className="text-gray-700 hover:text-blue-600 transition">
              Contato
            </OpenLeadButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <Link href="/" className="block py-2 text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link href="/sobre-nos" className="block py-2 text-gray-700 hover:text-blue-600">
              Sobre Nós
            </Link>
            <Link href="#servicos" className="block py-2 text-gray-700 hover:text-blue-600">
              Serviços
            </Link>
            <Link href="/blog" className="block py-2 text-gray-700 hover:text-blue-600">
              Blog
            </Link>
            <OpenLeadButton source="header" as="a" className="block py-2 text-gray-700 hover:text-blue-600">
              Contato
            </OpenLeadButton>
          </div>
        )}
      </nav>
    </header>
  );
}
