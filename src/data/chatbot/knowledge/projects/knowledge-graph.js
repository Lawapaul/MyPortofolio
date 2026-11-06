export const knowledgeGraphProject = {
  id: "knowledge-graph",
  name: "Knowledge Graph using Enhanced NLP (Knowledge Graph NLP Suite)",
  shortName: "Knowledge Graph NLP Suite",
  category: "NLP & Knowledge Engineering",
  overview: "An NLP benchmarking and knowledge graph extraction suite focused on explainable text classification, subject-predicate-object triple extraction, and interactive graph visualizations (achieving 98.88% classification accuracy on the BBC News dataset).",
  problemStatement: "Unstructured textual documents contain rich semantic relationships that remain inaccessible to relational databases. Extracting structured entities and interconnections while maintaining interpretability and multi-model performance benchmarks is difficult.",
  motivation: "Transform unstructured natural language text into structured, queryable semantic knowledge graphs, while rigorously comparing diverse NLP and Transformer architectures on standardized benchmarks.",
  objectives: "Benchmark traditional and modern NLP architectures across standard datasets, extract semantic entities and relation triples from raw prose, and visualize interconnected knowledge topologies.",
  technologies: [
    "Python",
    "Scikit-learn",
    "TensorFlow",
    "Transformers (Hugging Face)",
    "spaCy",
    "Neo4j",
    "NetworkX",
    "Matplotlib"
  ],
  architecture: "Multi-stage pipeline: 1) Text Ingestion & Parsing: Tokenization, POS tagging, and dependency parsing using spaCy. 2) Classification & Benchmarking: Text categorization evaluated across multiple algorithms (TF-IDF, Naive Bayes, SVM, Neural Networks, Transformers). 3) Triple Extraction Engine: Dependency tree traversal to extract (Subject, Relation, Object) facts. 4) Graph Construction Layer: Ingests triples into NetworkX and Neo4j graph databases with entity node labels and directed relationship edges. 5) Visualization Layer: Interactive network visualization highlighting semantic clusters and key topic hubs.",
  workflow: "Raw text corpus -> Dependency parsing and entity recognition (spaCy) -> Triple extraction -> Text classification benchmark (98.88% accuracy on BBC dataset) -> Graph database mapping (Neo4j / NetworkX) -> Visual knowledge graph rendering.",
  algorithms: [
    "Dependency Parsing Traversal",
    "Named Entity Recognition (NER)",
    "TF-IDF Vectorization",
    "Support Vector Classification",
    "Transformer Attention Attribution",
    "Graph Centrality & Community Detection"
  ],
  models: [
    "Transformer-based Text Classifiers",
    "spaCy Linguistic Pipelines",
    "SVM & Naive Bayes Baseline Classifiers"
  ],
  datasets: [
    "BBC News Classification Dataset (5 topical domains: business, entertainment, politics, sport, tech)",
    "Additional text corpora for semantic triple extraction"
  ],
  preprocessing: "Text normalization, lemmatization, stopword filtering, punctuation removal, named-entity masking.",
  trainingDetails: "Trained and benchmarked multiple classification models on BBC News splits using cross-validation; evaluated accuracy, precision, recall, and F1-score.",
  evaluationMetrics: [
    "Classification Accuracy (98.88% achieved on BBC dataset)",
    "Precision, Recall, F1-Score",
    "Triple Extraction Precision",
    "Graph Connectivity Metrics"
  ],
  results: {
    accuracy: "98.88% accuracy on the BBC News dataset",
    graphGeneration: "Source-aware knowledge graph extraction and interactive network visualization",
    benchmarks: "Comprehensive comparison across diverse classification architectures"
  },
  individualContribution: "Designed end-to-end benchmarking pipeline, achieved 98.88% accuracy on BBC dataset, implemented relation triple extraction logic, and integrated graph generation with Neo4j and NetworkX.",
  challenges: "Resolving coreference (e.g., pronouns referring to previously introduced entities) and handling complex sentence clauses during triple extraction.",
  limitations: "Domain-specific jargon requires custom NER fine-tuning to avoid incorrect entity boundary splitting.",
  futureImprovements: "Coupling knowledge graph reasoning with Graph Neural Networks (GNNs) and hybrid GraphRAG question-answering systems.",
  completionStatus: "Completed system with public source code repository.",
  repositoryUrl: "https://github.com/Lawapaul/Knowledge_Graph_using_enhanced_NLP",
  liveDemoUrl: null,
  relatedQuestions: [
    "Explain the Knowledge Graph NLP Suite.",
    "What accuracy did Harshit achieve on the BBC dataset?",
    "How does the Knowledge Graph project extract triples and build graphs?",
    "Where is the source code for the Knowledge Graph project?"
  ]
};

