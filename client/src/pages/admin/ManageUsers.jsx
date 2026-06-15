import React, { useEffect, useState } from 'react';
import { FiTrash2, FiShield } from 'react-icons/fi';
import { getAdminUsersAPI, deleteAdminUserAPI } from '../../api/adminAPI';
import { useAuth } from '../../context/AuthContext';
import Loader from '../../components/Loader';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user: currentUser } = useAuth();

  useEffect(() => { getAdminUsersAPI().then(setUsers).catch(console.error).finally(() => setLoading(false)); }, []);

  const handleDelete = async (id) => {
    if (id === currentUser?._id) { alert("You can't delete your own account!"); return; }
    if (!window.confirm('Delete this user permanently?')) return;
    await deleteAdminUserAPI(id);
    setUsers(users.filter(u => u._id !== id));
  };

  return (
    <div>
      <div className="admin-header">
        <h1>👥 Users</h1>
        <div style={{ fontSize:'.875rem', color:'var(--text-secondary)' }}>{users.length} registered users</div>
      </div>
      {loading ? <Loader /> : users.length === 0 ? (
        <div className="empty-state"><div className="empty-icon">👤</div><h3 className="empty-title">No Users Found</h3></div>
      ) : (
        <div className="table-wrapper">
          <table className="data-table">
            <thead><tr><th>Avatar</th><th>Name</th><th>Email</th><th>Role</th><th>Joined</th><th>Actions</th></tr></thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id}>
                  <td>
                    <div style={{ width:36, height:36, background:'var(--gradient-primary)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:700, fontSize:'.875rem' }}>
                      {u.name.charAt(0).toUpperCase()}
                    </div>
                  </td>
                  <td style={{ color:'var(--text-primary)', fontWeight:500 }}>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    {u.isAdmin
                      ? <span className="badge badge-primary"><FiShield size={10} style={{marginRight:3}} />Admin</span>
                      : <span className="badge badge-info">User</span>
                    }
                  </td>
                  <td>{new Date(u.createdAt).toLocaleDateString('en-IN')}</td>
                  <td>
                    {u._id !== currentUser?._id && (
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(u._id)}><FiTrash2 size={13} /> Delete</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
