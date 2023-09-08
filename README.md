# Grattis Digital - Form Validation Library (Educational Project)

Welcome to this educational project, a playground where we have explored TypeScript and created a simple form validation library. This library is integrated into the form validation on our [website](https://grattis.digital). Please note that this project is primarily for educational purposes and not intended for production use.

## Overview

In this project, we have ventured to learn more about TypeScript by implementing a rudimentary form validation library. This effort serves as a great learning curve and potentially a base that could be built upon in the future to include more complex functionalities and utilities. It's a stepping stone, aiming to foster understanding and proficiency in TypeScript, particularly in the realms of web development.

By dissecting this project, you can learn about:
- Structuring TypeScript projects
- Implementing basic form validation concepts
- Utilizing modern JavaScript/TypeScript features for web development

## Usage

While this library is primarily an educational tool, it has been incorporated into the form validation on our [website](https://grattis.digital). It demonstrates how you can create a basic, yet functional form validation library using TypeScript. You are welcome to explore the code, play around with it, and perhaps even expand it for your learning or projects.

## Contributing

Since this project serves as an educational platform, we are open to contributions that can enhance its educational value. If you have ideas or improvements, feel free to fork the repository and create a pull request. Let's learn and grow together!

## Disclaimer

This project is not meant for production use. It was created as a part of a learning journey and as a playground to experiment and understand TypeScript better. While it serves its purpose on our website, it might not be suitable for more complex, production-level applications.

Pls checkout following validation solutions if you are looking for something to use in production:

### JavaScript Validation Frameworks

1. **Joi**
   - GitHub: [hapijs/joi](https://github.com/hapijs/joi)
   - Documentation: [Joi API Reference](https://joi.dev/api/)
   
2. **Yup**
   - GitHub: [jquense/yup](https://github.com/jquense/yup)
   - Documentation: [Yup Documentation](https://github.com/jquense/yup#api)

3. **Validator.js**
   - GitHub: [validatorjs/validator.js](https://github.com/validatorjs/validator.js)
   - Documentation: [Validator.js Documentation](https://github.com/validatorjs/validator.js#validators)

### HTML5 Validation

HTML5 provides built-in validation methods that can be used to validate forms based on various attributes such as `required`, `pattern`, and `minlength`. Learn more about HTML5 validation in the [Mozilla Developer Network documentation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation).

## Features

- **Modular Validators**: Includes classes for different validation rules, such as required fields, length restrictions, and pattern matching.
- **Customizable Error Renderers**: Offers customizable classes to handle the rendering of error states and messages in the DOM.
- **Dynamic Form Validation**: Automatically registers event listeners for form validation, providing immediate feedback to users and preventing form submission with validation errors.
- **Smooth Error Navigation**: Scrolls to the first error in the form upon submission, improving user experience by guiding them to correct their inputs.

## Example

Let us assume we would have this example HTML form:

```html
<html>
<head>
    <title>Test</title>
    
</head>
<body>
    <h1>My Test Form</h1>
    <form name="testForm">
        <label for="name">Name</label><br />
        <input type="text" name="name" id="name" /><br />
        <br /><br />
        <input type="submit" value="Submit" />
    </form>
    <script src="dist/bundle.js"></script>
</body>
</html>
```


Include the library files in your project and import the necessary classes and types.

```typescript
import { FormValidationInitializer } from './form-validation-initializer';
import { LengthValidator } from './length-validator';
import { PatternValidator } from './pattern-validator';
import { RequiredValidator } from './required-validator';
```

Step 1: Create Validator Instances
Create instances of the necessary validators with the appropriate configurations.

```typescript
const requiredValidator = new RequiredValidator({
    isRequired: true,
    errorMessage: "This field is required.",
});

const lengthValidator = new LengthValidator({
    minLength: 2,
    maxLength: 80,
    message: "The input should be between {min} and {max} characters long.",
});

const patternValidator = new PatternValidator({
    pattern: '^[a-z]+$',
    message: "The input should only contain lowercase letters.",
});
```

Step 2: Configure Form Validation
Set up the form validation configuration, specifying the form name, error classes, and validation rules for each form element.

```typescript
const formValidationConf = {
    formName: 'testForm',
    errorStateMarkerClass: 'error-state',
    alertClassConf: {
        inputConf: {
            labelClassList: [ 'text-red-700' ],
            inputClassList: [ 'border-red-500', 'text-red-900', 'bg-red-50' ],
        },
        messageConf: {
            paragraphClassList: [ 'mt-2', 'text-sm', 'text-red-600' ],
        },
    },
    elements: [
        {
            validatorList: [ requiredValidator, lengthValidator, patternValidator ],
            formElementName: 'name',
        },
    ],
};
```

Step 3: Initialize Form Validation
Create an instance of FormValidationInitializer and register the validation events using the configuration created in step 2.
```typescript
const formValidationInitializer = new FormValidationInitializer(window, document);
formValidationInitializer.registerEvents(formValidationConf);
```

## License

Go ahead and use this code as you like which is under MIT licence. 

## Support

If you have any queries or need further clarification, feel free to open an issue on this repository. Happy learning!