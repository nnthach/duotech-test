import React from "react";

interface SelectOption {
  value: string | number;
  label: string;
}

interface FieldExtraProps {
  className?: string;
}

interface InputFormFieldProps extends FieldExtraProps {
  label: string;
  labelNote?: string;
  name: string;
  type: string;
  placeholder?: string;
  rows?: number;
  value: string | number;
  onChange?: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  error?: string;
  required?: boolean;
  selectData?: SelectOption[];
  disabled?: boolean;
}

interface RenderFieldByTypeProps extends FieldExtraProps {
  type: string;
  name: string;
  placeholder?: string;
  rows?: number;
  value: string | number;
  onChange?: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  disabled?: boolean;
  selectData?: SelectOption[];
  error?: string;
}

const renderFieldByType = ({
  type,
  name,
  placeholder,
  rows,
  value,
  onChange,
  disabled,
  selectData,
  error,
  ...props
}: RenderFieldByTypeProps) => {
  const invalidClass = error ? "border-red-500 focus:border-red-500" : "";
  const defaultClass =
    "flex w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground";
  switch (type) {
    case "textarea":
      return (
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          rows={rows}
          value={value}
          onChange={(e) => onChange?.(e)}
          disabled={disabled}
          className={`${props?.className || defaultClass} ${invalidClass}`}
        />
      );
    case "select":
      return (
        <select
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange?.(e)}
          disabled={disabled}
          className={`${props?.className || defaultClass} ${invalidClass}`}
        >
          {selectData?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    case "date":
      return (
        <input
          type="date"
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e)}
          disabled={disabled}
          className={`${props?.className || defaultClass} ${invalidClass}`}
        />
      );
    case "number":
      return (
        <input
          type="number"
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e)}
          disabled={disabled}
          className={`${props?.className || defaultClass} ${invalidClass}`}
        />
      );
    case "email":
      return (
        <input
          type="email"
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e)}
          disabled={disabled}
          className={`${props?.className || defaultClass} ${invalidClass}`}
        />
      );
    default:
      return (
        <input
          type="text"
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e)}
          disabled={disabled}
          className={`${props?.className || defaultClass} ${invalidClass}`}
        />
      );
  }
};

export default function InputFormField({
  label,
  labelNote,
  name,
  rows,
  type,
  placeholder,
  value,
  onChange,
  error,
  required,
  selectData,
  disabled,
  ...props
}: InputFormFieldProps) {
  return (
    <div className="space-y-1.5">
      <div>
        <label htmlFor={name} className="text-sm font-medium text-foreground">
          {label}
        </label>
        {labelNote && <span>{labelNote}</span>}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </div>
      {renderFieldByType({
        type,
        name,
        placeholder,
        rows,
        value,
        onChange,
        disabled,
        selectData,
        error,
        ...props,
      })}
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
}
