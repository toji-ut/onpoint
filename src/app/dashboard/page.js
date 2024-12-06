'use client';

import { useEffect, useState } from 'react';
// import { supabase } from '../lib/supabase'; 
export default function TicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

//chatgpt generated, i havent gotten this far yet
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const { data, error } = await supabase.from('tickets').select('*');
        if (error) {
          console.error('Error fetching tickets:', error);
        } else {
          setTickets(data);
        }
      } catch (error) {
        console.error('Unexpected error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tickets</h1>
      {loading ? (
        <p>Loading tickets...</p>
      ) : tickets.length === 0 ? (
        <p>No tickets found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Created At</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="border-t">
                  <td className="px-4 py-2">{ticket.id}</td>
                  <td className="px-4 py-2">{ticket.title}</td>
                  <td className="px-4 py-2">{ticket.status}</td>
                  <td className="px-4 py-2">
                    {new Date(ticket.created_at).toLocaleDateString()}
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
