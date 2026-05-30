// ============================================================================
// TELAX SITE CONFIGURATION
// Urban Agriculture & Regenerative Farming Education Platform
// ============================================================================

// ----------------------------------------------------------------------------
// Navigation
// ----------------------------------------------------------------------------

export interface NavLink {
  label: string;
  href: string;
}

export interface NavigationConfig {
  logo: string;
  logoAccent: string;
  navLinks: NavLink[];
  ctaText: string;
}

export const navigationConfig: NavigationConfig = {
  logo: "TELAX",
  logoAccent: "",
  navLinks: [
    { label: "Lessons", href: "/lessons" },
    { label: "Blog", href: "#blog" },
    { label: "Projects", href: "#projects" },
    { label: "About", href: "#about" },
  ],
  ctaText: "Donate",
};

// ----------------------------------------------------------------------------
// Hero Section
// ----------------------------------------------------------------------------

export interface HeroConfig {
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  ctaSecondaryText: string;
  ctaSecondaryHref: string;
  backgroundImage: string;
  microLabel: string;
}

export const heroConfig: HeroConfig = {
  titleLine1: "GROW",
  titleLine2: "KNOWLEDGE",
  subtitle: "Free lessons in regenerative farming—designed for city growers.",
  ctaText: "Start Learning",
  ctaHref: "/lessons",
  ctaSecondaryText: "Explore Projects",
  ctaSecondaryHref: "#projects",
  backgroundImage: "/images/hero_seedling.jpg",
  microLabel: "URBAN AGRICULTURE EDUCATION",
};

// ----------------------------------------------------------------------------
// Lessons Section (Bento Grid)
// ----------------------------------------------------------------------------
export interface LessonCard {
  tag: string;
  title: string;
  image: string;
  author?: {
    name: string;
    avatar: string;
    quote: string;
  };
}

export interface LessonsConfig {
  sectionLabel: string;
  headline: string;
  description: string;
  linkText: string;
  linkHref: string;
  cards: LessonCard[];
}

export const lessonsConfig: LessonsConfig = {
  sectionLabel: "LESSONS",
  headline: "LESSONS",
  description: "Short, practical guides you can use today—soil, water, pests, compost, and planting calendars.",
  linkText: "Browse all lessons",
  linkHref: "/lessons",
  cards: [
    {
      tag: "SOIL",
      title: "Build living soil in containers",
      image: "/images/lessons_soil.jpg",
      author: {
        name: "Sarah Chen",
        avatar: "/images/author_sarah.jpg",
        quote: "Living soil is the foundation of any thriving garden. It's not just dirt—it's a living ecosystem.",
      },
    },
    {
      tag: "COMPOST",
      title: "Compost without the smell",
      image: "/images/lessons_compost.jpg",
    },
  ],
};

// ----------------------------------------------------------------------------
// About / Regenerative Farming Section
// ----------------------------------------------------------------------------

export interface AboutConfig {
  sectionLabel: string;
  headlineLine1: string;
  headlineLine2: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  image: string;
}

export const aboutConfig: AboutConfig = {
  sectionLabel: "ABOUT US",
  headlineLine1: "REGENERATIVE",
  headlineLine2: "FARMING",
  description: "We teach practices that rebuild soil, save water, and reduce waste—designed for rooftops, balconies, and small plots.",
  ctaText: "Read our approach",
  ctaHref: "#",
  image: "/images/regen_field.jpg",
};

// ----------------------------------------------------------------------------
// Community Fields Section
// ----------------------------------------------------------------------------

export interface CommunityConfig {
  headlineLine1: string;
  headlineLine2: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  backgroundImage: string;
}

export const communityConfig: CommunityConfig = {
  headlineLine1: "COMMUNITY",
  headlineLine2: "FIELDS",
  description: "Join a local cohort. Learn together. Share tools, seeds, and harvests.",
  ctaText: "Find a cohort near you",
  ctaHref: "#",
  backgroundImage: "/images/community_fields.jpg",
};

// ----------------------------------------------------------------------------
// Hands-On Learning Section
// ----------------------------------------------------------------------------

export interface LearningConfig {
  sectionLabel: string;
  headlineLine1: string;
  headlineLine2: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  image: string;
}

