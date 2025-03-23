"use client"
import { useState, useEffect } from "react"
import { Menu, X, Code, Briefcase, User, BookOpen, Mail, ChevronRight, Github, Linkedin, Instagram } from "lucide-react"
import Image from "next/image"

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
    { id: "blogs", label: "Blogs", icon: <BookOpen size={18} /> },
    { id: "contact", label: "Contact", icon: <Mail size={18} /> },
  ]

  const projects = [
    {
      title: "E-commerce Platform",
      description: "A full-stack e-commerce platform with payment integration and admin dashboard.",
      image: "/placeholder.svg?height=300&width=400",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
    },
    {
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates.",
      image: "/placeholder.svg?height=300&width=400",
      tags: ["React", "Firebase", "Tailwind CSS"],
    },
    {
      title: "Portfolio Website",
      description: "A responsive portfolio website built with modern web technologies.",
      image: "/placeholder.svg?height=300&width=400",
      tags: ["React", "Tailwind CSS", "Next.js"],
    },
  ]

  const blogs = [
    {
      title: "Getting Started with React Hooks",
      date: "June 15, 2023",
      excerpt: "Learn how to use React Hooks to simplify your functional components.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Mastering Tailwind CSS",
      date: "July 22, 2023",
      excerpt: "Tips and tricks for building beautiful interfaces with Tailwind CSS.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "The Future of Web Development",
      date: "August 10, 2023",
      excerpt: "Exploring upcoming trends and technologies in web development.",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  if (!isMounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#1e1e24] text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1e1e24] shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-[#B8B3E9] text-2xl font-bold">Portfolio</div>

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
                  <a href="#" className="text-gray-300 hover:text-[#B8B3E9]">
                    <Github size={24} />
                  </a>
                  <a href="#" className="text-gray-300 hover:text-[#B8B3E9]">
                    <Linkedin size={24} />
                  </a>
                  <a href="#" className="text-gray-300 hover:text-[#B8B3E9]">
                    <Instagram size={24} />
                  </a>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-[#B8B3E9]">
                    <Image src="/img/girl.jpg?height=400&width=400" alt="Profile" fill sizes="(max-width: 768px) 100vw, 50vw" priority className="object-cover"/>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-[#1e1e24] bg-opacity-80">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              About <span className="text-[#B8B3E9]">Me</span>
            </h2>
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0 flex justify-center">
                <div className="relative w-full max-w-md h-80 rounded-lg overflow-hidden">
                  <Image src="/placeholder.svg?height=400&width=600" alt="About Me" fill className="object-cover" />
                </div>
              </div>
              <div className="md:w-1/2 md:pl-12">
                <h3 className="text-2xl font-semibold mb-4">Who am I?</h3>
                <p className="text-gray-300 mb-6">
                  I'm a passionate Frontend Developer with a strong foundation in building modern web applications. With
                  5 years of experience in the industry, I specialize in creating responsive, accessible, and performant
                  user interfaces.
                </p>
                <p className="text-gray-300 mb-6">
                  My journey in web development started when I was in college, and since then, I've worked with various
                  technologies and frameworks to deliver exceptional digital experiences.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-gray-400">Name:</p>
                    <p>Your Name</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Email:</p>
                    <p>your.email@example.com</p>
                  </div>
                  <div>
                    <p className="text-gray-400">From:</p>
                    <p>Your Location</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Experience:</p>
                    <p>5 Years</p>
                  </div>
                </div>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="bg-[#B8B3E9] hover:scale-105 text-[#1e1e24] font-medium px-4 py-3 rounded-md flex items-center"
                >
                  Resume <ChevronRight size={18} className="ml-1" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 bg-[#1e1e24]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              My <span className="text-[#B8B3E9]">Skills</span>
            </h2>

            <div className="mb-16">
              <h3 className="text-2xl font-semibold mb-8 text-center">Technical Skills</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {["HTML/CSS", "JavaScript", "React", "Next.js", "Tailwind CSS", "TypeScript", "Node.js", "Git"].map(
                  (skill) => (
                    <div
                      key={skill}
                      className="bg-gray-800  rounded-lg p-6 text-center hover:bg-[#234250] transition-colors"
                    >
                      <div className="text-[#B8B3E9] mb-3 flex justify-center">
                        <Code size={32} />
                      </div>
                      <h4 className="font-medium">{skill}</h4>
                    </div>
                  ),
                )}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-8 text-center">Soft Skills</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[
                  "Communication",
                  "Problem Solving",
                  "Teamwork",
                  "Time Management",
                  "Adaptability",
                  "Creativity",
                  "Leadership",
                  "Critical Thinking",
                ].map((skill) => (
                  <div
                    key={skill}
                    className="bg-gray-800  rounded-lg p-6 text-center hover:bg-[#234250] transition-colors"
                  >
                    <h4 className="font-medium">{skill}</h4>
                    <div className="w-full bg-gray-700 h-2 rounded-full mt-3">
                      <div
                        className="bg-[#B8B3E9] h-2 rounded-full"
                        style={{ width: `${Math.floor(Math.random() * 30) + 70}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 bg-[#1e1e24] bg-opacity-80">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              My <span className="text-[#B8B3E9]">Projects</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="bg-gray-800  rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-300"
                >
                  <div className="relative h-48">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-300 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="bg-[#B8B3E9] bg-opacity-20 text-[#B8B3E9] text-sm px-3 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button className="text-[#fff] hover:text-[#B8B3E9] font-medium flex items-center">
                      View Project <ChevronRight size={16} className="ml-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <button className="border border-[#B8B3E9] text-[#B8B3E9] hover:scale-110 hover:bg-opacity-10 font-medium px-6 py-3 rounded-md">
                View All Projects
              </button>
            </div>
          </div>
        </section>

        {/* Blogs Section */}
        <section id="blogs" className="py-20 bg-[#1e1e24]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Latest <span className="text-[#B8B3E9]">Blogs</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog, index) => (
                <div key={index} className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image src={blog.image || "/placeholder.svg"} alt={blog.title} fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <p className="text-[#B8B3E9] text-sm mb-2">{blog.date}</p>
                    <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                    <p className="text-gray-300 mb-4">{blog.excerpt}</p>
                    <button className="text-[#fff] hover:text-[#B8B3E9] font-medium flex items-center">
                      Read More <ChevronRight size={16} className="ml-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-[#1e1e24] bg-opacity-80">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Contact <span className="text-[#B8B3E9]">Me</span>
            </h2>

            <div className="flex flex-col md:flex-row gap-12">
              <div className="md:w-1/2">
                <h3 className="text-2xl font-semibold mb-6">Get In Touch</h3>
                <p className="text-gray-300 mb-8">
                  Feel free to reach out to me for any questions or opportunities. I'm always open to discussing new
                  projects, creative ideas, or opportunities to be part of your vision.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-[#B8B3E9] bg-opacity-20 p-3 rounded-lg mr-4">
                      <Mail className="text-[#B8B3E9]" />
                    </div>
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <p className="text-gray-300">your.email@example.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-[#B8B3E9] bg-opacity-20 p-3 rounded-lg mr-4">
                      <Briefcase className="text-[#B8B3E9]" />
                    </div>
                    <div>
                      <h4 className="font-medium">Work</h4>
                      <p className="text-gray-300">Open for freelance and full-time opportunities</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-[#B8B3E9] bg-opacity-20 p-3 rounded-lg mr-4">
                      <User className="text-[#B8B3E9]" />
                    </div>
                    <div>
                      <h4 className="font-medium">Social</h4>
                      <div className="flex mt-2 space-x-4">
                        <a href="#" className="text-gray-300 hover:text-[#B8B3E9]">
                          <Github size={20} />
                        </a>
                        <a href="#" className="text-gray-300 hover:text-[#B8B3E9]">
                          <Linkedin size={20} />
                        </a>
                        <a href="#" className="text-gray-300 hover:text-[#B8B3E9]">
                          <Instagram size={20} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:w-1/2">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block mb-2 text-sm font-medium">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-[#B8B3E9]"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-[#B8B3E9]"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block mb-2 text-sm font-medium">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-[#B8B3E9]"
                      placeholder="Project Inquiry"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block mb-2 text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-[#B8B3E9]"
                      placeholder="Your message here..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="bg-[#B8B3E9] hover:bg-[#6b65a1] text-[#1e1e24] hover:text-[#fff] font-medium px-6 py-3 rounded-md w-full"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} Your Name. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

