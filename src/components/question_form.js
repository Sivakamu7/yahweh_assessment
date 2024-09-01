import React from 'react';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Button, Dialog, DialogContent, DialogTitle, InputBase, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Field, Form, Formik } from 'formik';
import themeMode from '../theme';
import DropdownComponent from '../components/custom_components/dropdown_questionBank';

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1),
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
  },
}));

const validationSchema = Yup.object({
  text: Yup.string().required('Question text is required'),
  type: Yup.string().required('Question type is required'),
  category: Yup.string().required('Category is required'),
  tags: Yup.array().of(Yup.string().required('Tags are required')).min(1, 'At least one tag is required'),
});

const QuestionForm = ({ isOpen, onClose, onSave, question = {} }) => {
  const isDarkTheme = useSelector(state => state.theme.isDarkTheme);
  const theme = themeMode(isDarkTheme);

  const initialValues = {
    text: question.text || '',
    type: question.type || 'Multiple Choice',
    category: question.category || '',
    tags: question.tags || [],
  };

  const questionTypes = [
    { value: 'Multiple Choice', label: 'Multiple Choice' },
    { value: 'Short Answer', label: 'Short Answer' },
    { value: 'Essay', label: 'Essay' },
    { value: 'True/False', label: 'True/False' },
  ];

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{question.id ? 'Edit Question' : 'Add New Question'}</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            onSave(values);
            onClose();
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form>
              <Typography variant="h6" gutterBottom>
                {question.id ? 'Edit Question' : 'Add New Question'}
              </Typography>

              <Field name="text">
                {({ field }) => (
                  <StyledInputBase
                    {...field}
                    placeholder="Question Text"
                    sx={{
                      width: '100%',
                      border: `1px solid ${theme.palette.action.selected}`,
                      borderRadius: '4px',
                      marginBottom: '16px',
                    }}
                    multiline
                    rows={2}
                    error={touched.text && Boolean(errors.text)}
                  />
                )}
              </Field>
              {touched.text && errors.text && (
                <Typography variant="body2" color="error" gutterBottom>
                  {errors.text}
                </Typography>
              )}

              <Field name="type">
                {({ field }) => (
                  <DropdownComponent
                    value={field.value}
                    onChange={handleChange}
                    error={touched.type && Boolean(errors.type)}
                    helperText={touched.type && errors.type}
                    label="Question Type"
                    options={questionTypes}
                  />
                )}
              </Field>
              {touched.type && errors.type && (
                <Typography variant="body2" color="error" gutterBottom>
                  {errors.type}
                </Typography>
              )}

              <Field name="category">
                {({ field }) => (
                  <StyledInputBase
                    {...field}
                    placeholder="Category"
                    sx={{
                      width: '100%',
                      border: `1px solid ${theme.palette.action.selected}`,
                      borderRadius: '4px',
                      marginBottom: '16px',
                    }}
                    error={touched.category && Boolean(errors.category)}
                  />
                )}
              </Field>
              {touched.category && errors.category && (
                <Typography variant="body2" color="error" gutterBottom>
                  {errors.category}
                </Typography>
              )}

              <Field name="tags">
                {({ field }) => (
                  <StyledInputBase
                    {...field}
                    placeholder="Tags (comma-separated)"
                    sx={{
                      width: '100%',
                      border: `1px solid ${theme.palette.action.selected}`,
                      borderRadius: '4px',
                      marginBottom: '16px',
                    }}
                    onChange={(e) => {
                      const tags = e.target.value.split(',').map(tag => tag.trim());
                      handleChange({ target: { name: 'tags', value: tags } });
                    }}
                    value={values.tags.join(', ')}
                    error={touched.tags && Boolean(errors.tags)}
                  />
                )}
              </Field>
              {touched.tags && errors.tags && (
                <Typography variant="body2" color="error" gutterBottom>
                  {errors.tags}
                </Typography>
              )}

              <div style={{ marginTop: '24px' }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: theme.palette.secondary.light,
                    color: theme.palette.secondary.contrastText,
                    '&:hover': {
                      backgroundColor: theme.palette.secondary.dark,
                    },
                  }}
                >
                  {question.id ? 'Save Changes' : 'Add Question'}
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  style={{ marginLeft: '16px' }}
                  onClick={onClose}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default QuestionForm;
