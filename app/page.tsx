import { Card } from "@/components/ui/card";
import AddProjectForm from "@/components/projects/Form";
import { ProjectCard } from "@/components/projects/Card";
import { Project } from "./types";

export default async function Home() {
  const res = await fetch("http://localhost:5000/api/projects", {
    cache: "no-store", // ensure fresh data
  });

  const projects = await res.json();

  return (
    <main className="p-16">
      <h1 className="text-4xl">Projects</h1>

      <Card className="p-6 mt-8 space-y-6">
        {/* Render each project */}
        {projects.map((project: Project) => (
          <ProjectCard key={project.id} project={project} />
        ))}

        <AddProjectForm />
      </Card>
    </main>
  );
}
