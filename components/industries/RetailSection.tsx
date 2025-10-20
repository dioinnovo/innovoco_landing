"use client";

import { ServiceSection } from '@/components/services/ServiceSection';
import { UseCaseCard, UseCaseGrid } from './UseCaseCard';
import { MetricCard, MetricGrid } from './MetricCard';
import { TechnologyIntegration } from './TechnologyIntegration';
import { retailTechnologies } from './TechnologyStack';
import { ShoppingCart, Users, Target, TrendingUp, Package, DollarSign, Activity, Eye } from 'lucide-react';

export function RetailSection() {
  return (
    <div id="retail" className="scroll-mt-20">
      <ServiceSection
        icon={ShoppingCart}
        iconGradient="bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD]"
        title="Retail & E-Commerce AI Automation & Analytics Solutions"
        subtitle="Customer 360 analytics, AI-powered personalization, demand forecasting automation, and dynamic pricing"
      >
        {/* Key Metrics */}
        <MetricGrid columns={4}>
          <MetricCard
            icon={TrendingUp}
            metric="28%"
            label="Revenue Increase"
            description="Average revenue lift from AI-powered personalization engines"
            gradient="bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD]"
            trend="up"
            trendValue="28%"
          />
          <MetricCard
            icon={Target}
            metric="15-25%"
            label="Conversion Lift"
            description="Improved conversion rates through personalized recommendations"
            gradient="bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD]"
          />
          <MetricCard
            icon={Activity}
            metric="20-30%"
            label="Forecast Accuracy"
            description="Improved demand forecasting with ML models"
            gradient="bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD]"
          />
          <MetricCard
            icon={Package}
            metric="20-30%"
            label="Inventory Reduction"
            description="Lower inventory costs through optimized stocking"
            gradient="bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD]"
            trend="down"
            trendValue="20-30%"
          />
        </MetricGrid>

        {/* Customer 360 & Personalization */}
        <div className="mt-16 mb-12">
          <h3 className="text-2xl font-bold text-[#0B0F19] mb-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD] flex items-center justify-center">
              <Users className="h-5 w-5 text-white" />
            </div>
            Customer 360 & Personalization Engines
          </h3>
          <p className="text-base text-[#525252] leading-relaxed mb-8 max-w-4xl">
            Omnichannel retail requires unified customer profiles consolidating data from e-commerce sites, mobile apps, point-of-sale
            (POS) systems, loyalty programs, email campaigns, and customer service interactions. Our Customer 360 platforms (CDPs) ingest
            data in real time, resolve customer identities across channels, and provide 360-degree views enabling personalized experiences.
            Personalization engines use collaborative filtering, content-based recommendations, and deep learning to suggest products
            tailored to each customer's preferences.
          </p>

          <UseCaseGrid columns={2}>
            <UseCaseCard
              icon={Target}
              title="Product Recommendations"
              metric="15-25% conversion lift"
              description="Collaborative filtering + deep learning for personalized product suggestions. Recommendation engines analyze browsing history, purchase behavior, and similar customer patterns to serve personalized product lists with 15-25% conversion lift on recommended items, real-time recommendation APIs for web and mobile, and 10-30% of e-commerce revenue from recommendations."
              gradient="bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD]"
            />
            <UseCaseCard
              icon={Users}
              title="Customer Segmentation"
              metric="RFM + behavioral clustering"
              description="Targeted marketing campaigns based on customer behavior and value. RFM (Recency, Frequency, Monetary) analysis combined with behavioral clustering enables precise customer segmentation with targeted email and ad campaigns, customer lifetime value optimization, and improved marketing ROI."
              gradient="bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD]"
            />
            <UseCaseCard
              icon={TrendingUp}
              title="Churn Prediction"
              metric="Proactive retention"
              description="ML models identifying at-risk customers for retention campaigns. Predictive models identify customers likely to churn based on purchase frequency decline, engagement metrics, and behavioral signals with proactive retention campaigns, reduced customer churn rates, and optimized retention offer targeting."
              gradient="bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD]"
            />
            <UseCaseCard
              icon={Activity}
              title="Next Best Action"
              metric="Real-time decisioning"
              description="Optimal offer, channel, and timing recommendations per customer. Real-time decisioning engines recommend the optimal offer, communication channel, and timing for each customer interaction with increased campaign response rates, optimized customer journey orchestration, and higher marketing effectiveness."
              gradient="bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD]"
            />
          </UseCaseGrid>
        </div>

        {/* Demand Forecasting & Inventory */}
        <div className="mt-16 mb-12">
          <h3 className="text-2xl font-bold text-[#0B0F19] mb-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD] flex items-center justify-center">
              <Package className="h-5 w-5 text-white" />
            </div>
            Demand Forecasting & Inventory Optimization
          </h3>
          <p className="text-base text-[#525252] leading-relaxed mb-8 max-w-4xl">
            Retail demand forecasting predicts sales at store × SKU granularity, accounting for seasonality, promotions, holidays,
            weather, and competitive pricing. Accurate forecasts reduce stockouts (lost sales) and overstock (markdowns). Our forecasting
            models use gradient boosting (XGBoost, LightGBM) trained on 2-3 years of historical sales data, combining time-series patterns
            with external signals like promotional calendars and weather forecasts. Inventory optimization determines optimal order quantities
            and reorder points balancing holding costs vs. stockout costs.
          </p>

          <UseCaseGrid columns={2}>
            <UseCaseCard
              icon={Activity}
              title="Store-SKU Demand Forecasting"
              metric="20-30% error reduction"
              description="Daily forecasts for 10K+ SKUs across 100+ stores with improved accuracy"
              gradient="bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD]"
            />
            <UseCaseCard
              icon={TrendingUp}
              title="Promotional Lift Modeling"
              metric="Uplift prediction"
              description="Predicting sales uplift from discounts, coupons, and advertising campaigns"
              gradient="bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD]"
            />
            <UseCaseCard
              icon={DollarSign}
              title="Markdown Optimization"
              metric="Revenue maximization"
              description="Dynamic pricing strategies maximizing revenue from slow-moving inventory"
              gradient="bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD]"
            />
            <UseCaseCard
              icon={Package}
              title="Multi-Echelon Inventory"
              metric="Network optimization"
              description="Optimizing inventory positioning across DC → regional → store network"
              gradient="bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD]"
            />
          </UseCaseGrid>
        </div>

        {/* Dynamic Pricing */}
        <div className="mt-16 mb-12">
          <h3 className="text-2xl font-bold text-[#0B0F19] mb-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD] flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-white" />
            </div>
            Dynamic Pricing & Revenue Optimization
          </h3>
          <p className="text-base text-[#525252] leading-relaxed mb-8 max-w-4xl">
            Dynamic pricing adjusts prices in real time based on demand, competition, inventory levels, and customer willingness to pay.
            Retailers are now adopting AI-powered pricing engines that optimize revenue or profit across millions of SKUs. Pricing algorithms
            consider competitor prices (scraped from websites), demand elasticity (how sales respond to price changes), inventory constraints,
            and strategic goals (market share vs. margin). For e-commerce, A/B testing validates pricing strategies.
          </p>

          <UseCaseGrid columns={2}>
            <UseCaseCard
              icon={Eye}
              title="Competitive Price Monitoring"
              metric="1000+ competitors"
              description="Automated web scraping tracking competitor prices daily for price matching"
              gradient="bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD]"
            />
            <UseCaseCard
              icon={DollarSign}
              title="Dynamic Pricing Optimization"
              metric="Revenue maximization"
              description="ML models recommending optimal prices maximizing revenue or margin per SKU"
              gradient="bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD]"
            />
            <UseCaseCard
              icon={Activity}
              title="Promotional Price Testing"
              metric="A/B testing"
              description="Measuring incremental revenue from discounts vs. full price"
              gradient="bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD]"
            />
            <UseCaseCard
              icon={Target}
              title="Personalized Pricing"
              metric="Willingness to pay"
              description="Customer-specific prices based on loyalty tier and purchase history"
              gradient="bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD]"
            />
          </UseCaseGrid>
        </div>

        {/* Store Analytics */}
        <div className="mt-16 mb-12 p-8 rounded-2xl bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] border border-[#93C5FD]/30">
          <h3 className="text-2xl font-bold text-[#0B0F19] mb-4 flex items-center gap-3">
            <Eye className="h-7 w-7 text-[#2563EB]" />
            Retail Analytics & Store Optimization
          </h3>
          <p className="text-base text-[#525252] leading-relaxed mb-6">
            Brick-and-mortar retailers use analytics to optimize store operations: labor scheduling matching staffing to forecasted
            traffic, shelf space allocation maximizing revenue per square foot, and store layout optimization placing high-margin items
            in high-traffic zones. Computer vision systems count foot traffic, track dwell times, and analyze customer paths through stores.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-xl border border-[#93C5FD]/20">
              <h4 className="font-semibold text-[#0B0F19] mb-2">Traffic & Conversion Analytics</h4>
              <p className="text-sm text-[#525252]">Computer vision tracking foot traffic, conversion rate, and average transaction value</p>
            </div>
            <div className="p-4 bg-white rounded-xl border border-[#93C5FD]/20">
              <h4 className="font-semibold text-[#0B0F19] mb-2">Labor Optimization</h4>
              <p className="text-sm text-[#525252]">Forecasting hourly traffic to schedule staff (10-20% labor cost reduction)</p>
            </div>
            <div className="p-4 bg-white rounded-xl border border-[#93C5FD]/20">
              <h4 className="font-semibold text-[#0B0F19] mb-2">Market Basket Analysis</h4>
              <p className="text-sm text-[#525252]">Identifying product affinities for cross-selling and store layout optimization</p>
            </div>
            <div className="p-4 bg-white rounded-xl border border-[#93C5FD]/20">
              <h4 className="font-semibold text-[#0B0F19] mb-2">Store Performance Benchmarking</h4>
              <p className="text-sm text-[#525252]">Comparing stores on KPIs (sales per sq ft, conversion rate, shrinkage)</p>
            </div>
          </div>
        </div>

        {/* Technology Integrations */}
        <TechnologyIntegration
          title="Retail Technology Integrations"
          description="Integration with leading retail platforms, e-commerce systems, customer data platforms, and analytics tools"
          technologies={retailTechnologies}
          gradient="from-[#DBEAFE] to-[#93C5FD]"
        />
      </ServiceSection>
    </div>
  );
}
