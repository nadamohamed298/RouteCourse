window.addEventListener("load", onWindowLoad);

function onWindowLoad() {
  var contacts = loadContactsFromLocalStorage();
  displayContacts(contacts);
  updateCounters(contacts);
  updateAsideCards(contacts);
  subscribeInInputEvents();
  subscribeToSearchInput();
}

function loadContactsFromLocalStorage() {
  var contactsArrAsString = localStorage.getItem("contacts");
  if (contactsArrAsString === null) {
    return [];
  } else {
    var contactsObjectsArr = JSON.parse(contactsArrAsString);
    return contactsObjectsArr;
  }
}

function getInitials(name) {
  var nameParts = name.trim().split(" ");
  if (nameParts.length === 1) {
    return nameParts[0].substring(0, 1).toUpperCase();
  }
  var firstName = nameParts[0];
  var lastName = nameParts[nameParts.length - 1];
  return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
}

function getRandomGradient() {
  var gradients = [
    "linear-gradient(to bottom right, #FB2C36 0%, #E7000B 100%)",
    "linear-gradient(to bottom right, #FF6900 0%, #E7000B 100%)",
    "linear-gradient(to bottom right, #00BC7D 0%, #009689 100%)",
    "linear-gradient(to bottom right, #E12AFB 0%, #E60076 100%)",
    "linear-gradient(to bottom right, #00B8DB 0%, #155DFC 100%)",
    "linear-gradient(to bottom right, #ff2056 0%, #e60076 100%)",
  ];

  var randomIndex = Math.floor(Math.random() * gradients.length);
  return gradients[randomIndex];
}

function updateCounters(contactsArray) {
  var total = contactsArray.length;
  var favorites = 0;
  var emergencies = 0;

  for (var i = 0; i < contactsArray.length; i++) {
    if (contactsArray[i].isFavorite === true) {
      favorites++;
    }
    if (contactsArray[i].isEmergency === true) {
      emergencies++;
    }
  }

  document.getElementById("totalCounter").querySelector("h2").textContent = total;
  document.getElementById("favoritesCounter").querySelector("h2").textContent = favorites;
  document.getElementById("emergencyCounter").querySelector("h2").textContent = emergencies;

  var contactsHeading = document.querySelector(".contacts-heading p");
  if (contactsHeading !== null) {
    contactsHeading.textContent = `Manage and organize your ${total} contacts`;
  }
}

