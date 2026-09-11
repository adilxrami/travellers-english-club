import { useEffect, useState } from "react";
import { motion } from "motion/react";
import confetti from "canvas-confetti";
import type { LucideIcon } from "lucide-react";
import {
  ChevronRight,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Check,
  CirclePlay,
  Clock3,
  Globe2,
  Headphones,
  Instagram,
  Landmark,
  Linkedin,
  MapPin,
  Menu,
  MessageCircle,
  Mic2,
  PenLine,
  Quote,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Star,
  SlidersHorizontal,
  Trophy,
  Users,
  Volume2,
  X,
  Youtube,
} from "lucide-react";

type Language = "en" | "ar";

const activities: { icon: string; title: string; titleAr: string; copy: string; copyAr: string }[] = [
  { icon: "✦", title: "Speaking challenges", titleAr: "تحديات التحدث", copy: "Small prompts, big confidence.", copyAr: "أسئلة بسيطة، وثقة أكبر." },
  { icon: "◌", title: "English games", titleAr: "ألعاب الإنجليزية", copy: "Learn without feeling like class.", copyAr: "تعلّم بدون أن تشعر أنك في حصة." },
  { icon: "♞", title: "Chess & English", titleAr: "الشطرنج والإنجليزية", copy: "Make your next move in English.", copyAr: "اجعل خطوتك التالية باللغة الإنجليزية." },
  { icon: "◉", title: "Movie discussions", titleAr: "مناقشات الأفلام", copy: "Talk culture, characters and ideas.", copyAr: "ناقش الثقافة والشخصيات والأفكار." },
  { icon: "⌁", title: "Roleplay", titleAr: "تمثيل الأدوار", copy: "Try real conversations, together.", copyAr: "جرّب محادثات حقيقية مع الآخرين." },
  { icon: "⁂", title: "Quizzes & competitions", titleAr: "اختبارات ومسابقات", copy: "A little friendly competition helps.", copyAr: "قليل من المنافسة الودية يجعل التعلم ممتعًا." },
];

const learningPaths: { icon: LucideIcon; title: string; titleAr: string; copy: string; copyAr: string; color: string }[] = [
  { icon: Mic2, title: "Speaking", titleAr: "التحدث", copy: "Find your voice in every room.", copyAr: "اكتشف صوتك وتحدث بثقة في كل مكان.", color: "gold" },
  { icon: Headphones, title: "Listening", titleAr: "الاستماع", copy: "Catch the meaning, not just the words.", copyAr: "افهم المعنى، وليس الكلمات فقط.", color: "lilac" },
  { icon: BookOpen, title: "Vocabulary", titleAr: "المفردات", copy: "Build a bank of words you actually use.", copyAr: "كوّن رصيدًا من الكلمات التي تستخدمها فعلًا.", color: "peach" },
  { icon: PenLine, title: "Writing", titleAr: "الكتابة", copy: "Make your message clear and memorable.", copyAr: "اجعل رسالتك واضحة وسهلة التذكر.", color: "mint" },
  { icon: Landmark, title: "English for work", titleAr: "الإنجليزية للعمل", copy: "Show up professionally and naturally.", copyAr: "تحدث بطريقة مهنية وطبيعية.", color: "sky" },
  { icon: Globe2, title: "Everyday English", titleAr: "الإنجليزية اليومية", copy: "Feel at home wherever you go.", copyAr: "اشعر بالراحة أينما ذهبت.", color: "lavender" },
];

const testimonials = [
  { quote: "I came to practise English. I stayed because I found people who make me feel brave enough to speak.", quoteAr: "أتيت لأتدرب على الإنجليزية، وبقيت لأنني وجدت أشخاصًا يجعلونني أشعر بالشجاعة الكافية للتحدث.", name: "Mariam A.", detail: "Member since 2026", detailAr: "عضوة منذ 2026", initials: "MA", tone: "bg-[#f3d88a]" },
  { quote: "Every Saturday feels like a tiny trip. New words, new stories, new friends — all in one room.", quoteAr: "كل يوم سبت يشبه رحلة صغيرة. كلمات جديدة، قصص جديدة، وأصدقاء جدد — كل ذلك في غرفة واحدة.", name: "Omar K.", detail: "Conversation club regular", detailAr: "عضو دائم في نادي المحادثة", initials: "OK", tone: "bg-[#d8c8ef]" },
];

