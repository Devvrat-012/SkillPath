import { useEffect, useRef, useState } from "react"

export default function Footer() {
    const footerRef = useRef<HTMLElement>(null)
    const [width, setWidth] = useState(1200)

    useEffect(() => {
        const element = footerRef.current

        if (!element) return

        const observer = new ResizeObserver((entries) => {
            const newWidth = entries[0]?.contentRect.width

            if (newWidth) {
                setWidth(newWidth)
            }
        })

        observer.observe(element)

        return () => observer.disconnect()
    }, [])

    const isMobile = width <= 600

    return (
        <footer
            ref={footerRef}
            style={{
                width: "100%",
                padding: isMobile ? "40px 16px 24px" : "48px 24px 28px",
                boxSizing: "border-box",
                background: "#111827",
                color: "#FFFFFF",
                fontFamily:
                    "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: 1200,
                    margin: "0 auto",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: isMobile ? "column" : "row",
                        alignItems: isMobile ? "flex-start" : "center",
                        justifyContent: "space-between",
                        gap: 24,
                        paddingBottom: 32,
                        borderBottom: "1px solid rgba(255,255,255,0.12)",
                    }}
                >
                    {/* Logo */}
                    <div
                        style={{
                            fontSize: 22,
                            fontWeight: 800,
                        }}
                    >
                        Skillpath
                    </div>

                    {/* Links */}
                    <nav
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 24,
                        }}
                    >
                        <a href="#courses" style={footerLink}>
                            Courses
                        </a>

                        <a href="#about" style={footerLink}>
                            About
                        </a>

                        <a href="#contact" style={footerLink}>
                            Contact
                        </a>
                    </nav>
                </div>

                <p
                    style={{
                        margin: "24px 0 0",
                        fontSize: 13,
                        color: "#9CA3AF",
                    }}
                >
                    © 2026 Skillpath. All rights reserved.
                </p>
            </div>
        </footer>
    )
}

const footerLink = {
    color: "#D1D5DB",
    textDecoration: "none",
    fontSize: 14,
}
