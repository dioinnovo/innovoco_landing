import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Workshop Prep - Executive One-Pager | Innovoco',
  description: 'Strategic Preparation for Building Sustainable AI Competitive Advantages',
}

export default function AIWorkshopOnePagerPage() {
  return (
    <div className="min-h-screen bg-white print:min-h-0">
      <div className="max-w-6xl mx-auto px-4 py-5 print:max-w-none print:px-0 print:py-0">
        {/* Header */}
        <div className="text-center mb-4 pb-2 border-b-2 border-gray-200">
          <span className="inline-block px-2 py-1 bg-blue-600 text-white text-[9px] font-semibold uppercase tracking-wider mb-1.5">
            Executive Preparation Guide
          </span>
          <h1 className="text-xl font-bold text-gray-900 mb-1">
            AI Transformation Workshop
          </h1>
          <p className="text-xs text-gray-600">
            Strategic Preparation for Building Sustainable AI Competitive Advantages
          </p>
        </div>

        {/* Alert */}
        <div className="bg-yellow-50 border-l-4 border-yellow-500 px-2 py-1.5 mb-3">
          <p className="text-[10px] text-gray-700">
            <strong className="font-semibold text-gray-900">18-Month Window:</strong> Organizations must establish defensible AI positions now before market leaders create insurmountable advantages. MIT: Most organizations achieve zero ROI from AI due to lack of strategic frameworks.
          </p>
        </div>

        {/* 1. Pre-Workshop Assessment */}
        <h2 className="text-sm font-semibold text-gray-900 mt-3 mb-2 pb-1 border-b border-gray-200">
          1. Pre-Workshop Assessment
        </h2>
        <div className="grid grid-cols-3 gap-2.5 mb-3">
          <div className="bg-gray-50 p-2 border-l-2 border-blue-600">
            <h4 className="text-[10px] font-semibold text-blue-800 mb-1">Data Assets</h4>
            <ul className="text-[9px] text-gray-600 space-y-0.5 ml-3">
              <li className="relative pl-2">
                <span className="absolute left-0">•</span>
                Proprietary data competitors lack?
              </li>
              <li className="relative pl-2">
                <span className="absolute left-0">•</span>
                Years of historical data?
              </li>
              <li className="relative pl-2">
                <span className="absolute left-0">•</span>
                Unique user interactions?
              </li>
            </ul>
          </div>
          <div className="bg-gray-50 p-2 border-l-2 border-blue-600">
            <h4 className="text-[10px] font-semibold text-blue-800 mb-1">Workflow Analysis</h4>
            <ul className="text-[9px] text-gray-600 space-y-0.5 ml-3">
              <li className="relative pl-2">
                <span className="absolute left-0">•</span>
                Time-consuming processes?
              </li>
              <li className="relative pl-2">
                <span className="absolute left-0">•</span>
                Expertise gaps?
              </li>
              <li className="relative pl-2">
                <span className="absolute left-0">•</span>
                Incomplete data decisions?
              </li>
            </ul>
          </div>
          <div className="bg-gray-50 p-2 border-l-2 border-blue-600">
            <h4 className="text-[10px] font-semibold text-blue-800 mb-1">Competition</h4>
            <ul className="text-[9px] text-gray-600 space-y-0.5 ml-3">
              <li className="relative pl-2">
                <span className="absolute left-0">•</span>
                Competitor AI initiatives?
              </li>
              <li className="relative pl-2">
                <span className="absolute left-0">•</span>
                AI-native entrants?
              </li>
              <li className="relative pl-2">
                <span className="absolute left-0">•</span>
                Customer expectations?
              </li>
            </ul>
          </div>
        </div>

        {/* 2. Three Strategic Moats */}
        <h2 className="text-sm font-semibold text-gray-900 mt-3 mb-2 pb-1 border-b border-gray-200">
          2. Three Strategic Moats
        </h2>
        <div className="grid grid-cols-3 gap-2.5 mb-3">
          <div className="bg-white border border-gray-200 p-2 shadow-sm">
            <div className="text-[11px] font-semibold text-blue-800 mb-1">📊 Data Moat</div>
            <div className="text-[9px] text-gray-700 mb-0.5">User interactions generate proprietary data improving AI continuously</div>
            <div className="text-[8px] text-gray-500 italic">Ex: Spotify&apos;s listening history</div>
          </div>
          <div className="bg-white border border-gray-200 p-2 shadow-sm">
            <div className="text-[11px] font-semibold text-blue-800 mb-1">🚀 Distribution Moat</div>
            <div className="text-[9px] text-gray-700 mb-0.5">Existing relationships provide immediate deployment channels</div>
            <div className="text-[8px] text-gray-500 italic">Ex: Microsoft Office reach</div>
          </div>
          <div className="bg-white border border-gray-200 p-2 shadow-sm">
            <div className="text-[11px] font-semibold text-blue-800 mb-1">🛡️ Trust Moat</div>
            <div className="text-[9px] text-gray-700 mb-0.5">Governance &amp; compliance create confidence in high-stakes use</div>
            <div className="text-[8px] text-gray-500 italic">Ex: Enterprise security</div>
          </div>
        </div>

        {/* 3. Critical Concepts */}
        <h2 className="text-sm font-semibold text-gray-900 mt-3 mb-2 pb-1 border-b border-gray-200">
          3. Critical Concepts
        </h2>
        <div className="grid grid-cols-3 gap-2.5 mb-3">
          <div className="bg-gray-50 p-1.5">
            <div className="text-[10px] font-semibold text-red-700 mb-0.5">Unit Economics Reality</div>
            <div className="text-[9px] text-gray-700">Every AI interaction costs money. At 10x usage, is your model profitable?</div>
          </div>
          <div className="bg-gray-50 p-1.5">
            <div className="text-[10px] font-semibold text-red-700 mb-0.5">Commoditization Trap</div>
            <div className="text-[9px] text-gray-700">ChatGPT wrappers = zero moat. Why choose you if competitors have same AI?</div>
          </div>
          <div className="bg-gray-50 p-1.5">
            <div className="text-[10px] font-semibold text-red-700 mb-0.5">Workflow Integration</div>
            <div className="text-[9px] text-gray-700">AI must accelerate existing workflows, not create new ones.</div>
          </div>
        </div>

        {/* Two column section */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <h3 className="text-xs font-semibold text-gray-800 mb-1.5">Investment Strategies</h3>
            <table className="w-full text-[9px] border-collapse mb-2">
              <thead>
                <tr>
                  <th className="bg-gray-100 px-1 py-0.5 text-left font-semibold border-b border-gray-300">Strategy</th>
                  <th className="bg-gray-100 px-1 py-0.5 text-left font-semibold border-b border-gray-300">Risk</th>
                  <th className="bg-gray-100 px-1 py-0.5 text-left font-semibold border-b border-gray-300">Return</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-1 py-0.5 border-b border-gray-200"><strong>Pioneer</strong> - New AI models</td>
                  <td className="px-1 py-0.5 border-b border-gray-200">High</td>
                  <td className="px-1 py-0.5 border-b border-gray-200">Market Creation</td>
                </tr>
                <tr>
                  <td className="px-1 py-0.5 border-b border-gray-200"><strong>Disruptor</strong> - AI-first workflows</td>
                  <td className="px-1 py-0.5 border-b border-gray-200">Medium</td>
                  <td className="px-1 py-0.5 border-b border-gray-200">Market Share</td>
                </tr>
                <tr>
                  <td className="px-1 py-0.5 border-b border-gray-200"><strong>Enhancement</strong> - AI features</td>
                  <td className="px-1 py-0.5 border-b border-gray-200">Low</td>
                  <td className="px-1 py-0.5 border-b border-gray-200">Incremental</td>
                </tr>
              </tbody>
            </table>

            <h3 className="text-xs font-semibold text-gray-800 mb-1">Essential Metrics to Gather</h3>
            <div className="text-[9px] text-gray-700 leading-relaxed">
              <strong>Financial:</strong> Tech spend %, CAC/LTV, margins, R&amp;D allocation<br/>
              <strong>Operational:</strong> Process times, error rates, support volumes<br/>
              <strong>Market:</strong> Retention, market share, win/loss rates
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray-800 mb-1.5">Required Participants</h3>
            <table className="w-full text-[9px] mb-2">
              <tbody>
                <tr>
                  <td className="py-0.5 font-semibold">CEO</td>
                  <td className="py-0.5 text-gray-600">Vision &amp; resources</td>
                </tr>
                <tr>
                  <td className="py-0.5 font-semibold">CTO</td>
                  <td className="py-0.5 text-gray-600">Technical feasibility</td>
                </tr>
                <tr>
                  <td className="py-0.5 font-semibold">CPO</td>
                  <td className="py-0.5 text-gray-600">Product strategy</td>
                </tr>
                <tr>
                  <td className="py-0.5 font-semibold">CFO</td>
                  <td className="py-0.5 text-gray-600">Economic modeling</td>
                </tr>
                <tr>
                  <td className="py-0.5 font-semibold">Sales/CS</td>
                  <td className="py-0.5 text-gray-600">Market feedback</td>
                </tr>
              </tbody>
            </table>

            <h3 className="text-xs font-semibold text-gray-800 mb-1">Alignment Questions</h3>
            <ol className="text-[9px] text-gray-700 ml-4 leading-relaxed list-decimal">
              <li>What would AI transformation of our industry look like?</li>
              <li>Which advantages could AI make obsolete?</li>
              <li>What proprietary assets can AI amplify?</li>
              <li>Investment tolerance before ROI?</li>
              <li>Required accuracy/reliability levels?</li>
            </ol>
          </div>
        </div>

        {/* 4. Implementation Path */}
        <h2 className="text-sm font-semibold text-gray-900 mt-3 mb-2 pb-1 border-b border-gray-200">
          4. Implementation Path
        </h2>
        <div className="grid grid-cols-4 gap-2 mb-3">
          <div className="flex items-center">
            <div className="w-5 h-5 bg-blue-600 text-white flex items-center justify-center text-[9px] font-semibold mr-1.5">1</div>
            <div className="text-[9px]">
              <strong>Foundation</strong>
              <span className="text-blue-600 ml-1">Day 1</span>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-5 h-5 bg-blue-600 text-white flex items-center justify-center text-[9px] font-semibold mr-1.5">2</div>
            <div className="text-[9px]">
              <strong>Validation</strong>
              <span className="text-blue-600 ml-1">Wk 1-4</span>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-5 h-5 bg-blue-600 text-white flex items-center justify-center text-[9px] font-semibold mr-1.5">3</div>
            <div className="text-[9px]">
              <strong>Pilot</strong>
              <span className="text-blue-600 ml-1">Mo 2-3</span>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-5 h-5 bg-blue-600 text-white flex items-center justify-center text-[9px] font-semibold mr-1.5">4</div>
            <div className="text-[9px]">
              <strong>Scale</strong>
              <span className="text-blue-600 ml-1">Mo 4-12</span>
            </div>
          </div>
        </div>

        {/* CTA Box */}
        <div className="bg-blue-600 text-white p-2.5 text-center mt-3 print:bg-gray-100 print:text-gray-900">
          <h3 className="text-xs font-semibold mb-1 print:text-gray-900">Key Takeaway</h3>
          <p className="text-[10px] opacity-95 print:opacity-100 print:text-gray-700">
            AI is not an IT project—it&apos;s a business model transformation. The cost of inaction isn&apos;t staying still; it&apos;s falling behind exponentially.
          </p>
        </div>

        {/* Next Steps */}
        <h2 className="text-sm font-semibold text-gray-900 mt-3 mb-2 pb-1 border-b border-gray-200">
          Next Steps
        </h2>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="text-[10px] text-gray-700">
            <strong>Before Workshop:</strong><br/>
            ✓ Schedule preliminary discussion<br/>
            ✓ Circulate to participants<br/>
            ✓ Complete assessment with leadership
          </div>
          <div className="text-[10px] text-gray-700">
            <strong>Gather Data:</strong><br/>
            ✓ Required metrics<br/>
            ✓ Align on investment thesis<br/>
            ✓ Define success criteria
          </div>
        </div>

        {/* Footer */}
        <div className="mt-3 pt-2 border-t border-gray-200 text-center text-[9px] text-gray-500">
          Contact: ai-strategy@innovoco.com | © 2025 Innovoco | Confidential
        </div>
      </div>
    </div>
  )
}