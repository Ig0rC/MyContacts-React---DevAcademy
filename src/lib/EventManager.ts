type listenerPayload = {
  type: string,
  text: string
}

interface IEventManager {
  listeners: Record<string, Array<((payload: listenerPayload) => void)>>;
  on: (event: string, listener: () => void) => void;
  emit: (event: string, payload: listenerPayload) => void
}

export default class EventManager implements IEventManager {
  public listeners: Record<string, Array<((payload: listenerPayload) => void)>>;

  constructor() {
    this.listeners = {};
  }

  public on(event: string, listener: (payload: listenerPayload) => void): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    console.log('a');
    this.listeners[event].push(listener);
  }

  public emit(event: string, payload: listenerPayload): void {
    if (!this.listeners[event]) {
      return;
    }

    this.listeners[event].forEach((listener) => {
      listener(payload);
    });
  }

  public removeListener(
    event: string, listenerRemove:(payload: listenerPayload) => void,
  ): void {
    const listeners = this.listeners[event];

    if (!listeners) {
      return;
    }

    const filteredListeners = listeners.filter((listener) => (
      listener !== listenerRemove
    ));

    this.listeners[event] = filteredListeners;
  }
}

const toastEventManager = new EventManager();

function addToast1(payload: listenerPayload): void {
  console.log('addToast on 1', payload);
}
function addToast2(payload: listenerPayload): void {
  console.log('addToast on 2', payload);
}

toastEventManager.on('addtoast', addToast1);
toastEventManager.on('addtoast', addToast2);

toastEventManager.emit('addtoast', {
  type: 'danger',
  text: 'Texto',
});

toastEventManager.removeListener('addtoast', addToast1);

toastEventManager.emit('addtoast', {
  type: 'success',
  text: 'adawd',
});

console.log(toastEventManager);
