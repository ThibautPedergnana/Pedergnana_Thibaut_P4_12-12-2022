function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal
const closeBtn = document.querySelector(".close");

function closeModal() {
  modalbg.classList.remove("center");
  modalbg.style.display = "none";
}
closeBtn.addEventListener("click", closeModal);

// Check validation firstname and lastname
function checkValidationFormName(inputName) {
  let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
  return charRegExp.test(inputName.value);
}

// Check validation email
function checkValidationFormEmail(inputEmail) {
  let emailRegExp = new RegExp(
    "^[a-zA-Z0-9.-]+[@]{1}[a-zA-Z0-9.-]+[.]{1}[a-z]{2,10}$"
  );
  return emailRegExp.test(inputEmail.value);
}

// Check validation birthdate
function checkValidationFormBirthdate(inputBirthdate) {
  const birthdate = new Date(inputBirthdate.value);
  return birthdate < new Date();
}

// Check validation turnament number
function checkValidationFormQuantity(inputQuantity) {
  let numberRegExp = new RegExp("^([0-9]|[1-9][0-9])$");
  return numberRegExp.test(inputQuantity.value);
}

// Check validation locations
function checkValidationFormLocations(locations) {
  return locations.find((location) => location.checked);
}

// Check validation ToS
function checkValidationFormTos(inputTos) {
  return inputTos.checked;
}

// error message firstname
function validFirstName(inputFirstName) {
  const firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");
  if (checkValidationFormName(inputFirstName)) {
    firstNameErrorMsg.innerHTML = "";
  } else {
    firstNameErrorMsg.innerHTML =
      "Veuillez entrer 2 caractères ou plus pour le champ du prénom.";
  }
}

// error message lastname
function validLastName(inputLastName) {
  const lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");

  if (checkValidationFormName(inputLastName)) {
    lastNameErrorMsg.innerHTML = "";
  } else {
    lastNameErrorMsg.innerHTML =
      "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
  }
}

// error message email
function validEmail(inputEmail) {
  const emailErrorMsg = document.querySelector("#emailErrorMsg");
  if (checkValidationFormEmail(inputEmail)) {
    emailErrorMsg.innerHTML = "";
  } else {
    emailErrorMsg.innerHTML = "Veuillez renseigner votre email.";
  }
}

// error message birthdate
function validBirthdate(inputBirthdate) {
  const birthdateErrorMsg = document.querySelector("#birthdateErrorMsg");
  if (checkValidationFormBirthdate(inputBirthdate)) {
    birthdateErrorMsg.innerHTML = "";
  } else {
    birthdateErrorMsg.innerHTML = "Vous devez entrer votre date de naissance.";
  }
}

// error message quantity
function validQuantity(inputQuantity) {
  const quantityErrorMsg = document.querySelector("#quantityErrorMsg");
  if (checkValidationFormQuantity(inputQuantity)) {
    quantityErrorMsg.innerHTML = "";
  } else {
    quantityErrorMsg.innerHTML = "Veuillez entrer un nombre entre 0 et 99.";
  }
}

// error message locations
function validLocations(locations) {
  const locationsErrorMsg = document.querySelector("#locationsErrorMsg");
  if (checkValidationFormLocations(locations)) {
    locationsErrorMsg.innerHTML = "";
  } else {
    locationsErrorMsg.innerHTML = "Veuillez choisir une localisation.";
  }
}

// error message ToS
function validTos(inputTos) {
  const tosErrorMsg = document.querySelector("#tosErrorMsg");
  if (checkValidationFormTos(inputTos)) {
    tosErrorMsg.innerHTML = "";
  } else {
    tosErrorMsg.innerHTML =
      "Vous devez vérifier que vous acceptez les termes et conditions.";
  }
}

// form instructions
function getForm() {
  let form = document.querySelector(".form");

  // Check validation firstname and lastname when changing
  form.firstName.addEventListener("change", function () {
    validFirstName(this);
  });

  // Check validation lastname and lastname when changing
  form.lastName.addEventListener("change", function () {
    validLastName(this);
  });

  // Check validation email when changing
  form.email.addEventListener("change", function () {
    validEmail(this);
  });

  // Check validation birthdate when changing
  form.birthdate.addEventListener("change", function () {
    validBirthdate(this);
  });

  // Check validation ToS when changing
  form.tos.addEventListener("change", function () {
    validTos(this);
  });

  // Check validation quantity when changing
  form.quantity.addEventListener("change", function () {
    validQuantity(this);
  });
}
getForm();

function checkValidationFormAll(
  tos,
  locations,
  birthdate,
  email,
  lastname,
  firstname,
  quantity
) {
  return (
    checkValidationFormTos(tos) &&
    checkValidationFormQuantity(quantity) &&
    checkValidationFormLocations(locations) &&
    checkValidationFormBirthdate(birthdate) &&
    checkValidationFormEmail(email) &&
    checkValidationFormName(lastname) &&
    checkValidationFormName(firstname)
  );
}

function submitForm() {
  const submitBtn = document.querySelector(".btn-submit");

  submitBtn.addEventListener("click", (e) => {
    // prevent page reload
    e.preventDefault();
    const tos = document.querySelector("#tos");
    const birthdate = document.querySelector("#birthdate");
    const email = document.querySelector("#email");
    const lastname = document.querySelector("#lastName");
    const firstname = document.querySelector("#firstName");
    let quantity = document.querySelector("#quantity");
    let locations = document.querySelectorAll(".locations");
    locations = [...locations];

    // Display error messages
    validTos(tos);
    validLocations(locations);
    validBirthdate(birthdate);
    validEmail(email);
    validLastName(lastname);
    validFirstName(firstname);
    validQuantity(quantity);

    // Check entire form then submit if valid
    if (
      checkValidationFormAll(
        tos,
        locations,
        birthdate,
        email,
        lastname,
        firstname,
        quantity
      )
    ) {
      // Show the success message
      const success = document.querySelector(".success-message");
      success.removeAttribute("hidden");
      //  Hide the form but keep the modal
      const formData = document.querySelectorAll(".formData");
      formData.forEach((data, index) => {
        data.classList.add("hidden");
      });
      // Change value of button
      const btn = document.querySelector(".btn-submit");
      btn.value = "Fermer";
      // Button now close the modal
      btn.addEventListener("click", closeModal);
      modalbg.classList.add("center");
    }
  });
}
submitForm();