function updateAsideCards(contactsArray) {
  // Update Favorites aside
  var favorites = [];
  for (var i = 0; i < contactsArray.length; i++) {
    if (contactsArray[i].isFavorite === true) {
      favorites.push(contactsArray[i]);
    }
  }

  var favContainer = document.querySelector(".aside-favourites-added-contact-card-container");
  var favCardBottom = document.querySelector(".side-card1 .fav-card-bottom");
  var favText = document.querySelector(".side-card1 .fav-card-text");

  if (favorites.length > 0) {
    favContainer.classList.remove("d-none");
    favCardBottom.classList.add("d-none");
    favText.classList.add("d-none");

    var favCard = favContainer.querySelector(".aside-favorites-added-contact-card");
    var favHTML = "";

    for (var j = 0; j < favorites.length; j++) {
      var contact = favorites[j];
      var color = contact.gradient;
      if (color === null || color === undefined || color === "") {
        color = getRandomGradient();
      }
      var initials = getInitials(contact.name);
      
      favHTML += `
        <div class="favorite-contact-item d-flex align-items-center mb-2 w-100">
          <div class="favorites-name-initials flex-shrink-0">
            <div class="favorites-name-initials-box fw-semibold d-flex justify-content-center align-items-center" style="background: ${color}">${initials}</div>
          </div>
          <div class="favorites-name-phone-number flex-grow-1 mx-2">
            <h4 class="fw-medium m-0" style="font-size: 13px;">${contact.name}</h4>
            <p class="pn-text m-0" style="font-size: 11px; color: #666;">${contact.phone}</p>
          </div>
          <a href="tel:${contact.phone}" class="favorites-phone-icon-box d-flex justify-content-center align-items-center flex-shrink-0">
            <i class="fa-solid fa-phone"></i>
          </a>
        </div>
      `;
    }
    
    favCard.innerHTML = favHTML;
  } else {
    favContainer.classList.add("d-none");
    favCardBottom.classList.remove("d-none");
    favText.classList.remove("d-none");
  }

  // Update Emergency aside
  var emergencies = [];
  for (var k = 0; k < contactsArray.length; k++) {
    if (contactsArray[k].isEmergency === true) {
      emergencies.push(contactsArray[k]);
    }
  }

  var emergencyContainer = document.querySelector(".aside-emergency-added-contact-card-container");
  var emergencyCardBottom = document.querySelector(".side-card2 .fav-card-bottom");
  var emergencyText = document.querySelector(".side-card2 .fav-card-text");

  if (emergencies.length > 0) {
    emergencyContainer.classList.remove("d-none");
    emergencyCardBottom.classList.add("d-none");
    emergencyText.classList.add("d-none");

    var emergencyCard = emergencyContainer.querySelector(".aside-emergency-added-contact-card");
    var emergencyHTML = "";

    for (var l = 0; l < emergencies.length; l++) {
      var contact = emergencies[l];
      var color = contact.gradient;
      if (color === null || color === undefined || color === "") {
        color = getRandomGradient();
      }
      var initials = getInitials(contact.name);
      
      emergencyHTML += `
        <div class="emergency-contact-item d-flex align-items-center mb-2 w-100">
          <div class="emergency-name-initials flex-shrink-0">
            <div class="emergency-name-initials-box fw-semibold d-flex justify-content-center align-items-center" style="background: ${color}">${initials}</div>
          </div>
          <div class="emergency-name-phone-number flex-grow-1 mx-2">
            <h4 class="fw-medium m-0" style="font-size: 13px;">${contact.name}</h4>
            <p class="pn-text m-0" style="font-size: 11px; color: #666;">${contact.phone}</p>
          </div>
          <a href="tel:${contact.phone}" class="emergency-phone-icon-box d-flex justify-content-center align-items-center flex-shrink-0">
            <i class="fa-solid fa-phone"></i>
          </a>
        </div>
      `;
    }
    
    emergencyCard.innerHTML = emergencyHTML;
  } else {
    emergencyContainer.classList.add("d-none");
    emergencyCardBottom.classList.remove("d-none");
    emergencyText.classList.remove("d-none");
  }
}

