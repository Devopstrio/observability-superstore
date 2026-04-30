import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, Cell, PieChart, Pie, LineChart, Line, ComposedChart
} from 'recharts';
import { 
  Activity,
  AlertTriangle,
  GitMerge,
  AlignLeft,
  Server,
  Zap,
  Box,
  Workflow,
  CheckCircle2,
  Cpu
} from 'lucide-react';

const ingestionData = [
  { time: '10:00', metrics: 4000, logs: 2400, traces: 2400 },
  { time: '10:05', metrics: 3000, logs: 1398, traces: 2210 },
  { time: '10:10', metrics: 2000, logs: 9800, traces: 2290 }, // Spike in logs
  { time: '10:15', metrics: 2780, logs: 3908, traces: 2000 },
  { time: '10:20', metrics: 1890, logs: 4800, traces: 2181 },
  { time: '10:25', metrics: 2390, logs: 3800, traces: 2500 },
  { time: '10:30', metrics: 3490, logs: 4300, traces: 2100 },
];

const telemetryDistribution = [
  { name: 'Metrics (Prometheus)', value: 45, color: '#6366f1' }, // Indigo
  { name: 'Logs (Loki)', value: 35, color: '#d946ef' }, // Fuchsia
  { name: 'Traces (Tempo)', value: 15, color: '#8b5cf6' }, // Purple
  { name: 'Events (Kafka)', value: 5, color: '#3b82f6' }, // Blue
];

const KPI_CARDS = [
  { title: 'Total Ingestion Rate', value: '4.2 GB/s', trend: '+12% vs last hr', color: 'indigo', icon: Activity },
  { title: 'Active Traces', value: '1.2M/min', trend: 'P99 Latency: 42ms', color: 'fuchsia', icon: GitMerge },
  { title: 'Correlated Incidents', value: '3', trend: '2 Critical, 1 High', color: 'rose', icon: Workflow },
  { title: 'SLO Violations', value: '0', trend: 'Global Error Budget: 94%', color: 'emerald', icon: CheckCircle2 },
];

const SuperstoreDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Observability Superstore Overview</h1>
          <p className="text-slate-400">Unified telemetry ingestion, correlation, and analysis engine.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
            Query Builder
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
            Analyze Correlated Incidents
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {KPI_CARDS.map((card) => (
          <div key={card.title} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative group hover:border-slate-700 transition-all">
            <div className="flex justify-between items-start">
              <div className={`p-2 bg-${card.color}-600/10 rounded-lg`}>
                <card.icon className={`w-6 h-6 text-${card.color}-400`} />
              </div>
              <div className={`text-xs font-medium text-slate-400`}>
                {card.trend}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-slate-500 font-medium">{card.title}</p>
              <p className="text-3xl font-bold text-white mt-1">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Unified Ingestion Stream */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-6">Unified Telemetry Ingestion Rate (Events/sec)</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ingestionData}>
                <defs>
                  <linearGradient id="colorLogs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d946ef" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#d946ef" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorMetrics" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="logs" stackId="1" stroke="#d946ef" fill="url(#colorLogs)" name="Logs (Loki)" />
                <Area type="monotone" dataKey="metrics" stackId="1" stroke="#6366f1" fill="url(#colorMetrics)" name="Metrics (Prometheus)" />
                <Area type="monotone" dataKey="traces" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.5} name="Traces (Tempo)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Telemetry Distribution */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-6">Data Volume Distribution</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={telemetryDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {telemetryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {telemetryDistribution.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-slate-400">{item.name}</span>
                </div>
                <span className="text-sm font-bold text-white">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Correlated Incidents Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Active Correlated Incidents (Cross-Telemetry)</h3>
          <button className="text-fuchsia-400 hover:text-fuchsia-300 text-sm font-medium">View All Incidents</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Incident ID</th>
                <th className="px-6 py-4 font-semibold">Root Cause Service</th>
                <th className="px-6 py-4 font-semibold">Correlated Signals</th>
                <th className="px-6 py-4 font-semibold">Severity</th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {[
                { id: 'INC-8492', service: 'payment-gateway', signals: 'High CPU (Metric) + NullPointerException (Log) + Failed Checkout (Trace)', severity: 'Critical', status: 'Investigating' },
                { id: 'INC-8493', service: 'auth-service', signals: '500 Errors (Metric) + DB Timeout (Trace)', severity: 'Critical', status: 'Open' },
                { id: 'INC-8491', service: 'inventory-worker', signals: 'Kafka Lag (Metric) + OOMKilled (Event)', severity: 'High', status: 'Investigating' },
              ].map((inc, i) => (
                <tr key={i} className="hover:bg-slate-800/50 transition-all group">
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-white">{inc.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-300">{inc.service}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400 max-w-md truncate">{inc.signals}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                      inc.severity === 'Critical' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                      inc.severity === 'High' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                      'bg-slate-800 text-slate-300'
                    }`}>
                      {inc.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-bold ${inc.status === 'Open' ? 'text-rose-500' : 'text-amber-500'}`}>
                      {inc.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SuperstoreDashboard;
