import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import SuperstoreDashboard from './pages/SuperstoreDashboard';

const Placeholder = ({ name }: { name: string }) => (
  <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
    <h2 className="text-xl font-bold text-white mb-2">{name}</h2>
    <p className="text-slate-400">The Observability Superstore is currently processing high-volume telemetry via Kafka and OpenTelemetry Collector. This dashboard will render once the current batch of metrics and logs are indexed.</p>
  </div>
);

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<SuperstoreDashboard />} />
          <Route path="/metrics" element={<Placeholder name="PromQL Metrics Explorer" />} />
          <Route path="/logs" element={<Placeholder name="LogQL Search Analytics" />} />
          <Route path="/traces" element={<Placeholder name="Distributed Trace Visualization" />} />
          <Route path="/events" element={<Placeholder name="Real-time Event Streams (Kafka)" />} />
          <Route path="/correlations" element={<Placeholder name="Cross-Telemetry Incident Correlation" />} />
          <Route path="/alerts" element={<Placeholder name="Alerts, Anomalies, & SLO Tracking" />} />
          <Route path="/settings" element={<Placeholder name="Data Lake & Retention Policies" />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;
