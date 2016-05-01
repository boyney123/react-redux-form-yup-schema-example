import React , {PropTypes} from 'react';
import { reduxForm } from 'redux-form';

//Lets get our schema we created
import schema from './schemas/form-schema'

//Using Object.keys we can now get our redux-form fields from our schema!
export const fields = Object.keys(schema.fields);

/**
 * Now using Yup to validate our form with schema!
 */
const asyncValidate = values => {


    return new Promise((resolve, reject) => {

        console.log(values)

        //Validate our form values against our schema! Also dont abort the validate early.
        schema.validate(values, {abortEarly: false})
            .then(() => {
                //form is valid happy days!
                alert('Your form is valid!')
                resolve();
            })
            .catch(errors => {

                //form is not valid, yup has given us errors back. Lets transform them into something redux can understand.

                let reduxFormErrors = {};

                errors.inner.forEach(error => {
                    reduxFormErrors[error.path] = error.message;
                })

                //redux form will now understand the errors that yup has thrown
                reject(reduxFormErrors);

            })
    });

};

class Form extends React.Component {
    render() {

        /* define our fields to bind to our form, from redux-form */
        const { fields: { firstName, lastName, email, sex }, handleSubmit } = this.props;

        return (<form onSubmit={handleSubmit(() => alert('success!'))}>

            <div>
                <label>First name:</label>
                <input type="text" placeholder="First name" {...firstName} />
                {firstName.touched && firstName.error && <div>{firstName.error}</div>}
            </div>

            <div>
                <label>Last name:</label>
                <input type="text" placeholder="Last name "{...lastName} />
                {lastName.touched && lastName.error && <div>{lastName.error}</div>}
            </div>

            <div>
                <label>Email:</label>
                <input type="email" placeholder="Email" {...email} />
                {email.touched && email.error && <div>{email.error}</div>}
            </div>

            <div>

                <label>Sex</label>

                <div>
                    <label>
                        <input
                            type="radio"
                            {...sex}
                            value="male"
                            checked={sex.value === 'male'}/> Male
                    </label>
                    <label>
                        <input
                            type="radio" {...sex}
                            value="female"
                            checked={sex.value === 'female'}/> Female
                    </label>
                </div>

                {sex.touched
                && sex.error
                && <div>{sex.error}</div>}

            </div>

            <button type="submit" >
                Submit
            </button>

        </form>);
    }
}

Form.propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired
};

/**
 * Map our form to redux-form
 *
 * asyncValidate : Validation in now async - The redux store will now have a section called userDetails which will store our form data
 *
 * fields - Tells redux-form the fields of our form and will spread its API across the objects (ready to be used in our form)
 *
 * valdate - Function to call when we need to validate.
 */
export default reduxForm({
    form: 'userDetails',
    fields,
    asyncValidate
})(Form);

