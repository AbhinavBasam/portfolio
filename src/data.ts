export interface SkillGroup {
    title: string;
    items: string[];
}

export interface ProjectItem {
    index: string;
    title: string;
    description: string;
    tags: string[];
}

export interface PortfolioData {
    name: string;
    headlinePrefixText: string;
    subheadline: string;
    email: string;
    githubURL: string;
    linkedinURL: string;
    accentColor: string;
    backgroundColor: string;
    surfaceColor: string;
    borderColor: string;
    textColor: string;
    mutedTextColor: string;
    cornerRadius: number;
    maxContentWidth: number;
    skillsGroups: SkillGroup[];
    projects: ProjectItem[];
}

export const portfolioData: PortfolioData = {
    name: "Abhinav Basam",
    headlinePrefixText: "Hi, I’m",
    subheadline: "Machine Learning Engineer & MLOps Specialist. I build, deploy, and scale intelligent AI systems and robust data pipelines.",
    email: "abhinavbasam@gmail.com",
    githubURL: "https://github.com/AbhinavBasam",
    linkedinURL: "https://linkedin.com/in/abhinavbasam",
    
    // Theme configurations
    accentColor: "#4D7CFF",
    backgroundColor: "#08080A",
    surfaceColor: "#101014",
    borderColor: "rgba(255,255,255,0.09)",
    textColor: "#F4F5F7",
    mutedTextColor: "#8B9099",
    cornerRadius: 14,
    maxContentWidth: 1000,
    
    // Edit these to add new skills
    skillsGroups: [
        {
            title: "MLOps & Engineering",
            items: ["Docker", "Git", "REST APIs", "FastAPI", "Flask", "DSA", "OOP"],
        },
        {
            title: "AI & Machine Learning",
            items: ["Generative AI", "LLMs", "CNNs", "TensorFlow", "Keras", "LangChain", "scikit-learn"],
        },
        {
            title: "Cloud & Databases",
            items: ["Microsoft Azure", "GCP", "Vector Databases (Chroma / Pinecone)", "Relational DBMS"],
        },
        {
            title: "Languages",
            items: ["Python", "Java", "C", "SQL"],
        },
    ],
    
    // Edit these to add new projects
    projects: [
        {
            index: "01",
            title: "Multi-Agent RAG System",
            description: "Engineered an autonomous multi-agent pipeline and packaged the orchestration logic into a scalable REST API.",
            tags: ["Python", "LangChain", "FastAPI"],
        },
        {
            index: "02",
            title: "Jarvis — Offline AI Voice Assistant",
            description: "Designed a finite-state listening system and automated OS-level system actions without relying on high-latency cloud APIs.",
            tags: ["Python", "Speech Recognition"],
        },
        {
            index: "03",
            title: "Dog Breed Classification (CNN)",
            description: "Developed an image classifier with data augmentation and optimized hyperparameters for high generalization.",
            tags: ["TensorFlow", "Keras"],
        },
    ],
};
