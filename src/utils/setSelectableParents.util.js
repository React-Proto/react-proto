const getChildren = (components, childComponents, unSelectable = []) => {
  if (!childComponents || childComponents.length < 1) return unSelectable;
  for (let i = 0; i < childComponents.length; i += 1) {
    const component = components[childComponents[i]];
    unSelectable.push(childComponents[i]);
    getChildren(components, component.children, unSelectable);
  }
  return unSelectable;
};

const getSelectableParents = ({ index, components }) => {
  const component = components[index];
  const unSelectable = getChildren(components, component.children, [index]);

  return components
    .filter((comp, i) => !unSelectable.includes(i));
};

const setSelectableParents = components => components.map(
  (comp, index) => (
    {
      ...comp,
      selectableParents: getSelectableParents({
        index,
        components,
      }),
    }
  ),
);

export default setSelectableParents;
