      {/* Industry-Specific AI Solutions - Enhanced with Larger Text & More Content */}
      <AnimatedSection id="industries" className="py-20 md:py-24 px-4 bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9]">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="text-sm font-bold tracking-wider uppercase text-teal-600 mb-3">
              Proven Results Across Industries
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0B0F19] mb-6">
              Industry-Specific AI Solutions
            </h2>
            <p className="text-xl text-[#525252] max-w-4xl mx-auto leading-relaxed">
              Deep domain expertise across regulated industries with proven use cases and measurable ROI.
              We understand your industry's unique challenges and deliver AI solutions that drive real business impact.
            </p>
          </motion.div>

          {/* Industries - Each as Full Section */}
          <div className="space-y-12">
            {/* Financial Services AI */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="group bg-white border-border/30 hover:border-[#0A58D0]/50 shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
                <CardHeader className="pb-6 bg-gradient-to-br from-[#DBEAFE]/20 to-white">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#DBEAFE] to-[#93C5FD] flex items-center justify-center shadow-md">
                      <Building2 className="h-8 w-8 text-[#0A58D0]" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl md:text-3xl">Financial Services AI</CardTitle>
                      <p className="text-base text-[#525252] mt-1">Real-time fraud detection & intelligent risk modeling</p>
                    </div>
                  </div>
                  <p className="text-base text-[#525252] leading-relaxed">
                    Deploy enterprise-grade AI systems that protect billions in transactions while improving customer experience through faster, smarter credit decisions.
                  </p>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-8 mb-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-lg bg-[#DBEAFE] flex items-center justify-center flex-shrink-0">
                          <Shield className="h-6 w-6 text-[#0A58D0]" />
                        </div>
                        <div className="flex-1">
                          <p className="text-lg font-bold text-[#0B0F19] mb-2">AI-Powered Fraud Detection</p>
                          <p className="text-base text-[#525252] leading-relaxed mb-3">
                            Deploy real-time transaction monitoring systems that process millions of transactions daily. Our machine learning models adapt to evolving fraud patterns, protecting your customers while reducing false positives that harm user experience.
                          </p>
                          <ul className="space-y-2 text-sm text-[#525252]">
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-[#0A58D0] flex-shrink-0" />
                              <span>99.8% detection accuracy across all transaction types</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-[#0A58D0] flex-shrink-0" />
                              <span>75% reduction in false positives improving customer satisfaction</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-[#0A58D0] flex-shrink-0" />
                              <span>&lt;50ms real-time inference for instant fraud decisions</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-[#0A58D0] flex-shrink-0" />
                              <span>Continuous model retraining to adapt to new fraud vectors</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-lg bg-[#DBEAFE] flex items-center justify-center flex-shrink-0">
                          <TrendingUp className="h-6 w-6 text-[#0A58D0]" />
                        </div>
                        <div className="flex-1">
                          <p className="text-lg font-bold text-[#0B0F19] mb-2">Credit Risk ML Models</p>
                          <p className="text-base text-[#525252] leading-relaxed mb-3">
                            Advanced machine learning models that incorporate alternative data sources—from utility payments to social signals—to improve lending decisions, reduce default rates, and expand access to credit for underserved populations.
                          </p>
                          <ul className="space-y-2 text-sm text-[#525252]">
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-[#0A58D0] flex-shrink-0" />
                              <span>18% improvement in approval rates without increasing risk</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-[#0A58D0] flex-shrink-0" />
                              <span>Alternative data integration (rental, utility, telecom)</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-[#0A58D0] flex-shrink-0" />
                              <span>Built-in regulatory compliance and model explainability</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-[#0A58D0] flex-shrink-0" />
                              <span>Automated model validation and bias detection</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border/50">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-[#0A58D0] mb-2">$50M+</div>
                      <div className="text-base text-[#525252]">Annual fraud savings</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-[#0A58D0] mb-2">99.8%</div>
                      <div className="text-base text-[#525252]">Detection accuracy</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-[#0A58D0] mb-2">&lt;50ms</div>
                      <div className="text-base text-[#525252]">Response time</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Healthcare Data Analytics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="group bg-white border-border/30 hover:border-[#0F766E]/50 shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
                <CardHeader className="pb-6 bg-gradient-to-br from-[#D1FAE5]/20 to-white">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#D1FAE5] to-[#6EE7B7] flex items-center justify-center shadow-md">
                      <HeartPulse className="h-8 w-8 text-[#0F766E]" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl md:text-3xl">Healthcare Data Analytics</CardTitle>
                      <p className="text-base text-[#525252] mt-1">Clinical AI & predictive patient analytics</p>
                    </div>
                  </div>
                  <p className="text-base text-[#525252] leading-relaxed">
                    Transform patient care with AI-powered clinical decision support and predictive analytics that improve outcomes, reduce readmissions, and lower costs—all while maintaining HIPAA compliance.
                  </p>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-8 mb-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-lg bg-[#D1FAE5] flex items-center justify-center flex-shrink-0">
                          <Brain className="h-6 w-6 text-[#0F766E]" />
                        </div>
                        <div className="flex-1">
                          <p className="text-lg font-bold text-[#0B0F19] mb-2">Clinical Decision Support Systems</p>
                          <p className="text-base text-[#525252] leading-relaxed mb-3">
                            AI-powered diagnosis assistance that analyzes patient histories, lab results, and medical imaging to provide evidence-based recommendations at the point of care. Our systems integrate seamlessly with existing EMR workflows.
                          </p>
                          <ul className="space-y-2 text-sm text-[#525252]">
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-[#0F766E] flex-shrink-0" />
                              <span>35% reduction in diagnostic errors across specialties</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-[#0F766E] flex-shrink-0" />
                              <span>Real-time clinical alerts for high-risk conditions</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-[#0F766E] flex-shrink-0" />
                              <span>Full HIPAA compliance with encrypted data handling</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-[#0F766E] flex-shrink-0" />
                              <span>Integration with Epic, Cerner, and other major EMRs</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-lg bg-[#D1FAE5] flex items-center justify-center flex-shrink-0">
                          <Users className="h-6 w-6 text-[#0F766E]" />
                        </div>
                        <div className="flex-1">
                          <p className="text-lg font-bold text-[#0B0F19] mb-2">Readmission Risk Prediction</p>
                          <p className="text-base text-[#525252] leading-relaxed mb-3">
                            Predictive models that identify high-risk patients before discharge, enabling proactive interventions that reduce readmissions and improve patient outcomes while lowering hospital penalties and costs.
                          </p>
                          <ul className="space-y-2 text-sm text-[#525252]">
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-[#0F766E] flex-shrink-0" />
                              <span>87% accuracy in predicting 30-day readmission risk</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-[#0F766E] flex-shrink-0" />
                              <span>28% reduction in preventable readmissions</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-[#0F766E] flex-shrink-0" />
                              <span>Automated care coordination workflows</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-[#0F766E] flex-shrink-0" />
                              <span>Patient-specific discharge planning recommendations</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border/50">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-[#0F766E] mb-2">$8M+</div>
                      <div className="text-base text-[#525252]">Annual cost savings</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-[#0F766E] mb-2">35%</div>
                      <div className="text-base text-[#525252]">Error reduction</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-[#0F766E] mb-2">20K+</div>
                      <div className="text-base text-[#525252]">Patients annually</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Manufacturing AI Solutions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="group bg-white border-border/30 hover:border-[#7C3AED]/50 shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
                <CardHeader className="pb-6 bg-gradient-to-br from-[#EDE9FE]/20 to-white">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#EDE9FE] to-[#C4B5FD] flex items-center justify-center shadow-md">
                      <Factory className="h-8 w-8 text-[#7C3AED]" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl md:text-3xl">Manufacturing AI Solutions</CardTitle>
                      <p className="text-base text-[#525252] mt-1">Predictive maintenance & computer vision quality control</p>
                    </div>
                  </div>
                  <p className="text-base text-[#525252] leading-relaxed">
                    Maximize uptime and product quality with AI-powered predictive maintenance and computer vision inspection systems that catch defects human eyes miss while dramatically reducing costs.
                  </p>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-8 mb-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-lg bg-[#EDE9FE] flex items-center justify-center flex-shrink-0">
                          <Zap className="h-6 w-6 text-[#7C3AED]" />
                        </div>
                        <div className="flex-1">
                          <p className="text-lg font-bold text-[#0B0F19] mb-2">AI Predictive Maintenance</p>
                          <p className="text-base text-[#525252] leading-relaxed mb-3">
                            IoT sensor analytics that predict equipment failures before they happen. Our systems analyze vibration, temperature, and performance data in real-time to schedule maintenance during planned downtime, preventing costly unexpected failures.
                          </p>
                          <ul className="space-y-2 text-sm text-[#525252]">
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-[#7C3AED] flex-shrink-0" />
                              <span>60% reduction in unplanned downtime</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-[#7C3AED] flex-shrink-0" />
                              <span>30% decrease in maintenance costs</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-[#7C3AED] flex-shrink-0" />
                              <span>Real-time IoT sensor monitoring across production lines</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-[#7C3AED] flex-shrink-0" />
                              <span>Predictive alerts 7-14 days before failure</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-lg bg-[#EDE9FE] flex items-center justify-center flex-shrink-0">
                          <Target className="h-6 w-6 text-[#7C3AED]" />
                        </div>
                        <div className="flex-1">
                          <p className="text-lg font-bold text-[#0B0F19] mb-2">Computer Vision Quality Control</p>
                          <p className="text-base text-[#525252] leading-relaxed mb-3">
                            Real-time defect detection using advanced computer vision that inspects 100% of products at production speed. Our systems catch microscopic defects, color variations, and assembly errors that manual inspection misses.
                          </p>
                          <ul className="space-y-2 text-sm text-[#525252]">
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-[#7C3AED] flex-shrink-0" />
                              <span>99.7% defect detection accuracy (vs. 95% manual)</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-[#7C3AED] flex-shrink-0" />
                              <span>50% faster inspection than manual processes</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-[#7C3AED] flex-shrink-0" />
                              <span>100% product coverage at full production speed</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-[#7C3AED] flex-shrink-0" />
                              <span>Automated defect classification and routing</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border/50">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-[#7C3AED] mb-2">$12M+</div>
                      <div className="text-base text-[#525252]">Annual savings</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-[#7C3AED] mb-2">22%</div>
                      <div className="text-base text-[#525252]">OEE increase</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-[#7C3AED] mb-2">99.7%</div>
                      <div className="text-base text-[#525252]">QC accuracy</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Retail Analytics Platform */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="group bg-white border-border/30 hover:border-[#DC2626]/50 shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
                <CardHeader className="pb-6 bg-gradient-to-br from-[#FECACA]/20 to-white">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#FECACA] to-[#FCA5A5] flex items-center justify-center shadow-md">
                      <ShoppingCart className="h-8 w-8 text-[#DC2626]" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl md:text-3xl">Retail Analytics Platform</CardTitle>
                      <p className="text-base text-[#525252] mt-1">AI personalization & demand forecasting</p>
                    </div>
                  </div>
                  <p className="text-base text-[#525252] leading-relaxed">
                    Drive revenue growth with AI-powered personalization engines and demand forecasting that optimize inventory, increase conversions, and deliver the right products to the right customers at the right time.
                  </p>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-8 mb-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-lg bg-[#FECACA] flex items-center justify-center flex-shrink-0">
                          <DollarSign className="h-6 w-6 text-[#DC2626]" />
                        </div>
                        <div className="flex-1">
                          <p className="text-lg font-bold text-[#0B0F19] mb-2">AI-Powered Personalization</p>
                          <p className="text-base text-[#525252] leading-relaxed mb-3">
                            Product recommendation engines that analyze browsing behavior, purchase history, and contextual signals to deliver personalized experiences that drive engagement and revenue. Our systems power email, web, and mobile channels.
                          </p>
                          <ul className="space-y-2 text-sm text-[#525252]">
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-[#DC2626] flex-shrink-0" />
                              <span>32% improvement in conversion rates</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-[#DC2626] flex-shrink-0" />
                              <span>18% increase in average order value (AOV)</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-[#DC2626] flex-shrink-0" />
                              <span>Real-time personalization across all touchpoints</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-[#DC2626] flex-shrink-0" />
                              <span>A/B testing and multi-variant optimization</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-lg bg-[#FECACA] flex items-center justify-center flex-shrink-0">
                          <BarChart3 className="h-6 w-6 text-[#DC2626]" />
                        </div>
                        <div className="flex-1">
                          <p className="text-lg font-bold text-[#0B0F19] mb-2">ML Demand Forecasting</p>
                          <p className="text-base text-[#525252] leading-relaxed mb-3">
                            Advanced forecasting models that predict demand at SKU-location level, incorporating seasonality, promotions, weather, and economic indicators. Optimize inventory investment and reduce stockouts while minimizing overstock waste.
                          </p>
                          <ul className="space-y-2 text-sm text-[#525252]">
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-[#DC2626] flex-shrink-0" />
                              <span>93% forecast accuracy (industry avg: 75%)</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-[#DC2626] flex-shrink-0" />
                              <span>45% reduction in excess inventory carrying costs</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-[#DC2626] flex-shrink-0" />
                              <span>SKU-level forecasting with promotional impact analysis</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-[#DC2626] flex-shrink-0" />
                              <span>Automated replenishment and stock allocation</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border/50">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-[#DC2626] mb-2">$18M+</div>
                      <div className="text-base text-[#525252]">Added value annually</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-[#DC2626] mb-2">26%</div>
                      <div className="text-base text-[#525252]">Revenue increase</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-[#DC2626] mb-2">93%</div>
                      <div className="text-base text-[#525252]">Forecast accuracy</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
