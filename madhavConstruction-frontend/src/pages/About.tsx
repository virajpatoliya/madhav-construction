
import { ArrowRight, Check, Users, Award, Clock, Building2, Shield, Ruler, BarChart } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import MoreSection from '../components/MoreSection';
import { useEffect } from 'react';

const About = () => {
  const team = [
    {
      name: "John Smith",
      position: "CEO & Founder",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "With over 30 years in the construction industry, John founded BuildWave with a vision to deliver exceptional quality and service."
    },
    {
      name: "Sarah Johnson",
      position: "Chief Operations Officer",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      bio: "Sarah oversees all operations, ensuring projects are delivered on time, within budget, and to the highest standards of quality."
    },
    {
      name: "Michael Chen",
      position: "Chief Engineer",
      image: "https://randomuser.me/api/portraits/men/67.jpg",
      bio: "Michael brings 25 years of engineering expertise, leading our team in designing innovative and sustainable structures."
    },
    {
      name: "Emily Rodriguez",
      position: "Project Director",
      image: "https://randomuser.me/api/portraits/women/17.jpg",
      bio: "Emily manages our major projects, coordinating teams and resources to ensure successful project completion."
    }
  ];

  useEffect(() => {
    document.title = "About | Madhav Construction";

    const metaDesc = document.querySelector("meta[name='description']");
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Learn about Madhav Construction’s history, experience, and quality-driven building services across Gujarat."
      );
    }

    let canonical = document.querySelector("link[rel='canonical']");
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", "https://www.madhavconstruction.in/about");
  }, []);
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-32 flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/factory.webp"
            alt="Construction team"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-construction-900/80 to-construction-900/50"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-2xl text-white">
            <AnimatedSection>
              <span className="bg-accent/90 text-construction-900 py-1 px-3 text-sm font-medium inline-block mb-6 rounded-sm">
                ABOUT US
              </span>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
                Building Excellence Since 2018
              </h1>
              <p className="text-lg text-white/90 mb-8 max-w-lg">
                For over three decades, BuildWave has been delivering exceptional construction services with a commitment to quality, integrity, and innovation.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection animation="slide-in-left">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1701844279504-e3a974aaafb5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1974"
                  alt="Building construction"
                  className="rounded-sm shadow-xl w-full h-auto"
                />
                <div className="absolute -bottom-6 -right-6 bg-accent p-4 rounded-sm shadow-lg hidden md:block">
                  <p className="text-construction-900 font-bold text-xl">Est. 2018</p>
                  <p className="text-construction-900">Building Trust</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slide-in-right">
              <span className="bg-accent/20 text-accent py-1 px-3 text-sm font-medium inline-block mb-6 rounded-sm">
                OUR STORY
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-construction-800 mb-6">
                A Legacy of Construction Excellence
              </h2>
              <p className="text-construction-500 mb-6">
                Madhav Construction in Vatva GIDC, Ahmedabad is a company that provides expert property consulting and real estate services. They have a deep understanding of the real estate market and are committed to client satisfaction. The company provides comprehensive solutions tailored to meet the unique needs of their clients. Whether clients are looking to buy, sell, or manage property, Madhav Construction in Vatva GIDC, Ahmedabad is there to guide them every step of the way. The company strives to create lasting value for its clients by offering personalized, professional, and reliable services.
              </p>
              <p className="text-construction-500 mb-6">
                Madhav Construction in Ahmedabad is one of the leading businesses in the Construction Contractors. Also known for Construction Contractors, Building Contractors, Contractors, Building Demolition Contractors, RCC Building Contractors, Road Construction Contractors, Demolition Contractors, Paver Block Fixing Contractors and much more.
              </p>
              <p className="text-construction-500 mb-6">
                Over the one and half decades, we have built a reputation for excellence, integrity, and reliability. Our commitment to quality craftsmanship, sustainable practices, and client satisfaction has earned us numerous industry awards and the trust of countless clients.
              </p>
              <p className="text-construction-500 mb-6">
                Today, BuildWave stands as a testament to our founding principles, delivering exceptional construction services with the same dedication and attention to detail that has defined our company from the beginning.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <h3 className="text-4xl font-bold text-accent mb-2">15+</h3>
                  <p className="text-construction-600">Years Experience</p>
                </div>
                <div className="text-center">
                  <h3 className="text-4xl font-bold text-accent mb-2">43+</h3>
                  <p className="text-construction-600">Projects Completed</p>
                </div>
                <div className="text-center">
                  <h3 className="text-4xl font-bold text-accent mb-2">120+</h3>
                  <p className="text-construction-600">Expert Team</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Our Mission & Values */}
      <section className="section-padding bg-construction-50">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="bg-accent/20 text-accent py-1 px-3 text-sm font-medium inline-block mb-6 rounded-sm">
              MISSION & VALUES
            </span>
            <h2 className="section-title">What Drives Us</h2>
            <p className="section-subtitle mx-auto">
              Our core principles and values that guide every project and decision.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection animation="slide-in-left">
              <div className="bg-white p-8 rounded-sm border border-construction-100 card-shadow h-full">
                <div className="w-14 h-14 bg-accent/10 rounded-sm flex items-center justify-center mb-5">
                  <BarChart size={28} className="text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-construction-800 mb-4">
                  Our Mission
                </h3>
                <p className="text-construction-500 mb-6">
                  The mission of Madhav Construction in Vatva GIDC, Ahmedabad is to provide exceptional property consulting and real estate services that empower clients to make informed decisions and achieve their real estate goals. The company is dedicated to delivering unparalleled service, leveraging its extensive market knowledge to ensure a seamless and successful property transaction experience. The goal of the company is to build long-term relationships with its clients based on trust, integrity, and outstanding results.</p>
                <div className="border-l-4 border-accent pl-4 py-2 mb-6">
                  <p className="text-construction-600 italic">
                    "Building not just structures, but lasting relationships and communities."
                  </p>
                </div>
                <p className="text-construction-500">
                  Every project we undertake is approached with this mission in mind, ensuring that we deliver not just buildings, but truly transformative spaces.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slide-in-right">
              <div className="bg-white p-8 rounded-sm border border-construction-100 card-shadow h-full">
                <div className="w-14 h-14 bg-accent/10 rounded-sm flex items-center justify-center mb-5">
                  <Shield size={28} className="text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-construction-800 mb-4">
                  Our Core Values
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-accent/10 p-1 rounded-sm mr-3 mt-1">
                      <Check size={16} className="text-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold text-construction-700">Quality Excellence</h4>
                      <p className="text-construction-500">We are committed to the highest standards of quality in every aspect of our work.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-accent/10 p-1 rounded-sm mr-3 mt-1">
                      <Check size={16} className="text-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold text-construction-700">Integrity</h4>
                      <p className="text-construction-500">We conduct business with honesty, transparency, and ethical practices.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-accent/10 p-1 rounded-sm mr-3 mt-1">
                      <Check size={16} className="text-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold text-construction-700">Innovation</h4>
                      <p className="text-construction-500">We embrace new technologies and methods to deliver innovative solutions.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-accent/10 p-1 rounded-sm mr-3 mt-1">
                      <Check size={16} className="text-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold text-construction-700">Safety</h4>
                      <p className="text-construction-500">We prioritize the safety of our team, clients, and the public in every project.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-accent/10 p-1 rounded-sm mr-3 mt-1">
                      <Check size={16} className="text-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold text-construction-700">Client Focus</h4>
                      <p className="text-construction-500">We listen to our clients and tailor our services to meet their unique needs and vision.</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      {/* <section className="section-padding bg-white">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="bg-accent/20 text-accent py-1 px-3 text-sm font-medium inline-block mb-6 rounded-sm">
              OUR TEAM
            </span>
            <h2 className="section-title">Leadership Team</h2>
            <p className="section-subtitle mx-auto">
              Meet the experienced professionals who lead BuildWave to excellence.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <div className="bg-white p-6 rounded-sm border border-construction-100 card-shadow text-center h-full">
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-construction-800 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-accent mb-4">{member.position}</p>
                  <p className="text-construction-500">
                    {member.bio}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-12">
            <p className="text-construction-500 mb-6">
              Our leadership team is supported by over 120 skilled professionals, including engineers, architects, project managers, and craftsmen, all dedicated to delivering exceptional construction services.
            </p>
            <Link to="/contact" className="btn-primary inline-flex items-center">
              Join Our Team
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </AnimatedSection>
        </div>
      </section> */}

      {/* Our Approach */}
      <section className="section-padding bg-construction-50">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <span className="bg-accent/20 text-accent py-1 px-3 text-sm font-medium inline-block mb-6 rounded-sm">
              OUR APPROACH
            </span>
            <h2 className="section-title">How We Work</h2>
            <p className="section-subtitle mx-auto">
              Our systematic approach to delivering exceptional construction projects.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            <div className="absolute top-16 left-0 w-full hidden lg:block">
              <div className="h-1 bg-accent/30 w-full"></div>
            </div>

            <AnimatedSection delay={100}>
              <div className="text-center relative z-10">
                <div className="w-16 h-16 bg-accent text-construction-900 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  1
                </div>
                <h3 className="text-xl font-bold text-construction-800 mb-3">
                  Consultation
                </h3>
                <p className="text-construction-500">
                  We begin with a detailed consultation to understand your vision, requirements, and goals for the project.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="text-center relative z-10">
                <div className="w-16 h-16 bg-accent text-construction-900 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  2
                </div>
                <h3 className="text-xl font-bold text-construction-800 mb-3">
                  Planning
                </h3>
                <p className="text-construction-500">
                  Our team develops a comprehensive plan, including design, timeline, budget, and resource allocation.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="text-center relative z-10">
                <div className="w-16 h-16 bg-accent text-construction-900 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  3
                </div>
                <h3 className="text-xl font-bold text-construction-800 mb-3">
                  Execution
                </h3>
                <p className="text-construction-500">
                  We bring your project to life with skilled craftsmanship, quality materials, and attention to detail.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={400}>
              <div className="text-center relative z-10">
                <div className="w-16 h-16 bg-accent text-construction-900 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  4
                </div>
                <h3 className="text-xl font-bold text-construction-800 mb-3">
                  Completion
                </h3>
                <p className="text-construction-500">
                  After thorough quality checks, we deliver your completed project and provide ongoing support.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <span className="bg-accent/20 text-accent py-1 px-3 text-sm font-medium inline-block mb-6 rounded-sm">
              WHY CHOOSE US
            </span>
            <h2 className="section-title">The BuildWave Advantage</h2>
            <p className="section-subtitle mx-auto">
              What sets us apart and makes us the preferred choice for construction projects.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatedSection delay={100}>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award size={24} className="text-accent" />
                </div>
                <h3 className="text-xl font-bold text-construction-800 mb-2">
                  Quality Excellence
                </h3>
                <p className="text-construction-500">
                  We maintain the highest standards in construction, using premium materials and expert craftsmanship.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock size={24} className="text-accent" />
                </div>
                <h3 className="text-xl font-bold text-construction-800 mb-2">
                  On-Time Delivery
                </h3>
                <p className="text-construction-500">
                  We pride ourselves on meeting deadlines and delivering projects within the agreed timeframes.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users size={24} className="text-accent" />
                </div>
                <h3 className="text-xl font-bold text-construction-800 mb-2">
                  Expert Team
                </h3>
                <p className="text-construction-500">
                  Our team consists of experienced professionals with specialized knowledge in various construction domains.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={400}>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield size={24} className="text-accent" />
                </div>
                <h3 className="text-xl font-bold text-construction-800 mb-2">
                  Safety First
                </h3>
                <p className="text-construction-500">
                  We prioritize safety at every stage, ensuring protection for our team, clients, and the environment.
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
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
              <div className="lg:col-span-3">
                <AnimatedSection>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-construction-800 mb-4">
                    Ready to Work With Us?
                  </h2>
                  <p className="text-construction-500 max-w-lg">
                    Let's discuss your construction needs and how our experienced team can bring your vision to life.
                  </p>
                </AnimatedSection>
              </div>
              <div className="lg:col-span-2 flex flex-col sm:flex-row gap-4">
                <AnimatedSection delay={100}>
                  <Link to="/contact" className="btn-primary text-center w-full">
                    Contact Us
                  </Link>
                </AnimatedSection>
                <AnimatedSection delay={200}>
                  <Link to="/services" className="btn-outline text-center w-full">
                    View Our Services
                  </Link>
                </AnimatedSection>
              </div>
            </div>
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
            title: "Contact Us",
            description: "Get in touch with our team to discuss your construction project needs.",
            icon: <Users size={28} />,
            link: "/contact"
          }
        ]}
      />
    </>
  );
};

export default About;
