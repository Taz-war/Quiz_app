import { Button, Card, Grid, TextField } from '@mui/material'
import React, { useState } from 'react'

const TrueFalse = () => {
  const [question, setQuestion] = useState("");
  const [point, setPoint] = useState(0);
  const [value,setValue] = useState(null)
  let tempTrueFalseQuestion = {
    "Question":question,
    "Point": point,
    "Answer":value
  }
  console.log(tempTrueFalseQuestion)
  return (
      <Card sx={{ minWidth: 275, bgcolor: "#F5F7F8", mt: 2, p: 2, textAlign: 'left', mb: 2 }}>
          <Grid container columns={12} columnSpacing={2}>
              <Grid item xs={8}>
                  <TextField variant="outlined" label="Question" fullWidth sx={{ mb: 2, mt: 2 }} onBlur={(e) => setQuestion(e.target.value)}>
                      Question
                  </TextField>
              </Grid>
              <Grid item xs={4}>
                  <TextField variant="outlined" label="Point" fullWidth sx={{ mb: 2, mt: 2 }} onChange={(e) => setPoint(e.target.value)}>Point</TextField>
              </Grid>
              <Grid item xs={5}>
                  <Button variant={`${value===true?'contained':'outlined'}`}  color={`${value===true?'success':'secondary'}`} sx={{mr:2}} onClick={()=>setValue(true)}>True</Button>
                  <Button variant={`${value===false?'contained':'outlined'}`} color={`${value===true?'secondary':'error'}`} onClick={()=>setValue(false)}>False</Button>
              </Grid>
          </Grid>
      </Card>
  )
}

export default TrueFalse
