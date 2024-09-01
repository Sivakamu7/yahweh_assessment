import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Grid, IconButton, Typography } from '@mui/material';
import themeMode from '../theme';
import StyledCard from '../components/custom_components/styledcard';
import QuestionForm from '../components/question_form';

const ManageQuestionBank = () => {
  const isDarkTheme = useSelector(state => state.theme.isDarkTheme);
  const theme = themeMode(isDarkTheme);

  const [questions, setQuestions] = useState([
    { id: 1, text: 'What is React?', type: 'Multiple Choice', category: 'General', tags: ['React'] },
    { id: 2, text: 'Explain Redux', type: 'Essay', category: 'State Management', tags: ['Redux'] },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);

  const handleOpenDialog = (question = null) => {
    setEditingQuestion(question);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingQuestion(null);
  };

  const handleSaveQuestion = (question) => {
    if (editingQuestion && editingQuestion.id) {
      setQuestions(questions.map(q =>
        q.id === editingQuestion.id ? { ...q, ...question } : q
      ));
    } else {
      setQuestions([...questions, { ...question, id: questions.length + 1 }]);
    }
    handleCloseDialog();
  };

  const handleDeleteQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const handleImportFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedQuestions = JSON.parse(e.target.result);
          setQuestions([...questions, ...importedQuestions]);
        } catch (error) {
          console.error('Error parsing file', error);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleExportQuestions = () => {
    const dataStr = JSON.stringify(questions, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileName = 'questions.json';
    const link = document.createElement('a');
    link.setAttribute('href', dataUri);
    link.setAttribute('download', exportFileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Manage Question Bank
      </Typography>
      <Grid container spacing={2} marginBottom={2}>
        <Grid item>
          <Button
            variant="contained"
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.secondary.contrastText,
              '&:hover': {
                backgroundColor: theme.palette.secondary.dark,
              },
            }}
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Add New Question
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            color={isDarkTheme ? theme.palette.secondary.dark : theme.palette.primary.dark}
            onClick={handleExportQuestions}
          >
            Export Questions
          </Button>
        </Grid>
        <Grid item>
          <input
            accept=".json"
            id="import-file"
            type="file"
            style={{ display: 'none' }}
            onChange={handleImportFile}
          />
          <label htmlFor="import-file">
            <Button
              variant="outlined"
              color={isDarkTheme ? theme.palette.secondary.dark : theme.palette.primary.dark}
              component="span"
            >
              Import Questions
            </Button>
          </label>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        {questions.map((question) => (
          <Grid item xs={12} sm={6} md={4} key={question.id}>
            <StyledCard>
              <Typography variant="h6">{question.text}</Typography>
              <Typography color="textSecondary" gutterBottom>
                Type: {question.type}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                Category: {question.category}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                Tags: {question.tags.join(', ')}
              </Typography>
              <IconButton
                color="secondary"
                onClick={() => handleOpenDialog(question)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => handleDeleteQuestion(question.id)}
              >
                <DeleteIcon />
              </IconButton>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
      <QuestionForm
        isOpen={openDialog}
        onClose={handleCloseDialog}
        onSave={handleSaveQuestion}
        question={editingQuestion || {}}
      />
    </div>
  );
};

export default ManageQuestionBank;
