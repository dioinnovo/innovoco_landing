'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowRight, X, Phone, Zap, CheckCircle, AlertCircle, Mail } from 'lucide-react';
import { contactFormSchema, type ContactFormData } from '@/lib/validations/contact';
import { submitContactForm } from '@/app/actions/contact';

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ContactModal({ open, onOpenChange }: ContactModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const result = await submitContactForm(data);
      setSubmitResult({
        success: result.success,
        message: result.message,
      });

      if (result.success) {
        // Reset form after successful submission
        setTimeout(() => {
          reset();
          setSubmitResult(null);
          onOpenChange(false);
        }, 4000); // Increased to 4 seconds for better readability
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitResult({
        success: false,
        message: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset state when modal closes
  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setSubmitResult(null);
      reset();
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[550px] max-w-[calc(100vw-48px)] rounded-[16px] sm:rounded-[20px] p-0 overflow-visible border-0 shadow-2xl [&>button]:hidden">
        <div className="p-6 relative">
          <DialogClose className="absolute right-4 top-4 sm:right-6 sm:top-6 rounded-full w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors z-10">
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="sr-only">Close</span>
          </DialogClose>

          <AnimatePresence mode="wait">
            {/* Success State */}
            {submitResult?.success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center py-12 px-4 text-center"
              >
                {/* Animated Success Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.1 
                  }}
                  className="mb-6"
                >
                  <div className="relative">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                      <motion.div
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <CheckCircle className="h-12 w-12 text-green-600" />
                      </motion.div>
                    </div>
                    {/* Pulse effect */}
                    <motion.div
                      className="absolute inset-0 bg-green-100 rounded-full"
                      animate={{ scale: [1, 1.2], opacity: [0.5, 0] }}
                      transition={{ duration: 1, repeat: 1, delay: 0.5 }}
                    />
                  </div>
                </motion.div>

                {/* Success Text */}
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl font-bold text-[#0B0F19] mb-3"
                >
                  Message Sent Successfully!
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-[#525252] mb-6 max-w-sm"
                >
                  {submitResult.message}
                </motion.p>

                {/* Additional Info */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center gap-2 text-sm text-[#525252] bg-gray-50 px-4 py-2 rounded-full"
                >
                  <Mail className="h-4 w-4 text-[#0A58D0]" />
                  <span>Email sent to dio.delahoz@innovoco.com</span>
                </motion.div>

                {/* Quick Contact Reminder */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-8 pt-6 border-t border-gray-200 text-sm"
                >
                  <p className="text-[#525252] mb-2">Need immediate assistance?</p>
                  <div className="flex items-center justify-center gap-2 text-[#0A58D0] font-semibold">
                    <Phone className="h-4 w-4" />
                    <span>+1 305-415-8760</span>
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              /* Form State */
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <DialogHeader className="mb-3 sm:mb-4 space-y-3">
                  <div className="flex flex-col items-center gap-3">
                    {/* Logo */}
                    <div className="w-full flex justify-center">
                      <Image
                        src="/images/logos/Innovoco-Logo-hires.png"
                        alt="Innovoco Logo"
                        width={160}
                        height={53}
                        className="h-7 sm:h-9 w-auto"
                        priority
                      />
                    </div>

                    {/* Centered Phone Section - Compact */}
                    <div className="w-full">
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50/50 rounded-xl p-3 sm:p-4 text-center border border-green-100">
                        <div className="flex items-center justify-center gap-3">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg">
                            <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                          </div>
                          <div className="text-left">
                            <p className="text-xs text-[#525252] font-medium">Want to talk right now?</p>
                            <a href="tel:+13054158760" className="block">
                              <p className="text-lg sm:text-xl font-bold text-[#0A58D0] hover:text-[#084BB3] transition-colors">
                                +1 305-415-8760
                              </p>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Divider - Compact */}
                    <div className="relative w-full">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-gray-200" />
                      </div>
                      <div className="relative flex justify-center text-xs">
                        <span className="bg-white px-3 text-[#525252]">Or schedule below</span>
                      </div>
                    </div>

                    {/* Title - Compact */}
                    <DialogTitle className="text-lg sm:text-xl font-bold text-[#0B0F19] text-center">
                      Book Your Consultation
                    </DialogTitle>
                  </div>
                </DialogHeader>

                {/* Error Message (only shown on form view) */}
                {submitResult && !submitResult.success && (
                  <div className="mb-4 p-4 rounded-lg flex items-start gap-3 bg-red-50 text-red-800 border border-red-200">
                    <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">{submitResult.message}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-xs font-semibold text-[#525252] uppercase tracking-wide">
                  Your Name *
                </Label>
                <Input
                  id="name"
                  placeholder="Full Name"
                  className={`h-10 rounded-lg border-border/30 focus:border-[#0A58D0] transition-colors ${
                    errors.name ? 'border-red-500 focus:border-red-500' : ''
                  }`}
                  disabled={isSubmitting}
                  {...register('name')}
                />
                {errors.name && (
                  <p className="text-xs text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-semibold text-[#525252] uppercase tracking-wide">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  className={`h-10 rounded-lg border-border/30 focus:border-[#0A58D0] transition-colors ${
                    errors.email ? 'border-red-500 focus:border-red-500' : ''
                  }`}
                  disabled={isSubmitting}
                  {...register('email')}
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="company" className="text-xs font-semibold text-[#525252] uppercase tracking-wide">
                  Company *
                </Label>
                <Input
                  id="company"
                  placeholder="Tesla Motors"
                  className={`h-10 rounded-lg border-border/30 focus:border-[#0A58D0] transition-colors ${
                    errors.company ? 'border-red-500 focus:border-red-500' : ''
                  }`}
                  disabled={isSubmitting}
                  {...register('company')}
                />
                {errors.company && (
                  <p className="text-xs text-red-500">{errors.company.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="position" className="text-xs font-semibold text-[#525252] uppercase tracking-wide">
                  Position *
                </Label>
                <Input
                  id="position"
                  placeholder="Data Manager"
                  className={`h-10 rounded-lg border-border/30 focus:border-[#0A58D0] transition-colors ${
                    errors.position ? 'border-red-500 focus:border-red-500' : ''
                  }`}
                  disabled={isSubmitting}
                  {...register('position')}
                />
                {errors.position && (
                  <p className="text-xs text-red-500">{errors.position.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="message" className="text-xs font-semibold text-[#525252] uppercase tracking-wide">
                Your Message *
              </Label>
              <Textarea
                id="message"
                placeholder="Tell us about your data challenges..."
                className={`min-h-[70px] rounded-lg border-border/30 focus:border-[#0A58D0] transition-colors resize-none ${
                  errors.message ? 'border-red-500 focus:border-red-500' : ''
                }`}
                disabled={isSubmitting}
                {...register('message')}
              />
              {errors.message && (
                <p className="text-xs text-red-500">{errors.message.message}</p>
              )}
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#0A58D0] to-[#1D4ED8] hover:from-[#084BB3] hover:to-[#1A45C4] active:from-[#063C8F] active:to-[#163AAA] text-white rounded-full h-11 sm:h-12 text-sm sm:text-base font-bold transition-all duration-300 hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <span className="mr-2">Sending...</span>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  </>
                ) : (
                  <>
                    Schedule Consultation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-[#525252]">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </div>
              <Zap className="h-3 w-3 text-[#0A58D0]" />
              <span>Respond within 1 hour</span>
            </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}