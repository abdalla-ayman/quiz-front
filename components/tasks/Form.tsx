"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PickDate from "./PickDate";

type FormValues = {
  name: string;
  dueDate: string;
};

export default function TaskForm({ projectId }: { projectId: string }) {
  const [open, setOpen] = useState(false); // 👈 control dialog
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  async function onSubmit(values: FormValues) {
    try {
      setLoading(true);
      setErrorMessage(null);

      const res = await fetch(
        `http://localhost:5000/api/projects/${projectId}/tasks`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );

      if (!res.ok) {
        setErrorMessage("Failed to create task");
        return;
      }

      reset();
      setOpen(false);
      router.refresh();
    } catch (error) {
      setErrorMessage("Error creating task");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full bg-white dark:bg-zinc-900">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Button variant="outline">Create Task</Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
          </DialogHeader>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* Task Name */}
            <div>
              <label className="block mb-1 font-medium">Task Name</label>
              <Input
                placeholder="Enter task name"
                {...register("name", { required: "Task name is required" })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Due Date */}
            <PickDate
              label="Due Date"
              onChange={(isoDate) => setValue("dueDate", isoDate)}
            />
            {errors.dueDate && (
              <p className="text-red-500 text-sm">{errors.dueDate.message}</p>
            )}

            {errorMessage && (
              <p className="text-red-600 text-xs">{errorMessage}</p>
            )}

            <Button type="submit" className="w-fit" disabled={loading}>
              {loading ? "Saving..." : "Add Task"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
