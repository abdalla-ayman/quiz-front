export interface Project {
    id: string;
    name: string;
    description?: string;
    createdAt?: string;
}


export interface Task {
    id: string;
    name: string;
    dueDate: string;
    status: "pending" | "done";
    createdAt?: string;
}
