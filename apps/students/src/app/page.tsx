import { auth } from "@/auth";
import { Button } from "@local/ui/components/button";
import Link from "next/link";
import { Menu, Star } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@local/ui/components/sheet";
import { ThemeSwitch } from "@/components/ThemeSwitch";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "#courses" },
  { name: "Mentors", href: "#mentors" },
  { name: "About Us", href: "#about" },
  { name: "Contact", href: "#contact" },
];

const features = [
  {
    title: "Expert-Led Training",
    description: "Learn from industry professionals with years of experience",
    icon: "🎓",
  },
  {
    title: "1:1 Mentorship",
    description: "Personal guidance to help you achieve your career goals",
    icon: "👥",
  },
  {
    title: "Industry Projects",
    description: "Real-world projects to build your portfolio",
    icon: "💼",
  },
  {
    title: "Career Support",
    description: "Job placement assistance and interview preparation",
    icon: "🚀",
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Software Engineer at Google",
    quote: "Career Connect transformed my career path completely!",
    rating: 5,
  },
  {
    name: "Mike Rodriguez",
    role: "Data Scientist at Amazon",
    quote: "The mentorship program is absolutely world-class.",
    rating: 5,
  },
];

export default async function Page() {
  const session = await auth();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b z-50">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-primary">
                Career Connect
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <ThemeSwitch />
              {session?.user ? (
                <Link href="/dashboard">
                  <Button>Dashboard</Button>
                </Link>
              ) : (
                <Link href="/login">
                  <Button>Login</Button>
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
                    <SheetTitle>Career Connect</SheetTitle>
                    <SheetDescription>
                      Navigate to different sections
                    </SheetDescription>
                  </SheetHeader>
                  <div className="flex flex-col space-y-4 mt-8">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-muted-foreground hover:text-primary transition-colors"
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
                        <Button className="w-full">Login</Button>
                      </Link>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Enhanced */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden min-h-[100vh] flex justify-center items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-background opacity-50 -z-10"></div>
        <div className="container mx-auto text-center relative">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 text-transparent bg-clip-text animate-gradient">
            Elevate Your Tech Career
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Comprehensive training, personalized mentorship, and guaranteed
            career acceleration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="text-lg shadow-xl hover:scale-105 transition-transform"
            >
              Start Learning
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg hover:bg-primary/10"
            >
              Explore Programs
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in">
            Your Path to Success
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 bg-background rounded-xl border hover:shadow-2xl transition-all group"
              >
                <div className="mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-center group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - New */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Success Stories
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-background p-8 rounded-xl border hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-500">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="italic mb-4">"{testimonial.quote}"</p>
                <div className="font-semibold">{testimonial.name}</div>
                <div className="text-muted-foreground">{testimonial.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Students Placed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Expert Mentors</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground">Career Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 ">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of successful graduates who transformed their careers
            with Career Connect
          </p>
          <Button size="lg" variant="secondary" className="text-lg">
            Get Started Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Career Connect</h3>
              <p className="text-muted-foreground">
                Empowering careers through expert guidance and comprehensive
                training.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Courses
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Mentors
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Success Stories
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="text-muted-foreground">
                  contact@careerconnect.com
                </li>
                <li className="text-muted-foreground">+1 (555) 123-4567</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-muted-foreground">
            © 2024 Career Connect. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
