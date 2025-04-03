"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBook,
  FaMagic,
  FaShare,
  FaChild,
  FaPaw,
  FaLightbulb,
  FaRedo,
  FaLanguage,
} from "react-icons/fa";

export default function Home() {
  const [childName, setChildName] = useState("");
  const [favoriteAnimal, setFavoriteAnimal] = useState("");
  const [topic, setTopic] = useState("");
  const [story, setStory] = useState("");
  const [isArabic, setIsArabic] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const toggleLanguage = () => {
    setIsArabic(!isArabic);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const response = await fetch("/api/generateStory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          childName,
          favoriteAnimal,
          topic,
          language: isArabic ? "arabic" : "english",
        }),
      });

      if (!response.ok) throw new Error("Failed to generate story");

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setStory(data.story);
    } catch (error) {
      console.error("Error:", error);
      alert(
        isArabic
          ? "فشل إنشاء القصة. الرجاء المحاولة مرة أخرى."
          : "Failed to generate story. Please try again."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRestart = () => {
    setStory("");
  };

  const translations = {
    title: isArabic ? "حكاية" : "Story Magic",
    subtitle: isArabic
      ? "اصنع قصصًا سحرية مخصصة لطفلك في دقائق"
      : "Create magical personalized stories for your child in minutes",
    formTitle: isArabic ? "اصنع قصتك" : "Create Your Story",
    childName: isArabic ? "اسم الطفل" : "Child's Name",
    childPlaceholder: isArabic ? "أدخل اسم طفلك" : "Enter your child's name",
    animal: isArabic ? "الحيوان المفضل" : "Favorite Animal",
    animalPlaceholder: isArabic
      ? "مثل أسد، زرافة، دلفين"
      : "e.g., lion, giraffe, dolphin",
    topic: isArabic ? "الموضوع أو القيمة" : "Topic or Value",
    topicPlaceholder: isArabic
      ? "مثل الصدق، الشجاعة، اللطف"
      : "e.g., honesty, courage, kindness",
    generating: isArabic ? "جاري الإنشاء..." : "Creating Magic...",
    create: isArabic ? "اصنع القصة" : "Create Story",
    storyTitle: isArabic ? "قصتك الجميلة" : "Your Beautiful Story",
    new: isArabic ? "جديد" : "New",
    share: isArabic ? "مشاركة" : "Share",
    error: isArabic
      ? "فشل إنشاء القصة. الرجاء المحاولة مرة أخرى."
      : "Failed to generate story. Please try again.",
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Language Toggle Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all"
          >
            <FaLanguage className="text-purple-600" />
            <span>{isArabic ? "English" : "العربية"}</span>
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500 mb-4">
            <span className="font-arabic text-6xl md:text-7xl">
              {translations.title}
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {translations.subtitle}
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <AnimatePresence>
            {!story && (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100 mb-8"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <FaMagic className="text-purple-500" />
                  {translations.formTitle}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-1">
                    <label
                      htmlFor="childName"
                      className="flex items-center gap-2 text-sm font-medium text-gray-700"
                    >
                      <FaChild className="text-blue-500" />
                      {translations.childName}
                    </label>
                    <input
                      type="text"
                      id="childName"
                      value={childName}
                      onChange={(e) => setChildName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all"
                      placeholder={translations.childPlaceholder}
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="favoriteAnimal"
                      className="flex items-center gap-2 text-sm font-medium text-gray-700"
                    >
                      <FaPaw className="text-orange-500" />
                      {translations.animal}
                    </label>
                    <input
                      type="text"
                      id="favoriteAnimal"
                      value={favoriteAnimal}
                      onChange={(e) => setFavoriteAnimal(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all"
                      placeholder={translations.animalPlaceholder}
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="topic"
                      className="flex items-center gap-2 text-sm font-medium text-gray-700"
                    >
                      <FaLightbulb className="text-yellow-500" />
                      {translations.topic}
                    </label>
                    <input
                      type="text"
                      id="topic"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all"
                      placeholder={translations.topicPlaceholder}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isGenerating}
                    className={`w-full px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
                      isGenerating
                        ? "bg-purple-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 shadow-lg hover:shadow-xl text-white"
                    }`}
                  >
                    {isGenerating ? (
                      <>
                        <FaMagic className="animate-spin" />
                        {translations.generating}
                      </>
                    ) : (
                      <>
                        <FaBook />
                        {translations.create}
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {story && (
              <motion.div
                key="story"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`bg-white rounded-2xl shadow-xl p-8 border-2 ${
                  isArabic
                    ? "border-orange-200 text-right"
                    : "border-blue-200 text-left"
                }`}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {isArabic ? "قصتك الجميلة" : "Your Beautiful Story"}
                  </h2>
                  <div className="flex gap-3">
                    <button
                      onClick={handleRestart}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center gap-2 transition-colors"
                    >
                      <FaRedo />
                      {isArabic ? "جديد" : "New"}
                    </button>
                    {isArabic && (
                      <span
                        className="text-2xl text-orange-500"
                        aria-label="Arabic"
                      >
                        ع
                      </span>
                    )}
                  </div>
                </div>

                <div
                  className={`prose prose-lg max-w-none ${
                    isArabic ? "prose-rtl" : "prose-ltr"
                  }`}
                  dir={isArabic ? "rtl" : "ltr"}
                >
                  <div className="whitespace-pre-line text-gray-700">
                    {story}
                  </div>
                </div>

                <div className="mt-8 flex gap-4">
                  <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-medium flex items-center gap-2 hover:shadow-lg transition-all">
                    <FaShare />
                    {translations.share}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
