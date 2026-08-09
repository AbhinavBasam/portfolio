import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    type CSSProperties,
    type MouseEvent,
} from "react"
import { portfolioData } from "./data"

export default function App() {
    const {
        name,
        headlinePrefixText,
        subheadline,
        email,
        githubURL,
        linkedinURL,
        accentColor,
        backgroundColor,
        surfaceColor,
        borderColor,
        textColor,
        mutedTextColor,
        cornerRadius,
        maxContentWidth,
        skillsGroups,
        projects,
    } = portfolioData

    const rootRef = useRef<HTMLDivElement | null>(null)

    const radii = useMemo(() => {
        return {
            card: Math.max(0, cornerRadius),
            button: Math.max(2, cornerRadius - 4),
            pill: Math.max(2, cornerRadius - 6),
            tag: Math.max(2, cornerRadius - 8),
        }
    }, [cornerRadius])

    const scrollToSection = useCallback(
        (event: MouseEvent<HTMLAnchorElement>, id: string) => {
            event.preventDefault()
            if (typeof window !== "undefined") {
                const section = document.getElementById(id)
                section?.scrollIntoView({ behavior: "smooth", block: "start" })
            }
        },
        []
    )

    useEffect(() => {
        if (typeof window === "undefined") return
        const rootEl = rootRef.current
        if (!rootEl) return

        const revealElements = Array.from(
            rootEl.querySelectorAll<HTMLElement>(".fp-reveal")
        )
        if (revealElements.length === 0) return

        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
        if (reducedMotion || typeof IntersectionObserver === "undefined") {
            revealElements.forEach((el) =>
                el.setAttribute("data-visible", "true")
            )
            return
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.setAttribute("data-visible", "true")
                        observer.unobserve(entry.target)
                    }
                })
            },
            { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
        )

        revealElements.forEach((el) => observer.observe(el))
        return () => observer.disconnect()
    }, [])

    return (
        <div
            ref={rootRef}
            style={{
                position: "relative",
                width: "100%",
                minHeight: "100vh",
                background: backgroundColor,
                color: textColor,
                fontFamily:
                    'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            }}
        >
            <style>{`
                html, body {
                    margin: 0;
                    padding: 0;
                    background: ${backgroundColor};
                }
                .fp-root * { box-sizing: border-box; }
                .fp-root a { color: inherit; text-decoration: none; }
                .fp-root section { scroll-margin-top: 100px; }
                .fp-container { max-width: var(--max-content-width); margin: 0 auto; padding: 96px 32px; }
                .fp-topnav-link, .fp-button, .fp-social-link {
                    transition: background-color 0.2s ease, opacity 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
                }
                .fp-topnav-link:hover { opacity: 0.72; }
                .fp-button:hover { opacity: 0.93; transform: translateY(-1px); }
                .fp-social-link:hover { background: rgba(255,255,255,0.04); opacity: 0.95; }
                .fp-project-card {
                    transition: transform 0.22s ease, background-color 0.22s ease, border-color 0.22s ease;
                }
                .fp-project-card:hover {
                    transform: translateY(-4px);
                    background-color: rgba(255,255,255,0.03);
                }
                .fp-reveal {
                    opacity: 0;
                    transform: translateY(18px);
                    transition: opacity 0.6s ease, transform 0.6s ease;
                    will-change: transform, opacity;
                }
                .fp-reveal[data-visible="true"] {
                    opacity: 1;
                    transform: translateY(0);
                }
                .fp-focus:focus-visible {
                    outline: 2px solid var(--accent-color);
                    outline-offset: 3px;
                }
                @media (prefers-reduced-motion: reduce) {
                    .fp-topnav-link, .fp-button, .fp-social-link, .fp-project-card, .fp-reveal {
                        transition: none !important;
                        transform: none !important;
                    }
                    .fp-reveal { opacity: 1 !important; }
                }
                @media (max-width: 900px) {
                    .fp-container { padding: 72px 24px; }
                    .fp-hero-title { font-size: clamp(2.5rem, 10vw, 4rem) !important; }
                    .fp-about-grid { grid-template-columns: 1fr !important; }
                    .fp-skills-grid { grid-template-columns: 1fr !important; }
                    .fp-projects-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
                }
                @media (max-width: 640px) {
                    .fp-container { padding: 56px 20px; }
                    .fp-nav-wrap { flex-direction: column; align-items: flex-start !important; gap: 14px; }
                    .fp-nav-links { flex-wrap: wrap; }
                    .fp-projects-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>

            <main
                className="fp-root"
                style={
                    {
                        "--accent-color": accentColor,
                        "--max-content-width": `${maxContentWidth}px`,
                    } as CSSProperties
                }
                data-static="false"
            >
                {/* 1) Sticky Top Navigation */}
                <header
                    style={{
                        position: "sticky",
                        top: 0,
                        zIndex: 20,
                        borderBottom: `1px solid ${borderColor}`,
                        backdropFilter: "blur(10px)",
                        background: `color-mix(in srgb, ${backgroundColor} 74%, transparent)`,
                    }}
                >
                    <div
                        className="fp-container fp-nav-wrap"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            paddingTop: 16,
                            paddingBottom: 16,
                        }}
                    >
                        <div
                            style={{
                                fontWeight: 700,
                                letterSpacing: "-0.02em",
                            }}
                        >
                            {name}
                        </div>
                        <nav
                            aria-label="Primary"
                            className="fp-nav-links"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 22,
                            }}
                        >
                            {["about", "skills", "projects", "contact"].map(
                                (item) => (
                                    <a
                                        key={item}
                                        href={`#${item}`}
                                        className="fp-topnav-link fp-focus"
                                        onClick={(e) =>
                                            scrollToSection(e, item)
                                        }
                                        style={{
                                            color: mutedTextColor,
                                            fontSize: 14,
                                        }}
                                    >
                                        {item.charAt(0).toUpperCase() +
                                            item.slice(1)}
                                    </a>
                                )
                            )}
                        </nav>
                    </div>
                </header>

                {/* 2) Hero */}
                <section id="hero" className="fp-container fp-reveal">
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            border: `1px solid ${borderColor}`,
                            borderRadius: radii.pill,
                            padding: "8px 12px",
                            background: surfaceColor,
                            color: mutedTextColor,
                            fontSize: 13,
                        }}
                    >
                        <span
                            style={{
                                width: 8,
                                height: 8,
                                borderRadius: 999,
                                background: accentColor,
                                display: "inline-block",
                            }}
                        />
                        Open to ML / MLOps internships
                    </div>
                    <h1
                        className="fp-hero-title"
                        style={{
                            margin: "24px 0 16px",
                            fontSize: "clamp(3rem, 8vw, 4.5rem)",
                            lineHeight: 1,
                            letterSpacing: "-0.04em",
                        }}
                    >
                        {headlinePrefixText}{" "}
                        <span style={{ color: accentColor }}>{name}</span>
                    </h1>
                    <p
                        style={{
                            margin: 0,
                            maxWidth: 760,
                            color: mutedTextColor,
                            fontSize: 20,
                            lineHeight: 1.5,
                        }}
                    >
                        {subheadline}
                    </p>
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 14,
                            marginTop: 34,
                        }}
                    >
                        <a
                            href="#projects"
                            onClick={(e) => scrollToSection(e, "projects")}
                            className="fp-button fp-focus"
                            style={{
                                background: accentColor,
                                color: "#FFFFFF",
                                borderRadius: radii.button,
                                padding: "12px 18px",
                                fontWeight: 600,
                                border: `1px solid ${accentColor}`,
                            }}
                        >
                            View Projects
                        </a>
                        <a
                            href="#contact"
                            onClick={(e) => scrollToSection(e, "contact")}
                            className="fp-button fp-focus"
                            style={{
                                background: "transparent",
                                color: textColor,
                                borderRadius: radii.button,
                                padding: "12px 18px",
                                fontWeight: 600,
                                border: `1px solid ${borderColor}`,
                            }}
                        >
                            Contact Me
                        </a>
                    </div>
                </section>

                {/* 3) About */}
                <section id="about" className="fp-container fp-reveal">
                    <div
                        style={{
                            color: accentColor,
                            textTransform: "uppercase",
                            letterSpacing: "0.14em",
                            fontSize: 12,
                            marginBottom: 20,
                        }}
                    >
                        01 — About Me
                    </div>
                    <div
                        className="fp-about-grid"
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1.4fr 1fr",
                            gap: 24,
                        }}
                    >
                        <p
                            style={{
                                margin: 0,
                                color: mutedTextColor,
                                fontSize: 18,
                                lineHeight: 1.7,
                            }}
                        >
                            Highly motivated ML Engineer with a strong
                            foundation in data structures and backend
                            architecture. I specialize in bridging the gap
                            between data science and software
                            engineering—leveraging hands-on experience in
                            building scalable machine learning pipelines,
                            deploying Generative AI applications, and
                            orchestrating robust MLOps workflows.
                        </p>
                        <aside
                            style={{
                                background: surfaceColor,
                                border: `1px solid ${borderColor}`,
                                borderRadius: radii.card,
                                padding: 24,
                            }}
                        >
                            <div
                                style={{
                                    color: mutedTextColor,
                                    fontSize: 12,
                                    letterSpacing: "0.12em",
                                    marginBottom: 14,
                                }}
                            >
                                EDUCATION
                            </div>
                            <div
                                style={{
                                    fontSize: 22,
                                    lineHeight: 1.25,
                                    marginBottom: 10,
                                }}
                            >
                                B.Tech in Artificial Intelligence & Machine
                                Learning
                            </div>
                            <div style={{ color: mutedTextColor }}>
                                B V Raju Institute of Technology · 2024—2028
                            </div>
                        </aside>
                    </div>
                </section>

                {/* 4) Skills */}
                <section id="skills" className="fp-container fp-reveal">
                    <div
                        style={{
                            color: accentColor,
                            textTransform: "uppercase",
                            letterSpacing: "0.14em",
                            fontSize: 12,
                            marginBottom: 14,
                        }}
                    >
                        02 — Skills
                    </div>
                    <h2
                        style={{
                            margin: "0 0 28px",
                            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                            letterSpacing: "-0.02em",
                        }}
                    >
                        The stack I work in
                    </h2>
                    <div
                        className="fp-skills-grid"
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                            gap: 16,
                        }}
                    >
                        {skillsGroups.map((group, index) => (
                            <article
                                key={`${group.title}-${index}`}
                                style={{
                                    background: surfaceColor,
                                    border: `1px solid ${borderColor}`,
                                    borderRadius: radii.card,
                                    padding: 20,
                                }}
                            >
                                <h3
                                    style={{ margin: "0 0 14px", fontSize: 18 }}
                                >
                                    {group.title}
                                </h3>
                                <div
                                    style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: 8,
                                    }}
                                >
                                    {group.items.map((item, itemIndex) => (
                                        <span
                                            key={`${item}-${itemIndex}`}
                                            style={{
                                                border: `1px solid ${borderColor}`,
                                                borderRadius: radii.pill,
                                                background:
                                                    "rgba(255,255,255,0.02)",
                                                color: mutedTextColor,
                                                padding: "6px 10px",
                                                fontSize: 13,
                                            }}
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                {/* 5) Projects */}
                <section id="projects" className="fp-container fp-reveal">
                    <div
                        style={{
                            color: accentColor,
                            textTransform: "uppercase",
                            letterSpacing: "0.14em",
                            fontSize: 12,
                            marginBottom: 14,
                        }}
                    >
                        03 — Projects
                    </div>
                    <h2
                        style={{
                            margin: "0 0 28px",
                            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                            letterSpacing: "-0.02em",
                        }}
                    >
                        Selected work
                    </h2>
                    <div
                        className="fp-projects-grid"
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                            gap: 16,
                        }}
                    >
                        {projects.map((project, index) => (
                            <article
                                key={`${project.title}-${index}`}
                                className="fp-project-card"
                                style={{
                                    background: surfaceColor,
                                    border: `1px solid ${borderColor}`,
                                    borderRadius: radii.card,
                                    padding: 20,
                                    minHeight: 260,
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 12,
                                }}
                            >
                                <div
                                    style={{
                                        color: accentColor,
                                        fontVariantNumeric: "tabular-nums",
                                        fontSize: 14,
                                        letterSpacing: "0.08em",
                                    }}
                                >
                                    {project.index}
                                </div>
                                <h3
                                    style={{
                                        margin: 0,
                                        fontSize: 22,
                                        lineHeight: 1.2,
                                    }}
                                >
                                    {project.title}
                                </h3>
                                <p
                                    style={{
                                        margin: 0,
                                        color: mutedTextColor,
                                        lineHeight: 1.55,
                                    }}
                                >
                                    {project.description}
                                </p>
                                <div
                                    style={{
                                        marginTop: "auto",
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: 8,
                                    }}
                                >
                                    {project.tags.map((tag, tagIndex) => (
                                        <span
                                            key={`${tag}-${tagIndex}`}
                                            style={{
                                                border: `1px solid ${borderColor}`,
                                                borderRadius: radii.tag,
                                                padding: "5px 9px",
                                                background:
                                                    "rgba(255,255,255,0.02)",
                                                color: textColor,
                                                fontSize: 12,
                                            }}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                {/* 6) Contact + Footer */}
                <section id="contact" className="fp-container fp-reveal">
                    <div
                        style={{
                            color: accentColor,
                            textTransform: "uppercase",
                            letterSpacing: "0.14em",
                            fontSize: 12,
                            marginBottom: 14,
                        }}
                    >
                        04 — Contact
                    </div>
                    <h2
                        style={{
                            margin: "0 0 20px",
                            fontSize: "clamp(1.75rem, 4vw, 2.6rem)",
                            letterSpacing: "-0.02em",
                        }}
                    >
                        Let’s build something intelligent.
                    </h2>
                    <a
                        href={`mailto:${email}`}
                        className="fp-focus"
                        style={{
                            display: "inline-block",
                            fontSize: "clamp(1.4rem, 4vw, 2.2rem)",
                            color: textColor,
                            marginBottom: 22,
                        }}
                    >
                        {email}
                    </a>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                        <a
                            href={githubURL}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="fp-social-link fp-focus"
                            aria-label="GitHub profile"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 10,
                                border: `1px solid ${borderColor}`,
                                borderRadius: radii.button,
                                padding: "10px 14px",
                                color: mutedTextColor,
                            }}
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                aria-hidden="true"
                            >
                                <path
                                    d="M12 2C6.48 2 2 6.59 2 12.26C2 16.79 4.87 20.63 8.84 21.98C9.34 22.08 9.52 21.76 9.52 21.49V19.74C6.73 20.36 6.14 18.53 6.14 18.53C5.68 17.32 5.03 16.99 5.03 16.99C4.12 16.36 5.1 16.37 5.1 16.37C6.1 16.45 6.64 17.43 6.64 17.43C7.53 19.01 8.97 18.55 9.56 18.27C9.66 17.61 9.91 17.17 10.19 16.92C7.96 16.66 5.62 15.76 5.62 11.75C5.62 10.61 6.01 9.69 6.65 8.97C6.54 8.71 6.2 7.62 6.75 6.15C6.75 6.15 7.59 5.88 9.5 7.21C10.3 6.98 11.15 6.86 12 6.86C12.85 6.86 13.7 6.98 14.5 7.21C16.41 5.88 17.25 6.15 17.25 6.15C17.8 7.62 17.46 8.71 17.35 8.97C17.99 9.69 18.38 10.61 18.38 11.75C18.38 15.77 16.03 16.65 13.79 16.91C14.15 17.23 14.47 17.86 14.47 18.84V21.49C14.47 21.76 14.65 22.09 15.16 21.98C19.13 20.63 22 16.79 22 12.26C22 6.59 17.52 2 12 2Z"
                                    fill="currentColor"
                                />
                            </svg>
                            github.com/AbhinavBasam
                        </a>
                        <a
                            href={linkedinURL}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="fp-social-link fp-focus"
                            aria-label="LinkedIn profile"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 10,
                                border: `1px solid ${borderColor}`,
                                borderRadius: radii.button,
                                padding: "10px 14px",
                                color: mutedTextColor,
                            }}
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                aria-hidden="true"
                            >
                                <path
                                    d="M6.94 8.5C5.96 8.5 5.17 7.69 5.17 6.71C5.17 5.73 5.96 4.93 6.94 4.93C7.92 4.93 8.72 5.73 8.72 6.71C8.72 7.69 7.92 8.5 6.94 8.5ZM5.39 19.07V9.93H8.5V19.07H5.39ZM10.5 19.07V9.93H13.48V11.18H13.52C13.93 10.4 14.93 9.57 16.42 9.57C19.53 9.57 20.11 11.62 20.11 14.29V19.07H17V14.83C17 13.82 16.98 12.53 15.61 12.53C14.22 12.53 14.01 13.61 14.01 14.76V19.07H10.5Z"
                                    fill="currentColor"
                                />
                            </svg>
                            linkedin.com/in/abhinavbasam
                        </a>
                    </div>
                </section>

                <footer style={{ borderTop: `1px solid ${borderColor}` }}>
                    <div
                        className="fp-container"
                        style={{
                            paddingTop: 20,
                            paddingBottom: 24,
                            display: "flex",
                            justifyContent: "space-between",
                            gap: 12,
                            color: mutedTextColor,
                            fontSize: 14,
                        }}
                    >
                        <span>© 2026 {name}</span>
                        <span>Built with React</span>
                    </div>
                </footer>
            </main>
        </div>
    )
}
