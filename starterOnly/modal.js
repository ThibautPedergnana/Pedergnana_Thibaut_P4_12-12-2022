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
  modalbg.style.display = "none";
}
closeBtn.addEventListener("click", closeModal);

const checkValidationFormTos = function (inputTos) {
  return inputTos.checked;
};

const checkValidationFormBirthdate = function (inputBirthdate) {
  const birthdate = new Date(inputBirthdate.value);
  return birthdate < new Date();
};

const checkValidationFormEmail = function (inputEmail) {
  //Création des expressions régulières
  let emailRegExp = new RegExp(
    "^[a-zA-Z0-9.-]+[@]{1}[a-zA-Z0-9.-]+[.]{1}[a-z]{2,10}$"
  );
  return emailRegExp.test(inputEmail.value);
};

const checkValidationFormName = function (inputLastName) {
  let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
  return charRegExp.test(inputLastName.value);
};

const checkValidationFormLocations = function (locations) {
  return locations.find((location) => location.checked);
};
// Submit form
const validTos = function (inputTos) {
  let tosErrorMsg = document.querySelector("#tosErrorMsg");
  if (checkValidationFormTos(inputTos)) {
    tosErrorMsg.innerHTML = "";
  } else {
    tosErrorMsg.innerHTML = "Vous devez accepter les conditions.";
  }
};

const validBirthdate = function (inputBirthdate) {
  const birthdateErrorMsg = document.querySelector("#birthdateErrorMsg");

  if (checkValidationFormBirthdate(inputBirthdate)) {
    birthdateErrorMsg.innerHTML = "";
  } else {
    birthdateErrorMsg.innerHTML = "Tu peux pas etre née demain fdp.";
  }
};

const validEmail = function (inputEmail) {
  let emailErrorMsg = document.querySelector(".email-section").lastElementChild;
  if (checkValidationFormEmail(inputEmail)) emailErrorMsg.innerHTML = "";
  else emailErrorMsg.innerHTML = "Veuillez renseigner votre email.";
};

const validLastName = function (inputLastName) {
  let lastNameErrorMsg =
    document.querySelector(".lastName-section").lastElementChild;
  let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");

  if (checkValidationFormName(inputLastName)) {
    lastNameErrorMsg.innerHTML = "";
  } else {
    lastNameErrorMsg.innerHTML =
      "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
  }
};

const validFirstName = function (inputFirstName) {
  let firstNameErrorMsg =
    document.querySelector(".firstName-section").lastElementChild;

  if (checkValidationFormName(inputFirstName)) {
    firstNameErrorMsg.innerHTML = "";
  } else {
    firstNameErrorMsg.innerHTML =
      "Veuillez entrer 2 caractères ou plus pour le champ du prénom.";
  }
};

const validLocations = function (locations) {
  let locationsErrorMsg = document.querySelector("#locationsErrorMsg");
  if (checkValidationFormLocations(locations)) {
    locationsErrorMsg.innerHTML = "";
  } else {
    locationsErrorMsg.innerHTML = "Veuillez choisir une localisation.";
  }
};

// Instruction du formulaire
function getForm() {
  let form = document.querySelector(".form");

  // Validation du prénom
  form.firstName.addEventListener("change", function () {
    validFirstName(this);
  });

  // Validation du nom de famille
  form.lastName.addEventListener("change", function () {
    validLastName(this);
  });

  // Validation de l'adresse mail
  form.email.addEventListener("change", function () {
    validEmail(this);
  });

  // Validation de l'adresse mail
  form.birthdate.addEventListener("change", function () {
    validBirthdate(this);
  });

  form.tos.addEventListener("change", function () {
    validTos(this);
  });
}

getForm();

const displayErrors = function () {
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
};

const checkValidationFormAll = function (
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
};
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
    //display messages d'erreurs
    validTos(tos);
    validLocations(locations);
    validBirthdate(birthdate);
    validEmail(email);
    validLastName(lastname);
    validFirstName(firstname);

    //check form
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
      const form = document.querySelector(".form");
      success.removeAttribute("hidden");
      form.setAttribute("hidden", true);
    }
  });
}
submitForm();
