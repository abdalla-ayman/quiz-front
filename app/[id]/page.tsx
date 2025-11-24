import { Card } from "@/components/ui/card";
import AddTaskFrom from "@/components/tasks/Form";
import { TaskCard } from "@/components/tasks/Card";
import { Project, Task } from "../types";

interface ProjectPageProps {
  params: {
    id: string;
  };
}
export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;

  const res = await fetch(`http://localhost:5000/api/projects/${id}/tasks`, {
    cache: "no-store",
  });

  const tasks: Task[] = await res.json();

  return (
    <main className="p-16">
      <h1 className="text-4xl">Tasks</h1>

      <Card className="p-6 mt-8 space-y-6">
        {/* Render each project */}
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} projectId={id} />
        ))}

        <AddTaskFrom projectId={id} />
      </Card>
    </main>
  );
}