const clubMoments = [
  { label: "01 / Speak", labelAr: "01 / تحدث", title: "Small prompts. Big confidence.", titleAr: "أسئلة بسيطة. ثقة كبيرة.", copy: "Warm up with a question that gets everyone talking.", copyAr: "ابدأ بسؤال بسيط يجعل الجميع يتحدثون.", accent: "#f3d88a" },
  { label: "02 / Connect", labelAr: "02 / تواصل", title: "Every table has a story.", titleAr: "كل طاولة لها قصة.", copy: "Meet curious people from Cairo and everywhere else.", copyAr: "تعرّف على أشخاص فضوليين من القاهرة ومن كل مكان.", accent: "#d8c8ef" },
  { label: "03 / Play", labelAr: "03 / العب", title: "Learning should feel alive.", titleAr: "يجب أن يكون التعلم ممتعًا وحيويًا.", copy: "Games, challenges and a little friendly competition.", copyAr: "ألعاب وتحديات وقليل من المنافسة الودية.", accent: "#bfe1d0" },
];

const reveal = {
  hidden: { opacity: 0, y: 45 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" as const },
  },
};

const pop = {
  hidden: { opacity: 0, scale: 0.8, rotate: -4 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 180, damping: 14 },
  },
};

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className={`section-label ${light ? "section-label-light" : ""}`}>
      <span className="section-label-dot" />
      {children}

    </div>
  );
}

