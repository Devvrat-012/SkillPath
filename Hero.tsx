import { useEffect, useState } from "react"

export default function Hero() {
    const [viewportWidth, setViewportWidth] = useState(1200)

    useEffect(() => {
        const updateWidth = () => {
            setViewportWidth(window.innerWidth)
        }

        updateWidth()

        window.addEventListener("resize", updateWidth)

        return () => {
            window.removeEventListener("resize", updateWidth)
        }
    }, [])

    const isMobile = viewportWidth <= 600
    const isTablet = viewportWidth <= 900

    const headingSize = isMobile ? 42 : isTablet ? 54 : 72

    return (
        <section
            style={{
                width: "100%",
                minHeight: isMobile ? 430 : 520,
                boxSizing: "border-box",
                padding: isMobile ? "72px 16px 70px" : "96px 24px 90px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)",
                fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
                textAlign: "center",
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: 800,
                    margin: "0 auto",
                }}
            >
                <div
                    style={{
                        display: "inline-block",
                        padding: "7px 12px",
                        borderRadius: 999,
                        background: "#635BFF14",
                        color: "#635BFF",
                        fontSize: 13,
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        marginBottom: 20,
                    }}
                >
                    Learn • Build • Grow
                </div>

                <h1
                    style={{
                        margin: 0,
                        fontSize: headingSize,
                        lineHeight: 1.05,
                        letterSpacing: "-0.04em",
                        fontWeight: 800,
                        color: "#111827",
                    }}
                >
                    Learn skills.
                    <br />
                    <span style={{ color: "#635BFF" }}>Build your future.</span>
                </h1>

                <p
                    style={{
                        width: "100%",
                        maxWidth: 620,
                        margin: "24px auto 32px",
                        fontSize: isMobile ? 15 : 18,
                        lineHeight: 1.6,
                        color: "#6B7280",
                    }}
                >
                    Practical courses designed to help you build real-world
                    skills, create opportunities, and move forward.
                </p>

                <a
                    href="#courses"
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: isMobile ? "12px 18px" : "14px 24px",
                        borderRadius: 12,
                        background: "#635BFF",
                        color: "#FFFFFF",
                        textDecoration: "none",
                        fontSize: isMobile ? 13 : 15,
                        fontWeight: 700,
                        boxShadow: "0 10px 24px rgba(99, 91, 255, 0.21)",
                    }}
                >
                    Explore Courses →
                </a>
            </div>
        </section>
    )
}
