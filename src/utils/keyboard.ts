export const preventScroll = (event: any) => {
  switch (event.key) {
    case "ArrowUp":
    case "ArrowDown":
    case "ArrowLeft":
    case "ArrowRight":
    case "PageUp":
    case "PageDown":
    case "Home":
    case "End":
      event.preventDefault();
      break;
    default:
      break;
  }
};
