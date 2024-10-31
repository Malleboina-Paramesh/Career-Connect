import { auth } from "@/auth";
import { Button } from "@local/ui/components/button";
import Link from "next/link";
import { Menu, ArrowRight, Check, Star, Shield, Clock } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@local/ui/components/sheet";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@local/ui/components/card";
import { ThemeSwitch } from "@/components/ThemeSwitch";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Roles", href: "#roles" },
  { name: "Benefits", href: "#benefits" },
  { name: "Testimonials", href: "#testimonials" },
];

const roles = [
  {
    title: "Training Mentor",
    description:
      "Shape the next generation of developers through hands-on training",
    perks: ["Flexible hours", "Performance bonuses", "Impact careers"],
    icon: "👨‍💻",
    highlight: "Most Popular",
  },
  {
    title: "Career Advisor",
    description: "Guide students with your industry expertise and insights",
    perks: ["Remote work", "Career growth", "Network building"],
    icon: "🎯",
  },
  {
    title: "Course Admin",
    description: "Design and manage cutting-edge tech curriculum",
    perks: ["Creative control", "Resource access", "Industry collaboration"],
    icon: "📚",
  },
  {
    title: "Master Admin",
    description: "Lead strategic initiatives and platform development",
    perks: ["Leadership role", "Strategic impact", "Team management"],
    icon: "⭐",
    highlight: "Senior Position",
  },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Senior Training Mentor",
    content:
      "Joining Career Connect was the best decision of my career. The impact we make on students' lives is incredibly rewarding.",
    image: "/sarah.jpg", // Add actual image path
  },
  {
    name: "James Wilson",
    role: "Course Administrator",
    content:
      "The autonomy and support I receive here is unmatched. We're truly shaping the future of tech education.",
    image: "/james.jpg", // Add actual image path
  },
  {
    name: "Priya Patel",
    role: "Career Advisor",
    content:
      "Being able to guide students while working remotely has been amazing. The platform makes mentoring seamless.",
    image: "/priya.jpg", // Add actual image path
  },
];

const stats = [
  { number: "500+", label: "Students Mentored" },
  { number: "95%", label: "Satisfaction Rate" },
  { number: "50+", label: "Expert Mentors" },
];

