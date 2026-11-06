import { aboutProfile } from "./profile/about.js";
import { educationProfile } from "./profile/education.js";
import { careerProfile } from "./profile/career.js";
import { personalProfile } from "./profile/personal.js";
import { workingStyleProfile } from "./profile/working-style.js";

import { programmingLanguagesSkill } from "./technical/programming-languages.js";
import { machineLearningSkill } from "./technical/machine-learning.js";
import { deepLearningSkill } from "./technical/deep-learning.js";
import { computerVisionSkill } from "./technical/computer-vision.js";
import { nlpSkill } from "./technical/nlp.js";
import { explainableAiSkill } from "./technical/explainable-ai.js";
import { reinforcementLearningSkill } from "./technical/reinforcement-learning.js";
import { frameworksAndToolsSkill } from "./technical/frameworks-and-tools.js";

import { allProjects, projectsById } from "./projects/index.js";

import { competitiveProgrammingAchievement } from "./achievements/competitive-programming.js";
import { certificationsAchievement } from "./achievements/certifications.js";
import { academicAchievements } from "./achievements/academic-achievements.js";

import { professionalProfilesContact } from "./contact/professional-profiles.js";
import { portfolioFaqs } from "./faqs/faqs.js";
import { projectEvaluationFramework, getComparativeEvaluation } from "./reasoning/project-evaluator.js";

export const knowledgeRegistry = {
  profile: {
    about: aboutProfile,
    education: educationProfile,
    career: careerProfile,
    personal: personalProfile,
    workingStyle: workingStyleProfile
  },
  technical: {
    programmingLanguages: programmingLanguagesSkill,
    machineLearning: machineLearningSkill,
    deepLearning: deepLearningSkill,
    computerVision: computerVisionSkill,
    nlp: nlpSkill,
    explainableAi: explainableAiSkill,
    reinforcementLearning: reinforcementLearningSkill,
    frameworksAndTools: frameworksAndToolsSkill
  },
  projects: projectsById,
  allProjects,
  achievements: {
    competitiveProgramming: competitiveProgrammingAchievement,
    certifications: certificationsAchievement,
    academicAchievements: academicAchievements
  },
  contact: professionalProfilesContact,
  faqs: portfolioFaqs,
  evaluation: projectEvaluationFramework
};

export {
  aboutProfile,
  educationProfile,
  careerProfile,
  personalProfile,
  workingStyleProfile,
  programmingLanguagesSkill,
  machineLearningSkill,
  deepLearningSkill,
  computerVisionSkill,
  nlpSkill,
  explainableAiSkill,
  reinforcementLearningSkill,
  frameworksAndToolsSkill,
  allProjects,
  projectsById,
  competitiveProgrammingAchievement,
  certificationsAchievement,
  academicAchievements,
  professionalProfilesContact,
  portfolioFaqs,
  projectEvaluationFramework,
  getComparativeEvaluation
};

