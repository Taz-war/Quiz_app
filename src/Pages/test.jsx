import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Radio,
    ButtonGroup,
    Button,
    InputBase,
} from '@mui/material';

function DataTable() {
    return (
        <div style={{ margin: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <ButtonGroup variant="contained" size="small">
                        <Button>Quizzes</Button>
                        <Button>Deleted</Button>
                    </ButtonGroup>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <InputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        style={{ paddingLeft: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                    <Button variant="contained" color="primary" size="small" style={{ marginLeft: '10px' }}>
                        New Folder
                    </Button>
                    <Button variant="contained" color="primary" size="small" style={{ marginLeft: '10px' }}>
                        Add Quiz
                    </Button>
                </div>
            </div>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>NAME</TableCell>
                            <TableCell>MODIFIED</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {[{ name: 'World Facts Quiz', date: '11/2/2023' }, { name: 'Untitled Quiz', date: '11/2/2023' }, { name: 'Untitled Quiz', date: '10/18/2023' }].map((row) => (
                            <TableRow key={row.name}>
                                <TableCell>
                                    <Radio color="primary" />
                                </TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.date}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default DataTable;
