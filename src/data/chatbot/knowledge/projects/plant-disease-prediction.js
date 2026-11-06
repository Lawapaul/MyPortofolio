export const plantDiseasePredictionProject = {
  id: "plant-disease-prediction",
  name: "Explainable Plant Disease Detection Using Deep Learning",
  shortName: "Explainable Plant Disease",
  category: "Computer Vision, AgriTech & Explainable AI",
  overview: "A deep-learning diagnostic system for agricultural health that classifies apple leaf conditions across 7,771 images from the PlantVillage dataset, combining vision models with Explainable AI, Retrieval-Augmented Generation (RAG), and a human-in-the-loop feedback loop.",
  problemStatement: "Crop diseases devastate agricultural yields when detected late. Automated vision systems can identify diseases, but farmers and agronomists hesitate to trust black-box predictions without visual evidence, domain-specific agronomic advice, or an ability to correct false diagnoses.",
  motivation: "Bridge the gap between computer vision research and real-world farm deployment by integrating deep learning classification with interpretable explanations, agronomic knowledge retrieval via RAG, and an active human-in-the-loop correction mechanism.",
  objectives: "Classify four distinct apple leaf categories (Healthy, Scab, Black Rot, Cedar Apple Rust), provide saliency explanations of diseased leaf regions, retrieve tailored remediation insights using RAG and LLMs, and allow agronomists to submit corrections to improve system reliability.",
  technologies: [
    "Python",
    "TensorFlow / Keras",
    "Deep Learning",
    "Explainable AI (Saliency & Attribution Maps)",
    "Retrieval-Augmented Generation (RAG)",
    "Large Language Models (LLMs)",
    "Human-in-the-Loop Feedback Architecture",
    "OpenCV",
    "NumPy"
  ],
  architecture: "Three-tier architecture: 1) Vision Classification Pipeline: Deep convolutional network trained on curated PlantVillage imagery. 2) Explainability & Visual Attribution Layer: Generates visual explanations highlighting specific lesion boundaries and discoloration areas. 3) RAG Knowledge & Agronomic Advice Engine: Queries an indexed agricultural knowledge base based on the diagnosed class and symptoms, prompting an LLM to generate actionable treatment recommendations. 4) Human-in-the-loop Correction Store: Captures user feedback and agronomist corrections into a persistent memory store for active refinement.",
  workflow: "Leaf image input -> Preprocessing & augmentation -> Deep convolutional classification (Healthy, Scab, Black Rot, Cedar Apple Rust) -> Explainability heatmap extraction -> RAG contextual lookup for pathogen biology and mitigation strategies -> LLM agronomic advice synthesis -> Agronomist review & feedback logging.",
  algorithms: [
    "Convolutional Neural Network feature extraction",
    "Visual Attribution / Saliency Mapping",
    "Vector similarity retrieval (RAG)",
    "Context-grounded prompt synthesis",
    "Active learning feedback scoring"
  ],
  models: [
    "Deep Convolutional Neural Network (CNN / Pretrained Transfer Backbone)",
    "RAG-coupled LLM Assistant"
  ],
  datasets: [
    "PlantVillage Dataset (7,771 curated apple leaf images across 4 classes: Apple Healthy, Apple Scab, Apple Black Rot, Cedar Apple Rust)"
  ],
  preprocessing: "Image resizing, RGB normalization, data augmentation (rotation, zoom, horizontal flip, brightness variance) to simulate varied outdoor lighting conditions in orchard environments.",
  trainingDetails: "Trained on the 7,771 PlantVillage apple leaf subset with categorical cross-entropy loss and Adam optimizer; evaluated for multi-class classification accuracy.",
  evaluationMetrics: [
    "Accuracy",
    "Precision",
    "Recall",
    "F1-Score",
    "Confusion Matrix",
    "Explanation Fidelity"
  ],
  results: {
    datasetSize: "7,771 images from PlantVillage",
    classesCovered: ["Healthy", "Scab", "Black Rot", "Cedar Apple Rust"],
    pipelineFeatures: "Successful integration of deep learning classification with XAI attributions, RAG agronomic context retrieval, and human feedback memory"
  },
  individualContribution: "Complete pipeline implementation: dataset curation and preprocessing of 7,771 images, model training, explainability integration, RAG retrieval mechanism design, LLM prompt engineering, and human-in-the-loop feedback store.",
  challenges: "Differentiating between visually similar necrotic leaf lesions (such as early-stage Black Rot vs severe Scab) and preventing LLM hallucination during treatment recommendation generation.",
  limitations: "Trained predominantly on studio-captured PlantVillage conditions; field-level backgrounds (soil, weeds, variable shadows) require further domain adaptation.",
  futureImprovements: "Expanding to multi-crop disease categories, on-device mobile quantization (TensorFlow Lite), and multispectral imagery analysis.",
  completionStatus: "Completed with verified GitHub repository.",
  repositoryUrl: "https://github.com/Lawapaul/Explainable_Plant_Disease_Prediction",
  liveDemoUrl: null,
  relatedQuestions: [
    "Explain Harshit's Plant Disease Prediction project.",
    "Which dataset and categories were used in the Plant Disease project?",
    "How does the Plant Disease project use RAG and Explainable AI?",
    "Where is the source code for the Plant Disease project?"
  ]
};

