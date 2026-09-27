
import { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Check, GanttChartSquareIcon } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import MoreSection from '../components/MoreSection';
import { Building2, Ruler, Shield } from 'lucide-react';
import emailjs from "emailjs-com";

const Contact = () => {
  const [formState, setFormState] = useState(
    { name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs
      .send(
        "service_6ug9ji6",
        "template_cn32h5k",
        {
          from_name: formState.name,
          from_email: formState.email,
          message: formState.message,
        },
        "Te7Awt7ZC7xUUQVK8"
      )
      .then(
        (response) => {
          alert("Message sent successfully! by " + formState.name + " using this emailId " + formState.email);
          setFormState({ name: "", email: "", message: "" });
          setIsSubmitting(false);
        },
        (error) => {
          alert("Failed to send message. Please try again.");
          setIsSubmitting(false);
        }
      );
  };

  useEffect(() => {
    // 🏷️ Update page title
    document.title = "Contact | Madhav Construction";

    // 🧠 Update meta description
    const metaDesc = document.querySelector("meta[name='description']");
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Get in touch with Madhav Construction — your trusted construction company in Gujarat. Contact us for residential, commercial, or industrial projects."
      );
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content =
        "Get in touch with Madhav Construction — your trusted construction company in Gujarat. Contact us for residential, commercial, or industrial projects.";
      document.head.appendChild(meta);
    }

    // 🧾 Update canonical URL
    let canonical = document.querySelector("link[rel='canonical']");
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", "https://www.madhavconstruction.in/contact");
  }, []);
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-32 flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1665072204431-b3ba11bd6d06?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1169"
            alt="Construction meeting"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-construction-900/80 to-construction-900/50"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-2xl text-white">
            <AnimatedSection>
              <span className="bg-accent/90 text-construction-900 py-1 px-3 text-sm font-medium inline-block mb-6 rounded-sm">
                CONTACT US
              </span>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
                Let's Build Something Together
              </h1>
              <p className="text-lg text-white/90 mb-8 max-w-lg">
                Ready to start your project? Contact us today to discuss your vision and how we can bring it to life.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <AnimatedSection animation="slide-in-left">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-construction-800 mb-6">
                  Get in Touch
                </h2>
                <p className="text-construction-500 mb-8">
                  We're here to answer any questions you have about our services, projects, or how we can help bring your construction vision to life.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-accent/10 rounded-sm flex items-center justify-center mr-4 shrink-0">
                      <MapPin size={24} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-construction-800 mb-1">Our Location</h3>
                      <p className="text-construction-500">Satyam Park, Ghodasar, Near MB Patel Farm, Vatva GIDC-382445</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-accent/10 rounded-sm flex items-center justify-center mr-4 shrink-0">
                      <Phone size={24} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-construction-800 mb-1">Phone Number</h3>
                      <p className="text-construction-500">+(91) 94279 62678</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-accent/10 rounded-sm flex items-center justify-center mr-4 shrink-0">
                      <Mail size={24} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-construction-800 mb-1">Email Address</h3>
                      <p className="text-construction-500">jaykapadiya6789@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-accent/10 rounded-sm flex items-center justify-center mr-4 shrink-0">
                      <Clock size={24} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-construction-800 mb-1">Business Hours</h3>
                      <p className="text-construction-500">Monday - Friday: 9:00 AM - 9:00 PM</p>
                      <p className="text-construction-500">Saturday: 9:00 AM - 9:00 PM</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            <div className="lg:col-span-3">
              <AnimatedSection animation="slide-in-right">
                <div className="bg-white p-8 rounded-sm shadow-lg border border-construction-100">
                  <h2 className="text-2xl font-bold text-construction-800 mb-6">
                    Send Us a Message
                  </h2>

                  {isSubmitting ? (
                    <div className="bg-green-50 border border-green-200 p-6 rounded-sm">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                          <Check size={24} className="text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold text-green-800">
                          Message Sent Successfully!
                        </h3>
                      </div>
                      <p className="text-green-700">
                        Thank you for reaching out to us. We've received your message and will get back to you within 24-48 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block font-medium mb-1">Your Name *</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-accent"
                          placeholder="John Doe"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block font-medium mb-1">Your Number/Email *</label>
                        <input
                          type="text"
                          id="email"
                          name="email"
                          value={formState.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-accent"
                          placeholder="you@example.com"
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block font-medium mb-1">Your Message *</label>
                        <textarea
                          id="message"
                          name="message"
                          value={formState.message}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border rounded h-40 focus:outline-none focus:ring-2 focus:ring-accent"
                          placeholder="Tell us about your project"
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        className="btn-primary flex items-center justify-center"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center">
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                              <path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Processing...
                          </span>
                        ) : (
                          <span className="flex items-center">
                            Send Message
                            <Send size={16} className="ml-2" />
                          </span>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section-padding bg-construction-50">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <h2 className="section-title">Our Location</h2>
            <p className="section-subtitle mx-auto">
              Visit our office to discuss your construction needs in person.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <div className="rounded-sm overflow-hidden card-shadow h-[400px] w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3673.116150081015!2d72.62594927516336!3d22.98275597920158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e861ca0122ae1%3A0x875ac2e386942e8c!2sSatyam%20Park!5e0!3m2!1sen!2sin!4v1757052966743!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="BuildWave Construction Office Location"
              ></iframe>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle mx-auto">
              Find answers to common questions about our services and process.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedSection delay={100}>
              <div className="p-6 border border-construction-100 rounded-sm card-shadow">
                <h3 className="text-xl font-bold text-construction-800 mb-3">
                  How long does a typical construction project take?
                </h3>
                <p className="text-construction-500">
                  Project timelines vary based on scale, complexity, and requirements. A small renovation might take weeks, while large commercial buildings can take 12-24 months. During our initial consultation, we'll provide a detailed timeline for your specific project.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="p-6 border border-construction-100 rounded-sm card-shadow">
                <h3 className="text-xl font-bold text-construction-800 mb-3">
                  What types of projects do you handle?
                </h3>
                <p className="text-construction-500">
                  We specialize in both commercial and residential construction, including new builds, renovations, remodeling, and infrastructure development. Our team has experience across various industries, from office buildings to residential communities.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="p-6 border border-construction-100 rounded-sm card-shadow">
                <h3 className="text-xl font-bold text-construction-800 mb-3">
                  How do you ensure quality in your construction projects?
                </h3>
                <p className="text-construction-500">
                  Quality assurance is integral to our process. We use premium materials, employ skilled craftsmen, conduct regular inspections, and follow a stringent quality control system. Our project managers oversee every aspect to ensure excellence.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={400}>
              <div className="p-6 border border-construction-100 rounded-sm card-shadow">
                <h3 className="text-xl font-bold text-construction-800 mb-3">
                  What is your approach to sustainable construction?
                </h3>
                <p className="text-construction-500">
                  We prioritize sustainable practices by using eco-friendly materials, implementing energy-efficient designs, minimizing waste, and adhering to green building standards. We can also pursue specific certifications like LEED upon request.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-accent/10">
        <div className="container-custom">
          <div className="bg-white p-8 md:p-12 rounded-sm shadow-lg border border-construction-100">
            <AnimatedSection className="text-center">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-construction-800 mb-4">
                Ready to Transform Your Vision into Reality?
              </h2>
              <p className="text-construction-500 max-w-2xl mx-auto mb-8">
                Whether you're planning a new construction project, renovation, or just exploring possibilities, our team is here to help. Let's build something extraordinary together.
              </p>
              <a href="#" className="btn-primary inline-flex items-center">
                Schedule a Consultation
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* More Section */}
      <MoreSection
        title="Learn More About BuildWave"
        subtitle="Discover what makes us the right choice for your construction needs."
        items={[
          {
            title: "Our Projects",
            description: "Explore our portfolio of completed projects across various sectors and scales.",
            icon: <Building2 size={28} />,
            link: "/services"
          },
          {
            title: "Our Services",
            description: "Learn about our comprehensive range of construction and development services.",
            icon: <Ruler size={28} />,
            link: "/services"
          },
          {
            title: "Our Process",
            description: "Understand our systematic approach to delivering exceptional construction projects.",
            icon: <Shield size={28} />,
            link: "/about"
          }
        ]}
      />
    </>
  );
};

export default Contact;
