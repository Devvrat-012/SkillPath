import { addPropertyControls, ControlType } from "framer"
import { useCallback, useEffect, useState } from "react"

type Course = {
    courseName: string
    courseCode: string
    description: string
    mainCategory: string
    shortCourse: string
    courseType: string
    pricePaise: number
    priceUsdCents: number
    mangoId: string
    refundable: boolean
}

type CountryResponse = {
    country_code: "IN" | "US"
}

const COURSES_URL =
    "https://syncsphere-hiv6.onrender.com/assignment/course-data"

const COUNTRY_URL =
    "https://syncsphere-hiv6.onrender.com/assignment/country-code"

function formatPrice(course: Course, country: "IN" | "US" | null) {
    if (!country) return null

    if (country === "IN") {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 2,
        }).format(course.pricePaise / 100)
    }

    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(course.priceUsdCents / 100)
}

function CourseCard({
    course,
    country,
    accentColor,
    cardRadius,
}: {
    course: Course
    country: "IN" | "US" | null
    accentColor: string
    cardRadius: number
}) {
    const price = formatPrice(course, country)

    return (
        <article
            style={{
                display: "flex",
                flexDirection: "column",
                minWidth: 0,
                padding: 24,
                border: "1px solid #E5E7EB",
                borderRadius: cardRadius,
                background: "#FFFFFF",
                boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
                boxSizing: "border-box",
                height: "100%",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                    marginBottom: 16,
                }}
            >
                <span
                    style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: accentColor,
                        background: `${accentColor}14`,
                        padding: "6px 10px",
                        borderRadius: 999,
                    }}
                >
                    {course.mainCategory}
                </span>

                {course.refundable && (
                    <span
                        style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: "#15803D",
                            background: "#DCFCE7",
                            padding: "6px 10px",
                            borderRadius: 999,
                            whiteSpace: "nowrap",
                        }}
                    >
                        Refundable
                    </span>
                )}
            </div>

            <h3
                style={{
                    margin: "0 0 10px",
                    fontSize: 20,
                    lineHeight: 1.25,
                    fontWeight: 700,
                    color: "#111827",
                }}
            >
                {course.courseName}
            </h3>

            <p
                style={{
                    margin: "0 0 20px",
                    color: "#6B7280",
                    fontSize: 14,
                    lineHeight: 1.6,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                }}
            >
                {course.description}
            </p>

            <div
                style={{
                    marginTop: "auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                }}
            >
                <div>
                    <div
                        style={{
                            fontSize: 12,
                            color: "#9CA3AF",
                            marginBottom: 4,
                        }}
                    >
                        Price
                    </div>

                    <div
                        style={{
                            fontSize: 20,
                            fontWeight: 700,
                            color: "#111827",
                        }}
                    >
                        {price ?? "Price unavailable"}
                    </div>
                </div>

                <span
                    style={{
                        fontSize: 13,
                        color: "#6B7280",
                        textAlign: "right",
                    }}
                >
                    {course.courseType}
                </span>
            </div>
        </article>
    )
}

function SkeletonCard({ cardRadius }: { cardRadius: number }) {
    return (
        <div
            style={{
                padding: 24,
                border: "1px solid #E5E7EB",
                borderRadius: cardRadius,
                background: "#FFFFFF",
                height: 230,
                boxSizing: "border-box",
            }}
        >
            <div
                style={{
                    width: "35%",
                    height: 24,
                    borderRadius: 8,
                    background: "#E5E7EB",
                    marginBottom: 20,
                }}
            />

            <div
                style={{
                    width: "80%",
                    height: 22,
                    borderRadius: 8,
                    background: "#E5E7EB",
                    marginBottom: 12,
                }}
            />

            <div
                style={{
                    width: "100%",
                    height: 14,
                    borderRadius: 6,
                    background: "#F3F4F6",
                    marginBottom: 8,
                }}
            />

            <div
                style={{
                    width: "75%",
                    height: 14,
                    borderRadius: 6,
                    background: "#F3F4F6",
                }}
            />
        </div>
    )
}

function MessageState({
    title,
    description,
    accentColor,
    retry,
}: {
    title: string
    description: string
    accentColor: string
    retry?: () => void
}) {
    return (
        <div
            style={{
                padding: 48,
                border: "1px solid #E5E7EB",
                borderRadius: 20,
                background: "#FFFFFF",
                textAlign: "center",
            }}
        >
            <h3
                style={{
                    margin: "0 0 8px",
                    fontSize: 20,
                    color: "#111827",
                }}
            >
                {title}
            </h3>

            <p
                style={{
                    margin: "0 auto",
                    maxWidth: 520,
                    color: "#6B7280",
                    lineHeight: 1.6,
                    fontSize: 14,
                }}
            >
                {description}
            </p>

            {retry && (
                <button
                    onClick={retry}
                    style={{
                        marginTop: 20,
                        border: 0,
                        borderRadius: 10,
                        padding: "11px 18px",
                        background: accentColor,
                        color: "#FFFFFF",
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: "pointer",
                    }}
                >
                    Try Again
                </button>
            )}
        </div>
    )
}

