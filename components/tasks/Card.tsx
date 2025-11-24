"use client";
import { Task } from "@/app/types";
import { Button } from "../ui/button";
import { useState } from "react";
import { Badge } from "../ui/badge";

export function TaskCard({ task }: { task: Task }) {
  const [status, setStatus] = useState(task.status);
  const [isLoading, setIsLoading] = useState(false);

  const toggleStatus = async () => {
    const newStatus = status === "done" ? "pending" : "done";
    setIsLoading(true);

    try {
      const response = await fetch(
        `http://localhost:5000/api/tasks/${task.id}`,
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

      const data = await response.json();
      setStatus(newStatus);
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task status. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border-b pb-4 mb-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{task.name}</h2>
          <p className="text-gray-500 mt-2">{task.dueDate || "No due date."}</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Status Badge */}
          {/* Toggle Button */}
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
