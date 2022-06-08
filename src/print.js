const ProjectFactory = (name) => {
  let noteArray = [];
  const getName = () => name;
  const getNotes = () => {
    noteArray.forEach(note => {
      console.log(note);
      return note;
    })
  }
  const addNote = (desc) => {
    noteArray.push(desc);
  }
  return { getName, getNotes, addNote };
};

const Controller = (() => {
  let projectArray = [];
  const addProject = (project) => projectArray.push(project);
  const getProjects = (project) => {
    project.forEach(p => {
      console.log(p);
      return p;
    })
  }
  return { projectArray, addProject };
})();

export { ProjectFactory, Controller };