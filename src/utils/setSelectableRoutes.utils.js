const getSelectableRoutes = (components, childrenIds, routes) => {
  const selectableRoutes = [];
  const routeIds = routes.map(route => route.routeCompId);
  components.forEach((comp) => {
    if (childrenIds.includes(comp.id) && !routeIds.includes(comp.id)) {
      const routeChoice = {};
      routeChoice.id = comp.id;
      routeChoice.title = comp.title;
      routeChoice.color = comp.color;
      selectableRoutes.push(routeChoice);
    }
  });
  return selectableRoutes;
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
