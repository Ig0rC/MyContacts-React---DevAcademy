type listenerPayload = {
  type: string,
  text: string
  duration?: number;
}

interface IEventManager {
  listeners: Map<string, Array<((payload: listenerPayload) => void)>>;
  on: (event: string, listener: () => void) => void;
  emit: (event: string, payload: listenerPayload) => void;
}

export default class EventManager implements IEventManager {
  public listeners: Map<string, Array<((payload: listenerPayload) => void)>>;

  constructor() {
    this.listeners = new Map();
  }

  public on(event: string, listener: (payload: listenerPayload) => void): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }

    this.listeners.get(event)?.push(listener);
  }

  public emit(event: string, payload: listenerPayload): void {
    if (!this.listeners.has(event)) {
      return;
    }

    this.listeners.get(event)?.forEach((listener) => {
      listener(payload);
    });
  }

  public removeListener(event: string, listenerRemove:(payload: listenerPayload) => void): void {
    const listeners = this.listeners.get(event);

    if (!listeners) {
      return;
    }

    const filteredListeners = listeners.filter((listener) => (
      listener !== listenerRemove
    ));

    this.listeners.set(event, filteredListeners);
  }
}
