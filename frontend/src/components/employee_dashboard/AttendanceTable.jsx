import React, { useMemo, useState } from 'react';
import { Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { DateFilter } from '../ui';


const PAGE_SIZE_OPTIONS = [5, 10, 15, 20, 30];

const AttendanceTable = ({ attendanceData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [datePreset, setDatePreset] = useState('30');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (timeString) => (timeString ? timeString : '-');

  const formatTotalHours = (minutes) => {
    if (!minutes) return '-';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const applyDatePreset = (records) => {
    if (datePreset === 'all') return records;

    const now = new Date();
    const days = parseInt(datePreset, 10);
    const fromDate = new Date(now);
    fromDate.setDate(now.getDate() - days);

    return records.filter((r) => new Date(r.date) >= fromDate);
  };

  const filteredSorted = useMemo(() => {
    if (!attendanceData) return [];

    // date, search, status, checkIn, checkOut
    let list = attendanceData.filter((r) => {
      const search = searchTerm.trim().toLowerCase();
      const matchesSearch =
        search === '' ||
        formatDate(r.date).toLowerCase().includes(search) ||
        (r.status || '').toLowerCase().includes(search) ||
        (r.checkIn || '').toLowerCase().includes(search) ||
        (r.checkOut || '').toLowerCase().includes(search);

      const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    // date preset
    list = applyDatePreset(list);

    // sorting
    list.sort((a, b) => {
      let aVal, bVal;
      switch (sortBy) {
        case 'date':
          aVal = new Date(a.date).getTime();
          bVal = new Date(b.date).getTime();
          break;
        case 'totalMinutes':
          aVal = a.totalMinutes;
          bVal = b.totalMinutes;
          break;
        case 'status':
          aVal = a.status || '';
          bVal = b.status || '';
          break;
        default:
          aVal = new Date(a.date).getTime();
          bVal = new Date(b.date).getTime();
      }
      if (aVal === bVal) return 0;
      return sortOrder === 'asc' ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1);
    });

    return list;
  }, [attendanceData, searchTerm, statusFilter, datePreset, sortBy, sortOrder]);

  // pagination
  const totalItems = filteredSorted.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return filteredSorted.slice(start, end);
  }, [filteredSorted, currentPage, pageSize]);

  const goToPage = (p) => setPage(Math.max(1, Math.min(totalPages, p)));

  // reset to page 1 on filter/sort changes
  React.useEffect(() => {
    setPage(1);
  }, [searchTerm, statusFilter, datePreset, sortBy, pageSize]);

  if (!attendanceData) {
    return (
      "No Data Found"
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by date, status, or time..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>

        {/* Status Filter */}
        <div className="relative sm:w-40">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full pl-9 pr-8 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm appearance-none bg-white"
          >
            <option value="all">All Status</option>
            <option value="present">Present</option>
            <option value="late">Late</option>
            <option value="absent">Absent</option>
            <option value="leave">Leave</option>
            <option value="weekend">Weekend</option>
          </select>
        </div>

        <DateFilter
          value={datePreset}
          onChange={setDatePreset}
          className="sm:w-40"
        />
      </div>

      {/* Attendence Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                onClick={() => handleSort('date')}
                className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer select-none"
              >
                <div className="flex items-center">
                  Date {sortBy === 'date' && <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Check In</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Check Out</th>
              <th
                onClick={() => handleSort('totalMinutes')}
                className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer select-none"
              >
                <div className="flex items-center">
                  Total Hours {sortBy === 'totalMinutes' && <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>}
                </div>
              </th>
              <th
                onClick={() => handleSort('status')}
                className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer select-none"
              >
                <div className="flex items-center">
                  Status {sortBy === 'status' && <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {paginated.map((r, idx) => (
              <tr key={`${r.date}-${idx}`} className="hover:bg-gray-50">
                <td className="px-6 py-3 text-sm text-gray-900">{formatDate(r.date)}</td>
                <td className="px-6 py-3 text-sm text-gray-700">{formatTime(r.checkIn)}</td>
                <td className="px-6 py-3 text-sm text-gray-700">{formatTime(r.checkOut)}</td>
                <td className="px-6 py-3 text-sm text-gray-900">{formatTotalHours(r.totalMinutes)}</td>
                <td className="px-6 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${r.status === 'present'
                      ? 'bg-green-100 text-green-800'
                      : r.status === 'late'
                        ? 'bg-yellow-100 text-yellow-800'
                        : r.status === 'absent'
                          ? 'bg-red-100 text-red-800'
                          : r.status === 'leave'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-700'
                      }`}
                  >
                    {r.status?.charAt(0).toUpperCase() + r.status?.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="text-sm text-gray-600">
          Showing {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, totalItems)} of {totalItems} records
        </div>
        <div className="flex items-center gap-2">
          <select
            value={pageSize}
            onChange={(e) => setPageSize(parseInt(e.target.value))}
            className="text-sm border border-gray-300 rounded-md px-2 py-2 bg-white"
          >
            {PAGE_SIZE_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {n} / page
              </option>
            ))}
          </select>

          <div className="flex items-center gap-1">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-2 py-2 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50 disabled:opacity-50"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2 text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-2 py-2 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50 disabled:opacity-50"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceTable;
