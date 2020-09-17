import React from 'react';

export default function Filter({
  id,
  type,
  label,
  help,
  value,
  onChangeFilter,
}) {
  //change input event
  const handleChangeInput = (event) => {
    onChangeFilter(event.target.value, event.target.type);
  };

  //return component
  return (
    <div className="input-field col s12 m4">
      <i className="material-icons prefix">search</i>
      <input
        id={id}
        type={type}
        value={value}
        min={type === 'number' ? '-1' : undefined}
        max={type === 'number' ? '98' : undefined}
        onChange={handleChangeInput}
      />
      <label className="active" htmlFor={id}>
        {label}
      </label>
      <span className="helper-text">{help}</span>
    </div>
  );
}
