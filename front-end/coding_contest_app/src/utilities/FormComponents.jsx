import React from "react";
// import Datetime from "react-datetime";
// import "react-datetime/css/react-datetime.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Form, Row, Col } from 'react-bootstrap';
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


// export const DateTimeInputField = ({
//   label,
//   name,
//   value,
//   onChange,
//   controlId,
//   groupClass,
//   labelClass,
//   inputClass,
//   required = false,
//   placeholder = "Select date and time",
// }) => {
//   const [viewMode, setViewMode] = useState("days"); // Initial view is date selection

//   const handleDateChange = (selectedDate) => {
//     // Check if only a date was selected (not a full date-time object)
//     if (selectedDate && selectedDate._isAMomentObject && selectedDate._f === "YYYY-MM-DD") {
//       setViewMode("time"); // Switch to time picker after selecting a date
//     } else {
//       onChange(name, selectedDate); // Date and time selected, call onChange prop
//       closeDateTimePicker(); // Close the picker after time selection
//     }
//   };

//   const closeDateTimePicker = () => {
//     // Simulate clicking outside to close the picker
//     const outsideClickTarget = document.body;
//     if (outsideClickTarget) {
//       const event = new MouseEvent("mousedown", { bubbles: true });
//       outsideClickTarget.dispatchEvent(event);
//     }
//   };

//   const renderView = (mode, renderDefault) => {
//     return (
//       <div>
//         {renderDefault()}
//         {mode === "time" && (
//           <button type="button" id="ok-button" onClick={closeDateTimePicker}>
//             OK
//           </button>
//         )}
//       </div>
//     );
//   };

//   return (
//     <Form.Group controlId={controlId} className={groupClass}>
//       <Form.Label className={labelClass}>
//         {label} {required && <span>*</span>}
//       </Form.Label>
//       <Datetime
//         className={inputClass}
//         timeFormat={true}
//         dateFormat={true}
//         viewMode={viewMode}
//         renderView={renderView}
//         inputProps={{
//           placeholder: placeholder,
//           className: "form-control-custom",
//         }}
//         isValidDate={(current) => current.isAfter(Datetime.moment().subtract(1, "day"))}
//         value={value}
//         onChange={handleDateChange}
//         required={required}
//       />
//     </Form.Group>
//   );
// };

// export const DateTimeInputField = ({
//   label,
//   name,
//   minDate,
//   minTime,
//   value,
//   onChange,
//   controlId,
//   groupClass,
//   labelClass,
//   controlClass,
//   required = false,
//   placeholder = "Select date and time",
// }) => {

//   // Function to determine minimum time based on the selected date
//   const getMinTime = (date) => {
//     if (!minDate || !date) return null; // No min time restriction if no minDate or selected date
//     // If the selected date is the same as the minDate, apply minTime
//     return date.toDateString() === minDate.toDateString() ? minTime : null;
//   };

//   return (
//     <Form.Group controlId={controlId} className={groupClass}>
//       <Form.Label className={labelClass}>
//         {label} {required && <span>*</span>}
//       </Form.Label>
//       <DatePicker
//         className={controlClass}
//         selected={value}
//         onChange={(date) => onChange(name, date)}
//         showTimeSelect
//         dateFormat="MMMM d, yyyy h:mm aa"
//         minDate={minDate} // Disable dates before minDate
//         minTime={getMinTime(value)} // Apply min time if selected date matches minDate
//         maxTime={new Date().setHours(23, 59)} // Optional: limit the max time to end of the day
//         placeholderText={placeholder}
//         required={required}
//       />
//     </Form.Group>
//   );
// };


export const DateTimeInputField = ({
  label,
  name,
  minDate,
  maxDate,
  maxTime,
  minTime,
  value,
  onChange,
  controlId,
  groupClass,
  labelClass,
  controlClass,
  required = false,
  datePlaceholder = "Select date",
  timePlaceholder = "Select time",
}) => {
  
  // Function to handle date change, keeping the time part intact
  const handleDateChange = (selectedDate) => {
    if (!selectedDate) return;
    const newDateTime = new Date(value);
    newDateTime.setFullYear(selectedDate.getFullYear());
    newDateTime.setMonth(selectedDate.getMonth());
    newDateTime.setDate(selectedDate.getDate());
    onChange(name, newDateTime);
  };

  // Function to handle time change, keeping the date part intact
  const handleTimeChange = (selectedTime) => {
    if (!selectedTime) return;
    const newDateTime = !value? new Date() : new Date(value);
    newDateTime.setHours(selectedTime.getHours());
    newDateTime.setMinutes(selectedTime.getMinutes());
    onChange(name, newDateTime);
  };

  return (
    <Form.Group controlId={controlId} className={groupClass}>
      <Form.Label className={labelClass}>
        {label} {required && <span>*</span>}
      </Form.Label>
      <Row>
        {/* Date Picker */}
        <Col xs={6}>
          <DatePicker
            className={controlClass}
            selected={value}
            onChange={handleDateChange}
            dateFormat="MMMM d, yyyy"
            minDate={new Date(minDate)} // Minimum selectable date
            maxDate={new Date(maxDate)}
            placeholderText={datePlaceholder}
            required={required}
          />
        </Col>

        {/* Time Picker */}
        <Col xs={6}>
          <DatePicker
            className={controlClass}
            selected={value}
            onChange={handleTimeChange}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15} // Set time interval in minutes
            timeCaption="Time"
            dateFormat="h:mm aa"
            minTime={minTime || new Date().setHours(0, 0)} // Apply min time if date matches minDate
            maxTime={maxTime || new Date().setHours(23, 59)} // Set max time as the end of the day
            placeholderText={timePlaceholder}
            required={required}
          />
        </Col>
      </Row>
    </Form.Group>
  );
};


export default TextAreaField;
