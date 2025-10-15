// Google Analytics 4 Event Tracking Helpers
// Use these functions to track user interactions across the site

declare global {
  interface Window {
    gtag?: (
      command: 'event',
      eventName: string,
      eventParams?: Record<string, any>
    ) => void;
  }
}

export const trackServiceCardClick = (serviceName: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'service_card_click', {
      service_name: serviceName,
      event_category: 'engagement',
      event_label: 'Landing Page Service Cards',
    });
  }
};

export const trackCTAClick = (ctaLocation: string, ctaText: string, destination?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'cta_click', {
      cta_location: ctaLocation,
      cta_text: ctaText,
      destination: destination,
      event_category: 'conversion',
    });
  }
};

export const trackPageScroll = (scrollDepth: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'scroll', {
      scroll_depth: scrollDepth,
      event_category: 'engagement',
    });
  }
};

export const trackServicePageView = (serviceName: string, timeOnPage?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'service_page_view', {
      service_name: serviceName,
      time_on_page: timeOnPage,
      event_category: 'engagement',
    });
  }
};

export const trackFormSubmission = (formName: string, formLocation: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'form_submission', {
      form_name: formName,
      form_location: formLocation,
      event_category: 'conversion',
    });
  }
};

export const trackNavigationClick = (menuItem: string, destination: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'navigation_click', {
      menu_item: menuItem,
      destination: destination,
      event_category: 'navigation',
    });
  }
};

export const trackDownload = (resourceName: string, resourceType: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'download', {
      resource_name: resourceName,
      resource_type: resourceType,
      event_category: 'engagement',
    });
  }
};

export const trackCaseStudyView = (caseStudyTitle: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'case_study_view', {
      case_study_title: caseStudyTitle,
      event_category: 'engagement',
    });
  }
};

export const trackIndustrySelection = (industry: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'industry_selection', {
      industry: industry,
      event_category: 'engagement',
    });
  }
};

// Custom hook for scroll depth tracking
export const useScrollDepthTracking = () => {
  if (typeof window === 'undefined') return;

  let scrollDepths = [25, 50, 75, 100];
  let triggeredDepths: number[] = [];

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;

    scrollDepths.forEach(depth => {
      if (scrollPercentage >= depth && !triggeredDepths.includes(depth)) {
        trackPageScroll(depth);
        triggeredDepths.push(depth);
      }
    });
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
};
