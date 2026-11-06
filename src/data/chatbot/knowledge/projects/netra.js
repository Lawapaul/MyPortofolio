export const netraProject = {
  id: "netra",
  name: "Netra — Real-Time Sonar Mapping System Using Arduino",
  shortName: "Netra (Sonar Mapping)",
  category: "Embedded Systems & Hardware-Software Co-Design",
  overview: "A sonar-style obstacle mapping and spatial perception system combining an Arduino Uno microcontroller, an HC-SR04 ultrasonic sensor mounted on a 180-degree scanning servo motor, and a real-time radar-style visual dashboard rendered via Processing 3.",
  problemStatement: "Robotic navigation and situational monitoring in low-visibility or cost-constrained environments require low-latency, real-time spatial obstacle detection without expensive LiDAR hardware.",
  motivation: "Explore hardware-software co-design, microcontrollers, real-time signal timing, serial data streaming, and live 2D polar spatial mapping.",
  objectives: "Continuously scan a 180-degree physical field of view, calculate obstacle distance through ultrasonic time-of-flight measurements, stream angle-distance tuples across a serial interface, and render an interactive radar display.",
  technologies: [
    "Arduino Uno",
    "Embedded C / C++",
    "HC-SR04 Ultrasonic Sensor",
    "Servo Motor (180° Sweep)",
    "Processing 3 (Radar Visualization GUI)",
    "UART Serial Communication"
  ],
  architecture: "Two-stage embedded system: 1) Hardware Perception & Acquisition: Arduino Uno triggers 10µs ultrasonic pulses via the HC-SR04 transmitter, measures time-of-flight return echo, calculates centimeter distance, steps the servo motor from 15° to 165° and back, and formats angle-distance pairs into serial packets. 2) Software Visualization Layer: Processing 3 script running on a host computer reads the incoming serial data stream and renders an animated radar sweep with dynamic distance rings, angle rays, and red obstacle blips indicating detected barriers.",
  workflow: "Servo rotates to angle θ -> HC-SR04 sends ultrasonic pulse -> Echo received & time measured -> Distance calculated in Embedded C -> Serial packet `(angle, distance)` transmitted over USB COM -> Processing 3 plots polar coordinates on radar screen.",
  algorithms: [
    "Speed-of-sound time-of-flight calculation",
    "Polar to Cartesian Coordinate Transformation (x = r * cos θ, y = r * sin θ)",
    "Servo Sweep Step Timing Control",
    "Serial Packet Delimitation"
  ],
  models: [],
  datasets: [],
  preprocessing: "Debouncing and filtering anomalous out-of-range sensor readings.",
  trainingDetails: "Not applicable (Embedded hardware system).",
  evaluationMetrics: [
    "Distance Measurement Accuracy (within ±1-2 cm at under 2 meters)",
    "Sweep Refresh Latency",
    "Angular Resolution (degree step precision)"
  ],
  results: {
    sweepCoverage: "Real-time 180-degree obstacle detection and spatial mapping",
    hardwareIntegration: "Seamless coordination between Arduino, HC-SR04 sensor, and servo motor",
    visualization: "Smooth radar sweep interface in Processing 3 indicating live obstacle boundaries"
  },
  individualContribution: "Assembled hardware circuit, wrote embedded firmware for Arduino Uno, implemented timing and serial protocol, and created the live radar GUI application in Processing 3.",
  challenges: "Managing ultrasonic reflection artifacts on angled surfaces and ensuring non-blocking servo movement to avoid serial transmission stutter.",
  limitations: "Ultrasonic beam spread angle creates lower lateral angular resolution compared to laser LiDAR; range limited to ~3-4 meters.",
  futureImprovements: "Upgrading to a 360-degree continuous rotation servo with ToF (Time-of-Flight) laser sensors, wireless telemetry via ESP32, and ROS2 integration for mobile robot navigation.",
  completionStatus: "Completed embedded system with public source code repository.",
  repositoryUrl: "https://github.com/Lawapaul/Netra---Sonar-Mapping-System",
  liveDemoUrl: null,
  relatedQuestions: [
    "What is Netra?",
    "How does Netra use Arduino and ultrasonic sensors?",
    "What visualization was created for Netra?",
    "Where is the Netra repository?"
  ]
};

