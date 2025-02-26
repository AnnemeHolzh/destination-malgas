"use client";

import { useEffect, useState } from 'react';
import { ref, query, orderByChild, onValue } from "firebase/database";
import { database } from "../../../Firebase/firebaseConfig";
import type { ErrorLog } from "../../../DataModels/ErrorLog";
import { formatDistanceToNow } from 'date-fns';

export default function ErrorLogs() {
  const [errorLogs, setErrorLogs] = useState<ErrorLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const errorRef = query(ref(database, 'errorLogs'), orderByChild('timestamp'));
    
    const unsubscribe = onValue(errorRef, (snapshot) => {
      const logs: ErrorLog[] = [];
      snapshot.forEach((childSnapshot) => {
        logs.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      setErrorLogs(logs.reverse()); // Show newest first
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const groupErrorsByTime = (logs: ErrorLog[]) => {
    const now = Date.now();
    return {
      lastHour: logs.filter(log => now - log.timestamp < 3600000),
      lastDay: logs.filter(log => now - log.timestamp < 86400000 && now - log.timestamp >= 3600000),
      lastWeek: logs.filter(log => now - log.timestamp < 604800000 && now - log.timestamp >= 86400000),
      older: logs.filter(log => now - log.timestamp >= 604800000)
    };
  };

  const groupedErrors = groupErrorsByTime(errorLogs);

  if (loading) {
    return <div className="p-4">Loading error logs...</div>;
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Error Logs</h2>
      
      <ErrorGroup title="Last Hour" logs={groupedErrors.lastHour} />
      <ErrorGroup title="Last 24 Hours" logs={groupedErrors.lastDay} />
      <ErrorGroup title="Last Week" logs={groupedErrors.lastWeek} />
      <ErrorGroup title="Older" logs={groupedErrors.older} />
    </div>
  );
}

function ErrorGroup({ title, logs }: { title: string; logs: ErrorLog[] }) {
  if (logs.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{title} ({logs.length})</h3>
      <div className="space-y-2">
        {logs.map((log) => (
          <div key={log.id} className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-red-600">{log.errorMessage}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {formatDistanceToNow(log.timestamp)} ago · {log.location}
                  {log.userId && ` · User: ${log.userId}`}
                </p>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(log.timestamp).toLocaleString()}
              </span>
            </div>
            {log.stackTrace && (
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer text-gray-600">Stack trace</summary>
                <pre className="whitespace-pre-wrap mt-1 p-2 bg-gray-50 rounded">
                  {log.stackTrace}
                </pre>
              </details>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 