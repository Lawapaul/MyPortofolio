export const workingStyleProfile = {
  id: "working-style",
  title: "Engineering Philosophy and Working Style",
  coreMotto: "Understand deeply. Build thoughtfully. Improve continuously.",
  principles: [
    "First-principles understanding before implementation: study mathematical fundamentals and architectural mechanics rather than using black-box libraries blindly.",
    "Systematic, hypothesis-driven debugging: reproduce under controlled conditions -> isolate failing subsystem -> inspect intermediate states/tensors/logs -> test individual hypotheses -> implement clean root-cause fix -> verify non-regression.",
    "Evidence-based model selection: choose architectures based on empirical accuracy, compute footprint, scalability, interpretability, and specific problem constraints rather than hype or popularity.",
    "Modular, readable code with purposeful documentation: code must be maintainable, explaining why architectural trade-offs were made.",
    "Iterative improvement and robust evaluation: achieving strong performance on a single dataset does not guarantee real-world generalization; cross-dataset evaluation and failure-mode analysis are essential."
  ],
  questionsAndAnswers: [
    {
      question: "How do you approach a problem you have never encountered before?",
      answer: "I start by understanding the problem, its requirements, and the expected outcome. I then break it into smaller components, research relevant concepts, explore possible approaches, and implement an initial solution. After implementation, I test the solution, analyze its limitations, and improve it iteratively. I believe that unfamiliar problems are opportunities to learn something new."
    },
    {
      question: "Do you prefer understanding fundamentals before implementing a solution?",
      answer: "Yes. I prefer understanding the underlying concepts before implementing a solution. For example, when working with a deep learning architecture, I try to understand its underlying mathematical principles, architecture, advantages, and limitations rather than simply importing a pretrained model and using it. Strong fundamentals help engineers make better technical decisions."
    },
    {
      question: "How do you decide which technology or model to use?",
      answer: "I first understand the problem, the available data, performance requirements, and practical constraints. Then I compare different technologies or model architectures based on accuracy and reliability, computational requirements, scalability, implementation complexity, interpretability, and suitability for the specific problem. I prefer experimentation and evidence-based decisions over choosing technologies simply because they are popular."
    },
    {
      question: "How do you debug complex technical problems?",
      answer: "I approach debugging systematically. First, I reproduce the issue and understand the conditions under which it occurs. Then I isolate the problematic component, inspect logs and intermediate outputs, and test possible causes individually. Once I identify the root cause, I implement a fix and verify that it does not introduce additional problems. I also believe in documenting important debugging findings so that similar issues can be avoided in the future."
    },
    {
      question: "How important is code quality and documentation to you?",
      answer: "Code quality and documentation are essential because a working implementation is not necessarily a maintainable solution. I prefer writing modular, readable, and reusable code. I also believe documentation should explain important architectural decisions, implementation details, dependencies, and usage instructions. Good documentation makes collaboration and future improvements much easier."
    },
    {
      question: "Do you prefer working independently or collaborating with a team?",
      answer: "I am comfortable with both. I enjoy independent problem-solving because it allows me to explore ideas deeply and take ownership of implementation. At the same time, I value teamwork because different perspectives can lead to better solutions. My experience as General Secretary of the Mharo Rajasthan Club at VIT Chennai has also helped me develop coordination, communication, and organizational skills."
    },
    {
      question: "How do you learn a new technology?",
      answer: "I generally follow a practical learning approach: 1) Understand the fundamentals. 2) Explore official documentation and learning resources. 3) Study practical implementations. 4) Build a small working project. 5) Experiment with different approaches. 6) Apply the technology to a larger problem. Hands-on experimentation helps me understand both capabilities and limitations."
    },
    {
      question: "What do you think makes a good software or AI engineer?",
      answer: "A good engineer should have strong fundamentals, analytical thinking, curiosity, and the ability to solve unfamiliar problems. In AI engineering, understanding data, model behavior, evaluation, reliability, and deployment is just as important as knowing how to implement an architecture. Good engineers must also communicate effectively, collaborate with others, and continuously improve their skills."
    },
    {
      question: "What is one engineering lesson you learned from your projects?",
      answer: "One important lesson I've learned is that achieving good performance on a single dataset does not necessarily mean that a model is reliable in real-world conditions. Working on projects involving image forgery detection (TriForge) and intrusion detection (AI Agentic IDS) helped me understand the importance of cross-dataset validation, evaluation metrics, explainability, and identifying model limitations. A technically impressive model is only part of a successful engineering solution."
    },
    {
      question: "What motivates you to keep learning?",
      answer: "Technology evolves continuously, especially in artificial intelligence. New architectures, tools, and research developments constantly introduce new possibilities. I enjoy the process of understanding something unfamiliar, experimenting with it, and eventually using it to build something meaningful. The opportunity to solve increasingly challenging problems is what motivates me to keep learning."
    }
  ],
  keywords: ["working style", "philosophy", "engineering philosophy", "approach", "debugging", "debug", "team", "independent", "documentation", "code quality", "lessons learned", "fundamentals", "model selection"]
};

