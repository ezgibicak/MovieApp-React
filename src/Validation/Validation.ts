import * as Yup from "yup";
function configureValidations() {
  Yup.addMethod(Yup.string, 'firstLetterUpperCase', function () {
    return this.test(
      'firstLetterUpperCase',
      'First letter must be upper case', function (value) {
        if (value && value.length > 0) {
          const firstLetter = value.substring(0, 1);
          return firstLetter === firstLetter.toUpperCase();
        }
        return true;
      }
    )
  })
}
export default configureValidations;
