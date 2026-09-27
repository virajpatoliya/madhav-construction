import { ArrowRight, Check, Building2, Ruler, Shield, Clock, Users, Award, Star, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import MoreSection from '../components/MoreSection';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useEffect } from 'react';

const Home = () => {
  const company = [
    {
      domain: 'images/d1.webp',
      title: 'J.D. Chem Industries'
    }, {
      domain: 'images/d10.webp',
      title: 'Kanaiya Industrial Estate'
    }, {
      domain: 'images/d2.webp',
      title: 'Indian Business Pages'
    }, {
      domain: 'images/d8.webp',
      title: 'PASL'
    }, {
      domain: 'images/d4.webp',
      title: 'Munna International'
    }, {
      domain: 'images/d9.webp',
      title: 'Appex Dyestuff Industries'
    }, {
      domain: 'images/d6.webp',
      title: 'PEE GEE Fabrics'
    }, {
      domain: 'images/d7.webp',
      title: 'Narayan NOPL'
    }, {
      domain: 'images/d3.webp',
      title: 'Meghmani Organics Ltd'
    }, {
      domain: 'images/d5.webp',
      title: 'Dev Colours'
    },
    {
      domain: 'images/d11.webp',
      title: 'Shree Ambica Industries'
    },
  ]

  // Project showcase data
  const projects = [
    {
      title: "Modern Office Complex",
      category: "Commercial",
      location: "Downtown Metro",
      image: "https://cdn.thedecorjournalindia.com/wp-content/uploads/2024/11/15-Inspiring-Office-Spaces-in-India-That-Redefine-Workplace-Design-1.jpg?strip=all&lossy=1&ssl=1"
    },
    {
      title: "Luxury Residential Tower",
      category: "Residential",
      location: "Waterfront District",
      image: "https://www.ayaanshinfra.com/images/blog/7-reasons-india-1.jpg"
    },
    {
      title: "Highway Bridge Expansion",
      category: "Infrastructure",
      location: "City Center",
      image: "https://as1.ftcdn.net/v2/jpg/05/05/44/12/1000_F_505441210_kVxjN1id4bHUgnOnHnndowQEfQXjdllL.jpg"
    },
    {
      title: "Sustainable Office Park",
      category: "Commercial",
      location: "Tech District",
      image: "https://plus.unsplash.com/premium_photo-1661962494793-c686adb46619?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: "Community Center",
      category: "Public",
      location: "Suburb Area",
      image: "https://images.adsttc.com/media/images/5911/1e6d/e58e/ceb9/2c00/00ac/slideshow/Aug_2016_2.jpg?1494294113"
    },
    {
      title: "Modern Hospital Wing",
      category: "Healthcare",
      location: "Medical District",
      image: "https://hospitalarchitects.in/sites/default/files/best_architect_for_hospital_design_in_india.jpg"
    },
    {
      title: "Eco-Friendly School",
      category: "Education",
      location: "Northern Suburbs",
      image: "https://hillpost.in/wp-content/uploads/2022/03/Modern-School-1-1024x535.jpg"
    },
    {
      title: "Luxury Hotel Resort",
      category: "Hospitality",
      location: "Coastal Area",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    }
  ];

  // Services data
  const services = [
    {
      title: "Commercial Construction",
      description: "Building state-of-the-art commercial spaces that meet the highest standards of quality and sustainability.",
      icon: <Building2 size={42} />,
      image: "https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=779"
    },
    // {
    //   title: "Residential Development",
    //   description: "Creating beautiful, functional homes and residential complexes that enhance community living.",
    //   icon: <Briefcase size={42} />,
    //   image: "https://images.unsplash.com/photo-1507149833265-60c372daea22?ixlib=rb-4.0.3&auto=format&fit=crop&w=2076&q=80"
    // },
    {
      title: "Infrastructure Projects",
      description: "Developing essential infrastructure that connects communities and supports economic growth.",
      icon: <Ruler size={42} />,
      image: "https://images.unsplash.com/photo-1750715832406-f5fcb2eaa344?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1113"
    },
    {
      title: "Green Building Solutions",
      description: "Implementing sustainable building practices that minimize environmental impact and maximize efficiency.",
      icon: <Shield size={42} />,
      image: "https://images.unsplash.com/photo-1518005068251-37900150dfca?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80"
    }
  ];

  // Client testimonials
  const testimonials = [
    {
      text: "Madhav Construction transformed our commercial space with exceptional craftsmanship and attention to detail. Their team was professional, responsive, and delivered the project on time and within budget.",
      author: "Kanaiya Industrial Estate",
      position: "CEO",
      avatar: "images/d10.webp",
      rating: 5
    },
    {
      text: "Our dream home became a reality thanks to Madhav Construction. Their team guided us through the entire process, offering valuable insights and delivering a home that exceeded our expectations.",
      author: "Parbat Solanki",
      position: "Business Owner",
      avatar: "images/review1.webp",
      rating: 5
    },
    {
      text: "As a municipality, we needed a reliable partner for our infrastructure project. Madhav Construction demonstrated exceptional expertise and commitment to quality while adhering to strict timelines.",
      author: "Indian Business Pages",
      position: "Director of Public Works",
      avatar: "images/d2.webp",
      rating: 5
    },
    {
      text: "The attention to detail and quality of work provided by Madhav Construction was outstanding. They turned our vision into reality with precision and professionalism.",
      author: "Appex Dyestuff Industries",
      position: "Managing Director",
      avatar: "images/d9.webp",
      rating: 5
    },

  ];

  useEffect(() => {
    // 🏷️ Update title for homepage
    document.title = "Madhav Construction | Best Construction Company in Gujarat";

    // 🧠 Update meta description dynamically
    const metaDesc = document.querySelector("meta[name='description']");
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Madhav Construction is Gujarat’s trusted construction company providing residential, commercial, and industrial building services in Rajkot and across India."
      );
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content =
        "Madhav Construction is Gujarat’s trusted construction company providing residential, commercial, and industrial building services in Rajkot and across India.";
      document.head.appendChild(meta);
    }

    // 🧾 Canonical URL
    let canonical = document.querySelector("link[rel='canonical']");
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", "https://www.madhavconstruction.in/");
  }, []);

  return (
    <>
      {/* Hero Section with Video Background and Image Overlay - Reduced top padding */}
      <section className="relative h-screen flex flex-col md:flex-row  gap-4 items-start pt-16 md:pt-48 md:p-32  overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Image overlay for added visual richness */}
          <div className="absolute inset-0 bg-gradient-to-r from-construction-900/90 to-construction-900/70 mix-blend-multiply">
            <img
              src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
              alt="Construction background"
              className="w-full h-full object-cover opacity-40 mix-blend-overlay"
            />
          </div>
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-2xl text-white px-2 sm:px-0">
            <AnimatedSection>
              <span className="bg-accent/90 text-construction-900 py-1 px-3 text-sm font-medium inline-block mb-3 sm:mb-6 rounded-sm">
                BUILDING TOMORROW TODAY
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold mb-3 sm:mb-6 leading-tight">
                Excellence in Construction & Infrastructure Development
              </h1>
              <p className="text-base sm:text-lg text-white/90 mb-4 sm:mb-8 max-w-lg">
                From concept to completion, we deliver exceptional construction services with precision, innovation, and integrity.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link to="/services" className="btn-primary text-center text-sm sm:text-base py-2 sm:py-3">
                  Explore Our Services
                </Link>
                <Link to="/contact" className="btn-outline text-center text-sm sm:text-base py-2 sm:py-3 bg-white text-white border-white hover:bg-zinc-300 hover:text-construction-900">
                  Get in Touch
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Stats Section */}
        <div className=" sm:bottom-10 flex w-full md:w-1/2 items-center z-10">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-1 gap-2 sm:gap-4">
              <AnimatedSection delay={200} className="bg-white/10 backdrop-blur-sm p-3 sm:p-6 rounded-sm">
                <div className="flex flex-row items-center justify-center mb-1 sm:mb-2">
                  <Clock size={16} className="text-accent mr-1 sm:mr-2" />
                  <h3 className="text-xl sm:text-3xl font-bold text-white">15+</h3>
                </div>
                <p className="text-xs sm:text-base text-center text-white/80">Years Experience</p>
              </AnimatedSection>
              <AnimatedSection delay={300} className="bg-white/10 backdrop-blur-sm p-3 sm:p-6 rounded-sm">
                <div className="flex flex-row items-center justify-center mb-1 sm:mb-2">
                  <Building2 size={16} className="text-accent mr-1 sm:mr-2" />
                  <h3 className="text-xl sm:text-3xl font-bold text-white">43+</h3>
                </div>
                <p className="text-xs sm:text-base text-center text-white/80">Projects Completed</p>
              </AnimatedSection>
              <AnimatedSection delay={400} className="bg-white/10 backdrop-blur-sm p-3 sm:p-6 rounded-sm">
                <div className="flex flex-row items-center justify-center mb-1 sm:mb-2">
                  <Users size={16} className="text-accent mr-1 sm:mr-2" />
                  <h3 className="text-xl sm:text-3xl font-bold text-white">120+</h3>
                </div>
                <p className="text-xs sm:text-base text-center text-white/80">Expert Team</p>
              </AnimatedSection>
              <AnimatedSection delay={500} className="bg-white/10 backdrop-blur-sm p-3 sm:p-6 rounded-sm">
                <div className="flex flex-row items-center justify-center mb-1 sm:mb-2">
                  <Award size={16} className="text-accent mr-1 sm:mr-2" />
                  <h3 className="text-xl sm:text-3xl font-bold text-white">8+</h3>
                </div>
                <p className="text-xs sm:text-base text-center text-white/80">Industry Awards</p>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section with Images */}
      <section className="section-padding bg-construction-50">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <span className="bg-accent/20 text-accent py-1 px-3 text-sm font-medium inline-block mb-6 rounded-sm">
              OUR SERVICES
            </span>
            <h2 className="section-title">Expert Construction Solutions</h2>
            <p className="section-subtitle mx-auto">
              We offer a comprehensive range of construction services tailored to meet your specific needs.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <div className="group bg-white rounded-sm overflow-hidden card-shadow h-full border border-construction-100 hover:border-accent transition-colors duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-construction-900/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4">
                      <span className="text-white text-sm bg-accent/80 py-1 px-3 rounded-sm">
                        Services
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="text-accent mb-3">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold text-construction-800 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-construction-500 mb-4">
                      {service.description}
                    </p>
                    <Link
                      to="/services"
                      className="inline-flex items-center text-accent hover:text-accent-dark font-medium transition-colors"
                    >
                      Learn More <ArrowRight size={16} className="ml-2" />
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* About Section with Parallax */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection animation="slide-in-left">
              <div className="relative">
                <img
                  src="/images/factory.webp"
                  alt="Construction team"
                  className="rounded-sm shadow-xl w-full h-auto transform hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute -bottom-6 -right-6 bg-accent p-6 rounded-sm shadow-lg hidden md:block">
                  <p className="text-construction-900 font-bold text-2xl">15+ Years</p>
                  <p className="text-construction-900">of Excellence</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slide-in-right">
              <span className="bg-accent/20 text-accent py-1 px-3 text-sm font-medium inline-block mb-6 rounded-sm">
                ABOUT MADHAV CONSTRUCTION
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-construction-800 mb-6">
                A Legacy of Quality Construction & Trusted Partnerships
              </h2>
              <p className="text-construction-500 mb-6">
                Founded in 2018, Madhav Construction has established itself as a leader in the construction industry, delivering exceptional projects across commercial, residential, and infrastructure sectors. Our commitment to quality, innovation, and client satisfaction has earned us a reputation for excellence.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start">
                  <div className="bg-accent/10 p-1 rounded-sm mr-3 mt-1">
                    <Check size={16} className="text-accent" />
                  </div>
                  <p className="text-construction-600">Professional & Experienced Team</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-accent/10 p-1 rounded-sm mr-3 mt-1">
                    <Check size={16} className="text-accent" />
                  </div>
                  <p className="text-construction-600">Quality Materials & Craftsmanship</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-accent/10 p-1 rounded-sm mr-3 mt-1">
                    <Check size={16} className="text-accent" />
                  </div>
                  <p className="text-construction-600">On-Time Project Completion</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-accent/10 p-1 rounded-sm mr-3 mt-1">
                    <Check size={16} className="text-accent" />
                  </div>
                  <p className="text-construction-600">Customer Satisfaction Guaranteed</p>
                </div>
              </div>
              <Link to="/about" className="btn-primary inline-flex items-center">
                Learn More About Us
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>




      {/* Project Showcase with Carousel */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <span className="bg-accent/20 text-accent py-1 px-3 text-sm font-medium inline-block mb-6 rounded-sm">
              FEATURED PROJECTS
            </span>
            <h2 className="section-title">Our Recent Work</h2>
            <p className="section-subtitle mx-auto">
              Explore our landmark projects that showcase our expertise and craftsmanship.
            </p>
          </AnimatedSection>



          <div className="overflow-hidden w-full my-16 py-4">
            <div className="scroll-marquee gap-6">
              {[...company, ...company].map((items, index) => (
                <div
                  key={index}
                  className="min-w-[12rem] flex  flex-col justify-center items-center"
                >
                  <img
                    draggable="false" onContextMenu={(e) => e.preventDefault()}
                    src={items.domain}
                    alt={`Logo ${index}`}
                    className="h-16 object-contain"
                  />
                  <label className="text-sm text-yellow-700 bg-yellow-500/50 p-1 px-2 rounded-md mt-2">{items.title}</label>
                </div>
              ))}
            </div>
          </div>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {projects.map((project, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <AnimatedSection>
                    <div className="group overflow-hidden rounded-sm card-shadow">
                      <div className="relative overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-construction-900 to-transparent opacity-70"></div>
                        <div className="absolute bottom-0 left-0 p-6">
                          <span className="text-white text-sm bg-accent/80 py-1 px-3 rounded-sm">
                            {project.category}
                          </span>
                          <h3 className="text-xl font-bold text-white mt-2">
                            {project.title}
                          </h3>
                          <p className="text-white/80 text-sm mt-1">
                            {project.location}
                          </p>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Testimonials with Enhanced Design - Removed company logos */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <span className="bg-accent/20 text-accent py-1 px-3 text-sm font-medium inline-block mb-6 rounded-sm">
              TESTIMONIALS
            </span>
            <h2 className="section-title">What Our Clients Say</h2>
            <p className="section-subtitle mx-auto">
              Read testimonials from our satisfied clients who have experienced our exceptional service.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <div className="bg-white p-8 rounded-sm border border-construction-100 card-shadow h-full hover:border-accent hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start mb-6">
                    <div className="mr-4">
                      <div className="bg-white w-16 h-16 rounded-full overflow-hidden">
                        <img src={testimonial.avatar} alt={testimonial.author} className="w-full h-full object-contain" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-construction-800 text-lg">{testimonial.author}</h4>
                      <p className="text-construction-500">{testimonial.position}</p>
                      <div className="flex items-center mt-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} size={16} className="text-accent fill-accent" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-construction-500 italic mb-6">"{testimonial.text}"</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action with Background Image */}
      <section className="relative py-16">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Construction site"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-construction-900/90 to-construction-900/70"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="bg-white p-8 md:p-12 rounded-sm shadow-lg border border-construction-100">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
              <div className="lg:col-span-3">
                <AnimatedSection>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-construction-800 mb-4">
                    Ready to Start Your Construction Project?
                  </h2>
                  <p className="text-construction-500 max-w-lg">
                    Contact us today to discuss your vision, and let our team of experts bring it to life with precision and excellence.
                  </p>
                </AnimatedSection>
              </div>
              <div className="lg:col-span-2 flex flex-col sm:flex-row gap-4">
                <AnimatedSection delay={100}>
                  <Link to="/contact" className="btn-primary text-center w-full">
                    Request a Quote
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
        title="Explore More About Madhav Construction"
        subtitle="Discover why we're the preferred choice for construction projects of all sizes."
        items={[
          {
            title: "Our History",
            description: "Learn about our journey from humble beginnings to becoming a leading construction company.",
            icon: <Building2 size={28} />,
            link: "/about"
          },
          {
            title: "Our Approach",
            description: "Discover our systematic approach to delivering exceptional construction projects on time and within budget.",
            icon: <Ruler size={28} />,
            link: "/services"
          },
          {
            title: "Our Team",
            description: "Meet the experienced professionals who make Madhav Construction a leader in the construction industry.",
            icon: <Users size={28} />,
            link: "/about"
          }
        ]}
      />
    </>
  );
};

export default Home;
