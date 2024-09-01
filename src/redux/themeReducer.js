const initialState = {
  isDarkTheme: false,
};

export const toggleTheme = () => ({
  type: 'TOGGLE_THEME',
});

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return {
        ...state,
        isDarkTheme: !state.isDarkTheme,
      };
    default:
      return state;
  }
};

export default themeReducer;
