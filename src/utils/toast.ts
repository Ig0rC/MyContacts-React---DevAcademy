import EventManager from '../lib/EventManager';

export const toastEventManager = new EventManager();

export default function toast({
  type, text, duration,
}: { type: string, text: string, duration?: number }): void {
  toastEventManager.emit('addtoast', {
    type, text, duration,
  });
}
