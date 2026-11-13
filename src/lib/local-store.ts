export class LocalStore<T> {
  private value: T;
  private readonly serverValue: T;
  private hydrated = false;
  private readonly listeners = new Set<() => void>();

  constructor(
    private readonly key: string,
    private readonly initial: T,
    private readonly validate: (parsed: unknown) => T | null,
  ) {
    this.value = initial;
    this.serverValue = initial;
  }

  subscribe = (listener: () => void): (() => void) => {
    const needsHydrate = !this.hydrated;
    if (needsHydrate) {
      this.hydrated = true;
      const loaded = this.load();
      if (loaded !== null) {
        this.value = loaded;
      }
    }
    this.listeners.add(listener);
    if (needsHydrate) {
      queueMicrotask(listener);
    }
    return () => {
      this.listeners.delete(listener);
    };
  };

  getSnapshot = (): T => this.value;

  getServerSnapshot = (): T => this.serverValue;

  set = (next: T): void => {
    this.value = next;
    try {
      localStorage.setItem(this.key, JSON.stringify(next));
    } catch {
      // storage unavailable
    }
    this.listeners.forEach((listener) => listener());
  };

  update = (updater: (current: T) => T): void => {
    if (!this.hydrated) {
      this.hydrated = true;
      const loaded = this.load();
      if (loaded !== null) {
        this.value = loaded;
      }
    }
    this.set(updater(this.value));
  };

  private load(): T | null {
    try {
      const raw = localStorage.getItem(this.key);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        return this.validate(parsed);
      }
    } catch {
      // corrupted storage
    }
    return null;
  }
}
