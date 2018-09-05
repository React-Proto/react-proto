let convertChildAndParentIds;
const convertComponentsArrToObj = components => components.reduce(
  (obj, comp) => {
    const compsObj = obj;
    compsObj[comp.id] = comp;
    return compsObj;
  }, {},
);

const convertCompIdToObj = (id, compsObj) => {
  const comp = compsObj[id];
  if (!comp.children || (comp.childrenIds.length !== comp.children.length)) {
    return convertChildAndParentIds(compsObj, comp);
  }
  if (!comp.parents || (comp.parentIds.length !== comp.parents.length)) {
    return convertChildAndParentIds(compsObj, comp);
  }
  return comp;
};

convertChildAndParentIds = (compsObj, component) => {
  const childrenAsObj = component.childrenIds
    .map(id => convertCompIdToObj(id, compsObj));

  const parentsAsObj = component.parentIds
    .map(id => compsObj[id]);

  return { ...component, children: childrenAsObj, parents: parentsAsObj };
};

const convertIdsToObjs = (components) => {
  const compsObj = convertComponentsArrToObj(components);
  return components.map(
    component => convertChildAndParentIds(compsObj, component),
  );
};

export default convertIdsToObjs;
