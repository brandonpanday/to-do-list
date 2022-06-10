const ProjectFactory = (name) => {
  let noteArray = [];
  const getName = () => name;
  const addNote = (desc) => {
    noteArray.unshift(desc);
  }
  return { getName, noteArray, addNote };
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


const addNoteToProject = (ap, nc) => {
  Controller.projectArray.forEach(p => {
    if (ap == p.getName()) {
      p.addNote(nc);
    }
  })
}

const deleteNote = (ap, nc) => {
  Controller.projectArray.forEach(p => {
    if (ap == p.getName()) {
      p.noteArray.forEach(n => {
        if (n == nc) {
          let i = p.noteArray.indexOf(n);
          p.noteArray.splice(i, 1);
          console.log(p.noteArray);
        }
      })
    }
  })
}

export { ProjectFactory, Controller, addNoteToProject, deleteNote };

