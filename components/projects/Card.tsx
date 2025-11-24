import { Project } from "@/app/types";

import Link from "next/link";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="border-b pb-4 mb-4">
      <h2 className="text-2xl font-bold mb-2">
        <Link
          href={project.id}
          className="text-blue-500 hover:underline mb-4 block"
        >
          {project.name}
        </Link>
      </h2>
      <p className="text-gray-600 mb-4">
        {project.description || "No description provided."}
      </p>
    </div>
  );
}
