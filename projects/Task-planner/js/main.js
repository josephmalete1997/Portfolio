document.addEventListener("DOMContentLoaded", function () {
  const dragTasks = document.querySelectorAll(".task-on-timeline");

  dragTasks.forEach((dragTask, index) => {
    // Retrieve position from localStorage if available
    const storedPosition = JSON.parse(localStorage.getItem(`draggablePosition-${index}`));

    // Set initial position from localStorage or default
    if (storedPosition) {
      dragTask.style.left = storedPosition.left + "px";
    } else {
      dragTask.style.left = "150px";
    }

    // Function to handle dragging
    function handleDragStart(event) {
      const style = window.getComputedStyle(event.target, null);
      event.dataTransfer.setData(
        "text/plain",
        parseInt(style.getPropertyValue("left"), 10) - event.clientX
      );
    }

    function handleDragOver(event) {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
    }

    function handleDrop(event) {
      event.preventDefault();
      const offset = event.dataTransfer.getData("text/plain").split(",");
      const draggedElement = document.querySelector(
        '.task-on-timeline[data-index="' + index + '"]'
      );
      draggedElement.style.left = event.clientX + parseInt(offset[0], 10) + "px";

      // Store position in localStorage
      const position = {
        left: parseInt(draggedElement.style.left, 10),
      };
      localStorage.setItem(`draggablePosition-${index}`, JSON.stringify(position));
    }

    // Add event listeners for dragging
    dragTask.addEventListener("dragstart", handleDragStart, false);
    document.body.addEventListener("dragover", handleDragOver, false);
    document.body.addEventListener("drop", handleDrop, false);

    // Assign index as data attribute for easier selection
    dragTask.setAttribute("data-index", index);
  });
});
