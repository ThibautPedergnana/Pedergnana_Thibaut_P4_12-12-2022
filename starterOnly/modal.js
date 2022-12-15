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

// Check validation ToS
function checkValidationFormTos(inputTos) {
  return inputTos.checked;
}

// Check validation birthdate
function checkValidationFormBirthdate(inputBirthdate) {
  const birthdate = new Date(inputBirthdate.value);
  return birthdate < new Date();
}

// Check validation email
function checkValidationFormEmail(inputEmail) {
  let emailRegExp = new RegExp(
    "^[a-zA-Z0-9.-]+[@]{1}[a-zA-Z0-9.-]+[.]{1}[a-z]{2,10}$"
  );
  return emailRegExp.test(inputEmail.value);
}

// Check validation firstname and lastname
function checkValidationFormName(inputName) {
  let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
  return charRegExp.test(inputName.value);
}

// Check validation locations
function checkValidationFormLocations(locations) {
  return locations.find((location) => location.checked);
}

// error message ToS
function validTos(inputTos) {
  let tosErrorMsg = document.querySelector("#tosErrorMsg");
  if (checkValidationFormTos(inputTos)) {
    tosErrorMsg.innerHTML = "";
  } else {
    tosErrorMsg.innerHTML =
      "Vous devez vérifier que vous acceptez les termes et conditions.";
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

// error message email
function validEmail(inputEmail) {
  let emailErrorMsg = document.querySelector("#emailErrorMsg");
  if (checkValidationFormEmail(inputEmail)) emailErrorMsg.innerHTML = "";
  else emailErrorMsg.innerHTML = "Veuillez renseigner votre email.";
}

// error message lastname
function validLastName(inputLastName) {
  let lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");

  if (checkValidationFormName(inputLastName)) {
    lastNameErrorMsg.innerHTML = "";
  } else {
    lastNameErrorMsg.innerHTML =
      "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
  }
}

// error message firstname
function validFirstName(inputFirstName) {
  let firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");
  if (checkValidationFormName(inputFirstName)) {
    firstNameErrorMsg.innerHTML = "";
  } else {
    firstNameErrorMsg.innerHTML =
      "Veuillez entrer 2 caractères ou plus pour le champ du prénom.";
  }
}

// error message locations
function validLocations(locations) {
  let locationsErrorMsg = document.querySelector("#locationsErrorMsg");
  if (checkValidationFormLocations(locations)) {
    locationsErrorMsg.innerHTML = "";
  } else {
    locationsErrorMsg.innerHTML = "Veuillez choisir une localisation.";
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
}
getForm();

function displayErrors() {
  let firstNameErrorMsg =
    document.querySelector(".firstName-section").lastElementChild;
  let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");

  if (charRegExp.test(inputFirstName.value)) {
    firstNameErrorMsg.innerHTML = "";
  } else {
    firstNameErrorMsg.innerHTML =
      "Veuillez entrer 2 caractères ou plus pour le champ du prénom.";
  }
  return charRegExp.test(inputFirstName.value);
}

function checkValidationFormAll(
  tos,
  locations,
  birthdate,
  email,
  lastname,
  firstname
) {
  return (
    checkValidationFormTos(tos) &&
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
    e.preventDefault();
    const tos = document.querySelector("#tos");
    const birthdate = document.querySelector("#birthdate");
    const email = document.querySelector("#email");
    const lastname = document.querySelector("#lastName");
    const firstname = document.querySelector("#firstName");
    let locations = document.querySelectorAll(".locations");
    locations = [...locations];
    //display error messages
    validTos(tos);
    validLocations(locations);
    validBirthdate(birthdate);
    validEmail(email);
    validLastName(lastname);
    validFirstName(firstname);

    //check entire form
    if (
      checkValidationFormAll(
        tos,
        locations,
        birthdate,
        email,
        lastname,
        firstname
      )
    ) {
      const success = document.querySelector(".success-message");
      success.removeAttribute("hidden");
      const formData = document.querySelectorAll(".formData");
      formData.forEach((data, index) => {
        data.classList.add("hidden");
      });
      const btn = document.querySelector(".btn-submit");
      btn.value = "Fermer";
      btn.addEventListener("click", closeModal);
      modalbg.classList.add("center");
    }
  });
}
submitForm();
