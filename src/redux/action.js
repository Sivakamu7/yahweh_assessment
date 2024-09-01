export const createAssessment = (assessment) => ({
  type: 'CREATE_ASSESSMENT',
  payload: assessment,
});

export const updateAssessment = (assessment) => ({
  type: 'UPDATE_ASSESSMENT',
  payload: assessment,
});
