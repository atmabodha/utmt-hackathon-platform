import React, {useState} from 'react';
import {TextInputField} from '../../../utilities/FormComponents';
import './Signup.css';
import {Button} from 'react-bootstrap';
import {Form} from 'react-bootstrap';
import Header from '../header/Header';
import {useFormHandler} from '../contest creation/FormHandlers';

const SignUp = () => {
  const {formData: signUpData, handleInputChange} = useFormHandler ({
    name: '',
    email: '',
    password: '',
  });

  const signUpFields = [
    {
      label: 'Name',
      name: 'name',
      type: 'text',
      controlClass: 'form-control-custom',
      placeholder: 'Enter your name',
    },
    {
      label: 'Email',
      name: 'email',
      type: 'email',
      controlClass: 'form-control-custom',
      placeholder: 'Enter your email',
    },
    {
      label: 'Password',
      name: 'password',
      type: 'password',
      controlClass: 'form-control-custom',
      placeholder: 'Enter your password',
    },
  ];

  return (
    <div className="signup-page">
      {/* <Header headerType={'host'} /> */}
      <div className="signup-form">
        <div>
          <h1>Code Hut</h1>
          <h2>Sign Up</h2>
        </div>
        <div className="signup-input-fields">
          <Form>
            {signUpFields.map ((field, index) => (
              <TextInputField
                key={index}
                label={field.label}
                name={field.name}
                type={field.type}
                value={signUpData[field.name]}
                onChange={handleInputChange}
                groupClass={'signup-input-field'}
                placeholder={field.placeholder}
                controlClass={'input-field'}
              />
            ))}
          </Form>
        </div>
        <div className="signup-form-footer">
          <Button className="signup-btn">Submit</Button>
          <div className="signup-footer-text">
            <p className="signup-footer-text">
              Already have an account? <a href="/login">Log in</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