export default function CourseSection({
    accentColor,
    cardRadius,
}: {
    accentColor: string
    cardRadius: number
}) {
    const [viewportWidth, setViewportWidth] = useState(1200)

    const [courses, setCourses] = useState<Course[]>([])
    const [country, setCountry] = useState<"IN" | "US" | null>(null)

    const [loading, setLoading] = useState(true)
    const [courseError, setCourseError] = useState(false)
    const [countryError, setCountryError] = useState(false)

    // Track the actual browser viewport.
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

    const columns = viewportWidth <= 600 ? 1 : viewportWidth <= 900 ? 2 : 3

    const horizontalPadding = viewportWidth <= 600 ? 16 : 24

    const loadData = useCallback(async () => {
        setLoading(true)
        setCourseError(false)
        setCountryError(false)

        const results = await Promise.allSettled([
            fetch(COURSES_URL),
            fetch(COUNTRY_URL),
        ])

        const courseResult = results[0]

        if (courseResult.status === "fulfilled") {
            if (!courseResult.value.ok) {
                setCourseError(true)
                setCourses([])
            } else {
                try {
                    const data = await courseResult.value.json()

                    if (Array.isArray(data)) {
                        setCourses(data)
                    } else {
                        setCourseError(true)
                        setCourses([])
                    }
                } catch {
                    setCourseError(true)
                    setCourses([])
                }
            }
        } else {
            setCourseError(true)
            setCourses([])
        }

        const countryResult = results[1]

        if (countryResult.status === "fulfilled") {
            if (!countryResult.value.ok) {
                setCountryError(true)
                setCountry(null)
            } else {
                try {
                    const data =
                        (await countryResult.value.json()) as CountryResponse

                    if (
                        data.country_code === "IN" ||
                        data.country_code === "US"
                    ) {
                        setCountry(data.country_code)
                    } else {
                        setCountryError(true)
                        setCountry(null)
                    }
                } catch {
                    setCountryError(true)
                    setCountry(null)
                }
            }
        } else {
            setCountryError(true)
            setCountry(null)
        }

        setLoading(false)
    }, [])

    useEffect(() => {
        loadData()
    }, [loadData])

    return (
        <section
            id="courses"
            style={{
                width: "100%",
                boxSizing: "border-box",
                padding: `72px ${horizontalPadding}px`,
                background: "#F8FAFC",
                fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: 1200,
                    margin: "0 auto",
                }}
            >
                <div style={{ marginBottom: 32 }}>
                    <p
                        style={{
                            margin: "0 0 8px",
                            fontSize: 13,
                            fontWeight: 700,
                            color: accentColor,
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                        }}
                    >
                        Learn with Skillpath
                    </p>

                    <h2
                        style={{
                            margin: 0,
                            fontSize: viewportWidth <= 600 ? 32 : 46,
                            lineHeight: 1.1,
                            color: "#111827",
                        }}
                    >
                        Explore our courses
                    </h2>

                    <p
                        style={{
                            margin: "12px 0 0",
                            maxWidth: 650,
                            color: "#6B7280",
                            fontSize: 16,
                            lineHeight: 1.6,
                        }}
                    >
                        Practical courses designed to help you build useful
                        skills and move forward.
                    </p>
                </div>

                {countryError && !courseError && !loading && (
                    <div
                        style={{
                            marginBottom: 20,
                            padding: "12px 16px",
                            borderRadius: 10,
                            background: "#FFF7ED",
                            border: "1px solid #FED7AA",
                            color: "#9A3412",
                            fontSize: 14,
                        }}
                    >
                        Regional pricing is temporarily unavailable. Course
                        prices will appear once your region can be determined.
                    </div>
                )}

                {loading ? (
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                            gap: 20,
                        }}
                    >
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <SkeletonCard key={item} cardRadius={cardRadius} />
                        ))}
                    </div>
                ) : courseError ? (
                    <MessageState
                        title="Unable to load courses"
                        description="We couldn't fetch the latest courses right now. Please try again."
                        accentColor={accentColor}
                        retry={loadData}
                    />
                ) : courses.length === 0 ? (
                    <MessageState
                        title="No courses available"
                        description="There are no courses available right now. Please check back later."
                        accentColor={accentColor}
                    />
                ) : (
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                            gap: 20,
                        }}
                    >
                        {courses.map((course) => (
                            <CourseCard
                                key={course.courseCode}
                                course={course}
                                country={country}
                                accentColor={accentColor}
                                cardRadius={cardRadius}
                            />
                        ))}
                    </div>
                )}

                {countryError && !courseError && !loading && (
                    <p
                        style={{
                            margin: "16px 0 0",
                            fontSize: 13,
                            color: "#9CA3AF",
                        }}
                    >
                        Course data is available, but regional pricing could not
                        be determined.
                    </p>
                )}
            </div>
        </section>
    )
}

CourseSection.defaultProps = {
    accentColor: "#635BFF",
    cardRadius: 18,
}

addPropertyControls(CourseSection, {
    accentColor: {
        type: ControlType.Color,
        title: "Accent Color",
        defaultValue: "#635BFF",
    },

    cardRadius: {
        type: ControlType.Number,
        title: "Card Radius",
        defaultValue: 18,
        min: 0,
        max: 40,
        step: 1,
        unit: "px",
        displayStepper: true,
    },
})
