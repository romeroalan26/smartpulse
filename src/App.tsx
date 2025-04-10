import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { Login } from "./Login";

// Tipos de datos
interface Sensor {
  id: string;
  type: string;
  value: number;
  unit: string;
  location: string;
  status: "normal" | "warning" | "danger";
  section: "agricultural" | "logistics";
  history: { value: number; timestamp: number }[];
}

// Función para generar valores aleatorios
const generateRandomValue = (min: number, max: number) => {
  return Math.round((Math.random() * (max - min) + min) * 10) / 10;
};

// Datos iniciales de los sensores
const initialSensors: Sensor[] = [
  // Campo Agrícola - Invernadero 1
  {
    id: "ag1-temp",
    type: "Temperatura",
    value: generateRandomValue(15, 30),
    unit: "°C",
    location: "Invernadero 1",
    status: "normal",
    section: "agricultural",
    history: Array.from({ length: 10 }, () => ({
      value: generateRandomValue(15, 30),
      timestamp: Date.now() - Math.random() * 3600000,
    })),
  },
  {
    id: "ag1-hum",
    type: "Humedad",
    value: generateRandomValue(40, 80),
    unit: "%",
    location: "Invernadero 1",
    status: "normal",
    section: "agricultural",
    history: Array.from({ length: 10 }, () => ({
      value: generateRandomValue(40, 80),
      timestamp: Date.now() - Math.random() * 3600000,
    })),
  },
  {
    id: "ag1-co2",
    type: "CO2",
    value: generateRandomValue(350, 1000),
    unit: "ppm",
    location: "Invernadero 1",
    status: "normal",
    section: "agricultural",
    history: Array.from({ length: 10 }, () => ({
      value: generateRandomValue(350, 1000),
      timestamp: Date.now() - Math.random() * 3600000,
    })),
  },
  // Campo Agrícola - Invernadero 2
  {
    id: "ag2-temp",
    type: "Temperatura",
    value: generateRandomValue(15, 30),
    unit: "°C",
    location: "Invernadero 2",
    status: "normal",
    section: "agricultural",
    history: Array.from({ length: 10 }, () => ({
      value: generateRandomValue(15, 30),
      timestamp: Date.now() - Math.random() * 3600000,
    })),
  },
  {
    id: "ag2-hum",
    type: "Humedad",
    value: generateRandomValue(40, 80),
    unit: "%",
    location: "Invernadero 2",
    status: "normal",
    section: "agricultural",
    history: Array.from({ length: 10 }, () => ({
      value: generateRandomValue(40, 80),
      timestamp: Date.now() - Math.random() * 3600000,
    })),
  },
  {
    id: "ag2-luz",
    type: "Luminosidad",
    value: generateRandomValue(100, 2000),
    unit: "lux",
    location: "Invernadero 2",
    status: "normal",
    section: "agricultural",
    history: Array.from({ length: 10 }, () => ({
      value: generateRandomValue(100, 2000),
      timestamp: Date.now() - Math.random() * 3600000,
    })),
  },
  // Campo Agrícola - Exterior
  {
    id: "ag-ext-temp",
    type: "Temperatura",
    value: generateRandomValue(10, 35),
    unit: "°C",
    location: "Exterior",
    status: "normal",
    section: "agricultural",
    history: Array.from({ length: 10 }, () => ({
      value: generateRandomValue(10, 35),
      timestamp: Date.now() - Math.random() * 3600000,
    })),
  },
  {
    id: "ag-ext-hum",
    type: "Humedad Suelo",
    value: generateRandomValue(20, 90),
    unit: "%",
    location: "Exterior",
    status: "normal",
    section: "agricultural",
    history: Array.from({ length: 10 }, () => ({
      value: generateRandomValue(20, 90),
      timestamp: Date.now() - Math.random() * 3600000,
    })),
  },
  // Almacén Logístico - Zona A
  {
    id: "log-a-temp",
    type: "Temperatura",
    value: generateRandomValue(15, 25),
    unit: "°C",
    location: "Almacén A",
    status: "normal",
    section: "logistics",
    history: Array.from({ length: 10 }, () => ({
      value: generateRandomValue(15, 25),
      timestamp: Date.now() - Math.random() * 3600000,
    })),
  },
  {
    id: "log-a-hum",
    type: "Humedad",
    value: generateRandomValue(30, 60),
    unit: "%",
    location: "Almacén A",
    status: "normal",
    section: "logistics",
    history: Array.from({ length: 10 }, () => ({
      value: generateRandomValue(30, 60),
      timestamp: Date.now() - Math.random() * 3600000,
    })),
  },
  {
    id: "log-a-mov",
    type: "Movimiento",
    value: Math.round(Math.random()),
    unit: "",
    location: "Almacén A",
    status: "normal",
    section: "logistics",
    history: Array.from({ length: 10 }, () => ({
      value: Math.round(Math.random()),
      timestamp: Date.now() - Math.random() * 3600000,
    })),
  },
  // Almacén Logístico - Zona B (Refrigerada)
  {
    id: "log-b-temp",
    type: "Temperatura",
    value: generateRandomValue(2, 8),
    unit: "°C",
    location: "Almacén B (Refrigerado)",
    status: "normal",
    section: "logistics",
    history: Array.from({ length: 10 }, () => ({
      value: generateRandomValue(2, 8),
      timestamp: Date.now() - Math.random() * 3600000,
    })),
  },
  {
    id: "log-b-hum",
    type: "Humedad",
    value: generateRandomValue(30, 60),
    unit: "%",
    location: "Almacén B (Refrigerado)",
    status: "normal",
    section: "logistics",
    history: Array.from({ length: 10 }, () => ({
      value: generateRandomValue(30, 60),
      timestamp: Date.now() - Math.random() * 3600000,
    })),
  },
  {
    id: "log-b-mov",
    type: "Movimiento",
    value: Math.round(Math.random()),
    unit: "",
    location: "Almacén B (Refrigerado)",
    status: "normal",
    section: "logistics",
    history: Array.from({ length: 10 }, () => ({
      value: Math.round(Math.random()),
      timestamp: Date.now() - Math.random() * 3600000,
    })),
  },
  // Almacén Logístico - Zona de Carga
  {
    id: "log-c-mov",
    type: "Movimiento",
    value: Math.round(Math.random()),
    unit: "",
    location: "Zona de Carga",
    status: "normal",
    section: "logistics",
    history: Array.from({ length: 10 }, () => ({
      value: Math.round(Math.random()),
      timestamp: Date.now() - Math.random() * 3600000,
    })),
  },
  {
    id: "log-c-temp",
    type: "Temperatura",
    value: generateRandomValue(15, 35),
    unit: "°C",
    location: "Zona de Carga",
    status: "normal",
    section: "logistics",
    history: Array.from({ length: 10 }, () => ({
      value: generateRandomValue(15, 35),
      timestamp: Date.now() - Math.random() * 3600000,
    })),
  },
];

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [sensors, setSensors] = useState<Sensor[]>(initialSensors);
  const [selectedSection, setSelectedSection] = useState<
    "agricultural" | "logistics"
  >("agricultural");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    "Invernadero 1": true,
    "Invernadero 2": true,
    Exterior: true,
    "Almacén A": true,
    "Almacén B (Refrigerado)": true,
    "Zona de Carga": true,
  });
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLogin = (email: string) => {
    setIsAuthenticated(true);
    setUserEmail(email);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserEmail("");
  };

  // Actualizar datos cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setSensors((prevSensors) =>
        prevSensors.map((sensor) => {
          const newValue = (() => {
            switch (sensor.type) {
              case "Temperatura":
                return sensor.location.includes("Refrigerado")
                  ? generateRandomValue(2, 8)
                  : generateRandomValue(15, 30);
              case "Humedad":
                return generateRandomValue(30, 80);
              case "Humedad Suelo":
                return generateRandomValue(20, 90);
              case "Movimiento":
                return Math.round(Math.random());
              case "CO2":
                return generateRandomValue(350, 1000);
              case "Luminosidad":
                return generateRandomValue(100, 2000);
              default:
                return sensor.value;
            }
          })();

          let status: "normal" | "warning" | "danger" = "normal";
          switch (sensor.type) {
            case "Temperatura":
              if (sensor.location.includes("Refrigerado")) {
                if (newValue > 6) status = "warning";
                if (newValue > 8) status = "danger";
              } else {
                if (newValue > 28) status = "warning";
                if (newValue > 32) status = "danger";
              }
              break;
            case "Humedad":
              if (newValue > 75) status = "warning";
              if (newValue > 85) status = "danger";
              break;
            case "Humedad Suelo":
              if (newValue < 30) status = "warning";
              if (newValue < 20) status = "danger";
              break;
            case "CO2":
              if (newValue > 800) status = "warning";
              if (newValue > 1000) status = "danger";
              break;
            case "Luminosidad":
              if (newValue < 200) status = "warning";
              if (newValue < 100) status = "danger";
              break;
            case "Movimiento":
              if (newValue === 1) status = "warning";
              break;
          }

          const newHistory = [
            ...sensor.history.slice(1),
            { value: newValue, timestamp: Date.now() },
          ];

          return {
            ...sensor,
            value: newValue,
            status,
            history: newHistory,
          };
        })
      );
      setCurrentTime(new Date());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Componente para mostrar una tarjeta de sensor
  const SensorCard = ({ sensor }: { sensor: Sensor }) => (
    <div
      className={`${
        darkMode ? "bg-gray-800" : "bg-white"
      } rounded-lg shadow-md p-4 transition-all duration-300 hover:shadow-lg ${
        sensor.status === "normal"
          ? "border-l-4 border-green-500"
          : sensor.status === "warning"
          ? "border-l-4 border-yellow-500"
          : "border-l-4 border-red-500"
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center">
            <span className="text-2xl mr-2">
              {sensor.type === "Temperatura"
                ? "🌡️"
                : sensor.type === "Humedad"
                ? "💧"
                : sensor.type === "CO2"
                ? "🌬️"
                : sensor.type === "Luminosidad"
                ? "☀️"
                : sensor.type === "Movimiento"
                ? "🚶"
                : sensor.type === "Humedad Suelo"
                ? "🌱"
                : "📊"}
            </span>
            <div>
              <h3
                className={`text-lg font-semibold ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                {sensor.type}
              </h3>
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {sensor.location}
              </p>
            </div>
          </div>
        </div>
        <div
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            sensor.status === "normal"
              ? darkMode
                ? "bg-green-900 text-green-200"
                : "bg-green-100 text-green-800"
              : sensor.status === "warning"
              ? darkMode
                ? "bg-yellow-900 text-yellow-200"
                : "bg-yellow-100 text-yellow-800"
              : darkMode
              ? "bg-red-900 text-red-200"
              : "bg-red-100 text-red-800"
          }`}
        >
          {sensor.status === "normal"
            ? "Normal"
            : sensor.status === "warning"
            ? "Advertencia"
            : "Crítico"}
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-baseline">
          <p
            className={`text-3xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {sensor.type === "Movimiento"
              ? sensor.value === 1
                ? "Detectado"
                : "Sin movimiento"
              : sensor.value}
          </p>
          {sensor.type !== "Movimiento" && (
            <p
              className={`ml-1 text-xl ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {sensor.unit}
            </p>
          )}
        </div>
        <div className="flex items-center mt-2">
          <svg
            className={`w-4 h-4 ${
              darkMode ? "text-gray-500" : "text-gray-400"
            } mr-1`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p
            className={`text-xs ${
              darkMode ? "text-gray-500" : "text-gray-500"
            }`}
          >
            Última actualización: {new Date().toLocaleTimeString()}
          </p>
        </div>
      </div>

      <div className="h-32 -mx-4 px-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sensor.history}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={darkMode ? "#374151" : "#E5E7EB"}
            />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(timestamp) =>
                new Date(timestamp).toLocaleTimeString()
              }
              tick={{ fontSize: 10, fill: darkMode ? "#9CA3AF" : "#6B7280" }}
            />
            <YAxis
              tick={{ fontSize: 10, fill: darkMode ? "#9CA3AF" : "#6B7280" }}
              domain={sensor.type === "Movimiento" ? [0, 1] : ["auto", "auto"]}
            />
            <Tooltip
              labelFormatter={(timestamp) =>
                new Date(timestamp).toLocaleTimeString()
              }
              formatter={(value: number) => [
                sensor.type === "Movimiento"
                  ? value === 1
                    ? "Detectado"
                    : "Sin movimiento"
                  : `${value}${sensor.unit}`,
                sensor.type,
              ]}
              contentStyle={{
                backgroundColor: darkMode ? "#1F2937" : "white",
                borderRadius: "0.5rem",
                border: darkMode ? "1px solid #374151" : "1px solid #E5E7EB",
                color: darkMode ? "#F9FAFB" : "#111827",
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={
                sensor.status === "normal"
                  ? "#10b981"
                  : sensor.status === "warning"
                  ? "#f59e0b"
                  : "#ef4444"
              }
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Rangos normales de operación */}
      <div
        className={`mt-4 pt-4 border-t ${
          darkMode ? "border-gray-700" : "border-gray-100"
        }`}
      >
        <p
          className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}
        >
          Rangos normales de operación:
        </p>
        <p
          className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}
        >
          {sensor.type === "Temperatura" &&
          sensor.location.includes("Refrigerado")
            ? "2°C - 6°C"
            : sensor.type === "Temperatura"
            ? "15°C - 28°C"
            : sensor.type === "Humedad"
            ? "30% - 75%"
            : sensor.type === "Humedad Suelo"
            ? "30% - 90%"
            : sensor.type === "CO2"
            ? "350ppm - 800ppm"
            : sensor.type === "Luminosidad"
            ? "200lux - 2000lux"
            : sensor.type === "Movimiento"
            ? "Monitoreo continuo"
            : "N/A"}
        </p>
      </div>
    </div>
  );

  // Componente para mostrar estadísticas de la sección
  const SectionStats = ({
    section,
  }: {
    section: "agricultural" | "logistics";
  }) => {
    const sectionSensors = sensors.filter((s) => s.section === section);
    const warningCount = sectionSensors.filter(
      (s) => s.status === "warning"
    ).length;
    const dangerCount = sectionSensors.filter(
      (s) => s.status === "danger"
    ).length;
    const normalCount = sectionSensors.filter(
      (s) => s.status === "normal"
    ).length;

    // Calcular promedios por tipo de sensor
    const averages = sectionSensors.reduce((acc, sensor) => {
      if (sensor.type !== "Movimiento") {
        if (!acc[sensor.type]) {
          acc[sensor.type] = { sum: sensor.value, count: 1, unit: sensor.unit };
        } else {
          acc[sensor.type].sum += sensor.value;
          acc[sensor.type].count += 1;
        }
      }
      return acc;
    }, {} as Record<string, { sum: number; count: number; unit: string }>);

    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div
            className={`${
              darkMode ? "bg-gray-800" : "bg-white"
            } p-4 rounded-lg shadow-md`}
          >
            <div className="flex items-center">
              <div
                className={`w-12 h-12 rounded-full ${
                  darkMode ? "bg-blue-900" : "bg-blue-100"
                } flex items-center justify-center mr-4`}
              >
                <span
                  className={`${
                    darkMode ? "text-blue-300" : "text-blue-600"
                  } font-bold`}
                >
                  {sectionSensors.length}
                </span>
              </div>
              <div>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Total Sensores
                </p>
                <p
                  className={`text-lg font-semibold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {sectionSensors.length} dispositivos
                </p>
              </div>
            </div>
          </div>
          <div
            className={`${
              darkMode ? "bg-gray-800" : "bg-white"
            } p-4 rounded-lg shadow-md`}
          >
            <div className="flex items-center">
              <div
                className={`w-12 h-12 rounded-full ${
                  darkMode ? "bg-yellow-900" : "bg-yellow-100"
                } flex items-center justify-center mr-4`}
              >
                <span
                  className={`${
                    darkMode ? "text-yellow-300" : "text-yellow-600"
                  } font-bold`}
                >
                  {warningCount}
                </span>
              </div>
              <div>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Advertencias
                </p>
                <p
                  className={`text-lg font-semibold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {warningCount} sensores
                </p>
              </div>
            </div>
          </div>
          <div
            className={`${
              darkMode ? "bg-gray-800" : "bg-white"
            } p-4 rounded-lg shadow-md`}
          >
            <div className="flex items-center">
              <div
                className={`w-12 h-12 rounded-full ${
                  darkMode ? "bg-red-900" : "bg-red-100"
                } flex items-center justify-center mr-4`}
              >
                <span
                  className={`${
                    darkMode ? "text-red-300" : "text-red-600"
                  } font-bold`}
                >
                  {dangerCount}
                </span>
              </div>
              <div>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Críticos
                </p>
                <p
                  className={`text-lg font-semibold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {dangerCount} sensores
                </p>
              </div>
            </div>
          </div>
          <div
            className={`${
              darkMode ? "bg-gray-800" : "bg-white"
            } p-4 rounded-lg shadow-md`}
          >
            <div className="flex items-center">
              <div
                className={`w-12 h-12 rounded-full ${
                  darkMode ? "bg-green-900" : "bg-green-100"
                } flex items-center justify-center mr-4`}
              >
                <span
                  className={`${
                    darkMode ? "text-green-300" : "text-green-600"
                  } font-bold`}
                >
                  {normalCount}
                </span>
              </div>
              <div>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Normal
                </p>
                <p
                  className={`text-lg font-semibold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {normalCount} sensores
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`${
            darkMode ? "bg-gray-800" : "bg-white"
          } p-4 rounded-lg shadow-md mb-6`}
        >
          <h3
            className={`text-lg font-semibold ${
              darkMode ? "text-white" : "text-gray-800"
            } mb-4`}
          >
            Promedios por Tipo de Sensor
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(averages).map(([type, data]) => (
              <div
                key={type}
                className={`flex items-center p-3 ${
                  darkMode ? "bg-gray-700" : "bg-gray-50"
                } rounded-lg`}
              >
                <div
                  className={`w-10 h-10 rounded-full ${
                    darkMode ? "bg-blue-900" : "bg-blue-100"
                  } flex items-center justify-center mr-3`}
                >
                  <span
                    className={`${
                      darkMode ? "text-blue-300" : "text-blue-600"
                    } text-xl`}
                  >
                    {type === "Temperatura"
                      ? "🌡️"
                      : type === "Humedad"
                      ? "💧"
                      : type === "CO2"
                      ? "🌬️"
                      : type === "Luminosidad"
                      ? "☀️"
                      : "📊"}
                  </span>
                </div>
                <div>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {type}
                  </p>
                  <p
                    className={`text-lg font-semibold ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {(data.sum / data.count).toFixed(1)}
                    {data.unit}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };

  const SectionHeader = ({
    title,
    icon,
  }: {
    title: string;
    icon: React.ReactNode;
  }) => (
    <button
      onClick={() => toggleSection(title)}
      className={`w-full flex items-center justify-between p-4 ${
        darkMode ? "bg-gray-800" : "bg-white"
      } rounded-lg shadow-sm ${
        darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
      } transition-colors duration-150`}
    >
      <div className="flex items-center">
        {icon}
        <h2
          className={`text-xl font-semibold ${
            darkMode ? "text-white" : "text-gray-800"
          } ml-2`}
        >
          {title}
        </h2>
      </div>
      <svg
        className={`w-6 h-6 ${
          darkMode ? "text-gray-400" : "text-gray-500"
        } transform transition-transform duration-200 ${
          expandedSections[title] ? "rotate-180" : ""
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>
  );

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div
      className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"} flex`}
    >
      {/* Botón de menú móvil */}
      <div className="lg:hidden fixed top-0 left-0 z-40 p-4">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`p-2 rounded-md ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
          } shadow-md`}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Panel Lateral - Ahora con clases responsive y fixed */}
      <div
        className={`${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:fixed w-64 ${
          darkMode ? "bg-gray-800" : "bg-white"
        } shadow-lg h-screen z-50 flex flex-col transition-transform duration-300 ease-in-out overflow-y-auto`}
      >
        {/* Cabecera del panel lateral */}
        <div
          className={`p-4 border-b ${
            darkMode ? "border-gray-700" : "border-gray-200"
          } flex-shrink-0`}
        >
          <div className="flex items-center">
            <svg
              className={`w-8 h-8 ${
                darkMode ? "text-blue-400" : "text-blue-600"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
              />
            </svg>
            <h1
              className={`text-xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              } ml-3`}
            >
              SmartPulse
            </h1>
          </div>
        </div>

        {/* Contenido principal del panel lateral */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="mb-6">
            <h2
              className={`text-xs font-semibold ${
                darkMode ? "text-gray-400" : "text-gray-500"
              } uppercase tracking-wider mb-3`}
            >
              Navegación
            </h2>
            <div className="space-y-1">
              <button
                onClick={() => {
                  setSelectedSection("agricultural");
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center px-4 py-2 rounded-md text-sm font-medium ${
                  selectedSection === "agricultural"
                    ? darkMode
                      ? "bg-blue-900 text-blue-100"
                      : "bg-blue-50 text-blue-600"
                    : darkMode
                    ? "text-gray-300 hover:bg-gray-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Campo Agrícola
              </button>
              <button
                onClick={() => {
                  setSelectedSection("logistics");
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center px-4 py-2 rounded-md text-sm font-medium ${
                  selectedSection === "logistics"
                    ? darkMode
                      ? "bg-blue-900 text-blue-100"
                      : "bg-blue-50 text-blue-600"
                    : darkMode
                    ? "text-gray-300 hover:bg-gray-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                Almacén Logístico
              </button>
            </div>
          </div>

          {/* Botón de cambio de tema */}
          <div className="mb-6">
            <h2
              className={`text-xs font-semibold ${
                darkMode ? "text-gray-400" : "text-gray-500"
              } uppercase tracking-wider mb-3`}
            >
              Apariencia
            </h2>
            <button
              onClick={toggleDarkMode}
              className={`w-full flex items-center px-4 py-2 rounded-md text-sm font-medium ${
                darkMode
                  ? "text-gray-300 hover:bg-gray-700"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {darkMode ? (
                <>
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  Modo Claro
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                  Modo Oscuro
                </>
              )}
            </button>
          </div>
        </div>

        {/* Pie del panel lateral */}
        <div
          className={`p-4 border-t ${
            darkMode ? "border-gray-700" : "border-gray-200"
          } flex-shrink-0`}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p
                className={`text-sm font-medium ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {userEmail}
              </p>
              <p
                className={`text-xs ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Administrador
              </p>
            </div>
            <button
              onClick={handleLogout}
              className={`p-2 ${
                darkMode
                  ? "text-gray-400 hover:text-red-400"
                  : "text-gray-500 hover:text-red-600"
              } transition-colors duration-150`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          </div>
          <p
            className={`text-xs ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {currentTime.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Overlay para cerrar el menú en móvil */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      {/* Contenido Principal - Ahora con padding para el botón de menú en móvil */}
      <div className="flex-1 lg:ml-64 pt-16 lg:pt-0">
        <header
          className={`${
            darkMode ? "bg-gray-800" : "bg-white"
          } shadow-sm fixed lg:fixed top-0 right-0 left-0 lg:left-64 z-30`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-4 flex items-center">
              {/* Espacio para el botón de menú en móvil */}
              <div className="w-10 h-10 lg:hidden"></div>
              <h2
                className={`text-2xl font-bold ${
                  darkMode ? "text-white" : "text-gray-900"
                } flex-1 text-center lg:text-left`}
              >
                {selectedSection === "agricultural"
                  ? "Campo Agrícola"
                  : "Almacén Logístico"}
              </h2>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16 lg:mt-16">
          <SectionStats section={selectedSection} />

          {selectedSection === "agricultural" ? (
            <>
              <div className="space-y-6">
                <div>
                  <SectionHeader
                    title="Invernadero 1"
                    icon={
                      <svg
                        className="w-6 h-6 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                      </svg>
                    }
                  />
                  {expandedSections["Invernadero 1"] && (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                      {sensors
                        .filter(
                          (s) =>
                            s.section === "agricultural" &&
                            s.location === "Invernadero 1"
                        )
                        .map((sensor) => (
                          <SensorCard key={sensor.id} sensor={sensor} />
                        ))}
                    </div>
                  )}
                </div>

                <div>
                  <SectionHeader
                    title="Invernadero 2"
                    icon={
                      <svg
                        className="w-6 h-6 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                      </svg>
                    }
                  />
                  {expandedSections["Invernadero 2"] && (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                      {sensors
                        .filter(
                          (s) =>
                            s.section === "agricultural" &&
                            s.location === "Invernadero 2"
                        )
                        .map((sensor) => (
                          <SensorCard key={sensor.id} sensor={sensor} />
                        ))}
                    </div>
                  )}
                </div>

                <div>
                  <SectionHeader
                    title="Exterior"
                    icon={
                      <svg
                        className="w-6 h-6 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                        />
                      </svg>
                    }
                  />
                  {expandedSections["Exterior"] && (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                      {sensors
                        .filter(
                          (s) =>
                            s.section === "agricultural" &&
                            s.location === "Exterior"
                        )
                        .map((sensor) => (
                          <SensorCard key={sensor.id} sensor={sensor} />
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-6">
                <div>
                  <SectionHeader
                    title="Almacén A"
                    icon={
                      <svg
                        className="w-6 h-6 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                      </svg>
                    }
                  />
                  {expandedSections["Almacén A"] && (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                      {sensors
                        .filter(
                          (s) =>
                            s.section === "logistics" &&
                            s.location === "Almacén A"
                        )
                        .map((sensor) => (
                          <SensorCard key={sensor.id} sensor={sensor} />
                        ))}
                    </div>
                  )}
                </div>

                <div>
                  <SectionHeader
                    title="Almacén B (Refrigerado)"
                    icon={
                      <svg
                        className="w-6 h-6 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                        />
                      </svg>
                    }
                  />
                  {expandedSections["Almacén B (Refrigerado)"] && (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                      {sensors
                        .filter(
                          (s) =>
                            s.section === "logistics" &&
                            s.location === "Almacén B (Refrigerado)"
                        )
                        .map((sensor) => (
                          <SensorCard key={sensor.id} sensor={sensor} />
                        ))}
                    </div>
                  )}
                </div>

                <div>
                  <SectionHeader
                    title="Zona de Carga"
                    icon={
                      <svg
                        className="w-6 h-6 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                        />
                      </svg>
                    }
                  />
                  {expandedSections["Zona de Carga"] && (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                      {sensors
                        .filter(
                          (s) =>
                            s.section === "logistics" &&
                            s.location === "Zona de Carga"
                        )
                        .map((sensor) => (
                          <SensorCard key={sensor.id} sensor={sensor} />
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
