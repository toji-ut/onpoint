'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { useRouter } from 'next/navigation';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  useEffect(() => {
    const checkUserAndFetchTickets = async () => {
      const user = JSON.parse(localStorage.getItem('user'));

      if (!user) {
        router.push('/');
        return;
      }

      try {
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .single();

        if (userError) throw userError;

        setUserRole(userData.role);

        const { data, error } = await supabase
          .from('tickets')
          .select('*')
          .eq('status', 'open');

        if (error) throw error;

        setTickets(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching tickets:", err);
        setError("Error fetching tickets.");
        setLoading(false);
      }
    };

    checkUserAndFetchTickets();
  }, [router]);

  const handleSearch = async () => {
    if (!searchValue.trim()) return;

    try {
      const { data: ticket, error } = await supabase
        .from('tickets')
        .select('*')
        .eq('id', searchValue.trim())
        .single();

      if (error || !ticket) {
        alert('Ticket not found.');
        return;
      }

      window.open(`/dashboard/tickets/${ticket.id}`, '_blank');
    } catch (err) {
      alert('Error searching for ticket.');
      console.error("Error searching for ticket:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      {userRole === 'admin' && (
        <button
          onClick={() => router.push('/dashboard/users')}
          className="bg-white text-black px-6 py-3 rounded-lg border-2 border-black mb-4 hover:bg-gray-100 transition duration-300 mb-10"
        >
          Manage Users
        </button>
      )}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by Ticket ID"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="border border-gray-300 rounded p-2 mr-2"
        />
        <button
          onClick={handleSearch}
          className="bg-white text-black px-4 py-2 rounded border border-black hover:bg-gray-100"
        >
          Search
        </button>

      </div>
      {tickets && tickets.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border border-gray-300 text-left">ID</th>
                <th className="px-4 py-2 border border-gray-300 text-left">Title</th>
                <th className="px-4 py-2 border border-gray-300 text-left">Description</th>
                <th className="px-4 py-2 border border-gray-300 text-left">Priority</th>
                <th className="px-4 py-2 border border-gray-300 text-left">Status</th>
                <th className="px-4 py-2 border border-gray-300 text-left">Created At</th>
                <th className="px-4 py-2 border border-gray-300 text-left">Last Updated</th>
                <th className="px-4 py-2 border border-gray-300 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="border-b border-gray-200">
                  <td className="px-4 py-2 border border-gray-300">{ticket.id}</td>
                  <td className="px-4 py-2 border border-gray-300">{ticket.title}</td>
                  <td className="px-4 py-2 border border-gray-300">{ticket.description}</td>
                  <td className="px-4 py-2 border border-gray-300">{ticket.priority}</td>
                  <td className="px-4 py-2 border border-gray-300">{ticket.status}</td>
                  <td className="px-4 py-2 border border-gray-300">
                    {new Date(ticket.created_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {ticket.updated_at
                      ? new Date(ticket.updated_at).toLocaleString()
                      : 'Not Updated'}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    <button
                      onClick={() => window.open(`/dashboard/tickets/${ticket.id}`, '_blank')}
                      className="bg-white text-black px-2 py-1 rounded border border-black hover:bg-gray-100"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No open tickets found</p>
      )}
    </div>
  );
};

export default TicketList;
