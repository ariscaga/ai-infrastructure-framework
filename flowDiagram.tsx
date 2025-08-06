import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Tooltip } from './ui/tooltip';

interface StepData {
  id: string;
  title: string;
  description: string;
  details: string[];
}

const stepData: StepData[] = [
  {
    id: 'user-selection',
    title: 'User Selection',
    description: 'Choose your assessment perspective',
    details: [
      'Portfolio Managers assess from investment perspective',
      'Founders/Executives assess from operational perspective',
      'Different viewpoints provide comprehensive evaluation'
    ]
  },
  {
    id: 'questions',
    title: '7 Questions',
    description: 'Strategic assessment framework',
    details: [
      'Market positioning and competitive advantage',
      'Team capability and leadership depth',
      'Financial sustainability and growth metrics',
      'Technology scalability and architecture',
      'Operational efficiency and processes',
      'Customer acquisition and retention',
      'Risk management and mitigation strategies'
    ]
  },
  {
    id: 'calculation',
    title: 'Score Calculation',
    description: 'Mathematical assessment of responses',
    details: [
      'Each question scored 1-3 points',
      'Total possible score: 21 points',
      'Formula: Sum of responses ÷ 7',
      'Result: SCALE FACTOR™ between 1.0-3.0'
    ]
  },
  {
    id: 'classification',
    title: 'Zone Classification',
    description: 'Risk categorization based on score',
    details: [
      '1.0-1.4: Break Risk Zone - High failure probability',
      '1.5-2.4: Unstable Scale Zone - Growth challenges likely',
      '2.5-3.0: Enterprise-Ready Zone - Sustainable scaling potential'
    ]
  },
  {
    id: 'break-risk',
    title: 'Break Risk Zone',
    description: 'Critical intervention required',
    details: [
      'Immediate strategic pivots needed',
      'High probability of scaling failure',
      'Focus on fundamental business model issues',
      'Consider significant restructuring'
    ]
  },
  {
    id: 'unstable',
    title: 'Unstable Scale Zone',
    description: 'Moderate risk with improvement potential',
    details: [
      'Targeted improvements in key areas',
      'Medium scaling risk with proper intervention',
      'Focus on strengthening weak foundations',
      'Implement systematic improvements'
    ]
  },
  {
    id: 'enterprise-ready',
    title: 'Enterprise-Ready Zone',
    description: 'Strong scaling foundation',
    details: [
      'Low scaling risk with proper execution',
      'Strong fundamentals in place',
      'Focus on optimization and acceleration',
      'Ready for significant growth investments'
    ]
  },
  {
    id: 'risk-assessment',
    title: 'Risk Assessment',
    description: 'Comprehensive evaluation of scaling risks',
    details: [
      'Detailed analysis of identified weaknesses',
      'Probability assessment of scaling success',
      'Timeline considerations for improvements',
      'Resource requirements for mitigation'
    ]
  },
  {
    id: 'action-plan',
    title: 'Action Plan & Recommendations',
    description: 'Customized roadmap for scaling success',
    details: [
      'Prioritized action items based on assessment',
      'Timeline and milestone recommendations',
      'Resource allocation guidance',
      'Success metrics and monitoring plan'
    ]
  }
];

