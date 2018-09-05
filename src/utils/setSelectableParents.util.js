const getAllChildren = (components, childrenIds, unSelectable = []) => {
  if (!childrenIds || childrenIds.length < 1) return unSelectable;
  for (let i = 0; i < childrenIds.length; i += 1) {
    const component = components.find(({ id }) => id === childrenIds[i]);
    if (!unSelectable.includes(childrenIds[i])) {
      unSelectable.push(childrenIds[i]);
    }
    getAllChildren(components, component.childrenIds, unSelectable);
  }
  return unSelectable;
};

const getSelectableParents = ({
  id, childrenIds,
  parentIds, components,
}) => {
  const unSelectableParents = getAllChildren(components, childrenIds, [id, ...parentIds]);
  return components
    .filter(comp => !unSelectableParents.includes(comp.id));
};

const setSelectableParents = components => components.map(
  comp => (
    {
      ...comp,
      selectableParents: getSelectableParents({
        id: comp.id,
        childrenIds: comp.childrenIds,
        parentIds: comp.parentIds,
        components,
      }),
    }
  ),
);

export default setSelectableParents;
