export interface PersonalData {
  name: string;
  role: string;
  headline: string;
  alternativeHeadline: string;
  supportingCopy: string;
  location: string;
  availability: string;
  email: string;
  phone: string;
  phoneRaw: string;
  whatsappUrl: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
  education: Array<{
    degree: string;
    institution: string;
    period: string;
    details: string;
  }>;
}

export const personalData: PersonalData = {
  name: "Ridam Grover",
  role: "Full-Stack Engineer & Freelance Developer",
  headline: "Building digital products that work beautifully.",
  alternativeHeadline: "Developer by craft. Problem solver by nature.",
  supportingCopy:
    "I build full-stack web platforms, scalable backend systems, and cross-platform mobile apps (with verified iOS & Android store approvals) for founders and growing businesses worldwide.",
  location: "India",
  availability: "Available for Freelance Projects & Remote Roles",
  email: "ridamgrover43@gmail.com",
  phone: "+91 6239477727",
  phoneRaw: "+916239477727",
  whatsappUrl: "https://wa.me/916239477727",
  github: "https://github.com/ridamgrover",
  linkedin: "https://linkedin.com/in/ridamgrover",
  resumeUrl: "/resume/Ridam_Grover_Resume.pdf",
  education: [
    {
      degree: "Master of Computer Applications (MCA)",
      institution: "Chandigarh University",
      period: "Postgraduate Degree",
      details:
        "Specialized in advanced web architectures, software engineering principles, distributed systems, and modern database management.",
    },
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "Panjab University",
      period: "Undergraduate Degree",
      details:
        "Comprehensive foundations in data structures, algorithms, object-oriented programming, and web development fundamentals.",
    },
  ],
};
