export default function toast({
  type, text,
}: { type: string, text: string}): void {
  const event = new CustomEvent('addtoast', {
    detail: {
      type,
      text,
    },
  });

  document.dispatchEvent(event);
}