export const learningConfig: LearningConfig = {
  sectionLabel: "METHOD",
  headlineLine1: "HANDS-ON",
  headlineLine2: "LEARNING",
  description: "Watch, practice, document. Our method mixes short videos with real-world tasks you complete in your own space.",
  ctaText: "See how it works",
  ctaHref: "#",
  image: "/images/hands_on_learning.jpg",
};

// ----------------------------------------------------------------------------
// Greenhouse Classroom Section
// ----------------------------------------------------------------------------

export interface GreenhouseConfig {
  headlineLine1: string;
  headlineLine2: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  backgroundImage: string;
}

export const greenhouseConfig: GreenhouseConfig = {
  headlineLine1: "GREENHOUSE",
  headlineLine2: "CLASSROOM",
  description: "Structured courses for schools, teams, and community groups—taught by local growers.",
  ctaText: "Request a workshop",
  ctaHref: "#",
  backgroundImage: "/images/greenhouse_classroom.jpg",
};

// ----------------------------------------------------------------------------
// Seasonal Rhythms Section
// ----------------------------------------------------------------------------

export interface SeasonalConfig {
  sectionLabel: string;
  headlineLine1: string;
  headlineLine2: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  image: string;
}

export const seasonalConfig: SeasonalConfig = {
  sectionLabel: "PLANNING",
  headlineLine1: "SEASONAL",
  headlineLine2: "RHYTHMS",
  description: "Planting calendars, pest alerts, and harvest reminders—tailored to your climate zone.",
  ctaText: "Get the calendar",
  ctaHref: "#",
  image: "/images/seasonal_rhythms.jpg",
};

// ----------------------------------------------------------------------------
// Harvest & Share Section
// ----------------------------------------------------------------------------

export interface HarvestConfig {
  headlineLine1: string;
  headlineLine2: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  backgroundImage: string;
}

export const harvestConfig: HarvestConfig = {
  headlineLine1: "HARVEST",
  headlineLine2: "& SHARE",
  description: "Learn to preserve, cook, and share what you grow. Reduce waste. Feed neighbors.",
  ctaText: "Explore harvest guides",
  ctaHref: "#",
  backgroundImage: "/images/harvest_share.jpg",
};

// ----------------------------------------------------------------------------
// Join Movement Section
// ----------------------------------------------------------------------------

export interface JoinConfig {
  sectionLabel: string;
  headlineLine1: string;
  headlineLine2: string;
  description: string;
  ctaText: string;
  microcopy: string;
  image: string;
}

export const joinConfig: JoinConfig = {
  sectionLabel: "NEWSLETTER",
  headlineLine1: "JOIN THE",
  headlineLine2: "MOVEMENT",
  description: "Get weekly tips, planting reminders, and invites to local events. No spam. Unsubscribe anytime.",
  ctaText: "Subscribe",
  microcopy: "Join 12,000+ city growers.",
  image: "/images/join_movement.jpg",
};

// ----------------------------------------------------------------------------
// Projects Section
// ----------------------------------------------------------------------------

export interface Project {
  id: string;
  title: string;
  description: string;
  location: string;
  image: string;
  tags: string[];
}

export interface ProjectsConfig {
  sectionLabel: string;
  headline: string;
  description: string;
  projects: Project[];
}

export const projectsConfig: ProjectsConfig = {
  sectionLabel: "PROJECTS",
  headline: "Active Initiatives",
  description: "Explore our ongoing agricultural projects making an impact in urban communities.",
  projects: [
    {
      id: "1",
      title: "Rooftop Revival",
      description: "Transforming underutilized rooftop spaces into productive green gardens across downtown districts.",
      location: "New York, NY",
      image: "/images/community_fields.jpg",
      tags: ["Urban", "Rooftop"],
    },
    {
      id: "2",
      title: "Soil regeneration",
      description: "Community-led composting program diverting organic waste from landfills to build living soil.",
      location: "Portland, OR",
      image: "/images/lessons_compost.jpg",
      tags: ["Compost", "Circular"],
    },
    {
      id: "3",
      title: "Youth Greenhouse",
      description: "Educational greenhouse program teaching high school students sustainable growing practices.",
      location: "Austin, TX",
      image: "/images/greenhouse_classroom.jpg",
      tags: ["Education", "Youth"],
    },
  ],
};

// ----------------------------------------------------------------------------
// Donation Section
// ----------------------------------------------------------------------------

export interface DonationTier {
  name: string;
  amount: string;
  description: string;
  benefits: string[];
  accent: "forest" | "earth-orange" | "mineral-teal";
}

