'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '../../../../../lib/supabaseClient';

const TicketDetails = () => {
  const params = useParams();
  const ticketId = params.id;
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: '',
    priority: '',
    assigned: '',
    user_id: '',
    updated_at: '',
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: ticketData, error: ticketError } = await supabase
          .from('tickets')
          .select('*')
          .eq('id', ticketId)
          .single();

        if (ticketError) throw ticketError;

        setTicket(ticketData);

        setFormData({
          title: ticketData.title,
          description: ticketData.description,
          status: ticketData.status,
          priority: ticketData.priority,
          assigned: ticketData.assigned,
          user_id: ticketData.user_id,
          updated_at: new Date().toISOString(),
        });

        const { data: usersData, error: usersError } = await supabase
          .from('users')
          .select('id, email');

        if (usersError) throw usersError;

        setUsers(usersData);
        setLoading(false);
      } catch (err) {
        setError('Error fetching ticket or user data.');
        setLoading(false);
      }
    };

    fetchData();
  }, [ticketId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from('tickets')
        .update({
          ...formData,
          updated_at: new Date().toISOString(),
        })
        .eq('id', ticketId);

      if (error) throw error;

      setTicket({ ...ticket, ...formData });
      setEditMode(false);
    } catch (err) {
      setError('Error updating ticket.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">
        {editMode ? 'Edit Ticket' : 'Ticket Details'}
      </h2>

      {editMode ? (
        <div className="grid gap-4">
          <div>
            <label className="block font-medium mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded p-2"
            >
              <option value="open">Open</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
          <div>
            <label className="block font-medium mb-2">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded p-2"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div>
            <label className="block font-medium mb-2">Assigned</label>
            <select
              name="assigned"
              value={formData.assigned}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded p-2"
            >
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.email}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium mb-2">User</label>
            <select
              name="user_id"
              value={formData.user_id}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded p-2"
            >
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.email}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
          <button
            onClick={() => setEditMode(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded mt-2"
          >
            Cancel
          </button>
        </div>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-medium">Title</td>
              <td className="border border-gray-300 px-4 py-2">{ticket.title}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-medium">Description</td>
              <td className="border border-gray-300 px-4 py-2">{ticket.description}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-medium">Status</td>
              <td className="border border-gray-300 px-4 py-2">{ticket.status}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-medium">Priority</td>
              <td className="border border-gray-300 px-4 py-2">{ticket.priority}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-medium">Assigned</td>
              <td className="border border-gray-300 px-4 py-2">
                {users.find((user) => user.id === ticket.assigned)?.email || 'Unknown'}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-medium">User</td>
              <td className="border border-gray-300 px-4 py-2">
                {users.find((user) => user.id === ticket.user_id)?.email || 'Unknown'}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-medium">Created At</td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(ticket.created_at).toLocaleString()}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-medium">Updated At</td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(ticket.updated_at).toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      )}
      {!editMode && (
        <button
          onClick={() => setEditMode(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Edit Ticket
        </button>
      )}
    </div>
  );
};

export default TicketDetails;
