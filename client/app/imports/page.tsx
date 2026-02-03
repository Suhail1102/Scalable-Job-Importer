'use client';

import { useEffect, useState } from 'react';

export default function ImportHistoryPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://scalable-job-importer-wonz.onrender.com/api/import-logs')
      .then(res => res.json())
      .then(data => setLogs(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-2xl font-semibold mb-6">Import History</h1>

      {loading ? (
        <p className="text-gray-500">Loading import history...</p>
      ) : logs.length === 0 ? (
        <p className="text-gray-500">No imports found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3 text-left">Feed URL</th>
                <th className="px-4 py-3 text-left">Imported At</th>
                <th className="px-4 py-3 text-center">Total</th>
                <th className="px-4 py-3 text-center">New</th>
                <th className="px-4 py-3 text-center">Updated</th>
                <th className="px-4 py-3 text-center">Failed</th>
              </tr>
            </thead>

            <tbody>
              {logs.map(log => (
                <tr
                  key={log._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 w-20 truncate">
                    {log.fileName}
                  </td>
                  <td className="px-4 py-3">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {log.totalFetched}
                  </td>
                  <td className="px-4 py-3 text-center text-green-600 font-medium">
                    {log.newJobs}
                  </td>
                  <td className="px-4 py-3 text-center text-blue-600 font-medium">
                    {log.updatedJobs}
                  </td>
                  <td className="px-4 py-3 text-center text-red-600 font-medium">
                    {log.failedJobs.length}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
