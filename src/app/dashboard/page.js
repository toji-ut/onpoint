'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { useRouter } from 'next/navigation';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null); // Store user role
  const router = useRouter();

  useEffect(() => {
    const checkUserAndFetchTickets = async () => {
      // Check if user is in localStorage
      const user = JSON.parse(localStorage.getItem('user'));

      if (!user) {
        // If no user is found, redirect to the login page
        router.push('/');
        return;
      }

      try {
        // Fetch the user role (assuming the role is stored in the user table)
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .single();

        if (userError) throw userError;

        setUserRole(userData.role); // Set the user role

        // Fetch tickets where status is "open"
        const { data, error } = await supabase
          .from('tickets')
          .select('*')
          .eq('status', 'open');

        if (error) throw error;

        setTickets(data); // Save the tickets to the state
        setLoading(false);
      } catch (err) {
        console.error("Error fetching tickets:", err);
        setError("Error fetching tickets.");
        setLoading(false);
      }
    };

    checkUserAndFetchTickets();
  }, [router]); // Run this on component mount

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

    <h2 className="text-xl font-semibold mb-4">Open Tickets</h2>    
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
