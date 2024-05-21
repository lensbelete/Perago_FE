import { create } from "zustand";

export interface ProjectInterface {
  id: string;
  name: string;
  description?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

interface projectStore {
  projects: ProjectInterface[];
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
  setProjects: (projects: ProjectInterface[]) => void;
  addProject: (project: ProjectInterface) => void;
  removeProject: (projectId: string) => void;
  updateProject: (projectId: string, newName: string) => void;
}

const useProjectStore = create<projectStore>((set) => ({
  isLoading: true,
  projects: [] as ProjectInterface[],
  setLoading: (isLoading: boolean) => set({ isLoading: isLoading }),
  setProjects: (projects: ProjectInterface[]) => set({ projects: projects }),
  addProject: (project: ProjectInterface) =>
    set((state) => ({ projects: state.projects.concat([project]) })),
  removeProject: (projectId: string) =>
    set((state) => ({
      projects: state.projects.filter((project) => project.id != projectId),
    })),
  updateProject: (projectId: string, newName: string) => {
    set((state) => {
      const updatedProjects = state.projects.map((project) =>
        project.id == projectId ? { ...project, name: newName } : project
      );

      return { projects: updatedProjects };
    });
  },
}));

export default useProjectStore;
