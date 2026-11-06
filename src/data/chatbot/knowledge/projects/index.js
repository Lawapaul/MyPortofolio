import { triforgeProject } from "./triforge.js";
import { aiAgenticIdsProject } from "./ai-agentic-ids.js";
import { plantDiseasePredictionProject } from "./plant-disease-prediction.js";
import { parkvisionProject } from "./parkvision.js";
import { smartIrrigationProject } from "./smart-irrigation.js";
import { securesignProject } from "./securesign.js";
import { knowledgeGraphProject } from "./knowledge-graph.js";
import { padharoogoProject } from "./padharoo-go.js";
import { netraProject } from "./netra.js";
import { portfolioProject } from "./portfolio.js";

export const allProjects = [
  triforgeProject,
  aiAgenticIdsProject,
  plantDiseasePredictionProject,
  parkvisionProject,
  smartIrrigationProject,
  securesignProject,
  knowledgeGraphProject,
  padharoogoProject,
  netraProject,
  portfolioProject
];

export const projectsById = {
  [triforgeProject.id]: triforgeProject,
  [aiAgenticIdsProject.id]: aiAgenticIdsProject,
  [plantDiseasePredictionProject.id]: plantDiseasePredictionProject,
  [parkvisionProject.id]: parkvisionProject,
  [smartIrrigationProject.id]: smartIrrigationProject,
  [securesignProject.id]: securesignProject,
  [knowledgeGraphProject.id]: knowledgeGraphProject,
  [padharoogoProject.id]: padharoogoProject,
  [netraProject.id]: netraProject,
  [portfolioProject.id]: portfolioProject
};

export {
  triforgeProject,
  aiAgenticIdsProject,
  plantDiseasePredictionProject,
  parkvisionProject,
  smartIrrigationProject,
  securesignProject,
  knowledgeGraphProject,
  padharoogoProject,
  netraProject,
  portfolioProject
};

