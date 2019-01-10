const convertChildAndParentIds = (components, component) => {
  const childrenAsObj = component.childrenIds.map((id) => {
    const child = components.find(comp => id === comp.id);
    if (!child.children || (child.childrenIds.length !== child.children.length)) {
      return convertChildAndParentIds(components, child);
    }
    if (!child.parent || (child.parentId.length !== child.parent.length)) {
      return convertChildAndParentIds(components, child);
    }
    return child;
  });
  const parentAsObj = components.find(parent => parent.id === component.parentId) || {};
  return { ...component, children: childrenAsObj, parent: parentAsObj };
};

const convertIdToObjs = components => components.map(
  component => convertChildAndParentIds(components, component),
);

export default convertIdToObjs;
