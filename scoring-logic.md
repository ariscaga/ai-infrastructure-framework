## Basic Calculation

```javascript
// Simple average of all responses
SCALE_FACTOR = Σ(responses) / 7

// Where each response is scored:
// 1 = Critical gap
// 2 = Developing capability  
// 3 = Optimized system

Zone Classification
javascriptif (SCALE_FACTOR <= 1.4) {
  zone = "Break Risk Zone"
  riskProbability = 15%
  color = "Red"
}
else if (SCALE_FACTOR <= 2.4) {
  zone = "Unstable Scale Zone"
  riskProbability = 8%
  color = "Orange"
}
else {
  zone = "Enterprise-Ready Zone"
  riskProbability = 3%
  color = "Green"
}

Risk Multiplier
Critical failures (responses = 1) compound risk:
javascriptcriticalFailures = count(responses == 1)
riskMultiplier = 1 + (criticalFailures * 0.08)
// Capped at 1.4x maximum
Infrastructure Risk Calculation
javascriptfunction calculateRisk(scaleFactor, monthlyRevenue, teamSize) {
  
  // Base components
  contractFailure = monthlyRevenue * 3 * riskProbability
  teamRecovery = 15000 * teamSizeFactor * 1.5
  customerChurn = annualRevenue * 0.1 * riskProbability
  emergencyInfra = 25000 + (monthlyRevenue * 0.3)
  opportunityCost = monthlyRevenue * 3 * riskProbability
  
  // Apply multiplier for critical failures
  totalRisk = (sum of components) * riskMultiplier
  
  return {
    annualRisk: totalRisk,
    monthlyExposure: totalRisk / 12
  }
}

Team Size Factors
Team SizeFactorImpact1-50.8xSmaller team, lower recovery cost6-151.0xBaseline16-501.3xCoordination complexity50+1.6xEnterprise complexity

ROI Calculation
javascriptcurrentRisk = calculateRisk(currentScore)
improvedRisk = calculateRisk(targetScore)
annualSavings = currentRisk - improvedRisk
investmentRequired = 15000 // Average
ROI = (annualSavings / investmentRequired) * 100

Example Scoring
Company A: Responses [1,2,1,2,1,2,3]

Sum: 12
SCALE FACTOR: 12/7 = 1.7
Zone: Unstable Scale Zone
Critical Failures: 3
Risk Multiplier: 1.24x

Company B: Responses [3,3,2,3,3,2,3]

Sum: 19
SCALE FACTOR: 19/7 = 2.7
Zone: Enterprise-Ready Zone
Critical Failures: 0
Risk Multiplier: 1.0x