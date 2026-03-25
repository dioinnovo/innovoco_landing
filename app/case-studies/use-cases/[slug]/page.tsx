import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { businessOutcomeUseCases } from "@/lib/content/case-studies-page-content";
import { getUseCaseStudyDetail } from "@/lib/content/use-case-study-details";
import UseCaseStudyPageClient from "./use-case-study-page-client";

const baseUrl = "https://innovoco.com";

export function generateStaticParams() {
  return businessOutcomeUseCases.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const summary = businessOutcomeUseCases.find((u) => u.slug === slug);
  const detail = getUseCaseStudyDetail(slug);
  if (!summary || !detail) {
    return { title: "Use case | Innovoco" };
  }
  const title = `${summary.title} | Innovoco`;
  const description = `${detail.subheadline} ${summary.outcome}`.slice(0, 155);
  const url = `${baseUrl}/case-studies/use-cases/${slug}`;
  return {
    title,
    description,
    alternates: { canonical: `/case-studies/use-cases/${slug}` },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      siteName: "Innovoco",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function UseCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const summary = businessOutcomeUseCases.find((u) => u.slug === slug);
  const detail = getUseCaseStudyDetail(slug);
  if (!summary || !detail) notFound();

  const related = businessOutcomeUseCases.filter((u) => u.slug !== slug).slice(0, 9);

  return <UseCaseStudyPageClient summary={summary} detail={detail} related={related} />;
}
