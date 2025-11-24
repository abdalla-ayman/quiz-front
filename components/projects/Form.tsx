"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type FormValues = {
  name: string;
  description?: string;
};

export default function AddProjectForm() {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  async function onSubmit(values: FormValues) {
    try {
      setLoading(true);
      setSuccessMessage(null);
      setErrorMessage(null);

      const res = await fetch("http://localhost:5000/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) setErrorMessage("Failed to create project");

      reset();
      setSuccessMessage("Project added successfully!");
    } catch (error) {
      console.error(error);
      setErrorMessage("Error creating project");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className=" w-full bg-white dark:bg-zinc-900  ">
      <Dialog>
        <DialogTrigger>
          <Button variant={"outline"}>Create Project</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle> Add New Project to The list</DialogTitle>
            <DialogDescription>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                {/* Project Name */}
                <div>
                  <label className="text-start block mb-1 font-medium">
                    Project Name
                  </label>
                  <Input
                    placeholder="Enter project name"
                    {...register("name", {
                      required: "Project name is required",
                    })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="text-start block mb-1 font-medium">
                    Description
                  </label>
                  <Textarea
                    placeholder="Optional description..."
                    className="resize-none"
                    {...register("description")}
                  />
                </div>

                {successMessage && (
                  <p className="text-green-600 text-xs ">{successMessage}</p>
                )}
                {errorMessage && (
                  <p className="text-red-600  text-xs">{errorMessage}</p>
                )}

                <Button type="submit" className="w-fit" disabled={loading}>
                  {loading ? "Saving..." : "Add Project"}
                </Button>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
