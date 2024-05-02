import React, { useEffect, useState } from 'react';

export const SearchableSelect = ({ options, onChange, OnSaved, OnEdit }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([options]);
  const [selectedOption, setSelectedOption] = useState('');
  const [displayState, setDisplayState] = useState('none');

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchTerm(inputValue);
    filterOptions(inputValue);
  };

  const filterOptions = (inputValue) => {
    const filteredOptions = options.filter(
      (option) =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );
    setFilteredOptions(filteredOptions);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onChange(option.value); // Pass the value of the selected option to the parent component
    setSearchTerm('');
    setFilteredOptions([]);
    handleShowList();
  };
  const handleShowList = () => {
    setDisplayState((prevState) => (prevState === 'block' ? 'none' : 'block'));
  }
  
  useEffect(() => {
    setSelectedOption('');
    setFilteredOptions(options);
    console.log('saved option is called');
  
  }, [OnSaved, options]);

  useEffect(() => {
    if(OnEdit !== null){
      setSelectedOption(OnEdit);
    }
  }, [OnEdit]);

  return (
    <div>
      <div class="search-component">
      <div class="selectedvalue">{selectedOption.label ? selectedOption.label : '--select--'}<div class="rightdiv" onClick={() => handleShowList()} ></div></div>
        <div class="search-list-ul" style={{ display: displayState }}><input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
      />    
      <ul> 
          {filteredOptions.map((option, index) => (
            <li key={index} onClick={() => handleOptionClick(option)}>
              {option.label}
            </li>
           
          ))}
  
        </ul>
     
       
        </div>
    </div>
    </div>
  );
}; 