function displayContacts(contacts) {
  var addedContactCard = document.getElementById("addedContactCard");
  addedContactCard.innerHTML = "";

  var emptySection = document.getElementById("emptyState");
  if (contacts.length > 0) {
    emptySection.classList.add("d-none");
  } else {
    emptySection.classList.remove("d-none");
  }

  function getClass(condition, trueClass, falseClass) {
    if (condition === true) {
      return trueClass;
    }
    return falseClass;
  }

  function getEmailDisplay(email) {
    if (email !== null && email !== undefined && email.trim() !== "") {
      return `
        <div class="info-row mb-2">
          <div class="icon-box icon-box2">
            <i class="fa-solid fa-envelope"></i>
          </div>
          <span>${email}</span>
        </div>
      `;
    }
    return "";
  }

  function getAddressDisplay(address) {
    if (address !== null && address !== undefined && address.trim() !== "") {
      return `
        <div class="info-row">
          <div class="icon-box icon-box3">
            <i class="fa-solid fa-location-dot"></i>
          </div>
          <span>${address}</span>
        </div>
      `;
    }
    return "";
  }

  function getGroupBadge(group) {
    if (group === "") {
      return "";
    }

    var groupColors = {
      Family: { color: "#1447e6", background: "#dbeafe" },
      Friends: { color: "#008236", background: "#dcfce7" },
      Work: { color: "#8200db", background: "#f3e8ff" },
      School: { color: "#bb4d00", background: "#fef3c6" },
      Other: { color: "#364153", background: "#f6f3f4" },
    };

    var colors = groupColors[group];
    if (colors === null || colors === undefined) {
      return "";
    }

    return `
      <span class="badge-group py-1 px-2 fw-medium" style="color: ${colors.color}; background-color: ${colors.background};">${group}</span>
    `;
  }

  function getEmergencyBadge(isEmergency) {
    if (isEmergency !== true) {
      return "";
    }
    return `
      <span class="badge-emergency py-1 px-2 fw-medium d-flex align-items-center gap-1">
        <i class="fa-solid fa-heart-pulse"></i>
        Emergency
      </span>
    `;
  }

  function getEmailButton(email) {
    if (email !== null && email !== undefined && email.trim() !== "") {
      return `
        <button class="email-btn" onclick="sendEmail('${email}')">
          <i class="fa-solid fa-envelope"></i>
        </button>
      `;
    }
    return "";
  }

  var contactsHTML = "";

  for (var i = 0; i < contacts.length; ++i) {
    var contact = contacts[i];
    var initials = getInitials(contact.name);

    var gradient = contact.gradient;
    if (gradient === null || gradient === undefined || gradient === "") {
      gradient = getRandomGradient();
      contact.gradient = gradient;
      saveContactsToLocalStorage(contacts);
    }

    var favoriteStarClass = getClass(contact.isFavorite === true, "fa-solid", "fa-regular");
    var emergencyHeartClass = getClass(contact.isEmergency === true, "fa-solid", "fa-regular");
    var emergencyIcon = getClass(contact.isEmergency === true, "fa-heart-pulse", "fa-heart");
    var favoriteBadgeClass = getClass(contact.isFavorite === true, "", "d-none");
    var emergencyBadgeClass = getClass(contact.isEmergency === true, "", "d-none");
    var favoriteActiveClass = contact.isFavorite === true ? " active" : "";
    var emergencyActiveClass = contact.isEmergency === true ? " active" : "";

    var emailDisplay = getEmailDisplay(contact.email);
    var addressDisplay = getAddressDisplay(contact.address);
    var groupBadgeHtml = getGroupBadge(contact.group);
    var emergencyBadgeHtml = getEmergencyBadge(contact.isEmergency);
    var emailButtonHtml = getEmailButton(contact.email);

    contactsHTML += `
      <div class="contact-card w-100" data-index="${i}">
        <div class="top-card">
          <div class="card-header-custom d-flex align-items-start">
            <div class="avatar position-relative">
              <div class="avatar-circle" style="background: ${gradient};">${initials}</div>
              <span class="favorite-badge ${favoriteBadgeClass}"><i class="fa-solid fa-star"></i></span>
              <span class="emergency-badge ${emergencyBadgeClass}"><i class="fa-solid fa-heart-pulse"></i></span>
            </div>
            <div class="flex-grow-1 pt-1">
              <h3 class="contact-name fs-6 fw-semibold m-0">${contact.name}</h3>
              <div class="info-row mt-1">
                <div class="icon-box icon-box1"><i class="fa-solid fa-phone"></i></div>
                <span>${contact.phone}</span>
              </div>
            </div>
          </div>
          <div class="contact-info">
            ${emailDisplay}
            ${addressDisplay}
          </div>
          <div class="card-footer d-flex flex-wrap">
            ${groupBadgeHtml}
            ${emergencyBadgeHtml}
          </div>
        </div>
        <div class="card-footer-custom">
          <div class="left-actions">
            <button class="phone-btn" onclick="makeCall('${contact.phone}')">
              <i class="fa-solid fa-phone"></i>
            </button>
            ${emailButtonHtml}
          </div>
          <div class="right-actions">
            <button class="fav-btn${favoriteActiveClass}" onclick="toggleFavorite(${i})">
              <i class="${favoriteStarClass} fa-star"></i>
            </button>
            <button class="emergency-btn${emergencyActiveClass}" onclick="toggleEmergency(${i})">
              <i class="${emergencyHeartClass} ${emergencyIcon}"></i>
            </button>
            <button class="edit-btn" onclick="editContact(${i})">
              <i class="fa-solid fa-pen"></i>
            </button>
            <button class="delete-btn" onclick="deleteContact(${i})">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  addedContactCard.innerHTML = contactsHTML;
  updateCounters(contacts);
  updateAsideCards(contacts);
}

function makeCall(phoneNumber) {
  window.location.href = `tel:${phoneNumber}`;
}

function sendEmail(email) {
  window.location.href = `mailto:${email}`;
}

function toggleFavorite(index) {
  var contacts = loadContactsFromLocalStorage();
  if (contacts[index].isFavorite === true) {
    contacts[index].isFavorite = false;
  } else {
    contacts[index].isFavorite = true;
  }
  saveContactsToLocalStorage(contacts);
  displayContacts(contacts);
}

function toggleEmergency(index) {
  var contacts = loadContactsFromLocalStorage();
  if (contacts[index].isEmergency === true) {
    contacts[index].isEmergency = false;
  } else {
    contacts[index].isEmergency = true;
  }
  saveContactsToLocalStorage(contacts);
  displayContacts(contacts);
}

function deleteContact(index) {
  var contacts = loadContactsFromLocalStorage();
  var contactName = contacts[index].name;

  Swal.fire({
    title: "Delete Contact?",
    text: `Are you sure you want to delete ${contactName}? This action cannot be undone.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#6B7280",
    confirmButtonText: "Yes, delete it!",
  }).then(function (result) {
    if (result.isConfirmed) {
      contacts.splice(index, 1);
      saveContactsToLocalStorage(contacts);
      displayContacts(contacts);

      Swal.fire({
        title: "Deleted!",
        text: "Contact has been deleted.",
        icon: "success",
        showConfirmButton: false,
        timer: 2500
      });
    }
  });
}

