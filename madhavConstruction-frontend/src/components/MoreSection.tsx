
import { ReactNode } from 'react';
import AnimatedSection from './AnimatedSection';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MoreSectionProps {
  title: string;
  subtitle: string;
  items: Array<{
    title: string;
    description: string;
    icon?: ReactNode;
    link: string;
  }>;
  className?: string;
}

const MoreSection = ({ 
  title, 
  subtitle, 
  items, 
  className = '' 
}: MoreSectionProps) => {
  return (
    <section className={`more-section py-20 ${className}`}>
      <div className="container-custom">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-construction-800 mb-4">
            {title}
          </h2>
          <p className="text-construction-500 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <AnimatedSection key={index} delay={index * 100}>
              <div className="bg-white p-8 rounded-sm border border-construction-100 card-shadow h-full flex flex-col">
                {item.icon && (
                  <div className="text-accent mb-4">
                    {item.icon}
                  </div>
                )}
                <h3 className="text-xl font-bold text-construction-800 mb-3">
                  {item.title}
                </h3>
                <p className="text-construction-500 mb-4 flex-grow">
                  {item.description}
                </p>
                <Link 
                  to={item.link} 
                  className="inline-flex items-center text-accent hover:text-accent-dark font-medium transition-colors mt-2"
                >
                  Learn More <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MoreSection;
