// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Chart from './Chart';
// import { Container, Row, Col, Table, Alert, Form, Button, Card } from 'react-bootstrap';

// function AdminDashboard() {
//     const [users, setUsers] = useState([]);
//     const [filteredUsers, setFilteredUsers] = useState([]);
//     const [error, setError] = useState('');
//     const [showChart, setShowChart] = useState(false);
//     const [searchTerm, setSearchTerm] = useState('');

//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const token = localStorage.getItem('token'); // Retrieve token from localStorage
//                 console.log('Token:', token); // Ensure this is the correct token

//                 if (!token) {
//                     throw new Error('No token found');
//                 }

//                 const response = await axios.get('https://loginsignup-ht65.onrender.com/api/auth/users', {
//                     headers: { Authorization: `Bearer ${token}` }, // Attach token to the request headers
//                 });

//                 setUsers(response.data);
//                 setFilteredUsers(response.data);
//             } catch (error) {
//                 console.error('Error fetching users', error);
//                 setError('Failed to fetch users. Please ensure you are logged in as an admin.');
//             }
//         };

//         fetchUsers();
//     }, []);

//     useEffect(() => {
//         // Filter users based on search term
//         const results = users.filter(user =>
//             user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             user.email.toLowerCase().includes(searchTerm.toLowerCase())
//         );
//         setFilteredUsers(results);
//     }, [searchTerm, users]);

//     const handleSearchChange = (e) => {
//         setSearchTerm(e.target.value);
//     };

//     const handleToggleChart = () => {
//         setShowChart(!showChart);
//     };

//     const totalUserCount = filteredUsers.length;
//     const totalClickCount = filteredUsers.reduce((sum, user) => sum + user.count, 0);

//     return (
//         <Container className="my-4">
//             <Row className="mb-4">
//                 <Col md={12} lg={4}>
//                     <Card className="mb-4">
//                         <Card.Body>
//                             <Card.Title>Total Users</Card.Title>
//                             <Card.Text>
//                                 {totalUserCount}
//                             </Card.Text>
//                         </Card.Body>
//                     </Card>
//                 </Col>
//                 <Col md={12} lg={4}>
//                     <Card className="mb-4">
//                         <Card.Body>
//                             <Card.Title>Total Clicks</Card.Title>
//                             <Card.Text>
//                                 {totalClickCount}
//                             </Card.Text>
//                         </Card.Body>
//                     </Card>
//                 </Col>
//                 <Col md={12} lg={4}>
//                     <Card className="mb-4">
//                         <Card.Body>
//                             <h2 className="mb-4">Admin Dashboard</h2>
//                             {error && <Alert variant="danger">{error}</Alert>}
//                             <Form className="mb-4">
//                                 <Form.Group controlId="search">
//                                     <Form.Control
//                                         type="text"
//                                         placeholder="Search by name or email"
//                                         value={searchTerm}
//                                         onChange={handleSearchChange}
//                                     />
//                                 </Form.Group>
//                                 <Button className="mt-2" onClick={handleToggleChart}>
//                                     {showChart ? 'Hide Chart' : 'Show Chart'}
//                                 </Button>
//                             </Form>
//                         </Card.Body>
//                     </Card>
//                 </Col>
//             </Row>
//             <Row>
//                 <Col>
//                     <div className="table-responsive">
//                         <Table striped bordered hover variant="light">
//                             <thead>
//                                 <tr>
//                                     <th>Name</th>
//                                     <th>Email</th>
//                                     <th>Count</th>
//                                     <th>Gender</th>
//                                     <th>Last Login Date</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {filteredUsers.map((user, index) => (
//                                     <tr key={index}>
//                                         <td>{user.name}</td>
//                                         <td>{user.email}</td>
//                                         <td>{user.count}</td>
//                                         <td>{user.gender}</td>
//                                         <td>{new Date(user.lastLogin).toLocaleString()}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </Table>
//                     </div>
//                     {showChart && <Chart users={filteredUsers} />}
//                 </Col>
//             </Row>
//         </Container>
//     );
// }

// export default AdminDashboard;


// AdminDashboard.jsx
// AdminDashboard.jsx
// AdminDashboard.jsx
// AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import axios from 'axios';
import { Container, Row, Col, Table, Alert, Form, Button, Card } from 'react-bootstrap';
import './AdminDashboard.css'; // Import custom CSS

function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate(); // Initialize useNavigate hook

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token'); // Retrieve token from localStorage
                if (!token) {
                    throw new Error('No token found');
                }

                const response = await axios.get('https://loginsignup-ht65.onrender.com/api/auth/users', {
                    headers: { Authorization: `Bearer ${token}` }, // Attach token to the request headers
                });

                setUsers(response.data);
                setFilteredUsers(response.data);
            } catch (error) {
                console.error('Error fetching users', error);
                setError('Failed to fetch users. Please ensure you are logged in as an admin.');
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        // Filter users based on search term
        const results = users.filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(results);
    }, [searchTerm, users]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const totalUserCount = filteredUsers.length;
    const totalClickCount = filteredUsers.reduce((sum, user) => sum + user.count, 0);

    const handleShowChart = () => {
        navigate('/chart'); // Navigate to ChartPage
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from localStorage
        navigate('/'); // Redirect to login page
    };

    return (
        <Container className="my-4">
            <h2 className="mb-4">Admin Dashboard</h2>
            <Row className="mb-4">
                <Col className="d-flex justify-content-end mb-3">
                    <Button variant="danger" className='logout' onClick={handleLogout}>
                        Logout
                    </Button>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col md={12} lg={2} className="no-border">
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>Total Users</Card.Title>
                            <Card.Text>
                                {totalUserCount}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={12} lg={2} className="no-border">
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>Total Clicks</Card.Title>
                            <Card.Text>
                                {totalClickCount}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={12} lg={6} className="no-border">
                    
                        
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form className="mb-4 d-flex align-items-center">
                                <Form.Group controlId="search" className="mb-0 flex-grow-1">
                                    <Form.Control
                                        type="text"
                                        placeholder="Search by name or email"
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                        className="search-box"
                                    />
                                </Form.Group>
                                
                            </Form>
                        
                    <Button className="ml-2 show" onClick={handleShowChart}>
                                    Show Chart  </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="table-responsive">
                        <Table striped bordered hover variant="light">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Count</th>
                                    <th>Gender</th>
                                    <th>Last Login Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user, index) => (
                                    <tr key={index}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.count}</td>
                                        <td>{user.gender}</td>
                                        <td>{new Date(user.lastLogin).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default AdminDashboard;

