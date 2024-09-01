const initialState = {
  assessments: [],
  questionBank: [],
  currentAssessment: null,
  assessmentReview: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_ASSESSMENT':
      return {
        ...state,
        assessments: [...state.assessments, action.payload],
      };
    case 'UPDATE_ASSESSMENT':
      return {
        ...state,
        assessments: state.assessments.map(a =>
          a.id === action.payload.id ? action.payload : a
        ),
      };
    default:
      return state;
  }
};

export default rootReducer;
