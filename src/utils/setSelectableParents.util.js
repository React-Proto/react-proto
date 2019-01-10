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

/**
 * Summary - Utility function for returning an array of components that were available to be
 * selected as a component's parent. Instead of returning the entire component object we are
 * now only returning the id and title for efficiency.
 * @param {string} id - Component id of component that has current focus
 * @param {array} childrenIds
 * @param {array} components
 * @return {Object}
 */
const getSelectableParents = ({ id, childrenIds, components }) => {
  const unSelectableParents = getAllChildren(components, childrenIds, [id]);
  return components
    .filter(comp => !unSelectableParents.includes(comp.id) && comp.visible)
    .map(({ id, title }) => ({ id, title }));
};

const setSelectableParents = components => components.map(
  comp => (
    {
      ...comp,
      selectableParents: getSelectableParents({
        id: comp.id,
        childrenIds: comp.childrenIds,
        components,
      }),
    }
  ),
);

export default setSelectableParents;
