// Default portfolio data - edit via the Admin Panel (⚙️ in footer)
// Data is stored in localStorage; this is only used on first load or after reset.

export const defaultPortfolioData = {
  hero: {
    name: "Taseer Ullah",
    title: "Junior Lecturer",
    subtitle: "& Full Stack Developer",
    location: "Shabqadar, KP, Pakistan",
    tagline: "🏆 Gold Medalist CS graduate from UET Mardan\n👨‍🏫 Teaching at UET Mardan\n🔐 Google Certified in Cybersecurity & Project Management",
    badgeText: "Gold Medalist | CGPA 3.73/4.00",
    cgpa: "3.73",
    cvFile: "/Taseer_Ullah_CV.pdf",
    photo: "/Taseer.jpg",
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    email: "taseercs66@gmail.com",
    phone: "+92-XXX-XXXXXXX"
  },

  experiences: [
    {
      title: "Junior Lecturer",
      organization: "University of Engineering & Technology (UET), Mardan",
      period: "07 Jan 2026 – Present",
      location: "Mardan, Khyber Pakhtunkhwa, Pakistan",
      description: "Teaching core computer science courses to undergraduate students while actively contributing to department administration, event management, and student project supervision. Focused on Outcome-Based Education (OBE) and hands-on learning.",
      highlights: [
        "Teach Operating Systems, Parallel & Distributed Computing, and Web Design & Development across 4th and 6th semesters",
        "Design and deliver lab sessions (Linux, system calls, scheduling algorithms, synchronization, file I/O)",
        "Supervise a Final Year Project on AI-based expense tracking",
        "Serve as Deputy Superintendent for mid-term and final-term university examinations",
        "Act as Events Organizer and Discipline Committee Member at department level",
        "Implement OBE-aligned lesson plans with CLO-PLO mapping and CMS content management"
      ]
    },
    {
      title: "Computer Science Lecturer",
      organization: "ICMS Shabqadar",
      period: "August 1, 2025 - December 2025",
      location: "Shabqadar, Khyber Pakhtunkhwa, Pakistan",
      description: "Teaching Computer Science to first-year and second-year students, focusing on C++ programming, computer hardware, networking concepts, and file handling.",
      highlights: [
        "C++ Programming (Functions, Arrays, Loops, File Handling)",
        "Computer Hardware & System Unit (Motherboard, Processors, Ports)",
        "Networking Basics (OSI Model, LAN/MAN/WAN, Transmission Modes)",
        "Practical Lab Sessions with Real Examples",
        "Creating Simplified Explanations for Complex Topics"
      ]
    }
  ],

  education: [
    {
      degree: "Master of Science in Computer Science (Cybersecurity)",
      institution: "University of Engineering & Technology (UET), Mardan",
      period: "2026 - 2028 (Expected)",
      currentSemester: "1st Semester (Spring 2026)",
      registrationNo: "26SMCS041",
      studentId: "UETMG-2026-94",
      status: "Currently Enrolled",
      logo: "/UET.png",
      achievements: [
        "🏆 #1 Merit Position (81.18% Aggregate)",
        "🥇 Gold Medalist (BS Computer Science)",
        "👨‍🏫 Junior Lecturer, CS Department",
        "📚 Research Focus: Privacy Preservation, Federated Learning, Cybersecurity"
      ],
      courses: [
        "CS-502: Advanced Operating Systems",
        "CS-538: Advanced Topics in Information Security",
        "CS-503: Theory of Programming Languages",
        "CS-505: Research Methodology"
      ],
      researchInterests: [
        "Federated Learning",
        "Privacy Preservation",
        "Data Anonymization (k-anonymity, ℓ-diversity, t-closeness)",
        "Poisoning Attacks in FL",
        "Information Security"
      ],
      supervisor: "Dr. Razaullah Khan (Data Privacy & Information Security)",
      color: "from-red-600 to-orange-600"
    },
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "University of Engineering & Technology (UET), Mardan",
      period: "2021 - 2025",
      cgpa: "3.73/4.00 (93.25%)",
      division: "First Division with Distinction",
      status: "Fresh Graduate – Degree Awarded December 2025",
      logo: "/UET.png",
      achievements: ["🥇 Gold Medalist", "⭐ Dean's List (2022, 2023, 2024)", "🎓 HEC Recognized University"],
      courses: ["Data Structures", "Computer Networks", "Database Systems", "Cybersecurity", "Artificial Intelligence", "Software Engineering", "Operating Systems", "OOP"],
      color: "from-blue-600 to-cyan-600"
    },
    {
      degree: "FSc Pre-Engineering",
      institution: "Edwardes College, Peshawar",
      period: "2019 - 2021",
      marks: "708/1100 (64.4%)",
      division: "First Division",
      board: "BISE Peshawar",
      logo: "/Edward.png",
      subjects: ["Physics", "Chemistry", "Mathematics", "Computer Science"],
      location: "Peshawar, Khyber Pakhtunkhwa",
      color: "from-green-600 to-emerald-600"
    },
    {
      degree: "Matriculation (Science Group)",
      institution: "Matta Public High School, Shabqadar",
      period: "2017 - 2019",
      marks: "971/1100 (88.3%)",
      division: "First Division with Distinction",
      board: "BISE Peshawar",
      logo: "/Matta.jpeg",
      subjects: ["Science", "Mathematics", "Computer", "English", "Urdu", "Islamiat", "Pakistan Studies"],
      location: "Shabqadar, Charsadda, KPK",
      color: "from-purple-600 to-pink-600"
    }
  ],

  skills: {
    frontend: [
      { name: "React.js", level: 90 },
      { name: "JavaScript", level: 88 },
      { name: "HTML5 & CSS3", level: 92 },
      { name: "Bootstrap", level: 85 }
    ],
    backend: [
      { name: "Python", level: 90 },
      { name: "PHP", level: 85 },
      { name: "Node.js", level: 75 },
      { name: "MySQL", level: 88 }
    ],
    other: [
      { name: "C/C++", level: 85 },
      { name: "Git & Version Control", level: 82 },
      { name: "Network Security", level: 88 },
      { name: "Cybersecurity", level: 85 }
    ]
  },

  certifications: [
    { name: "Google Cybersecurity Professional Certificate", issuer: "Google" },
    { name: "Google Project Management Certificate", issuer: "Google" }
  ],

  projects: [
    {
      title: "School Management System",
      description: "Comprehensive full-stack web application for school administration featuring student registration, real-time attendance tracking, and automated grade management system.",
      tech: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "PHP", "MySQL"],
      category: "Full Stack",
      gradient: "from-blue-500 to-cyan-500",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop",
      liveLink: "",
      githubLink: "",
      features: []
    },
    {
      title: "Unified Transport System",
      description: "Intelligent Python-based platform that aggregates and displays bus schedules from multiple transport providers using advanced web scraping techniques.",
      tech: ["Python", "Requests", "Beautiful Soup", "HTML/CSS"],
      category: "Python",
      gradient: "from-purple-500 to-pink-500",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop",
      liveLink: "",
      githubLink: "",
      features: []
    },
    {
      title: "EU Orbit Weather Dashboard",
      description: "Multi-city weather application with real-time API integration displaying temperature, humidity, wind speed, and 5-day forecasts with interactive UI.",
      tech: ["JavaScript", "REST APIs", "JSON", "Responsive Design"],
      category: "API Integration",
      gradient: "from-orange-500 to-red-500",
      image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&h=600&fit=crop",
      liveLink: "",
      githubLink: "",
      features: []
    },
    {
      title: "P2P Secure Communication System",
      description: "Peer-to-peer encrypted messaging application implementing end-to-end encryption, secure authentication, and real-time message delivery.",
      tech: ["Socket Programming", "Encryption", "Authentication"],
      category: "Security",
      gradient: "from-green-500 to-emerald-500",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop",
      liveLink: "",
      githubLink: "",
      features: []
    },
    {
      title: "Network Security Lab Suite",
      description: "Educational cybersecurity toolkit featuring packet analysis exercises, vulnerability assessment tools, and network simulation scenarios.",
      tech: ["Wireshark", "Packet Tracer", "Security Tools"],
      category: "Cybersecurity",
      gradient: "from-indigo-500 to-purple-500",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
      liveLink: "",
      githubLink: "",
      features: []
    },
    {
      title: "JobTrack Pro",
      description: "Multi-user job application tracking system with email verification, test/interview tracking, file uploads, analytics dashboard, and admin panel for complete job search management.",
      tech: ["PHP", "MySQL", "Bootstrap 5", "JavaScript", "Chart.js", "PHPMailer", "FullCalendar"],
      category: "Full Stack",
      gradient: "from-violet-500 to-purple-600",
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop",
      liveLink: "https://jobtrackpro.infinityfreeapp.com",
      githubLink: "https://github.com/yourusername/jobtrack-pro",
      features: [
        "User registration with email verification",
        "Forgot password with email reset",
        "Complete CRUD for job applications",
        "Test & interview result tracking",
        "Roll number slip upload (PDF/Images)",
        "Automated deadline notifications",
        "Analytics dashboard with charts",
        "CSV & PDF data export",
        "Admin panel with user management",
        "Mobile responsive design"
      ]
    }
  ],

  testimonials: [
    {
      name: "Prof. Dr. Muhammad Usman",
      role: "Head of CS Department, UET Mardan",
      image: "Prof. Dr. Muhammad Usman.jpeg",
      text: "Taseer was an exceptional student who consistently demonstrated outstanding academic performance and practical skills. His Gold Medal achievement is well-deserved.",
      rating: 5
    },
    {
      name: "Junaid Jadoon",
      role: "Fellow Student, UET Mardan",
      image: "Junaid.png",
      text: "Working with Taseer on projects was always a great experience. His knowledge in cybersecurity and full-stack development is truly impressive.",
      rating: 5
    },
    {
      name: "Mr.Sohail",
      role: "Student, ICMS College",
      image: "Sohail.png",
      text: "Sir Taseer's teaching methods are excellent. He makes complex programming concepts easy to understand and always encourages practical learning.",
      rating: 5
    }
  ],

  blogPosts: [
    {
      title: "Getting Started with Cybersecurity: A Beginner's Guide",
      excerpt: "Learn the fundamentals of cybersecurity and how to protect yourself from common threats. Essential knowledge for every computer science student.",
      date: "January 20, 2026",
      category: "Cybersecurity",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
      readTime: "5 min read"
    },
    {
      title: "Building Your First Full-Stack Application with MERN",
      excerpt: "Step-by-step guide to creating a complete web application using MongoDB, Express, React, and Node.js stack.",
      date: "January 15, 2026",
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=600&fit=crop",
      readTime: "8 min read"
    },
    {
      title: "Network Security Best Practices for 2026",
      excerpt: "Essential security practices every organization should implement to protect their network infrastructure from modern threats.",
      date: "January 10, 2026",
      category: "Networking",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
      readTime: "6 min read"
    }
  ]
};

export const STORAGE_KEY = 'taseer_portfolio_data';

export function loadPortfolioData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to load portfolio data:', e);
  }
  return defaultPortfolioData;
}

export function savePortfolioData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save portfolio data:', e);
  }
}
