import React from "react";
import { Form } from "react-bootstrap";
import CreatableSelect from "react-select/creatable";
import "./styles/FormComponents.css";

const TextAreaField = ({
  label,
  name,
  rows,
  value,
  onChange,
  controlId,
  groupClass,
  labelClass,
  controlClass,
}) => {
  return (
    <Form.Group controlId={controlId} className={`${groupClass}`}>
      <Form.Label className={labelClass}>{label}</Form.Label>
      <Form.Control
        as="textarea"
        rows={rows || 6}
        name={name}
        value={value}
        onChange={onChange}
        className={`form-control-custom ${controlClass}`}
      />
    </Form.Group>
  );
};

export const TextInputField = ({
  label,
  name,
  type,
  value,
  onChange,
  controlId,
  groupClass,
  labelClass,
  controlClass,
  required = false, // Default to false
  placeholder = "", // Default placeholder
}) => {
  return (
    <Form.Group controlId={controlId} className={groupClass}>
      <Form.Label className={labelClass}>
        {label} {required && <span>*</span>}{" "}
        {/* Optional asterisk for required */}
      </Form.Label>
      <Form.Control
        type={type || "text"}
        name={name}
        value={value}
        onChange={onChange}
        required={required} // Set the required attribute
        className={controlClass}
        placeholder={placeholder} // Allow custom placeholder text
      />
    </Form.Group>
  );
};

export const SelectInputField = ({
  label,
  name,
  value,
  onChange,
  controlId,
  groupClass,
  labelClass,
  controlClass,
  required = false, // Default to false
  options = [], // Array of options for the dropdown
  ariaLabel = "", // Accessibility label for the select
}) => {
  return (
    <Form.Group controlId={controlId} className={groupClass}>
      <Form.Label className={labelClass}>
        {label} {required && <span>*</span>}{" "}
        {/* Optional asterisk for required */}
      </Form.Label>
      <Form.Select
        name={name}
        value={value}
        onChange={onChange}
        required={required} // Set the required attribute
        className={controlClass}
        aria-label={ariaLabel} // Accessibility label
      >
        <option value="">Select {label.toLowerCase()}</option>{" "}
        {/* Default placeholder */}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

export const FileInputField = ({
  label,
  name,
  onChange,
  controlId,
  groupClass,
  labelClass,
  controlClass,
  required = false, // Default to false
  accept = "", // Allowed file types
  value, // Current file object for displaying file name
  helperText = "", // Additional helper text
  uploadStatus = "",
}) => {
  return (
    <Form.Group controlId={controlId} className={groupClass}>
      <Form.Label className={labelClass}>
        {label} {required && <span>*</span>}{" "}
        {/* Optional asterisk for required */}
      </Form.Label>
      <Form.Control
        type="file"
        accept={accept}
        onChange={onChange}
        required={required}
        className={controlClass}
      />
      <label htmlFor={controlId} className="custom-file-button">
        Choose File
      </label>
      {value && value.name && (
        <div className="file-name-display">
          Selected file: {value.name} {/* Display the selected file name */}
        </div>
      )}
      <Form.Text muted>{helperText}</Form.Text>
      {uploadStatus && (
        <div style={{ color: "green", marginTop: "10px" }}>{uploadStatus}</div>
      )}
    </Form.Group>
  );
};

export const SelectMultipleOptions = ({ label, name, id, value, options, groupClass, handleChange, placeholder }) => {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "var(--card-color)",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "var(--card-color)",
      zIndex: 9999,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "white"
        : state.isFocused
        ? "var(--secondary-color)"
        : "var(--card-color)",
      color: "var(--text-color)",
      padding: 10,
    }),
  };
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <CreatableSelect
        isMulti
        name={name}
        id={id}
        options={options}
        value={value}
        groupClass={groupClass}
        onChange={(selectedTags) =>
          handleChange("tags", selectedTags)
        }
        placeholder={placeholder}
        formatCreateLabel={(inputValue) => `Add "${inputValue}" as a new tag`}
        className="form-control-custom"
        styles={customStyles}
      />
    </div>
  );
};
export default TextAreaField;