export const FlowDiagram: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(stepData.length); // Show all steps by default
  const [isAnimating, setIsAnimating] = useState(false);
  const [hoveredStep, setHoveredStep] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  const startAnimation = () => {
    setIsAnimating(true);
    setCurrentStep(0);
    
    const animateSteps = () => {
      let step = 0;
      const interval = setInterval(() => {
        step++;
        setCurrentStep(step);
        if (step >= stepData.length) {
          clearInterval(interval);
          setIsAnimating(false);
        }
      }, 1000);
    };
    
    setTimeout(animateSteps, 500);
  };

  const resetAnimation = () => {
    setIsAnimating(false);
    setCurrentStep(stepData.length);
  };

  const isStepActive = (stepIndex: number) => {
    return !isAnimating || currentStep >= stepIndex;
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-2 lg:p-4">
      {/* Compact Title */}
      <div className="text-center mb-4">
        <h1 className="text-lg lg:text-xl font-medium text-[#083D3A] mb-2">
          SCALE FACTOR™ Assessment Process
        </h1>
        <div className="w-full max-w-sm mx-auto h-[2px] bg-gradient-to-r from-[#083D3A] to-[#D4AF37] rounded-full"></div>
      </div>

      {/* Compact Desktop Layout */}
      <div className="hidden lg:block">
        <div className="relative w-full max-w-[1100px] h-[400px] mx-auto overflow-visible">
          {/* User Selection */}
          <motion.div 
            className="absolute left-0 top-[140px] w-[130px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: isStepActive(0) ? 1 : 0.3, 
              scale: isStepActive(0) ? 1 : 0.8 
            }}
            transition={{ duration: 0.5 }}
            onMouseEnter={() => setShowTooltip('user-selection')}
            onMouseLeave={() => setShowTooltip(null)}
          >
            <div className="bg-white rounded-md shadow-md border border-[#083D3A] p-2 hover:shadow-lg transition-shadow cursor-pointer relative">
              <h3 className="text-[#083D3A] text-center mb-2 text-sm font-medium">User Selection</h3>
              <div className="space-y-1">
                <div className="bg-gray-100 rounded-sm p-1 text-xs text-center">Portfolio Manager</div>
                <div className="bg-gray-100 rounded-sm p-1 text-xs text-center">Founder/Executive</div>
              </div>
              
              <AnimatePresence>
                {showTooltip === 'user-selection' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50"
                  >
                    <h4 className="font-medium text-[#083D3A] mb-2">Choose your assessment perspective</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {stepData[0].details.map((detail, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-1 h-1 bg-[#D4AF37] rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Arrow 1 */}
          <motion.div 
            className="absolute left-[130px] top-[170px] w-[50px] h-[1px] bg-[#083D3A]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isStepActive(1) ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ transformOrigin: 'left' }}
          >
            <motion.div 
              className="absolute right-0 top-[-2px] w-0 h-0 border-l-[4px] border-l-[#083D3A] border-t-[2px] border-t-transparent border-b-[2px] border-b-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: isStepActive(1) ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            ></motion.div>
          </motion.div>
          <motion.div 
            className="absolute left-[180px] top-[125px] w-[100px] text-xs text-[#083D3A] text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isStepActive(1) ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Strategic Assessment
          </motion.div>

          {/* 7 Questions */}
          <motion.div 
            className="absolute left-[180px] top-[140px] w-[100px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: isStepActive(1) ? 1 : 0.3, 
              scale: isStepActive(1) ? 1 : 0.8 
            }}
            transition={{ duration: 0.5, delay: 0.5 }}
            onMouseEnter={() => setShowTooltip('questions')}
            onMouseLeave={() => setShowTooltip(null)}
          >
            <div className="bg-white rounded-md shadow-md border border-[#083D3A] p-2 text-center hover:shadow-lg transition-shadow cursor-pointer relative">
              <h3 className="text-[#083D3A] text-sm font-medium">7 Questions</h3>
              
              <AnimatePresence>
                {showTooltip === 'questions' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50"
                  >
                    <h4 className="font-medium text-[#083D3A] mb-2">Strategic assessment framework</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {stepData[1].details.map((detail, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-1 h-1 bg-[#D4AF37] rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Score Calculation */}
          <motion.div 
            className="absolute left-[320px] top-[140px] w-[130px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: isStepActive(2) ? 1 : 0.3, 
              scale: isStepActive(2) ? 1 : 0.8 
            }}
            transition={{ duration: 0.5, delay: 1.0 }}
            onMouseEnter={() => setShowTooltip('calculation')}
            onMouseLeave={() => setShowTooltip(null)}
          >
            <div className="bg-white rounded-md shadow-md border border-[#083D3A] p-2 text-center hover:shadow-lg transition-shadow cursor-pointer relative">
              <h3 className="text-[#083D3A] text-sm font-medium mb-1">Score Calculation</h3>
              <div className="bg-[#D4AF37] bg-opacity-20 rounded-sm p-1 text-xs">
                <div className="text-[#083D3A]">Σ responses ÷ 7 = </div>
                <div className="font-medium text-[#083D3A]">SCALE FACTOR™</div>
              </div>
              
              <AnimatePresence>
                {showTooltip === 'calculation' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50"
                  >
                    <h4 className="font-medium text-[#083D3A] mb-2">Mathematical assessment of responses</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {stepData[2].details.map((detail, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-1 h-1 bg-[#D4AF37] rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Decision Diamond */}
          <motion.div 
            className="absolute left-[490px] top-[140px] w-[80px] h-[60px]"
            initial={{ opacity: 0, rotate: -45 }}
            animate={{ 
              opacity: isStepActive(3) ? 1 : 0.3, 
              rotate: isStepActive(3) ? 0 : -45 
            }}
            transition={{ duration: 0.5, delay: 1.5 }}
            onMouseEnter={() => setShowTooltip('classification')}
            onMouseLeave={() => setShowTooltip(null)}
          >
            <div className="w-full h-full relative cursor-pointer">
              <div className="absolute inset-0 bg-[#D4AF37] transform rotate-45 rounded-sm shadow-md hover:shadow-lg transition-shadow"></div>
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="text-center text-white text-xs font-medium px-1">
                  <div>Zone</div>
                  <div>Classification</div>
                </div>
              </div>
              
              <AnimatePresence>
                {showTooltip === 'classification' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50"
                  >
                    <h4 className="font-medium text-[#083D3A] mb-2">Risk categorization based on score</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {stepData[3].details.map((detail, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-1 h-1 bg-[#D4AF37] rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Zone Boxes */}
          <motion.div 
            className="absolute left-[610px] top-[80px] w-[130px]"
            initial={{ opacity: 0, x: 50 }}
            animate={{ 
              opacity: isStepActive(4) ? 1 : 0.3, 
              x: isStepActive(4) ? 0 : 50 
            }}
            transition={{ duration: 0.5, delay: 2.0 }}
            onMouseEnter={() => setShowTooltip('break-risk')}
            onMouseLeave={() => setShowTooltip(null)}
          >
            <div className="bg-red-500 text-white rounded-md shadow-md p-2 text-center hover:shadow-lg transition-shadow cursor-pointer relative">
              <div className="text-sm mb-1">🚨</div>
              <div className="text-xs font-medium">Break Risk Zone</div>
              
              <AnimatePresence>
                {showTooltip === 'break-risk' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50"
                  >
                    <h4 className="font-medium text-red-600 mb-2">Critical intervention required</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {stepData[4].details.map((detail, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-1 h-1 bg-red-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div 
            className="absolute left-[610px] top-[140px] w-[130px]"
            initial={{ opacity: 0, x: 50 }}
            animate={{ 
              opacity: isStepActive(5) ? 1 : 0.3, 
              x: isStepActive(5) ? 0 : 50 
            }}
            transition={{ duration: 0.5, delay: 2.2 }}
            onMouseEnter={() => setShowTooltip('unstable')}
            onMouseLeave={() => setShowTooltip(null)}
          >
            <div className="bg-orange-500 text-white rounded-md shadow-md p-2 text-center hover:shadow-lg transition-shadow cursor-pointer relative">
              <div className="text-sm mb-1">⚠️</div>
              <div className="text-xs font-medium">Unstable Scale Zone</div>
              
              <AnimatePresence>
                {showTooltip === 'unstable' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50"
                  >
                    <h4 className="font-medium text-orange-600 mb-2">Moderate risk with improvement potential</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {stepData[5].details.map((detail, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-1 h-1 bg-orange-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div 
            className="absolute left-[610px] top-[200px] w-[130px]"
            initial={{ opacity: 0, x: 50 }}
            animate={{ 
              opacity: isStepActive(6) ? 1 : 0.3, 
              x: isStepActive(6) ? 0 : 50 
            }}
            transition={{ duration: 0.5, delay: 2.4 }}
            onMouseEnter={() => setShowTooltip('enterprise-ready')}
            onMouseLeave={() => setShowTooltip(null)}
          >
            <div className="bg-green-500 text-white rounded-md shadow-md p-2 text-center hover:shadow-lg transition-shadow cursor-pointer relative">
              <div className="text-sm mb-1">✅</div>
              <div className="text-xs font-medium">Enterprise-Ready Zone</div>
              
              <AnimatePresence>
                {showTooltip === 'enterprise-ready' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50"
                  >
                    <h4 className="font-medium text-green-600 mb-2">Strong scaling foundation</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {stepData[6].details.map((detail, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-1 h-1 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Risk Assessment */}
          <motion.div 
            className="absolute left-[780px] top-[140px] w-[100px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: isStepActive(7) ? 1 : 0.3, 
              scale: isStepActive(7) ? 1 : 0.8 
            }}
            transition={{ duration: 0.5, delay: 3.0 }}
            onMouseEnter={() => setShowTooltip('risk-assessment')}
            onMouseLeave={() => setShowTooltip(null)}
          >
            <div className="bg-white rounded-md shadow-md border border-[#083D3A] p-2 text-center hover:shadow-lg transition-shadow cursor-pointer relative">
              <h3 className="text-[#083D3A] text-sm font-medium">Risk Assessment</h3>
              
              <AnimatePresence>
                {showTooltip === 'risk-assessment' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50"
                  >
                    <h4 className="font-medium text-[#083D3A] mb-2">Comprehensive evaluation of scaling risks</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {stepData[7].details.map((detail, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-1 h-1 bg-[#D4AF37] rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Action Plan & Recommendations */}
          <motion.div 
            className="absolute left-[920px] top-[140px] w-[130px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: isStepActive(8) ? 1 : 0.3, 
              scale: isStepActive(8) ? 1 : 0.8 
            }}
            transition={{ duration: 0.5, delay: 3.5 }}
            onMouseEnter={() => setShowTooltip('action-plan')}
            onMouseLeave={() => setShowTooltip(null)}
          >
            <div className="bg-[#083D3A] text-white rounded-md shadow-md p-2 text-center hover:shadow-lg transition-shadow cursor-pointer relative">
              <h3 className="text-xs font-medium mb-1">Action Plan &</h3>
              <h3 className="text-xs font-medium">Recommendations</h3>
              
              <AnimatePresence>
                {showTooltip === 'action-plan' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50"
                  >
                    <h4 className="font-medium text-[#083D3A] mb-2">Customized roadmap for scaling success</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {stepData[8].details.map((detail, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-1 h-1 bg-[#D4AF37] rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Arrow 2: 7 Questions to Score Calculation */}
          <motion.div 
            className="absolute left-[280px] top-[170px] w-[40px] h-[1px] bg-[#083D3A]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isStepActive(2) ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            style={{ transformOrigin: 'left' }}
          >
            <motion.div 
              className="absolute right-0 top-[-2px] w-0 h-0 border-l-[4px] border-l-[#083D3A] border-t-[2px] border-t-transparent border-b-[2px] border-b-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: isStepActive(2) ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 1.0 }}
            ></motion.div>
          </motion.div>

          {/* Arrow 3: Score Calculation to Zone Classification */}
          <motion.div 
            className="absolute left-[450px] top-[170px] w-[40px] h-[1px] bg-[#083D3A]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isStepActive(3) ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            style={{ transformOrigin: 'left' }}
          >
            <motion.div 
              className="absolute right-0 top-[-2px] w-0 h-0 border-l-[4px] border-l-[#083D3A] border-t-[2px] border-t-transparent border-b-[2px] border-b-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: isStepActive(3) ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 1.5 }}
            ></motion.div>
          </motion.div>

          {/* Branch lines from diamond to zones */}
          {/* Top branch to Break Risk Zone */}
          <motion.div 
            className="absolute left-[550px] top-[140px] w-[1px] h-[-15px] bg-[#083D3A]"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: isStepActive(4) ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 1.8 }}
            style={{ transformOrigin: 'bottom' }}
          ></motion.div>
          <motion.div 
            className="absolute left-[550px] top-[110px] w-[60px] h-[1px] bg-[#083D3A]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isStepActive(4) ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 2.0 }}
            style={{ transformOrigin: 'left' }}
          >
            <motion.div 
              className="absolute right-0 top-[-2px] w-0 h-0 border-l-[4px] border-l-[#083D3A] border-t-[2px] border-t-transparent border-b-[2px] border-b-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: isStepActive(4) ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 2.3 }}
            ></motion.div>
          </motion.div>
          <motion.div 
            className="absolute left-[575px] top-[95px] text-xs text-[#083D3A]"
            initial={{ opacity: 0 }}
            animate={{ opacity: isStepActive(4) ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 2.1 }}
          >1.0-1.4</motion.div>

          {/* Middle branch to Unstable Scale Zone */}
          <motion.div 
            className="absolute left-[570px] top-[170px] w-[40px] h-[1px] bg-[#083D3A]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isStepActive(5) ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 2.2 }}
            style={{ transformOrigin: 'left' }}
          >
            <motion.div 
              className="absolute right-0 top-[-2px] w-0 h-0 border-l-[4px] border-l-[#083D3A] border-t-[2px] border-t-transparent border-b-[2px] border-b-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: isStepActive(5) ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 2.5 }}
            ></motion.div>
          </motion.div>
          <motion.div 
            className="absolute left-[575px] top-[155px] text-xs text-[#083D3A]"
            initial={{ opacity: 0 }}
            animate={{ opacity: isStepActive(5) ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 2.3 }}
          >1.5-2.4</motion.div>

          {/* Bottom branch to Enterprise-Ready Zone */}
          <motion.div 
            className="absolute left-[550px] top-[200px] w-[1px] h-[15px] bg-[#083D3A]"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: isStepActive(6) ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 2.4 }}
            style={{ transformOrigin: 'top' }}
          ></motion.div>
          <motion.div 
            className="absolute left-[550px] top-[215px] w-[60px] h-[1px] bg-[#083D3A]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isStepActive(6) ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 2.6 }}
            style={{ transformOrigin: 'left' }}
          >
            <motion.div 
              className="absolute right-0 top-[-2px] w-0 h-0 border-l-[4px] border-l-[#083D3A] border-t-[2px] border-t-transparent border-b-[2px] border-b-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: isStepActive(6) ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 2.9 }}
            ></motion.div>
          </motion.div>
          <motion.div 
            className="absolute left-[575px] top-[225px] text-xs text-[#083D3A]"
            initial={{ opacity: 0 }}
            animate={{ opacity: isStepActive(6) ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 2.7 }}
          >2.5-3.0</motion.div>

          {/* Converging arrows to Risk Assessment */}
          {/* From Break Risk Zone */}
          <motion.div 
            className="absolute left-[740px] top-[110px] w-[25px] h-[1px] bg-[#083D3A]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isStepActive(7) ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 3.0 }}
            style={{ transformOrigin: 'left' }}
          ></motion.div>
          <motion.div 
            className="absolute left-[765px] top-[110px] w-[1px] h-[30px] bg-[#083D3A]"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: isStepActive(7) ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 3.2 }}
            style={{ transformOrigin: 'top' }}
          ></motion.div>

          {/* From Unstable Scale Zone */}
          <motion.div 
            className="absolute left-[740px] top-[170px] w-[40px] h-[1px] bg-[#083D3A]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isStepActive(7) ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 3.1 }}
            style={{ transformOrigin: 'left' }}
          ></motion.div>

          {/* From Enterprise-Ready Zone */}
          <motion.div 
            className="absolute left-[740px] top-[230px] w-[25px] h-[1px] bg-[#083D3A]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isStepActive(7) ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 3.0 }}
            style={{ transformOrigin: 'left' }}
          ></motion.div>
          <motion.div 
            className="absolute left-[765px] top-[170px] w-[1px] h-[60px] bg-[#083D3A]"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: isStepActive(7) ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 3.2 }}
            style={{ transformOrigin: 'bottom' }}
          ></motion.div>

          {/* Final Arrow: Risk Assessment to Action Plan */}
          <motion.div 
            className="absolute left-[880px] top-[170px] w-[40px] h-[1px] bg-[#083D3A]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isStepActive(8) ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 3.5 }}
            style={{ transformOrigin: 'left' }}
          >
            <motion.div 
              className="absolute right-0 top-[-2px] w-0 h-0 border-l-[4px] border-l-[#083D3A] border-t-[2px] border-t-transparent border-b-[2px] border-b-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: isStepActive(8) ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 3.8 }}
            ></motion.div>
          </motion.div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="max-w-md mx-auto space-y-6">
          {stepData.slice(0, 4).map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isStepActive(index) ? 1 : 0.3, 
                y: isStepActive(index) ? 0 : 20 
              }}
              transition={{ duration: 0.5, delay: index * 0.5 }}
              className="bg-white rounded-lg shadow-md border-2 border-[#083D3A] p-4"
              onTouchStart={() => setShowTooltip(step.id)}
              onTouchEnd={() => setShowTooltip(null)}
            >
              <h3 className="text-[#083D3A] font-medium mb-2 text-center">{step.title}</h3>
              <p className="text-sm text-gray-600 text-center mb-3">{step.description}</p>
              
              {step.id === 'user-selection' && (
                <div className="space-y-2">
                  <div className="bg-gray-100 rounded-md p-2 text-sm text-center">Portfolio Manager</div>
                  <div className="bg-gray-100 rounded-md p-2 text-sm text-center">Founder/Executive</div>
                </div>
              )}
              
              {step.id === 'calculation' && (
                <div className="bg-[#D4AF37] bg-opacity-20 rounded-md p-2 text-sm text-center">
                  <div className="text-[#083D3A]">Σ responses ÷ 7 = </div>
                  <div className="font-medium text-[#083D3A]">SCALE FACTOR™</div>
                </div>
              )}
              
              <AnimatePresence>
                {showTooltip === step.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 pt-3 border-t border-gray-200"
                  >
                    <ul className="text-sm text-gray-600 space-y-1">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start">
                          <span className="w-1 h-1 bg-[#D4AF37] rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {index < 3 && (
                <motion.div 
                  className="flex justify-center mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isStepActive(index + 1) ? 1 : 0.3 }}
                  transition={{ duration: 0.5, delay: (index + 1) * 0.5 }}
                >
                  <div className="w-[2px] h-8 bg-[#083D3A]"></div>
                  <div className="absolute mt-6 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[8px] border-t-[#083D3A]"></div>
                </motion.div>
              )}
            </motion.div>
          ))}

          {/* Zone Classification - Mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isStepActive(4) ? 1 : 0.3, 
              y: isStepActive(4) ? 0 : 20 
            }}
            transition={{ duration: 0.5, delay: 2.0 }}
            className="bg-[#D4AF37] text-white rounded-lg shadow-md p-4 text-center"
          >
            <h3 className="font-medium mb-4">Zone Classification</h3>
            <div className="space-y-3">
              {[
                { range: '1.0-1.4', zone: 'Break Risk Zone', emoji: '🚨', color: 'bg-red-500', stepIndex: 5 },
                { range: '1.5-2.4', zone: 'Unstable Scale Zone', emoji: '⚠️', color: 'bg-orange-500', stepIndex: 6 },
                { range: '2.5-3.0', zone: 'Enterprise-Ready Zone', emoji: '✅', color: 'bg-green-500', stepIndex: 7 }
              ].map((zone, index) => (
                <motion.div
                  key={zone.range}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: isStepActive(zone.stepIndex) ? 1 : 0.3, 
                    x: isStepActive(zone.stepIndex) ? 0 : -20 
                  }}
                  transition={{ duration: 0.5, delay: 2.2 + (index * 0.2) }}
                  className={`${zone.color} rounded-md p-3 text-center`}
                >
                  <div className="text-lg mb-1">{zone.emoji}</div>
                  <div className="text-sm font-medium">{zone.range}</div>
                  <div className="font-medium">{zone.zone}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Final Steps - Mobile */}
          {stepData.slice(7).map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isStepActive(index + 8) ? 1 : 0.3, 
                y: isStepActive(index + 8) ? 0 : 20 
              }}
              transition={{ duration: 0.5, delay: (index + 8) * 0.5 }}
              className={`rounded-lg shadow-md p-4 text-center ${
                step.id === 'action-plan' ? 'bg-[#083D3A] text-white' : 'bg-white border-2 border-[#083D3A]'
              }`}
              onTouchStart={() => setShowTooltip(step.id)}
              onTouchEnd={() => setShowTooltip(null)}
            >
              <h3 className={`font-medium mb-2 ${step.id === 'action-plan' ? 'text-white' : 'text-[#083D3A]'}`}>
                {step.title}
              </h3>
              <p className={`text-sm mb-3 ${step.id === 'action-plan' ? 'text-gray-200' : 'text-gray-600'}`}>
                {step.description}
              </p>
              
              <AnimatePresence>
                {showTooltip === step.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 pt-3 border-t border-gray-200"
                  >
                    <ul className={`text-sm space-y-1 ${step.id === 'action-plan' ? 'text-gray-200' : 'text-gray-600'}`}>
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start">
                          <span className={`w-1 h-1 rounded-full mt-2 mr-2 flex-shrink-0 ${
                            step.id === 'action-plan' ? 'bg-[#D4AF37]' : 'bg-[#D4AF37]'
                          }`}></span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};