// import {
//   validateForm,
//   handleInputChange as inputChange,
//   handleSubmit as formSubmit,
//   renderSubmitButton,
// } from '../../common/Form';
// import Joi from 'joi-browser';
// const [errors, setErrors] = useState({});

// const [account, setAccount] = useState({
//   username: '',
//   password: '',
// });

// const handleInputChange = ({ target: input }) => {
//   const data = { ...account };
//   data[input.name] = input.value;
//   setAccount(data);
// };

// const handleSubmit = (e) => formSubmit(e, validate, setErrors, doSubmit);

// const handleInputChange = ({ target: input }) =>
//   inputChange(input, schema, account, setAccount, errors, setErrors);

// const validate = () => {
//   const options = { abortEarly: false };
//   const result = Joi.validate(account, schema, options);

//   if (!result.error) return null;

//   const error = {};

//   for (let item of result.error.details) error[item.path[0]] = item.message;
//   return error;

//   // const error = {};
//   // if (account.username.trim() === '') error.username = 'Username is Required';
//   // if (account.password.trim() === '') error.password = 'Password is Required';
//   // return Object.keys(error).length === 0 ? null : error;
// };

// const handleSubmit = (e) => {
//   e.preventDefault();
//   const error = validate();
//   setErrors(error || {});
//   if (error) return;
//
// };

// const validateProperty = ({ name, value }) => {
//   const obj = { [name]: value };
//   const schema_Property = { [name]: schema[name] };
//   const result = Joi.validate(obj, schema_Property);
//   return result.error ? result.error.details[0].message : null;

// };

// const handleInputChange = ({ target: input }) => {
//   const error = { ...errors };
//   const errorMessage = validateProperty(input);
//   if (errorMessage) error[input.name] = errorMessage;
//   else delete error[input.name];

//   const login = { ...account };
//   login[input.name] = input.value;
//   setAccount(login);
//   setErrors(error);
// };

// const validate = () => validateForm(account, schema);
