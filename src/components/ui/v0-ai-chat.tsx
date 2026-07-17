"use client";

import Image from "next/image";
import {
  ArrowUpIcon,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Code2,
  Copy,
  Download,
  ExternalLink,
  Eye,
  FileCode2,
  FileJson,
  FileText,
  Folder,
  ImageIcon,
  Laptop,
  MessageSquare,
  Mic,
  Monitor,
  Paperclip,
  PlusCircle,
  RefreshCw,
  RotateCcw,
  Smartphone,
  Tablet,
  X,
  Palette,
  Type,
  Check,
  Loader2,
  Sparkles,
  LayoutGrid,
  Upload,
  SkipForward,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type ClipboardEvent,
  type DragEvent,
  type KeyboardEvent,
  type RefObject,
} from "react";

import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { VELARA_SAMPLE_HTML } from "@/lib/velara-sample";
import { TEMPLATE_KEYWORDS, TEMPLATE_PROMPTS } from "@/lib/template-prompts";

function detectIndustryForEnhance(prompt: string): string {
  const p = prompt.toLowerCase()
  if (p.match(/restaurant|cafe|food|dhaba|biryani|hotel|dining|eat/)) return 'restaurant'
  if (p.match(/salon|hair|beauty|spa|nail|parlour|makeup/)) return 'salon'
  if (p.match(/clinic|doctor|hospital|medical|dental|health/)) return 'medical'
  if (p.match(/gym|fitness|yoga|workout|training/)) return 'fitness'
  if (p.match(/saas|app|startup|software|tech|platform/)) return 'saas'
  if (p.match(/law|legal|advocate|lawyer|firm/)) return 'legal'
  if (p.match(/school|coaching|tutor|education|institute/)) return 'education'
  if (p.match(/portfolio|agency|freelance|creative/)) return 'portfolio'
  if (p.match(/real estate|property|realty|housing/)) return 'realestate'
  return 'general'
}

type Question = {
  field: string
  question: string
  placeholder: string
  optional?: boolean
  options?: string[]
}

const QUESTIONS: Record<string, Question[]> = {
  restaurant: [
    { field: 'businessName',
      question: "What's your restaurant name?",
      placeholder: "e.g. Dakshin, Spice Garden" },
    { field: 'cuisine',
      question: "What cuisine and vibe?",
      placeholder: "e.g. South Indian, casual family style",
      options: [
        "South Indian, casual style",
        "North Indian Dhaba & Grill",
        "Fine Dining / Michelin Vibe",
        "Italian Café & Pizza Bistro",
        "Continental / Modern Fusion"
      ] },
    { field: 'location',
      question: "Which city and area?",
      placeholder: "e.g. Banjara Hills, Hyderabad",
      options: [
        "Banjara Hills, Hyderabad",
        "Jubilee Hills, Hyderabad",
        "Gachibowli, Hyderabad",
        "Kondapur, Hyderabad"
      ] },
    { field: 'colors',
      question: "Brand colors? (skip to auto-pick)",
      placeholder: "e.g. saffron and deep green",
      optional: true,
      options: [
        "Warm saffron and deep forest green",
        "Elegant black and premium gold",
        "Minimalist cream, bronze, and charcoal",
        "Bright terracotta, teal, and beige"
      ] },
    { field: 'specialItems',
      question: "3-4 signature dishes to feature?",
      placeholder: "e.g. Biryani, Pesarattu, Gongura Mutton",
      optional: true }
  ],
  salon: [
    { field: 'businessName',
      question: "What's your salon name?",
      placeholder: "e.g. Lumière, Glam Studio" },
    { field: 'services',
      question: "Main services offered?",
      placeholder: "e.g. haircuts, color, keratin, bridal",
      options: [
        "Haircuts, styling, and creative color",
        "Bridal makeup, skin treatments, and nails",
        "Premium male grooming and beard styling",
        "All-in-one luxury salon & day spa experience"
      ] },
    { field: 'targetClient',
      question: "Target clients and price range?",
      placeholder: "e.g. women, luxury pricing",
      options: [
        "Premium / Luxury high-end clientele",
        "Trendy / Gen-Z affordable luxury",
        "Family-friendly casual pricing",
        "Strictly male grooming / premium barbershop"
      ] },
    { field: 'colors',
      question: "Brand colors or aesthetic?",
      placeholder: "e.g. rose gold, black minimal",
      optional: true,
      options: [
        "Rose gold, blush pink, and warm white",
        "Sleek minimal black, white, and chrome",
        "Warm oak wood, gold, and hunter green",
        "Clean lavender, beige, and matte silver"
      ] },
    { field: 'location',
      question: "Which city and area?",
      placeholder: "e.g. Jubilee Hills, Hyderabad",
      options: [
        "Jubilee Hills, Hyderabad",
        "Banjara Hills, Hyderabad",
        "Gachibowli, Hyderabad",
        "Kondapur, Hyderabad"
      ] }
  ],
  medical: [
    { field: 'businessName',
      question: "What's your clinic name?",
      placeholder: "e.g. Smile Dental, HealthFirst Clinic" },
    { field: 'specialization',
      question: "Specialization?",
      placeholder: "e.g. dental, derma, general medicine",
      options: [
        "Premium Dental & Orthodontic Care",
        "Dermatology, Aesthetics & Laser Clinic",
        "Pediatrics & Family Medicine Clinic",
        "General Health & Wellness Practice"
      ] },
    { field: 'doctorName',
      question: "Lead doctor's name and qualifications?",
      placeholder: "e.g. Dr. Ramesh Kumar MBBS MD",
      optional: true },
    { field: 'location',
      question: "Which city and area?",
      placeholder: "e.g. Kondapur, Hyderabad",
      options: [
        "Kondapur, Hyderabad",
        "Gachibowli, Hyderabad",
        "Jubilee Hills, Hyderabad",
        "Madhapur, Hyderabad"
      ] },
    { field: 'colors',
      question: "Color preference?",
      placeholder: "e.g. blue and white, or skip for auto",
      optional: true,
      options: [
        "Clinical clean teal and white",
        "Soothing royal blue, beige, and gray",
        "Luxury rose gold, peach, and white",
        "Minimal slate gray and light olive"
      ] }
  ],
  fitness: [
    { field: 'businessName',
      question: "Gym or studio name?",
      placeholder: "e.g. IronEdge, FitZone" },
    { field: 'services',
      question: "What do you offer?",
      placeholder: "e.g. gym, yoga, crossfit, personal training",
      options: [
        "Full cardio & strength gym with steam",
        "Yoga, pilates, and mindfulness classes",
        "CrossFit, boxing, and high-intensity HIIT",
        "Bespoke personal training & nutrition coaching"
      ] },
    { field: 'location',
      question: "Which city and area?",
      placeholder: "e.g. Madhapur, Hyderabad",
      options: [
        "Madhapur, Hyderabad",
        "Gachibowli, Hyderabad",
        "Kondapur, Hyderabad",
        "Jubilee Hills, Hyderabad"
      ] },
    { field: 'colors',
      question: "Brand colors?",
      placeholder: "e.g. black and electric green",
      optional: true,
      options: [
        "Gritty matte black and electric yellow",
        "Clean minimal white, concrete gray, and teal",
        "Zen light wood, sand beige, and sage green",
        "High-energy neon orange and dark navy"
      ] }
  ],
  saas: [
    { field: 'businessName',
      question: "Product name?",
      placeholder: "e.g. Nexus AI, FlowDesk" },
    { field: 'description',
      question: "One sentence — what it does and who for?",
      placeholder: "e.g. AI tool that automates invoicing for freelancers" },
    { field: 'keyFeatures',
      question: "3 main features or benefits?",
      placeholder: "e.g. automated invoicing, payment tracking, reports" },
    { field: 'pricing',
      question: "Pricing tiers? (skip if none yet)",
      placeholder: "e.g. Free ₹0, Pro ₹499/mo, Team ₹999/mo",
      optional: true },
    { field: 'colors',
      question: "Color style?",
      placeholder: "e.g. dark purple, clean minimal, bold colorful",
      optional: true,
      options: [
        "Cyberpunk dark violet, neon pink, and black",
        "Clean modern corporate blue, white, and gray",
        "Eco-friendly warm forest green, beige, and cream",
        "High-contrast canary yellow and dark carbon"
      ] }
  ],
  legal: [
    { field: 'businessName',
      question: "Firm name?",
      placeholder: "e.g. Sharma & Associates" },
    { field: 'practiceAreas',
      question: "Practice areas?",
      placeholder: "e.g. corporate law, family law, criminal defense",
      options: [
        "Corporate, Startup & intellectual property law",
        "Criminal defense, civil litigation & appeals",
        "Family law, estate planning & real estate",
        "All-practice comprehensive legal advice"
      ] },
    { field: 'lawyerName',
      question: "Lead attorney name?",
      placeholder: "e.g. Advocate Priya Sharma LLB LLM",
      optional: true },
    { field: 'location',
      question: "Which city?",
      placeholder: "e.g. Hyderabad",
      options: [
        "Hyderabad",
        "Delhi NCR",
        "Mumbai",
        "Bengaluru"
      ] }
  ],
  education: [
    { field: 'businessName',
      question: "Institute or coaching name?",
      placeholder: "e.g. Sunrise Coaching, BrightMinds Academy" },
    { field: 'courses',
      question: "What do you teach?",
      placeholder: "e.g. JEE, NEET, Class 10-12 Maths, English",
      options: [
        "IIT-JEE & NEET entrance preparation",
        "CBSE/ICSE school coaching (Class 6-10)",
        "Spoken English, soft skills & IELTS prep",
        "Coding, STEM & robotics classes for kids"
      ] },
    { field: 'targetStudents',
      question: "Target students?",
      placeholder: "e.g. Class 11-12, JEE aspirants",
      options: [
        "Class 11-12 board and competitive aspirants",
        "High school students (Class 6-10)",
        "Working professionals and adults",
        "Young kids aged 6-14"
      ] },
    { field: 'location',
      question: "Which city and area?",
      placeholder: "e.g. Dilsukhnagar, Hyderabad",
      options: [
        "Dilsukhnagar, Hyderabad",
        "Kukatpally, Hyderabad",
        "SR Nagar, Hyderabad",
        "Madhapur, Hyderabad"
      ] },
    { field: 'colors',
      question: "Color preference?",
      placeholder: "e.g. blue and yellow, or skip",
      optional: true,
      options: [
        "Classic trust royal blue and white",
        "Energetic yellow, navy, and slate",
        "Creative teal, orange, and cream",
        "Minimalist beige and charcoal forest"
      ] }
  ],
  portfolio: [
    { field: 'businessName',
      question: "Your name or agency name?",
      placeholder: "e.g. Uttej Jinnaram, Pixel Studio" },
    { field: 'services',
      question: "What do you do?",
      placeholder: "e.g. UI/UX design, web development, branding",
      options: [
        "Full-stack Web and App Development",
        "Creative UI/UX & Product Design",
        "Graphic design, brand identity & packaging",
        "Freelance photography & videography"
      ] },
    { field: 'description',
      question: "One line about yourself or agency?",
      placeholder: "e.g. Building digital products for startups" },
    { field: 'colors',
      question: "Personal brand colors?",
      placeholder: "e.g. black and purple, minimal white",
      optional: true,
      options: [
        "Dark mode: Charcoal black and neon purple",
        "Light mode: Paper white and ink blue",
        "Warm mode: Terracotta, sage, and oatmeal",
        "High contrast: Bright yellow, carbon, and white"
      ] }
  ],
  general: [
    { field: 'businessName',
      question: "Business name?",
      placeholder: "e.g. Acme Solutions" },
    { field: 'description',
      question: "What does your business do?",
      placeholder: "e.g. we sell handmade jewellery online" },
    { field: 'location',
      question: "Which city?",
      placeholder: "e.g. Hyderabad",
      options: [
        "Hyderabad",
        "Bengaluru",
        "Mumbai",
        "Delhi NCR"
      ] },
    { field: 'colors',
      question: "Brand colors?",
      placeholder: "e.g. gold and black, or skip for auto",
      optional: true,
      options: [
        "Luxury black and bright gold",
        "Clean minimal white, gray, and blue",
        "Energetic orange, purple, and beige",
        "Natural forest green, wood, and white"
      ] },
    { field: 'tone',
      question: "Website vibe?",
      placeholder: "e.g. luxury, friendly, minimal, bold",
      optional: true,
      options: [
        "Ultra Luxury & Premium",
        "Minimal & Ultra Clean",
        "High-Energy, Bold & Modern",
        "Warm, Friendly & Organic"
      ] }
  ]
}

function buildEnhancedPrompt(
  original: string,
  industry: string,
  answers: Record<string, string>
): string {
  const parts = [original]

  if (answers.businessName) 
    parts.push(`Business name: ${answers.businessName}`)
  if (answers.cuisine) 
    parts.push(`Cuisine and vibe: ${answers.cuisine}`)
  if (answers.services) 
    parts.push(`Services: ${answers.services}`)
  if (answers.description) 
    parts.push(`About: ${answers.description}`)
  if (answers.specialization) 
    parts.push(`Specialization: ${answers.specialization}`)
  if (answers.doctorName) 
    parts.push(`Doctor: ${answers.doctorName}`)
  if (answers.lawyerName) 
    parts.push(`Attorney: ${answers.lawyerName}`)
  if (answers.practiceAreas) 
    parts.push(`Practice areas: ${answers.practiceAreas}`)
  if (answers.courses) 
    parts.push(`Courses: ${answers.courses}`)
  if (answers.keyFeatures) 
    parts.push(`Key features: ${answers.keyFeatures}`)
  if (answers.pricing) 
    parts.push(`Pricing: ${answers.pricing}`)
  if (answers.specialItems) 
    parts.push(`Signature items: ${answers.specialItems}`)
  if (answers.targetClient) 
    parts.push(`Target clients: ${answers.targetClient}`)
  if (answers.targetStudents) 
    parts.push(`Target students: ${answers.targetStudents}`)
  if (answers.location) 
    parts.push(`Location: ${answers.location}`)
  if (answers.colors) 
    parts.push(`Brand colors: ${answers.colors}`)
  if (answers.tone) 
    parts.push(`Tone: ${answers.tone}`)

  parts.push(
    `Industry: ${industry}`,
    `Use the actual business name everywhere.`,
    `Write real specific content for this exact business.`,
    `Make it look premium and professional.`
  )

  return parts.filter(Boolean).join('. ')
}

