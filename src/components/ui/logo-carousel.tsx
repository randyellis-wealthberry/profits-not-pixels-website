"use client"

import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type SVGProps,
} from "react"
import { AnimatePresence, motion } from "framer-motion"
import { GradientHeading } from "@/components/ui/gradient-heading"

interface Logo {
  name: string
  id: number
  img: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

interface LogoColumnProps {
  logos: Logo[]
  index: number
  currentTime: number
}

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const distributeLogos = (allLogos: Logo[], columnCount: number): Logo[][] => {
  const shuffled = shuffleArray(allLogos)
  const columns: Logo[][] = Array.from({ length: columnCount }, () => [])

  shuffled.forEach((logo, index) => {
    columns[index % columnCount].push(logo)
  })

  const maxLength = Math.max(...columns.map((col) => col.length))
  columns.forEach((col) => {
    while (col.length < maxLength) {
      col.push(shuffled[Math.floor(Math.random() * shuffled.length)])
    }
  })

  return columns
}

const LogoColumn: React.FC<LogoColumnProps> = React.memo(
  ({ logos, index, currentTime }) => {
    const cycleInterval = 2000
    const columnDelay = index * 200
    const adjustedTime = (currentTime + columnDelay) % (cycleInterval * logos.length)
    const currentIndex = Math.floor(adjustedTime / cycleInterval)
    const CurrentLogo = useMemo(() => logos[currentIndex].img, [logos, currentIndex])

    return (
      <motion.div
        className="relative h-14 w-24 overflow-hidden md:h-24 md:w-48"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: index * 0.1,
          duration: 0.5,
          ease: "easeOut",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${logos[currentIndex].id}-${currentIndex}`}
            className="absolute inset-0 flex items-center justify-center"
            initial={{ y: "10%", opacity: 0, filter: "blur(8px)" }}
            animate={{
              y: "0%",
              opacity: 1,
              filter: "blur(0px)",
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 20,
                mass: 1,
                bounce: 0.2,
                duration: 0.5,
              },
            }}
            exit={{
              y: "-20%",
              opacity: 0,
              filter: "blur(6px)",
              transition: {
                type: "tween",
                ease: "easeIn",
                duration: 0.3,
              },
            }}
          >
            <CurrentLogo className="h-20 w-20 max-h-[80%] max-w-[80%] object-contain md:h-32 md:w-32" />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    )
  }
)

interface LogoCarouselProps {
  columnCount?: number
  logos: Logo[]
}

export function LogoCarousel({ columnCount = 2, logos }: LogoCarouselProps) {
  const [logoSets, setLogoSets] = useState<Logo[][]>([])
  const [currentTime, setCurrentTime] = useState(0)

  const updateTime = useCallback(() => {
    setCurrentTime((prevTime) => prevTime + 100)
  }, [])

  useEffect(() => {
    const intervalId = setInterval(updateTime, 100)
    return () => clearInterval(intervalId)
  }, [updateTime])

  useEffect(() => {
    const distributedLogos = distributeLogos(logos, columnCount)
    setLogoSets(distributedLogos)
  }, [logos, columnCount])

  return (
    <div className="flex space-x-4">
      {logoSets.map((logos, index) => (
        <LogoColumn
          key={index}
          logos={logos}
          index={index}
          currentTime={currentTime}
        />
      ))}
    </div>
  )
}

export { LogoColumn };

// Logo Components
function AppleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="209"
      height="256"
      viewBox="0 0 814 1000"
      {...props}
    >
      <path fill="#fff" d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
    </svg>
  );
}

function PierreIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 74 20"
      width={74}
      height={20}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill="#fff"
        d="M2 0a2 2 0 00-2 2v16a2 2 0 002 2h10a2 2 0 002-2V2a2 2 0 00-2-2H2zm33.134 14.398h-2.502V16h6.714v-1.602h-2.502V8.152c0-.384-.096-.666-.288-.846-.192-.192-.468-.288-.828-.288h-2.52V8.62h1.926v5.778zm-.342-9.108c.264.228.594.342.99.342s.726-.12.99-.36.396-.546.396-.918a1.11 1.11 0 00-.414-.9c-.264-.24-.594-.36-.99-.36-.384 0-.708.12-.972.36-.252.228-.378.528-.378.9 0 .384.126.696.378.936zm-12.55-1.98V16h1.926v-4.14h2.016c1.812 0 3.156-.324 4.032-.972.888-.648 1.332-1.752 1.332-3.312 0-1.044-.204-1.878-.612-2.502-.396-.636-.99-1.086-1.782-1.35-.78-.276-1.77-.414-2.97-.414h-3.942zm1.926 6.894V4.966h2.088c.732 0 1.338.072 1.818.216.492.144.87.408 1.134.792.276.372.414.906.414 1.602 0 .708-.138 1.254-.414 1.638-.264.384-.642.648-1.134.792-.48.132-1.086.198-1.818.198h-2.088zm24.622 1.674h-7.034c.031.82.258 1.486.68 1.998.456.552 1.11.828 1.962.828.708 0 1.278-.162 1.71-.486.432-.324.726-.78.882-1.368h1.836c-.204.984-.666 1.788-1.386 2.412-.708.612-1.71.918-3.006.918-.96 0-1.782-.204-2.466-.612a4.058 4.058 0 01-1.53-1.71c-.348-.72-.522-1.536-.522-2.448 0-.948.18-1.764.54-2.448a3.817 3.817 0 011.548-1.566c.672-.372 1.44-.558 2.304-.558.912 0 1.704.174 2.376.522a3.595 3.595 0 011.548 1.53c.372.66.558 1.446.558 2.358v.63zm-2.52-2.88c-.48-.48-1.128-.72-1.944-.72-.504 0-.954.108-1.35.324-.384.216-.69.534-.918.954a2.879 2.879 0 00-.31 1.116h5.232c-.05-.703-.286-1.26-.71-1.674zm4.554-1.656c-.216.216-.324.54-.324.972V16h1.854V8.62h4.716V7.018h-5.238c-.456 0-.792.108-1.008.324zm7.331.972c0-.432.108-.756.324-.972.216-.216.552-.324 1.008-.324h5.238V8.62H60.01V16h-1.854V8.314zm8.748 3.564h7.034v-.63c0-.912-.186-1.698-.558-2.358a3.595 3.595 0 00-1.548-1.53c-.672-.348-1.464-.522-2.376-.522-.864 0-1.632.186-2.304.558-.66.36-1.176.882-1.548 1.566-.36.684-.54 1.5-.54 2.448 0 .912.174 1.728.522 2.448.348.72.858 1.29 1.53 1.71.684.408 1.506.612 2.466.612 1.296 0 2.298-.306 3.006-.918.72-.624 1.182-1.428 1.386-2.412h-1.836c-.156.588-.45 1.044-.882 1.368-.432.324-1.002.486-1.71.486-.852 0-1.506-.276-1.962-.828-.423-.511-.65-1.178-.68-1.998zm5.224-1.206h-5.232c.035-.42.139-.793.31-1.116.228-.42.534-.738.918-.954a2.773 2.773 0 011.35-.324c.816 0 1.464.24 1.944.72.424.413.66.971.71 1.674z"
      />
    </svg>
  );
}

function BMWIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 498.503 498.503"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fill="#fff" d="M249.251 498.503c66.577 0 129.168-25.928 176.247-73.005 47.077-47.078 73.005-109.67 73.005-176.247 0-66.576-25.928-129.168-73.005-176.246C378.42 25.927 315.828 0 249.251 0 111.813 0 0 111.813 0 249.251c0 66.577 25.927 129.169 73.005 176.247 47.078 47.077 109.67 73.005 176.246 73.005z" />
      <path
        d="M8.624 249.251c0-64.272 25.03-124.699 70.479-170.148 45.449-45.45 105.875-70.479 170.148-70.479s124.7 25.029 170.148 70.479c45.449 45.449 70.479 105.875 70.479 170.148 0 132.683-107.945 240.628-240.627 240.628-64.273 0-124.699-25.03-170.148-70.479C33.654 373.95 8.624 313.524 8.624 249.251z"
        fill="#1e293b"
      />
      <path fill="#fff" d="M249.251 18.541c-127.416 0-230.71 103.294-230.71 230.71s103.294 230.711 230.71 230.711c127.416 0 230.71-103.295 230.71-230.711s-103.294-230.71-230.71-230.71z" />
      <path
        d="M249.251 396.621c-81.389 0-147.37-65.98-147.37-147.37 0-81.389 65.981-147.37 147.37-147.37 81.389 0 147.37 65.981 147.37 147.37 0 81.39-65.98 147.37-147.37 147.37z"
        fill="#1e293b"
      />
      <path fill="#fff" d="M111.362 249.251h137.889V111.362c-76.153 0-137.889 61.737-137.889 137.889zm137.889 0v137.89c76.153 0 137.889-61.736 137.889-137.89H249.251z" />
    </svg>
  );
}

function VercelIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 256 222"
      width="256"
      height="222"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid"
      {...props}
    >
      <path fill="#fff" d="m128 0 128 221.705H0z" />
    </svg>
  );
}

function SupabaseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 109 113"
      width="109"
      height="113"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M63.708 110.284c-2.86 3.601-8.658 1.628-8.727-2.97l-1.007-67.251h45.22c8.19 0 12.758 9.46 7.665 15.874l-43.151 54.347Z"
        fill="#3ECF8E"
      />
      <path
        d="M45.317 2.071c2.86-3.601 8.657-1.628 8.726 2.97l.442 67.251H9.83c-8.19 0-12.759-9.46-7.665-15.875L45.317 2.072Z"
        fill="#3ECF8E"
      />
    </svg>
  );
}

function TypeScriptIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 256 256"
      width={256}
      height={256}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid"
      {...props}
    >
      <path
        d="M20 0h216c11.046 0 20 8.954 20 20v216c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20V20C0 8.954 8.954 0 20 0Z"
        fill="#3178C6"
      />
      <path
        d="M150.518 200.475v27.62c4.492 2.302 9.805 4.028 15.938 5.179 6.133 1.151 12.597 1.726 19.393 1.726 6.622 0 12.914-.633 18.874-1.899 5.96-1.266 11.187-3.352 15.678-6.257 4.492-2.906 8.048-6.704 10.669-11.394 2.62-4.689 3.93-10.486 3.93-17.391 0-5.006-.749-9.394-2.246-13.163a30.748 30.748 0 0 0-6.479-10.055c-2.821-2.935-6.205-5.567-10.149-7.898-3.945-2.33-8.394-4.531-13.347-6.602-3.628-1.497-6.881-2.949-9.761-4.359-2.879-1.41-5.327-2.848-7.342-4.316-2.016-1.467-3.571-3.021-4.665-4.661-1.094-1.64-1.641-3.495-1.641-5.567 0-1.899.489-3.61 1.468-5.135s2.362-2.834 4.147-3.927c1.785-1.094 3.973-1.942 6.565-2.547 2.591-.604 5.471-.906 8.638-.906 2.304 0 4.737.173 7.299.518 2.563.345 5.14.877 7.732 1.597a53.669 53.669 0 0 1 7.558 2.719 41.7 41.7 0 0 1 6.781 3.797v-25.807c-4.204-1.611-8.797-2.805-13.778-3.582-4.981-.777-10.697-1.165-17.147-1.165-6.565 0-12.784.705-18.658 2.115-5.874 1.409-11.043 3.61-15.506 6.602-4.463 2.993-7.99 6.805-10.582 11.437-2.591 4.632-3.887 10.17-3.887 16.615 0 8.228 2.375 15.248 7.127 21.06 4.751 5.811 11.963 10.731 21.638 14.759a291.458 291.458 0 0 1 10.625 4.575c3.283 1.496 6.119 3.049 8.509 4.66 2.39 1.611 4.276 3.366 5.658 5.265 1.382 1.899 2.073 4.057 2.073 6.474a9.901 9.901 0 0 1-1.296 4.963c-.863 1.524-2.174 2.848-3.93 3.97-1.756 1.122-3.945 1.999-6.565 2.632-2.62.633-5.687.95-9.2.95-5.989 0-11.92-1.05-17.794-3.151-5.875-2.1-11.317-5.25-16.327-9.451Zm-46.036-68.733H140V109H41v22.742h35.345V233h28.137V131.742Z"
        fill="#FFF"
      />
    </svg>
  );
}

function NextjsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={180}
      height={180}
      viewBox="0 0 180 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx={90} cy={90} r={90} fill="#fff" />
      <path
        d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
        fill="#000"
      />
      <rect x={115} y={54} width={12} height={72} fill="#000" />
    </svg>
  );
}

function TailwindCSSIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 54 33"
      {...props}
    >
      <path
        fill="#38bdf8"
        fillRule="evenodd"
        d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

// Define the logos array
const allLogos = [
  { name: "Apple", id: 1, img: AppleIcon },
  { name: "Supabase", id: 2, img: SupabaseIcon },
  { name: "Vercel", id: 3, img: VercelIcon },
  { name: "Pierre", id: 4, img: PierreIcon },
  { name: "BMW", id: 5, img: BMWIcon },
  { name: "Nextjs", id: 6, img: NextjsIcon },
  { name: "Tailwind", id: 7, img: TailwindCSSIcon },
  { name: "Typescript", id: 8, img: TypeScriptIcon },
];

export function LogoCarouselDemo() {
  return (
    <div className="space-y-8 py-24 bg-[#1e293b]">
      <div className="mx-auto flex w-full max-w-screen-lg flex-col items-center space-y-8">
        <div className="text-center">
          <GradientHeading variant="light" size="sm" className="text-gray-300">
            Trusted by design teams worldwide
          </GradientHeading>
        </div>

        <LogoCarousel columnCount={3} logos={allLogos} />
      </div>
    </div>
  );
}