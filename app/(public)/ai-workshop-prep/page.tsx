import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Transformation Workshop - Executive Preparation Guide | Innovoco',
  description: 'Strategic Preparation for Building Sustainable AI Competitive Advantages',
}

export default function AIWorkshopPrepGuidePage() {
  return (
    <div className="min-h-screen bg-white print:min-h-0 [print-color-adjust:exact] [-webkit-print-color-adjust:exact]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 print:max-w-none print:px-0 print:py-0">
        {/* Header */}
        <div className="text-center mb-12 pb-6 border-b-2 border-gray-200 print:mb-8 print:pb-4">
          <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-semibold uppercase tracking-wider mb-4">
            Executive Preparation Guide
          </span>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            AI Transformation Workshop
          </h1>
          <p className="text-lg text-gray-600">
            Strategic Preparation for Building Sustainable AI Competitive Advantages
          </p>
        </div>

        {/* Strategic Context Alert */}
        <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-8">
          <p className="text-gray-700">
            <strong className="font-semibold text-gray-900">Strategic Context:</strong> Organizations have approximately 18 months to establish defensible AI positions before market leaders create insurmountable advantages. MIT research reveals most organizations achieve zero return from AI investments—not due to technology limitations, but absence of strategic frameworks.
          </p>
        </div>

        {/* Pre-Workshop Preparation Checklist */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
            Pre-Workshop Preparation Checklist
          </h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            1. Assess Your Current Position
          </h3>
          <p className="text-gray-600 mb-6">
            Complete this assessment with your leadership team before the workshop:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 print:break-inside-avoid">
            <div className="bg-gray-50 p-4 border-l-4 border-blue-600">
              <h4 className="font-semibold text-gray-800 mb-3">Data Assets Inventory</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• What proprietary data do we collect that competitors cannot access?</li>
                <li>• How many years of historical data do we possess?</li>
                <li>• What unique user interactions generate valuable training data?</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-4 border-l-4 border-blue-600">
              <h4 className="font-semibold text-gray-800 mb-3">Workflow Analysis</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Which business processes consume the most time and resources?</li>
                <li>• Where do employees require expertise they currently lack?</li>
                <li>• What decisions are made with incomplete information?</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-4 border-l-4 border-blue-600">
              <h4 className="font-semibold text-gray-800 mb-3">Competitive Landscape</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Which competitors have announced AI initiatives?</li>
                <li>• What AI-native startups are entering our market?</li>
                <li>• How are customer expectations shifting regarding AI capabilities?</li>
              </ul>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
            2. Understand the Three Strategic Moats
          </h3>
          <p className="text-gray-600 mb-6">
            Align your team on which moat represents your greatest opportunity:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 print:break-inside-avoid">
            <div className="bg-white border border-gray-200 p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center text-lg">
                  📊
                </div>
                <span className="font-semibold text-gray-900 text-lg">Data Moat</span>
              </div>
              <p className="text-gray-600 mb-2">
                Every user interaction generates proprietary data that continuously improves your AI capabilities.
              </p>
              <p className="text-gray-600">
                <strong className="font-semibold text-gray-800">Example:</strong> Spotify&apos;s listening history creates personalized recommendations no competitor can replicate.
              </p>
            </div>

            <div className="bg-white border border-gray-200 p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center text-lg">
                  🚀
                </div>
                <span className="font-semibold text-gray-900 text-lg">Distribution Moat</span>
              </div>
              <p className="text-gray-600 mb-2">
                Existing customer relationships and workflows provide immediate AI deployment channels.
              </p>
              <p className="text-gray-600">
                <strong className="font-semibold text-gray-800">Example:</strong> Microsoft Copilot succeeds because it reaches millions through existing Office installations.
              </p>
            </div>

            <div className="bg-white border border-gray-200 p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center text-lg">
                  🛡️
                </div>
                <span className="font-semibold text-gray-900 text-lg">Trust Moat</span>
              </div>
              <p className="text-gray-600 mb-2">
                Governance, compliance, and reliability create confidence in high-stakes applications.
              </p>
              <p className="text-gray-600">
                <strong className="font-semibold text-gray-800">Example:</strong> Enterprise clients choose Microsoft over startups due to security guarantees and regulatory compliance.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
            3. Identify Your AI Investment Thesis
          </h3>

          <div className="overflow-x-auto print:overflow-visible">
            <table className="w-full border-collapse print:text-sm">
              <thead>
                <tr>
                  <th className="bg-gray-100 px-4 py-3 text-left font-semibold text-gray-900 border-b-2 border-gray-300">
                    Strategy
                  </th>
                  <th className="bg-gray-100 px-4 py-3 text-left font-semibold text-gray-900 border-b-2 border-gray-300">
                    Description
                  </th>
                  <th className="bg-gray-100 px-4 py-3 text-left font-semibold text-gray-900 border-b-2 border-gray-300">
                    Risk Level
                  </th>
                  <th className="bg-gray-100 px-4 py-3 text-left font-semibold text-gray-900 border-b-2 border-gray-300">
                    Potential Return
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-3 border-b border-gray-200">
                    <strong className="font-semibold">Pioneer</strong>
                  </td>
                  <td className="px-4 py-3 border-b border-gray-200 text-gray-600">
                    Create entirely new business models only possible with AI
                  </td>
                  <td className="px-4 py-3 border-b border-gray-200 text-gray-600">
                    High
                  </td>
                  <td className="px-4 py-3 border-b border-gray-200 text-gray-600">
                    Market Creation
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 border-b border-gray-200">
                    <strong className="font-semibold">Disruptor</strong>
                  </td>
                  <td className="px-4 py-3 border-b border-gray-200 text-gray-600">
                    Reimagine existing workflows with AI-first approaches
                  </td>
                  <td className="px-4 py-3 border-b border-gray-200 text-gray-600">
                    Medium
                  </td>
                  <td className="px-4 py-3 border-b border-gray-200 text-gray-600">
                    Market Share Gain
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 border-b border-gray-200">
                    <strong className="font-semibold">Enhancement</strong>
                  </td>
                  <td className="px-4 py-3 border-b border-gray-200 text-gray-600">
                    Augment current capabilities with AI features
                  </td>
                  <td className="px-4 py-3 border-b border-gray-200 text-gray-600">
                    Lower
                  </td>
                  <td className="px-4 py-3 border-b border-gray-200 text-gray-600">
                    Incremental Value
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Critical Concepts */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
            Critical Concepts for Workshop Success
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 print:break-inside-avoid">
            <div className="bg-red-50 border-l-4 border-red-600 p-4">
              <h4 className="font-semibold text-gray-900 mb-2">The Unit Economics Reality</h4>
              <p className="text-gray-700 mb-2">
                Unlike traditional software where marginal costs approach zero, <strong className="font-semibold">every AI interaction incurs compute costs</strong>. Your most engaged users become your most expensive customers. Successful AI products require architectural decisions that balance user value with sustainable economics.
              </p>
              <p className="text-gray-700">
                <strong className="font-semibold">Key Question:</strong> At 10x current usage, does our business model remain profitable?
              </p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4">
              <h4 className="font-semibold text-gray-900 mb-2">The Commoditization Trap</h4>
              <p className="text-gray-700 mb-2">
                Building a &quot;wrapper&quot; around ChatGPT or Claude creates zero defensibility. When OpenAI releases their next feature, your entire product advantage can disappear overnight.
              </p>
              <p className="text-gray-700">
                <strong className="font-semibold">Key Question:</strong> If competitors had identical AI capabilities tomorrow, why would customers still choose us?
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-600 p-4">
              <h4 className="font-semibold text-gray-900 mb-2">The Workflow Integration Principle</h4>
              <p className="text-gray-700 mb-2">
                Successful AI products don&apos;t create new workflows—they accelerate existing ones. Users shouldn&apos;t need to &quot;learn AI&quot; or change behavior patterns.
              </p>
              <p className="text-gray-700">
                <strong className="font-semibold">Key Question:</strong> Does our AI save time at the exact moment users need it, within their existing workflow?
              </p>
            </div>
          </div>
        </section>

        {/* Essential Metrics */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
            Essential Metrics to Gather
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 print:break-inside-avoid">
            <div className="bg-gray-50 p-4 border-l-4 border-blue-600">
              <h4 className="font-semibold text-gray-800 mb-3">Financial Metrics</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Current technology spend as % of revenue</li>
                <li>• Customer acquisition cost (CAC) and lifetime value (LTV)</li>
                <li>• Gross margins by product line</li>
                <li>• R&D budget allocation</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-4 border-l-4 border-blue-600">
              <h4 className="font-semibold text-gray-800 mb-3">Operational Metrics</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Average time to complete key workflows</li>
                <li>• Error rates in critical processes</li>
                <li>• Customer support ticket volume by category</li>
                <li>• Employee productivity benchmarks</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-4 border-l-4 border-blue-600">
              <h4 className="font-semibold text-gray-800 mb-3">Market Metrics</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Customer retention rates</li>
                <li>• Market share trends</li>
                <li>• Competitive win/loss ratios</li>
                <li>• Time to market for new features</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Workshop Success Factors */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
            Workshop Success Factors
          </h2>

          <h3 className="text-xl font-semibold text-gray-800 mb-4">Required Participants</h3>
          
          <div className="overflow-x-auto mb-8">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="bg-gray-100 px-4 py-3 text-left font-semibold text-gray-900 border-b-2 border-gray-300">
                    Role
                  </th>
                  <th className="bg-gray-100 px-4 py-3 text-left font-semibold text-gray-900 border-b-2 border-gray-300">
                    Critical Contribution
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-3 border-b border-gray-200">
                    <strong className="font-semibold">CEO/President</strong>
                  </td>
                  <td className="px-4 py-3 border-b border-gray-200 text-gray-600">
                    Strategic vision and resource commitment
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 border-b border-gray-200">
                    <strong className="font-semibold">CTO/CIO</strong>
                  </td>
                  <td className="px-4 py-3 border-b border-gray-200 text-gray-600">
                    Technical feasibility and infrastructure
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 border-b border-gray-200">
                    <strong className="font-semibold">CPO/Head of Product</strong>
                  </td>
                  <td className="px-4 py-3 border-b border-gray-200 text-gray-600">
                    Product strategy and user experience
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 border-b border-gray-200">
                    <strong className="font-semibold">CFO/Finance Leader</strong>
                  </td>
                  <td className="px-4 py-3 border-b border-gray-200 text-gray-600">
                    Economic modeling and investment decisions
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 border-b border-gray-200">
                    <strong className="font-semibold">Head of Sales/Customer Success</strong>
                  </td>
                  <td className="px-4 py-3 border-b border-gray-200 text-gray-600">
                    Market feedback and customer needs
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-gray-50 p-6 print:break-inside-avoid">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Pre-Workshop Alignment Questions</h3>
            <p className="text-gray-600 mb-4">
              Discuss these questions with your leadership team before the workshop:
            </p>
            <ol className="list-decimal list-inside space-y-3 text-gray-700">
              <li className="font-medium">What would need to be true for AI to transform our industry completely?</li>
              <li className="font-medium">Which of our competitive advantages could AI make obsolete?</li>
              <li className="font-medium">What proprietary assets do we have that AI could amplify?</li>
              <li className="font-medium">How much are we willing to invest before seeing returns?</li>
              <li className="font-medium">What level of accuracy/reliability do our customers require?</li>
            </ol>
          </div>
        </section>

        {/* Path Forward */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
            The Path Forward: From Strategy to Implementation
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:grid-cols-2 print:break-inside-avoid">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center font-semibold flex-shrink-0">
                1
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900 mb-1">Strategic Foundation</div>
                <div className="text-sm text-blue-600 mb-2">Workshop Day</div>
                <p className="text-gray-600">
                  Define your AI positioning and moat strategy. Identify high-impact opportunities. Design economic models for sustainability. Establish governance framework.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center font-semibold flex-shrink-0">
                2
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900 mb-1">Validation Sprint</div>
                <div className="text-sm text-blue-600 mb-2">Weeks 1-4</div>
                <p className="text-gray-600">
                  Test critical assumptions with minimal investment. Validate customer willingness to pay. Assess technical feasibility. Refine economic projections.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center font-semibold flex-shrink-0">
                3
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900 mb-1">Pilot Implementation</div>
                <div className="text-sm text-blue-600 mb-2">Months 2-3</div>
                <p className="text-gray-600">
                  Deploy initial AI capabilities to select users. Gather feedback and iterate rapidly. Monitor costs and value metrics. Build internal AI competencies.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center font-semibold flex-shrink-0">
                4
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900 mb-1">Scale & Defend</div>
                <div className="text-sm text-blue-600 mb-2">Months 4-12</div>
                <p className="text-gray-600">
                  Expand successful pilots across organization. Establish data flywheel effects. Build proprietary advantages. Monitor competitive responses.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Investment Readiness */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
            Investment Readiness Assessment
          </h2>

          <p className="text-gray-700 font-semibold mb-4">
            Before committing to AI transformation, ensure alignment on:
          </p>

          <ul className="space-y-3 text-gray-600 mb-8">
            <li>
              <strong className="font-semibold text-gray-800">Minimum Viable Investment:</strong> AI transformation requires sustained investment, not one-time experiments
            </li>
            <li>
              <strong className="font-semibold text-gray-800">Timeline Expectations:</strong> Meaningful moats take 12-18 months to establish
            </li>
            <li>
              <strong className="font-semibold text-gray-800">Risk Tolerance:</strong> Some initiatives will fail; portfolio approach is essential
            </li>
            <li>
              <strong className="font-semibold text-gray-800">Organizational Readiness:</strong> Cultural shift from perfection to iteration is required
            </li>
            <li>
              <strong className="font-semibold text-gray-800">Success Metrics:</strong> Define what victory looks like in measurable terms
            </li>
          </ul>
        </section>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 -mx-4 sm:-mx-6 lg:-mx-8 mb-12 print:mx-0 print:p-6 print:bg-gray-100 print:text-gray-900 print:break-inside-avoid">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Key Takeaway</h2>
            <p className="text-lg mb-4 opacity-95 print:opacity-100 print:text-gray-700">
              AI is not an IT project—it&apos;s a business model transformation. Organizations that approach it as merely adding features will fail. Those that recognize it as a fundamental shift in value creation, competitive dynamics, and customer expectations will define the next decade of their industries.
            </p>
            <p className="text-xl font-semibold print:text-gray-900">
              The cost of inaction isn&apos;t staying still—it&apos;s falling behind exponentially as early movers build compounding advantages.
            </p>
          </div>
        </div>

        {/* Next Steps */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
            Next Steps
          </h2>

          <ol className="list-decimal list-inside space-y-3 text-gray-700">
            <li>
              <strong className="font-semibold">Schedule preliminary discussion</strong> with workshop facilitators
            </li>
            <li>
              <strong className="font-semibold">Circulate this guide</strong> to all workshop participants
            </li>
            <li>
              <strong className="font-semibold">Complete pre-workshop assessment</strong> with leadership team
            </li>
            <li>
              <strong className="font-semibold">Gather required metrics</strong> and documentation
            </li>
            <li>
              <strong className="font-semibold">Align on investment thesis</strong> and risk tolerance
            </li>
          </ol>
        </section>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm print:mt-8 print:pt-4">
          <p className="mb-2">
            For questions about workshop preparation or strategic alignment, contact: ai-strategy@innovoco.com
          </p>
          <p>© 2025 Innovoco. Confidential and Proprietary.</p>
        </footer>
      </div>
    </div>
  )
}