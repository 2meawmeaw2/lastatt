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

export default function StoryGenerator() {
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
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Language Toggle */}
        <div className="flex justify-end mb-8">
          <button onClick={toggleLanguage} className="language-toggle">
            <FaLanguage className="text-lg" />
            <span>{isArabic ? "English" : "العربية"}</span>
          </button>
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            <span className={`${isArabic ? 'text-6xl md:text-7xl' : 'text-primary-600'}`}>
              {translations.title}
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto fade-in">
            {translations.subtitle}
          </p>
        </motion.div>

        {/* Form or Story Display */}
        <AnimatePresence mode="wait">
          {!story ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="story-card mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <FaMagic className="text-primary-500" />
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
                    className="input-field"
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
                    className="input-field"
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
                    className="input-field"
                    placeholder={translations.topicPlaceholder}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isGenerating}
                  className={`btn-primary ${isGenerating ? 'opacity-75 cursor-not-allowed' : ''}`}
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
          ) : (
            <motion.div
              key="story"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`story-card ${isArabic ? 'story-card-arabic' : 'story-card-english'}`}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {translations.storyTitle}
                </h2>
                <div className="flex gap-3">
                  <button
                    onClick={handleRestart}
                    className="btn-secondary"
                  >
                    <FaRedo />
                    {translations.new}
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
                className={`prose prose-lg max-w-none ${isArabic ? 'prose-rtl' : 'prose-ltr'}`}
                dir={isArabic ? "rtl" : "ltr"}
              >
                <div className="whitespace-pre-line text-gray-700">
                  {story}
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <button className="btn-primary">
                  <FaShare />
                  {translations.share}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
