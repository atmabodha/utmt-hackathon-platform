import React from "react";
import { Form } from "react-bootstrap";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
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
  required = false,
  placeholder = "",
}) => {
  return (
    <Form.Group controlId={controlId} className={groupClass}>
      <Form.Label className={labelClass}>
        {label} {required && <span>*</span>}
      </Form.Label>
      <Form.Control
        type={type || "text"}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={controlClass}
        placeholder={placeholder}
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
  required = false,
  options = [],
  ariaLabel = "",
}) => {
  return (
    <Form.Group controlId={controlId} className={groupClass}>
      <Form.Label className={labelClass}>
        {label} {required && <span>*</span>}
      </Form.Label>
      <Form.Select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={controlClass}
        aria-label={ariaLabel}
      >
        <option value="">Select {label.toLowerCase()}</option>
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
  required = false,
  accept = "",
  value,
  helperText = "",
  uploadStatus = "",
  imageName,
}) => {
  return (
    <Form.Group controlId={"file-input"} className={groupClass}>
      <Form.Label className={labelClass}>
        {label} {required && <span>*</span>}
      </Form.Label>
      <Form.Control
        type="file"
        name={name}
        accept={accept}
        onChange={onChange}
        required={required}
        className={controlClass}
      />
      <label
        htmlFor={"file-input"}
        className={`custom-file-button ${controlClass}`}
      >
        Choose File
      </label>
      {value && value.name && (
        <div className="file-name-display">Selected file: {value.name}</div>
      )}
      {imageName ? (
        <div className="file-name-display">Selected file: {imageName}</div>
      ) : (
        ""
      )}
      <Form.Text muted>{helperText}</Form.Text>
      {uploadStatus && (
        <div style={{ color: "green", marginTop: "10px" }}>{uploadStatus}</div>
      )}
    </Form.Group>
  );
};

export const SelectMultipleOptions = ({
  label,
  name,
  id,
  value,
  options,
  groupClass,
  handleChange,
  placeholder,
}) => {
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
        onChange={(selectedTags) => handleChange("tags", selectedTags)}
        placeholder={placeholder}
        formatCreateLabel={(inputValue) => `Add "${inputValue}" as a new tag`}
        className="form-control-custom"
        styles={customStyles}
      />
    </div>
  );
};

export const DateTimeInputField = ({
  label,
  name,
  value,
  onChange,
  controlId,
  groupClass,
  labelClass,
  inputClass,
  required = false,
  placeholder = "Select date and time",
}) => {
  const handleOkClick = () => {
    const outsideClickTarget = document.body;
    if (outsideClickTarget) {
      const event = new MouseEvent("mousedown", { bubbles: true });
      outsideClickTarget.dispatchEvent(event);
    }
  };

  const customRenderView = (viewMode, renderDefault) => {
    return (
      <div>
        {renderDefault()}
        {viewMode === "time" && (
          <button type="button" id="ok-button" onClick={handleOkClick}>
            OK
          </button>
        )}
      </div>
    );
  };

  return (
    <Form.Group controlId={controlId} className={groupClass}>
      <Form.Label className={labelClass}>
        {label} {required && <span>*</span>}
      </Form.Label>
      <Datetime
        className={inputClass}
        timeFormat={true}
        dateFormat={true}
        renderView={customRenderView}
        inputProps={{
          placeholder: placeholder,
          className: "form-control-custom",
        }}
        value={value}
        onChange={(date) => onChange(name, date)}
        required={required}
      />
    </Form.Group>
  );
};

export default TextAreaField;
