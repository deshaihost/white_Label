// Custom styles for React Select (property multiple select component)
const customStyles = (width) => ({
  control: (provided, state) => ({
    ...provided,
    border: `1px solid ${state.isFocused ? '#3e88f7' : '#013280'}`,
    borderRadius: '8px',
    color: '#a6a9b2',
    fontSize: '16px',
    fontWeight: '400',
    fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontVariationSettings: "'opsz' 14",
    backgroundColor: '#0F1117',
    display: 'flex',
    overflowX: 'auto',
    width: width,
    padding: '6px 12px',
    boxShadow: state.isFocused ? '0 0 0 1px rgba(62, 136, 247, 0.5)' : 'none',
    transition: 'all 0.2s',
    '&:hover': {
      borderColor: '#3e88f7'
    }
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#a6a9b2',
    fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontVariationSettings: "'opsz' 14"
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: '#3e88f7',
    borderRadius: '6px',
    color: '#fff',
    display: 'inline-flex',
    fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontVariationSettings: "'opsz' 14"
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: '#fff',
    fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontVariationSettings: "'opsz' 14"
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: '#fff',
    ':hover': {
      backgroundColor: '#5a9bff',
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
    overflow: 'hidden'
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
    fontVariationSettings: "'opsz' 14"
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: '#a6a9b2',
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
    fontVariationSettings: "'opsz' 14"
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: '0'
  })
});

export default customStyles;