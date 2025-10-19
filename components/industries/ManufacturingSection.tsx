"use client";

import { ServiceSection } from '@/components/services/ServiceSection';
import { UseCaseCard, UseCaseGrid } from './UseCaseCard';
import { MetricCard, MetricGrid } from './MetricCard';
import { TechnologyStack, manufacturingTechnologies } from './TechnologyStack';
import { Factory, Wrench, Eye, TrendingDown, PackageCheck, Network, Activity, Shield } from 'lucide-react';

export function ManufacturingSection() {
  return (
    <div id="manufacturing" className="scroll-mt-20">
      <ServiceSection
        icon={Factory}
        iconGradient="bg-gradient-to-br from-[#EDE9FE] to-[#C4B5FD]"
        title="Manufacturing AI Automation & Analytics Solutions"
        subtitle="Industry 4.0 intelligent automation, predictive maintenance analytics, and supply chain optimization"
      >
        {/* Key Metrics */}
        <MetricGrid columns={4}>
          <MetricCard
            icon={TrendingDown}
            metric="30-50%"
            label="Downtime Reduction"
            description="Predictive maintenance reducing unplanned equipment failures"
            gradient="bg-gradient-to-br from-[#EDE9FE] to-[#C4B5FD]"
            trend="down"
            trendValue="30-50%"
          />
          <MetricCard
            icon={Eye}
            metric="99%+"
            label="Defect Detection"
            description="Computer vision quality control accuracy at line speed"
            gradient="bg-gradient-to-br from-[#EDE9FE] to-[#C4B5FD]"
          />
          <MetricCard
            icon={Activity}
            metric="15-25%"
            label="Forecast Accuracy"
            description="Improved demand forecasting with ML models"
            gradient="bg-gradient-to-br from-[#EDE9FE] to-[#C4B5FD]"
          />
          <MetricCard
            icon={PackageCheck}
            metric="20-30%"
            label="Asset Lifespan"
            description="Extended equipment life through predictive maintenance"
            gradient="bg-gradient-to-br from-[#EDE9FE] to-[#C4B5FD]"
          />
        </MetricGrid>

        {/* Predictive Maintenance */}
        <div className="mt-16 mb-12">
          <h3 className="text-2xl font-bold text-[#0B0F19] mb-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#EDE9FE] to-[#C4B5FD] flex items-center justify-center">
              <Wrench className="h-5 w-5 text-white" />
            </div>
            Predictive Maintenance & Asset Management
          </h3>
          <p className="text-base text-[#525252] leading-relaxed mb-8 max-w-4xl">
            Unplanned equipment downtime costs manufacturers $50 billion annually. Predictive maintenance uses IoT sensor data (vibration,
            temperature, pressure, sound) and machine learning to predict equipment failures days or weeks before they occur—enabling
            scheduled maintenance during planned downtime rather than emergency repairs during production. Our solutions integrate with
            industrial IoT platforms (PTC ThingWorx, Siemens MindSphere, GE Predix) and analyze time-series data using LSTM neural networks.
          </p>

          <UseCaseGrid columns={2}>
            <UseCaseCard
              icon={Activity}
              title="Rotating Equipment Monitoring"
              metric="30-50% downtime reduction"
              description="Vibration analysis predicting bearing failures in motors, pumps, and turbines"
              gradient="bg-gradient-to-br from-[#EDE9FE] to-[#C4B5FD]"
              expandable
              details="Analyze vibration, temperature, and sound data from rotating equipment using LSTM neural networks and gradient boosting models."
              benefits={[
                "30-50% reduction in unplanned downtime",
                "20-30% extension of asset lifespans",
                "Integration with CMMS systems (SAP PM, IBM Maximo)"
              ]}
            />
            <UseCaseCard
              icon={Wrench}
              title="CNC Machine Health"
              metric="Tool wear prediction"
              description="Tool wear prediction and spindle monitoring for precision manufacturing"
              gradient="bg-gradient-to-br from-[#EDE9FE] to-[#C4B5FD]"
              expandable
              details="Monitor CNC machine health through spindle vibration, cutting force, and acoustic emission sensors to predict tool wear and prevent quality defects."
              benefits={[
                "Reduced scrap from worn tools",
                "Optimized tool replacement schedules",
                "Real-time alerts for maintenance teams"
              ]}
            />
            <UseCaseCard
              icon={PackageCheck}
              title="Fleet Telematics"
              metric="Vehicle health tracking"
              description="Predictive maintenance for trucks, forklifts, and material handling equipment"
              gradient="bg-gradient-to-br from-[#EDE9FE] to-[#C4B5FD]"
              expandable
              details="Telematics data from fleet vehicles predicts battery failures, hydraulic issues, and brake wear before equipment breakdowns occur."
              benefits={[
                "Reduced fleet downtime",
                "Optimized maintenance schedules",
                "Lower repair costs through early detection"
              ]}
            />
            <UseCaseCard
              icon={TrendingDown}
              title="HVAC Optimization"
              metric="Energy + maintenance"
              description="Predictive maintenance plus energy optimization for building management systems"
              gradient="bg-gradient-to-br from-[#EDE9FE] to-[#C4B5FD]"
              expandable
              details="Optimize HVAC systems for both energy efficiency and equipment reliability using predictive maintenance and control optimization algorithms."
              benefits={[
                "15-25% energy cost reduction",
                "Predictive maintenance for HVAC equipment",
                "Automated fault detection and diagnostics"
              ]}
            />
          </UseCaseGrid>
        </div>

        {/* Quality Control */}
        <div className="mt-16 mb-12">
          <h3 className="text-2xl font-bold text-[#0B0F19] mb-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#EDE9FE] to-[#C4B5FD] flex items-center justify-center">
              <Eye className="h-5 w-5 text-white" />
            </div>
            Quality Control & Defect Detection
          </h3>
          <p className="text-base text-[#525252] leading-relaxed mb-8 max-w-4xl">
            Manual visual inspection is slow, inconsistent, and expensive. Our computer vision quality control systems automate defect
            detection on production lines—identifying scratches, dents, cracks, misalignments, and color variations with 99%+ accuracy.
            Systems are deployed at line speed (60+ frames per second), inspecting 100% of products rather than statistical samples.
            Integration with MES enables real-time quality dashboards showing defect rates by shift, line, operator, and SKU.
          </p>

          <UseCaseGrid columns={2}>
            <UseCaseCard
              icon={Eye}
              title="Surface Defect Detection"
              metric="99%+ accuracy"
              description="Automated visual inspection for automotive paint, semiconductor wafers, and metal sheets"
              gradient="bg-gradient-to-br from-[#EDE9FE] to-[#C4B5FD]"
            />
            <UseCaseCard
              icon={PackageCheck}
              title="Assembly Verification"
              metric="3D vision"
              description="Confirming correct component placement in complex assemblies (electronics, automotive)"
              gradient="bg-gradient-to-br from-[#EDE9FE] to-[#C4B5FD]"
            />
            <UseCaseCard
              icon={Activity}
              title="Packaging Inspection"
              metric="Line speed checks"
              description="Barcode reading, label verification, and seal integrity checks at packaging lines"
              gradient="bg-gradient-to-br from-[#EDE9FE] to-[#C4B5FD]"
            />
            <UseCaseCard
              icon={Shield}
              title="Dimensional Metrology"
              metric="CAD compliance"
              description="AI-powered measurement systems ensuring parts meet CAD specifications"
              gradient="bg-gradient-to-br from-[#EDE9FE] to-[#C4B5FD]"
            />
          </UseCaseGrid>
        </div>

        {/* Supply Chain Optimization */}
        <div className="mt-16 mb-12">
          <h3 className="text-2xl font-bold text-[#0B0F19] mb-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#EDE9FE] to-[#C4B5FD] flex items-center justify-center">
              <PackageCheck className="h-5 w-5 text-white" />
            </div>
            Supply Chain Optimization & Demand Forecasting
          </h3>
          <p className="text-base text-[#525252] leading-relaxed mb-8 max-w-4xl">
            Supply chain disruptions—semiconductor shortages, logistics delays, demand volatility—create cascading impacts across
            manufacturing operations. Our supply chain AI solutions provide visibility and predictive capabilities: demand forecasting
            using time-series models (Prophet, ARIMA, LSTM), inventory optimization balancing carrying costs vs. stockout risk, supplier
            risk scoring based on financial health and geopolitical factors, and transportation optimization minimizing freight costs.
          </p>

          <UseCaseGrid columns={2}>
            <UseCaseCard
              icon={Activity}
              title="Demand Forecasting"
              metric="15-25% error reduction"
              description="ML models predicting SKU-level demand with improved accuracy vs. traditional methods"
              gradient="bg-gradient-to-br from-[#EDE9FE] to-[#C4B5FD]"
            />
            <UseCaseCard
              icon={PackageCheck}
              title="Inventory Optimization"
              metric="Cost minimization"
              description="Multi-echelon inventory models minimizing total supply chain cost (holding + stockout)"
              gradient="bg-gradient-to-br from-[#EDE9FE] to-[#C4B5FD]"
            />
            <UseCaseCard
              icon={Shield}
              title="Supplier Risk Scoring"
              metric="Predictive signals"
              description="Identifying at-risk suppliers based on financial, operational, and geopolitical signals"
              gradient="bg-gradient-to-br from-[#EDE9FE] to-[#C4B5FD]"
            />
            <UseCaseCard
              icon={Factory}
              title="Production Scheduling"
              metric="Throughput optimization"
              description="Constraint-based optimization scheduling production to maximize throughput"
              gradient="bg-gradient-to-br from-[#EDE9FE] to-[#C4B5FD]"
            />
          </UseCaseGrid>
        </div>

        {/* OT/IT Integration */}
        <div className="mt-16 mb-12 p-8 rounded-2xl bg-gradient-to-br from-[#F5F3FF] to-[#EDE9FE] border border-[#C4B5FD]/30">
          <h3 className="text-2xl font-bold text-[#0B0F19] mb-4 flex items-center gap-3">
            <Network className="h-7 w-7 text-[#7C3AED]" />
            Manufacturing Data Integration (OT/IT Convergence)
          </h3>
          <p className="text-base text-[#525252] leading-relaxed mb-6">
            Manufacturing environments are complex: ERP systems, MES platforms, SCADA controllers, IoT sensors, quality management systems,
            and legacy databases all contain critical operational data. Our manufacturing data platforms integrate these disparate sources
            into unified data lakes or warehouses using OT/IT integration patterns.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-xl border border-[#C4B5FD]/20">
              <h4 className="font-semibold text-[#0B0F19] mb-2">OT/IT Convergence</h4>
              <p className="text-sm text-[#525252]">Secure integration of shop floor devices (PLCs, SCADA, HMIs) with enterprise IT systems</p>
            </div>
            <div className="p-4 bg-white rounded-xl border border-[#C4B5FD]/20">
              <h4 className="font-semibold text-[#0B0F19] mb-2">IoT Data Ingestion</h4>
              <p className="text-sm text-[#525252]">Real-time streaming pipelines for sensor telemetry at 10K+ events/sec</p>
            </div>
            <div className="p-4 bg-white rounded-xl border border-[#C4B5FD]/20">
              <h4 className="font-semibold text-[#0B0F19] mb-2">ERP Integration</h4>
              <p className="text-sm text-[#525252]">Bi-directional sync with SAP, Oracle EBS, Infor, and Microsoft Dynamics</p>
            </div>
            <div className="p-4 bg-white rounded-xl border border-[#C4B5FD]/20">
              <h4 className="font-semibold text-[#0B0F19] mb-2">MES Integration</h4>
              <p className="text-sm text-[#525252]">Real-time production tracking, quality data, and OEE dashboards</p>
            </div>
          </div>
        </div>

        {/* Technology Integrations */}
        <TechnologyStack
          title="Manufacturing Technology Integrations"
          description="Comprehensive integration with ERP, MES, IoT platforms, and shop floor systems via OPC UA and MQTT"
          technologies={manufacturingTechnologies}
          columns={5}
        />
      </ServiceSection>
    </div>
  );
}
