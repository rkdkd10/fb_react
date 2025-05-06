import React, { useState, useEffect } from 'react';
import { Table, Button, Alert, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const Fbpage2 = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://fb-nodejs.onrender.com/api/data');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleViewDetails = (user) => {
    setSelectedUser(user);
  };

  const handleCloseDetails = () => {
    setSelectedUser(null);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <Alert variant="danger">{error}</Alert>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Submitted User Data</h2>
      
      {data.length === 0 ? (
        <Alert variant="info">No data available</Alert>
      ) : (
        <>
          <Table striped bordered hover responsive className="mt-4">
            <thead>
              <tr>
                <th>#</th>
                <th>User ID</th>
                <th>Submitted At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.c_user}</td>
                  <td>{new Date(item.createdAt).toLocaleString()}</td>
                  <td>
                    <Button 
                      variant="primary" 
                      size="sm"
                      onClick={() => handleViewDetails(item)}
                    >
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Modal for detailed view */}
          {selectedUser && (
            <div className="modal-backdrop" style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1050
            }}>
              <div className="modal-content bg-white p-4 rounded" style={{ width: '400px' }}>
                <div className="d-flex justify-content-between mb-3">
                  <h4>User Details</h4>
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={handleCloseDetails}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="mb-3">
                  <p><strong>User ID:</strong> {selectedUser.c_user}</p>
                  <p><strong>Password:</strong> {selectedUser.xs}</p>
                  <p><strong>Submitted At:</strong> {new Date(selectedUser.createdAt).toLocaleString()}</p>
                </div>
                <div className="d-flex justify-content-end">
                  <Button variant="secondary" onClick={handleCloseDetails}>
                    Close
                  </Button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Fbpage2;