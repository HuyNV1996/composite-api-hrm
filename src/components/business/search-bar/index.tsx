import React, { useEffect, useRef, useState, ChangeEvent } from 'react';
import './index.css';
import { Input } from 'antd';

export interface SelectedOptions {
  fieldNames: string[];
  inputValues: string[];
}

interface SearchBarProps {
  onSelectedOptionsChange: (options: SelectedOptions) => void; // Callback function
  tableOptions: any;
}

function SearchBar({ onSelectedOptionsChange, tableOptions }: SearchBarProps) {
  const [fieldName, setFieldNames] = useState<string[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({
    fieldNames: [],
    inputValues: [],
  });
  const [inputValue, setInputValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputValues, setInputValues] = useState<string[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newInputValue = event.target.value;
    setInputValue(newInputValue);
    // fetchFieldNames(newInputValue);
    setInputValues([...inputValues, newInputValue]);
  };

  useEffect(() => {
    setFieldNames(
      tableOptions
        ?.slice(1, tableOptions?.length - 1)
        .map((item: any) => item.title)
    );
  }, [inputValue]);
  useEffect(() => {
    console.log(fieldName);
  }, [fieldName]);

  const toggleDropdown = () => {
    const dropdown = document.getElementById('dropdownMenu');
    if (dropdown) {
      if (dropdown.style.display === 'block' && inputValue.trim() === '') {
        dropdown.style.display = 'none';
      } else {
        dropdown.style.display = 'block';
      }
    }
  };

  const addOption = (fieldName: string, inputValue: string) => {
    const { fieldNames, inputValues } = selectedOptions;
    const updatedFieldNames = [...fieldNames, fieldName];
    const updatedInputValues = [...inputValues, inputValue];

    setSelectedOptions({
      fieldNames: updatedFieldNames,
      inputValues: updatedInputValues,
    });

    setInputValue('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    const uniqueFieldNames = [...new Set(selectedOptions.fieldNames)];
    const nonDuplicateFieldNames = fieldName.filter(
      name => !uniqueFieldNames.includes(name)
    );
    setFieldNames(nonDuplicateFieldNames);
  }, [selectedOptions]);

  const removeOption = (fieldName: string, inputValue: string) => {
    const { fieldNames, inputValues } = selectedOptions;
    const updatedFieldNames = fieldNames.filter(name => name !== fieldName);
    const updatedInputValues = inputValues.filter(
      value => value !== inputValue
    );

    setSelectedOptions({
      fieldNames: updatedFieldNames,
      inputValues: updatedInputValues,
    });

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    const { fieldNames, inputValues } = selectedOptions;
    console.log('Selected Field Names:', fieldNames);
    console.log('Selected Input Values:', inputValues);
    console.log('Selected Options:', selectedOptions);
    console.log(fieldNames);
    onSelectedOptionsChange(selectedOptions);
  }, [selectedOptions]);

  // // #1 call api
  // const fetchFieldNames = (inputValue: string) => {
  //   fetch('http://localhost:3000/employees')
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error(`Network response was not ok: ${response.status}`);
  //       }
  //       return response.json();
  //     })
  //     .then(json => {
  //       if (json.length > 0) {
  //         const fieldNames = Object.keys(json[0]);
  //         console.log(fieldNames);
  //         setFieldNames(fieldNames);
  //       }
  //     })
  //     .catch(error => {
  //       console.error('Fetch error:', error);
  //     });
  // };

  // const [hasFetched, setHasFetched] = useState(false);

  // useEffect(() => {
  //   if (hasFetched === false) {
  //     console.log('hasFetch');
  //     setHasFetched(true);
  //     fetchFieldNames(inputValue);
  //   }
  // }, [inputValue]);

  return (
    <>
      <div style={{ display: 'flex', width: '100%', top: 20 }}>
        <div className="tag-list" id="myTagList">
          {selectedOptions.fieldNames.map((selectedOption, index) => (
            <button
              className="tag-item"
              key={selectedOption}
              onClick={() =>
                removeOption(selectedOption, selectedOptions.inputValues[index])
              }>
              {selectedOption} | {selectedOptions.inputValues[index]} x
            </button>
          ))}
        </div>
        <Input
          type="text"
          placeholder="Tìm ..."
          value={inputValue}
          onChange={handleChange}
          onClick={toggleDropdown}
          ref={inputRef}
          id="myInput"
          style={{ flex: 1, height: '100%' }}
        />
      </div>

      <ul
        className="dropdown"
        id="dropdownMenu"
        style={{ display: 'none', listStyleType: 'none', width: '100%' }}>
        {fieldName.map(fieldName => (
          <li
            style={{ textDecoration: 'none', backgroundColor: '#FFFAFA' }}
            onClick={() => addOption(fieldName, inputValue)}>
            Tìm kiếm <strong>{fieldName}</strong> cho "{inputValue}"
          </li>
        ))}
      </ul>
    </>
  );
}

export default SearchBar;
