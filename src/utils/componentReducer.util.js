const initialComponentState = {
  id: null,
  state: false,
  title: '',
  parent: '',
  color: 'blue',
  children: [],
};

const componentReducerUtil = {
  addComponent: (title, initialApplicationState) => {
    const totalComponents = initialApplicationState.totalComponents + 1;
    const components = [
      ...initialApplicationState.components,
      {
        ...initialComponentState,
        id: totalComponents,
        title,
      },
    ];

    return {
      ...initialApplicationState,
      totalComponents,
      components,
    };
  },
};

export default componentReducerUtil;
