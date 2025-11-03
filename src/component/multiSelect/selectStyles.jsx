// Custom styles for React Select (property multiple select component)
const customStyles = (width) => ({
  control: (provided, state) => ({
    ...provided,
    border: `1px solid ${state.isFocused ? '#3e88f7' : '#013280'}`,
    borderRadius: '4px',
    color: '#d0d3db',
    fontSize: '14px',
    fontWeight: '500',
    fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontVariationSettings: "'opsz' 14",
    backgroundColor: 'rgba(189, 193, 201, 0.08)',
    display: 'flex',
    width: width,
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
    flexWrap: 'nowrap'
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#d0d3db',
    fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontVariationSettings: "'opsz' 14",
    fontSize: '14px',
    fontWeight: '500',
    margin: 0
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: '#3e88f7',
    borderRadius: '4px',
    color: '#fff',
    display: 'inline-flex',
    fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontVariationSettings: "'opsz' 14",
    fontSize: '12px',
    margin: 0,
    padding: '2px 6px'
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: '#fff',
    fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontVariationSettings: "'opsz' 14",
    fontSize: '12px',
    fontWeight: '500',
    padding: 0,
    paddingLeft: 0
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: '#fff',
    cursor: 'pointer',
    paddingLeft: '4px',
    paddingRight: '2px',
    ':hover': {
      backgroundColor: '#5296f8',
      color: '#fff',
    }
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#0F1117',
    border: '2px solid #013280',
    borderRadius: '8px',
    boxShadow: '0 0 20px rgba(30, 75, 158, 0.2)',
    marginTop: '8px',
    overflow: 'hidden',
    zIndex: 9999,
    position: 'absolute'
  }),
  menuList: (provided) => ({
    ...provided,
    maxHeight: '450px',
    padding: '0',
    backgroundColor: '#0F1117'
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: '15px',
    fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontVariationSettings: "'opsz' 14",
    padding: '12px 16px',
    color: '#fff',
    backgroundColor: state.isFocused ? '#01255e' : '#0F1117',
    transition: 'background-color 0.2s',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#676A73',
    fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontVariationSettings: "'opsz' 14",
    fontSize: '14px',
    fontWeight: '500',
    margin: 0
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: '#a6a9b2',
    padding: '0 8px',
    width: '28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'color 0.2s',
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
    '&:hover': {
      color: '#3e88f7'
    }
  }),
  indicatorSeparator: () => ({
    display: 'none'
  }),
  input: (provided) => ({
    ...provided,
    color: '#fff',
    fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontVariationSettings: "'opsz' 14",
    margin: 0,
    padding: 0
  })
});

export default customStyles;