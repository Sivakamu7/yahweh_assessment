import React, { useState } from 'react';
import { Button, Dialog, DialogContent, IconButton, DialogTitle, Grid, Box, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AssessmentForm from '../components/assessment_form';
import StyledCard from '../components/custom_components/styledcard';

const CreateAssessment = () => {
  const [drafts, setDrafts] = useState([]);
  const [openPreview, setOpenPreview] = useState(false);
  const [currentDraft, setCurrentDraft] = useState(null);

  const handleSaveDraft = (values) => {
    setDrafts([...drafts, values]);
  };

  const handlePreviewOpen = (draft) => {
    setCurrentDraft(draft);
    setOpenPreview(true);
  };

  const handlePreviewClose = () => {
    setOpenPreview(false);
    setCurrentDraft(null);
  };

  const dialogueContents = (label, value, variant = "body2") => (
    <Box display="flex" justifyContent="space-between" alignItems="center" pb={0.5}>
      <Typography variant={variant} fontWeight="bold">{label}:</Typography>
      <Typography variant={variant}>{value}</Typography>
    </Box>
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Create New Assessment
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <StyledCard>
          <AssessmentForm onSubmit={handleSaveDraft} onPreview={handlePreviewOpen} />
        </StyledCard>
      </Grid>

      <Grid item xs={12} md={6}>
        <StyledCard>
          <Typography variant="h5" style={{ marginBottom: '20px' }}>
            Saved Drafts
          </Typography>
          <Grid container spacing={2}>
            {drafts.map((draft, index) => (
              <Grid item xs={12} key={index}>
                <StyledCard>
                  <Typography variant="h6">{draft.title || 'Untitled'}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {draft.instructions || 'No instructions provided'}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: '10px' }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginTop: '10px', marginLeft: '10px' }}
                    onClick={() => handlePreviewOpen(draft)}
                  >
                    Preview
                  </Button>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        </StyledCard>
      </Grid>

      <Dialog open={openPreview} onClose={handlePreviewClose} fullWidth maxWidth="xs">
        <DialogTitle fontWeight="bold">
          Assessment Preview
          <IconButton
            aria-label="close"
            onClick={handlePreviewClose}
            sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {currentDraft && (
            <>
              {dialogueContents('Title', currentDraft.title)}
              {dialogueContents('Type', currentDraft.type)}
              {dialogueContents('Instructions', currentDraft.instructions)}
              {dialogueContents('Time Limit', `${currentDraft?.timeLimit} minutes`)}
              {dialogueContents('Attempts', currentDraft.attempts)}
              {dialogueContents('Feedback', currentDraft.feedback)}
              <Typography variant="h6" fontWeight="bold" style={{ marginTop: '8px' }}>
                Questions
              </Typography>
              {currentDraft.questions.map((question, index) => (
                <Typography key={index} variant="body1" paragraph>
                  {question.text}
                </Typography>
              ))}
            </>
          )}
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default CreateAssessment;
