"use client"
import { useState, useEffect, useRef  } from "react"
import emailjs from "@emailjs/browser";
import { Menu, X, Code, Briefcase, User, Mail, ChevronRight, Github, Linkedin, Instagram} from "lucide-react"
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faJs, faHtml5, faCss3Alt, faReact, faNodeJs, faAndroid, faTrello, faGithub, faGitAlt, faAws  } from "@fortawesome/free-brands-svg-icons";
import {faArrowRightArrowLeft, faBolt, faDatabase} from "@fortawesome/free-solid-svg-icons";


export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleScroll = () => {
    const sections = document.querySelectorAll("section")
    const scrollPosition = window.scrollY + 100

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute("id")

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight && sectionId) {
        setActiveSection(sectionId)
      }
    })
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: "smooth",
      })
      setActiveSection(sectionId)
      setMobileMenuOpen(false)
    }
  }

  const navItems = [
    { id: "home", label: "Home", icon: <User size={18} /> },
    { id: "about", label: "About Me", icon: <User size={18} /> },
    { id: "skills", label: "Skills", icon: <Code size={18} /> },
    { id: "projects", label: "Projects", icon: <Briefcase size={18} /> },
    { id: "contact", label: "Contact", icon: <Mail size={18} /> },
  ]

  const projects = [
    {
      title: "DiMSStreamingFrontend",
      description: "This repository is a user interface for the Distributed Multimedia System for Content Streaming, including videos and music, similar to popular services such as Netflix and Spotify.",
      image: "/img/DiMSStreaming.png?height=300&width=400",
      tags: ["Python", "AWS", "JavaScript", "HTML", "CSS", "Flash"],
      githubLink: "https://github.com/JennyGS23/DiMSStreamingFrontend",
    },
    {
      title: "MedExpert",
      description: "An application designed to centralize and facilitate access to patient health information, providing detailed tracking of their medical history, appointments, medications, and diagnoses.",
      image: "/img/DiMSStreaming.png?height=300&width=400",
      tags: ["Android", "Java", "Firebase", "HTML", "CSS", "Flash"],
      githubLink: "https://github.com/bryan-ruiz/MedXpert",
    },
    {
      title: "CurlyLove",
      description: "This repository contains the development of a website designed for selling products specialized in curly hair care.",
      image: "/img/curly.PNG?height=300&width=400",
      tags: ["React", "Firebase", "Tailwind CSS", "JavaScript"],
      githubLink: "https://github.com/JennyGS23/CurlyLove",
    },
    {
      title: "SGBD Home Credit",
      description: "Development of a database system using SQL Server, taking as a case study the database of Home Credit, a financial services company.",
      image: "/img/db.jpg?height=300&width=400",
      tags: ["Python", "SQL Server"],
      githubLink: "https://github.com/JennyGS23/SGBD-Home-Credit",
    },
    {
      title: "MiniGo",
      description: "The Mini GO Compiler project aims to implement a compiler for a subset of GoLang known as Mini GO.",
      image: "/img/compiler.jpg?height=300&width=400",
      tags: ["Java", "ANTLR", "Go"],
      githubLink: "https://github.com/juanbnunez/MiniGO",
    },
  ]

 // form configuration
  const form = useRef<HTMLFormElement | null>(null);
  const [modalOpen, setModalOpen] = useState(false); 
  const [messageStatus, setMessageStatus] = useState<'success' | 'error' | null>(null); 

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (form.current) {
      emailjs.sendForm(
        process.env.NEXT_PUBLIC_SERVICE_ID as string,
        process.env.NEXT_PUBLIC_TEMPLATE_ID as string,
        form.current,
        process.env.NEXT_PUBLIC_PUBLIC_KEY as string 
      )
      .then(
        (result) => {
          console.log("Mensaje enviado", result.text);
          setMessageStatus('success');
          setModalOpen(true);
        },
        (error) => {
          console.log("Error:", error.text);
          setMessageStatus('error');
          setModalOpen(true);
        }
      );
    }
  };
  
  // Function to close the modal and reset the form
  const handleCloseModal = () => {
    setModalOpen(false);
    setMessageStatus(null);
    if (form.current) {
      form.current.reset(); 
    }
  };
  

  if (!isMounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#1e1e24] text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1e1e24] shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-[#B8B3E9] text-2xl font-bold">PortfolioJGS</div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center space-x-1 px-2 py-1 rounded transition-colors ${
                  activeSection === item.id ? "text-[#B8B3E9] font-medium" : "text-white hover:text-[#B8B3E9]"
                }`}
              >
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white hover:text-[#B8B3E9]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#1e1e24] border-t border-gray-800">
            <div className="container mx-auto px-4 py-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center space-x-2 w-full px-4 py-3 rounded transition-colors ${
                    activeSection === item.id
                      ? "text-[#B8B3E9] bg-gray-700  font-medium"
                      : "text-white bg-gray-800  hover:text-[#B8B3E9]"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="pt-20">
        {/* Home Section */}
        <section id="home" className="min-h-screen flex items-center">
          <div className="container mx-auto px-4 py-16">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  Hi, I'm <span className="text-[#B8B3E9]">Jennifer Gonzalez</span>
                </h1>
                <h2 className="text-2xl md:text-3xl mb-6">Computer Engineer</h2>
                <p className="text-lg mb-8 text-gray-300 max-w-lg">
                    Welcome to my portfolio! Here you will find information about me, my projects, and the experience 
                    I've gained throughout my career. Feel free to explore and learn more about my work and skills.
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => scrollToSection("projects")}
                    className="bg-[#B8B3E9] text-[#1e1e24] hover:scale-110 font-medium px-6 py-3 rounded-md flex items-center"
                  >
                    View Projects <ChevronRight size={18} className="ml-1" />
                  </button>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="border border-[#B8B3E9] text-[#B8B3E9] hover:scale-110 hover:bg-opacity-10 font-medium px-6 py-3 rounded-md"
                  >
                    Contact Me
                  </button>
                </div>
                <div className="flex mt-8 space-x-4">
                  <a href="https://github.com/JennyGS23" className="text-gray-300 hover:text-[#B8B3E9]">
                    <Github size={24} />
                  </a>
                  <a href="https://www.linkedin.com/in/jennifer-gonzalez-263b66265/" className="text-gray-300 hover:text-[#B8B3E9]">
                    <Linkedin size={24} />
                  </a>
                  <a href="https://www.instagram.com/jenni__gs/?hl=es-es" className="text-gray-300 hover:text-[#B8B3E9]">
                    <Instagram size={24} />
                  </a>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80 2xl:w-96 2xl:h-96 rounded-full overflow-hidden border-4 border-[#B8B3E9]">
                <Image
                  src="/img/girl.jpg?height=400&width=400"
                  alt="Profile"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                  className="object-cover"
                />
              </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="min-h-screen py-10 bg-[#1e1e24] bg-opacity-80 mb-10">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              About <span className="text-[#B8B3E9]">Me</span>
            </h2>
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0 flex justify-center">
                <div className="relative w-full max-w-xs min-w-[200px] h-[400px] rounded-2xl overflow-hidden border-4 border-[#B8B3E9] shadow-lg shadow-[#D1D1D1]">
                  <Image
                    src="/img/user.jpeg"
                    alt="About Me"
                    width={300}
                    height={400}
                    className="object-cover w-full h-full"

                  />

                </div>
              </div>
              <div className="md:w-1/2">
                <h3 className="text-2xl font-semibold mb-4">Who am I?</h3>
                <p className="text-gray-300 mb-6">
                    Computer Engineering student with 4 years of academic experience at 
                    the Costa Rica Institute of Technology (TEC). Throughout my academic journey, I have honed my 
                    problem-solving skills, effective communication, and teamwork abilities, which have allowed me 
                    to successfully complete a variety of projects.
                </p>
                <p className="text-gray-300 mb-6">
                    With a passion for innovation and continuous learning, I am constantly exploring new technologies 
                    and seeking opportunities to grow within the field of software and web development. I pride myself 
                    on my ability to collaborate efficiently within teams, guided by clear communication and leadership. 
                    I am committed to excellence and always aim to deliver the best in every task I take on.
                </p>
                <div className="grid grid-cols-2 gap-2 mb-6">
                  <div>
                    <p className="text-gray-400">Name:</p>
                    <p>Jennifer González</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Email:</p>
                    <p>gonzalezsolisjennifer@gmail.com</p>
                  </div>
                  <div>
                    <p className="text-gray-400">From:</p>
                    <p>San Carlos, Costa Rica</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Experience:</p>
                    <p> 4 years of academic experience</p>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="min-h-screen py-10 bg-[#1e1e24]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              My <span className="text-[#B8B3E9]">Skills</span>
            </h2>

            <div className="mb-16">
              <h3 className="text-2xl font-semibold mb-8 ">Technical Skills</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[
                  { name: "Python", icon: <img src="/img/piton.png" alt="Python" className="w-10 h-10 mt-2" /> },
                  { name: "Java", icon: <img src="/img/java.png" alt="Java" className="w-12 h-12" />},
                  { name: "Android", icon: <FontAwesomeIcon icon={faAndroid} style={{ color: "#26b51c", fontSize: "2rem" }} /> },
                  { name: "HTML", icon: <FontAwesomeIcon icon={faHtml5} style={{ color: "#e3580d", fontSize: "2rem" }} />  },
                  { name: "JavaScript", icon: <FontAwesomeIcon icon={faJs} style={{ color: "#FFD43B", fontSize: "2rem" }} /> },
                  { name: "TypeScript", icon: <img src="/img/typescript.png" alt="Typescript" className="w-10 h-10" />},
                  { name: "React", icon: <FontAwesomeIcon icon={faReact} style={{ color: "#2ea4ff", fontSize: "2rem" }} /> },
                  { name: "Next.js", icon: <img src="/img/next.png" alt="Next" className="w-8 h-8" /> },
                  { name: "Node.js", icon: <FontAwesomeIcon icon={faNodeJs} style={{ color: "#1f951d", fontSize: "2rem" }} /> },
                  { name: "SQL", icon: <FontAwesomeIcon icon={faDatabase} style={{ color: "#8b6cea", fontSize: "2rem" }} /> },
                  { name: "Firebase", icon: <img src="/img/firebase.png" alt="Firebase" className="w-10 h-10" /> },
                  { name: "AWS", icon: <FontAwesomeIcon icon={faAws} style={{ color: "#fff", fontSize: "2rem" }} /> },
                  { name: "CSS", icon: <FontAwesomeIcon icon={faCss3Alt} style={{ color: "#2ea4ff", fontSize: "2rem" }} /> },
                  { name: "Tailwind CSS", icon: <img src="/img/tailwind.png" alt="Tailwind" className="w-12 h-12" /> },
                  { name: "FastAPI", icon: <FontAwesomeIcon icon={faBolt} style={{ color: "#46af8f", fontSize: "2rem" }} /> },
                  { name: "Flask", icon: <img src="/img/flask.png" alt="Flask" className="w-10 h-10" /> },
                  { name: "REST API", icon: <FontAwesomeIcon icon={faArrowRightArrowLeft} style={{ color: "#e3580d", fontSize: "1.5rem" }} /> },
                  { name: "Github", icon: <FontAwesomeIcon icon={faGithub} style={{ color: "#000", fontSize: "2rem" }} /> },
                  { name: "Git", icon: <FontAwesomeIcon icon={faGitAlt} style={{ color: "#e3580d", fontSize: "2rem" }} />},
                  { name: "Jira", icon: <img src="/img/jira.png" alt="Jira" className="w-8 h-8" /> },
                  { name: "Trello", icon: <FontAwesomeIcon icon={faTrello} style={{ color: "#153874", fontSize: "2rem" }} /> },
                  { name: "Figma", icon: <img src="/img/figma.png" alt="Figma" className="w-10 h-10" /> },
                ].map(
                  (skill) => (
                    <div
                      key={skill.name}
                      className="bg-gray-800  rounded-lg p-6 text-center hover:bg-[#234250] transition-colors"
                    >
                      <div className="text-[#B8B3E9] mb-3 flex justify-center">{skill.icon}</div>
                      <h4 className="font-medium">{skill.name}</h4>
                    </div>
                  ),
                )}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-8">Soft Skills</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[
                  "Leadership",
                  "Communication",
                  "Problem Solving",
                  "Teamwork",
                  "Discipline",
                  "Collabotarion",
                  "Time Management",
                  "Adaptability",
                  "Creativity",
                  "Critical Thinking",
                  "Work Ethic",
                  "Responsibility",
                ].map((skill) => (
                  <div
                    key={skill}
                    className="bg-gray-800  rounded-lg p-6 text-center hover:bg-[#234250] transition-colors"
                  >
                    <h4 className="font-medium">{skill}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="min-h-screen py-10 bg-[#1e1e24] bg-opacity-80 mb-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              My <span className="text-[#B8B3E9]">Projects</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="bg-gray-800  rounded-lg overflow-hidden hover:transform hover:bg-[#234250] transition-transform duration-300"
                >
                  <div className="relative h-48">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />

                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-300 mb-4 text-sm">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="bg-opacity-20 text-[#B8B3E9] text-sm  rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#fff] hover:text-[#B8B3E9] font-medium flex items-center"
                    >
                      View Project <ChevronRight size={16} className="ml-1" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <a 
                className="border border-[#B8B3E9] text-[#B8B3E9] hover:scale-110 hover:bg-opacity-10 font-medium px-6 py-3 rounded-md"
                href="https://github.com/JennyGS23"  
              >
                View All Projects
              </a>
            </div>
          </div>
        </section>

        
        {/* Contact Section */}
        <section id="contact" className="min-h-screen py-10 bg-[#1e1e24] bg-opacity-80">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Contact <span className="text-[#B8B3E9]">Me</span>
            </h2>

            <div className="flex flex-col md:flex-row gap-12">
              <div className="md:w-1/2">
                <h3 className="text-2xl font-semibold mb-6">Get In Touch</h3>
                <p className="text-gray-300 mb-8">
                  Feel free to reach out to me for any questions or opportunities. 
                </p>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-opacity-20 p-3 rounded-lg mr-4">
                      <Mail className="text-[#B8B3E9]" />
                    </div>
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <p className="text-gray-300">gonzalezsolisjennifer@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-opacity-20 p-3 rounded-lg mr-4">
                      <User className="text-[#B8B3E9]" />
                    </div>
                    <div>
                      <h4 className="font-medium">Social</h4>
                      <div className="flex mt-2 space-x-4">
                        <a href="https://github.com/JennyGS23" className="text-gray-300 hover:text-[#B8B3E9]">
                          <Github size={20} />
                        </a>
                        <a href="https://www.linkedin.com/in/jennifer-gonzalez-263b66265/" className="text-gray-300 hover:text-[#B8B3E9]">
                          <Linkedin size={20} />
                        </a>
                        <a href="https://www.instagram.com/jenni__gs/?hl=es-es" className="text-gray-300 hover:text-[#B8B3E9]">
                          <Instagram size={20} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:w-1/2">
                <form ref={form} onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block mb-2 text-sm font-medium">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="user_name"
                        id="name"
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-[#B8B3E9]"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium">
                        Your Email
                      </label>
                      <input
                        type="email"
                        name="user_email"
                        id="email"
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-[#B8B3E9]"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block mb-2 text-sm font-medium">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-[#B8B3E9]"
                      placeholder="Project Inquiry"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block mb-2 text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      rows={5}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-[#B8B3E9]"
                      placeholder="Your message here..."
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="bg-[#B8B3E9] hover:bg-[#6b65a1] text-[#1e1e24] hover:text-[#fff] font-medium px-6 py-3 rounded-md w-full"
                  >
                    Send Message
                  </button>
                </form>

                {/* Modal */}
                {modalOpen && (
                  <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg w-80 text-center">
                      {messageStatus === 'success' ? (
                        <p className="text-green-600">Your message has been sent successfully!</p>
                      ) : (
                        <p className="text-red-600">There was an error sending your message. Please try again.</p>
                      )}
                      <button
                        onClick={handleCloseModal}
                        className="bg-[#B8B3E9] text-white px-4 py-2 mt-4 rounded-md hover:bg-[#6b65a1]"
                      >
                        OK
                      </button>
                    </div>
                  </div>
                )}


              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} 2025 Jennifer González - All Rights Reserved</p>
        </div>
      </footer>
    </div>
  )
}

