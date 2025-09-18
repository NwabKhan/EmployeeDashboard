import React, { useMemo, useState } from 'react';
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell} from 'recharts';
import { Calendar, TrendingUp, Users, Filter } from 'lucide-react';
import { Loader, DateFilter } from '../ui';

const AttendanceChart = ({ attendanceData }) => {
  const [dateRange, setDateRange] = useState(30);

  const chartData = useMemo(() => {
    if (!attendanceData || attendanceData.length === 0) return null;

    // Get data for selected date range
    const now = new Date();
    const rangeStartDate = new Date(now);
    rangeStartDate.setDate(now.getDate() - dateRange);

    const recentData = attendanceData.filter(record => {
      const recordDate = new Date(record.date);
      return recordDate >= rangeStartDate && recordDate <= now;
    });

    // Sort data by date for proper chronological order
    const sortedData = recentData.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Count attendance by status
    const statusCounts = sortedData.reduce((acc, record) => {
      const status = record.status;
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    // Prepare data for pie chart
    const pieData = Object.entries(statusCounts)
      .filter(([status, count]) => count > 0)
      .map(([status, count]) => ({
        name: status.charAt(0).toUpperCase() + status.slice(1),
        value: count,
        status: status,
        percentage: ((count / sortedData.length) * 100).toFixed(1)
      }));

    const dateMap = new Map();

    // Initialize all dates in range
    for (let d = new Date(rangeStartDate); d <= now; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      dateMap.set(dateStr, {
        date: dateStr,
        present: 0,
        late: 0,
        absent: 0,
        leave: 0,
        weekend: 0
      });
    }

    // Fill in actual data
    sortedData.forEach(record => {
      if (dateMap.has(record.date)) {
        dateMap.get(record.date)[record.status] = 1;
      }
    });


    return {
      pieData,
      totalDays: sortedData.length,
      presentDays: statusCounts.present || 0,
      absentDays: (statusCounts.absent || 0) + (statusCounts.leave || 0),
      lateDays: statusCounts.late || 0,
      dateRange: dateRange,
      startDate: rangeStartDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      endDate: now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    };
  }, [attendanceData, dateRange]);

  if (!attendanceData) {
    return <Loader />;
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'present': return '#10b981'; // green
      case 'late': return '#f59e0b'; // yellow
      case 'absent': return '#ef4444'; // red
      case 'leave': return '#3b82f6'; // blue
      case 'weekend': return '#6b7280'; // gray
      default: return '#9ca3af';
    }
  };

  const attendanceRate = chartData.totalDays > 0 ?
    ((chartData.presentDays / chartData.totalDays) * 100).toFixed(1) : '0.0';

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  console.log("chartDate: ", chartData);
  return (
    <div className="space-y-6">
      {/* Date Range Selector */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Attendance Analytics</h3>
          <p className="text-sm text-gray-600">
            {chartData.startDate} - {chartData.endDate} ({chartData.totalDays} count)
          </p>
        </div>
        <DateFilter value={dateRange} onChange={setDateRange} />
      </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-800">Present Days</p>
              <p className="text-2xl font-bold text-green-900">{chartData.presentDays}</p>
            </div>
            <div className="p-2 bg-green-600 rounded-lg">
              <Users className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4 border border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-800">Absent Days</p>
              <p className="text-2xl font-bold text-red-900">{chartData.absentDays}</p>
            </div>
            <div className="p-2 bg-red-600 rounded-lg">
              <Calendar className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-800">Attendance Rate</p>
              <p className="text-2xl font-bold text-blue-900">{attendanceRate}%</p>
            </div>
            <div className="p-2 bg-blue-600 rounded-lg">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="grid grid-cols-1">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            Attendance Distribution ({dateRange} Days)
          </h4>
          {chartData?.pieData?.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData.pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value, percentage }) => `${name}: ${value} (${percentage}%)`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getStatusColor(entry.status)} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-gray-500">
              No data available for the selected period
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceChart;
