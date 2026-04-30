export enum TelemetryType {
  METRIC = "METRIC",
  LOG = "LOG",
  TRACE = "TRACE",
  EVENT = "EVENT",
  BUSINESS = "BUSINESS"
}

export enum CorrelationStatus {
  PENDING = "PENDING",
  CORRELATED = "CORRELATED",
  NO_MATCH = "NO_MATCH",
  ERROR = "ERROR"
}

export interface TelemetrySignal {
  id: string;
  type: TelemetryType;
  timestamp: string;
  sourceSystem: string;
  serviceName: string;
  attributes: Record<string, any>;
}

export interface TraceData extends TelemetrySignal {
  type: TelemetryType.TRACE;
  traceId: string;
  spanId: string;
  parentSpanId?: string;
  durationMs: number;
  statusCode: number;
}

export interface MetricData extends TelemetrySignal {
  type: TelemetryType.METRIC;
  metricName: string;
  value: number;
  unit: string;
  labels: Record<string, string>;
}

export interface LogData extends TelemetrySignal {
  type: TelemetryType.LOG;
  level: "INFO" | "WARN" | "ERROR" | "DEBUG" | "FATAL";
  message: string;
  traceId?: string; // Crucial for correlation
}

export interface CorrelatedIncident {
  id: string;
  title: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  detectedAt: string;
  rootCauseService?: string;
  signals: string[]; // Array of TelemetrySignal IDs
  status: "OPEN" | "INVESTIGATING" | "RESOLVED";
}

export interface SuperstoreKPIs {
  totalIngestedBytes: number;
  signalsProcessedPerSecond: number;
  activeCorrelatedIncidents: number;
  averageCorrelationLatencyMs: number;
  sloBreachesLast24h: number;
}
