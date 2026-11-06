export const aiAgenticIdsProject = {
  id: "ai-agentic-ids",
  name: "AI Agentic IDS — Explainable Multi-Agent Intrusion Detection and Response Pipeline",
  shortName: "AI Agentic IDS",
  category: "Cybersecurity & Explainable AI",
  overview: "A production-grade, full-stack network intrusion detection platform built on the benchmark CICIDS2017 dataset. It integrates multi-architecture deep learning models with explainable AI (SHAP, LIME), graph analytics, memory retrieval, and human-in-the-loop reinforcement learning retraining workflows.",
  problemStatement: "Modern cyber threats evolve rapidly and exhibit complex non-linear attack vectors. Traditional intrusion detection systems rely on static signatures or opaque black-box neural networks that fail to explain why a packet flow was flagged, preventing security analysts from verifying and responding to alerts confidently.",
  motivation: "Create an intrusion detection architecture that not only achieves state-of-the-art detection accuracy on large-scale network traffic, but provides transparent, interpretable explanations and intelligent agentic response mechanisms.",
  objectives: "Develop high-accuracy deep learning intrusion classifiers, incorporate explainable AI (SHAP, LIME) to identify influential network features, model host-to-host interactions via graph analytics, and implement human-in-the-loop feedback for adaptive model retraining.",
  technologies: [
    "Python",
    "TensorFlow",
    "PyTorch",
    "Scikit-learn",
    "FastAPI",
    "SQLite",
    "Hugging Face",
    "NetworkX",
    "SHAP",
    "LIME",
    "Graph Analytics"
  ],
  architecture: "Multi-tier agentic architecture: 1) Ingestion & Preprocessing Engine: Ingests raw network PCAP/flow data from CICIDS2017, normalizes 80+ network features, and handles class imbalance. 2) Deep Learning Inference Engine: Evaluates flows using an ensemble of deep learning backbones (CNN, LSTM, GRU, ResNet, and Hybrid CNN-LSTM). 3) Explainability Layer: Uses SHAP and LIME to generate local attribution scores and feature importance heatmaps for flagged flows. 4) Graph Analytics Engine: Uses NetworkX to construct attack propagation graphs and identify lateral movement between IP nodes. 5) Agentic Response & HITL Loop: LLM-guided threat mitigation recommendations combined with human analyst feedback that feeds a reinforcement learning retraining loop.",
  workflow: "Network traffic stream -> Feature extraction (CICIDS2017 features) -> Deep learning classification (ResNet / Hybrid) -> Anomaly detection -> SHAP/LIME explanation extraction -> Threat graph topology generation -> Analyst dashboard & LLM mitigation briefing -> Human feedback capture -> Reinforcement learning adaptive update.",
  algorithms: [
    "Deep Residual Learning (ResNet)",
    "Long Short-Term Memory (LSTM) Sequence Modeling",
    "Gated Recurrent Units (GRU)",
    "Hybrid CNN-LSTM Temporal-Spatial Extraction",
    "SHAP Attribution Values",
    "LIME Local Surrogates",
    "Graph Topology & Centrality Metrics (NetworkX)",
    "Human-in-the-loop RL Fine-Tuning"
  ],
  models: [
    "ResNet (Deep Residual Network)",
    "CNN (Convolutional Neural Network)",
    "LSTM (Long Short-Term Memory)",
    "GRU (Gated Recurrent Unit)",
    "Hybrid CNN-LSTM",
    "Transformer variants"
  ],
  datasets: [
    "CICIDS2017 (Canadian Institute for Cybersecurity Intrusion Detection Evaluation Dataset — large-scale realistic network traffic including DoS, DDoS, PortScan, Infiltration, Web Attacks, and Botnet)"
  ],
  preprocessing: "Packet flow feature scaling, categorical encoding, handling extreme class imbalance between benign flows and rare attack classes, removal of infinite and NaN values, statistical feature selection.",
  trainingDetails: "Trained across multiple deep learning architectures on CICIDS2017 traffic splits; evaluated for multi-class attack categorization and binary intrusion detection with hyperparameter optimization.",
  evaluationMetrics: [
    "Accuracy (98.40% reported for ResNet)",
    "Precision",
    "Recall",
    "F1-Score",
    "False Positive Rate (FPR)",
    "Latency per flow"
  ],
  results: {
    accuracy: "98.40% IDS accuracy with ResNet",
    benchmarkDataset: "CICIDS2017",
    explainability: "LIME and SHAP feature attribution successfully identified key network flow signatures driving malicious classifications",
    graphIntegration: "NetworkX successfully modeled host communication topologies and lateral threat spread"
  },
  individualContribution: "Architecture design, deep learning model implementation and benchmarking across 6+ architectures, integration of SHAP/LIME explainability pipelines, FastAPI backend development, graph modeling with NetworkX, and human-in-the-loop feedback mechanisms.",
  challenges: "Managing massive multi-million flow data volume in CICIDS2017, handling severe class imbalance for stealthy attack vectors, and keeping real-time explainability computation latency sufficiently low for live alerting.",
  limitations: "Real-time SHAP computation is computationally expensive for high-throughput 10Gbps+ network pipelines without approximation methods.",
  futureImprovements: "Lightweight surrogate explainability distillation, automated zero-day heuristic discovery, and distributed stream processing with Apache Kafka.",
  completionStatus: "Completed platform with public source repository.",
  repositoryUrl: "https://github.com/Lawapaul/AI_Agentic_DL",
  liveDemoUrl: null,
  personalSignificance: "Explicitly identified by Harshit alongside TriForge as his two most technically challenging projects, demonstrating large-scale systems engineering, deep learning, cybersecurity, and explainable AI.",
  relatedQuestions: [
    "Explain the architecture of AI Agentic IDS.",
    "What makes AI Agentic IDS technically challenging?",
    "What models and datasets were used in AI Agentic IDS?",
    "What evaluation results did AI Agentic IDS achieve?",
    "How does AI Agentic IDS use explainable AI and graph analytics?",
    "Compare AI Agentic IDS and TriForge."
  ]
};

