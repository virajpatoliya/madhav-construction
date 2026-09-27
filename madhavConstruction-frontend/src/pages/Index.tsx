
// import { ArrowRight, Building2, Ruler, Shield, Users, Award } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import AnimatedSection from '../components/AnimatedSection';
// import { Button } from '@/components/ui/button';

// const Index = () => {
//   // Featured services data
//   const featuredServices = [
//     {
//       title: "Commercial Construction",
//       description: "Building state-of-the-art commercial spaces with precision and quality.",
//       icon: <Building2 size={36} />,
//       image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
//     },
//     {
//       title: "Residential Development",
//       description: "Creating beautiful, functional homes that enhance community living.",
//       icon: <Ruler size={36} />,
//       image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
//     },
//     {
//       title: "Infrastructure Projects",
//       description: "Developing essential infrastructure that connects communities.",
//       icon: <Shield size={36} />,
//       image: "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
//     }
//   ];

//   return (
//     <div className="min-h-screen">
//       {/* Hero Section with Dynamic Background */}
//       <section className="relative h-screen flex items-center overflow-hidden">
//         <div className="absolute inset-0 z-0">
//           <video
//             autoPlay
//             loop
//             muted
//             playsInline
//             className="w-full h-full object-cover"
//           >
//             <source
//               src="https://player.vimeo.com/external/544261551.sd.mp4?s=76f8994fb2b23d85169b4af94f63a9fd9b6efd3e&profile_id=164&oauth2_token_id=57447761"
//               type="video/mp4"
//             />
//           </video>
//           <div className="absolute inset-0 bg-gradient-to-r from-construction-900/90 to-construction-900/70"></div>
//         </div>

//         <div className="container-custom relative z-10">
//           <div className="max-w-2xl text-white">
//             <AnimatedSection>
//               <span className="bg-accent/90 text-construction-900 py-1 px-3 text-sm font-medium inline-block mb-6 rounded-sm">
//                 WELCOME TO MADHAV CONSTRUCTION
//               </span>
//               <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
//                 Building Excellence in Every Project
//               </h1>
//               <p className="text-lg text-white/90 mb-8 max-w-lg">
//                 Your vision, our expertise. We transform concepts into impressive structures with precision, innovation, and integrity.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <Link to="/services" className="btn-primary">
//                   Our Services
//                 </Link>
//                 <Link to="/about" className="btn-outline text-white border-white hover:bg-white hover:text-construction-900">
//                   Discover More
//                 </Link>
//               </div>
//             </AnimatedSection>
//           </div>
//         </div>

//         {/* Stats Section */}
//         <div className="absolute bottom-10 left-0 right-0 z-10">
//           <div className="container-custom">
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               <AnimatedSection delay={200} className="bg-white/10 backdrop-blur-sm p-6 rounded-sm">
//                 <div className="flex flex-row items-center mb-2">
//                   <Building2 size={20} className="text-accent mr-2" />
//                   <h3 className="text-3xl font-bold text-white">43+</h3>
//                 </div>
//                 <p className="text-white/80">Projects Completed</p>
//               </AnimatedSection>
//               <AnimatedSection delay={300} className="bg-white/10 backdrop-blur-sm p-6 rounded-sm">
//                 <div className="flex flex-row items-center mb-2">
//                   <Users size={20} className="text-accent mr-2" />
//                   <h3 className="text-3xl font-bold text-white">120+</h3>
//                 </div>
//                 <p className="text-white/80">Expert Team</p>
//               </AnimatedSection>
//               <AnimatedSection delay={400} className="bg-white/10 backdrop-blur-sm p-6 rounded-sm">
//                 <div className="flex flex-row items-center mb-2">
//                   <Award size={20} className="text-accent mr-2" />
//                   <h3 className="text-3xl font-bold text-white">15+</h3>
//                 </div>
//                 <p className="text-white/80">Years Experience</p>
//               </AnimatedSection>
//               <AnimatedSection delay={500} className="bg-white/10 backdrop-blur-sm p-6 rounded-sm">
//                 <div className="flex flex-row items-center mb-2">
//                   <Shield size={20} className="text-accent mr-2" />
//                   <h3 className="text-3xl font-bold text-white">15+</h3>
//                 </div>
//                 <p className="text-white/80">Industry Awards</p>
//               </AnimatedSection>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Featured Services Section */}
//       <section className="py-16 md:py-24 bg-construction-50">
//         <div className="container-custom">
//           <AnimatedSection className="text-center mb-12">
//             <span className="bg-accent/20 text-accent py-1 px-3 text-sm font-medium inline-block mb-6 rounded-sm">
//               OUR EXPERTISE
//             </span>
//             <h2 className="section-title">Featured Services</h2>
//             <p className="section-subtitle mx-auto">
//               Discover our core services that have made us a leader in the construction industry.
//             </p>
//           </AnimatedSection>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {featuredServices.map((service, index) => (
//               <AnimatedSection key={index} delay={index * 100} animation="fade-in-up">
//                 <div className="group bg-white rounded-sm overflow-hidden card-shadow h-full border border-construction-100 hover:border-accent transition-colors duration-300">
//                   <div className="relative h-56 overflow-hidden">
//                     <img
//                       src={service.image}
//                       alt={service.title}
//                       className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-construction-900/70 to-transparent"></div>
//                   </div>
//                   <div className="p-6">
//                     <div className="text-accent mb-3">
//                       {service.icon}
//                     </div>
//                     <h3 className="text-xl font-bold text-construction-800 mb-3">
//                       {service.title}
//                     </h3>
//                     <p className="text-construction-500 mb-4">
//                       {service.description}
//                     </p>
//                     <Link
//                       to="/services"
//                       className="inline-flex items-center text-accent hover:text-accent-dark font-medium transition-colors"
//                     >
//                       Learn More <ArrowRight size={16} className="ml-2" />
//                     </Link>
//                   </div>
//                 </div>
//               </AnimatedSection>
//             ))}
//           </div>

