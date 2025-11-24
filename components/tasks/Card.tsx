"use client";
import { Task } from "@/app/types";
import { Button } from "../ui/button";
import { useState } from "react";
import { Badge } from "../ui/badge";

export function TaskCard({
  task,
  projectId,
}: {
  task: Task;
  projectId: string;
}) {
  const [status, setStatus] = useState(task.status);
  const [isLoading, setIsLoading] = useState(false);

  const toggleStatus = async () => {
    const newStatus = status === "done" ? "pending" : "done";
    setIsLoading(true);

    try {
      const response = await fetch(
        `http://localhost:5000/api/projects/${projectId}/tasks/${task.id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      setStatus(newStatus);
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task status. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDueDate = (dueDate: string | undefined) => {
    if (!dueDate) return "No due date.";
    const dateObj = new Date(dueDate);
    if (isNaN(dateObj.getTime())) return dueDate;
    return dateObj.toLocaleDateString();
  };

  return (
    <div
      className={`border-b pb-4 mb-4 ${
        status === "done" ? "bg-green-50" : "bg-white"
      }`}
    >
      <div className="flex justify-between items-center">
        <div>
          <h2
            className={`text-xl font-semibold ${
              status === "done" ? "text-gray-400 line-through" : "text-gray-800"
            }`}
          >
            {task.name}
          </h2>
          <p
            className={`mt-2 ${
              status === "done" ? "text-gray-400 line-through" : "text-gray-500"
            }`}
          >
            {formatDueDate(task.dueDate)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            className={`capitalize ${
              status === "done" ? "bg-green-500" : "bg-amber-500"
            }`}
          >
            {status}
          </Badge>
          <Button
            onClick={toggleStatus}
            disabled={isLoading}
            variant="outline"
            size="sm"
          >
            {isLoading
              ? "..."
              : status === "done"
              ? "Mark Pending"
              : "Mark Done"}
          </Button>
        </div>
      </div>
    </div>
  );
}
