// Custom styles for React Select - Updated to match action items dropdown
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    background: 'rgba(189, 193, 201, 0.08)',
    border: state.isFocused ? '1px solid #3e88f7' : '1px solid #013280',
    borderRadius: '4px',
    color: '#d0d3db',
    fontSize: '14px',
    fontWeight: '500',
    fontFamily: "'DM Sans', sans-serif",
    fontVariationSettings: "'opsz' 14",
    minHeight: '40px',
    height: '40px',
    minWidth: '180px',
    boxShadow: 'none',
    cursor: 'pointer',
    transition: 'border-color 0.3s ease',
    '&:hover': {
      borderColor: '#3e88f7'
    }
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: '0 12px',
    height: '38px',
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
    gap: '4px'
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#d0d3db',
    fontFamily: "'DM Sans', sans-serif",
    fontVariationSettings: "'opsz' 14",
    fontSize: '14px',
    fontWeight: '500',
    margin: 0
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#d0d3db',
    fontFamily: "'DM Sans', sans-serif",
    fontVariationSettings: "'opsz' 14",
    fontSize: '14px',
    fontWeight: '500',
    margin: 0
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: '#3e88f7',
    borderRadius: '4px',
    color: 'white',
    display: 'inline-flex',
    margin: 0,
    padding: '2px 6px'
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: 'white',
    fontFamily: "'DM Sans', sans-serif",
    fontVariationSettings: "'opsz' 14",
    fontSize: '12px',
    fontWeight: '500',
    padding: 0,
    paddingLeft: 0
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: 'white',
    cursor: 'pointer',
    paddingLeft: '4px',
    paddingRight: '2px',
    ':hover': {
      backgroundColor: '#5296f8',
      color: 'white'
    }
  }),
  indicatorSeparator: () => ({
    display: 'none'
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: '#a6a9b2',
    padding: '0 8px',
    width: '28px',
    height: '38px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.3s ease',
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
    ':hover': {
      color: '#a6a9b2'
    },
    '& svg': {
      width: '14px !important',
      height: '14px !important'
    }
  }),
  menu: (provided) => ({
    ...provided,
    background: '#17191f',
    border: '1px solid #013280',
    borderRadius: '4px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
    marginTop: '4px',
    overflow: 'hidden',
    zIndex: 20
  }),
  menuList: (provided) => ({
    ...provided,
    padding: 0,
    maxHeight: '300px',
    overflowY: 'auto',
    '::-webkit-scrollbar': {
      width: '8px'
    },
    '::-webkit-scrollbar-track': {
      background: '#0f1117',
      borderRadius: '4px'
    },
    '::-webkit-scrollbar-thumb': {
      background: '#4a4d54',
      borderRadius: '4px'
    },
    '::-webkit-scrollbar-thumb:hover': {
      background: '#676a73'
    }
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#01255e' : '#17191f',
    color: '#d0d3db',
    fontFamily: "'DM Sans', sans-serif",
    fontVariationSettings: "'opsz' 14",
    fontSize: '14px',
    fontWeight: '400',
    padding: '8px 12px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    ':active': {
      backgroundColor: '#01255e'
    }
  }),
  input: (provided) => ({
    ...provided,
    color: '#d0d3db',
    fontFamily: "'DM Sans', sans-serif",
    fontVariationSettings: "'opsz' 14",
    fontSize: '14px',
    margin: 0,
    padding: 0
  })
};

export default customStyles;