//           <div className="text-center mt-10">
//             <Link to="/services">
//               <Button variant="outline" className="bg-transparent border-construction-400 text-construction-700 hover:bg-construction-100 hover:text-construction-900">
//                 View All Services <ArrowRight className="ml-2" size={16} />
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* About Preview Section */}
//       <section className="py-16 md:py-24 bg-white">
//         <div className="container-custom">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
//             <AnimatedSection animation="slide-in-left">
//               <div className="relative">
//                 <img
//                   src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
//                   alt="Construction team"
//                   className="rounded-sm shadow-xl w-full h-auto transform hover:scale-105 transition-transform duration-500"
//                 />
//                 <div className="absolute -bottom-6 -right-6 bg-accent p-6 rounded-sm shadow-lg hidden md:block">
//                   <p className="text-construction-900 font-bold text-2xl">15+ Years</p>
//                   <p className="text-construction-900">of Excellence</p>
//                 </div>
//               </div>
//             </AnimatedSection>

//             <AnimatedSection animation="slide-in-right">
//               <span className="bg-accent/20 text-accent py-1 px-3 text-sm font-medium inline-block mb-6 rounded-sm">
//                 WHO WE ARE
//               </span>
//               <h2 className="text-3xl md:text-4xl font-display font-bold text-construction-800 mb-6">
//                 A Legacy of Quality Construction & Trusted Partnerships
//               </h2>
//               <p className="text-construction-500 mb-6">
//                 For over three decades, BuildWave has been delivering exceptional construction projects across commercial, residential, and infrastructure sectors. Our commitment to quality and innovation has made us a trusted partner for clients worldwide.
//               </p>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
//                 <div className="flex items-start">
//                   <div className="bg-accent/10 p-1 rounded-sm mr-3 mt-1">
//                     <div className="h-4 w-4 bg-accent rounded-sm flex items-center justify-center">
//                       <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
//                       </svg>
//                     </div>
//                   </div>
//                   <p className="text-construction-600">Professional & Experienced Team</p>
//                 </div>
//                 <div className="flex items-start">
//                   <div className="bg-accent/10 p-1 rounded-sm mr-3 mt-1">
//                     <div className="h-4 w-4 bg-accent rounded-sm flex items-center justify-center">
//                       <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
//                       </svg>
//                     </div>
//                   </div>
//                   <p className="text-construction-600">Quality Materials & Craftsmanship</p>
//                 </div>
//                 <div className="flex items-start">
//                   <div className="bg-accent/10 p-1 rounded-sm mr-3 mt-1">
//                     <div className="h-4 w-4 bg-accent rounded-sm flex items-center justify-center">
//                       <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
//                       </svg>
//                     </div>
//                   </div>
//                   <p className="text-construction-600">On-Time Project Completion</p>
//                 </div>
//                 <div className="flex items-start">
//                   <div className="bg-accent/10 p-1 rounded-sm mr-3 mt-1">
//                     <div className="h-4 w-4 bg-accent rounded-sm flex items-center justify-center">
//                       <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
//                       </svg>
//                     </div>
//                   </div>
//                   <p className="text-construction-600">Customer Satisfaction Guaranteed</p>
//                 </div>
//               </div>
//               <Link to="/about" className="btn-primary inline-flex items-center">
//                 Learn More About Us
//                 <ArrowRight size={16} className="ml-2" />
//               </Link>
//             </AnimatedSection>
//           </div>
//         </div>
//       </section>

//       {/* Call to Action Section */}
//       <section className="relative py-16">
//         <div className="absolute inset-0 z-0">
//           <img
//             src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
//             alt="Construction site"
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-gradient-to-r from-construction-900/90 to-construction-900/70"></div>
//         </div>

//         <div className="container-custom relative z-10">
//           <div className="bg-white p-8 md:p-12 rounded-sm shadow-lg border border-construction-100">
//             <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
//               <div className="lg:col-span-3">
//                 <AnimatedSection>
//                   <h2 className="text-3xl md:text-4xl font-display font-bold text-construction-800 mb-4">
//                     Ready to Start Your Construction Project?
//                   </h2>
//                   <p className="text-construction-500 max-w-lg">
//                     Contact us today to discuss your vision, and let our team of experts bring it to life with precision and excellence.
//                   </p>
//                 </AnimatedSection>
//               </div>
//               <div className="lg:col-span-2 flex flex-col sm:flex-row gap-4">
//                 <AnimatedSection delay={100}>
//                   <Link to="/contact" className="btn-primary text-center w-full">
//                     Request a Quote
//                   </Link>
//                 </AnimatedSection>
//                 <AnimatedSection delay={200}>
//                   <Link to="/services" className="btn-outline text-center w-full">
//                     View Our Services
//                   </Link>
//                 </AnimatedSection>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Index;
