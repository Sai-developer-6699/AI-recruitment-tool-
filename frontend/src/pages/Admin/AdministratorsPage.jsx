import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
} from '@mui/material';

// Mock data for administrators
const mockAdministrators = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Super Admin',
    status: 'Active',
    lastLogin: '2023-05-18 10:30 AM',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Admin',
    status: 'Active',
    lastLogin: '2023-05-17 02:45 PM',
  },
  {
    id: 3,
    name: 'Robert Johnson',
    email: 'robert.johnson@example.com',
    role: 'Admin',
    status: 'Inactive',
    lastLogin: '2023-05-10 09:15 AM',
  },
];

const getStatusColor = (status) => {
  return status === 'Active' ? 'success' : 'error';
};

const AdministratorsPage = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Administrators
      </Typography>

      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="administrators table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Last Login</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockAdministrators.map((admin) => (
                <TableRow key={admin.id}>
                  <TableCell component="th" scope="row">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ mr: 2 }}>{admin.name.charAt(0)}</Avatar>
                      {admin.name}
                    </Box>
                  </TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>{admin.role}</TableCell>
                  <TableCell>
                    <Chip
                      label={admin.status}
                      color={getStatusColor(admin.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{admin.lastLogin}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
        This is a placeholder page for the Administrators section. In a real application, this would
        include functionality to manage administrator accounts, permissions, and roles.
      </Typography>
    </Box>
  );
};

export default AdministratorsPage;