function editContact(index) {
  var contacts = loadContactsFromLocalStorage();
  var contact = contacts[index];

  var emailValue = contact.email || "";
  var addressValue = contact.address || "";
  var groupValue = contact.group || "";
  var notesValue = contact.notes || "";
  var isFavoriteValue = false;
  var isEmergencyValue = false;

  if (contact.isFavorite === true) {
    isFavoriteValue = true;
  }
  if (contact.isEmergency === true) {
    isEmergencyValue = true;
  }

  document.getElementById("fullName").value = contact.name;
  document.getElementById("phoneNumber").value = contact.phone;
  document.getElementById("emailAddress").value = emailValue;
  document.getElementById("address").value = addressValue;
  document.getElementById("group").value = groupValue;
  document.getElementById("notes").value = notesValue;
  document.getElementById("isFavorite").checked = isFavoriteValue;
  document.getElementById("isEmergency").checked = isEmergencyValue;

  document.querySelector(".modal-title").textContent = "Edit Contact";
  document.getElementById("saveContact").textContent = "Update Contact";

  document.getElementById("saveContact").dataset.editIndex = index;

  var modal = new bootstrap.Modal(document.getElementById("staticBackdrop"));
  modal.show();
}

function saveContactsToLocalStorage(contactsArray) {
  var stringifiedContacts = JSON.stringify(contactsArray);
  localStorage.setItem("contacts", stringifiedContacts);
}

