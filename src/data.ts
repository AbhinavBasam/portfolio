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
            items: ["LLM Deployment", "Docker", "Git", "REST APIs", "FastAPI", "Flask", "DSA", "OOP"],
        },
        {
            title: "AI & Machine Learning",
            items: ["Generative AI", "RAG", "LoRA", "AI Agents", "LLMs", "CNNs", "TensorFlow", "Keras", "LangChain", "scikit-learn"],
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
            title: "CodeAudit AI (Published Research)",
            description: "Authored a novel multi-agent RAG system for semantic codebase vectorization. Achieved 93.3% accuracy and 100% precision using all-MiniLM-L6-v2 embeddings, ChromaDB, and a Chain-of-Thought LLM Judge.",
            tags: ["Python", "LangChain", "RAG", "ChromaDB", "Multi-Agent"],
        },
        {
            index: "02",
            title: "Enhanced Dog Breed Classification (Published Research)",
            description: "Developed a probability-level stacking ensemble combining ResNet50, EfficientNetB0, and MobileNetV2 with an MLP meta-learner. Achieved state-of-the-art 84.30% Top-1 accuracy on the 120-class Stanford Dogs benchmark. Deployed via Gradio.",
            tags: ["TensorFlow", "Keras", "Ensemble Learning", "Gradio"],
        },
        {
            index: "03",
            title: "Jarvis — Offline AI Voice Assistant",
            description: "Designed a privacy-focused, finite-state listening system. Implemented utterance-level RMS energy analysis for noisy environments and automated OS-level system actions without relying on high-latency cloud APIs.",
            tags: ["Python", "Speech Recognition", "Automation"],
        },
    ],
};
