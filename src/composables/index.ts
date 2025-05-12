// 👉 Type Esc to close drawer
export function useNavigationDrawerEscHandler(
  key: string,
  callback: () => void,
) {
  const keyDownHandler = (event: KeyboardEvent): void => {
    if (event.code === key) {
      callback();
    }
  };

  onMounted(() => {
    window.addEventListener("keydown", keyDownHandler);
  });

  onUnmounted(() => {
    window.removeEventListener("keydown", keyDownHandler);
  });
}
