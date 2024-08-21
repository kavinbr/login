// import React from 'react';
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

// ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// function Chart({ users }) {
//     const data = {
//         labels: users.map((user) => new Date(user.lastLogin).toLocaleDateString()),
//         datasets: [
//             {
//                 label: 'User Login Count',
//                 data: users.map((user) => user.count),
//                 backgroundColor: 'rgba(75, 192, 192, 0.6)',
//             },
//         ],
//     };

//     const options = {
//         scales: {
//             x: {
//                 beginAtZero: true,
//             },
//             y: {
//                 beginAtZero: true,
//                 stepSize: 1,
//             },
//         },
//     };

//     return <Bar data={data} options={options} />;
// }

// export default Chart;
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Form } from 'react-bootstrap';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function Chart({ users }) {
    const [selectedUser, setSelectedUser] = useState('all');
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        const aggregateData = (userList) => {
            const monthlyClicks = {};
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            
            if (selectedMonth) {
                // Filter data by selected month
                userList.forEach(user => {
                    const date = new Date(user.lastLogin);
                    const year = date.getFullYear();
                    const month = date.getMonth(); // 0-based month
                    const monthKey = monthNames[month];
                    
                    if (year === selectedYear && monthKey === selectedMonth) {
                        if (!monthlyClicks[user.name]) {
                            monthlyClicks[user.name] = 0;
                        }
                        monthlyClicks[user.name] += user.count;
                    }
                });

                return {
                    labels: Object.keys(monthlyClicks),
                    datasets: [
                        {
                            label: `Clicks in ${selectedMonth}`,
                            data: Object.values(monthlyClicks),
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        },
                    ],
                };
            } else {
                // Aggregate data for all months
                userList.forEach(user => {
                    const date = new Date(user.lastLogin);
                    const year = date.getFullYear();
                    const month = date.getMonth(); // 0-based month

                    if (year === selectedYear) {
                        const monthKey = monthNames[month];
                        if (selectedUser === 'all' || user.name === selectedUser) {
                            monthlyClicks[monthKey] = (monthlyClicks[monthKey] || 0) + user.count;
                        }
                    }
                });

                return {
                    labels: monthNames,
                    datasets: [
                        {
                            label: selectedUser === 'all' ? `All Users Click Count for ${selectedMonth || 'All Months'}` : `User: ${selectedUser}`,
                            data: monthNames.map(month => monthlyClicks[month] || 0),
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        },
                    ],
                };
            }
        };

        if (users && users.length > 0) {
            setChartData(aggregateData(users));
        }
    }, [users, selectedUser, selectedYear, selectedMonth]);

    const handleUserChange = (e) => {
        setSelectedUser(e.target.value);
        setSelectedMonth(null); // Reset month when user changes
    };

    const handleYearChange = (e) => {
        setSelectedYear(Number(e.target.value));
    };

    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
    };

    const years = Array.from(new Set(users.map(user => new Date(user.lastLogin).getFullYear()))).sort();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const options = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: selectedMonth ? 'User Names' : 'Month',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Click Count',
                },
                beginAtZero: true,
                stepSize: 1,
            },
        },
    };

    return (
        <div>
            <Form.Group controlId="userSelect">
                <Form.Label>Select User</Form.Label>
                <Form.Control
                    as="select"
                    value={selectedUser}
                    onChange={handleUserChange}
                >
                    <option value="all">View All</option>
                    {users.map((user, index) => (
                        <option key={index} value={user.name}>
                            {user.name}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="yearSelect">
                <Form.Label>Select Year</Form.Label>
                <Form.Control
                    as="select"
                    value={selectedYear}
                    onChange={handleYearChange}
                >
                    {years.map((year, index) => (
                        <option key={index} value={year}>
                            {year}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>
            {selectedUser === 'all' && (
                <Form.Group controlId="monthSelect">
                    <Form.Label>Select Month</Form.Label>
                    <Form.Control
                        as="select"
                        value={selectedMonth || ''}
                        onChange={handleMonthChange}
                    >
                        <option value="">All Months</option>
                        {monthNames.map((month, index) => (
                            <option key={index} value={month}>
                                {month}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
            )}
            <Bar data={chartData} options={options} />
        </div>
    );
}

export default Chart;

