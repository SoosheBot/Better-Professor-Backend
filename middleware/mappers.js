module.exports = {
    taskToBody
  };
  
  function intToBoolean(int) {
    return int === 1 ? true : false;
  }
  
  function taskToBody(project) {
    return {
      ...project,
      completed: intToBoolean(project.completed),
    };
  }
  