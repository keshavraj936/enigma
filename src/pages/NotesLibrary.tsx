import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, BookOpen, Search, X, Filter, ChevronDown, ArrowLeft, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  subjects,
  years,
  semesters,
  branches,
  type Year,
  type Semester,
} from "@/lib/notesData";

const NotesLibrary = () => {
  const [selectedYear, setSelectedYear] = useState<Year | "">("");
  const [selectedSemester, setSelectedSemester] = useState<Semester | "">("");
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSubjects = useMemo(() => {
    return subjects.filter((subject) => {
      const matchYear = selectedYear === "" || subject.year === selectedYear;
      const matchSemester =
        selectedSemester === "" || subject.semester === selectedSemester;
      const matchBranch =
        selectedBranch === "" || subject.branch === selectedBranch;
      const matchSearch =
        searchQuery === "" ||
        subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subject.code.toLowerCase().includes(searchQuery.toLowerCase());
      return matchYear && matchSemester && matchBranch && matchSearch;
    });
  }, [selectedYear, selectedSemester, selectedBranch, searchQuery]);

  const resetFilters = () => {
    setSelectedYear("");
    setSelectedSemester("");
    setSelectedBranch("");
    setSearchQuery("");
  };

  const hasActiveFilters =
    selectedYear !== "" ||
    selectedSemester !== "" ||
    selectedBranch !== "" ||
    searchQuery !== "";

  // Available semesters for the selected year
  const availableSemesters = useMemo(() => {
    if (selectedYear === "") return semesters;
    const yearNum = selectedYear as Year;
    return semesters.filter(
      (s) => s === yearNum * 2 - 1 || s === yearNum * 2
    );
  }, [selectedYear]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Header */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 border-y border-white/5 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />

        {/* Radical Typographic Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <h2 className="text-[18vw] font-black text-white/[0.02] tracking-tighter leading-none">
            NOTES
          </h2>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Back Link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary font-code text-xs tracking-widest uppercase mb-12 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            BACK_TO_HOME
          </Link>

          <div className="max-w-5xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] w-12 sm:w-20 bg-primary" />
              <span className="text-primary font-code tracking-[0.3em] uppercase text-[10px] sm:text-xs">
                Resource.Archive
              </span>
            </div>

            <h1 className="text-5xl sm:text-7xl md:text-[7rem] font-black font-poppins leading-[0.85] tracking-tighter mb-8">
              NOTES <br />
              <span className="text-primary italic">LIBRARY.</span>
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl border-l-2 border-primary pl-6 font-code text-sm uppercase">
              Access subject notes filtered by year, semester and branch.
              Download PDFs for offline study.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 border-y border-white/10 sticky top-16 z-40 bg-background/95 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            {/* Filter Label */}
            <div className="flex items-center gap-3 shrink-0">
              <Filter className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-code text-primary tracking-[0.3em] uppercase">
                FILTER.PARAMS
              </span>
            </div>

            {/* Filter Controls */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 flex-1">
              {/* Search */}
              <div className="relative flex-1 min-w-[200px] max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="text"
                  placeholder="SEARCH SUBJECTS..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 font-code text-xs tracking-wider uppercase pl-10 pr-4 py-3 focus:outline-none focus:border-primary transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-primary transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Year Select */}
              <div className="relative">
                <select
                  value={selectedYear}
                  onChange={(e) => {
                    const v = e.target.value;
                    setSelectedYear(v === "" ? "" : (Number(v) as Year));
                    setSelectedSemester("");
                  }}
                  className="appearance-none bg-white/5 border border-white/10 text-white font-code text-xs tracking-wider uppercase px-4 py-3 pr-10 focus:outline-none focus:border-primary transition-colors cursor-pointer min-w-[140px]"
                >
                  <option value="" className="bg-[#121212]">ALL YEARS</option>
                  {years.map((y) => (
                    <option key={y} value={y} className="bg-[#121212]">
                      YEAR {y}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
              </div>

              {/* Semester Select */}
              <div className="relative">
                <select
                  value={selectedSemester}
                  onChange={(e) => {
                    const v = e.target.value;
                    setSelectedSemester(
                      v === "" ? "" : (Number(v) as Semester)
                    );
                  }}
                  className="appearance-none bg-white/5 border border-white/10 text-white font-code text-xs tracking-wider uppercase px-4 py-3 pr-10 focus:outline-none focus:border-primary transition-colors cursor-pointer min-w-[160px]"
                >
                  <option value="" className="bg-[#121212]">ALL SEMESTERS</option>
                  {availableSemesters.map((s) => (
                    <option key={s} value={s} className="bg-[#121212]">
                      SEM {s}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
              </div>

              {/* Branch Select */}
              <div className="relative">
                <select
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className="appearance-none bg-white/5 border border-white/10 text-white font-code text-xs tracking-wider uppercase px-4 py-3 pr-10 focus:outline-none focus:border-primary transition-colors cursor-pointer min-w-[150px]"
                >
                  <option value="" className="bg-[#121212]">ALL BRANCHES</option>
                  {branches.map((b) => (
                    <option key={b} value={b} className="bg-[#121212]">
                      {b}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
              </div>

              {/* Reset */}
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-2 bg-primary text-black font-code text-xs font-bold tracking-widest uppercase px-5 py-3 hover:bg-white transition-colors"
                >
                  <X className="w-3 h-3" />
                  RESET
                </button>
              )}
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 flex items-center gap-4">
            <span className="font-code text-[10px] text-white/30 tracking-widest uppercase">
              RESULTS: {filteredSubjects.length} / {subjects.length}
            </span>
            {hasActiveFilters && (
              <div className="flex gap-2 flex-wrap">
                {selectedYear !== "" && (
                  <span className="font-code text-[9px] bg-primary/10 text-primary px-2 py-0.5 tracking-wider">
                    YEAR_{selectedYear}
                  </span>
                )}
                {selectedSemester !== "" && (
                  <span className="font-code text-[9px] bg-primary/10 text-primary px-2 py-0.5 tracking-wider">
                    SEM_{selectedSemester}
                  </span>
                )}
                {selectedBranch !== "" && (
                  <span className="font-code text-[9px] bg-primary/10 text-primary px-2 py-0.5 tracking-wider">
                    {selectedBranch}
                  </span>
                )}
                {searchQuery !== "" && (
                  <span className="font-code text-[9px] bg-primary/10 text-primary px-2 py-0.5 tracking-wider">
                    QUERY: "{searchQuery}"
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Subject Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredSubjects.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-white/10 border border-white/10"
            >
              <AnimatePresence mode="popLayout">
                {filteredSubjects.map((subject, index) => (
                  <motion.div
                    key={subject.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                    className="bg-background p-8 group relative overflow-hidden flex flex-col"
                  >
                    {/* Index Label */}
                    <div className="absolute top-3 right-3 font-code text-[8px] text-white/10 select-none">
                      DOC_{String(index + 1).padStart(3, "0")}
                    </div>

                    {/* Icon */}
                    <div className="mb-6 w-12 h-12 bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-colors">
                      <FileText className="w-5 h-5 text-primary group-hover:text-black transition-colors" />
                    </div>

                    {/* Meta Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      <span className="font-code text-[9px] bg-white/5 text-white/40 px-2 py-0.5 tracking-wider border border-white/5">
                        Y{subject.year}
                      </span>
                      <span className="font-code text-[9px] bg-white/5 text-white/40 px-2 py-0.5 tracking-wider border border-white/5">
                        S{subject.semester}
                      </span>
                      <span className="font-code text-[9px] bg-primary/10 text-primary px-2 py-0.5 tracking-wider border border-primary/20">
                        {subject.branch}
                      </span>
                    </div>

                    {/* Subject Info */}
                    <div className="flex-1">
                      <span className="font-code text-[10px] text-primary/60 tracking-widest block mb-2">
                        {subject.code}
                      </span>
                      <h3 className="text-lg font-black font-poppins tracking-tight uppercase leading-tight mb-3 group-hover:text-primary transition-colors">
                        {subject.name}
                      </h3>
                      {subject.description && (
                        <p className="text-muted-foreground font-code text-[10px] leading-relaxed line-clamp-3 opacity-50">
                          {subject.description}
                        </p>
                      )}
                    </div>

                    {/* Download Button */}
                    <a
                      href={subject.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="mt-6 flex items-center justify-center gap-2 w-full bg-white/5 border border-white/10 text-white font-code text-[10px] font-bold tracking-widest uppercase px-4 py-3 hover:bg-primary hover:text-black hover:border-primary transition-all group/btn"
                    >
                      <Download className="w-3.5 h-3.5" />
                      DOWNLOAD_PDF
                    </a>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            /* Empty State */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border border-white/10 p-16 flex flex-col items-center justify-center text-center"
            >
              <div className="w-20 h-20 bg-white/5 border border-white/10 flex items-center justify-center mb-8">
                <BookOpen className="w-8 h-8 text-white/20" />
              </div>
              <h3 className="text-2xl font-black font-poppins tracking-tight uppercase mb-4">
                NO_RESULTS_FOUND
              </h3>
              <p className="text-muted-foreground font-code text-sm max-w-md mb-8">
                No subjects match your current filter configuration. Try
                adjusting the parameters.
              </p>
              <button
                onClick={resetFilters}
                className="flex items-center gap-2 bg-primary text-black font-code text-xs font-bold tracking-widest uppercase px-8 py-3 hover:bg-white transition-colors"
              >
                <X className="w-3 h-3" />
                CLEAR_ALL_FILTERS
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-t border-white/10 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10">
            {[
              { label: "TOTAL_SUBJECTS", value: subjects.length },
              { label: "BRANCHES", value: branches.length },
              { label: "YEARS_COVERED", value: years.length },
              { label: "SEMESTERS", value: semesters.length },
            ].map((stat, i) => (
              <div key={i} className="bg-background p-8 text-center">
                <div className="text-4xl font-black font-poppins text-primary mb-2">
                  {stat.value}
                </div>
                <div className="font-code text-[9px] text-white/30 tracking-widest uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NotesLibrary;
