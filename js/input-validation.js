function inputValidation(evt) {
  try {
    let ch = String.fromCharCode(evt.which);
    if (!/[0-9]/.test(ch)) {
      evt.preventDefault();
    }
  } catch (error) {
    console.error(error);
  }
}
