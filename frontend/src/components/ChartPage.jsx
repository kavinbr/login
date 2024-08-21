// ChartPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from './Chart';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './ChartPage.css';

function ChartPage() {
    const [users, setUsers] = useState([]);
    const [totalUserCount, setTotalUserCount] = useState(0);
    const [totalClickCount, setTotalClickCount] = useState(0);

    const navigate = useNavigate(); // Initialize useNavigate hook

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found');
                }

                const response = await axios.get('https://loginsignup-ht65.onrender.com/api/auth/users', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const data = response.data;
                setUsers(data);
                setTotalUserCount(data.length);
                setTotalClickCount(data.reduce((sum, user) => sum + user.count, 0));
            } catch (error) {
                console.error('Error fetching users', error);
            }
        };

        fetchUsers();
    }, []);

    const handleHomeClick = () => {
        navigate('/admin-dashboard'); // Navigate to AdminDashboard
    };

    return (
        <Container className="my-4">
            <Row className="mb-4">
                <Col md={12} lg={4}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>Total Users</Card.Title>
                            <Card.Text>
                                {totalUserCount}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={12} lg={4}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>Total Clicks</Card.Title>
                            <Card.Text>
                                {totalClickCount}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Chart users={users} />
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <Button variant="primary" className='home' onClick={handleHomeClick}>
                        Home
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default ChartPage;