export function EnhanceModal({
  isOpen,
  onClose,
  originalPrompt,
  onEnhanced
}: {
  isOpen: boolean
  onClose: () => void
  originalPrompt: string
  onEnhanced: (enhancedPrompt: string) => void
}) {
  const industry = detectIndustryForEnhance(originalPrompt)
  const questions = QUESTIONS[industry] || QUESTIONS.general
  
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string,string>>({})
  const [currentInput, setCurrentInput] = useState('')
  const [done, setDone] = useState(false)
  const [enhancedPrompt, setEnhancedPrompt] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setStep(0)
      setAnswers({})
      setCurrentInput('')
      setDone(false)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  function handleNext() {
    const currentQ = questions[step]
    const updatedAnswers = {
      ...answers,
      [currentQ.field]: currentInput
    }
    setAnswers(updatedAnswers)
    setCurrentInput('')

    if (step + 1 >= questions.length) {
      // Build enhanced prompt
      const enhanced = buildEnhancedPrompt(
        originalPrompt,
        industry,
        updatedAnswers
      )
      setEnhancedPrompt(enhanced)
      setDone(true)
    } else {
      setStep(step + 1)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }

  function handleOptionSelect(optionVal: string) {
    const currentQ = questions[step]
    const updatedAnswers = {
      ...answers,
      [currentQ.field]: optionVal
    }
    setAnswers(updatedAnswers)
    setCurrentInput('')

    if (step + 1 >= questions.length) {
      const enhanced = buildEnhancedPrompt(
        originalPrompt,
        industry,
        updatedAnswers
      )
      setEnhancedPrompt(enhanced)
      setDone(true)
    } else {
      setStep(step + 1)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }

  function handleSkip() {
    const currentQ = questions[step]
    const updatedAnswers = { ...answers, [currentQ.field]: '' }
    setAnswers(updatedAnswers)
    setCurrentInput('')

    if (step + 1 >= questions.length) {
      const enhanced = buildEnhancedPrompt(
        originalPrompt,
        industry,
        updatedAnswers
      )
      setEnhancedPrompt(enhanced)
      setDone(true)
    } else {
      setStep(step + 1)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (currentInput.trim() || questions[step].optional) {
        handleNext()
      }
    }
  }

  if (!isOpen) return null

  const progress = done ? 100 : (step / questions.length) * 100
  const industryLabel = {
    restaurant: '🍽️ Restaurant',
    salon: '💇 Salon',
    medical: '🏥 Medical',
    fitness: '💪 Fitness',
    saas: '⚡ SaaS',
    legal: '⚖️ Legal',
    education: '📚 Education',
    portfolio: '🎨 Portfolio',
    general: '🌐 General'
  }[industry] || '🌐 Website'

  return (
    <div className="enhance-overlay" onClick={onClose}>
      <div
        className="enhance-modal"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="enhance-header">
          <div>
            <span className="enhance-title">Enhance Prompt ✦</span>
            <span className="enhance-industry">{industryLabel}</span>
          </div>
          <button className="enhance-close" onClick={onClose}>×</button>
        </div>

        {/* Progress bar */}
        <div className="enhance-progress-track">
          <div
            className="enhance-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        {!done ? (
          <>
            {/* Question */}
            <div className="enhance-body">
              <div className="enhance-step-label">
                Question {step + 1} of {questions.length}
              </div>
              <div className="enhance-question">
                {questions[step].question}
              </div>
              {questions[step].optional && (
                <div className="enhance-optional">optional</div>
              )}
              
              {questions[step].options ? (
                <div className="enhance-options-list">
                  {questions[step].options.map((opt, idx) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleOptionSelect(opt)}
                      className="enhance-option-row"
                    >
                      <span className="enhance-option-num">{idx + 1}</span>
                      <span className="enhance-option-text">{opt}</span>
                    </button>
                  ))}
                  <div className="enhance-option-custom">
                    <span className="enhance-option-custom-icon">✎</span>
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="Something else"
                      value={currentInput}
                      onChange={e => setCurrentInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="enhance-option-custom-input"
                    />
                    {currentInput.trim() && (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="text-xs text-white bg-purple-600 hover:bg-purple-500 font-semibold px-3 py-1.5 rounded-lg shrink-0 ml-2"
                      >
                        {step + 1 >= questions.length ? 'Done' : 'Next'}
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <input
                  ref={inputRef}
                  type="text"
                  value={currentInput}
                  onChange={e => setCurrentInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={questions[step].placeholder}
                  className="enhance-input"
                />
              )}
            </div>

            {/* Actions (only visible when not presenting multiple choice, or if the question is optional so skip makes sense) */}
            {(!questions[step].options || questions[step].optional) && (
              <div className="enhance-actions">
                <button
                  className="enhance-skip"
                  onClick={handleSkip}
                >
                  Skip
                </button>
                {!questions[step].options && (
                  <button
                    className="enhance-next"
                    onClick={handleNext}
                    disabled={
                      !currentInput.trim() && 
                      !questions[step].optional
                    }
                  >
                    {step + 1 >= questions.length
                      ? 'Build Prompt →'
                      : 'Next →'}
                  </button>
                )}
              </div>
            )}
          </>
        ) : (
          <>
            {/* Done state */}
            <div className="enhance-body">
              <div className="enhance-done-label">
                ✓ Enhanced prompt ready
              </div>
              <div className="enhance-prompt-preview">
                {enhancedPrompt}
              </div>
            </div>
            <div className="enhance-actions">
              <button
                className="enhance-skip"
                onClick={() => { setDone(false); setStep(0); }}
              >
                Start Over
              </button>
              <button
                className="enhance-next"
                onClick={() => {
                  onEnhanced(enhancedPrompt)
                  onClose()
                }}
              >
                Use This Prompt →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

async function resizeImageToBase64(file: File, maxWidth = 800, maxHeight = 800): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const img = new globalThis.Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Could not get canvas context"));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
        resolve(dataUrl);
      };
      img.onerror = (err) => reject(err);
      img.src = readerEvent.target?.result as string;
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Sanitize AI-generated HTML before rendering in the sandboxed iframe.
 *
 * The iframe uses sandbox="allow-scripts" (no allow-same-origin), so
 * generated scripts cannot access parent cookies, localStorage, or DOM.
 * These additional checks strip patterns that could cause annoyance,
 * resource exhaustion, or unexpected behavior even within the sandbox:
 *
 * - meta http-equiv="refresh" → redirect loops
 * - window.open / window.location → popups / redirects
 * - location.href / location.replace → navigation hijack
 * - Obvious infinite loops → CPU exhaustion in the iframe
 * - Excessively large output → DoS via memory
 */
function sanitizeGeneratedHtml(html: string): string {
  if (!html) return html;

  // Cap size — no need to render 500k lines
  const MAX_HTML_BYTES = 500_000;
  if (html.length > MAX_HTML_BYTES) {
    html = html.slice(0, MAX_HTML_BYTES) + "\n<!-- [Oni] Output was truncated for safety -->";
  }

  // Strip meta refresh redirects
  html = html.replace(/<meta[^>]+http-equiv\s*=\s*["']?refresh["']?[^>]*>/gi, "<!-- [Oni] meta-refresh removed -->")

  // Strip window.open calls
  html = html.replace(/\bwindow\.open\s*\(/gi, "void(/*window.open*/");

  // Strip location navigation (covers location.href=, location.replace(, location.assign()
  html = html.replace(/\blocation\s*\.\s*(href|replace|assign)\s*[=(]/gi, "void(/*location.");

  // Strip obvious infinite loops — while(true) and while(1)
  html = html.replace(/\bwhile\s*\(\s*(true|1)\s*\)\s*\{/gi, "if(false){");

  // Strip setInterval with very short delays (< 50ms) which can spam events
  html = html.replace(/setInterval\s*\([^,]+,\s*([0-9]+)\s*\)/g, (match, ms) => {
    return parseInt(ms, 10) < 50 ? "void(/*setInterval throttled*/" : match;
  });

  return html;
}

/**
 * Parse <ONI_FILES> multi-file output into a map of filename → content.
 * Returns null if not an ONI_FILES response.
 */
function parseOniFiles(content: string): Record<string, string> | null {
  if (!content.includes("<ONI_FILES>") && !content.includes("&lt;ONI_FILES&gt;")) return null;
  const normalized = content.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
  const filesBlock = normalized.match(/<ONI_FILES>([\s\S]*?)<\/ONI_FILES>/i);
  if (!filesBlock) return null;
  const files: Record<string, string> = {};
  const fileRegex = /<FILE\s+name="([^"]+)"\s*>([\s\S]*?)<\/FILE>/gi;
  let match;
  while ((match = fileRegex.exec(filesBlock[1])) !== null) {
    files[match[1].trim()] = match[2].trim();
  }
  return Object.keys(files).length > 0 ? files : null;
}

/**
 * Assemble separate HTML/CSS/JS files into a single inline HTML string for iframe srcDoc.
 */
function assembleFilesForPreview(files: Record<string, string>): string {
  const html = files["index.html"] || "";
  const css = files["styles.css"] || "";
  const js = files["scripts.js"] || "";
  // Strip external <link> and <script src> from html, inject inline instead
  let assembled = html
    .replace(/<link[^>]+rel=["']stylesheet["'][^>]*>/gi, "")
    .replace(/<script[^>]+src=["'][^"']*["'][^>]*><\/script>/gi, "");
  // Inject CSS into <head>
  if (css) {
    assembled = assembled.replace("</head>", `<style>\n${css}\n</style>\n</head>`);
  }
  // Inject JS before </body>
  if (js) {
    assembled = assembled.replace("</body>", `<script>\n${js}\n</script>\n</body>`);
  }
  return assembled;
}

function extractHtmlFromContent(content: string): { html: string; cleanText: string } {
  // 0. ONI_FILES multi-file format (three-stage pipeline output)
  const parsedFiles = parseOniFiles(content);
  if (parsedFiles) {
    const assembledHtml = assembleFilesForPreview(parsedFiles);
    const cleanText = content
      .replace(/<ONI_FILES>[\s\S]*?<\/ONI_FILES>/gi, "")
      .replace(/&lt;ONI_FILES&gt;[\s\S]*?&lt;\/ONI_FILES&gt;/gi, "")
      .trim();
    return { html: assembledHtml, cleanText };
  }

  // 1. Case-insensitive standard ONI_CODE tags (handles HTML entities too)
  const openRegex = /(?:<|&lt;)oni_code(?:\s+[^>]*)?(?:>|&gt;)/i;
  const closeRegex = /(?:<|&lt;)\/oni_code(?:>|&gt;)/i;

  const openMatch = content.match(openRegex);
  if (openMatch && openMatch.index !== undefined) {
    const startIndex = openMatch.index + openMatch[0].length;
    const closeMatch = content.match(closeRegex);
    let html = "";
    
    if (closeMatch && closeMatch.index !== undefined) {
      html = content.slice(startIndex, closeMatch.index).trim();
    } else {
      html = content.slice(startIndex).trim();
    }

    // Decode basic HTML entities if necessary
    if (html.includes("&lt;") || html.includes("&gt;")) {
      html = html
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"');
    }

    const cleanText = content
      .replace(new RegExp(openRegex.source + "[\\s\\S]*?" + closeRegex.source, "gi"), "")
      .replace(new RegExp(openRegex.source + "[\\s\\S]*", "gi"), "")
      .trim();
    return { html, cleanText };
  }

  // 2. Markdown html code blocks fallback (```html ... ```)
  const mdMatch = content.match(/```html([\s\S]*?)(?:```|$)/i);
  if (mdMatch) {
    const html = mdMatch[1].trim();
    const cleanText = content.replace(/```html[\s\S]*?(?:```|$)/gi, '').trim();
    return { html, cleanText };
  }

  // 3. Generic markdown code block fallback if it contains HTML structure
  const genericMdMatch = content.match(/```([\s\S]*?)(?:```|$)/);
  if (genericMdMatch) {
    const codeContent = genericMdMatch[1].trim();
    const lowerCode = codeContent.toLowerCase();
    if (lowerCode.includes("<!doctype html") || lowerCode.includes("<html")) {
      const cleanText = content.replace(/```[\s\S]*?(?:```|$)/g, '').trim();
      return { html: codeContent, cleanText };
    }
  }

  // NOTE: No raw-HTML fallback — the system prompt instructs the model to always
  // wrap output in <ONI_CODE> tags. A raw fallback causes false positives when
  // the model echoes back the reference HTML from the system prompt.
  return { html: "", cleanText: content };
}

function mergeContinuationHtml(existing: string, continuation: string): string {
  const cleanExisting = existing.trimEnd();
  const cleanCont = continuation.trimStart();
  
  // Find character overlap up to 40 characters from the end
  for (let len = Math.min(40, cleanCont.length); len >= 1; len--) {
    const overlapStr = cleanCont.slice(0, len);
    if (cleanExisting.endsWith(overlapStr)) {
      return cleanExisting + cleanCont.slice(len);
    }
  }
  return cleanExisting + " " + cleanCont;
}

interface ParsedThought {
  paletteName?: string;
  colors: string[];
  displayFont?: string;
  bodyFont?: string;
  fontExplanation?: string;
  signature?: string;
  layout?: string;
  sections: string[];
  rawText: string;
}

function parseThought(thoughtText: string): ParsedThought {
  const result: ParsedThought = {
    colors: [],
    sections: [],
    rawText: thoughtText
  };

  if (!thoughtText) return result;

  const lines = thoughtText.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    const upper = trimmed.toUpperCase();
    if (upper.startsWith("PALETTE:")) {
      const parts = trimmed.substring(8).split('|');
      if (parts.length > 1) {
        result.paletteName = parts[0].trim();
        result.colors = parts[1].split(',').map(c => c.trim()).filter(c => c.startsWith('#'));
      } else {
        result.colors = parts[0].split(',').map(c => c.trim()).filter(c => c.startsWith('#'));
      }
    } else if (upper.startsWith("FONTS:")) {
      const parts = trimmed.substring(6).split('|');
      if (parts.length >= 2) {
        result.displayFont = parts[0].trim();
        result.bodyFont = parts[1].trim();
        if (parts[2]) result.fontExplanation = parts[2].trim();
      } else {
        result.fontExplanation = parts[0].trim();
      }
    } else if (upper.startsWith("SIGNATURE:")) {
      result.signature = trimmed.substring(10).trim();
    } else if (upper.startsWith("LAYOUT:")) {
      result.layout = trimmed.substring(7).trim();
    } else if (upper.startsWith("SECTIONS:")) {
      result.sections = trimmed.substring(9).split(',').map(s => s.trim()).filter(Boolean);
    }
  }

  // Heuristic fallbacks
  if (result.colors.length === 0) {
    const hexMatches = thoughtText.match(/#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/g);
    if (hexMatches) {
      result.colors = Array.from(new Set(hexMatches));
    }
  }

  if (!result.displayFont || !result.bodyFont) {
    const commonFonts = ["Playfair Display", "Inter", "Cormorant Garamond", "Jost", "Roboto", "Montserrat", "Outfit", "Lora", "Merriweather", "Poppins", "Lato"];
    const foundFonts = commonFonts.filter(f => new RegExp(f, 'i').test(thoughtText));
    if (foundFonts.length > 0) {
      result.displayFont = foundFonts[0];
      if (foundFonts.length > 1) {
        result.bodyFont = foundFonts[1];
      }
    }
  }

  if (result.sections.length === 0) {
    const bullets = lines
      .map(l => l.trim())
      .filter(l => l.startsWith('-') || l.startsWith('*') || /^\d+\./.test(l))
      .map(l => l.replace(/^[-*\d.]+\s*/, '').trim());
    if (bullets.length > 0) {
      result.sections = bullets;
    }
  }

  return result;
}

function extractThoughtAndHtml(content: string): { thought: string; html: string; cleanText: string } {
  let thought = "";
  let tempContent = content;

  // Extract ONI_THOUGHT case-insensitively and support HTML entities
  const openThoughtRegex = /(?:<|&lt;)oni_thought(?:\s+[^>]*)?(?:>|&gt;)/i;
  const closeThoughtRegex = /(?:<|&lt;)\/oni_thought(?:>|&gt;)/i;

  const openMatch = tempContent.match(openThoughtRegex);
  if (openMatch && openMatch.index !== undefined) {
    const startIndex = openMatch.index + openMatch[0].length;
    const closeMatch = tempContent.match(closeThoughtRegex);
    if (closeMatch && closeMatch.index !== undefined) {
      thought = tempContent.slice(startIndex, closeMatch.index).trim();
      tempContent = tempContent.replace(new RegExp(openThoughtRegex.source + "[\\s\\S]*?" + closeThoughtRegex.source, "gi"), "").trim();
    } else {
      thought = tempContent.slice(startIndex).trim();
      tempContent = "";
    }
  }

  // Extract html and clean text using extractHtmlFromContent
  const { html, cleanText } = extractHtmlFromContent(tempContent);

  return { thought, html, cleanText };
}

function getBuildStatusText(html: string): string {
  if (!html) return "Initializing layout generator...";
  const lower = html.toLowerCase();
  if (lower.includes("</html>")) return "Finalizing page markup rendering...";
  if (lower.includes("</script>")) return "Structuring interactive layout scripting...";
  if (lower.includes("<script")) return "Writing custom website behavior scripts...";
  if (lower.includes("id=\"footer\"") || lower.includes("class=\"footer\"") || lower.includes("<footer")) {
    return "Designing site footer navigation and links...";
  }
  if (lower.includes("id=\"contact\"") || lower.includes("class=\"contact\"") || lower.includes("<form") || lower.includes("newsletter") || lower.includes("cta")) {
    return "Building contact form & submission inputs...";
  }
  if (lower.includes("faq") || lower.includes("frequently asked")) {
    return "Crafting frequently asked questions...";
  }
  if (lower.includes("testimonials") || lower.includes("testimonial") || lower.includes("review")) {
    return "Structuring customer feedback & reviews grid...";
  }
  if (lower.includes("team") || lower.includes("members")) {
    return "Designing team profiles & member grid...";
  }
  if (lower.includes("services") || lower.includes("service") || lower.includes("menu") || lower.includes("pricing") || lower.includes("portfolio") || lower.includes("gallery")) {
    return "Populating service listings & work samples...";
  }
  if (lower.includes("features") || lower.includes("feature") || lower.includes("highlights")) {
    return "Crafting highlights sections & details grids...";
  }
  if (lower.includes("about")) {
    return "Creating about us section & brand story...";
  }
  if (lower.includes("hero") || lower.includes("class=\"hero\"")) {
    return "Designing showcase hero section & titles...";
  }
  if (lower.includes("navbar") || lower.includes("<nav") || lower.includes("navigation")) {
    return "Building navigation bar & brand header...";
  }
  if (lower.includes("<style")) return "Compiling typography and page CSS styles...";
  if (lower.includes("<head")) return "Setting up page headers and metadata...";
  return "Scaffolding website layout framework...";
}


type BrowserSpeechRecognitionResult = {
  isFinal: boolean;
  0?: { transcript?: string };
};

type BrowserSpeechRecognition = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onstart: (() => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  onresult: ((event: { resultIndex: number; results: ArrayLike<BrowserSpeechRecognitionResult> }) => void) | null;
  start: () => void;
  stop: () => void;
};

type SpeechRecognitionConstructor = new () => BrowserSpeechRecognition;

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

type ImageAttachment = {
  id: string;
  name: string;
  url: string;
  file?: File;
};

type FileAttachment = {
  id: string;
  name: string;
  type: string;
  size: number;
  content?: string;
  note?: string;
};

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  image?: ImageAttachment;
  files?: FileAttachment[];
  thought?: string;
  rawContent?: string;
};

type StoredConversation = {
  id: string;
  title: string;
  updatedAt: number;
};

const STORAGE_KEY = "oni_conversations";
const SESSION_KEY = "oni_session";
const MAX_FILE_TEXT_CHARS = 24000;
const MAX_FILE_SIZE_BYTES = 4 * 1024 * 1024;
const ACCEPTED_DOCUMENT_TYPES = [
  ".pdf",
  ".md",
  ".markdown",
  ".txt",
  ".csv",
  ".json",
  ".html",
  ".htm",
  ".css",
  ".js",
  ".jsx",
  ".ts",
  ".tsx",
  ".xml",
  ".yaml",
  ".yml",
  ".toml",
  ".log",
  ".rtf",
  ".doc",
  ".docx",
  ".xls",
  ".xlsx",
  ".ppt",
  ".pptx",
].join(",");
const ACCEPTED_IMAGE_TYPES = "image/png,image/jpeg,image/jpg,image/webp,image/gif,image/svg+xml,image/avif";

type EditorTab = "preview" | "code";
type PreviewSize = "desktop" | "tablet" | "mobile";
type MobilePanel = "chat" | "preview" | "code";

type ProjectFile = {
  path: string;
  label: string;
  language: string;
  content: string;
};

const VELARA_SAMPLE_THOUGHT = `PALETTE: Deep Ocean Gold | #0A0F1E, #F5F0E8, #C9A96E, #4A5568, #8A9B8E
FONTS: Cormorant Garamond | Jost | Cormorant Garamond (display - dramatic, editorial) + Jost (body - clean, modern contrast)
SIGNATURE: A clifftop hero with a slow Ken Burns animation, an oversized 'V' watermark, and elegant gold borders.
LAYOUT: Dark luxury editorial - dark sections alternating with ivory, gold accents used sparingly
SECTIONS: navbar, hero, intro, rooms, experience, testimonial, dining, location, booking, footer`;

const VELARA_SAMPLE_CONTENT = `Here is Velara — a bespoke five-star clifftop retreat on the Amalfi Coast. It represents the elite quality you can expect from the Oni generator: balanced typography, hand-curated colors, responsive grids, and clean custom styling.`;

const initialMessages: ChatMessage[] = [
  {
    id: "welcome-msg",
    role: "assistant",
    content: "Welcome to Oni! Describe a website you want to design, and I'll generate it for you in real time. Below is a sample design to showcase the level of detail and quality I can produce.",
  },
  {
    id: "sample-velara",
    role: "assistant",
    content: `${VELARA_SAMPLE_THOUGHT}\n\n${VELARA_SAMPLE_CONTENT}`,
    thought: VELARA_SAMPLE_THOUGHT,
    rawContent: `<ONI_THOUGHT>${VELARA_SAMPLE_THOUGHT}</ONI_THOUGHT>${VELARA_SAMPLE_CONTENT}<ONI_CODE>${VELARA_SAMPLE_HTML}</ONI_CODE>`,
  }
];

const previewSizeClasses: Record<PreviewSize, string> = {
  desktop: "w-full",
  tablet: "w-[820px] max-w-full",
  mobile: "w-[390px] max-w-full",
};

const previewSizeLabels: { value: PreviewSize; label: string; icon: typeof Monitor }[] = [
  { value: "desktop", label: "Desktop", icon: Monitor },
  { value: "tablet", label: "Tablet", icon: Tablet },
  { value: "mobile", label: "Mobile", icon: Smartphone },
];

const mobileTabs: { value: MobilePanel; label: string; icon: typeof MessageSquare }[] = [
  { value: "chat", label: "Chat", icon: MessageSquare },
  { value: "preview", label: "Preview", icon: Eye },
  { value: "code", label: "Code", icon: Code2 },
];

interface UseAutoResizeTextareaProps {
  minHeight: number;
  maxHeight?: number;
}

function useAutoResizeTextarea({ minHeight, maxHeight }: UseAutoResizeTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(
    (reset?: boolean) => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      if (reset) {
        textarea.style.height = `${minHeight}px`;
        return;
      }

      textarea.style.height = `${minHeight}px`;
      const nextHeight = Math.max(
        minHeight,
        Math.min(textarea.scrollHeight, maxHeight ?? Number.POSITIVE_INFINITY)
      );
      textarea.style.height = `${nextHeight}px`;
    },
    [minHeight, maxHeight]
  );

  useEffect(() => {
    adjustHeight();
  }, [minHeight, adjustHeight]);

  useEffect(() => {
    const handleResize = () => adjustHeight();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [adjustHeight]);

  return { textareaRef, adjustHeight };
}

const VISITOR_ID_KEY = "oni_visitor_id";

function getOrCreateVisitorId() {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem(VISITOR_ID_KEY);
  if (!id) {
    id = typeof window.crypto?.randomUUID === "function"
      ? window.crypto.randomUUID()
      : Math.random().toString(36).substring(2) + Date.now().toString(36);
    localStorage.setItem(VISITOR_ID_KEY, id);
  }
  return id;
}

function getCleanChatTitle(content: string): string {
  if (!content) return "New Chat";
  const templateMatch = content.match(/^TEMPLATE:\s*([^\n\r]+)/i);
  if (templateMatch && templateMatch[1]) {
    return templateMatch[1].trim();
  }
  const firstLine = content.split('\n')[0].trim();
  return firstLine.length > 40
    ? firstLine.slice(0, 40).trimEnd() + "…"
    : firstLine;
}

function getCleanUserMessageContent(content: string): string {
  // Strip the internal "TEMPLATE: X" header line before showing in the chat bubble
  const lines = content.split('\n');
  if (lines.length > 0 && lines[0].trim().toUpperCase().startsWith('TEMPLATE:')) {
    return lines.slice(1).join('\n').trim();
  }
  return content;
}

// ── Brand Intake Flow ─────────────────────────────────────────────────────────

type BrandIndustry = 
  | 'fine_dining'
  | 'south_indian'
  | 'pizza_fast_food'
  | 'cafe_coffee'
  | 'bakery_desserts'
  | 'hair_salon'
  | 'barbershop'
  | 'yoga_meditation'
  | 'gym_fitness'
  | 'spa_wellness'
  | 'medical_clinic'
  | 'dental_practice'
  | 'law_firm'
  | 'accounting_firm'
  | 'real_estate'
  | 'saas_landing'
  | 'creative_agency'
  | 'portfolio'
  | 'photography'
  | 'coaching_tutoring'
  | 'general';

interface BrandContext {
  isCollecting: boolean;
  industry: BrandIndustry | '';
  currentQuestionIndex: number;
  answers: Record<number, string>;
  originalPrompt: string;
  competitorContent?: string;
  competitorTitle?: string;
  questionsList?: string[];
  extractedInfo?: {
    name: string;
    location: string;
    colors: string[];
  };
  logoBase64?: string;
}

const BRAND_QUESTIONS: Record<BrandIndustry, string[]> = {
  fine_dining: [
    "What is the restaurant's name and tagline?",
    "What type of cuisine and dining experience do you offer?",
    "Do you want customers to reserve tables, view the menu, or both?",
    "What makes your restaurant unique? (Chef, tasting menu, wine, ambience, Michelin-style, etc.)",
    "What are your address, opening hours, phone number, and social links?"
  ],
  south_indian: [
    "What is your restaurant's name?",
    "Which cuisines or specialties do you serve? (Andhra, Telangana, Tamil, Kerala, Karnataka, etc.)",
    "Do you offer dine-in, takeaway, delivery, or catering?",
    "What are your signature dishes?",
    "Where are you located and how can customers contact you?"
  ],
  pizza_fast_food: [
    "What's your restaurant name?",
    "What food categories do you serve? (Pizza, Burgers, Wraps, Pasta, etc.)",
    "Do you offer online ordering, delivery, takeaway, or dine-in?",
    "What are your best-selling items or combo offers?",
    "Where are you located and how should customers order?"
  ],
  cafe_coffee: [
    "What's your café's name?",
    "What kind of café is it? (Specialty coffee, bakery café, coworking, brunch, etc.)",
    "What drinks or food are your signature items?",
    "Do you want customers to order online, reserve tables, or simply visit?",
    "Where are you located and what are your opening hours?"
  ],
  bakery_desserts: [
    "What's your bakery's name?",
    "What products do you specialize in?",
    "Do you take custom cake or event orders?",
    "Which products are your best sellers?",
    "How can customers place an order or visit?"
  ],
  hair_salon: [
    "What's your salon's name?",
    "What services do you offer?",
    "Do customers book appointments online?",
    "What makes your salon different?",
    "Where are you located and how can customers contact you?"
  ],
  barbershop: [
    "What's your barbershop called?",
    "What grooming services do you provide?",
    "Do you accept walk-ins, appointments, or both?",
    "Do you specialize in any haircut or beard styles?",
    "What are your location and business hours?"
  ],
  yoga_meditation: [
    "What's your studio's name?",
    "What classes or programs do you offer?",
    "Are classes online, offline, or hybrid?",
    "What philosophy or experience do you want visitors to feel?",
    "How can students book or contact you?"
  ],
  gym_fitness: [
    "What's your gym's name?",
    "What memberships or training services do you provide?",
    "What equipment or facilities make your gym stand out?",
    "Do you want online membership signup?",
    "Where is your gym located?"
  ],
  spa_wellness: [
    "What's your spa's name?",
    "What treatments or wellness services do you offer?",
    "Can customers book appointments online?",
    "What atmosphere or experience do you want to highlight?",
    "What are your contact details and opening hours?"
  ],
  medical_clinic: [
    "What's the clinic or doctor's name?",
    "Which specialties or treatments do you provide?",
    "Do patients book appointments online?",
    "What should new patients know before visiting?",
    "What are your clinic location and contact details?"
  ],
  dental_practice: [
    "What's your dental clinic's name?",
    "Which dental services do you provide?",
    "Do patients schedule appointments online?",
    "Do you have any featured doctors or technology?",
    "What are your clinic details and timings?"
  ],
  law_firm: [
    "What's your firm's name?",
    "Which legal services or practice areas do you specialize in?",
    "Who are your ideal clients?",
    "Should visitors request a consultation online?",
    "What are your office location and contact details?"
  ],
  accounting_firm: [
    "What's your firm's name?",
    "What accounting or financial services do you offer?",
    "Who do you primarily serve? (Individuals, startups, businesses, etc.)",
    "Should clients book consultations online?",
    "What are your business contact details?"
  ],
  real_estate: [
    "What's your agency's name?",
    "Do you focus on buying, selling, renting, or all three?",
    "Which property types or locations do you specialize in?",
    "Should visitors browse listings or contact an agent first?",
    "What are your office and contact details?"
  ],
  saas_landing: [
    "What's your product name and one-line value proposition?",
    "What problem does your product solve?",
    "Who is your target audience?",
    "What are the key features or benefits?",
    "What's your primary call-to-action? (Sign up, Book Demo, Start Free Trial, etc.)"
  ],
  creative_agency: [
    "What's your agency's name?",
    "Which creative services do you offer?",
    "What type of clients do you work with?",
    "Which projects or case studies should be highlighted?",
    "What's your preferred contact method?"
  ],
  portfolio: [
    "What's your name and profession?",
    "What services do you offer?",
    "Which projects should be featured?",
    "What style best represents your personal brand?",
    "How should potential clients contact you?"
  ],
  photography: [
    "What's your studio's name?",
    "Which photography genres do you specialize in?",
    "What portfolio categories should be showcased?",
    "Do clients book sessions online?",
    "What's your location and contact information?"
  ],
  coaching_tutoring: [
    "What's your institute's name?",
    "Which subjects, exams, or courses do you teach?",
    "Who are your target students?",
    "Should students enroll or book demo classes online?",
    "Where are you located and how can students contact you?"
  ],
  general: [
    "What is the name of your business or website?",
    "What services or products do you offer?",
    "Who is your target audience?",
    "Where are you located and how can customers contact you?"
  ]
};

const TONE_MAP: Record<string, string> = {
  '1': 'Luxury',
  '2': 'Professional',
  '3': 'Friendly',
  '4': 'Bold',
  '5': 'Minimal',
};

function detectIndustry(prompt: string): BrandIndustry {
  const p = prompt.toLowerCase();
  
  if (/fine dining|luxury restaurant|michelin|restaurant|bistro|dining|food|dhaba|eats/.test(p)) {
    if (/south indian|andhra|telangana|tamil|kerala|karnataka|dosa|idli/.test(p)) return 'south_indian';
    if (/pizza|burger|fast food|wrap|pasta|delivery/.test(p)) return 'pizza_fast_food';
    if (/coffee|cafe|bakery café|brunch|barista|espresso/.test(p)) return 'cafe_coffee';
    if (/bakery|dessert|cake|pastry|cookie|sweet/.test(p)) return 'bakery_desserts';
    return 'fine_dining';
  }
  
  if (/salon|hair|stylist|colorist|grooming|barber|beard/.test(p)) {
    if (/barber|barbershop/.test(p)) return 'barbershop';
    return 'hair_salon';
  }

  if (/medical|clinic|doctor|physician|pediatric|derma|dental|dentist|teeth|ortho/.test(p)) {
    if (/dental|dentist|teeth|ortho/.test(p)) return 'dental_practice';
    return 'medical_clinic';
  }

  if (/gym|fitness|crossfit|workout|weight|yoga|meditation|studio|pilates/.test(p)) {
    if (/yoga|meditation/.test(p)) return 'yoga_meditation';
    return 'gym_fitness';
  }

  if (/spa|wellness|massage|treatment/.test(p)) return 'spa_wellness';
  if (/law|legal|attorney|firm|lawyer/.test(p)) return 'law_firm';
  if (/ca |accounting|audit|financial|tax/.test(p)) return 'accounting_firm';
  if (/real estate|realtor|agency|apartment|house|listing/.test(p)) return 'real_estate';
  if (/saas|software|landing page|product page/.test(p)) return 'saas_landing';
  if (/creative agency|marketing agency|studio/.test(p)) return 'creative_agency';
  if (/portfolio|freelancer|resume|cv/.test(p)) return 'portfolio';
  if (/photography|photo studio|photographer/.test(p)) return 'photography';
  if (/coaching|tutoring|course|school|academy|class/.test(p)) return 'coaching_tutoring';
  return 'general';
}

function getIntakeQuestions(industry: BrandIndustry, questionsList?: string[]): string[] {
  const base = questionsList || BRAND_QUESTIONS[industry] || BRAND_QUESTIONS.general;
  const hasLogoQ = base.some(q => q.toLowerCase().includes("logo to upload") || q.toLowerCase().includes("logo question"));
  if (hasLogoQ) return base;
  return [...base, "Do you have a logo to upload? (Optional: Upload your logo, or skip to generate a text-based logo)"];
}

function isFreshBuildRequest(prompt: string): boolean {
  const p = prompt.toLowerCase();
  const hasBuildWord = /\b(make|build|create|design|generate)\b/.test(p);
  const hasSiteWord = /\b(website|site|page|landing|portfolio)\b/.test(p);
  return hasBuildWord && hasSiteWord;
}

function buildBrandPrompt(
  originalPrompt: string,
  industry: BrandIndustry,
  answers: Record<number, string>,
  questionsList: string[],
  extractedInfo?: { name: string; location: string; colors: string[] }
): string {
  const qaLines: string[] = [];
  questionsList.forEach((q, idx) => {
    if (answers[idx]) {
      qaLines.push(`Q: ${q}\nA: ${answers[idx]}`);
    }
  });

  const infoLines: string[] = [];
  if (extractedInfo) {
    if (extractedInfo.name) infoLines.push(`Business Name: ${extractedInfo.name}`);
    if (extractedInfo.location) infoLines.push(`Location: ${extractedInfo.location}`);
    if (extractedInfo.colors && extractedInfo.colors.length > 0) {
      infoLines.push(`Mentions Colors: ${extractedInfo.colors.join(", ")}`);
    }
  }

  return `${originalPrompt}

BRAND CONTEXT:
Industry Category: ${industry}
${infoLines.join('\n')}
${qaLines.join('\n')}

Use ALL of this brand context. Generate real content specific to this exact business. Every section — headings, body copy, testimonials, pricing, menu items — must be written specifically for the business, not generic. No placeholders.`;
}

function extractBrandFields(
  industry: BrandIndustry | '',
  answers: Record<number, string>,
  extractedInfo?: { name: string; location: string; colors: string[] },
  logoBase64?: string
) {
  const businessName = extractedInfo?.name || answers[0] || '';
  const location = extractedInfo?.location || answers[4] || answers[3] || answers[2] || '';
  const primaryColor = (extractedInfo?.colors && extractedInfo.colors[0]) || answers[3] || answers[2] || '';
  const secondaryColor = (extractedInfo?.colors && extractedInfo.colors[1]) || '';
  const tone = answers[1] || 'Professional';

  const services = answers[1] || '';

  return {
    businessName,
    location,
    primaryColor,
    secondaryColor,
    tone,
    logoBase64: logoBase64 || '',
    services,
    industry,
  };
}

function extractUrl(text: string): string | null {
  const match = text.match(/(https?:\/\/[^\s]+)/i);
  return match ? match[1] : null;
}

function hasCompetitorKeywords(text: string): boolean {
  const t = text.toLowerCase();
  const keywords = ['better than', 'like this', 'similar to', 'competitor', 'inspiration', 'reference'];
  return keywords.some(k => t.includes(k));
}

export function OniChat({
  initialPrompt = "",
  initialImage = null,
  initialFiles = [],
  chatId,
  hideSidebar = false,
  forceNewSession = false,
}: {
  initialPrompt?: string;
  initialImage?: ImageAttachment | null;
  initialFiles?: FileAttachment[];
  chatId?: string;
  hideSidebar?: boolean;
  forceNewSession?: boolean;
}) {
  const [input, setInput] = useState("");
  const [enhanceOpen, setEnhanceOpen] = useState(false);
  const [inlineEnhanceActive, setInlineEnhanceActive] = useState(false);
  const [inlineEnhanceStep, setInlineEnhanceStep] = useState(0);
  const [inlineEnhanceAnswers, setInlineEnhanceAnswers] = useState<Record<string, string>>({});
  const [inlineEnhancePrompt, setInlineEnhancePrompt] = useState("");
  const [inlineEnhanceIndustry, setInlineEnhanceIndustry] = useState("general");
  // Restore messages and conversationId from sessionStorage or localStorage so refresh/navigation stays in same chat
  const [conversationId, setConversationId] = useState<string>(() => {
    if (chatId) {
      try {
        const raw = localStorage.getItem(`oni_chat_${chatId}`);
        if (raw) {
          const parsed = JSON.parse(raw) as { id?: string };
          if (parsed?.id) return parsed.id;
        }
      } catch { /* ignore */ }
      return chatId;
    }
    // When launched from the home page, always create a fresh session
    if (forceNewSession) {
      const newId = createId();
      return newId;
    }
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { id?: string };
        if (parsed?.id) return parsed.id;
      }
    } catch { /* ignore */ }
    const newId = createId();
    try { sessionStorage.setItem(SESSION_KEY, JSON.stringify({ id: newId, messages: [] })); } catch { /* ignore */ }
    return newId;
  });
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (chatId) {
      try {
        const raw = localStorage.getItem(`oni_chat_${chatId}`);
        if (raw) {
          const parsed = JSON.parse(raw) as { messages?: ChatMessage[] };
          if (Array.isArray(parsed?.messages)) return parsed.messages;
        }
      } catch { /* ignore */ }
      return [];
    }
    // Home page launch: start empty so the initialPrompt auto-send fires immediately
    if (forceNewSession) {
      return [];
    }
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { messages?: ChatMessage[] };
        if (Array.isArray(parsed?.messages) && parsed.messages.length > 0) {
          return parsed.messages;
        }
      }
    } catch { /* ignore */ }
    return initialMessages;
  });
  const [attachedImage, setAttachedImage] = useState<ImageAttachment | null>(initialImage);
  const [attachedFiles, setAttachedFiles] = useState<FileAttachment[]>(initialFiles);
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [isWritingCode, setIsWritingCode] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [editorTab, setEditorTab] = useState<EditorTab>("preview");
  const [previewSize, setPreviewSize] = useState<PreviewSize>("desktop");
  const [previewRefreshKey, setPreviewRefreshKey] = useState(0);
  const [mobilePanel, setMobilePanel] = useState<MobilePanel>("chat");
  const [activeFilePath, setActiveFilePath] = useState("index.html");
  const [generatedHtml, setGeneratedHtml] = useState<string>(() => {
    if (chatId) {
      try {
        const raw = localStorage.getItem(`oni_chat_${chatId}`);
        if (raw) {
          const parsed = JSON.parse(raw) as { generatedHtml?: string };
          if (parsed?.generatedHtml) return parsed.generatedHtml;
        }
      } catch { /* ignore */ }
      return "";
    }
    // If we have an initial prompt, start with empty HTML preview (no Velara preview)
    if (initialPrompt) {
      return "";
    }
    // Home page launch: always show the Velara sample fresh, no old session
    if (forceNewSession) {
      return VELARA_SAMPLE_HTML;
    }
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { generatedHtml?: string };
        if (parsed?.generatedHtml) return parsed.generatedHtml;
      }
    } catch { /* ignore */ }
    return VELARA_SAMPLE_HTML;
  });
  // Track whether the iframe is showing the preloaded Velara sample (not user-generated).
  // We use a ref so it never causes re-renders.
  const isShowingSample = useRef(!initialPrompt);
  const [toast, setToast] = useState<string | null>(null);
  const [creditsRemaining, setCreditsRemaining] = useState<number | null>(null);
  const [brandContext, setBrandContext] = useState<BrandContext>({
    isCollecting: false,
    industry: '',
    currentQuestionIndex: 0,
    answers: {},
    originalPrompt: '',
    competitorContent: '',
    competitorTitle: '',
  });
  const [oniSettings, setOniSettings] = useState({
    displayName: "Oni User",
    billingPlan: "pro",
    chatFont: "inter",
    compactMode: false,
    defaultModel: "oni-pro"
  });

  const getActiveModel = useCallback(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("oni_settings");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.defaultModel) return parsed.defaultModel as string;
        }
      } catch (e) {
        // ignore
      }
    }
    return oniSettings.defaultModel;
  }, [oniSettings.defaultModel]);

  const getCustomApiConfig = useCallback(() => {
    let customApiKey = "";
    let customBaseUrl = "";
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("oni_settings");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.customApiKey) customApiKey = parsed.customApiKey as string;
          if (parsed.customBaseUrl) customBaseUrl = parsed.customBaseUrl as string;
        }
      } catch (e) {
        // ignore
      }
    }
    return { customApiKey, customBaseUrl };
  }, []);
  const [pinnedChatsList, setPinnedChatsList] = useState<string[]>([]);
  const [sortMethod, setSortMethod] = useState("date_desc");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [recentChats, setRecentChats] = useState<StoredConversation[]>([]);

  // Sync pins and sort settings
  useEffect(() => {
    const loadPinsAndSort = () => {
      try {
        const savedPins = localStorage.getItem("oni_pins");
        if (savedPins) setPinnedChatsList(JSON.parse(savedPins));
        else setPinnedChatsList([]);
      } catch {
        setPinnedChatsList([]);
      }
      try {
        const savedSort = localStorage.getItem("oni_recent_sort");
        if (savedSort) setSortMethod(savedSort);
        else setSortMethod("date_desc");
      } catch {
        setSortMethod("date_desc");
      }
    };
    loadPinsAndSort();
    window.addEventListener("storage", loadPinsAndSort);
    window.addEventListener("oni_pins_change", loadPinsAndSort);
    window.addEventListener("oni_sort_change", loadPinsAndSort);
    return () => {
      window.removeEventListener("storage", loadPinsAndSort);
      window.removeEventListener("oni_pins_change", loadPinsAndSort);
      window.removeEventListener("oni_sort_change", loadPinsAndSort);
    };
  }, []);

  const togglePin = (chatId: string) => {
    try {
      const savedPins = localStorage.getItem("oni_pins");
      let currentPins: string[] = savedPins ? JSON.parse(savedPins) : [];
      
      if (currentPins.includes(chatId)) {
        currentPins = currentPins.filter(id => id !== chatId);
        setToast("Chat unpinned");
      } else {
        if (currentPins.length >= 3) {
          setToast("Maximum of 3 pinned chats allowed");
          return;
        }
        currentPins.push(chatId);
        setToast("Chat pinned to top");
      }
      
      localStorage.setItem("oni_pins", JSON.stringify(currentPins));
      window.dispatchEvent(new Event("oni_pins_change"));
    } catch (e) {
      console.error(e);
    }
  };

  const getSortedChats = () => {
    const pinned = recentChats.filter(c => pinnedChatsList.includes(c.id));
    const unpinned = recentChats.filter(c => !pinnedChatsList.includes(c.id));

    const sortFn = (a: StoredConversation, b: StoredConversation) => {
      if (sortMethod === "date_desc") {
        return b.updatedAt - a.updatedAt;
      } else if (sortMethod === "date_asc") {
        return a.updatedAt - b.updatedAt;
      } else if (sortMethod === "name_asc") {
        return a.title.localeCompare(b.title);
      } else if (sortMethod === "name_desc") {
        return b.title.localeCompare(a.title);
      }
      return 0;
    };

    pinned.sort(sortFn);
    unpinned.sort(sortFn);

    return [...pinned, ...unpinned];
  };

  const sortedRecentChats = getSortedChats();

  useEffect(() => {
    const loadSettings = () => {
      try {
        const saved = localStorage.getItem("oni_settings");
        if (saved) {
          const parsed = JSON.parse(saved);
          setOniSettings({
            displayName: parsed.displayName || "Oni User",
            billingPlan: parsed.billingPlan || "pro",
            chatFont: parsed.chatFont || "inter",
            compactMode: !!parsed.compactMode,
            defaultModel: parsed.defaultModel || "oni-pro"
          });
        }
      } catch (e) {
        // ignore
      }
    };
    loadSettings();
    window.addEventListener("storage", loadSettings);
    window.addEventListener("oni_settings_change", loadSettings);
    return () => {
      window.removeEventListener("storage", loadSettings);
      window.removeEventListener("oni_settings_change", loadSettings);
    };
  }, []);
  const [hasStarted, setHasStarted] = useState(() => {
    if (chatId) {
      try {
        const raw = localStorage.getItem(`oni_chat_${chatId}`);
        if (raw) {
          const parsed = JSON.parse(raw) as { messages?: ChatMessage[] };
          return Array.isArray(parsed?.messages) && parsed.messages.length > 0;
        }
      } catch { /* ignore */ }
      return false;
    }
    // If messages were restored from session, we've already started
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { messages?: ChatMessage[] };
        return Array.isArray(parsed?.messages) && parsed.messages.length > 0;
      }
    } catch { /* ignore */ }
    return false;
  });

  // Fetch credits on mount
  useEffect(() => {
    const visitorId = getOrCreateVisitorId();
    if (!visitorId) return;
    fetch("/api/credits", {
      headers: { "x-visitor-id": visitorId },
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && typeof data.credits_remaining === "number") {
          setCreditsRemaining(data.credits_remaining);
        }
      })
      .catch(() => { /* silently ignore */ });
  }, []);
  const [navOpen, setNavOpen] = useState(false);
  const [chatPanelOpen, setChatPanelOpen] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<BrowserSpeechRecognition | null>(null);
  const objectUrlsRef = useRef<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const toastTimerRef = useRef<number | null>(null);

  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 36,
    maxHeight: 200,
  });

  // Load recent conversations from Supabase/server history on mount
  useEffect(() => {
    // 1. Try local storage first for immediate UI display
    let localRecent: StoredConversation[] = [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        localRecent = JSON.parse(raw) as StoredConversation[];
        setRecentChats(localRecent);
      }
    } catch { /* ignore */ }

    // 2. Fetch from server and sync
    const visitorId = getOrCreateVisitorId();
    if (!visitorId) return;

    fetch("/api/chat/history", {
      headers: { "x-visitor-id": visitorId }
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch recent chats");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data.conversations)) {
          setRecentChats(data.conversations);
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data.conversations));
          } catch { }

          // Sync any local chats that are missing from the server
          localRecent.forEach((localChat) => {
            const exists = data.conversations.some((c: any) => c.id === localChat.id);
            if (!exists) {
              try {
                const chatRaw = localStorage.getItem(`oni_chat_${localChat.id}`);
                if (chatRaw) {
                  const parsed = JSON.parse(chatRaw);
                  fetch("/api/chat/history", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      "x-visitor-id": visitorId,
                    },
                    body: JSON.stringify({
                      id: localChat.id,
                      title: localChat.title,
                      messages: parsed.messages,
                      generatedHtml: parsed.generatedHtml,
                    }),
                  }).catch(console.error);
                }
              } catch { }
            }
          });
        }
      })
      .catch((err) => console.error("Error syncing recent chats:", err));
  }, []);

  // Listen to chatId updates (e.g. clicking different recent chats)
  useEffect(() => {
    if (!chatId) return;
    
    // 1. Try local storage first (instant UI transition)
    let localData: any = null;
    try {
      const raw = localStorage.getItem(`oni_chat_${chatId}`);
      if (raw) {
        localData = JSON.parse(raw);
        setConversationId(localData.id || chatId);
        setMessages(localData.messages || []);
        setGeneratedHtml(localData.generatedHtml || "");
        setHasStarted(Array.isArray(localData.messages) && localData.messages.length > 0);
      }
    } catch { /* ignore */ }

    // 2. Fetch from server to sync/verify
    const visitorId = getOrCreateVisitorId();
    if (!visitorId) return;

    fetch(`/api/chat/history?id=${chatId}`, {
      headers: { "x-visitor-id": visitorId }
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch conversation");
        return res.json();
      })
      .then((data) => {
        setConversationId(data.id || chatId);
        setMessages(data.messages || []);
        setGeneratedHtml(data.generatedHtml || "");
        setHasStarted(Array.isArray(data.messages) && data.messages.length > 0);
        
        try {
          localStorage.setItem(`oni_chat_${chatId}`, JSON.stringify(data));
        } catch { }
      })
      .catch((err) => {
        console.error("Error loading chat from server:", err);
        // If server failed or chat doesn't exist on server but we have local, push it to server
        if (localData) {
          fetch("/api/chat/history", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-visitor-id": visitorId
            },
            body: JSON.stringify({
              id: chatId,
              title: localData.title || "Restored Chat",
              messages: localData.messages,
              generatedHtml: localData.generatedHtml
            })
          }).catch(console.error);
        } else {
          // No local data and failed to load, initialize empty
          setConversationId(chatId);
          setMessages([]);
          setGeneratedHtml("");
          setHasStarted(false);
        }
      });
  }, [chatId]);

  // Load brand memory when conversation ID changes
  useEffect(() => {
    if (!conversationId) return;
    fetch(`/api/brands?projectId=${conversationId}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          setBrandContext({
            isCollecting: false,
            industry: (data.industry || 'general') as BrandIndustry,
            currentQuestionIndex: 0,
            answers: data.custom_answers || {},
            originalPrompt: '',
            competitorContent: data.custom_answers?.competitorContent || '',
            competitorTitle: data.custom_answers?.competitorTitle || '',
          });
        }
      })
      .catch((err) => console.error("Error loading brand context:", err));
  }, [conversationId]);

  // Derive conversation title from first user message
  const conversationTitle = useMemo(() => {
    const firstUser = messages.find((m) => m.role === "user");
    if (!firstUser?.content) return null;
    return getCleanChatTitle(firstUser.content);
  }, [messages]);

  // Persist messages + id + generatedHtml to sessionStorage, localStorage, and Supabase server
  useEffect(() => {
    // 1. Instant local save
    try {
      const data = { id: conversationId, messages, generatedHtml };
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
      localStorage.setItem(`oni_chat_${conversationId}`, JSON.stringify(data));
    } catch { /* ignore */ }

    // 2. Debounced server save
    if (!conversationId || messages.length === 0) return;

    const timer = setTimeout(() => {
      const visitorId = getOrCreateVisitorId();
      if (!visitorId) return;

      fetch("/api/chat/history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-visitor-id": visitorId,
        },
        body: JSON.stringify({
          id: conversationId,
          title: conversationTitle || "New Chat",
          messages,
          generatedHtml,
        }),
      }).catch((err) => console.error("Failed to sync to server:", err));
    }, 1500); // 1.5 seconds debounce

    return () => clearTimeout(timer);
  }, [messages, conversationId, generatedHtml, conversationTitle]);

  // Save/update current conversation in localStorage whenever title changes
  useEffect(() => {
    if (!conversationTitle) return;
    setRecentChats((prev) => {
      const existing = prev.find((c) => c.id === conversationId);
      const entry: StoredConversation = {
        id: conversationId,
        title: conversationTitle,
        updatedAt: Date.now(),
      };
      const next = existing
        ? prev.map((c) => (c.id === conversationId ? entry : c))
        : [entry, ...prev];
      // keep most-recent 20
      const trimmed = next.slice(0, 20);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed)); } catch { /* ignore */ }
      return trimmed;
    });
  }, [conversationTitle, conversationId]);

  const showToast = useCallback((message: string) => {
    setToast(message);

    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }

    toastTimerRef.current = window.setTimeout(() => {
      setToast(null);
      toastTimerRef.current = null;
    }, 2400);
  }, []);

  const handleEnhancePrompt = useCallback(async () => {
    if (isEnhancing || generating || isLoading || input.trim().length < 3) return;



    setIsEnhancing(true);

    try {
      const response = await fetch("/api/enhance-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: input,
          defaultModel: getActiveModel(),
        }),
      });
      if (response.ok) {
        const data = await response.json();
        if (data.enhancedPrompt) {
          setInput(data.enhancedPrompt);
          showToast("Prompt enhanced!");
          window.requestAnimationFrame(() => adjustHeight());
        }
      } else {
        const errText = await response.text();
        console.error("Enhancement failed:", errText);
        showToast("Failed to enhance prompt");
      }
    } catch (err) {
      console.error("Enhancement error:", err);
      showToast("Error enhancing prompt");
    } finally {
      setIsEnhancing(false);
    }
  }, [input, isEnhancing, generating, isLoading, getActiveModel, showToast, adjustHeight, generatedHtml]);

  const lastAiRawContent = useMemo(() => {
    const lastAiMsg = [...messages].reverse().find((m) => m.role === "assistant" && m.rawContent);
    return lastAiMsg?.rawContent || "";
  }, [messages]);

  const projectFiles = useMemo(
    () => buildProjectFiles(generatedHtml, lastAiRawContent),
    [generatedHtml, lastAiRawContent]
  );
  const activeFile = projectFiles.find((file) => file.path === activeFilePath) ?? projectFiles[0];
  const previewHtml = generatedHtml;

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
      objectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      if (toastTimerRef.current) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, generating]);


  const setImageFromFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return;

      if (attachedImage) {
        URL.revokeObjectURL(attachedImage.url);
        objectUrlsRef.current = objectUrlsRef.current.filter((url) => url !== attachedImage.url);
      }

      const imageUrl = URL.createObjectURL(file);
      objectUrlsRef.current.push(imageUrl);
      setAttachedImage({
        id: createId(),
        name: file.name || "pasted-image.png",
        url: imageUrl,
        file: file,
      });
      setMobilePanel("chat");
    },
    [attachedImage]
  );

  const removeAttachedImage = useCallback(() => {
    if (!attachedImage) return;

    URL.revokeObjectURL(attachedImage.url);
    objectUrlsRef.current = objectUrlsRef.current.filter((url) => url !== attachedImage.url);
    setAttachedImage(null);
  }, [attachedImage]);

  const addFilesFromList = useCallback(
    async (fileList: FileList | File[]) => {
      const files = Array.from(fileList);
      const nextFiles: FileAttachment[] = [];

      for (const file of files) {
        if (file.type.startsWith("image/")) {
          setImageFromFile(file);
          continue;
        }

        const attachment: FileAttachment = {
          id: createId(),
          name: file.name || "untitled-file",
          type: file.type || getFileExtension(file.name).toUpperCase().replace(".", "") || "unknown",
          size: file.size,
        };

        if (file.size > MAX_FILE_SIZE_BYTES) {
          attachment.note = `File is ${formatBytes(file.size)}, over the ${formatBytes(MAX_FILE_SIZE_BYTES)} text-reading limit.`;
        } else if (isReadableTextFile(file)) {
          const text = await file.text();
          attachment.content =
            text.length > MAX_FILE_TEXT_CHARS
              ? `${text.slice(0, MAX_FILE_TEXT_CHARS)}\n...[truncated after ${MAX_FILE_TEXT_CHARS} characters]`
              : text;
        } else if (isPdfFile(file)) {
          attachment.note = "PDF attached. Browser-side PDF text extraction is not available in this build, so only file metadata will be sent.";
        } else {
          attachment.note = "Binary document attached. Only file metadata will be sent.";
        }

        nextFiles.push(attachment);
      }

      if (nextFiles.length > 0) {
        setAttachedFiles((current) => [...current, ...nextFiles]);
        setMobilePanel("chat");
      }
    },
    [setImageFromFile]
  );

  const removeAttachedFile = useCallback((fileId: string) => {
    setAttachedFiles((current) => current.filter((file) => file.id !== fileId));
  }, []);

  const handleFileInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files?.length) {
        void addFilesFromList(files);
      }
      event.target.value = "";
    },
    [addFilesFromList]
  );

  const handleVoiceInput = useCallback(() => {
    if (typeof window === "undefined") return;

    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      return;
    }

    const SpeechRecognitionConstructor =
      window.SpeechRecognition ?? window.webkitSpeechRecognition;

    if (!SpeechRecognitionConstructor) {
      showToast("Voice input is not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognitionConstructor();
    recognitionRef.current = recognition;
    recognition.lang = navigator.language || "en-US";
    recognition.interimResults = true;
    recognition.continuous = false;

    let finalTranscript = "";

    recognition.onstart = () => setIsListening(true);
    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      showToast(`Voice input error: ${event.error}`);
      setIsListening(false);
    };
    recognition.onend = () => {
      setIsListening(false);
      recognitionRef.current = null;
      adjustHeight();
    };
    recognition.onresult = (event) => {
      let interimTranscript = "";

      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        const transcript = event.results[index][0]?.transcript ?? "";
        if (event.results[index].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      const transcript = `${finalTranscript}${interimTranscript}`.trim();
      if (!transcript) return;

      const separator = input.trim() ? " " : "";
      setInput(`${input}${separator}${transcript}`);
      window.requestAnimationFrame(() => adjustHeight());
    };

    recognition.start();
  }, [adjustHeight, input, isListening, showToast]);

  // Ref so handleSend can always call the latest handleSendToAI without a TDZ issue
  const handleSendToAIRef = useRef<(prompt: string, image: ImageAttachment | null | undefined, files: FileAttachment[]) => Promise<void>>(async () => {});

  const onAnswerLogo = useCallback(async (base64?: string) => {
    if (!brandContext.isCollecting) return;
    const questions = brandContext.questionsList || getIntakeQuestions(brandContext.industry as BrandIndustry || 'general', []);
    const qIdx = brandContext.currentQuestionIndex;
    
    // Check if the current question is indeed the logo question
    const isLogoQ = questions[qIdx]?.toLowerCase().includes("logo to upload");
    if (!isLogoQ) return;

    const answerText = base64 ? "Uploaded brand logo successfully." : "Skip logo upload (use dynamic text-based logo).";
    const newAnswers = { ...brandContext.answers, [qIdx]: answerText };
    
    // Add user message to chat
    const userAnswerMsg: ChatMessage = { id: createId(), role: 'user', content: answerText };
    setMessages(prev => [...prev, userAnswerMsg]);
    setInput('');
    
    const isLastQuestion = qIdx >= questions.length - 1;
    
    if (!isLastQuestion) {
      const nextQ = questions[qIdx + 1];
      const nextQMsg: ChatMessage = { id: createId(), role: 'assistant', content: nextQ };
      setMessages(prev => [...prev, nextQMsg]);
      setBrandContext(prev => ({
        ...prev,
        currentQuestionIndex: qIdx + 1,
        answers: newAnswers,
        logoBase64: base64 || prev.logoBase64,
      }));
      return;
    }

    // All questions answered — build the enriched prompt and fire the AI
    const businessName = brandContext.extractedInfo?.name || newAnswers[0] || '';
    const confirmMsg: ChatMessage = {
      id: createId(),
      role: 'assistant',
      content: `Perfect! Building your${businessName ? ` ${businessName}` : ''} website now ✦`,
    };
    setMessages(prev => [...prev, confirmMsg]);

    const enrichedPrompt = buildBrandPrompt(
      brandContext.originalPrompt,
      brandContext.industry as BrandIndustry,
      newAnswers,
      questions,
      brandContext.extractedInfo
    );

    setBrandContext(prev => ({
      isCollecting: false,
      industry: prev.industry,
      currentQuestionIndex: 0,
      answers: newAnswers,
      originalPrompt: prev.originalPrompt,
      competitorContent: prev.competitorContent,
      competitorTitle: prev.competitorTitle,
      questionsList: questions,
      extractedInfo: prev.extractedInfo,
      logoBase64: base64 || prev.logoBase64,
    }));

    // Small delay so the confirm message renders first
    await new Promise(r => setTimeout(r, 300));

    // Kick off AI generation with enriched prompt
    void handleSendToAIRef.current(
      enrichedPrompt,
      null,
      []
    );
  }, [brandContext, setMessages, setInput, handleSendToAIRef]);

  const handleInlineOptionSelect = useCallback((optVal: string) => {
    const questions = QUESTIONS[inlineEnhanceIndustry] || QUESTIONS.general;
    const currentQ = questions[inlineEnhanceStep];
    const newAnswers = { ...inlineEnhanceAnswers, [currentQ.field]: optVal };
    setInlineEnhanceAnswers(newAnswers);
    setInput('');

    if (inlineEnhanceStep + 1 >= questions.length) {
      const enhanced = buildEnhancedPrompt(inlineEnhancePrompt, inlineEnhanceIndustry, newAnswers);
      setInlineEnhanceActive(false);
      setMessages(prev => [...prev, { id: createId(), role: 'assistant', content: `Building your website now...` }]);
      void handleSendToAIRef.current(enhanced, null, []);
    } else {
      setInlineEnhanceStep(prev => prev + 1);
    }
  }, [inlineEnhanceStep, inlineEnhanceIndustry, inlineEnhanceAnswers, inlineEnhancePrompt, setInput]);

  const handleInlineNext = useCallback(() => {
    const questions = QUESTIONS[inlineEnhanceIndustry] || QUESTIONS.general;
    const currentQ = questions[inlineEnhanceStep];
    const newAnswers = { ...inlineEnhanceAnswers, [currentQ.field]: input };
    setInlineEnhanceAnswers(newAnswers);
    setInput('');

    if (inlineEnhanceStep + 1 >= questions.length) {
      const enhanced = buildEnhancedPrompt(inlineEnhancePrompt, inlineEnhanceIndustry, newAnswers);
      setInlineEnhanceActive(false);
      setMessages(prev => [...prev, { id: createId(), role: 'assistant', content: `Building your website now...` }]);
      void handleSendToAIRef.current(enhanced, null, []);
    } else {
      setInlineEnhanceStep(prev => prev + 1);
    }
  }, [inlineEnhanceStep, inlineEnhanceIndustry, inlineEnhanceAnswers, inlineEnhancePrompt, input, setInput]);

  const handleInlineSkip = useCallback(() => {
    const questions = QUESTIONS[inlineEnhanceIndustry] || QUESTIONS.general;
    const currentQ = questions[inlineEnhanceStep];
    const newAnswers = { ...inlineEnhanceAnswers, [currentQ.field]: '' };
    setInlineEnhanceAnswers(newAnswers);
    setInput('');

    if (inlineEnhanceStep + 1 >= questions.length) {
      const enhanced = buildEnhancedPrompt(inlineEnhancePrompt, inlineEnhanceIndustry, newAnswers);
      setInlineEnhanceActive(false);
      setMessages(prev => [...prev, { id: createId(), role: 'assistant', content: `Building your website now...` }]);
      void handleSendToAIRef.current(enhanced, null, []);
    } else {
      setInlineEnhanceStep(prev => prev + 1);
    }
  }, [inlineEnhanceStep, inlineEnhanceIndustry, inlineEnhanceAnswers, inlineEnhancePrompt, setInput]);

  const handleSend = useCallback(async (overrideText?: string) => {
    const prompt = (overrideText ?? input).trim();
    if ((!prompt && !attachedImage && attachedFiles.length === 0) || generating || isLoading) return;

    if (inlineEnhanceActive) {
      handleInlineNext();
      return;
    }

    // Intercept fresh build requests to trigger inline intake questions flow
    if (!generatedHtml && isFreshBuildRequest(prompt)) {
      const userMsg: ChatMessage = { id: createId(), role: 'user', content: prompt };
      setMessages(prev => [...prev, userMsg]);
      setInput('');
      adjustHeight(true);
      if (!hasStarted) setHasStarted(true);
      
      const industry = detectIndustryForEnhance(prompt);
      setInlineEnhancePrompt(prompt);
      setInlineEnhanceIndustry(industry);
      setInlineEnhanceAnswers({});
      setInlineEnhanceStep(0);
      setInlineEnhanceActive(true);
      return;
    }

    // ── Brand Intake: handle answer to current question ────────────────────────
    if (brandContext.isCollecting) {
      const questions = brandContext.questionsList || BRAND_QUESTIONS[brandContext.industry as BrandIndustry || 'general'];
      const qIdx = brandContext.currentQuestionIndex;
      const newAnswers = { ...brandContext.answers, [qIdx]: prompt };

      // Show the user's answer in chat
      const userAnswerMsg: ChatMessage = { id: createId(), role: 'user', content: prompt };
      setMessages(prev => [...prev, userAnswerMsg]);
      setInput('');
      adjustHeight(true);

      const isLastQuestion = qIdx >= questions.length - 1;

      if (!isLastQuestion) {
        // Ask next question
        const nextQ = questions[qIdx + 1];
        const nextQMsg: ChatMessage = { id: createId(), role: 'assistant', content: nextQ };
        setMessages(prev => [...prev, nextQMsg]);
        setBrandContext(prev => ({
          ...prev,
          currentQuestionIndex: qIdx + 1,
          answers: newAnswers,
        }));
        return;
      }

      // All questions answered — build the enriched prompt and fire the AI
      const businessName = brandContext.extractedInfo?.name || newAnswers[0] || '';
      const confirmMsg: ChatMessage = {
        id: createId(),
        role: 'assistant',
        content: `Perfect! Building your${businessName ? ` ${businessName}` : ''} website now ✦`,
      };
      setMessages(prev => [...prev, confirmMsg]);

      // Preserve brand context in state so it acts as active brand memory
      const enrichedPrompt = buildBrandPrompt(
        brandContext.originalPrompt,
        brandContext.industry as BrandIndustry,
        newAnswers,
        questions,
        brandContext.extractedInfo
      );
      setBrandContext({
        isCollecting: false,
        industry: brandContext.industry,
        currentQuestionIndex: 0,
        answers: newAnswers,
        originalPrompt: brandContext.originalPrompt,
        competitorContent: brandContext.competitorContent,
        competitorTitle: brandContext.competitorTitle,
        questionsList: questions,
        extractedInfo: brandContext.extractedInfo,
      });

      // Small delay so the confirm message renders first
      await new Promise(r => setTimeout(r, 300));

      // Kick off AI generation with enriched prompt (bypass intake detection)
      void handleSendToAIRef.current(enrichedPrompt, null, []);
      return;
    }

    // ── Competitor URL Analysis Intercept ──────────────────────────────────────
    const detectedUrl = extractUrl(prompt);
    const hasCompetitor = hasCompetitorKeywords(prompt);
    const isFresh = !generatedHtml || isShowingSample.current;

    if (isFresh && detectedUrl && hasCompetitor && !overrideText) {
      let domain = detectedUrl;
      try {
        domain = new URL(detectedUrl.startsWith('http') ? detectedUrl : 'https://' + detectedUrl).hostname || detectedUrl;
      } catch { /* ignore */ }

      const userMsg: ChatMessage = { id: createId(), role: 'user', content: prompt };
      const statusMsg: ChatMessage = {
        id: createId(),
        role: 'assistant',
        content: `✦ Analyzing ${domain}... give me a moment.`,
      };
      setMessages(prev => [...prev, userMsg, statusMsg]);
      setInput('');
      adjustHeight(true);
      if (!hasStarted) setHasStarted(true);

      setIsLoading(true);

      fetch('/api/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: detectedUrl }),
      })
        .then((res) => (res.ok ? res.json() : { error: 'Fetch failed' }))
        .then((data) => {
          setIsLoading(false);
          const industry = detectIndustry(prompt);
          const successText = `✦ Done! I can see their design approach.\n\nNow — what's YOUR business name?`;

          setMessages(prev => {
            const updated = [...prev];
            const lastIdx = updated.findIndex(m => m.id === statusMsg.id);
            if (lastIdx > -1) {
              updated[lastIdx] = {
                id: statusMsg.id,
                role: 'assistant',
                content: successText,
              };
            } else {
              updated.push({ id: createId(), role: 'assistant', content: successText });
            }
            return updated;
          });

          const qList = getIntakeQuestions(industry, []);
          setBrandContext({
            isCollecting: true,
            industry,
            currentQuestionIndex: 0,
            answers: {},
            originalPrompt: prompt,
            questionsList: qList,
            competitorContent: data.content || '',
            competitorTitle: data.title || '',
          });
        })
        .catch((err) => {
          setIsLoading(false);
          console.error(err);
          const industry = detectIndustry(prompt);
          const failText = `✦ Could not access the website. Let's proceed with design questions anyway.\n\nWhat's YOUR business name?`;

          setMessages(prev => {
            const updated = [...prev];
            const lastIdx = updated.findIndex(m => m.id === statusMsg.id);
            if (lastIdx > -1) {
              updated[lastIdx] = {
                id: statusMsg.id,
                role: 'assistant',
                content: failText,
              };
            } else {
              updated.push({ id: createId(), role: 'assistant', content: failText });
            }
            return updated;
          });

          const qList = getIntakeQuestions(industry, []);
          setBrandContext({
            isCollecting: true,
            industry,
            currentQuestionIndex: 0,
            answers: {},
            originalPrompt: prompt,
            questionsList: qList,
            competitorContent: '',
            competitorTitle: '',
          });
        });

      return;
    }

    // ── Normal send (with backend classification) ──────────────────────────────
    if (!overrideText) {
      const userMsg: ChatMessage = { id: createId(), role: 'user', content: prompt };
      setMessages(prev => [...prev, userMsg]);
      setInput('');
      adjustHeight(true);
      if (!hasStarted) setHasStarted(true);

      setIsLoading(true);

      try {
        const history = messages.map(m => ({ role: m.role, content: m.content }));
        const classifyRes = await fetch("/api/classify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: prompt, history })
        });
        
        if (classifyRes.ok) {
          const classification = await classifyRes.json();
          console.log("[Client Classifier] Result:", classification);

          if (classification.intent === "build_request") {
            let industry = classification.industry || "general";
            if (industry === "restaurant") {
              const p = prompt.toLowerCase();
              if (/south indian|andhra|telangana|dosa|idli/.test(p)) {
                industry = "south_indian";
              } else if (/pizza|burger|fast food|wrap/.test(p)) {
                industry = "pizza_fast_food";
              } else if (/coffee|cafe|espresso|barista/.test(p)) {
                industry = "cafe_coffee";
              } else if (/bakery|cake|dessert/.test(p)) {
                industry = "bakery_desserts";
              } else {
                industry = "fine_dining";
              }
            } else if (industry === "salon") {
              industry = prompt.toLowerCase().includes("barber") ? "barbershop" : "hair_salon";
            } else if (industry === "medical") {
              industry = prompt.toLowerCase().includes("dent") ? "dental_practice" : "medical_clinic";
            } else if (industry === "fitness") {
              industry = /yoga|meditation/.test(prompt.toLowerCase()) ? "yoga_meditation" : "gym_fitness";
            } else if (industry === "saas") {
              industry = "saas_landing";
            } else if (industry === "legal") {
              industry = "law_firm";
            } else if (industry === "education") {
              industry = "coaching_tutoring";
            }

            const rawQuestions = BRAND_QUESTIONS[industry as BrandIndustry] || BRAND_QUESTIONS.general;
            
            // Filter out questions based on extractedInfo
            const filteredQuestions: string[] = [];
            const extName = classification.extractedInfo?.name || "";
            const extLocation = classification.extractedInfo?.location || "";
            
            rawQuestions.forEach((q) => {
              const qLower = q.toLowerCase();
              
              // Skip name question if name is extracted
              const isNameQuestion = qLower.includes("name") || qLower.includes("called") || qLower.includes("name?");
              if (isNameQuestion && extName) {
                console.log(`[Intake] Skipping name question: "${q}" because name is already: "${extName}"`);
                return;
              }
              
              // Skip location question if location is extracted
              const isLocationQuestion = qLower.includes("located") || qLower.includes("location") || qLower.includes("address") || qLower.includes("where are you");
              if (isLocationQuestion && extLocation) {
                console.log(`[Intake] Skipping location question: "${q}" because location is already: "${extLocation}"`);
                return;
              }
              
              filteredQuestions.push(q);
            });

            const allQuestions = getIntakeQuestions(industry as BrandIndustry, filteredQuestions);
            if (allQuestions.length > 0) {
              const firstQ = allQuestions[0];
              const oniQ: ChatMessage = { id: createId(), role: 'assistant', content: firstQ };
              setMessages(prev => [...prev, oniQ]);
              setIsLoading(false);
              
              setBrandContext({
                isCollecting: true,
                industry,
                currentQuestionIndex: 0,
                answers: {},
                originalPrompt: prompt,
                questionsList: allQuestions,
                extractedInfo: classification.extractedInfo,
              });
              return;
            }
          }
        }
      } catch (err) {
        console.warn("Classification failed, falling through to direct AI dispatch:", err);
      }

      setIsLoading(false);
    }

    void handleSendToAIRef.current(prompt, attachedImage, attachedFiles);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adjustHeight, attachedFiles, attachedImage, brandContext, generatedHtml, generating, hasStarted, input, isLoading, messages]);

  // Core AI dispatch — called via ref from handleSend
  const handleSendToAI = useCallback(async (
    prompt: string,
    imageForMessage: ImageAttachment | undefined | null,
    filesForMessage: FileAttachment[]
  ) => {
    const cleanPromptLower = prompt.toLowerCase().trim();
    const isContinuation =
      cleanPromptLower === "continue" ||
      cleanPromptLower === "continue generating" ||
      cleanPromptLower === "go on" ||
      cleanPromptLower === "finish" ||
      cleanPromptLower === "complete" ||
      cleanPromptLower === "complete it";

    const baseHtmlBeforeContinuation = generatedHtml;
    const imageAttach = imageForMessage ?? undefined;

    let finalPrompt = prompt;
    if (brandContext.industry && !brandContext.isCollecting && (generatedHtml || messages.length > 0)) {
      const fields = extractBrandFields(brandContext.industry, brandContext.answers, brandContext.extractedInfo, brandContext.logoBase64);
      finalPrompt = `EXISTING BRAND:
Business: ${fields.businessName}, Industry: ${brandContext.industry}
Colors: primary=${fields.primaryColor} secondary=${fields.secondaryColor}
Tone: ${fields.tone}
${fields.logoBase64 ? 'Logo: Custom Base64 Logo Provided' : 'Logo: Text/SVG Dynamic Logo'}
Maintain this brand identity in all changes.

${prompt}`;
    }

    const promptForApi = buildPromptWithAttachments(finalPrompt, imageAttach, filesForMessage);
    const displayPrompt = getCleanUserMessageContent(prompt);

    const userMessage: ChatMessage = {
      id: createId(),
      role: "user",
      content: displayPrompt,
      image: imageAttach,
      files: filesForMessage,
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setAttachedImage(null);
    setAttachedFiles([]);
    setEditorTab("preview");
    adjustHeight(true);

    setIsLoading(true);
    setGenerating(true);
    setIsWritingCode(false);

    if (!hasStarted) setHasStarted(true);

    const assistantId = createId();
    setMessages((prev) => [...prev, { id: assistantId, role: "assistant", content: "" }]);

    // Compress & convert user attached image to base64 if present
    let base64Image: string | null = null;
    if (imageAttach && imageAttach.file) {
      try {
        base64Image = await resizeImageToBase64(imageAttach.file);
      } catch (err) {
        console.error("Failed to convert image to base64:", err);
      }
    }

    try {
      const { customApiKey, customBaseUrl } = getCustomApiConfig();
      const messagesForApi = [...messages, userMessage];
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-visitor-id": getOrCreateVisitorId(),
        },
        body: JSON.stringify({
          prompt: promptForApi,
          messages: messagesForApi.map(m => ({
            role: m.role,
            content: m.id === userMessage.id ? promptForApi : m.content
          })),
          // Only send currentHtml if the user has already generated something this session.
          // Never send the preloaded Velara sample as context — it would make Groq modify
          // Velara instead of building a fresh site.
          currentHtml: isShowingSample.current ? "" : generatedHtml,
          defaultModel: getActiveModel(),
          userImage: base64Image,
          customApiKey,
          brandAnswers: brandContext.industry && !brandContext.isCollecting 
            ? extractBrandFields(brandContext.industry, brandContext.answers, brandContext.extractedInfo, brandContext.logoBase64) 
            : undefined,
          industry: brandContext.industry || undefined,
        }),
      });

      if (!response.ok) {
        const status = response.status;
        let errorContent: string;
        if (status === 402) {
          errorContent = "__OUT_OF_CREDITS__";
          setCreditsRemaining(0);
        } else {
          const errorText = await response.text();
          console.error('API error:', errorText);
          errorContent = `Sorry, there was an error: ${errorText || response.statusText}`;
        }
        setIsLoading(false);
        setGenerating(false);
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            id: assistantId,
            role: 'assistant',
            content: errorContent,
          };
          return updated;
        });
        return;
      }

      if (!response.body) {
        setIsLoading(false);
        setGenerating(false);
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed) continue;

          // Detect Ollama vs OpenAI-compatible SSE
          const isOllamaChunk = trimmed.startsWith('{') && !trimmed.startsWith('data: ');

          if (isOllamaChunk) {
            try {
              const parsed = JSON.parse(trimmed);
              const token = parsed.message?.content || '';
              fullText += token;

              const thoughtMatch = fullText.match(/<ONI_THOUGHT>([\s\S]*?)(?:<\/ONI_THOUGHT>|$)/);
              const thought = thoughtMatch ? thoughtMatch[1].trim() : undefined;

              // Update last message in real time
              setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  id: assistantId,
                  role: 'assistant',
                  content: fullText
                    .replace(/<ONI_CODE>[\s\S]*?<\/ONI_CODE>/g, '')
                    .replace(/<ONI_CODE>[\s\S]*/g, '')
                    .replace(/<ONI_THOUGHT>[\s\S]*?<\/ONI_THOUGHT>/g, '')
                    .replace(/<ONI_THOUGHT>[\s\S]*/g, '')
                    .trim(),
                  thought: thought,
                  rawContent: fullText
                };
                return updated;
              });

              // Stream partial code block into files in real-time
              const partialCodeMatch = fullText.match(/<ONI_CODE>([\s\S]*?)(?:<\/ONI_CODE>|$)/);
              if (partialCodeMatch && partialCodeMatch[1]) {
                const finalHtml = isContinuation
                  ? mergeContinuationHtml(baseHtmlBeforeContinuation, partialCodeMatch[1].trim())
                  : partialCodeMatch[1].trim();
                setGeneratedHtml(sanitizeGeneratedHtml(finalHtml));
                setIsWritingCode(true);
              }
            } catch (e) {}
          } else {
            // OpenAI-compatible SSE parsing
            if (trimmed.startsWith('data: ')) {
              const json = trimmed.replace('data: ', '').trim();
              if (json === '[DONE]') break;
              try {
                const parsed = JSON.parse(json);
                const token = parsed.choices?.[0]?.delta?.content || '';
                fullText += token;

                const thoughtMatch = fullText.match(/<ONI_THOUGHT>([\s\S]*?)(?:<\/ONI_THOUGHT>|$)/);
                const thought = thoughtMatch ? thoughtMatch[1].trim() : undefined;

                // Update last message in real time
                setMessages(prev => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    id: assistantId,
                    role: 'assistant',
                    content: fullText
                      .replace(/<ONI_CODE>[\s\S]*?<\/ONI_CODE>/g, '')
                      .replace(/<ONI_CODE>[\s\S]*/g, '')
                      .replace(/<ONI_THOUGHT>[\s\S]*?<\/ONI_THOUGHT>/g, '')
                      .replace(/<ONI_THOUGHT>[\s\S]*/g, '')
                      .trim(),
                    thought: thought,
                    rawContent: fullText
                  };
                  return updated;
                });

                // Stream partial code block into files in real-time
                const partialCodeMatch = fullText.match(/<ONI_CODE>([\s\S]*?)(?:<\/ONI_CODE>|$)/);
                if (partialCodeMatch && partialCodeMatch[1]) {
                  const finalHtml = isContinuation
                    ? mergeContinuationHtml(baseHtmlBeforeContinuation, partialCodeMatch[1].trim())
                    : partialCodeMatch[1].trim();
                  setGeneratedHtml(sanitizeGeneratedHtml(finalHtml));
                  setIsWritingCode(true);
                }
              } catch (e) {}
            }
          }
        }
      }

      setIsLoading(false);

      const { thought: finalThought, html: extractedHtml, cleanText: cleanContent } = extractThoughtAndHtml(fullText);
      if (extractedHtml) {
        const finalHtml = isContinuation
          ? mergeContinuationHtml(baseHtmlBeforeContinuation, extractedHtml)
          : extractedHtml;
        const sanitized = sanitizeGeneratedHtml(finalHtml);
        setGeneratedHtml(sanitized);
        isShowingSample.current = false; // user now has a real generated site
        setActiveFilePath("index.html");
        // Refresh credits after successful generation
        const visitorId = getOrCreateVisitorId();
        if (visitorId) {
          fetch("/api/credits", { headers: { "x-visitor-id": visitorId } })
            .then((r) => r.ok ? r.json() : null)
            .then((d) => { if (d && typeof d.credits_remaining === "number") setCreditsRemaining(d.credits_remaining); })
            .catch(() => {});

          // Save brand context to database (project_brands) if present
          if (brandContext.industry && conversationId) {
            const fields = extractBrandFields(brandContext.industry, brandContext.answers);
            fetch("/api/chat/history", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-visitor-id": visitorId,
              },
              body: JSON.stringify({
                id: conversationId,
                title: conversationTitle || "New Chat",
                messages: [...messages, userMessage],
                generatedHtml: sanitized,
              }),
            })
              .then((res) => {
                if (res.ok) {
                  fetch("/api/brands", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      projectId: conversationId,
                      industry: brandContext.industry,
                      businessName: fields.businessName,
                      location: fields.location,
                      primaryColor: fields.primaryColor,
                      secondaryColor: fields.secondaryColor,
                      tone: fields.tone,
                      customAnswers: {
                        ...brandContext.answers,
                        competitorContent: brandContext.competitorContent || '',
                        competitorTitle: brandContext.competitorTitle || '',
                      },
                    }),
                  }).catch((err) => console.error("Failed to save brand context:", err));
                }
              })
              .catch((err) => console.error("Failed to save parent chat:", err));
          }
        }
      }

      const combinedContent = finalThought ? `${finalThought}\n\n${cleanContent}`.trim() : cleanContent;

      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          id: assistantId,
          role: 'assistant',
          content: combinedContent,
          thought: finalThought,
          rawContent: fullText
        };
        return updated;
      });

      setPreviewRefreshKey((current) => current + 1);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
      setGenerating(false);
      setIsWritingCode(false);
    }
  }, [adjustHeight, generatedHtml, generating, hasStarted, isLoading, messages, isWritingCode, getActiveModel, brandContext, conversationId, conversationTitle, getCustomApiConfig]);

  // Keep the ref in sync so handleSend can always call the latest handleSendToAI
  useEffect(() => {
    handleSendToAIRef.current = handleSendToAI;
  });

  // Auto-send the prompt that came from the home page (must be after handleSend is declared)
  // Guard: don't re-fire on refresh if session already has messages
  const didAutoSend = useRef(false);
  useEffect(() => {
    // Fire immediately on forceNewSession (home page launch) or when chat is empty
    if (initialPrompt && !didAutoSend.current && (forceNewSession || messages.length === 0)) {
      didAutoSend.current = true;
      void handleSend(initialPrompt);
    } else if (initialPrompt) {
      // Mark as sent so it doesn't trigger later
      didAutoSend.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPrompt]);


  const handleRegenerate = useCallback(async () => {
    if (generating || isLoading) return;

    const lastUserMessage = [...messages].reverse().find((message) => message.role === "user");
    if (!lastUserMessage) return;

    const basePrompt = lastUserMessage.content || "Regenerate the website.";

    let finalPrompt = basePrompt;
    if (brandContext.industry && !brandContext.isCollecting && (generatedHtml || messages.length > 0)) {
      const fields = extractBrandFields(brandContext.industry, brandContext.answers);
      finalPrompt = `EXISTING BRAND:
Business: ${fields.businessName}, Industry: ${brandContext.industry}
Colors: primary=${fields.primaryColor} secondary=${fields.secondaryColor}
Tone: ${fields.tone}
Maintain this brand identity in all changes.

${basePrompt}`;
    }

    setIsLoading(true);
    setGenerating(true);
    setIsWritingCode(false);
    setEditorTab("preview");

    const assistantId = createId();
    setMessages((prev) => [...prev, { id: assistantId, role: "assistant", content: "" }]);

    try {
      const { customApiKey, customBaseUrl } = getCustomApiConfig();
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-visitor-id": getOrCreateVisitorId(),
        },
        body: JSON.stringify({
          prompt: finalPrompt,
          messages: [{ role: "user", content: finalPrompt }],
          currentHtml: isShowingSample.current ? "" : generatedHtml,
          defaultModel: getActiveModel(),
          customApiKey,
          customBaseUrl,
          brandAnswers: brandContext.industry && !brandContext.isCollecting 
            ? extractBrandFields(brandContext.industry, brandContext.answers) 
            : undefined,
          industry: brandContext.industry || undefined,
        }),
      });

      if (!response.ok) {
        const status = response.status;
        let errorContent: string;
        if (status === 402) {
          errorContent = "__OUT_OF_CREDITS__";
          setCreditsRemaining(0);
        } else {
          const errorText = await response.text();
          console.error('API error:', errorText);
          errorContent = `Sorry, there was an error: ${errorText || response.statusText}`;
        }
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            id: assistantId,
            role: 'assistant',
            content: errorContent,
          };
          return updated;
        });
        return;
      }

      if (!response.body) {
        setIsLoading(false);
        setGenerating(false);
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed) continue;

          // Detect Ollama vs OpenAI-compatible SSE
          const isOllamaChunk = trimmed.startsWith('{') && !trimmed.startsWith('data: ');

          if (isOllamaChunk) {
            try {
              const parsed = JSON.parse(trimmed);
              const token = parsed.message?.content || '';
              fullText += token;

              const thoughtMatch = fullText.match(/<ONI_THOUGHT>([\s\S]*?)(?:<\/ONI_THOUGHT>|$)/);
              const thought = thoughtMatch ? thoughtMatch[1].trim() : undefined;

              // Update last message in real time
              setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  id: assistantId,
                  role: 'assistant',
                  content: fullText
                    .replace(/<ONI_CODE>[\s\S]*?<\/ONI_CODE>/g, '')
                    .replace(/<ONI_CODE>[\s\S]*/g, '')
                    .replace(/<ONI_THOUGHT>[\s\S]*?<\/ONI_THOUGHT>/g, '')
                    .replace(/<ONI_THOUGHT>[\s\S]*/g, '')
                    .trim(),
                  thought: thought,
                  rawContent: fullText
                };
                return updated;
              });

              // Stream partial code block into files in real-time
              const partialCodeMatch = fullText.match(/<ONI_CODE>([\s\S]*?)(?:<\/ONI_CODE>|$)/);
              if (partialCodeMatch && partialCodeMatch[1]) {
                setGeneratedHtml(sanitizeGeneratedHtml(partialCodeMatch[1].trim()));
                setIsWritingCode(true);
              }
            } catch (e) {}
          } else {
            // OpenAI-compatible SSE parsing
            if (trimmed.startsWith('data: ')) {
              const json = trimmed.replace('data: ', '').trim();
              if (json === '[DONE]') break;
              try {
                const parsed = JSON.parse(json);
                const token = parsed.choices?.[0]?.delta?.content || '';
                fullText += token;

                const thoughtMatch = fullText.match(/<ONI_THOUGHT>([\s\S]*?)(?:<\/ONI_THOUGHT>|$)/);
                const thought = thoughtMatch ? thoughtMatch[1].trim() : undefined;

                // Update last message in real time
                setMessages(prev => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    id: assistantId,
                    role: 'assistant',
                    content: fullText
                      .replace(/<ONI_CODE>[\s\S]*?<\/ONI_CODE>/g, '')
                      .replace(/<ONI_CODE>[\s\S]*/g, '')
                      .replace(/<ONI_THOUGHT>[\s\S]*?<\/ONI_THOUGHT>/g, '')
                      .replace(/<ONI_THOUGHT>[\s\S]*/g, '')
                      .trim(),
                    thought: thought,
                    rawContent: fullText
                  };
                  return updated;
                });

                // Stream partial code block into files in real-time
                const partialCodeMatch = fullText.match(/<ONI_CODE>([\s\S]*?)(?:<\/ONI_CODE>|$)/);
                if (partialCodeMatch && partialCodeMatch[1]) {
                  setGeneratedHtml(sanitizeGeneratedHtml(partialCodeMatch[1].trim()));
                  setIsWritingCode(true);
                }
              } catch (e) {}
            }
          }
        }
      }

      setIsLoading(false);

      const { thought: finalThought, html: extractedHtml, cleanText: cleanContent } = extractThoughtAndHtml(fullText);
      if (extractedHtml) {
        const sanitized = sanitizeGeneratedHtml(extractedHtml);
        setGeneratedHtml(sanitized);
        isShowingSample.current = false;
        setActiveFilePath("index.html");
      }

      const combinedContent = finalThought ? `${finalThought}\n\n${cleanContent}`.trim() : cleanContent;

      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          id: assistantId,
          role: 'assistant',
          content: combinedContent,
          thought: finalThought,
          rawContent: fullText
        };
        return updated;
      });

      setPreviewRefreshKey((current) => current + 1);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
      setGenerating(false);
      setIsWritingCode(false);
    }
  }, [generating, isLoading, messages, generatedHtml, isWritingCode, brandContext, getActiveModel, getCustomApiConfig]);

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if ((event.key === "Enter" || event.keyCode === 13) && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      void handleSend();
    }
  };

  const handlePaste = (event: ClipboardEvent<HTMLTextAreaElement>) => {
    const files = Array.from(event.clipboardData.files);
    if (files.length === 0) return;

    event.preventDefault();
    void addFilesFromList(files);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    if (event.dataTransfer.files.length > 0) {
      void addFilesFromList(event.dataTransfer.files);
    }
  };

  const handleImageInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files?.[0];
    if (imageFile) {
      setImageFromFile(imageFile);
    }
    event.target.value = "";
  };

  const handleCopyText = useCallback(
    async (text: string) => {
      await navigator.clipboard.writeText(text);
      showToast("Copied to clipboard");
    },
    [showToast]
  );

  const handleDownloadZip = useCallback(async () => {
    showToast("Preparing your files...");
    await wait(450);

    const zipBlob = createZipBlob(projectFiles);
    const url = URL.createObjectURL(zipBlob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "oni-project.zip";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast("Download ready!");
  }, [projectFiles, showToast]);

  const handleOpenPreview = useCallback(() => {
    const blob = new Blob([previewHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank", "noopener,noreferrer");
    window.setTimeout(() => URL.revokeObjectURL(url), 60000);
  }, [previewHtml]);

  const handlePublish = () => {
    showToast("Publishing preview...");
    window.setTimeout(() => showToast("Preview published"), 700);
  };

  // Wrapper layout
  return (
    <div className={hideSidebar ? "h-full overflow-hidden bg-surface font-sans text-text-primary flex" : "h-screen overflow-hidden bg-surface font-sans text-text-primary animate-[pageFadeIn_900ms_cubic-bezier(0.16,1,0.3,1)] flex"}>

      {/* ── Inline Push Navigation Sidebar ── */}
      {!hideSidebar && (
      <aside
        className={cn(
          "h-full shrink-0 flex flex-col bg-surface-container-lowest/70 backdrop-blur-md border-r border-surface-container-high transition-all duration-300 overflow-hidden",
          navOpen ? "w-[240px]" : "w-0"
        )}
      >
        {/* Sidebar Header */}
        <div className="h-14 flex items-center justify-between px-4 shrink-0 border-b border-surface-container-high">
          <span className="text-base font-semibold tracking-tight text-text-primary whitespace-nowrap">Oni</span>
          <button
            type="button"
            onClick={() => setNavOpen(false)}
            aria-label="Close sidebar"
            className="flex h-7 w-7 items-center justify-center rounded-lg text-text-secondary hover:bg-surface-container hover:text-primary transition-colors shrink-0"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Sidebar Body */}
        <div className="flex-1 overflow-y-auto px-2 py-3 flex flex-col gap-0.5">
          {/* New Chat */}
          <a
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-text-primary hover:bg-surface-container transition-colors group whitespace-nowrap"
          >
            <PlusCircle className="h-4 w-4 text-text-secondary group-hover:text-primary transition-colors shrink-0" />
            New Chat
          </a>

          {/* Nav items */}
          {[
            { label: "Chats", href: "/", icon: <MessageSquare className="h-4 w-4" /> },
            { label: "Projects", href: "#", icon: <Folder className="h-4 w-4" /> },
            { label: "Templates", href: "/#templates", icon: <LayoutGrid className="h-4 w-4" /> },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                if (item.href.startsWith("/#")) {
                  e.preventDefault();
                  window.location.href = item.href;
                }
              }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-text-secondary hover:text-primary hover:bg-surface-container transition-colors group whitespace-nowrap"
            >
              <span className="text-text-tertiary group-hover:text-primary transition-colors shrink-0">{item.icon}</span>
              {item.label}
            </a>
          ))}
          {/* Recents */}
          <div className="mt-5 mb-1.5 px-3 flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-text-tertiary whitespace-nowrap relative">
            <span>Recents</span>
            <button
              type="button"
              onClick={() => setShowSortMenu(!showSortMenu)}
              className="text-text-secondary hover:text-primary transition-colors cursor-pointer flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-[12px] leading-none select-none">tune</span>
            </button>
            {showSortMenu && (
              <>
                <div
                  className="fixed inset-0 z-40 cursor-default"
                  onClick={() => setShowSortMenu(false)}
                />
                <div className="absolute right-3 top-full mt-1 w-40 bg-surface border border-surface-container-high rounded-lg shadow-lg py-1.5 z-50 flex flex-col text-left normal-case tracking-normal">
                  <div className="px-2.5 py-1 text-[9px] font-bold text-text-tertiary uppercase tracking-wider border-b border-surface-container-high mb-1">
                    Sort chats by
                  </div>
                  {[
                    { id: "date_desc", label: "Newest Modified" },
                    { id: "date_asc", label: "Oldest Modified" },
                    { id: "name_asc", label: "Name A-Z" },
                    { id: "name_desc", label: "Name Z-A" },
                  ].map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => {
                        setSortMethod(option.id);
                        localStorage.setItem("oni_recent_sort", option.id);
                        window.dispatchEvent(new Event("oni_sort_change"));
                        setShowSortMenu(false);
                      }}
                      className="w-full px-2.5 py-1 text-left text-xs text-text-primary hover:bg-surface-container hover:text-primary flex items-center justify-between transition-colors cursor-pointer font-normal"
                    >
                      <span>{option.label}</span>
                      {sortMethod === option.id && (
                        <span className="material-symbols-outlined text-[12px] text-text-primary">check</span>
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
          {sortedRecentChats.length === 0 ? (
            <div className="px-3 py-2 text-xs text-white/25 italic whitespace-nowrap">No recent chats</div>
          ) : (
            sortedRecentChats.map((chat) => {
              const isActive = chat.id === conversationId;
              return (
                <div
                  key={chat.id}
                  className={cn(
                    "group relative w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors text-left",
                    isActive
                      ? "bg-surface-container text-text-primary font-medium"
                      : "text-text-secondary hover:bg-surface-container-low hover:text-text-primary"
                  )}
                >
                  <div
                    onClick={() => {
                      try {
                        const rawChat = localStorage.getItem(`oni_chat_${chat.id}`);
                        if (rawChat) {
                          sessionStorage.setItem("oni_session", rawChat);
                        } else {
                          sessionStorage.setItem("oni_session", JSON.stringify({ id: chat.id, messages: [] }));
                        }
                      } catch { /* ignore */ }
                      window.location.href = `/chat?id=${chat.id}`;
                    }}
                    className="flex-1 min-w-0 flex items-center gap-2 cursor-pointer"
                  >
                    <MessageSquare className={cn("h-3.5 w-3.5 shrink-0", isActive ? "text-primary" : "text-text-tertiary group-hover:text-text-secondary")} />
                    {pinnedChatsList.includes(chat.id) && (
                      <span className="material-symbols-outlined text-[12px] text-text-secondary rotate-45 shrink-0">push_pin</span>
                    )}
                    <span className="truncate text-xs leading-snug">{chat.title}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => togglePin(chat.id)}
                    className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-surface-container transition-opacity transition-colors cursor-pointer text-text-tertiary hover:text-primary flex items-center justify-center shrink-0"
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      {pinnedChatsList.includes(chat.id) ? "pin_drop" : "push_pin"}
                    </span>
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-surface-container-high shrink-0">
          <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-surface-container transition-colors cursor-pointer">
            <div className="h-8 w-8 rounded-full bg-surface-container-high border border-surface-container-highest flex items-center justify-center text-xs font-semibold text-text-secondary shrink-0">
              {oniSettings.displayName
                ?.split(/\s+/)
                .filter(Boolean)
                .slice(0, 2)
                .map((part) => part[0]?.toUpperCase() ?? "")
                .join("") || "OU"}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-medium text-text-primary leading-tight truncate">{oniSettings.displayName}</span>
              <span className="text-xs text-text-tertiary capitalize">{oniSettings.billingPlan} plan</span>
            </div>
          </div>
        </div>
      </aside>
      )}

      {/* ── Main content (chat + workspace) ── */}
      <div className="flex flex-1 min-w-0 h-full min-h-0 flex-col pb-16 lg:flex-row lg:pb-0">
        <section
          className={cn(
            "min-h-0 flex-col border-surface-container-high bg-surface lg:flex transition-all duration-300",
            generatedHtml
              ? "lg:w-[500px] lg:shrink-0 lg:border-r"
              : "lg:w-full lg:flex-1",
            mobilePanel === "chat" ? "flex flex-1" : "hidden lg:flex",
            generatedHtml && !chatPanelOpen && "lg:!w-0 lg:!flex-none lg:!overflow-hidden lg:!border-0"
          )}
        >
          <ChatPanel
            value={input}
            messages={messages}
            attachedImage={attachedImage}
            attachedFiles={attachedFiles}
            isGenerating={generating}
            isListening={isListening}
            isEnhancing={isEnhancing}
            isLoading={isLoading}
            isDragging={isDragging}
            textareaRef={textareaRef}
            fileInputRef={fileInputRef}
            imageInputRef={imageInputRef}
            onValueChange={(nextValue) => {
              setInput(nextValue);
              adjustHeight();
            }}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            onSend={() => { void handleSend(); }}
            onDrop={handleDrop}
            onDragOver={(event) => {
              event.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onFileInputChange={handleFileInputChange}
            onFileButtonClick={() => fileInputRef.current?.click()}
            onImageInputChange={handleImageInputChange}
            onImageButtonClick={() => imageInputRef.current?.click()}
            onVoiceInput={handleVoiceInput}
            onEnhancePrompt={handleEnhancePrompt}
            onRemoveFile={removeAttachedFile}
            onRemoveImage={removeAttachedImage}
            onCopy={handleCopyText}
            onRegenerate={() => { void handleRegenerate(); }}
            messagesEndRef={messagesEndRef}
            onToggleSidebar={() => setNavOpen((v) => !v)}
            sidebarOpen={navOpen}
            hideSidebar={hideSidebar}
            hasWebsite={Boolean(generatedHtml)}
            chatFont={oniSettings.chatFont}
            compactMode={oniSettings.compactMode}
            isWritingCode={isWritingCode}
            generatedHtml={generatedHtml}
            creditsRemaining={creditsRemaining}
            brandContext={brandContext}
            onAnswerLogo={onAnswerLogo}
            onEnhanceClick={() => setEnhanceOpen(true)}
            inlineEnhanceActive={inlineEnhanceActive}
            inlineEnhanceStep={inlineEnhanceStep}
            inlineEnhanceAnswers={inlineEnhanceAnswers}
            inlineEnhancePrompt={inlineEnhancePrompt}
            inlineEnhanceIndustry={inlineEnhanceIndustry}
            onInlineOptionSelect={handleInlineOptionSelect}
            onInlineSkip={handleInlineSkip}
            onInlineNext={handleInlineNext}
          />
        </section>

        {generatedHtml && (
          <section
            className={cn(
              "min-h-0 min-w-0 flex-1 flex-col bg-surface lg:flex",
              mobilePanel === "preview" || mobilePanel === "code" ? "flex flex-1" : "hidden lg:flex"
            )}
          >
            <WorkspacePanel
              editorTab={editorTab}
              previewSize={previewSize}
              previewHtml={previewHtml}
              previewRefreshKey={previewRefreshKey}
              isGenerating={generating}
              projectFiles={projectFiles}
              activeFile={activeFile}
              activeFilePath={activeFilePath}
              sidebarOpen={chatPanelOpen}
              onToggleSidebar={() => setChatPanelOpen((v) => !v)}
              onEditorTabChange={(tab) => {
                setEditorTab(tab);
                setMobilePanel(tab);
              }}
              onPreviewSizeChange={setPreviewSize}
              onRefreshPreview={() => setPreviewRefreshKey((current) => current + 1)}
              onPublish={handlePublish}
              onDownloadZip={() => { void handleDownloadZip(); }}
              onOpenPreview={handleOpenPreview}
              onFileSelect={setActiveFilePath}
              onCopyCode={() => { void handleCopyText(activeFile.content); }}
            />
          </section>
        )}
      </div>

      {generatedHtml && (
        <MobilePanelTabs
          activePanel={mobilePanel}
          onPanelChange={(panel) => {
            setMobilePanel(panel);
            if (panel === "preview" || panel === "code") {
              setEditorTab(panel);
            }
          }}
        />
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed right-4 bottom-4 z-50 rounded-xl border border-white/10 bg-zinc-950 bg-opacity-70 backdrop-blur-md px-4 py-3 text-sm text-white shadow-2xl shadow-black/40 toast-glass">
          {toast}
        </div>
      )}

      <EnhanceModal
        isOpen={enhanceOpen}
        onClose={() => setEnhanceOpen(false)}
        originalPrompt={input}
        onEnhanced={(enhanced) => {
          setInput(enhanced);
          setEnhanceOpen(false);
          window.requestAnimationFrame(() => adjustHeight());
        }}
      />
    </div>
  );
}



interface ChatPanelProps {
  value: string;
  messages: ChatMessage[];
  attachedImage: ImageAttachment | null;
  attachedFiles: FileAttachment[];
  isGenerating: boolean;
  isListening: boolean;
  isEnhancing: boolean;
  isLoading: boolean;
  isDragging: boolean;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  fileInputRef: RefObject<HTMLInputElement | null>;
  imageInputRef: RefObject<HTMLInputElement | null>;
  messagesEndRef: RefObject<HTMLDivElement | null>;
  onValueChange: (value: string) => void;
  onKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
  onPaste: (event: ClipboardEvent<HTMLTextAreaElement>) => void;
  onSend: () => void;
  onDrop: (event: DragEvent<HTMLDivElement>) => void;
  onDragOver: (event: DragEvent<HTMLDivElement>) => void;
  onDragLeave: () => void;
  onFileInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onFileButtonClick: () => void;
  onImageInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onImageButtonClick: () => void;
  onVoiceInput: () => void;
  onEnhancePrompt: () => void;
  onRemoveFile: (fileId: string) => void;
  onRemoveImage: () => void;
  onCopy: (text: string) => void;
  onRegenerate: () => void;
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
  hideSidebar?: boolean;
  hasWebsite: boolean;
  chatFont?: string;
  compactMode?: boolean;
  isWritingCode: boolean;
  generatedHtml: string;
  creditsRemaining: number | null;
  brandContext: BrandContext;
  onAnswerLogo: (base64?: string) => Promise<void>;
  onEnhanceClick?: () => void;
  inlineEnhanceActive: boolean;
  inlineEnhanceStep: number;
  inlineEnhanceAnswers: Record<string, string>;
  inlineEnhancePrompt: string;
  inlineEnhanceIndustry: string;
  onInlineOptionSelect: (optVal: string) => void;
  onInlineSkip: () => void;
  onInlineNext: () => void;
}

function ChatPanel({
  value,
  messages,
  attachedImage,
  attachedFiles,
  isGenerating,
  isListening,
  isEnhancing,
  isLoading,
  isDragging,
  textareaRef,
  fileInputRef,
  imageInputRef,
  messagesEndRef,
  onValueChange,
  onKeyDown,
  onPaste,
  onSend,
  onDrop,
  onDragOver,
  onDragLeave,
  onFileInputChange,
  onFileButtonClick,
  onImageInputChange,
  onImageButtonClick,
  onVoiceInput,
  onEnhancePrompt,
  onRemoveFile,
  onRemoveImage,
  onCopy,
  onRegenerate,
  onToggleSidebar,
  sidebarOpen,
  hideSidebar,
  hasWebsite,
  chatFont,
  compactMode,
  isWritingCode,
  generatedHtml,
  creditsRemaining,
  brandContext,
  onAnswerLogo,
  onEnhanceClick,
  inlineEnhanceActive,
  inlineEnhanceStep,
  inlineEnhanceAnswers,
  inlineEnhancePrompt,
  inlineEnhanceIndustry,
  onInlineOptionSelect,
  onInlineSkip,
  onInlineNext,
}: ChatPanelProps) {
  return (
    <>
      {!hideSidebar && (
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-surface-container-high bg-surface px-4">
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary hover:bg-surface-container hover:text-primary transition-colors"
        >
          {/* sidebar panel icon */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M9 3v18" />
          </svg>
        </button>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold tracking-tight text-text-secondary">Oni</span>
          {creditsRemaining !== null && (
            <a
              href="/pricing"
              title="Credits remaining this month"
              className={`flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold transition-colors ${
                creditsRemaining <= 5
                  ? "bg-red-500/15 text-red-400 hover:bg-red-500/25"
                  : creditsRemaining <= 15
                  ? "bg-amber-500/15 text-amber-400 hover:bg-amber-500/25"
                  : "bg-surface-container-high text-text-secondary hover:bg-surface-container-highest hover:text-text-primary"
              }`}
            >
              <span>⚡</span>
              <span>{creditsRemaining} credits</span>
            </a>
          )}
        </div>
      </header>
      )}

      <div className="min-h-0 flex-1 flex flex-col overflow-y-auto px-5 py-6 scrollbar-hidden bg-surface relative">
        {/* Ambient monochrome background glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-30">
          <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-white/5 to-transparent blur-[140px] mix-blend-screen animate-pulse" style={{ animationDuration: "10s" }} />
          <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-white/3 to-transparent blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: "15s" }} />
        </div>

        <div className={cn("flex flex-1 flex-col justify-end w-full relative z-10", !hasWebsite && "max-w-3xl mx-auto")}>
          {messages.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center text-center gap-8 py-12">
              <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-surface-container-high bg-surface-container-low shadow-inner">
                {/* Monochrome blur ring */}
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-white/20 via-zinc-500/10 to-white/10 opacity-30 blur-md" />
                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-surface">
                  <Laptop className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="space-y-2 max-w-sm">
                <h2 className="text-xl font-semibold tracking-tight text-text-primary">What are we building today?</h2>
                <p className="text-sm text-text-tertiary leading-relaxed">
                  Describe a site, paste a screenshot, or pick one of the suggestions to generate a fully custom build.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 max-w-xl">
                {[
                  { label: "Portfolio site", desc: "For designers & developers", icon: "✨" },
                  { label: "Restaurant landing page", desc: "With menu & bookings", icon: "🍕" },
                  { label: "SaaS dashboard", desc: "Interactive charts & data", icon: "📈" },
                  { label: "Personal blog", desc: "Clean reading layout", icon: "✍️" }
                ].map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => onValueChange(s.label)}
                    className="flex items-center gap-3 rounded-xl border border-surface-container-high bg-surface-container-low/60 hover:bg-surface-container/80 px-4 py-3 text-left transition-all hover:border-primary/50 hover:scale-[1.02] active:scale-[0.98] cursor-pointer group shadow-sm hover:shadow-md max-w-[220px]"
                  >
                    <span className="text-lg select-none">{s.icon}</span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-text-primary group-hover:text-primary transition-colors">{s.label}</p>
                      <p className="text-[10px] text-text-tertiary truncate">{s.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-end space-y-8">
              {messages.map((message, index) =>
                message.role === "user" ? (
                  <UserMessage key={message.id} message={message} chatFont={chatFont} compactMode={compactMode} />
                ) : (
                  <div key={message.id}>
                    <AssistantMessage
                      message={message}
                      chatFont={chatFont}
                      compactMode={compactMode}
                      onCopy={() => onCopy(message.content)}
                      onRegenerate={onRegenerate}
                      isStreaming={isGenerating && index === messages.length - 1}
                      isWritingCode={isWritingCode}
                      buildStatusText={isGenerating && index === messages.length - 1 && isWritingCode ? getBuildStatusText(generatedHtml) : ""}
                    />
                    {brandContext.isCollecting &&
                      index === messages.length - 1 &&
                      message.content.toLowerCase().includes("logo to upload") && (
                        <div className="mt-3 flex flex-wrap gap-3 animate-fade-in pl-8 pb-3">
                          <label className="flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/10 hover:bg-primary/20 hover:border-primary/45 px-4 py-2.5 text-xs font-bold text-primary transition-all cursor-pointer shadow-md active:scale-95">
                            <Upload className="h-4 w-4" />
                            <span>Upload Logo Image</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  try {
                                    const base64 = await fileToBase64(file);
                                    void onAnswerLogo(base64);
                                  } catch (err) {
                                    console.error("Error reading logo:", err);
                                  }
                                }
                              }}
                            />
                          </label>
                          <button
                            type="button"
                            onClick={() => { void onAnswerLogo(); }}
                            className="flex items-center gap-2 rounded-xl border border-surface-container-high bg-surface-container-low hover:bg-surface-container-high px-4 py-2.5 text-xs font-bold text-text-secondary hover:text-text-primary transition-all active:scale-95 cursor-pointer shadow-sm"
                          >
                            <SkipForward className="h-4 w-4" />
                            <span>Skip & Use Text Logo</span>
                          </button>
                        </div>
                      )}
                  </div>
                )
              )}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {inlineEnhanceActive && (
        <div className="mx-5 mb-3 rounded-2xl border border-zinc-800 bg-[#121214] p-5 text-sm text-white shadow-2xl shadow-black/40">
          <div className="flex items-center justify-between border-b border-zinc-800/60 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-zinc-400">
                Question {inlineEnhanceStep + 1} of {QUESTIONS[inlineEnhanceIndustry]?.length || QUESTIONS.general.length}
              </span>
              <span className="text-[10px] rounded-full bg-zinc-850 border border-zinc-800 px-2.5 py-0.5 text-zinc-400 uppercase font-medium tracking-wider">
                {inlineEnhanceIndustry}
              </span>
            </div>
            <button 
              type="button" 
              onClick={onInlineSkip} 
              className="text-zinc-500 hover:text-white transition-colors text-lg font-medium p-1 leading-none"
            >
              ×
            </button>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-zinc-100 leading-relaxed">
              {QUESTIONS[inlineEnhanceIndustry]?.[inlineEnhanceStep]?.question || QUESTIONS.general[inlineEnhanceStep]?.question}
            </h3>

            {/* Options list */}
            {QUESTIONS[inlineEnhanceIndustry]?.[inlineEnhanceStep]?.options && (
              <div className="flex flex-col gap-2">
                {QUESTIONS[inlineEnhanceIndustry][inlineEnhanceStep].options.map((opt, idx) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => onInlineOptionSelect(opt)}
                    className="flex w-full items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-850 px-4 py-3 text-left transition-all hover:border-zinc-700 active:scale-[0.98] cursor-pointer"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-[10px] font-bold text-zinc-400">
                      {idx + 1}
                    </span>
                    <span className="text-zinc-200 text-xs font-medium">{opt}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={onInlineSkip}
                className="rounded-xl border border-zinc-850 bg-zinc-900/40 hover:bg-zinc-850 px-4 py-2 text-xs font-bold text-zinc-400 hover:text-white transition-all cursor-pointer"
              >
                Skip
              </button>
              
              {!QUESTIONS[inlineEnhanceIndustry]?.[inlineEnhanceStep]?.options && (
                <button
                  type="button"
                  onClick={onInlineNext}
                  disabled={!value.trim() && !QUESTIONS[inlineEnhanceIndustry]?.[inlineEnhanceStep]?.optional}
                  className={cn(
                    "rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer",
                    (value.trim() || QUESTIONS[inlineEnhanceIndustry]?.[inlineEnhanceStep]?.optional)
                      ? "bg-white text-black hover:bg-zinc-200"
                      : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                  )}
                >
                  {inlineEnhanceStep + 1 >= (QUESTIONS[inlineEnhanceIndustry]?.length || QUESTIONS.general.length)
                    ? "Build Website →"
                    : "Next →"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="shrink-0 bg-surface px-5 pb-5 pt-2">
        <div className={cn("w-full", !hasWebsite && "max-w-3xl mx-auto")}>
          <ChatComposer
            inlineEnhanceActive={inlineEnhanceActive}
            value={value}
            attachedImage={attachedImage}
            attachedFiles={attachedFiles}
            isGenerating={isGenerating}
            isListening={isListening}
            isEnhancing={isEnhancing}
            isDragging={isDragging}
            textareaRef={textareaRef}
            fileInputRef={fileInputRef}
            imageInputRef={imageInputRef}
            onValueChange={onValueChange}
            onKeyDown={onKeyDown}
            onPaste={onPaste}
            onSend={onSend}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onFileInputChange={onFileInputChange}
            onFileButtonClick={onFileButtonClick}
            onImageInputChange={onImageInputChange}
            onImageButtonClick={onImageButtonClick}
            onVoiceInput={onVoiceInput}
            onEnhancePrompt={onEnhancePrompt}
            onRemoveFile={onRemoveFile}
            onRemoveImage={onRemoveImage}
            hasWebsite={hasWebsite}
            onEnhanceClick={onEnhanceClick}
          />
        </div>
      </div>
    </>
  );
}

function UserMessage({ message, chatFont, compactMode }: { message: ChatMessage; chatFont?: string; compactMode?: boolean }) {
  const fontStyle = chatFont === "monospace"
    ? { fontFamily: "var(--font-geist-mono), monospace" }
    : chatFont === "serif"
    ? { fontFamily: "var(--font-serif), serif" }
    : { fontFamily: "var(--font-sans), sans-serif" };

  const paddingClass = compactMode ? "px-3 py-1.5 text-xs leading-5" : "px-4 py-2.5 text-sm leading-6";

  return (
    <div className="flex animate-[fadeSlideUp_800ms_cubic-bezier(0.16,1,0.3,1)] justify-end">
      <div className="flex max-w-[82%] flex-col items-end gap-2">
        {message.image && (
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/10 p-1">
            <Image
              src={message.image.url}
              alt={message.image.name}
              width={260}
              height={180}
              unoptimized
              className="max-h-56 w-auto rounded-xl object-cover"
            />
          </div>
        )}
        {message.files && message.files.length > 0 && (
          <div className="flex max-w-full flex-col items-end gap-1.5">
            {message.files.map((file) => (
              <div
                key={file.id}
                className="flex max-w-[260px] items-center gap-2 rounded-xl border border-white/10 bg-white/8 px-3 py-2 text-left"
              >
                <FileText className="h-4 w-4 shrink-0 text-white/55" />
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium text-white/80">{file.name}</p>
                  <p className="text-[11px] text-white/35">{formatBytes(file.size)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        {message.content && (
          <div
            style={fontStyle}
            className={cn(
              "rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent hover:border-white/20 transition-all text-text-primary shadow-md",
              paddingClass
            )}
          >
            {getCleanUserMessageContent(message.content)}
          </div>
        )}
      </div>
    </div>
  );
}

function AnimatedStreamText({
  text,
  fontStyle,
  className,
}: {
  text: string;
  fontStyle: React.CSSProperties;
  className: string;
}) {
  const [displayedText, setDisplayedText] = useState("");
  const currentTextRef = useRef("");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (text.length <= currentTextRef.current.length) {
      currentTextRef.current = text;
      setDisplayedText(text);
      return;
    }

    const targetText = text;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      const currentLen = currentTextRef.current.length;
      if (currentLen < targetText.length) {
        const nextChunk = targetText.slice(currentLen, currentLen + 3);
        currentTextRef.current += nextChunk;
        setDisplayedText(currentTextRef.current);
      } else {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
    }, 15);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [text]);

  const isFinished = displayedText.length === text.length;

  return (
    <p style={fontStyle} className={className}>
      {displayedText}
      {!isFinished && (
        <span className="inline-block w-1.5 h-3.5 ml-0.5 bg-primary/75 animate-[pulse_0.8s_infinite] align-middle" />
      )}
    </p>
  );
}

interface InteractiveDesignPlanProps {
  thoughtText: string;
  generatedHtml?: string;
  isStreaming?: boolean;
  isWritingCode?: boolean;
}

function InteractiveDesignPlan({
  thoughtText,
  generatedHtml = "",
  isStreaming = false,
  isWritingCode = false,
}: InteractiveDesignPlanProps) {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  // Parse the thoughtText
  const parsed = parseThought(thoughtText);

  // Check which sections are built based on generatedHtml
  const checkSectionBuilt = (sectionName: string) => {
    if (!isStreaming && !isWritingCode) return true; // All done when streaming completes
    if (!generatedHtml) return false;
    
    const cleanId = sectionName.toLowerCase().trim().replace(/[^a-z0-9]/g, '');
    
    const regexPatterns = [
      new RegExp(`id=["']${cleanId}["']`, 'i'),
      new RegExp(`class=["'][^"']*${cleanId}[^"']*["']`, 'i'),
      new RegExp(`id=["'][^"']*${cleanId}[^"']*["']`, 'i'),
      new RegExp(`<section[^>]*${cleanId}`, 'i')
    ];
    
    return regexPatterns.some(r => r.test(generatedHtml));
  };

  const sectionsStatus = parsed.sections.map((section, idx) => {
    const isBuilt = checkSectionBuilt(section);
    return { name: section, isBuilt };
  });

  // Find the active section (the first non-built one if we are writing code)
  let activeIndex = -1;
  if (isWritingCode) {
    activeIndex = sectionsStatus.findIndex(s => !s.isBuilt);
  }

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  // If there's no thought text at all yet, show a starting loader
  if (!thoughtText.trim()) {
    return (
      <div className="bg-surface-container-low/40 border border-surface-container-high/50 rounded-2xl p-4 mt-2 backdrop-blur-sm animate-[pulse_2s_infinite] max-w-xl">
        <div className="flex items-center gap-3">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
          <span className="text-sm font-semibold text-text-primary">Oni Design Engine is planning your website...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface-container-low/60 border border-surface-container-high/60 rounded-2xl p-4 mt-3 max-w-2xl shadow-xl backdrop-blur-md overflow-hidden relative group transition-all duration-300 hover:border-primary/30">
      {/* Glow Effect */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-surface-container-high/50 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-1.5 rounded-lg text-primary">
            <Sparkles className="h-4 w-4 animate-pulse" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-text-primary tracking-wider uppercase">Oni Design Engine</h4>
            <p className="text-[10px] text-text-tertiary">Real-time design synthesis</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className={cn(
              "absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping",
              isStreaming ? "bg-primary" : "bg-emerald-500"
            )}></span>
            <span className={cn(
              "relative inline-flex rounded-full h-2 w-2",
              isStreaming ? "bg-primary" : "bg-emerald-500"
            )}></span>
          </span>
          <span className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider">
            {isStreaming ? "Synthesizing" : "Ready"}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {/* Color Palette */}
        {parsed.colors.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-text-secondary">
              <Palette className="h-3.5 w-3.5 text-primary/80" />
              <span>Color Palette {parsed.paletteName ? `— ${parsed.paletteName}` : ''}</span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {parsed.colors.map((color, idx) => (
                <button
                  key={idx}
                  onClick={() => copyToClipboard(color)}
                  className="flex items-center gap-1.5 bg-surface/50 border border-surface-container-high hover:border-primary/40 rounded-full pl-1.5 pr-3 py-1 text-[11px] font-medium transition-all hover:scale-105 active:scale-95 group/swatch"
                  title="Click to copy hex code"
                >
                  <span
                    className="h-3.5 w-3.5 rounded-full border border-black/10 shadow-sm"
                    style={{ backgroundColor: color }}
                  />
                  <span className="font-mono text-text-secondary group-hover/swatch:text-primary">{color}</span>
                  {copiedColor === color ? (
                    <span className="text-[9px] text-emerald-500 font-semibold ml-1">Copied!</span>
                  ) : (
                    <Copy className="h-2.5 w-2.5 text-text-tertiary group-hover/swatch:text-primary ml-1 opacity-0 group-hover/swatch:opacity-100 transition-opacity" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Typography */}
        {(parsed.displayFont || parsed.bodyFont) && (
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-text-secondary">
              <Type className="h-3.5 w-3.5 text-primary/80" />
              <span>Typography Pairing</span>
            </div>
            <div className="grid grid-cols-2 gap-3 bg-surface/30 border border-surface-container-high/40 rounded-xl p-2.5">
              {parsed.displayFont && (
                <div className="border-r border-surface-container-high/50 pr-2">
                  <span className="text-[9px] text-text-tertiary uppercase tracking-wider block mb-1">Display / Headings</span>
                  <span className="text-xs font-bold text-text-primary block truncate" style={{ fontFamily: parsed.displayFont }}>
                    {parsed.displayFont}
                  </span>
                  <span className="text-[10px] text-text-secondary block mt-0.5" style={{ fontFamily: parsed.displayFont }}>
                    Aa Bb Cc 123
                  </span>
                </div>
              )}
              {parsed.bodyFont && (
                <div className="pl-2">
                  <span className="text-[9px] text-text-tertiary uppercase tracking-wider block mb-1">Body Text</span>
                  <span className="text-xs font-medium text-text-primary block truncate" style={{ fontFamily: parsed.bodyFont }}>
                    {parsed.bodyFont}
                  </span>
                  <span className="text-[10px] text-text-secondary block mt-0.5" style={{ fontFamily: parsed.bodyFont }}>
                    Aa Bb Cc 123
                  </span>
                </div>
              )}
            </div>
            {parsed.fontExplanation && (
              <p className="text-[10px] text-text-tertiary leading-relaxed italic px-1">
                {parsed.fontExplanation}
              </p>
            )}
          </div>
        )}

        {/* Signature & Layout Row */}
        {(parsed.signature || parsed.layout) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {parsed.signature && (
              <div className="bg-surface/30 border border-surface-container-high/40 rounded-xl p-3 space-y-1.5">
                <span className="text-[9px] text-primary uppercase font-bold tracking-wider block">Signature Element</span>
                <p className="text-[11px] text-text-secondary leading-relaxed font-medium">
                  {parsed.signature}
                </p>
              </div>
            )}
            {parsed.layout && (
              <div className="bg-surface/30 border border-surface-container-high/40 rounded-xl p-3 space-y-1.5">
                <span className="text-[9px] text-primary uppercase font-bold tracking-wider block">Layout Strategy</span>
                <p className="text-[11px] text-text-secondary leading-relaxed font-medium">
                  {parsed.layout}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Sections Checklist */}
        {parsed.sections.length > 0 && (
          <div className="space-y-2 border-t border-surface-container-high/30 pt-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-text-secondary">
              <LayoutGrid className="h-3.5 w-3.5 text-primary/80" />
              <span>Section Architecture & Construction</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {sectionsStatus.map((section, idx) => {
                const isActive = idx === activeIndex;
                const isCompleted = section.isBuilt || (!isStreaming && !isWritingCode);
                return (
                  <div
                    key={idx}
                    className={cn(
                      "flex items-center justify-between border rounded-lg px-2.5 py-1.5 text-[11px] font-medium transition-colors",
                      isCompleted
                        ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400"
                        : isActive
                        ? "bg-primary/5 border-primary/20 text-primary animate-pulse"
                        : "bg-surface/20 border-surface-container-high text-text-tertiary"
                    )}
                  >
                    <span className="capitalize">{section.name}</span>
                    {isCompleted ? (
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    ) : isActive ? (
                      <Loader2 className="h-3 w-3 animate-spin text-primary shrink-0" />
                    ) : (
                      <div className="h-1.5 w-1.5 rounded-full bg-text-tertiary/40 shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AssistantMessage({
  message,
  chatFont,
  compactMode,
  onCopy,
  onRegenerate,
  isStreaming,
  isWritingCode,
  buildStatusText,
}: {
  message: ChatMessage;
  chatFont?: string;
  compactMode?: boolean;
  onCopy: () => void;
  onRegenerate: () => void;
  isStreaming?: boolean;
  isWritingCode?: boolean;
  buildStatusText?: string;
}) {
  // thoughtOpen removed — model reasoning is never exposed to users
  const fontStyle = chatFont === "monospace"
    ? { fontFamily: "var(--font-geist-mono), monospace" }
    : chatFont === "serif"
    ? { fontFamily: "var(--font-serif), serif" }
    : { fontFamily: "var(--font-sans), sans-serif" };

  const paddingClass = compactMode ? "p-2.5" : "p-4";

  return (
    <div className={cn("group/msg animate-[fadeSlideUp_800ms_cubic-bezier(0.16,1,0.3,1)]", compactMode ? "space-y-1.5" : "space-y-2.5")}>
      <div className="flex items-center gap-2.5">
        <div className="relative flex h-6 w-6 items-center justify-center rounded-full overflow-hidden shadow-sm shadow-primary/20 select-none">
          {/* Animated spinning monochrome gradient background */}
          <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950 via-zinc-500 to-white animate-spin" style={{ animationDuration: "8s" }} />
          <span className="relative text-[10px] font-bold text-white tracking-wider">O</span>
        </div>
        <span className="text-xs text-text-secondary font-medium tracking-wide uppercase select-none">Oni</span>
      </div>

      <div className="pl-8 space-y-2">

        {message.content && (
          message.content === "__OUT_OF_CREDITS__" ? (
            <div className="relative max-w-sm rounded-2xl overflow-hidden border border-amber-500/20 bg-gradient-to-br from-surface-container-low to-surface-container-lowest shadow-xl">
              {/* Glow accent */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500/0 via-amber-400/60 to-amber-500/0" />
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 shrink-0">
                    <span className="text-lg">⚡</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-text-primary leading-tight">You&apos;ve used all 50 free credits</h3>
                    <p className="text-xs text-text-tertiary mt-0.5">Your monthly allowance has been used up.</p>
                  </div>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed mb-4">
                  Upgrade to Pro for unlimited generations, priority access, and faster models.
                </p>
                <a
                  href="/pricing"
                  className="flex items-center justify-center gap-2 w-full rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold py-2.5 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-amber-500/20"
                >
                  <span>✨</span>
                  <span>Upgrade to Pro for unlimited generations</span>
                </a>
              </div>
            </div>
          ) : isStreaming ? (
            <AnimatedStreamText
              text={message.content}
              fontStyle={fontStyle}
              className={cn("max-w-3xl whitespace-pre-wrap text-text-primary description-fade", compactMode ? "text-xs leading-6" : "text-sm leading-7")}
            />
          ) : (
            <p
              style={fontStyle}
              className={cn("max-w-3xl whitespace-pre-wrap text-text-primary description-fade", compactMode ? "text-xs leading-6" : "text-sm leading-7")}
            >
              {message.content}
            </p>
          )
        )}

        {isStreaming && isWritingCode && (
          <div className="flex flex-col gap-1.5 py-1.5 max-w-md bg-surface-container-low/40 rounded-xl border border-surface-container-high/50 px-3 mt-2 backdrop-blur-sm animate-[pulse_3s_infinite]">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-500"></span>
              </span>
              <span className="text-xs text-text-secondary font-medium">
                {buildStatusText || "Generating website code..."}
              </span>
            </div>
            <p className="text-[11px] text-text-tertiary leading-relaxed">
              Applying layout designs and CSS rules. Watch the real-time preview load on the right.
            </p>
          </div>
        )}

        {!message.content && isStreaming && (
          <div className="flex items-center gap-1.5 text-xs text-text-tertiary select-none">
            <span>Thinking</span>
            <span className="flex items-center gap-1">
              {[0, 1, 2].map((dot) => (
                <span
                  key={dot}
                  className="h-1.5 w-1.5 rounded-full bg-text-tertiary/60 animate-pulse"
                  style={{ animationDelay: `${dot * 140}ms` }}
                />
              ))}
            </span>
          </div>
        )}

        {!message.content && !isStreaming && (
          <p className="text-sm text-text-tertiary italic">
            Website generated successfully. Preview loaded on the right.
          </p>
        )}

        <div className="flex items-center justify-between mt-2 pt-1 opacity-0 group-hover/msg:opacity-100 transition-opacity duration-200">
          <div className="flex items-center gap-1">
            <IconButton label="Copy response" onClick={onCopy}>
              <Copy className="h-3.5 w-3.5" />
            </IconButton>
            <IconButton label="Regenerate response" onClick={onRegenerate}>
              <RotateCcw className="h-3.5 w-3.5" />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}

function AssistantThinking() {
  return (
    <div className="animate-[fadeSlideUp_600ms_cubic-bezier(0.16,1,0.3,1)]">
      <span className="text-xs text-white/35">Oni</span>
      <div className="mt-2 flex items-center gap-2 text-sm text-white/55">
        <span>thinking</span>
        <span className="flex items-center gap-1">
          {[0, 1, 2].map((dot) => (
            <span
              key={dot}
              className="h-1.5 w-1.5 rounded-full bg-white/55 animate-pulse"
              style={{ animationDelay: `${dot * 140}ms` }}
            />
          ))}
        </span>
      </div>
    </div>
  );
}

type ChatComposerProps = {
  value: string;
  attachedImage: ImageAttachment | null;
  attachedFiles: FileAttachment[];
  isGenerating: boolean;
  isListening: boolean;
  isEnhancing: boolean;
  isDragging: boolean;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  fileInputRef: RefObject<HTMLInputElement | null>;
  imageInputRef: RefObject<HTMLInputElement | null>;
  onValueChange: (value: string) => void;
  onKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
  onPaste: (event: ClipboardEvent<HTMLTextAreaElement>) => void;
  onSend: () => void;
  onDrop: (event: DragEvent<HTMLDivElement>) => void;
  onDragOver: (event: DragEvent<HTMLDivElement>) => void;
  onDragLeave: () => void;
  onFileInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onFileButtonClick: () => void;
  onImageInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onImageButtonClick: () => void;
  onVoiceInput: () => void;
  onEnhancePrompt: () => void;
  onRemoveFile: (fileId: string) => void;
  onRemoveImage: () => void;
  hasWebsite?: boolean;
  onEnhanceClick?: () => void;
  inlineEnhanceActive?: boolean;
};

function ChatComposer({
  value,
  attachedImage,
  attachedFiles,
  isGenerating,
  isListening,
  isEnhancing,
  isDragging,
  textareaRef,
  fileInputRef,
  imageInputRef,
  onValueChange,
  onKeyDown,
  onPaste,
  onSend,
  onDrop,
  onDragOver,
  onDragLeave,
  onFileInputChange,
  onFileButtonClick,
  onImageInputChange,
  onImageButtonClick,
  onVoiceInput,
  onEnhancePrompt,
  onRemoveFile,
  onRemoveImage,
  hasWebsite,
  onEnhanceClick,
  inlineEnhanceActive,
}: ChatComposerProps) {
  const canSend = Boolean(value.trim() || attachedImage || attachedFiles.length > 0) && !isGenerating;

  return (
    <motion.div
      layoutId="composer-container"
      transition={{ type: "spring", stiffness: 450, damping: 40 }}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      className={cn(
        "rounded-2xl border border-surface-container-high bg-surface-container-low/60 backdrop-blur-md transition-[border-color,box-shadow,background-color] duration-300 shadow-lg focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20",
        isDragging && "border-primary/30 bg-primary/5"
      )}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPTED_DOCUMENT_TYPES}
        multiple
        className="hidden"
        onChange={onFileInputChange}
      />
      <input
        ref={imageInputRef}
        type="file"
        accept={ACCEPTED_IMAGE_TYPES}
        className="hidden"
        onChange={onImageInputChange}
      />

      {(attachedImage || attachedFiles.length > 0) && (
        <div className="border-b border-surface-container-high px-3 pt-3">
          <div className="mb-3 flex flex-wrap gap-2">
            {attachedImage && (
              <div className="relative inline-flex overflow-hidden rounded-lg border border-surface-container-high bg-surface-container-lowest">
                <Image
                  src={attachedImage.url}
                  alt={attachedImage.name}
                  width={128}
                  height={80}
                  unoptimized
                  className="max-h-20 w-auto object-cover"
                />
                <button
                  type="button"
                  onClick={onRemoveImage}
                  className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/75 text-white transition-colors duration-200 ease-in-out hover:bg-white hover:text-black"
                  aria-label="Remove image"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
            {attachedFiles.map((file) => (
              <div
                key={file.id}
                className="flex max-w-full items-start gap-2 rounded-lg border border-surface-container-high bg-surface-container-lowest px-3 py-2"
              >
                <FileText className="mt-0.5 h-4 w-4 shrink-0 text-text-secondary" />
                <div className="min-w-0">
                  <p className="max-w-[220px] truncate text-xs font-medium text-text-primary">{file.name}</p>
                  <p className="text-[11px] text-text-tertiary">
                    {formatBytes(file.size)}
                    {file.content ? " read" : file.note ? " metadata only" : ""}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onRemoveFile(file.id)}
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-text-secondary hover:bg-surface-container hover:text-primary transition-colors"
                  aria-label={`Remove ${file.name}`}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-end gap-3 px-4 py-3">
        <div className="flex shrink-0 items-center gap-1.5 pb-1">
          <IconButton label="Attach file" onClick={onFileButtonClick}>
            <Paperclip className="h-4 w-4" />
          </IconButton>
          <IconButton label="Upload image" onClick={onImageButtonClick}>
            <ImageIcon className="h-4 w-4" />
          </IconButton>
        </div>

        <textarea
          ref={textareaRef}
          value={value}
          onChange={(event) => onValueChange(event.target.value)}
          onKeyDown={onKeyDown}
          onPaste={onPaste}
          placeholder={inlineEnhanceActive ? "Or reply directly..." : "Write a message..."}
          className="min-h-[36px] flex-1 resize-none border-none bg-transparent px-0 py-1.5 text-sm leading-6 text-primary placeholder:text-text-tertiary focus:ring-0 focus:outline-none"
          style={{ overflow: "hidden" }}
        />

        <div className="flex items-center gap-2 shrink-0 pb-1">

          <div className="flex flex-col items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={onSend}
            disabled={!canSend}
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-200 ease-in-out cursor-pointer",
              canSend ? "bg-primary text-primary-foreground hover:opacity-90" : "cursor-not-allowed bg-surface-container text-text-secondary opacity-40"
            )}
            aria-label="Send message"
          >
            {isGenerating ? (
              <svg className="spinner h-4 w-4" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.25" />
                <path d="M12 2 a10 10 0 0 1 0 20" stroke="currentColor" strokeWidth="4" />
              </svg>
            ) : (
              <ArrowUpIcon className="h-4 w-4" />
            )}
          </button>
          <button
            type="button"
            onClick={onVoiceInput}
            disabled={isGenerating}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200 ease-in-out cursor-pointer",
              isListening
                ? "bg-red-500 text-white hover:bg-red-400"
                : "bg-surface-container text-text-secondary hover:bg-surface-container-high hover:text-primary",
              isGenerating && "cursor-not-allowed opacity-30"
            )}
            aria-label={isListening ? "Stop voice input" : "Voice input"}
            title={isListening ? "Stop voice input" : "Voice input"}
          >
            <Mic className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onEnhancePrompt}
            disabled={isGenerating || isEnhancing || value.trim().length < 3}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200 ease-in-out cursor-pointer",
              isEnhancing
                ? "bg-primary text-primary-foreground"
                : "bg-surface-container text-text-secondary hover:bg-surface-container-high hover:text-primary",
              (isGenerating || isEnhancing || value.trim().length < 3) && "cursor-not-allowed opacity-30"
            )}
            aria-label="Enhance prompt"
            title="Enhance prompt"
          >
            {isEnhancing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
      </div>
    </motion.div>
  );
}

type WorkspacePanelProps = {
  editorTab: EditorTab;
  previewSize: PreviewSize;
  previewHtml: string;
  previewRefreshKey: number;
  isGenerating: boolean;
  projectFiles: ProjectFile[];
  activeFile: ProjectFile;
  activeFilePath: string;
  onEditorTabChange: (tab: EditorTab) => void;
  onPreviewSizeChange: (size: PreviewSize) => void;
  onRefreshPreview: () => void;
  onPublish: () => void;
  onDownloadZip: () => void;
  onOpenPreview: () => void;
  onFileSelect: (path: string) => void;
  onCopyCode: (content: string) => void;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
};

function WorkspacePanel({
  editorTab,
  previewSize,
  previewHtml,
  previewRefreshKey,
  isGenerating,
  projectFiles,
  activeFile,
  activeFilePath,
  onEditorTabChange,
  onPreviewSizeChange,
  onRefreshPreview,
  onPublish,
  onDownloadZip,
  onOpenPreview,
  onFileSelect,
  onCopyCode,
  sidebarOpen,
  onToggleSidebar,
}: WorkspacePanelProps) {
  return (
    <>
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-white/10 px-4">
        <div className="flex h-full items-center gap-1">
          {/* Open sidebar button — only shows when sidebar is collapsed */}
          {!sidebarOpen && (
            <button
              type="button"
              onClick={onToggleSidebar}
              aria-label="Open sidebar"
              className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg text-white/40 hover:bg-white/8 hover:text-white transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M9 3v18" />
              </svg>
            </button>
          )}
          <TabButton active={editorTab === "preview"} onClick={() => onEditorTabChange("preview")}>
            <Eye className="h-4 w-4" />
            Preview
          </TabButton>
          <TabButton active={editorTab === "code"} onClick={() => onEditorTabChange("code")}>
            <Code2 className="h-4 w-4" />
            Code
          </TabButton>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPublish}
            className="rounded-lg bg-white px-3 py-2 text-sm font-medium text-black transition-colors duration-200 ease-in-out hover:bg-white/90"
          >
            Publish
          </button>
          <button
            type="button"
            onClick={onDownloadZip}
            className="hidden rounded-lg border border-white/20 px-3 py-2 text-sm text-white/80 transition-colors duration-200 ease-in-out hover:bg-white/10 hover:text-white sm:inline-flex"
          >
            <Download className="mr-2 h-4 w-4" />
            Download ZIP
          </button>
          <IconButton label="Open preview" onClick={onOpenPreview}>
            <ExternalLink className="h-4 w-4" />
          </IconButton>
        </div>
      </div>

      <div className="min-h-0 min-w-0 flex-1 overflow-hidden">
        {editorTab === "preview" ? (
          <PreviewTab
            previewSize={previewSize}
            previewHtml={previewHtml}
            previewRefreshKey={previewRefreshKey}
            isGenerating={isGenerating}
            onPreviewSizeChange={onPreviewSizeChange}
            onRefreshPreview={onRefreshPreview}
          />
        ) : (
          <CodeTab
            projectFiles={projectFiles}
            activeFile={activeFile}
            activeFilePath={activeFilePath}
            onFileSelect={onFileSelect}
            onCopyCode={onCopyCode}
          />
        )}
      </div>
    </>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-full items-center gap-2 border-b-2 px-1 text-sm transition-colors duration-200 ease-in-out",
        active ? "border-white text-white" : "border-transparent text-white/45 hover:text-white/75"
      )}
    >
      {children}
    </button>
  );
}

function PreviewTab({
  previewSize,
  previewHtml,
  previewRefreshKey,
  isGenerating,
  onPreviewSizeChange,
  onRefreshPreview,
}: {
  previewSize: PreviewSize;
  previewHtml: string;
  previewRefreshKey: number;
  isGenerating: boolean;
  onPreviewSizeChange: (size: PreviewSize) => void;
  onRefreshPreview: () => void;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-surface p-4">
      <div className="flex shrink-0 flex-col gap-3 border-b border-surface-container-high pb-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-2 rounded-xl border border-surface-container-high bg-surface-container-low px-3 py-2">
          <button
            type="button"
            onClick={onRefreshPreview}
            className="text-white/45 transition-colors duration-200 ease-in-out hover:text-white"
            aria-label="Refresh preview"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          <span className="truncate text-xs text-white/55">oni.app/preview/project-id</span>
        </div>

        <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 p-1">
          {previewSizeLabels.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.value}
                type="button"
                onClick={() => onPreviewSizeChange(item.value)}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs transition-colors duration-200 ease-in-out",
                  previewSize === item.value ? "bg-white text-black" : "text-white/55 hover:bg-white/10 hover:text-white"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden pt-4">
        {isGenerating ? (
          <PreviewSkeleton />
        ) : previewHtml ? (
          <div className="flex h-full justify-center overflow-hidden">
            <iframe
              key={`${previewRefreshKey}-${previewSize}`}
              title="Oni generated website preview"
              srcDoc={previewHtml}
              className={cn(
                "h-full rounded-xl border border-white/10 bg-white transition-all duration-200 ease-in-out",
                previewSizeClasses[previewSize]
              )}
            />
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-4 text-center px-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/30">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18" />
                <path d="M9 21V9" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-white/50">No preview yet</p>
              <p className="mt-1 text-xs text-white/25">Describe a website in the chat to get started</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PreviewSkeleton() {
  return (
    <div className="h-full rounded-xl border border-white/10 bg-white/[0.03] p-6">
      <div className="h-full animate-pulse rounded-lg bg-white/[0.04] p-8">
        <div className="mb-8 h-6 w-40 rounded bg-white/10" />
        <div className="mb-4 h-12 w-3/4 rounded bg-white/10" />
        <div className="mb-10 h-4 w-1/2 rounded bg-white/10" />
        <div className="grid gap-4 md:grid-cols-3">
          <div className="h-40 rounded-xl bg-white/10" />
          <div className="h-40 rounded-xl bg-white/10" />
          <div className="h-40 rounded-xl bg-white/10" />
        </div>
      </div>
    </div>
  );
}

function CodeTab({
  projectFiles,
  activeFile,
  activeFilePath,
  onFileSelect,
  onCopyCode,
}: {
  projectFiles: ProjectFile[];
  activeFile: ProjectFile;
  activeFilePath: string;
  onFileSelect: (path: string) => void;
  onCopyCode: (content: string) => void;
}) {
  return (
    <div className="flex h-full min-h-0 min-w-0 overflow-hidden">
      <aside className="w-[190px] shrink-0 overflow-y-auto border-r border-white/10 bg-white/[0.02] p-3 scrollbar-hidden sm:w-[210px]">
        <FileTree files={projectFiles} activeFilePath={activeFilePath} onFileSelect={onFileSelect} onCopyCode={onCopyCode} />
      </aside>

      <div className="min-w-0 flex-1 overflow-hidden">
        <div className="flex h-12 items-center justify-between border-b border-white/10 px-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="truncate text-sm text-white">{activeFile.path}</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/50">
              {activeFile.language}
            </span>
          </div>
          <button
            type="button"
            onClick={() => onCopyCode(activeFile.content)}
            title="Copy full code"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-white/50 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
          >
            <Copy className="h-4 w-4" />
          </button>
        </div>

        <div className="h-[calc(100%-3rem)] overflow-auto bg-[#0d0d0d] scrollbar-hidden">
          <pre className="min-w-max p-4 font-mono text-[13px] leading-6 text-white/80">
            {activeFile.content.split("\n").map((line, index) => (
              <div key={`${activeFile.path}-${index}`} className="grid grid-cols-[3rem_minmax(0,1fr)]">
                <span className="select-none pr-4 text-right text-white/25">{index + 1}</span>
                <code className="whitespace-pre">{highlightLine(line, activeFile.language)}</code>
              </div>
            ))}
          </pre>
        </div>
      </div>
    </div>
  );
}

function FileTree({
  files,
  activeFilePath,
  onFileSelect,
  onCopyCode,
}: {
  files: ProjectFile[];
  activeFilePath: string;
  onFileSelect: (path: string) => void;
  onCopyCode: (content: string) => void;
}) {
  const groups = [
    {
      name: "src",
      files: files.filter((file) => file.path.startsWith("src/")),
    },
    {
      name: "public",
      files: files.filter((file) => file.path.startsWith("public/")),
    },
    {
      name: "root",
      files: files.filter((file) => !file.path.startsWith("src/") && !file.path.startsWith("public/")),
    },
  ];

  return (
    <div className="space-y-3 text-sm">
      {groups.map((group) => (
        <div key={group.name}>
          <div className="mb-1 flex items-center gap-2 px-2 text-xs text-white/35">
            {group.name !== "root" && <Folder className="h-3.5 w-3.5" />}
            {group.name !== "root" && <span>{group.name}/</span>}
          </div>
          <div className="space-y-1">
            {group.files.map((file) => (
              <div
                key={file.path}
                className={cn(
                  "group/file flex w-full items-center justify-between rounded-lg px-2 text-xs transition-colors duration-200 ease-in-out",
                  activeFilePath === file.path
                    ? "bg-white/10 text-white"
                    : "text-white/55 hover:bg-white/5 hover:text-white/85"
                )}
              >
                <button
                  type="button"
                  onClick={() => onFileSelect(file.path)}
                  className="flex flex-1 items-center gap-2 text-left min-w-0 py-2 cursor-pointer"
                >
                  <FileIcon path={file.path} />
                  <span className="truncate">{file.label}</span>
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCopyCode(file.content);
                  }}
                  title={`Copy ${file.label} full code`}
                  className="opacity-0 group-hover/file:opacity-100 flex h-6 w-6 shrink-0 items-center justify-center rounded text-white/40 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
                >
                  <Copy className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function FileIcon({ path }: { path: string }) {
  if (path.endsWith(".json")) return <FileJson className="h-4 w-4 text-yellow-300/80" />;
  if (path.endsWith(".css")) return <FileText className="h-4 w-4 text-sky-300/80" />;
  if (path.endsWith(".html")) return <Code2 className="h-4 w-4 text-orange-300/80" />;
  return <FileCode2 className="h-4 w-4 text-emerald-300/80" />;
}

function MobilePanelTabs({
  activePanel,
  onPanelChange,
}: {
  activePanel: MobilePanel;
  onPanelChange: (panel: MobilePanel) => void;
}) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 grid grid-cols-3 border-t border-surface-container-high bg-surface/95 p-2 backdrop-blur lg:hidden">
      {mobileTabs.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.value}
            type="button"
            onClick={() => onPanelChange(item.value)}
            className={cn(
              "flex flex-col items-center gap-1 rounded-xl px-3 py-2 text-xs transition-colors duration-200 ease-in-out",
              activePanel === item.value ? "bg-white/10 text-white" : "text-white/45 hover:text-white"
            )}
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}

function IconButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-8 w-8 items-center justify-center rounded-full text-text-secondary hover:bg-surface-container hover:text-primary transition-colors cursor-pointer"
      aria-label={label}
      title={label}
    >
      {children}
    </button>
  );
}

function buildProjectFiles(html: string, rawContent?: string): ProjectFile[] {
  if (!html) {
    return [
      {
        path: "index.html",
        label: "index.html",
        language: "html",
        content: "<!-- No website generated yet. Describe one in the chat! -->",
      },
    ];
  }

  // If the raw AI response contained ONI_FILES, build separate file tabs
  if (rawContent) {
    const parsedFiles = parseOniFiles(rawContent);
    if (parsedFiles && Object.keys(parsedFiles).length >= 2) {
      const files: ProjectFile[] = [];
      const order = ["index.html", "styles.css", "scripts.js"];
      const langMap: Record<string, string> = {
        "index.html": "html",
        "styles.css": "css",
        "scripts.js": "javascript",
      };
      // Add files in defined order, then any extras
      const allNames = [...new Set([...order, ...Object.keys(parsedFiles)])];
      for (const name of allNames) {
        if (parsedFiles[name] !== undefined) {
          const ext = name.split(".").pop() || "";
          files.push({
            path: name,
            label: name,
            language: langMap[name] || ext,
            content: parsedFiles[name],
          });
        }
      }
      return files;
    }
  }

  // Fallback: single inline HTML file
  return [
    {
      path: "index.html",
      label: "index.html",
      language: "html",
      content: html,
    },
  ];
}

function buildPromptWithAttachments(
  prompt: string,
  image: ImageAttachment | undefined,
  files: FileAttachment[]
) {
  const attachmentBlocks: string[] = [];

  if (image) {
    attachmentBlocks.push(
      [
        "Attached image:",
        `Name: ${image.name}`,
        "Use it as a visual reference if the user asks for design, layout, branding, or screenshot-based changes.",
      ].join("\n")
    );
  }

  files.forEach((file) => {
    const lines = [
      `Attached file: ${file.name}`,
      `Type: ${file.type || "unknown"}`,
      `Size: ${formatBytes(file.size)}`,
    ];

    if (file.content) {
      lines.push("Content:", file.content);
    } else if (file.note) {
      lines.push(`Note: ${file.note}`);
    }

    attachmentBlocks.push(lines.join("\n"));
  });

  if (attachmentBlocks.length === 0) return prompt;

  return [prompt || "Use the attached files for this request.", "<ATTACHMENTS>", attachmentBlocks.join("\n\n---\n\n"), "</ATTACHMENTS>"].join("\n\n");
}

function isReadableTextFile(file: File) {
  const extension = getFileExtension(file.name);
  const readableExtensions = new Set([
    ".md",
    ".markdown",
    ".txt",
    ".csv",
    ".json",
    ".html",
    ".htm",
    ".css",
    ".js",
    ".jsx",
    ".ts",
    ".tsx",
    ".xml",
    ".yaml",
    ".yml",
    ".toml",
    ".log",
    ".rtf",
  ]);

  return file.type.startsWith("text/") || readableExtensions.has(extension) || file.type === "application/json";
}

function isPdfFile(file: File) {
  return file.type === "application/pdf" || getFileExtension(file.name) === ".pdf";
}

function getFileExtension(fileName: string) {
  const lastDot = fileName.lastIndexOf(".");
  return lastDot === -1 ? "" : fileName.slice(lastDot).toLowerCase();
}

function formatBytes(bytes: number) {
  if (bytes === 0) return "0 B";

  const units = ["B", "KB", "MB", "GB"];
  const unitIndex = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / 1024 ** unitIndex;

  return `${value.toFixed(value >= 10 || unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}


function highlightLine(line: string, language: string) {
  const pattern =
    /(\/\/.*|\/\*.*?\*\/|("[^"]*"|'[^']*'|`[^`]*`)|\b(import|from|export|default|function|return|const|let|type|interface|className|async|await)\b|(#[0-9a-fA-F]{3,8})|(<\/?[A-Za-z][^>]*>))/g;
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(line)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(line.slice(lastIndex, match.index));
    }

    const token = match[0];
    nodes.push(
      <span key={`${line}-${match.index}`} className={getTokenClass(token, language)}>
        {token}
      </span>
    );
    lastIndex = match.index + token.length;
  }

  if (lastIndex < line.length) {
    nodes.push(line.slice(lastIndex));
  }

  return nodes.length > 0 ? nodes : " ";
}

function getTokenClass(token: string, language: string) {
  if (token.startsWith("//") || token.startsWith("/*")) return "text-white/35";
  if (token.startsWith("\"") || token.startsWith("'") || token.startsWith("`")) return "text-emerald-300";
  if (token.startsWith("#")) return "text-pink-300";
  if (token.startsWith("<")) return "text-sky-300";
  if (language === "json") return "text-amber-300";
  return "text-violet-300";
}

function createZipBlob(files: ProjectFile[]) {
  const encoder = new TextEncoder();
  const localParts: Uint8Array[] = [];
  const centralParts: Uint8Array[] = [];
  let offset = 0;

  files.forEach((file) => {
    const nameBytes = encoder.encode(file.path);
    const data = encoder.encode(file.content);
    const crc = crc32(data);
    const { time, date } = getDosDateTime();
    const localHeader = new Uint8Array(30);
    const localView = new DataView(localHeader.buffer);

    writeUint32(localView, 0, 0x04034b50);
    writeUint16(localView, 4, 20);
    writeUint16(localView, 6, 0);
    writeUint16(localView, 8, 0);
    writeUint16(localView, 10, time);
    writeUint16(localView, 12, date);
    writeUint32(localView, 14, crc);
    writeUint32(localView, 18, data.length);
    writeUint32(localView, 22, data.length);
    writeUint16(localView, 26, nameBytes.length);
    writeUint16(localView, 28, 0);

    localParts.push(localHeader, nameBytes, data);

    const centralHeader = new Uint8Array(46);
    const centralView = new DataView(centralHeader.buffer);
    writeUint32(centralView, 0, 0x02014b50);
    writeUint16(centralView, 4, 20);
    writeUint16(centralView, 6, 20);
    writeUint16(centralView, 8, 0);
    writeUint16(centralView, 10, 0);
    writeUint16(centralView, 12, time);
    writeUint16(centralView, 14, date);
    writeUint32(centralView, 16, crc);
    writeUint32(centralView, 20, data.length);
    writeUint32(centralView, 24, data.length);
    writeUint16(centralView, 28, nameBytes.length);
    writeUint16(centralView, 30, 0);
    writeUint16(centralView, 32, 0);
    writeUint16(centralView, 34, 0);
    writeUint16(centralView, 36, 0);
    writeUint32(centralView, 38, 0);
    writeUint32(centralView, 42, offset);

    centralParts.push(centralHeader, nameBytes);
    offset += localHeader.length + nameBytes.length + data.length;
  });

  const centralSize = centralParts.reduce((total, part) => total + part.length, 0);
  const endHeader = new Uint8Array(22);
  const endView = new DataView(endHeader.buffer);
  writeUint32(endView, 0, 0x06054b50);
  writeUint16(endView, 4, 0);
  writeUint16(endView, 6, 0);
  writeUint16(endView, 8, files.length);
  writeUint16(endView, 10, files.length);
  writeUint32(endView, 12, centralSize);
  writeUint32(endView, 16, offset);
  writeUint16(endView, 20, 0);

  const blobParts = [...localParts, ...centralParts, endHeader].map(toArrayBuffer);
  return new Blob(blobParts, { type: "application/zip" });
}

function toArrayBuffer(bytes: Uint8Array) {
  const buffer = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(buffer).set(bytes);
  return buffer;
}

function crc32(data: Uint8Array) {
  let crc = 0xffffffff;

  for (const byte of data) {
    crc ^= byte;
    for (let index = 0; index < 8; index += 1) {
      crc = crc & 1 ? (crc >>> 1) ^ 0xedb88320 : crc >>> 1;
    }
  }

  return (crc ^ 0xffffffff) >>> 0;
}

function getDosDateTime(date = new Date()) {
  const time = (date.getHours() << 11) | (date.getMinutes() << 5) | Math.floor(date.getSeconds() / 2);
  const dosDate = ((date.getFullYear() - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate();

  return { time, date: dosDate };
}

function writeUint16(view: DataView, offset: number, value: number) {
  view.setUint16(offset, value, true);
}

function writeUint32(view: DataView, offset: number, value: number) {
  view.setUint32(offset, value, true);
}

function createId() {
  return globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2);
}

function wait(ms: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

