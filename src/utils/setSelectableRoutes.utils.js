const getSelectableRoutes = (components, childrenIds, routes) => {
  const currentrouteIds = routes.map(route => route.routeCompId);
  return components
    .filter(comp => childrenIds.includes(comp.id) && !currentrouteIds.includes(comp.id));
};

const setSelectableRoutes = (components, id) => components.map((comp) => {
  if (comp.id === id) {
    return {
      ...comp,
      selectableRoutes: getSelectableRoutes(components, comp.childrenIds, comp.routes),
    };
  }
  return comp;
});

export default setSelectableRoutes;
