const roomTypes = [
  "Living Room",
  "Bedroom",
  "Kitchen",
  "Bathroom",
  "Dining Room",
  "Study Room",
  "Other"
];

const workCategories = [
  "Painting",
  "Furniture",
  "Lighting",
  "Flooring",
  "Plumbing",
  "Electrical",
  "Other"
];

const plans = [
  "Premium",
  "Premium+",
  "Luxury"
];

const roomsContainer = document.getElementById("rooms-container");
const calculateBtn = document.getElementById("calculate-btn");
const resultContainer = document.getElementById("result");

calculateBtn.addEventListener("click", calculateEstimate);

const bhkSelect = document.getElementById("bhk");
bhkSelect.addEventListener("change", handleBHKChange);

function handleBHKChange() {
  const selectedBHK = bhkSelect.value;
  const numRooms = parseInt(selectedBHK) || 0;

  roomsContainer.innerHTML = ""; // Clear previous rooms

  for (let i = 0; i < numRooms; i++) {
    const roomDiv = createRoomFields(i);
    roomsContainer.appendChild(roomDiv);
  }
}

// ...
function createRoomFields(roomIndex) {
  const roomDiv = document.createElement("div");
  roomDiv.classList.add("room");

  const roomTitle = document.createElement("h3");
  roomTitle.textContent = `Room ${roomIndex + 1}`;
  roomDiv.appendChild(roomTitle);

  const roomTypeLabel = document.createElement("label");
  roomTypeLabel.textContent = "Select Room Type:";

  const roomTypeSelect = document.createElement("select");
  for (const type of roomTypes) {
    const option = document.createElement("option");
    option.value = type;
    option.text = type;
    roomTypeSelect.appendChild(option);
  }

  roomTypeLabel.appendChild(roomTypeSelect);
  roomDiv.appendChild(roomTypeLabel);

  // Create "Add On" checkbox
  const addOnCheckboxLabel = document.createElement("label");
  const addOnCheckbox = document.createElement("input");
  addOnCheckbox.type = "checkbox";
  addOnCheckbox.name = `add-on-${roomIndex}`;
  addOnCheckbox.value = "addOn";
  addOnCheckboxLabel.textContent = "Add On";
  addOnCheckboxLabel.appendChild(addOnCheckbox);
  roomDiv.appendChild(addOnCheckboxLabel);

  // Container for dynamic "Add On" elements
  const addOnContainer = document.createElement("div");
  roomDiv.appendChild(addOnContainer);

  // Handle "Add On" checkbox change event
  addOnCheckbox.addEventListener("change", function () {
    if (addOnCheckbox.checked) {
      createAddOnElements(addOnContainer, roomIndex);
    } else {
      addOnContainer.innerHTML = ""; // Clear "Add On" elements when checkbox is unchecked
    }
  });

  return roomDiv;
}
function createAddOnElements(container, roomIndex, level = 1) {
  const addOnDropdown = document.createElement("select");
  addOnDropdown.name = `add-ons-${roomIndex}-${level}`;
  
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.text = "Select a category";
  defaultOption.disabled = true;
  defaultOption.selected = true;
  addOnDropdown.appendChild(defaultOption);

  for (const category of workCategories) {
    const option = document.createElement("option");
    option.value = category;
    option.text = category;
    addOnDropdown.appendChild(option);
  }

  const addOnCheckbox = document.createElement("input");
  addOnCheckbox.type = "checkbox";
  addOnCheckbox.name = `add-on-${roomIndex}-${level}`;
  addOnCheckbox.value = `addOn-${level}`;

  // Create "Add On" checkbox label
  const addOnCheckboxLabel = document.createElement("label");
  addOnCheckboxLabel.textContent = `Add On`;
  addOnCheckboxLabel.appendChild(addOnCheckbox);

  // Append the dropdown and the "Add On" checkbox label
  container.appendChild(addOnDropdown);
  container.appendChild(addOnCheckboxLabel);

  // Handle "Add On" checkbox change event for the current level
  addOnCheckbox.addEventListener("change", function () {
    if (addOnCheckbox.checked) {
      createAddOnElements(container, roomIndex, level + 1);
    } else {
      // Clear this and higher levels when checkbox is unchecked
      let nextLevelContainer = container.querySelector(`[name="add-ons-${roomIndex}-${level + 1}"]`);
      while (nextLevelContainer) {
        nextLevelContainer.remove();
        nextLevelContainer = container.querySelector(`[name="add-ons-${roomIndex}-${level + 1}"]`);
      }
    }
  });
}


  

function addCategoryToRoom(categorySelect) {
  const selectedCategory = categorySelect.value;
  if (selectedCategory) {
    categorySelect.options[categorySelect.selectedIndex].disabled = true;
  }
}

function calculateEstimate() {
  const totalEstimate = 2000; // Placeholder value, you can calculate this based on your requirements

  resultContainer.innerHTML = `<p>Your estimated price is: $${totalEstimate}</p>`;
}

// ...

const addRoomBtn = document.getElementById("add-room-btn");
addRoomBtn.addEventListener("click", addRoom);

function addRoom() {
  const roomIndex = roomsContainer.children.length;

  const roomDiv = createRoomFields(roomIndex);
  roomsContainer.appendChild(roomDiv);
}

// ...

const categoryOptions = document.getElementById("category-options");
for (const category of workCategories) {
  const categoryCheckbox = document.createElement("input");
  categoryCheckbox.type = "checkbox";
  categoryCheckbox.name = "selected-categories[]";
  categoryCheckbox.value = category;

  const categoryLabel = document.createElement("label");
  categoryLabel.textContent = category;
  categoryLabel.appendChild(categoryCheckbox);

  categoryOptions.appendChild(categoryLabel);
}