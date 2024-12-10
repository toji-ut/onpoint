'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../../../lib/supabaseClient';
import { useRouter } from 'next/navigation';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'normal', // Default role is 'normal'
    password: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Fetch users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from('users').select('*');

      if (error) {
        console.error('Error fetching users:', error);
        setError('Error fetching users');
        setLoading(false);
        return;
      }

      setUsers(data);
      setLoading(false);
    };

    fetchUsers();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  // Create new user
  const handleCreateUser = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Use supabase.auth.signUp to create the user
      const { user, error: signUpError } = await supabase.auth.signUp({
        email: newUser.email,
        password: newUser.password,
      });

      // Log the full response
      console.log("SignUp Response:", { user, signUpError });

      // Handle any error during sign-up
      if (signUpError) {
        console.error('Sign-up Error:', signUpError.message);
        setError('Sign-up failed: ' + signUpError.message);
        return; // Return early if sign-up fails
      }

      console.log('User created:', user);

      // Step 2: Insert the user details into the 'users' table
      const { error: insertError } = await supabase.from('users').insert([
        {
          name: newUser.name,
          email: newUser.email,
          role: newUser.role, // Assign the role (admin or normal)
          password: newUser.password,
        },
      ]);

      // Handle any error during insert
      if (insertError) {
        console.error('Insert Error:', insertError.message);
        setError('Error inserting user into the database: ' + insertError.message);
        return;
      }

      // Step 3: If successful, fetch the updated list of users and reset the form
      fetchUsers();
      setNewUser({ name: '', email: '', role: 'normal', password: '' });
      setError(null); // Clear any previous errors

    } catch (err) {
      console.error('Error creating user:', err);
      setError('Error creating user: ' + err.message);
    }
  };

  // Fetch users from the 'users' table
  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase.from('users').select('*');
      if (error) throw error;
      setUsers(data);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Error fetching users.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">User Management</h2>

      {/* Create New User Form */}
      <div className="mb-6">
        <h3 className="text-xl font-medium">Create New User</h3>
        <form onSubmit={handleCreateUser} className="space-y-4">
          <div>
            <label className="block font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={newUser.name}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={newUser.password}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Role</label>
            <select
              name="role"
              value={newUser.role}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded p-2"
            >
              <option value="normal">Normal</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            Create User
          </button>
        </form>
      </div>

      {/* User List */}
      <h3 className="text-xl font-medium mb-4">All Users</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border border-gray-300 text-left">ID</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Name</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Email</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-gray-200">
                <td className="px-4 py-2 border border-gray-300">{user.id}</td>
                <td className="px-4 py-2 border border-gray-300">{user.name}</td>
                <td className="px-4 py-2 border border-gray-300">{user.email}</td>
                <td className="px-4 py-2 border border-gray-300">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