export interface DonationConfig {
  sectionLabel: string;
  headline: string;
  description: string;
  tiers: DonationTier[];
}

export const donationConfig: DonationConfig = {
  sectionLabel: "SUPPORT",
  headline: "Support Our Mission",
  description: "Your contribution helps us provide free education and resources to urban growers worldwide.",
  tiers: [
    {
      name: "Seedling",
      amount: "KSH350",
      description: "Help a new grower get started",
      benefits: ["Monthly newsletter", "Digital starter guide", "Community access"],
      accent: "forest",
    },
    {
      name: "Harvester",
      amount: "KSH700",
      description: "Support a local workshop",
      benefits: ["All Seedling benefits", "Workshop discounts", "Priority event access"],
      accent: "earth-orange",
    },
    {
      name: "Guardian",
      amount: "KSH1500",
      description: "Fund a community garden plot",
      benefits: ["All Harvester benefits", "Named garden bed", "Annual report", "VIP events"],
      accent: "mineral-teal",
    },
  ],
};

// ----------------------------------------------------------------------------
// Partnership Section
// ----------------------------------------------------------------------------

export interface PartnershipConfig {
  sectionLabel: string;
  headline: string;
  description: string;
  ctaText: string;
  badges: string[];
}

export const partnershipConfig: PartnershipConfig = {
  sectionLabel: "PARTNERS",
  headline: "Partner With Us",
  description: "We work with schools, nonprofits, and local councils to bring growing education to more neighborhoods.",
  ctaText: "Become a Partner",
  badges: ["Impact Partner", "Education Ally", "Community Sponsor"],
};

// ----------------------------------------------------------------------------
// Footer
// ----------------------------------------------------------------------------

export interface SocialLink {
  platform: "instagram" | "twitter" | "youtube" | "linkedin";
  href: string;
  label: string;
}

export interface FooterLinkSection {
  title: string;
  links: { label: string; href: string }[];
}

export interface FooterConfig {
  logo: string;
  logoAccent: string;
  brandDescription: string;
  socialLinks: SocialLink[];
  linkSections: FooterLinkSection[];
  contact: {
    email: string;
    location: string;
  };
  legalLinks: { label: string; href: string }[];
  copyrightText: string;
}

export const footerConfig: FooterConfig = {
  logo: "TELAX",
  logoAccent: "",
  brandDescription: "Urban agriculture education for a regenerative future.",
  socialLinks: [
    { platform: "instagram", href: "#", label: "Instagram" },
    { platform: "youtube", href: "#", label: "YouTube" },
    { platform: "linkedin", href: "#", label: "LinkedIn" },
  ],
  linkSections: [
    {
      title: "Learn",
      links: [
        { label: "All Lessons", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Resources", href: "#" },
      ],
    },
    {
      title: "Community",
      links: [
        { label: "Projects", href: "#" },
        { label: "Events", href: "#" },
        { label: "Find a Cohort", href: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Donate", href: "#" },
        { label: "Partner", href: "#" },
        { label: "Contact", href: "#" },
      ],
    },
  ],
  contact: {
    email: "hello@telax.org",
    location: "Remote-first / Local chapters",
  },
  legalLinks: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Accessibility", href: "#" },
  ],
  copyrightText: "© 2026 TELAX. All rights reserved.",
};

// ----------------------------------------------------------------------------
// Site Metadata
// ----------------------------------------------------------------------------

export interface SiteConfig {
  title: string;
  description: string;
  language: string;
}

export const siteConfig: SiteConfig = {
  title: "TELAX — Urban Agriculture Education",
  description: "Free lessons in regenerative farming—designed for city growers. Grow knowledge. Grow community. Grow food.",
  language: "en",
};

// ----------------------------------------------------------------------------
// Creator Access (Protected Write)
// ----------------------------------------------------------------------------

export interface CreatorConfig {
  buttonText: string;
  modalTitle: string;
  modalDescription: string;
  loginButtonText: string;
  signupButtonText: string;
}

export const creatorConfig: CreatorConfig = {
  buttonText: "Creator Access",
  modalTitle: "Creator Portal",
  modalDescription: "Sign in to contribute blog posts, upload farm imagery, and share your growing journey with the community.",
  loginButtonText: "Sign In",
  signupButtonText: "Become a Creator",
};
