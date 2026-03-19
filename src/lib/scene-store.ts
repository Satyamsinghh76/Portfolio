type Listener = (projectId: string | null) => void;

const listeners: Set<Listener> = new Set();

export function subscribeToProjectSelect(cb: Listener): () => void {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

export function selectProject(id: string | null): void {
  listeners.forEach((cb) => cb(id));
}
