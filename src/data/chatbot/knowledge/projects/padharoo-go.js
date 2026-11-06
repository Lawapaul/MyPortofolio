export const padharoogoProject = {
  id: "padharoo-go",
  name: "PadharooGo — Full-Stack Travel and Stay Platform",
  shortName: "PadharooGo",
  category: "Full-Stack Web Engineering",
  overview: "A production-grade, end-to-end accommodation and travel stays booking platform inspired by Airbnb, built with MVC architecture, user authentication, interactive Mapbox geospatial discovery, Cloudinary media storage, and full CRUD workflows.",
  problemStatement: "Travelers seeking homestays and vacation rentals need seamless property exploration, geospatial map visualization, dynamic pricing insights, user reviews, and secure listing management.",
  motivation: "Master full-stack engineering fundamentals: Model-View-Controller (MVC) pattern, server-side rendering, secure session authentication, cloud media storage, and third-party geospatial API integration.",
  objectives: "Develop an end-to-end web application with authenticated property listing creation, image upload, interactive location mapping, review submission, authorization guards, and responsive user design.",
  technologies: [
    "Node.js",
    "Express.js",
    "MongoDB",
    "Mongoose ODM",
    "EJS (Embedded JavaScript Templating)",
    "Passport.js (Authentication)",
    "Cloudinary API (Cloud Media Storage)",
    "Mapbox GL JS (Geospatial Mapping)",
    "Bootstrap 5",
    "RESTful Routing"
  ],
  architecture: "MVC (Model-View-Controller) architecture: 1) Client View Layer: Responsive EJS templates with Bootstrap and interactive Mapbox JavaScript mapping. 2) Controller Layer: Express.js REST route handlers implementing business logic, authorization middleware, and session management. 3) Authentication Layer: Passport.js local strategy with salted password hashing and persistent cookies. 4) Cloud Storage Layer: Multer and Cloudinary integration for secure image uploads and URL hosting. 5) Persistence Model: MongoDB with Mongoose schemas modeling Users, Listings, and Reviews with relational references.",
  workflow: "User registers/logs in (Passport.js) -> Browses listings with interactive Mapbox coordinates -> Creates or edits listing with image upload (Multer -> Cloudinary) -> Submits reviews and ratings -> MongoDB stores updates with relational population -> Server renders EJS view.",
  algorithms: [
    "Session Cookie Authentication & Salted Hash Verification",
    "Geospatial Coordinate Reverse Geocoding",
    "Relational Data Aggregation & Population",
    "RESTful Resource Dispatching"
  ],
  models: [
    "User Schema (credentials, timestamps)",
    "Listing Schema (title, description, price, location, geometry, images, author ref, reviews ref)",
    "Review Schema (rating, comment, author ref)"
  ],
  datasets: [
    "User accommodation listings, geo-coordinates, reviews, and hosted photography"
  ],
  preprocessing: "Image compression, secure filename sanitation, and input validation with Joi schemas.",
  trainingDetails: "Not applicable (Full-stack software engineering project).",
  evaluationMetrics: [
    "Server Response Time",
    "Authentication Security & Authorization Integrity",
    "Mobile Responsive Viewport Compatibility"
  ],
  results: {
    architecture: "MVC full-stack architecture with Node.js, Express.js, and MongoDB",
    integrations: "Fully working Cloudinary media uploads and Mapbox interactive geospatial discovery",
    deployment: "Deployed and accessible online on Render"
  },
  individualContribution: "Complete full-stack development: designed database schemas, built Express.js REST API routes, implemented Passport.js authentication, integrated Cloudinary and Mapbox APIs, and deployed live application on Render.",
  challenges: "Managing asynchronous image uploads during multi-photo listing creation, handling geocoding edge cases, and enforcing strict user authorization on edit/delete actions.",
  limitations: "Server-side rendered EJS rather than a client-side Single Page Application (SPA); payment gateway processing is simulated/pending.",
  futureImprovements: "Migration to Next.js / React frontend, payment integration with Stripe, and real-time chat between hosts and guests using WebSockets.",
  completionStatus: "Completed and deployed live on Render.",
  repositoryUrl: "https://github.com/Lawapaul/PadharooGo-Full-stack-end-to-end-platform-for-travel-stays",
  liveDemoUrl: "https://padharoogo-full-stack-end-to-end.onrender.com/listings",
  relatedQuestions: [
    "What is PadharooGo?",
    "What technologies were used to build PadharooGo?",
    "Does PadharooGo have a live demo or repository link?",
    "How does PadharooGo handle authentication and cloud media?"
  ]
};

