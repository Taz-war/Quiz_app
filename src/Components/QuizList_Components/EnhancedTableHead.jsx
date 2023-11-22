import { Checkbox, TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react'

const EnhancedTableHead = (props) => {
    const { onSelectAllClick,  numSelected, rowCount} =props;


  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        <TableCell align='left' >
            Name
          </TableCell>
          <TableCell align='left' >
            Modified date
          </TableCell>
          <TableCell></TableCell>
      </TableRow>
    </TableHead>
)}

export default EnhancedTableHead