function ArrowButton({ children, light = false, href = "#join" }: { children: React.ReactNode; light?: boolean; href?: string }) {
  return (
    <a className={`arrow-button ${light ? "arrow-button-light" : ""}`} href={href}>
      <span>{children}</span>
      <span className="arrow-button-icon"><ArrowRight size={16} strokeWidth={2.5} /></span>
    </a>
  );
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminCode, setAdminCode] = useState("");
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [gameLive, setGameLive] = useState(true);
  const [bonusPoints, setBonusPoints] = useState(25);
  const [challenge, setChallenge] = useState("Two truths and a travel lie");
  const isArabic = language === "ar";
  const brandImage = isArabic ? "/travellers-welcome2.png" : "/travellers-welcome.jpeg";
  const text = (en: string, ar: string) => (isArabic ? ar : en);


  const unlockAdmin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (adminCode.trim().toLowerCase() === "travellers") {
      setAdminUnlocked(true);
      setAdminCode("");
    }
  };

  const closeMenu = () => setMobileOpen(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);

    confetti({
      particleCount: 140,
      spread: 95,
      startVelocity: 35,
      origin: { x: 0.5, y: 0.72 },
    });

    setTimeout(() => {
      confetti({ particleCount: 70, spread: 70, origin: { x: 0.15, y: 0.75 } });
      confetti({ particleCount: 70, spread: 70, origin: { x: 0.85, y: 0.75 } });
    }, 250);
  };

  return (
    <div className="site-shell" dir={isArabic ? "rtl" : "ltr"} lang={language}>
      <header className="site-header">
        <div className="container header-inner">
              <a href="#top" className="brand-lockup">
                <img
                  src="/travellers-logo.png"
                  alt="Travellers English Club"
                  className="brand-image"
                />
              </a>


          <nav className={`desktop-nav ${mobileOpen ? "mobile-nav-open" : ""}`} aria-label="Main navigation">
            <a href="#about" onClick={closeMenu}>{text("About", "من نحن")}</a>
            <a href="#activities" onClick={closeMenu}>{text("Activities", "الأنشطة")}</a>
            <a href="#learn" onClick={closeMenu}>{text("Learn English", "تعلّم الإنجليزية")}</a>
            <a href="#english-course" onClick={closeMenu}>{text("English Course", "دورة الإنجليزية")}</a>
            <a href="#events" onClick={closeMenu}>{text("Events", "الفعاليات")}</a>
            <a href="#community" onClick={closeMenu}>{text("Community", "المجتمع")}</a>
            <motion.a
              className="nav-join"
              href="#join"
              onClick={closeMenu}
              whileHover={{ scale: 1.05, rotate: -1 }}
              whileTap={{ scale: 0.96 }}
            >
              {text("Join the club", "انضم إلى النادي")} <ArrowUpRight />
            </motion.a>
          </nav>

          <div className="language-switch" aria-label="Language switcher">
            <button type="button" className={language === "en" ? "language-active" : ""} onClick={() => setLanguage("en")} aria-pressed={language === "en"}>EN</button>
            <span>•</span>
            <button type="button" className={language === "ar" ? "language-active" : ""} onClick={() => setLanguage("ar")} aria-pressed={language === "ar"}>العربية</button>
          </div>

          <button className="mobile-menu-trigger" aria-label={mobileOpen ? text("Close menu", "إغلاق القائمة") : text("Open menu", "فتح القائمة")} onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <motion.div
            className="hero-doodle doodle-plane"
            animate={{ x: [-10, 20, -10], y: [5, -12, 5], rotate: [-8, 5, -8] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            ✈
          </motion.div>
          <div className="container hero-grid">
            <motion.div
              className="hero-copy"
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
            >
              <motion.div className="eyebrow" variants={reveal}>
                <span className="eyebrow-line" /> {text("Cairo's most welcoming English club", "نادي الإنجليزية الأكثر ترحيبًا في القاهرة")}
              </motion.div>
              <motion.h1 className="hero-title" variants={reveal}>
                {text("Learn English.", "تعلّم الإنجليزية.")}<br />
                <motion.span
                  animate={{ x: [0, 6, 0], rotate: [0, -1, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  {text("Meet the world.", "تعرّف على العالم.")}
                </motion.span>
              </motion.h1>
              <motion.p className="hero-description" variants={reveal}>
                {text("A warm, social space where English becomes something you live — not another subject to study.", "مساحة دافئة واجتماعية تصبح فيها الإنجليزية شيئًا تعيشه — وليس مجرد مادة تدرسها.")}
              </motion.p>
              <motion.div className="hero-actions" variants={reveal}>
                <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}>
                  <ArrowButton href="#join">{text("Join the club", "انضم إلى النادي")}</ArrowButton>
                </motion.div>
                <motion.a href="#activities" className="text-link" whileHover={{ x: 6 }}>
                  <motion.span
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                  >
                    <CirclePlay size={17} fill="currentColor" />
                  </motion.span>
                  {text("See how it works", "شاهد كيف نعمل")}
                </motion.a>
              </motion.div>
              <motion.div className="hero-proof" variants={reveal}>
                <motion.div className="avatar-stack" aria-hidden="true" whileHover={{ scale: 1.08 }}>
                  <span className="avatar avatar-a">A</span><span className="avatar avatar-b">M</span>
                  <span className="avatar avatar-c">O</span><span className="avatar avatar-d">+</span>
                </motion.div>
                <div><strong>{text("Made for curious people", "صُمم للأشخاص الفضوليين")}</strong><span>{text("Every level. Every story.", "كل مستوى. كل قصة.")}</span></div>
              </motion.div>
            </motion.div>

            <motion.div
              className="hero-art"
              initial={{ opacity: 0, scale: 0.82, rotate: 3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.9, type: "spring", stiffness: 90 }}
              whileHover={{ scale: 1.025, rotate: -1 }}
            >
              <motion.div
                className="hero-art-frame"
                whileHover={{ y: -8 }}
              >
                <img src={brandImage} alt={text("Travellers English Club welcome artwork", "صورة ترحيبية بنادي Travellers English Club")} />
                <div className="hero-art-shade" />
                <motion.div
                  className="art-sticker sticker-top"
                  animate={{ rotate: [0, -4, 4, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Sparkles size={16} /> {text("EST. 2026", "تأسس 2026")}
                </motion.div>
                <motion.div
                  className="art-sticker sticker-bottom"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  {text("LEARN", "تعلّم")} <span>↗</span> {text("CONNECT", "تواصل")}
                </motion.div>
              </motion.div>
              <div className="hero-caption"><span>01</span><span>{text("One room. A hundred new possibilities.", "غرفة واحدة. مئة احتمال جديد.")}</span></div>
            </motion.div>
          </div>
          <div className="hero-bottom-line" />
        </section>

        <section className="event-strip" id="events">
          <div className="container event-strip-inner">
            <div className="event-kicker"><span className="live-dot" /> {text("Next gathering", "اللقاء القادم")}</div>
            <div className="event-main"><span className="event-date">{isArabic ? "السبت 12 سبتمبر" : "SAT 12 SEP"}</span><strong>{text("Travel stories: the places that changed us", "قصص السفر: الأماكن التي غيّرتنا")}</strong></div>
            <div className="event-meta"><span><Clock3 size={15} /> 7:00 {isArabic ? "م" : "PM"}</span><span><MapPin size={15} /> Cairo</span><span className="event-price">30 {isArabic ? "جنيه" : "EGP"}</span></div>
            <a href="#join" className="event-arrow" aria-label={text("Register for next gathering", "سجّل في اللقاء القادم")}><ArrowUpRight size={20} /></a>
          </div>
        </section>


        <section className="about-section section-space" id="about">
          <div className="container about-grid">
            <div className="about-aside">
              <SectionLabel>{text("Why Travellers?", "لماذا Travellers؟")}</SectionLabel>
              <div className="handwritten-note">{text("Come as you are.", "تعال كما أنت.")}<br /><span>{text("Leave a little braver.", "غادر وأنت أكثر شجاعة.")}</span></div>
              <div className="route-doodle"><span>✦</span><div className="route-dashed" /><span>✈</span></div>
            </div>
            <div className="about-content">
              <h2 className="display-heading">{isArabic ? <>أفضل طريقة لتعلّم اللغة هي أن <em>نستخدمها معًا.</em></> : <>The best way to learn a language is to <em>use it together.</em></>}</h2>
              <p className="large-copy">{text("Travellers English Club is a community for people who want to practise English in real conversations, with real people, about things they genuinely care about.", "Travellers English Club هو مجتمع للأشخاص الذين يريدون ممارسة الإنجليزية في محادثات حقيقية، مع أشخاص حقيقيين، حول أشياء يهتمون بها فعلًا.")}</p>
              <div className="stat-row">
                <div><strong>01</strong><span>{text("shared table", "طاولة مشتركة")}</span></div><div><strong>∞</strong><span>{text("stories to tell", "قصص تُروى")}</span></div><div><strong>100%</strong><span>{text("good energy", "طاقة إيجابية")}</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="activities-section section-space" id="activities">
          <div className="container">
            <div className="section-topline"><div><SectionLabel light>{text("Made for conversation", "مصمم للمحادثة")}</SectionLabel><h2 className="display-heading light-heading">{isArabic ? <>تعلّم يشبه<br /><em>سهرة جميلة.</em></> : <>Learning that feels<br /><em>like a good night out.</em></>}</h2></div><p className="section-intro light-copy">{text("No rows. No red pens. Just a room full of prompts, games and people who want to get better together.", "لا صفوف متراصة. لا أقلام حمراء. فقط غرفة مليئة بالأسئلة والألعاب والأشخاص الذين يريدون التطور معًا.")}</p></div>
            <div className="activity-grid">
              {activities.map((activity, index) => (
                <motion.article
                  className="activity-card"
                  key={activity.title}
                  variants={pop}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.07 }}
                  whileHover={{ y: -12, rotate: index % 2 === 0 ? -2 : 2, scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <span className="activity-index">0{index + 1}</span>
                  <motion.span className="activity-icon" whileHover={{ scale: 1.35, rotate: 15 }}>
                    {activity.icon}
                  </motion.span>
                  <h3>{isArabic ? activity.titleAr : activity.title}</h3>
                  <p>{isArabic ? activity.copyAr : activity.copy}</p>
                  <motion.div whileHover={{ x: 6 }}>
                    <ChevronRight className="activity-chevron" size={18} />
                  </motion.div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="learn-section section-space" id="learn">
          <div className="container learn-grid">
            <div className="learn-intro"><SectionLabel>{text("Practical English", "الإنجليزية العملية")}</SectionLabel><h2 className="display-heading">{isArabic ? <>قليل من التدريب<br />يقطع <em>شوطًا طويلًا.</em></> : <>A little practice<br />goes a <em>long way.</em></>}</h2><p>{text("Choose a direction. We’ll help you take the next step — in a way that fits real life.", "اختر الاتجاه الذي يناسبك. سنساعدك على اتخاذ الخطوة التالية — بطريقة تناسب حياتك اليومية.")}</p><ArrowButton href="#join">{text("Explore learning paths", "استكشف مسارات التعلم")}</ArrowButton></div>
            <div className="learning-paths">{learningPaths.map(({ icon: Icon, title, titleAr, copy, copyAr, color }, index) => (
                <motion.a
                  href="#join"
                  className={`learning-card ${color}`}
                  key={title}
                  variants={reveal}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ delay: index * 0.06 }}
                  whileHover={{ x: 10, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="path-number">0{index + 1}</span>
                  <motion.span className="path-icon" whileHover={{ rotate: -12, scale: 1.2 }}>
                    <Icon size={21} />
                  </motion.span>
                  <span><strong>{isArabic ? titleAr : title}</strong><small>{isArabic ? copyAr : copy}</small></span>
                  <motion.span
                    animate={{ x: [0, 3, 0], y: [0, 3, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.15 }}
                  >
                    <ArrowDownRight size={18} className="path-arrow" />
                  </motion.span>
                </motion.a>
              ))}</div>
          </div>
        </section>

        <section className="english-course-section section-space" id="english-course">
          <div className="container english-course-grid">
            <motion.div
              className="english-course-copy"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={reveal}
            >
              <SectionLabel>{text("Learn English with us", "تعلّم الإنجليزية معنا")}</SectionLabel>
              <h2 className="display-heading">{isArabic ? <>طوّر لغتك الإنجليزية.<br /><em>استخدمها في الحياة الواقعية.</em></> : <>Build better English.<br /><em>Use it in real life.</em></>}</h2>
              <p className="large-copy">{text("Our English learning program is designed to help you speak with confidence, understand more naturally, build useful vocabulary, and communicate in everyday situations.", "صُمم برنامجنا لتعلّم الإنجليزية لمساعدتك على التحدث بثقة، والفهم بشكل طبيعي، وبناء مفردات مفيدة، والتواصل في المواقف اليومية.")}</p>

              <div className="course-highlights">
                <span><Check size={16} /> {text("Speaking & conversation", "التحدث والمحادثة")}</span>
                <span><Check size={16} /> {text("Listening & pronunciation", "الاستماع والنطق")}</span>
                <span><Check size={16} /> {text("Vocabulary & grammar", "المفردات والقواعد")}</span>
                <span><Check size={16} /> {text("Writing & everyday English", "الكتابة والإنجليزية اليومية")}</span>
              </div>
            </motion.div>

            <motion.div
              className="english-course-card"
              initial={{ opacity: 0, scale: 0.9, y: 35 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ type: "spring", stiffness: 100, damping: 16 }}
              whileHover={{ y: -8, rotate: -1 }}
            >
              <div className="course-card-icon">
                <BookOpen size={25} />
              </div>
              <span className="eyebrow">{text("English Learning Program", "برنامج تعلّم الإنجليزية")}</span>
              <h3>{text("Ready to take your English further?", "هل أنت مستعد لتطوير لغتك الإنجليزية؟")}</h3>
              <p>{text("Tell us about your current level, your goals, and what you want to improve. We’ll use your answers to make your learning experience more useful, comfortable, and fun.", "أخبرنا عن مستواك الحالي وأهدافك وما تريد تحسينه. سنستخدم إجاباتك لجعل تجربة التعلم أكثر فائدة وراحة ومتعة.")}</p>

              <div className="course-card-details">
                <span><Mic2 size={15} /> {text("Speak with confidence", "تحدث بثقة")}</span>
                <span><Globe2 size={15} /> {text("Practical English for real life", "إنجليزية عملية للحياة الواقعية")}</span>
                <span><Sparkles size={15} /> {text("Learn through engaging activities", "تعلّم من خلال أنشطة ممتعة")}</span>
              </div>

              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLScuCx1ImMjK2vAaSmh1YvCy9FhYrNGISWRqsUW7-KFNH4QOnQ/viewform?usp=publish-editor"
                target="_blank"
                rel="noopener noreferrer"
                className="button button-primary course-button"
              >
                {text("Start learning", "ابدأ التعلم")} <ArrowRight size={16} />
              </a>
            </motion.div>
          </div>
        </section>

        <section className="community-section section-space" id="community">
          <div className="container community-grid">
            <div className="community-visual"><div className="polaroid polaroid-back"><div className="polaroid-photo photo-two" /><span>{text("New friends, same table.", "أصدقاء جدد، نفس الطاولة.")}</span></div><div className="polaroid polaroid-front"><div className="polaroid-photo photo-one" /><span>{text("Stories worth sharing.", "قصص تستحق المشاركة.")}</span></div><span className="visual-sparkle">✦</span></div>
            <div className="community-copy"><SectionLabel>{text("A club, not a classroom", "نادي وليس فصلًا دراسيًا")}</SectionLabel><h2 className="display-heading">{isArabic ? <>نحن أكثر من مجرد نادي للإنجليزية. <em>نحن مجتمع.</em></> : <>We’re more than an English club. <em>We’re a community.</em></>}</h2><p className="large-copy">{text("There’s a special kind of confidence that comes from being known. Here, your wins are celebrated, your mistakes are welcome, and your story always has a listener.", "هناك نوع خاص من الثقة يأتي من أن تكون معروفًا ومقبولًا. هنا نحتفل بانتصاراتك، ونرحب بأخطائك، ودائمًا ما تجد قصتك من يستمع إليها.")}</p><div className="community-pills"><span><Users size={16} /> {text("Member stories", "قصص الأعضاء")}</span><span><Trophy size={16} /> {text("Little wins", "انتصارات صغيرة")}</span><span><MessageCircle size={16} /> {text("Open conversations", "محادثات مفتوحة")}</span></div><ArrowButton href="#join">{text("Find your people", "اعثر على أشخاصك")}</ArrowButton></div>
          </div>
        </section>

        <section className="testimonial-section section-space">
          <div className="container"><div className="section-topline testimonial-top"><div><SectionLabel>{text("Kind words", "كلمات جميلة")}</SectionLabel><h2 className="display-heading">{isArabic ? <>لا تأخذ كلامنا<br /><em>كحقيقة.</em></> : <>Don’t take our word<br /><em>for it.</em></>}</h2></div><div className="quote-mark"><Quote size={44} /></div></div><div className="testimonial-grid">{testimonials.map((item, index) => (
              <motion.article
                className="testimonial-card"
                key={item.name}
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.12 }}
                whileHover={{ y: -8, rotate: index % 2 ? 1 : -1 }}
              >
                <motion.div whileHover={{ rotate: -8, scale: 1.15 }}>
                  <Quote className="testimonial-quote" size={26} />
                </motion.div>
                <p>“{isArabic ? item.quoteAr : item.quote}”</p>
                <div className="testimonial-person">
                  <motion.span className={`testimonial-avatar ${item.tone}`} whileHover={{ scale: 1.15, rotate: 8 }}>
                    {item.initials}
                  </motion.span>
                  <span><strong>{item.name}</strong><small>{isArabic ? item.detailAr : item.detail}</small></span>
                  <div className="stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.span key={star} whileHover={{ scale: 1.4, rotate: 12 }}>
                        <Star size={13} fill="currentColor" />
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}</div></div>
        </section>

        <section className="join-section" id="join">
          <div className="container join-grid"><div className="join-copy"><SectionLabel light>{text("Save your spot", "احجز مكانك")}</SectionLabel><h2 className="display-heading light-heading">{isArabic ? <>قد يبدأ فصلك القادم<br />من <em>هنا.</em></> : <>Your next chapter<br />could start <em>here.</em></>}</h2><p className="light-copy">Tell us a little about yourself and we’ll send you the details for the next gathering.</p><div className="join-details"><span><Check size={16} /> {text("First visit is always welcome", "الزيارة الأولى مرحب بها دائمًا")}</span><span><Check size={16} /> {text("All levels, zero judgement", "كل المستويات، بلا أحكام")}</span><span><Check size={16} /> {text("New friends included", "أصدقاء جدد بانتظارك")}</span></div></div><div className="join-form-wrap">{submitted ? (
              <motion.div
                className="success-state"
                initial={{ opacity: 0, scale: 0.55, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 180, damping: 12 }}
              >
                <motion.span
                  className="success-icon"
                  animate={{ rotate: [0, -12, 12, -6, 6, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.8 }}
                >
                  <Check size={25} />
                </motion.span>
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {text("You’re on the list! 🎉", "أنت الآن على القائمة! 🎉")}
                </motion.h3>
                <p>{text("Welcome to the Travellers family. Your next adventure starts here. 🌍✈️", "مرحبًا بك في عائلة Travellers. مغامرتك القادمة تبدأ من هنا. 🌍✈️")}</p>
                <a href="#top" className="text-link light-link">{text("Back to the top", "العودة إلى الأعلى")} <ArrowRight size={16} /></a>
              </motion.div>
            ) : (
              <div className="form-heading">
                <div className="form-cta">
                  <div className="form-cta-copy">
                    <span className="eyebrow">{text("Join Travellers", "انضم إلى Travellers")}</span>
                    <strong>{text("Ready to join us?", "هل أنت مستعد للانضمام إلينا؟")}</strong>
                    <p>{text("Fill out the short registration form and become part of the club.", "املأ نموذج التسجيل القصير وكن جزءًا من النادي.")}</p>
                  </div>
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLScE8IAR-GdS1KYcF4lIbCAn-d1a9-bZMQ-v_YIjBZejBJnCaA/viewform"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button button-primary"
                  >
                    Join the club <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
        </section>
      </main>

      <footer className="site-footer"><div className="container footer-main"><a href="#top" className="brand-lockup footer-brand"><span className="brand-mark"><Globe2 size={21} strokeWidth={2.2} /></span><span className="brand-wordmark">Travellers <em>English Club</em></span></a><p>{text("Better English.", "إنجليزية أفضل.")}<br /><em>{text("More life.", "حياة أكثر.")}</em></p><div className="footer-socials"><a href="#top" aria-label="Instagram"><Instagram size={18} /></a><a href="#top" aria-label="YouTube"><Youtube size={18} /></a><a href="#top" aria-label="LinkedIn"><Linkedin size={18} /></a></div></div><div className="container footer-bottom"><span>© 2026 Travellers English Club</span><span>{text("Cairo, Egypt · Made for curious people", "القاهرة، مصر · صُنع للفضوليين")}</span><a href="#top">Back to top ↑</a></div></footer>
      <style>{`        .language-switch { display:inline-flex; align-items:center; gap:7px; margin-left:12px; padding:4px; border:1px solid rgba(75,60,45,.12); border-radius:999px; background:rgba(255,250,242,.72); backdrop-filter:blur(10px); }
        .language-switch button { border:0; background:transparent; color:#71675d; border-radius:999px; padding:7px 10px; font:inherit; font-size:.72rem; font-weight:800; cursor:pointer; transition:all 180ms ease; }
        .language-switch button.language-active { background:#f3d88a; color:#312a20; }
        .language-switch > span { color:#b1a69a; font-size:.7rem; }
        .site-shell[dir="rtl"] { font-family:"Noto Sans Arabic","Tahoma","Arial",sans-serif; }
        .site-shell[dir="rtl"] .display-heading, .site-shell[dir="rtl"] .hero-title, .site-shell[dir="rtl"] h1, .site-shell[dir="rtl"] h2, .site-shell[dir="rtl"] h3 { letter-spacing:0; }
        .site-shell[dir="rtl"] .arrow-button-icon, .site-shell[dir="rtl"] .path-arrow, .site-shell[dir="rtl"] .activity-chevron { transform:scaleX(-1); }
        @media (max-width:980px) { .language-switch { margin-left:auto; margin-right:10px; } .site-shell[dir="rtl"] .language-switch { margin-left:10px; margin-right:auto; } }
        @media (max-width:800px) { .language-switch { padding:3px; gap:3px; } .language-switch button { padding:6px 8px; } }

        .english-course-section { position: relative; overflow: hidden; }
        .english-course-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(320px, .85fr);
          gap: clamp(35px, 7vw, 100px);
          align-items: center;
        }
        .english-course-copy { max-width: 680px; }
        .english-course-copy .large-copy { max-width: 58ch; margin-top: 20px; }
        .course-highlights {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px 18px;
          margin-top: 28px;
        }
        .course-highlights span {
          display: flex;
          align-items: center;
          gap: 9px;
          font-size: .9rem;
          font-weight: 700;
          color: #51483f;
        }
        .course-highlights svg { color: #9b7a2f; flex: 0 0 auto; }
        .english-course-card {
          position: relative;
          overflow: hidden;
          padding: clamp(26px, 4vw, 38px);
          border-radius: 30px;
          background: #f7ead0;
          border: 1px solid rgba(75, 60, 45, .10);
          box-shadow: 0 25px 70px rgba(65, 49, 34, .12);
        }
        .english-course-card::before {
          content: "";
          position: absolute;
          width: 220px;
          height: 220px;
          right: -95px;
          top: -95px;
          border-radius: 50%;
          border: 1px solid rgba(155, 122, 47, .22);
          box-shadow: 0 0 0 35px rgba(155, 122, 47, .05), 0 0 0 70px rgba(155, 122, 47, .035);
          pointer-events: none;
        }
        .course-card-icon {
          width: 52px;
          height: 52px;
          display: grid;
          place-items: center;
          margin-bottom: 22px;
          border-radius: 16px;
          background: #fffaf2;
          color: #8b6a28;
          box-shadow: 0 8px 24px rgba(75, 60, 45, .08);
        }
        .english-course-card h3 {
          margin: 12px 0 12px;
          font-size: clamp(1.8rem, 3vw, 2.55rem);
          line-height: 1;
          letter-spacing: -.045em;
        }
        .english-course-card > p {
          position: relative;
          z-index: 1;
          color: #665d53;
          line-height: 1.65;
          margin-bottom: 22px;
        }
        .course-card-details {
          display: grid;
          gap: 10px;
          margin-bottom: 26px;
        }
        .course-card-details span {
          display: flex;
          align-items: center;
          gap: 9px;
          color: #4d463e;
          font-size: .85rem;
          font-weight: 700;
        }
        .course-card-details svg { color: #9b7a2f; }
        .course-button { position: relative; z-index: 1; }
        @media (max-width: 800px) {
          .english-course-grid { grid-template-columns: 1fr; gap: 32px; }
          .course-highlights { grid-template-columns: 1fr; }
        }

        .hero-art-frame { position: relative; overflow: hidden; }
        .hero-art-frame > img { transition: transform 700ms cubic-bezier(.2,.7,.2,1), filter 500ms ease; }
        .hero-art-frame:hover > img { transform: scale(1.025); filter: saturate(1.04) contrast(1.02); }
        .admin-section { background: #201d1a; color: #f8f2e9; position: relative; overflow: hidden; }
        .admin-section::before { content: ""; position: absolute; width: 480px; height: 480px; right: -180px; top: -240px; border-radius: 50%; border: 1px solid rgba(243,216,138,.12); box-shadow: 0 0 0 60px rgba(243,216,138,.025), 0 0 0 120px rgba(243,216,138,.018); pointer-events: none; }
        .admin-section-shell { display: grid; grid-template-columns: minmax(0, 1fr) minmax(320px, .85fr); gap: clamp(30px, 7vw, 100px); align-items: center; position: relative; z-index: 1; }
        .admin-section-intro { max-width: 600px; }
        .admin-section-intro h2 { margin: 14px 0 18px; font-size: clamp(2.6rem, 5.5vw, 5.2rem); line-height: .9; letter-spacing: -.065em; }
        .admin-section-intro h2 em { font-family: Georgia, serif; font-weight: 400; letter-spacing: -.045em; }
        .admin-section-intro p { max-width: 42ch; color: #aaa096; line-height: 1.65; }
        .admin-console { background: linear-gradient(145deg, #302b26, #211e1b); color: #f8f2e9; border: 1px solid rgba(255,255,255,.09); border-radius: 28px; padding: 27px; box-shadow: 0 25px 70px rgba(0,0,0,.28); }
        .admin-console-top { display: flex; justify-content: space-between; align-items: center; gap: 16px; }
        .admin-console h2 { margin: 10px 0 0; font-size: 1.8rem; letter-spacing: -.04em; }
        .admin-kicker { color: #d9c78d; display: flex; align-items: center; gap: 6px; font-size: .72rem; letter-spacing: .12em; text-transform: uppercase; font-weight: 800; }
        .admin-entry, .admin-primary, .admin-toggle, .admin-reset { display: inline-flex; align-items: center; justify-content: center; gap: 8px; border: 0; border-radius: 999px; cursor: pointer; font-weight: 700; }
        .admin-entry { width: 100%; margin-top: 34px; padding: 14px 18px; background: #f3d88a; color: #312a20; transition: transform 180ms ease, box-shadow 180ms ease; }
        .admin-entry:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(243,216,138,.16); }
        .admin-login { display: grid; gap: 14px; margin-top: 28px; }
        .admin-login label, .admin-control { display: grid; gap: 8px; color: #d8cec0; font-size: .78rem; letter-spacing: .04em; }
        .admin-login input, .admin-control select, .admin-control input[type=range] { width: 100%; box-sizing: border-box; }
        .admin-login input, .admin-control select { border: 1px solid #5f564b; border-radius: 10px; padding: 11px 12px; color: #fff; background: #35302a; }
        .admin-primary { padding: 12px 16px; background: #e6c86d; color: #30281d; }
        .admin-login small { color: #9d9387; line-height: 1.4; }
        .admin-dashboard { display: grid; gap: 20px; margin-top: 24px; }
        .admin-live-row { display: flex; justify-content: space-between; align-items: center; gap: 16px; border-bottom: 1px solid #4a4239; padding-bottom: 16px; color: #e8dfd3; font-size: .85rem; }
        .admin-dot { display: inline-block; width: 8px; height: 8px; margin-right: 6px; border-radius: 50%; background: #82786d; }.admin-dot.on { background: #8ed6a9; box-shadow: 0 0 0 4px rgba(142,214,169,.13); }
        .admin-toggle { padding: 7px 12px; background: #443c34; color: #f8f2e9; }
        .admin-control strong { color: #f3d88a; font-size: .9rem; }
        .admin-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }.admin-stats div { background: #35302a; border-radius: 12px; padding: 12px 8px; text-align: center; }.admin-stats strong, .admin-stats span { display: block; }.admin-stats strong { color: #f3d88a; font-size: 1.15rem; }.admin-stats span { color: #a89e92; font-size: .68rem; margin-top: 3px; text-transform: uppercase; letter-spacing: .08em; }
        .admin-reset { justify-self: start; padding: 8px 0; background: transparent; color: #c9bdae; }
        @media (max-width: 800px) { .admin-section-shell { grid-template-columns: 1fr; gap: 28px; } }
        @media (prefers-reduced-motion: reduce) { .hero-art-frame > img, .admin-entry { transition: none; } }
      `}</style>
    </div>
  );
}
