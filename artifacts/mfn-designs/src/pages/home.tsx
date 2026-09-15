import { useState, useEffect } from "react";
import heroBg from "@assets/IMG_2102_1774651660167.jpeg";
import floorplanImg from "@assets/Screenshot_2026-03-27_at_3.55.30_PM_1774652562841.png";
import tilewoodImg from "@assets/IMG_2105_1774652553895.jpeg";
import cabinetImg from "@assets/Screenshot_2026-05-11_at_12.58.36_PM_1778529546102.png";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Menu, X } from "lucide-react";
import { useSubmitContact } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

// --- Components ---

function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <span className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-[0.2em] text-foreground leading-none">MFN</span>
      <div className="h-[1px] w-full bg-foreground/40 my-2 md:my-3" />
      <span className="font-sans text-[10px] md:text-xs tracking-[0.4em] font-light text-foreground/70 uppercase leading-none">Design</span>
    </div>
  );
}

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { name: "Services", id: "services" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-transparent ${
          isScrolled ? "bg-background/80 backdrop-blur-md border-border/50 py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <div 
            className="flex flex-col items-center cursor-pointer group" 
            onClick={() => scrollTo("hero")}
          >
            <span className="font-serif text-xl md:text-2xl tracking-[0.2em] text-foreground leading-none group-hover:text-foreground/80 transition-colors">MFN</span>
            <div className="h-[1px] w-full bg-foreground/40 my-1" />
            <span className="font-sans text-[8px] tracking-[0.3em] font-light text-foreground/70 uppercase leading-none">Design</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.id)}
                className="text-sm uppercase tracking-widest font-light text-foreground/80 hover:text-foreground transition-colors hover-elevate"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-foreground p-2"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-background flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-300">
          <button 
            className="absolute top-6 right-6 p-4 text-foreground/80 hover:text-foreground"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X className="w-8 h-8" />
          </button>
          
          <div className="flex flex-col items-center space-y-10">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.id)}
                className="text-2xl font-serif tracking-[0.2em] text-foreground hover:text-foreground/70 transition-colors"
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

// --- Sections ---

function Hero() {
  return (
    <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <img
        src={heroBg}
        alt="MFN Designs Kitchen"
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Wash Overlays */}
      <div className="absolute inset-0 bg-background/50 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-transparent opacity-80" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <Logo className="mb-10" />
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-sm md:text-base lg:text-lg font-light tracking-[0.1em] md:tracking-[0.2em] text-foreground/80 max-w-2xl leading-relaxed"
        >
          CRAFTING FUNCTIONAL SPACES WITHOUT SACRIFICING BEAUTY
        </motion.p>
      </div>
    </section>
  );
}


function Services() {
  return (
    <section id="services" className="border-y border-border/50">

      {/* Space Planning */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-2"
      >
        <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden bg-muted">
          <img
            src={floorplanImg}
            alt="Space Planning"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="flex flex-col justify-center px-10 py-16 md:px-16 md:py-20 bg-secondary/30">
          <h3 className="text-3xl md:text-4xl font-serif text-foreground mb-8">Space Planning</h3>
          <p className="text-foreground/60 font-light leading-relaxed text-sm md:text-base max-w-md">
            Every great space begins with a thoughtful plan. We analyze how you live and work to create layouts that feel effortless — maximizing flow, light, and purpose without compromising on the details that make a space feel like home.
          </p>
        </div>
      </motion.div>

      {/* Hardscape Design */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-2"
      >
        <div className="flex flex-col justify-center px-10 py-16 md:px-16 md:py-20 bg-background order-2 md:order-1">
          <h3 className="text-3xl md:text-4xl font-serif text-foreground mb-8">Hardscape Design</h3>
          <p className="text-foreground/60 font-light leading-relaxed text-sm md:text-base max-w-md">
            From stone terraces to custom millwork and built-in cabinetry, we design the permanent elements that define a space's character. Our hardscape work blends material integrity with refined craftsmanship to create environments that endure.
          </p>
        </div>
        <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden bg-muted order-1 md:order-2">
          <img
            src={tilewoodImg}
            alt="Hardscape Design"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      </motion.div>

      {/* Cabinet Design */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-2"
      >
        <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden bg-muted">
          <img
            src={cabinetImg}
            alt="Cabinet Design"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="flex flex-col justify-center px-10 py-16 md:px-16 md:py-20 bg-secondary/30">
          <h3 className="text-3xl md:text-4xl font-serif text-foreground mb-8">Cabinet Design</h3>
          <p className="text-foreground/60 font-light leading-relaxed text-sm md:text-base max-w-md">
            Custom cabinetry is where function meets artistry. We design bespoke cabinet solutions tailored to your space, lifestyle, and aesthetic — from kitchen and bath to built-in storage and beyond — ensuring every detail is purposeful and every finish is refined.
          </p>
        </div>
      </motion.div>
    </section>
  );
}


const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(5, "Message must be at least 5 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

function Contact() {
  const { toast } = useToast();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const submitMutation = useSubmitContact({
    mutation: {
      onSuccess: () => {
        toast({
          title: "Message Received",
          description: "Thank you for reaching out. We will get back to you shortly.",
        });
        form.reset();
      },
      onError: (error) => {
        toast({
          title: "Submission Failed",
          description: error?.message || "Something went wrong. Please try again later.",
          variant: "destructive",
        });
      },
    }
  });

  function onSubmit(data: ContactFormValues) {
    submitMutation.mutate({ data });
  }

  return (
    <section id="contact" className="py-32 px-6 bg-card border-t border-border/50">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm tracking-[0.3em] text-foreground/50 uppercase font-light mb-4">Inquiries</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                          placeholder="Name" 
                          className="border-0 border-b border-border rounded-none px-0 bg-transparent focus-visible:ring-0 focus-visible:border-foreground transition-colors placeholder:text-foreground/30 font-light"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-xs font-light text-destructive" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                          placeholder="Email" 
                          type="email"
                          className="border-0 border-b border-border rounded-none px-0 bg-transparent focus-visible:ring-0 focus-visible:border-foreground transition-colors placeholder:text-foreground/30 font-light"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-xs font-light text-destructive" />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input 
                        placeholder="Subject" 
                        className="border-0 border-b border-border rounded-none px-0 bg-transparent focus-visible:ring-0 focus-visible:border-foreground transition-colors placeholder:text-foreground/30 font-light"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-xs font-light text-destructive" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea 
                        placeholder="Message" 
                        className="border-0 border-b border-border rounded-none px-0 bg-transparent focus-visible:ring-0 focus-visible:border-foreground transition-colors placeholder:text-foreground/30 font-light min-h-[120px] resize-none"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-xs font-light text-destructive" />
                  </FormItem>
                )}
              />
              <div className="flex justify-center">
                <Button 
                  type="submit" 
                  disabled={submitMutation.isPending}
                  className="rounded-none bg-foreground text-background hover:bg-foreground/90 font-light tracking-widest uppercase text-xs px-12 py-6"
                >
                  {submitMutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </div>
            </form>
          </Form>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-border bg-background">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <Logo className="scale-75 origin-left" />
        <div className="text-foreground/50 text-xs font-light tracking-wider">
          &copy; {new Date().getFullYear()} MFN Design LLC. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-background selection:bg-foreground/20 selection:text-foreground">
      <Navbar />
      <Hero />
      <Services />
      <Contact />
      <Footer />
    </div>
  );
}
