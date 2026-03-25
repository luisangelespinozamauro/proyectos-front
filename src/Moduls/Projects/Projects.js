import React, { useEffect, useContext } from "react";
import Layout from "../../Components/Layout/Layout";
import TableProjects from "../../Components/Tables/TableProjects";
import ProjectsContext from "../../Context/Projects/ProjectsContext";

const Projects = () => {
  const { projects, GetProjects } = useContext(ProjectsContext);

  useEffect(() => {
    GetProjects();
  }, []);

  return (
    <Layout>
      <TableProjects rows={projects} />
    </Layout>
  );
};

export default Projects;
