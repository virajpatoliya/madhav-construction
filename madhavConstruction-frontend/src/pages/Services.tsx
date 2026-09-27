
import { Building2, Home, Ruler, HardHat, Wrench, LayoutGrid, Factory, Building, ArrowRight, Check, Users } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import MoreSection from '../components/MoreSection';
import { Link } from 'react-router-dom';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect } from 'react';

const Services = () => {
  const services = [
    {
      icon: <Factory size={28} />,
      title: "Industrial Construction",
      description: "Build industrial facilities that maximize operational efficiency and productivity while meeting industry standards.",
      features: [
        "Manufacturing Plants",
        "Warehouses",
        "Distribution Centers",
        "Industrial Complexes"
      ],
      image: "/images/factory.webp"
    },
    {
      icon: <Building2 size={28} />,
      title: "Commercial Construction",
      description: "We design and build commercial spaces that combine functionality, aesthetics, and sustainability for businesses of all sizes.",
      features: [
        "Office Buildings",
        "Retail Spaces",
        "Hospitality Venues",
        "Healthcare Facilities"
      ],
      image: "/images/front.webp"
    },
    {
      icon: <Home size={28} />,
      title: "Residential Construction",
      description: "From luxury homes to multi-family residences, we create living spaces that combine comfort, beauty, and functionality.",
      features: [
        "Custom Homes",
        "Apartment Complexes",
        "Luxury Residences",
        "Residential Communities"
      ],
      image: "https://architectureideas.info/wp-content/uploads/2013/09/houseconstruction-india.jpg"
    },
    {
      icon: <Ruler size={28} />,
      title: "Renovation & Remodeling",
      description: "Transform existing structures with our comprehensive renovation and remodeling services that breathe new life into spaces.",
      features: [
        "Commercial Renovations",
        "Home Remodeling",
        "Historic Restorations",
        "Facility Upgrades"
      ],
      image: "https://images.unsplash.com/photo-1634586648651-f1fb9ec10d90?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      icon: <HardHat size={28} />,
      title: "Infrastructure Development",
      description: "Develop essential infrastructure that connects communities and supports growth with our engineering expertise.",
      features: [
        "Bridges & Roads",
        "Water Systems",
        "Public Facilities",
        "Transportation Hubs"
      ],
      image: "https://images.unsplash.com/photo-1750715832406-f5fcb2eaa344?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1113"
    },
    {
      icon: <Wrench size={28} />,
      title: "Design-Build Services",
      description: "Streamline your project with our integrated design-build approach that combines design and construction expertise.",
      features: [
        "Single-Source Solutions",
        "Accelerated Timelines",
        "Collaborative Process",
        "Cost Efficiencies"
      ],
      image: "https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
    }

  ];

  const projectImages = [
    {
      url: "https://cdn.thedecorjournalindia.com/wp-content/uploads/2024/11/15-Inspiring-Office-Spaces-in-India-That-Redefine-Workplace-Design-21-1536x1023.jpg?strip=all&lossy=1&ssl=1",
      title: "Modern Office Complex"
    },
    {
      url: "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
      title: "Residential Development"
    },
    {
      url: "/images/factory.webp",
      title: "Industrial Warehouse"
    },
    {
      url: "https://images.adsttc.com/media/images/5911/1e6d/e58e/ceb9/2c00/00ac/slideshow/Aug_2016_2.jpg?1494294113",
      title: "Community Facilities"
    },
  ];


  useEffect(() => {
    document.title = "Service | Madhav Construction";
    const desc = document.querySelector("meta[name='description']");
    if (desc) {
      desc.setAttribute(
        "content",
        "Explore completed residential, commercial, and industrial projects by Madhav Construction in Gujarat and across India."
      );
    }

    let canonical = document.querySelector("link[rel='canonical']");
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", "https://www.madhavconstruction.in/services");
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-32 flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/constructoin.webp"
            alt="Construction site with modern architecture"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-construction-900/80 to-construction-900/50"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-2xl text-white">
            <AnimatedSection>
              <span className="bg-accent/90 text-construction-900 py-1 px-3 text-sm font-medium inline-block mb-6 rounded-sm">
                OUR SERVICES
              </span>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
                Comprehensive Construction Solutions
              </h1>
              <p className="text-lg text-white/90 mb-8 max-w-lg">
                From concept to completion, we offer end-to-end construction services tailored to your specific needs and vision.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <h2 className="section-title">Our Construction Services</h2>
            <p className="section-subtitle mx-auto">
              We offer a comprehensive range of construction services to meet diverse project needs.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 6).map((service, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <div className="p-6 border border-construction-100 rounded-sm card-shadow group hover:border-accent transition-all duration-300 h-full">
                  <div className="w-14 h-14 bg-construction-100 group-hover:bg-accent/10 rounded-sm flex items-center justify-center mb-5 transition-colors duration-300">
                    <div className="text-accent">
                      {service.icon}
                    </div>
                  </div>
                  <div className="mb-4 overflow-hidden rounded-sm">
                    <AspectRatio ratio={16 / 9} className="bg-construction-100">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                      />
                    </AspectRatio>
                  </div>
                  <h3 className="text-xl font-bold text-construction-800 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-construction-500 mb-4">
                    {service.description}
                  </p>
                  <Link to="/contact" className="inline-flex items-center text-accent hover:text-accent-dark font-medium transition-colors">
                    Learn More <ArrowRight size={16} className="ml-2" />
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="section-padding bg-construction-50">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="section-title">Featured Services</h2>
            <p className="section-subtitle mx-auto">
              Take a closer look at our most sought-after construction services.
            </p>
          </AnimatedSection>

          {services.slice(0, 3).map((service, index) => (
            <div
              key={index}
              className={`mb-16 last:mb-0 grid grid-cols-1 lg:grid-cols-5 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <AnimatedSection
                className="lg:col-span-2"
                animation={index % 2 === 0 ? "slide-in-left" : "slide-in-right"}
              >
                <div className=" rounded-sm overflow-hidden ">
                  <AspectRatio ratio={16 / 9} className="bg-construction-100">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="object-cover w-full h-full rounded-sm transition-transform duration-500 "
                    />
                  </AspectRatio>
                </div>
              </AnimatedSection>

              <AnimatedSection
                className="lg:col-span-3"
                animation={index % 2 === 0 ? "slide-in-right" : "slide-in-left"}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-sm flex items-center justify-center mr-4">
                    <div className="text-accent">
                      {service.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-construction-800">
                    {service.title}
                  </h3>
                </div>

                <p className="text-construction-500 mb-6">
                  {service.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center">
                      <div className="bg-accent/10 p-1 rounded-sm mr-3">
                        <Check size={16} className="text-accent" />
                      </div>
                      <p className="text-construction-700">{feature}</p>
                    </div>
                  ))}
                </div>

                <Link to="/contact" className="btn-primary">
                  Request a Quote
                </Link>
              </AnimatedSection>
            </div>
          ))}
        </div>
      </section>

      {/* Project Showcase */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <h2 className="section-title">Our Project Showcase</h2>
            <p className="section-subtitle mx-auto">
              Browse through some of our recent projects that demonstrate our quality workmanship.
            </p>
          </AnimatedSection>

          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {projectImages.map((image, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="border-none">
                    <CardContent className="p-2">
                      <AspectRatio ratio={3 / 4} className="bg-construction-100 overflow-hidden rounded-sm">
                        <img
                          src={image.url}
                          alt={image.title}
                          className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-construction-900/80 to-transparent flex items-end p-4">
                          <h3 className="text-white font-medium">{image.title}</h3>
                        </div>
                      </AspectRatio>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-accent text-construction-900 hover:bg-accent-dark border-none left-0 translate-x-0" />
            <CarouselNext className="bg-accent text-construction-900 hover:bg-accent-dark border-none right-0 translate-x-0" />
          </Carousel>
        </div>
      </section>

      {/* Our Process */}
      <section className="section-padding bg-white relative">
        <div className="absolute inset-0 z-0 opacity-5">
          <img
            src="https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
            alt="Background pattern"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container-custom relative z-10">
          <AnimatedSection className="text-center mb-16">
            <h2 className="section-title">Our Service Process</h2>
            <p className="section-subtitle mx-auto">
              A systematic approach that ensures exceptional results for your construction project.
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

      {/* Industries We Serve */}
      <section className="section-padding bg-construction-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1590069261209-f8e9b8642343?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80"
            alt="Industrial background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container-custom relative z-10">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Industries We Serve
            </h2>
            <p className="text-construction-300 max-w-2xl mx-auto">
              Our expertise spans across multiple industries, providing specialized construction solutions for diverse sectors.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatedSection delay={100}>
              <div className="p-6 bg-construction-700/50 rounded-sm border border-construction-600 h-full group hover:border-accent transition-all duration-300">
                <div className="w-14 h-14 bg-accent/20 rounded-sm flex items-center justify-center mb-5">
                  <Building2 size={28} className="text-accent" />
                </div>
                <div className="mb-4 rounded-sm overflow-hidden">
                  <AspectRatio ratio={16 / 9} className="bg-construction-800">
                    <img
                      src="https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
                      alt="Corporate & Office"
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105 opacity-80"
                    />
                  </AspectRatio>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Corporate & Office
                </h3>
                <p className="text-construction-300 mb-4">
                  Creating productive workspaces that inspire collaboration, innovation, and employee wellbeing.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="p-6 bg-construction-700/50 rounded-sm border border-construction-600 h-full group hover:border-accent transition-all duration-300">
                <div className="w-14 h-14 bg-accent/20 rounded-sm flex items-center justify-center mb-5">
                  <LayoutGrid size={28} className="text-accent" />
                </div>
                <div className="mb-4 rounded-sm overflow-hidden">
                  <AspectRatio ratio={16 / 9} className="bg-construction-800">
                    <img
                      src="/images/RetailCommercial.webp" alt="Retail & Commercial"
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105 opacity-80"
                    />
                  </AspectRatio>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Retail & Commercial
                </h3>
                <p className="text-construction-300 mb-4">
                  Building engaging retail environments that enhance customer experience and drive business growth.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="p-6 bg-construction-700/50 rounded-sm border border-construction-600 h-full group hover:border-accent transition-all duration-300">
                <div className="w-14 h-14 bg-accent/20 rounded-sm flex items-center justify-center mb-5">
                  <Home size={28} className="text-accent" />
                </div>
                <div className="mb-4 rounded-sm overflow-hidden">
                  <AspectRatio ratio={16 / 9} className="bg-construction-800">
                    <img
                      src="https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                      alt="Residential & Multi-family"
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105 opacity-80"
                    />
                  </AspectRatio>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Residential & Multi-family
                </h3>
                <p className="text-construction-300 mb-4">
                  Developing quality living spaces from single-family homes to large-scale residential communities.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={400}>
              <div className="p-6 bg-construction-700/50 rounded-sm border border-construction-600 h-full group hover:border-accent transition-all duration-300">
                <div className="w-14 h-14 bg-accent/20 rounded-sm flex items-center justify-center mb-5">
                  <Building size={28} className="text-accent" />
                </div>
                <div className="mb-4 rounded-sm overflow-hidden">
                  <AspectRatio ratio={16 / 9} className="bg-construction-800">
                    <img
                      src="https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2564&q=80"
                      alt="Education & Institutional"
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105 opacity-80"
                    />
                  </AspectRatio>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Education & Institutional
                </h3>
                <p className="text-construction-300 mb-4">
                  Building educational facilities that support learning, research, and community engagement.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={500}>
              <div className="p-6 bg-construction-700/50 rounded-sm border border-construction-600 h-full group hover:border-accent transition-all duration-300">
                <div className="w-14 h-14 bg-accent/20 rounded-sm flex items-center justify-center mb-5">
                  <Factory size={28} className="text-accent" />
                </div>
                <div className="mb-4 rounded-sm overflow-hidden">
                  <AspectRatio ratio={16 / 9} className="bg-construction-800">
                    <img
                      src="/images/IndustrialManufacturing.webp"
                      alt="Industrial & Manufacturing"
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105 opacity-80"
                    />
                  </AspectRatio>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Industrial & Manufacturing
                </h3>
                <p className="text-construction-300 mb-4">
                  Constructing industrial facilities that optimize operations, efficiency, and production capabilities.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={600}>
              <div className="p-6 bg-construction-700/50 rounded-sm border border-construction-600 h-full group hover:border-accent transition-all duration-300">
                <div className="w-14 h-14 bg-accent/20 rounded-sm flex items-center justify-center mb-5">
                  <HardHat size={28} className="text-accent" />
                </div>
                <div className="mb-4 rounded-sm overflow-hidden">
                  <AspectRatio ratio={16 / 9} className="bg-construction-800">
                    <img
                      src="/images/PublicInfrastructure.webp"
                      alt="Public & Infrastructure"
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105 opacity-80"
                    />
                  </AspectRatio>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Public & Infrastructure
                </h3>
                <p className="text-construction-300 mb-4">
                  Developing essential public facilities and infrastructure that serve communities and support growth.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-accent/10">
        <div className="container-custom">
          <div className="bg-white p-8 md:p-12 rounded-sm shadow-lg border border-construction-100 relative overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-5">
              <img
                src="https://images.unsplash.com/photo-1517022812141-23620dba5c23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2742&q=80"
                alt="Blueprint background"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center relative z-10">
              <div className="lg:col-span-3">
                <AnimatedSection>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-construction-800 mb-4">
                    Ready to Start Your Project?
                  </h2>
                  <p className="text-construction-500 max-w-lg">
                    Contact us today to discuss your construction needs and discover how our services can bring your vision to life.
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
                  <Link to="/about" className="btn-outline text-center w-full">
                    Learn About Us
                  </Link>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More Section */}
      <MoreSection
        title="Explore More"
        subtitle="Learn more about our expertise and commitment to excellence."
        items={[
          {
            title: "Sustainable Building",
            description: "Discover our environmentally responsible construction practices and commitment to green building principles.",
            icon: <Building2 size={28} />,
            link: "/contact"
          },
          {
            title: "Project Portfolio",
            description: "Explore our diverse portfolio of completed projects spanning various industries and scales.",
            icon: <LayoutGrid size={28} />,
            link: "/contact"
          },
          {
            title: "Client Testimonials",
            description: "Read what our clients say about their experience working with BuildWave Construction.",
            icon: <Users size={28} />,
            link: "/contact"
          }
        ]}
      />
    </>
  );
};

export default Services;
