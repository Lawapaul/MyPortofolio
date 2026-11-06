export const smartIrrigationProject = {
  id: "smart-irrigation",
  name: "Smart Irrigation System — AquaField",
  shortName: "AquaField / Smart Irrigation",
  category: "AI + IoT & Sustainable Agriculture",
  overview: "A closed-loop sensor-driven irrigation platform that predicts precise crop water requirements using machine learning (achieving an outstanding 0.99870 R² score across 100,000 records) and safely automates physical motor valves via real-time ESP32 microcontroller telemetry.",
  problemStatement: "Traditional agricultural irrigation relies on static timers or manual judgment, leading to massive freshwater waste, nutrient leaching, root rot, or crop failure due to underwatering during unexpected climate variations.",
  motivation: "Create an autonomous, data-driven precision agriculture system that couples predictive machine learning with physical IoT actuation, cutting water consumption while ensuring failsafe hardware operation.",
  objectives: "Predict crop water demand from environmental and soil parameters, achieve high predictive accuracy, communicate bidirectionally with ESP32 microcontrollers, and enforce hardware safety interlocks (rain cutoffs, pump dry-run protection).",
  technologies: [
    "Python",
    "Flask",
    "Scikit-learn",
    "XGBoost",
    "LightGBM",
    "ESP32 Microcontroller",
    "Arduino C++",
    "Soil Moisture & DHT Sensors",
    "Relay Actuators",
    "JavaScript",
    "REST / HTTP Telemetry"
  ],
  architecture: "Cyber-physical architecture: 1) Hardware Telemetry Layer: ESP32 microcontroller connected to soil moisture probes, DHT humidity/temperature sensors, and rain detectors. 2) Communication Bridge: HTTP/REST telemetry streaming sensor readings to cloud/local Flask backend. 3) Machine Learning Predictive Engine: Trained regression ensemble (XGBoost / LightGBM) calculating exact volumetric water needs. 4) Actuation & Safety Layer: Automated relay switching with hardware failsafes (rain-aware suppression, water flow verification to prevent pump burnout). 5) Monitoring Interface: Live dashboard displaying telemetry streams and irrigation logs.",
  workflow: "Soil & environmental sensors measure field -> ESP32 transmits packet via HTTP -> Flask backend parses readings -> ML regression model predicts exact water demand -> Actuation decision evaluated against safety constraints -> Actuation command returned to ESP32 -> Relay switches pump on/off -> Safety flow meter confirms water delivery.",
  algorithms: [
    "Gradient Boosted Trees (XGBoost, LightGBM)",
    "Ensemble Regression Modeling",
    "Failsafe State Machine Logic",
    "Moving Average Sensor Filtering"
  ],
  models: [
    "XGBoost Regressor",
    "LightGBM Regressor",
    "Random Forest Regressor"
  ],
  datasets: [
    "Extensive agricultural dataset of 100,000 records incorporating soil moisture, ambient temperature, relative humidity, crop stage, and ground water metrics"
  ],
  preprocessing: "Missing value imputation, outlier clipping on noisy sensor data, feature engineering (evapotranspiration proxies, temperature-humidity index), min-max feature scaling.",
  trainingDetails: "Trained across 100,000 records with k-fold cross validation and hyperparameter optimization; evaluated using R², RMSE, and MAE.",
  evaluationMetrics: [
    "R² Score (Coefficient of Determination)",
    "Root Mean Squared Error (RMSE)",
    "Mean Absolute Error (MAE)",
    "System Uptime & Failover Safety Execution"
  ],
  results: {
    r2Score: "0.99870 R² across 100,000 records",
    hardwareActuation: "Verified end-to-end telemetry and relay automation with ESP32 and Arduino",
    safetyMechanism: "Enforced rain-aware cutoffs and water flow confirmation to safeguard pump hardware"
  },
  individualContribution: "Engineered ML predictive regression pipeline on 100K records, achieved 0.99870 R², wrote ESP32 firmware in Arduino C++, implemented Flask backend API, and built safety cutoff state logic.",
  challenges: "Handling real-world sensor noise and ensuring that internet or API disconnects never cause an irrigation pump to remain stuck in an active state.",
  limitations: "Soil probe calibration varies across distinct soil textures (clay vs loam vs sandy); requires local recalibration.",
  futureImprovements: "LoRaWAN long-range telemetry for vast rural fields, solar power harvesting, and satellite evapotranspiration data integration.",
  completionStatus: "Completed system with public source code repository.",
  repositoryUrl: "https://github.com/Lawapaul/Smart-Irrigation-System",
  liveDemoUrl: null,
  relatedQuestions: [
    "What is the Smart Irrigation System (AquaField)?",
    "What results and metrics did the Smart Irrigation project achieve?",
    "How does Smart Irrigation combine IoT hardware with Machine Learning?",
    "Where is the source code for the Smart Irrigation System?"
  ]
};

