export const triforgeProject = {
  id: "triforge",
  name: "TriForge — A Three-Stream Deep Learning Framework for Image Forgery Detection and Localization",
  shortName: "TriForge",
  category: "Computer Vision & Digital Forensics",
  overview: "TriForge is a deep-learning-based image forensics framework designed to detect manipulated images (copy-move, splicing) and localize forged regions. It integrates spatial (RGB), frequency-domain (FFT), and edge-boundary (differentiable Canny) feature representations through a multi-stream fusion mechanism.",
  problemStatement: "Digital images are easily manipulated using sophisticated editing operations such as copy-move forgery and image splicing. Identifying these manipulations is difficult because forged regions frequently share visual, illumination, and contextual consistency with authentic content, fooling conventional single-domain RGB classifiers.",
  motivation: "Investigate digital image forensics beyond conventional RGB-only analysis by leveraging complementary frequency-domain artifacts (revealed by Fast Fourier Transform) and subtle boundary discontinuities (revealed by edge-boundary analysis), fusing multi-modal forensic cues into a unified deep learning network.",
  objectives: "Develop a multi-stream deep learning architecture combining three parallel feature streams (spatial RGB, frequency-domain FFT, and differentiable Canny edge boundaries), fuse them effectively, and achieve high detection accuracy while localizing tampered regions.",
  technologies: [
    "Python",
    "Deep Learning Frameworks (PyTorch / TensorFlow)",
    "CNN Feature Extraction Backbones",
    "Fast Fourier Transform (FFT)",
    "Differentiable Canny Edge Operator",
    "OpenCV",
    "Albumentations",
    "Computer Vision & Forensic Analytics"
  ],
  architecture: "TriForge follows a modular three-stream parallel architecture: 1) Spatial Stream: Processes RGB images to capture spatial semantic patterns and visual textures. 2) Frequency Stream: Applies 2D Fast Fourier Transform (FFT) to convert spatial patterns into frequency spectrum representations, exposing high-frequency splicing artifacts and frequency inconsistencies. 3) Edge Stream: Uses a differentiable Canny operator to capture boundary gradients, edge discontinuities, and mask transitions indicative of manipulation. 4) Feature Fusion Layer: Combines intermediate feature maps from all three pathways into a joint representation. 5) Prediction Head: Outputs both a binary classification (authentic vs forged) and pixel-level localization of tampered regions.",
  workflow: "Input image -> Simultaneous feed into 3 parallel streams: Spatial (RGB feature extraction), Frequency (FFT frequency decomposition), and Edge (differentiable Canny boundary extraction) -> Multi-scale feature extraction across backbones -> Feature Fusion Network -> Joint classification and localization heads -> Binary forgery prediction + pixel localization heatmap.",
  algorithms: [
    "Convolutional Feature Extraction",
    "Fast Fourier Transform (FFT)",
    "Differentiable Canny Edge Detection",
    "Multi-Modal Feature Fusion",
    "Pixel-level Localization Masking"
  ],
  models: [
    "Multi-stream Convolutional Neural Network",
    "Spatial CNN Backbone",
    "Frequency-Domain Spectral Backbone",
    "Edge-Gradient Boundary Backbone"
  ],
  datasets: [
    "CASIA v2 (Primary Training & Benchmark: 2,523 samples)",
    "4CAM / Columbia Uncompressed (363 samples)",
    "CASIA v1 (1,721 samples)",
    "COVERAGE (200 samples)"
  ],
  preprocessing: "RGB image normalization, 2D Fast Fourier Transform (FFT) frequency-domain mapping and magnitude spectrum calculation, and edge gradient extraction via a differentiable Canny edge operator.",
  trainingDetails: "Trained and benchmarked on CASIA v2; evaluated in zero-shot cross-dataset transfer tests against 4CAM, CASIA v1, and COVERAGE to evaluate real-world generalization across disparate forgery techniques and compression standards.",
  evaluationMetrics: [
    "Accuracy",
    "Precision",
    "Recall",
    "F1-Score",
    "ROC-AUC (Receiver Operating Characteristic - Area Under Curve)",
    "MCC (Matthews Correlation Coefficient)"
  ],
  results: {
    casiaV2: {
      samples: "2,523",
      accuracy: "97.0%",
      precision: "94.7%",
      recall: "98.0%",
      f1Score: "96.3%",
      notes: "Exceptional performance on in-distribution benchmark dataset."
    },
    columbia4CAM: {
      samples: "363",
      accuracy: "87.1%",
      precision: "82.8%",
      recall: "93.3%",
      f1Score: "87.7%",
      rocAuc: "0.938",
      mcc: "0.747",
      notes: "High cross-dataset transfer on uncompressed imagery."
    },
    casiaV1: {
      samples: "1,721",
      accuracy: "64.7%",
      precision: "98.8%",
      recall: "34.5%",
      f1Score: "51.2%",
      rocAuc: "0.692",
      mcc: "0.435",
      notes: "Demonstrates high precision with recall degradation due to distribution shift."
    },
    coverage: {
      samples: "200",
      accuracy: "53.0%",
      precision: "53.7%",
      recall: "44.0%",
      f1Score: "48.4%",
      rocAuc: "0.593",
      mcc: "0.061",
      notes: "Challenging copy-move dataset illustrating cross-dataset generalization limitations."
    }
  },
  individualContribution: "Framework design and conceptualization, multi-stream feature pipeline development (spatial, FFT, differentiable Canny), deep learning model implementation, cross-dataset evaluation protocol design across four benchmarks, metric computation, failure mode analysis, and research documentation.",
  challenges: "Cross-dataset generalization: Models performing near-perfectly on CASIA v2 (97% accuracy) degraded significantly on COVERAGE (53% accuracy) and CASIA v1 (64.7%) due to stark differences in compression artifacts, manipulation algorithms, and image sensor profiles.",
  limitations: "Generalization drops on unseen manipulation distributions and highly compressed images; exact backbone/fusion parameterization remains subject to continued tuning.",
  futureImprovements: "Adversarial domain generalization, attention-gated adaptive stream weighting, stronger pixel-wise localization decoder architectures, and evaluation on generative AI / diffusion-based synthetic manipulation benchmarks.",
  completionStatus: "Completed implementation and evaluated across four independent forensic benchmark datasets.",
  repositoryUrl: "https://github.com/Lawapaul/TRIFORGE-AUTOMATED-IMAGE-FORGERY-DETECTION-AND-LOCALIZATION-",
  liveDemoUrl: null,
  personalSignificance: "Explicitly designated by Harshit as the project that BEST REPRESENTS his advanced deep learning and computer vision capabilities, and one of his two most technically challenging projects.",
  relatedQuestions: [
    "Explain TriForge's architecture.",
    "What datasets were used to evaluate TriForge?",
    "What results did TriForge achieve across benchmarks?",
    "What are TriForge's limitations and challenges?",
    "Why did Harshit use Fast Fourier Transform and Canny edge detection in TriForge?",
    "How does TriForge compare with other projects?"
  ]
};

