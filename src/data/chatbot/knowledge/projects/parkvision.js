export const parkvisionProject = {
  id: "parkvision",
  name: "ParkVision – Parking Guidance & Number Plate Recognition System",
  shortName: "ParkVision",
  category: "Computer Vision & Smart Cities",
  overview: "A real-time smart parking operations platform that tracks occupancy across 396 parking slots, recognizes vehicle license plates using an automated pipeline (YOLOv8 + EasyOCR), and recommends optimal available parking slots through a live interactive dashboard.",
  problemStatement: "Urban parking facilities suffer from inefficient spot utilization, high driver transit latency searching for empty bays, lack of automated entry/exit auditing, and manual gate bottlenecks.",
  motivation: "Automate end-to-end commercial parking workflows using modern computer vision, providing both facilities managers and drivers with real-time visibility, automated vehicle tracking, and intelligent guidance.",
  objectives: "Continuously monitor occupancy across 396 defined parking bays, automatically detect vehicle plates via ANPR on arrival/departure, log audit timestamps in a relational database, and serve guidance updates via a responsive dashboard.",
  technologies: [
    "Python",
    "OpenCV",
    "YOLOv8 (Ultralytics)",
    "EasyOCR",
    "FastAPI",
    "SQLite",
    "SQLAlchemy ORM",
    "React",
    "REST APIs"
  ],
  architecture: "Full-stack edge-to-web architecture: 1) Video Processing Layer: Ingests camera feeds, defines region-of-interest (ROI) bounding polygons for 396 parking bays, and runs frame-by-frame occupancy detection. 2) ANPR Pipeline: Employs YOLOv8 object detection to locate license plate boundaries, followed by EasyOCR character recognition and alphanumeric normalization. 3) Backend Service: FastAPI application utilizing SQLAlchemy ORM and SQLite to manage slot states, vehicle logs, entry/exit events, and slot allocation logic. 4) Client Dashboard: Live React application visualizing parking map state, slot availability percentage, and vehicle entry logs.",
  workflow: "CCTV/Camera feed -> Bay ROI masking -> Occupancy classification (vacant/occupied) -> Vehicle entry detection -> YOLOv8 plate localization -> EasyOCR character extraction -> Database transaction -> Optimal slot recommendation -> Real-time React dashboard update.",
  algorithms: [
    "YOLOv8 Object Detection",
    "Optical Character Recognition (EasyOCR)",
    "Contour and Polygon Intersection Masking",
    "Greedy Nearest-Available Slot Allocation"
  ],
  models: [
    "YOLOv8 (You Only Look Once v8) Deep Detector",
    "EasyOCR Deep Text Recognizer"
  ],
  datasets: [
    "Real-world parking video streams, bay polygon coordinates mapping 396 physical slots, license plate image crops"
  ],
  preprocessing: "Perspective transformation of camera viewpoints, Gaussian filtering, morphological operations on plate regions, contrast enhancement for OCR readability.",
  trainingDetails: "Utilized pretrained and fine-tuned YOLOv8 weights for vehicle and license plate bounding-box prediction.",
  evaluationMetrics: [
    "Slot Occupancy Accuracy across 396 monitored bays",
    "ANPR Plate Detection Precision and Character Error Rate",
    "End-to-End Processing FPS (Frames Per Second)"
  ],
  results: {
    monitoredBays: "396 parking slots tracked in real time",
    anprPipeline: "YOLOv8 plate detection coupled with EasyOCR automated character extraction",
    fullStackIntegration: "FastAPI REST API connected to SQLite database and live React dashboard"
  },
  individualContribution: "Designed computer vision bay tracking pipeline for 396 slots, built ANPR module integrating YOLOv8 and EasyOCR, engineered FastAPI backend with SQLite/SQLAlchemy, and connected live React interface.",
  challenges: "Managing occlusion from passing vehicles, dealing with nighttime/glare lighting on reflective plates, and maintaining real-time video processing throughput.",
  limitations: "OCR performance degrades on non-standard, weathered, or severely skewed plates.",
  futureImprovements: "Multi-camera fusion, edge deployment on NVIDIA Jetson, dynamic surge pricing algorithms, and mobile driver navigation app.",
  completionStatus: "Completed system with public source code repository.",
  repositoryUrl: "https://github.com/Lawapaul/Smart-Parking-Guidance-and-Number-Plate-Recognition-System",
  liveDemoUrl: null,
  relatedQuestions: [
    "Explain ParkVision and how it works.",
    "How many parking slots does ParkVision monitor?",
    "What models are used in ParkVision for number plate recognition?",
    "Where is ParkVision's GitHub repository?"
  ]
};

