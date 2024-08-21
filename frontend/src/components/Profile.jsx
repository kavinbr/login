import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function Profile() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/'); // Redirect to homepage after logout
    };

    if (!user) {
        return <p className="text-center mt-5">No user data available</p>;
    }

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card shadow-lg p-4" style={{ width: '400px', height: 'auto' }}>
                <div className="card-body">
                    <h2 className="card-title text-center mb-4">Profile Page</h2>
                    <div className="row mb-3">
                        <div className="col-12">
                            <p><strong>Name:</strong> {user.name}</p>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-12">
                            <p><strong>Email:</strong> {user.email}</p>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-12">
                            <p><strong>Gender:</strong> {user.gender}</p>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-12">
                            <p><strong>Login Count:</strong> {user.count}</p>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-12">
                            <p><strong>Last Login:</strong> {new Date(user.lastLogin).toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="text-center">
                        <button onClick={handleLogout} className="btn btn-danger btn-block">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
