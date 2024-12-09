import moment from "moment";

const FormValueValidator = (values, schema) => {
  let modifValues = values;
  console.log('modifValues', modifValues)
  Object.keys(schema).forEach(function (key) {
    if (!modifValues[key]) {
      modifValues[key] = ''
    }
    if (schema[key].type === "date") {
      // let format = modifValues[key]?
      console.log('modifValues[key]', modifValues[key])
      if (modifValues[key]) {
        modifValues[key] = moment(modifValues[key]).format("YYYY-MM-DD");
      }
    }
  });
  return modifValues;
};

export default FormValueValidator;
