'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Footer } from '@/components/layout/footer';
import ContactModal from '@/components/landing/ContactModal';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Search,
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  Users,
  Zap,
  Heart,
  TrendingUp,
  Home,
  Gift,
  Laptop,
  Calendar,
  ArrowRight,
  Filter,
  Building,
  Star,
  Sparkles,
  Rocket,
  Target,
  Award
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  posted: string;
  description: string;
  requirements: string[];
  benefits: string[];
}

export default function CareersPage() {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedExperience, setSelectedExperience] = useState('all');

  // Sample job listings - in production, this would come from an API
  const jobs: Job[] = [
    {
      id: '1',
      title: 'Senior AI Engineer',
      department: 'Engineering',
      location: 'Remote (US/Canada)',
      type: 'Full-time',
      experience: 'Senior (5+ years)',
      salary: '$150k - $200k',
      posted: '2 days ago',
      description: 'Lead the development of cutting-edge AI solutions for Fortune 500 clients',
      requirements: ['5+ years ML experience', 'Python expertise', 'Cloud platforms'],
      benefits: ['Equity', 'Health insurance', 'Learning budget']
    },
    {
      id: '2',
      title: 'Data Engineer',
      department: 'Engineering',
      location: 'Remote (Global)',
      type: 'Full-time',
      experience: 'Mid-level (3-5 years)',
      salary: '$120k - $160k',
      posted: '3 days ago',
      description: 'Build scalable data pipelines and infrastructure for enterprise clients',
      requirements: ['3+ years data engineering', 'SQL/NoSQL', 'ETL pipelines'],
      benefits: ['Equity', 'Remote work', 'Conference budget']
    },
    {
      id: '3',
      title: 'Solutions Architect',
      department: 'Solutions',
      location: 'Florida, US',
      type: 'Full-time',
      experience: 'Senior (5+ years)',
      salary: '$140k - $180k',
      posted: '1 week ago',
      description: 'Design enterprise AI architectures and guide client implementations',
      requirements: ['Enterprise architecture', 'Cloud certifications', 'Client-facing experience'],
      benefits: ['Equity', 'Travel opportunities', 'Certification sponsorship']
    },
    {
      id: '4',
      title: 'Product Manager - AI Platform',
      department: 'Product',
      location: 'Remote (US)',
      type: 'Full-time',
      experience: 'Mid-level (3-5 years)',
      salary: '$130k - $170k',
      posted: '4 days ago',
      description: 'Drive product strategy for our enterprise AI platform',
      requirements: ['B2B product experience', 'Technical background', 'Agile methodology'],
      benefits: ['Equity', 'Flexible hours', 'Health & wellness']
    },
    {
      id: '5',
      title: 'Customer Success Manager',
      department: 'Customer Success',
      location: 'Ontario, Canada',
      type: 'Full-time',
      experience: 'Mid-level (3-5 years)',
      salary: 'CAD $100k - $130k',
      posted: '1 week ago',
      description: 'Ensure enterprise client success and drive platform adoption',
      requirements: ['Enterprise CSM experience', 'Technical aptitude', 'Relationship building'],
      benefits: ['Equity', 'Performance bonus', 'Professional development']
    },
    {
      id: '6',
      title: 'ML Research Engineer',
      department: 'Research',
      location: 'Remote (Global)',
      type: 'Full-time',
      experience: 'Senior (5+ years)',
      salary: '$160k - $220k',
      posted: '5 days ago',
      description: 'Research and develop state-of-the-art ML models and algorithms',
      requirements: ['PhD or equivalent', 'Published research', 'Deep learning expertise'],
      benefits: ['Equity', 'Research budget', 'Conference attendance']
    }
  ];

  // Filter jobs based on search and filters
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = searchQuery === '' || 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesDepartment = selectedDepartment === 'all' || job.department === selectedDepartment;
      const matchesLocation = selectedLocation === 'all' || 
        (selectedLocation === 'remote' && job.location.toLowerCase().includes('remote')) ||
        (selectedLocation === 'us' && job.location.toLowerCase().includes('us')) ||
        (selectedLocation === 'canada' && job.location.toLowerCase().includes('canada'));
      const matchesExperience = selectedExperience === 'all' || job.experience.toLowerCase().includes(selectedExperience);
      
      return matchesSearch && matchesDepartment && matchesLocation && matchesExperience;
    });
  }, [searchQuery, selectedDepartment, selectedLocation, selectedExperience, jobs]);

  const departments = ['all', 'Engineering', 'Product', 'Solutions', 'Customer Success', 'Research'];
  const locations = ['all', 'remote', 'us', 'canada'];
  const experienceLevels = ['all', 'entry', 'mid-level', 'senior'];

  const benefits = [
    { icon: DollarSign, title: 'Competitive Salary', description: 'Top-tier compensation + equity' },
    { icon: Heart, title: 'Health & Wellness', description: 'Premium health, dental, vision' },
    { icon: TrendingUp, title: 'Learning Budget', description: '$5,000 annual development fund' },
    { icon: Home, title: 'Remote-First', description: 'Work from anywhere globally' },
    { icon: Calendar, title: 'Unlimited PTO', description: 'Take the time you need' },
    { icon: Laptop, title: 'Latest Tech', description: 'MacBook Pro + productivity tools' }
  ];

  const values = [
    { icon: Rocket, title: 'Innovation First', description: 'Work on cutting-edge AI projects that shape the future' },
    { icon: Users, title: 'Collaborative Culture', description: 'Learn from the best minds in AI and data engineering' },
    { icon: Target, title: 'Impact Driven', description: 'Your work directly impacts Fortune 500 transformations' },
    { icon: Award, title: 'Excellence Matters', description: 'We celebrate wins and learn from every experience' }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-[#F9FAFB]">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image 
                src="/images/logos/innovoco-logo.png"
                alt="Innovoco"
                width={140}
                height={40}
                className="object-contain"
                style={{ height: '40px', width: 'auto' }}
              />
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/partners">
                <Button variant="ghost" size="sm">Partners</Button>
              </Link>
              <Link href="/case-studies">
                <Button variant="ghost" size="sm">Case Studies</Button>
              </Link>
              <Button 
                onClick={() => setContactModalOpen(true)}
                size="sm"
                className="bg-[#0A58D0] hover:bg-[#084BB3] text-white"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6 bg-gradient-to-br from-[#0A58D0]/10 via-[#8B5CF6]/5 to-transparent">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto max-w-6xl"
        >
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[#8B5CF6]/10 text-[#8B5CF6] border-[#8B5CF6]/20">
              <Sparkles className="h-3 w-3 mr-1" />
              We're Hiring
            </Badge>
            <h1 className="text-5xl font-bold text-[#0B0F19] mb-6">
              Build the Future of Enterprise AI
            </h1>
            <p className="text-xl text-[#525252] max-w-3xl mx-auto mb-8">
              Join our mission to transform how Fortune 500 companies leverage data and AI. 
              Work with cutting-edge technology, brilliant minds, and make a real impact.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Badge variant="outline" className="px-4 py-2">
                <MapPin className="h-4 w-4 mr-2" />
                Remote-First Culture
              </Badge>
              <Badge variant="outline" className="px-4 py-2">
                <Gift className="h-4 w-4 mr-2" />
                Equity for All
              </Badge>
              <Badge variant="outline" className="px-4 py-2">
                <TrendingUp className="h-4 w-4 mr-2" />
                High Growth
              </Badge>
              <Badge variant="outline" className="px-4 py-2">
                <Users className="h-4 w-4 mr-2" />
                50+ Team Members
              </Badge>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 px-6 bg-white border-b border-gray-100">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search jobs by title, department, or keywords..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>
                    {dept === 'all' ? 'All Departments' : dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="canada">Canada</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedExperience} onValueChange={setSelectedExperience}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="entry">Entry Level</SelectItem>
                <SelectItem value="mid-level">Mid-Level</SelectItem>
                <SelectItem value="senior">Senior</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Found {filteredJobs.length} open {filteredJobs.length === 1 ? 'position' : 'positions'}
            </p>
            <Button variant="ghost" size="sm" className="text-[#0A58D0]">
              <Filter className="h-4 w-4 mr-2" />
              Clear Filters
            </Button>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-4">
            {filteredJobs.map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-6 hover:shadow-lg transition-all duration-300 border-gray-200 hover:border-[#0A58D0]/30">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-[#0A58D0]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Briefcase className="h-6 w-6 text-[#0A58D0]" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-[#0B0F19] mb-2">
                            {job.title}
                          </h3>
                          <p className="text-sm text-[#525252] mb-3">
                            {job.description}
                          </p>
                          <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Building className="h-4 w-4" />
                              {job.department}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {job.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {job.type}
                            </span>
                            <span className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4" />
                              {job.salary}
                            </span>
                          </div>
                          <div className="flex gap-2 mt-3">
                            <Badge variant="outline" className="text-xs">
                              {job.experience}
                            </Badge>
                            <Badge variant="outline" className="text-xs text-green-600 border-green-200">
                              {job.posted}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Button 
                        variant="outline"
                        className="border-[#0A58D0]/30 text-[#0A58D0] hover:bg-[#0A58D0]/10"
                      >
                        Learn More
                      </Button>
                      <Button className="bg-[#0A58D0] hover:bg-[#084BB3] text-white">
                        Apply Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
            
            {filteredJobs.length === 0 && (
              <Card className="p-12 text-center">
                <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No positions found
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Try adjusting your search or filters to find more opportunities
                </p>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedDepartment('all');
                    setSelectedLocation('all');
                    setSelectedExperience('all');
                  }}
                >
                  Clear All Filters
                </Button>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Culture & Values */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#8B5CF6]/5 to-transparent">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0B0F19] mb-4">
              Life at Innovoco
            </h2>
            <p className="text-lg text-[#525252]">
              Join a culture that values innovation, growth, and work-life balance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-[#8B5CF6]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-[#8B5CF6]" />
                </div>
                <h3 className="font-semibold text-[#0B0F19] mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-[#525252]">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0B0F19] mb-4">
              Benefits & Perks
            </h2>
            <p className="text-lg text-[#525252]">
              We take care of our team so they can focus on building amazing solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-all duration-300">
                  <benefit.icon className="h-8 w-8 text-[#0A58D0] mb-4" />
                  <h3 className="font-semibold text-[#0B0F19] mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-[#525252]">
                    {benefit.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#0A58D0] to-[#084BB3]">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Don't See the Right Role?
          </h2>
          <p className="text-lg mb-8 text-white/90">
            We're always looking for exceptional talent. Send us your resume and let us know 
            how you can contribute to our mission.
          </p>
          <Button 
            onClick={() => setContactModalOpen(true)}
            size="lg"
            className="bg-white text-[#0A58D0] hover:bg-gray-100"
          >
            Send Your Resume
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      <Footer onContactClick={() => setContactModalOpen(true)} />
      <ContactModal open={contactModalOpen} onOpenChange={setContactModalOpen} />
    </main>
  );
}