function subscribeInInputEvents() {
  var fullNameInput = document.getElementById("fullName");
  fullNameInput.addEventListener("input", onFullNameInput);
  fullNameInput.addEventListener("blur", onFullNameBlur);

  var phoneNumberInput = document.getElementById("phoneNumber");
  phoneNumberInput.addEventListener("input", onPhoneNumberInput);
  phoneNumberInput.addEventListener("blur", onPhoneNumberBlur);

  var emailAddressInput = document.getElementById("emailAddress");
  emailAddressInput.addEventListener("input", onEmailAddressInput);
  emailAddressInput.addEventListener("blur", onEmailAddressBlur);

  var saveButton = document.getElementById("saveContact");
  saveButton.addEventListener("click", onButtonSaveClick);

  document.getElementById("staticBackdrop").addEventListener("hidden.bs.modal", function () {
    document.getElementById("saveContact").dataset.editIndex = -1;
    document.querySelector(".modal-title").textContent = "Add New Contact";
    document.getElementById("saveContact").textContent = "Save Contact";
    document.getElementById("contactForm").reset();
    document.getElementById("fullNameError").classList.add("d-none");
    document.getElementById("phoneNumberError").classList.add("d-none");
    document.getElementById("emailAddressError").classList.add("d-none");

    document.getElementById("fullName").classList.remove("invalid");
    document.getElementById("phoneNumber").classList.remove("invalid");
    document.getElementById("emailAddress").classList.remove("invalid");
  });
}

function subscribeToSearchInput() {
  var searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", function (e) {
    var searchTerm = e.target.value.trim().toLowerCase();
    var allContacts = loadContactsFromLocalStorage();

    if (searchTerm === "") {
      displayContacts(allContacts);
      return;
    }

    var filteredContacts = [];
    for (var i = 0; i < allContacts.length; i++) {
      var contact = allContacts[i];
      if (
        contact.name.toLowerCase().indexOf(searchTerm) !== -1 ||
        contact.phone.indexOf(searchTerm) !== -1 ||
        contact.email.toLowerCase().indexOf(searchTerm) !== -1
      ) {
        filteredContacts.push(contact);
      }
    }

    displayContacts(filteredContacts);
  });
}

function onFullNameInput(eventArgs) {
  var value = eventArgs.target.value.trim();
  var fullNameError = document.getElementById("fullNameError");
  var input = eventArgs.target;

  if (value.length === 0) {
    fullNameError.classList.add("d-none");
    input.classList.remove("invalid");
    return;
  }

  var fullNameRegex = /^[a-zA-Z ]{2,50}$/i;
  var isValidValue = fullNameRegex.test(value);

  if (isValidValue === true) {
    fullNameError.classList.add("d-none");
    input.classList.remove("invalid");
  } else {
    fullNameError.classList.remove("d-none");
  }
}

function onFullNameBlur(eventArgs) {
  var value = eventArgs.target.value.trim();
  var input = eventArgs.target;
  var fullNameError = document.getElementById("fullNameError");

  if (value.length === 0) {
    fullNameError.classList.add("d-none");
    input.classList.remove("invalid");
    return;
  }

  var fullNameRegex = /^[a-zA-Z ]{2,50}$/i;
  var isValidValue = fullNameRegex.test(value);

  if (isValidValue === true) {
    fullNameError.classList.add("d-none");
    input.classList.remove("invalid");
  } else {
    fullNameError.classList.remove("d-none");
    input.classList.add("invalid");
  }
}

function onPhoneNumberInput(eventArgs) {
  var value = eventArgs.target.value.trim();
  var phoneNumberError = document.getElementById("phoneNumberError");
  var input = eventArgs.target;

  if (value.length === 0) {
    phoneNumberError.classList.add("d-none");
    input.classList.remove("invalid");
    return;
  }

  var phoneNumberRegex = /^(\+2)?01[125][0-9]{8}$/;
  var isValidValue = phoneNumberRegex.test(value);

  if (isValidValue === true) {
    phoneNumberError.classList.add("d-none");
    input.classList.remove("invalid");
  } else {
    phoneNumberError.classList.remove("d-none");
  }
}

function onPhoneNumberBlur(eventArgs) {
  var value = eventArgs.target.value.trim();
  var input = eventArgs.target;
  var phoneNumberError = document.getElementById("phoneNumberError");

  if (value.length === 0) {
    phoneNumberError.classList.add("d-none");
    input.classList.remove("invalid");
    return;
  }

  var phoneNumberRegex = /^(\+2)?01[125][0-9]{8}$/;
  var isValidValue = phoneNumberRegex.test(value);

  if (isValidValue === true) {
    phoneNumberError.classList.add("d-none");
    input.classList.remove("invalid");
  } else {
    phoneNumberError.classList.remove("d-none");
    input.classList.add("invalid");
  }
}

