import React from 'react';
import { Users, Clock, Files, FolderOpen } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const progressData = [
  { week: 'Week 1', completed: 65, new: 72 },
  { week: 'Week 2', completed: 82, new: 85 },
  { week: 'Week 3', completed: 90, new: 78 },
  { week: 'Week 4', completed: 85, new: 92 },
];

export const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-full mx-auto px-6 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400">Overview of your post-production workflow</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {[
            { title: 'Active Projects', value: 24, icon: FolderOpen, trend: '+2 from last month', trendColor: 'text-green-500' },
            { title: 'Pending Tasks', value: 145, icon: Clock, trend: '12 due today', trendColor: 'text-gray-400' },
            { title: 'Active Editors', value: 8, icon: Users, trend: '3 currently online', trendColor: 'text-gray-400' },
            { title: 'Files Tracked', value: 578, icon: Files, trend: '+42 this week', trendColor: 'text-green-500' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-gray-800 p-6 rounded-lg w-full">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-gray-400">{stat.title}</h3>
                <stat.icon className="text-gray-400" size={20} />
              </div>
              <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
              <p className={`text-sm ${stat.trendColor}`}>{stat.trend}</p>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Project Progress Chart */}
          <div className="lg:col-span-2 bg-gray-800 p-6 rounded-lg w-full">
            <h2 className="text-lg font-semibold text-white mb-4">Project Progress</h2>
            <div className="h-80">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span className="text-sm text-gray-400">Completed Tasks</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm text-gray-400">New Tasks</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={progressData}
                  margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis
                    dataKey="week"
                    stroke="#9CA3AF"
                    tick={{ fill: '#9CA3AF' }}
                  />
                  <YAxis
                    stroke="#9CA3AF"
                    tick={{ fill: '#9CA3AF' }}
                    domain={[0, 100]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: 'none',
                      borderRadius: '0.375rem',
                      color: '#fff',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="completed"
                    stroke="#10B981"
                    strokeWidth={2}
                    dot={{ fill: '#10B981', strokeWidth: 2 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="new"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    dot={{ fill: '#3B82F6', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Resource Allocation */}
          <div className="bg-gray-800 p-6 rounded-lg w-full">
            <h2 className="text-lg font-semibold text-white mb-4">Resource Allocation</h2>
            <div className="space-y-4">
              {[
                { name: 'Video Editing', percentage: 85 },
                { name: 'Sound Design', percentage: 65 },
                { name: 'Color Grading', percentage: 45 },
                { name: 'Motion Graphics', percentage: 72 },
              ].map((resource, idx) => (
                <div key={idx}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-400">{resource.name}</span>
                    <span className="text-sm text-gray-400">{resource.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${resource.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
