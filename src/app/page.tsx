"use client";

import { motion } from "framer-motion";
import { FaBook, FaMagic, FaShare } from "react-icons/fa";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            <span className="font-arabic text-6xl md:text-7xl">حكاية</span>
            <br />
            <span className="text-primary-600">Hkaya.ai</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 mb-8"
          >
            Create personalized children's stories that teach values and morals
            <br />
            <span className="font-arabic text-2xl md:text-3xl">
              قم بإنشاء قصص مخصصة للأطفال تعلم القيم والأخلاق
            </span>
          </motion.p>
          <Link href="/app">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="btn-primary text-lg"
            >
              Start Creating a Story
            </motion.button>
          </Link>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="card text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaBook className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Input</h3>
              <p className="text-gray-600">
                Choose a topic or value you want to teach
              </p>
            </div>
            <div className="card text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaMagic className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Generate</h3>
              <p className="text-gray-600">
                AI creates a personalized story for your child
              </p>
            </div>
            <div className="card text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaShare className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Share</h3>
              <p className="text-gray-600">
                Read and share the story with your family
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Story Preview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Sample Story</h2>
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <div className="prose prose-lg">
              <h3 className="text-2xl font-bold mb-4">The Honest Rabbit</h3>
              <p className="text-gray-600 mb-4">
                Once upon a time, there was a little rabbit named Ahmed who
                loved playing in the garden. One day, he found a beautiful
                golden carrot that didn't belong to him...
              </p>
              <p className="text-gray-600">
                What would Ahmed do? Would he keep the carrot for himself, or
                would he do the right thing?
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Who It's For</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="card">
              <h3 className="text-xl font-bold mb-4">Parents</h3>
              <p className="text-gray-600">
                Create personalized stories that teach your children important
                values and life lessons.
              </p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold mb-4">Teachers</h3>
              <p className="text-gray-600">
                Generate engaging stories for your classroom that reinforce
                educational concepts.
              </p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold mb-4">Schools</h3>
              <p className="text-gray-600">
                Provide a library of customized stories that align with your
                curriculum and values.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Topics to Explore</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              "Emotions",
              "Faith",
              "Values",
              "Life Skills",
              "Family",
              "Friendship",
              "Responsibility",
              "Kindness",
            ].map((topic) => (
              <div key={topic} className="card text-center">
                <h3 className="text-lg font-semibold">{topic}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto mt-12 space-y-6">
            {[
              {
                q: "How does Hkaya.ai work?",
                a: "Simply input your topic or value, customize your child's details, and our AI will generate a personalized story that teaches the desired lesson.",
              },
              {
                q: "What languages are supported?",
                a: "We currently support both Arabic and English, with more languages coming soon.",
              },
              {
                q: "Can I customize the stories?",
                a: "Yes! You can customize your child's name, favorite animal, and other details to make the story more personal.",
              },
            ].map((faq, index) => (
              <div key={index} className="card">
                <h3 className="text-xl font-bold mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Hkaya.ai</h3>
              <p className="text-gray-400">
                Creating personalized stories for children
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="text-gray-400">Email: info@hkaya.ai</li>
                <li className="text-gray-400">Phone: +1 (555) 123-4567</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  Twitter
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  Facebook
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  Instagram
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} Hkaya.ai. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
