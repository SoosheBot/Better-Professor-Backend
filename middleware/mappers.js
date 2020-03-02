module.exports = {
    projectToBody,
  };
  
  function intToBoolean(int) {
    return int === 1 ? true : false;
  }
  
  function projectToBody(project) {
    return {
      ...project,
      completed: intToBoolean(project.completed),
    };
  }
  