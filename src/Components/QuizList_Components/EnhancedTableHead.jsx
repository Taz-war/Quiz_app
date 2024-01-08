import { Button, Checkbox, TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react'

const EnhancedTableHead = (props) => {
    const { onSelectAllClick,  numSelected, rowCount,selected} =props;
    const handleDeleteSelected =async()=>{
      try {
        const response = await fetch(`http://localhost:5000/questionset/${selected}`, {
          method: 'DELETE',
          // body:selected,
        });
  
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        console.log(data);
      } catch (error) {
        // setErrorMessage(error.message);
      }
    }

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
        <TableCell align='left' sx={{ fontWeight: "bolder", fontSize: "large", color: '#1E75A3' }}>
            Name
          </TableCell>
        <TableCell align='left' sx={{ fontWeight: "bolder", fontSize: "large", color: '#1E75A3' }}>
            Modified date
          </TableCell>
          <TableCell align='right'>
            {selected.length>0 ?<Button variant='contained' color="error" onClick={()=>handleDeleteSelected()}>Delete All</Button>:
            <Button variant='contained' color="error" disabled>Delete Selected</Button>
            }
          </TableCell>
      </TableRow>
    </TableHead>
)}

export default EnhancedTableHead