function onEmailAddressInput(eventArgs) {
  var value = eventArgs.target.value.trim();
  var emailAddressError = document.getElementById("emailAddressError");
  var input = eventArgs.target;

  if (value.length === 0) {
    emailAddressError.classList.add("d-none");
    input.classList.remove("invalid");
    return;
  }

  var emailAddressRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;
  var isValidValue = emailAddressRegex.test(value);

  if (isValidValue === true) {
    emailAddressError.classList.add("d-none");
    input.classList.remove("invalid");
  } else {
    emailAddressError.classList.remove("d-none");
  }
}

function onEmailAddressBlur(eventArgs) {
  var value = eventArgs.target.value.trim();
  var input = eventArgs.target;
  var emailAddressError = document.getElementById("emailAddressError");

  if (value.length === 0) {
    emailAddressError.classList.add("d-none");
    input.classList.remove("invalid");
    return;
  }

  var emailAddressRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;
  var isValidValue = emailAddressRegex.test(value);

  if (isValidValue === true) {
    emailAddressError.classList.add("d-none");
    input.classList.remove("invalid");
  } else {
    emailAddressError.classList.remove("d-none");
    input.classList.add("invalid");
  }
}

function onButtonSaveClick(eventArgs) {
  eventArgs.preventDefault();

  var fullNameValidationResult = isValidFullName();
  if (fullNameValidationResult.isValid === false) {
    Swal.fire({
      icon: fullNameValidationResult.icon,
      title: fullNameValidationResult.title,
      text: fullNameValidationResult.text,
    });
    return;
  }

  var phoneNumberValidationResult = isValidPhoneNumber();
  if (phoneNumberValidationResult.isValid === false) {
    Swal.fire({
      icon: phoneNumberValidationResult.icon,
      title: phoneNumberValidationResult.title,
      text: phoneNumberValidationResult.text,
    });
    return;
  }

  var emailAddressValidationResult = isValidEmail();
  if (emailAddressValidationResult.isValid === false) {
    Swal.fire({
      icon: emailAddressValidationResult.icon,
      title: emailAddressValidationResult.title,
      text: emailAddressValidationResult.text,
    });
    return;
  }

  var phoneNumber = document.getElementById("phoneNumber").value.trim();
  var contacts = loadContactsFromLocalStorage();
  var editIndex = parseInt(document.getElementById("saveContact").dataset.editIndex);

  for (var i = 0; i < contacts.length; i++) {
    if (i !== editIndex && contacts[i].phone === phoneNumber) {
      var duplicateContactName = contacts[i].name;

      Swal.fire({
        icon: "error",
        title: "Duplicate Phone Number",
        text: `A contact with this phone number already exists: ${duplicateContactName}`,
        confirmButtonColor: "#d33",
        confirmButtonText: "OK",
      });
      return;
    }
  }

  var newContact = createContactObject();
  if (editIndex !== undefined && isNaN(editIndex) === false && editIndex >= 0) {
    contacts[editIndex] = newContact;
    Swal.fire({
      title: "Updated!",
      text: "Contact has been updated successfully.",
      icon: "success",
      timer: 2500,
      showConfirmButton: false,
    });
  } else {
    contacts.push(newContact);
    Swal.fire({
      title: "Added!",
      text: "Contact has been added successfully.",
      icon: "success",
      timer: 2500,
      showConfirmButton: false,
    });
  }

  saveContactsToLocalStorage(contacts);
  displayContacts(contacts);

  var modal = bootstrap.Modal.getInstance(document.getElementById("staticBackdrop"));
  if (modal !== null) {
    modal.hide();
  }
}

