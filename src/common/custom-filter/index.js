import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import FilterList from '@mui/icons-material/FilterList';
import CustomCheckbox from '../custom-checkbox';
import CustomButton from '../custom-button';

function CustomFilter(props) {
  const {options, selectedIds, updateUserFilter } = props;
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(selectedIds);

  const selectOption = (id) => {
    const index = selectedOptions.indexOf(id);
    if (index > -1) {
      selectedOptions.splice(index, 1);
    } else {
      selectedOptions.push(id);
    }
    setSelectedOptions([...selectedOptions]);
  };

  const resetToOriginal = () => {
    setShowOptions(!showOptions)
    setSelectedOptions([...selectedIds])
  };

  const setFilter = () => {
    updateUserFilter(selectedOptions);
    setShowOptions(!showOptions)
  };

  return (
    <div>
    <IconButton
      size='large'
      aria-label='filter experts list'
      aria-controls='filter-experts-list'
      aria-haspopup='true'
      onClick={() => setShowOptions(!showOptions)}
      color={selectedOptions?.length ? 'primary': ''}>
        <FilterList color='blue' />
    </IconButton>

    <Dialog
      open={showOptions}
      aria-labelledby='filter-experts-list'
      aria-describedby='filter-experts-list'
      onClose={resetToOriginal}
    >
      <div>
      {
        options?.length ? (
          options.map((option, index) => (
            <CustomCheckbox
              key={index}
              disabled={false}
              className="checkbox"
              name="expert-filter-option"
              checked={selectedOptions.includes(option.id)}
              onChange={() => selectOption(option.id)}
              text={option.label}
            />
          ))
        ) : (
          <div>
            No options available
          </div>
        )
      }
      <div className='footer-container'>
        <CustomButton
          color='primary'
          onClick={setFilter}
          title='Apply'
        />
        <CustomButton
          color='secondary'
          onClick={resetToOriginal}
          title='Cancel'
        />
      </div>
      </div>
    </Dialog>
    </div>
  );
};

CustomFilter.defaultProps = {
  options: [], // array of options to be displayed in the filter
  showOptions: false, // boolean to indicate if options are shown
  selectedIds: [], // array of options that are applied
  updateUserFilter: () => {} // function to update the filter
};

CustomFilter.propTypes = {
  options: PropTypes.array,
  showOptions: PropTypes.bool,
  updateUserFilter: PropTypes.func,
  selectedIds: PropTypes.array
};

export default CustomFilter;