export default async function Page() {
  const session = await auth();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-zinc-200 dark:border-zinc-800 z-50">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link
                href="/"
                className="text-2xl font-bold bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 text-transparent bg-clip-text"
              >
                Career Connect
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <ThemeSwitch />
              {session?.user ? (
                <Link href="/dashboard">
                  <Button variant="default" className="group">
                    Dashboard
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              ) : (
                <Link href="/login">
                  <Button className="group">
                    Join Our Team
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col space-y-4 mt-8">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                    {session?.user ? (
                      <Link href="/dashboard">
                        <Button className="w-full">Dashboard</Button>
                      </Link>
                    ) : (
                      <Link href="/login">
                        <Button className="w-full">Join Our Team</Button>
                      </Link>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,0,0,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.05),transparent_50%)]"></div> */}
        <div className="container mx-auto text-center relative">
          <div className="inline-block mb-6 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-full">
            <span className="text-zinc-900 dark:text-zinc-100 font-semibold">
              Join Our Elite Team
            </span>
          </div>
          <h1 className="text-4xl md:text-7xl font-bold mb-6 bg-gradient-to-b from-black to-zinc-600 dark:from-white dark:to-zinc-400 text-transparent bg-clip-text leading-tight">
            Elevate Tech Careers Through Mentorship
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8 max-w-2xl mx-auto">
            Be part of a revolutionary platform that transforms tech education
            through expert guidance and innovative learning experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg group">
              Apply Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 ">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center border min-h-44 flex flex-col justify-center items-center rounded-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-black to-zinc-600 dark:from-white dark:to-zinc-400 text-transparent bg-clip-text">
                  {stat.number}
                </div>
                <div className="text-zinc-600 dark:text-zinc-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="py-20" id="roles">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-black to-zinc-600 dark:from-white dark:to-zinc-400 text-transparent bg-clip-text">
            Available Positions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {roles.map((role) => (
              <Card
                key={role.title}
                className="group hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              >
                {role.highlight && (
                  <div className="absolute top-4 right-4 bg-black dark:bg-white text-white dark:text-black text-xs font-bold px-3 py-1 rounded-full">
                    {role.highlight}
                  </div>
                )}
                <CardHeader>
                  <div className="text-4xl mb-4">{role.icon}</div>
                  <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                    {role.title}
                  </CardTitle>
                  <CardDescription className="text-zinc-600 dark:text-zinc-400">
                    {role.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {role.perks.map((perk, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <Check className="h-4 w-4 mr-2 text-primary" />
                        {perk}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 " id="benefits">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-black to-zinc-600 dark:from-white dark:to-zinc-400 text-transparent bg-clip-text">
            Why Choose Career Connect?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center group hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <Star className="h-12 w-12 mx-auto mb-4 text-primary" />
                <CardTitle>Professional Growth</CardTitle>
                <CardDescription>
                  Continuous learning and development opportunities
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center group hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <Shield className="h-12 w-12 mx-auto mb-4 text-primary" />
                <CardTitle>Job Security</CardTitle>
                <CardDescription>
                  Long-term career stability and growth potential
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center group hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <Clock className="h-12 w-12 mx-auto mb-4 text-primary" />
                <CardTitle>Work-Life Balance</CardTitle>
                <CardDescription>
                  Flexible scheduling and remote work options
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20" id="testimonials">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-black to-zinc-600 dark:from-white dark:to-zinc-400 text-transparent bg-clip-text">
            What Our Team Says
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-zinc-200 dark:bg-zinc-700" />
                    <div>
                      <CardTitle className="text-lg">
                        {testimonial.name}
                      </CardTitle>
                      <CardDescription>{testimonial.role}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    {testimonial.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-black to-zinc-600 dark:from-white dark:to-zinc-400 text-transparent bg-clip-text">
            Simple Application Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Submit Application",
                description:
                  "Fill out our online application form with your details and experience",
              },
              {
                step: "2",
                title: "Initial Screen",
                description: "Quick review of your application by our team",
              },
              {
                step: "3",
                title: "Interview",
                description:
                  "Discussion about your experience and role expectations",
              },
              {
                step: "4",
                title: "Welcome Aboard",
                description: "Receive your offer and join our community",
              },
            ].map((step, index) => (
              <div key={index} className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-zinc-200 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <Card className="relative h-full">
                  <CardHeader>
                    <div className="w-8 h-8 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold mb-4">
                      {step.step}
                    </div>
                    <CardTitle>{step.title}</CardTitle>
                    <CardDescription>{step.description}</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-black to-zinc-600 dark:from-white dark:to-zinc-400 text-transparent bg-clip-text">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: "What qualifications do I need?",
                answer:
                  "We look for industry experience and a passion for teaching. Specific requirements vary by role.",
              },
              {
                question: "Is this a full-time position?",
                answer:
                  "We offer both full-time and part-time positions with flexible scheduling options.",
              },
              {
                question: "What's the compensation structure?",
                answer:
                  "We offer competitive base pay plus performance bonuses. Exact details discussed during interview.",
              },
              {
                question: "Can I work remotely?",
                answer:
                  "Yes, most positions offer remote work options with occasional virtual team meetings.",
              },
            ].map((faq, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300"
              >
                <CardHeader>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {faq.question}
                  </CardTitle>
                  <CardDescription>{faq.answer}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section
      <section className="py-20 bg-zinc-50 dark:bg-zinc-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-black to-zinc-600 dark:from-white dark:to-zinc-400 text-transparent bg-clip-text">
              Stay Updated
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-8">
              Get notified about new opportunities and platform updates
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="py-12 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-200 dark:border-zinc-800">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="font-bold text-lg mb-4">Career Connect</h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 max-w-md mx-auto">
              Transforming tech education through expert mentorship
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                href="#"
                className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
              >
                Terms
              </Link>
              <Link
                href="#"
                className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
              >
                Contact
              </Link>
            </div>
          </div>
          <div className=" pt-8 border-zinc-200 dark:border-zinc-800 text-center text-zinc-600 dark:text-zinc-400">
            © 2024 Career Connect. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