function isValidFullName() {
  var validationResult = {
    isValid: true,
    icon: "",
    title: "",
    text: "",
  };
  var fullNameInput = document.getElementById("fullName");
  var fullNameValue = fullNameInput.value.trim();
  if (fullNameValue.length === 0) {
    validationResult.isValid = false;
    validationResult.icon = "error";
    validationResult.title = "Missing Name";
    validationResult.text = "Please enter a name for the contact!";
    return validationResult;
  }
  var fullNameRegex = /^[a-zA-Z ]{2,50}$/i;
  if (fullNameRegex.test(fullNameValue) === false) {
    validationResult.isValid = false;
    validationResult.icon = "error";
    validationResult.title = "Invalid Name";
    validationResult.text = "Name should contain only letters and spaces (2-50 characters)";
    return validationResult;
  }

  return validationResult;
}

function isValidPhoneNumber() {
  var phoneNumberInput = document.getElementById("phoneNumber");
  var phoneNumberValue = phoneNumberInput.value.trim();
  var validationResult = {
    isValid: true,
    icon: "",
    title: "",
    text: "",
  };
  if (phoneNumberValue.length === 0) {
    validationResult.isValid = false;
    validationResult.icon = "error";
    validationResult.title = "Missing Phone";
    validationResult.text = "Please enter a phone number!";
    return validationResult;
  }
  var phoneNumberRegex = /^(\+2)?01[125][0-9]{8}$/;
  if (phoneNumberRegex.test(phoneNumberValue) === false) {
    validationResult.isValid = false;
    validationResult.icon = "error";
    validationResult.title = "Invalid Phone";
    validationResult.text = "Please enter a valid Egyptian phone number (e.g., 01012345678 or +201012345678)";
    return validationResult;
  }

  return validationResult;
}

function isValidEmail() {
  var validationResult = {
    isValid: true,
    icon: "",
    title: "",
    text: "",
  };
  var emailAddressInput = document.getElementById("emailAddress");
  var emailAddressValue = emailAddressInput.value.trim();
  if (emailAddressValue.length === 0) {
    return validationResult;
  }
  var emailAddressRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;
  if (emailAddressRegex.test(emailAddressValue) === false) {
    validationResult.isValid = false;
    validationResult.icon = "error";
    validationResult.title = "Invalid Email";
    validationResult.text = "Please enter a valid email address";
    return validationResult;
  }

  return validationResult;
}

function createContactObject() {
  var fullNameInput = document.getElementById("fullName");
  var fullNameValue = fullNameInput.value.trim();

  var phoneNumberInput = document.getElementById("phoneNumber");
  var phoneNumberValue = phoneNumberInput.value.trim();

  var emailAddressInput = document.getElementById("emailAddress");
  var emailAddressValue = emailAddressInput.value.trim();

  var addressInput = document.getElementById("address");
  var addressValue = addressInput.value.trim();

  var groupDropdown = document.getElementById("group");
  var groupSelectedValue = groupDropdown.value;

  var notesInput = document.getElementById("notes");
  var notesValue = notesInput.value.trim();

  var favoriteCheckbox = document.getElementById("isFavorite");
  var isFavoriteValue = favoriteCheckbox.checked;

  var emergencyCheckbox = document.getElementById("isEmergency");
  var isEmergencyValue = emergencyCheckbox.checked;

  var editIndex = parseInt(document.getElementById("saveContact").dataset.editIndex);
  var contacts = loadContactsFromLocalStorage();
  var existingGradient = null;

  if (editIndex !== undefined && isNaN(editIndex) === false && editIndex >= 0 && contacts[editIndex] !== null && contacts[editIndex] !== undefined) {
    existingGradient = contacts[editIndex].gradient;
  }

  var gradient = existingGradient;
  if (gradient === null || gradient === undefined || gradient === "") {
    gradient = getRandomGradient();
  }

  var newContact = {
    name: fullNameValue,
    phone: phoneNumberValue,
    email: emailAddressValue,
    address: addressValue,
    group: groupSelectedValue,
    notes: notesValue,
    isFavorite: isFavoriteValue,
    isEmergency: isEmergencyValue,
    gradient: gradient,
  };
  return newContact;
}