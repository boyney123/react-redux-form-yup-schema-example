/**
 * Using yup we can create our schemas for our form.
 */

import yup from 'yup';

export default yup.object().shape({

    firstName:      yup.string().required(),

    lastName:      yup.string().required(),

    //yup comes with some handy validation functions, as you can see email validation for us!
    email:      yup.string().email().required(),

    sex: yup.string().required()

});