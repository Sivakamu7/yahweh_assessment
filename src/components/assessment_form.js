import React from 'react';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';

import { Button, Grid, InputBase, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Field, FieldArray, Form, Formik } from 'formik';
import themeMode from '../theme';
import DropdownComponent from './custom_components/dropdown';

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(0.8),
    paddingLeft: `calc(1em + ${theme.spacing(0)})`,
  }, 
}));

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  type: Yup.string().required('Type of assessment is required'),
  instructions: Yup.string(),
  questions: Yup.array().of(
    Yup.object({
      text: Yup.string().required('Question text is required'),
      type: Yup.string().required('Question type is required'),
    })
  ),
});

const AssessmentForm = ({ onSubmit, onPreview }) => {
  const isDarkTheme = useSelector(state => state.theme.isDarkTheme);
  const theme = themeMode(isDarkTheme);

  return (
    <Formik
      initialValues={{
        title: '',
        type: '',
        questions: [],
        instructions: '',
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched }) => (
        <Form>
          <Field name="title">
            {({ field }) => (
              <StyledInputBase
                {...field}
                placeholder="Assessment Title"
                sx={{
                  width: '100%',
                  border: `1px solid ${theme.palette.action.selected}`,
                  borderRadius: '4px',
                  marginBottom: '16px',
                }}
                error={touched.title && Boolean(errors.title)}
              />
            )}
          </Field>
          {touched.title && errors.title && (
            <Typography variant="body2" color="error">
              {errors.title}
            </Typography>
          )}

          <Field name="type">
            {({ field }) => (
              <DropdownComponent
                value={field.value}
                onChange={field.onChange}
                error={touched.type && Boolean(errors.type)}
                helperText={touched.type && errors.type}
              />
            )}
          </Field>

          <Field name="instructions">
            {({ field }) => (
              <StyledInputBase
                {...field}
                placeholder="Assessment Instructions"
                sx={{
                  width: '100%',
                  border: `1px solid ${theme.palette.action.selected}`,
                  borderRadius: '4px',
                  marginTop: '16px',
                  padding: '8px',
                  height: '100px',
                }}
                multiline
                rows={4}
              />
            )}
          </Field>

          <FieldArray name="questions">
            {({ push }) => (
              <Grid container spacing={3} style={{ marginTop: '16px' }}>
                {values.questions.map((_, index) => (
                  <Grid item xs={12} key={index}>
                    <Field name={`questions.${index}.text`}>
                      {({ field }) => (
                        <StyledInputBase
                          {...field}
                          placeholder={`Question ${index + 1}`}
                          sx={{
                            width: '100%',
                            border: `1px solid ${theme.palette.action.selected}`,
                            borderRadius: '4px',
                            marginBottom: '8px',
                          }}
                          error={
                            touched.questions?.[index]?.text &&
                            Boolean(errors.questions?.[index]?.text)
                          }
                        />
                      )}
                    </Field>
                    {touched.questions?.[index]?.text && errors.questions?.[index]?.text && (
                      <Typography variant="body2" color="error">
                        {errors.questions[index].text}
                      </Typography>
                    )}
                  </Grid>
                ))}
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => push({ text: '', type: '' })}
                  style={{ marginTop: '24px', marginLeft: '24px' }}
                >
                  Add Question
                </Button>
              </Grid>
            )}
          </FieldArray>

          <div style={{ marginTop: '40px' }}>
            <Button
              variant="contained"
              style={{ marginRight: '20px' }}
              sx={{
                backgroundColor: theme.palette.secondary.light,
                color: theme.palette.secondary.contrastText,
                '&:hover': {
                  backgroundColor: theme.palette.secondary.dark,
                },
              }}
            >
              Publish Assessment
            </Button>
            <Button type="submit"
              variant="outlined"
              color={isDarkTheme ? theme.palette.secondary.dark : theme.palette.primary.dark}
            >
              Save as Draft
            </Button>
            <Button
              variant="outlined"
              color={isDarkTheme ? theme.palette.secondary.dark : theme.palette.primary.dark}
              style={{ marginLeft: '20px' }}
              onClick={() => onPreview(values)}
            >
              Preview Assessment
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AssessmentForm;
