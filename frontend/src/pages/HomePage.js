import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function HomePage() {
    return (
        <div className="container text-center mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="jumbotron bg-primary text-white shadow-lg p-4 rounded">
                        <h2 className="display-4">Welcome to the User Dashboard</h2>
                        <p className="lead">Sign up or log in to access your account and explore our services.</p>
                        <hr className="my-4" />
                        <div className="d-flex justify-content-around mt-4">
                            <Link to="/signup" className="btn btn-outline-light btn-lg">
                                Sign Up
                            </Link>
                            <Link to="/login" className="btn btn-light btn-lg">
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
