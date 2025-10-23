// Custom styles for React Select (property multiple select component)
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    border: '1px solid #013280',
    borderRadius: '50px',
    color: '#fff',
    fontSize: '14px',
    fontWeight: '300',
    backgroundColor: '#0f1117',
    display: 'flex',
    overflowX: 'auto',
    maxWidth: '250px',
    margin: '0 auto',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#013280',
      backgroundColor: '#0f1117'
    }
  }),
  input: (provided) => ({
    ...provided,
    color: '#fff',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#fff'
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: '#146ef5',
    borderRadius: '50px',
    color: '#fff',
    display: 'inline-flex'
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: '#fff'
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: '#fff',
    ':hover': {
      backgroundColor: '#146ef5',
      color: '#fff',
    }
  }),
  menuList: (provided) => ({
    ...provided,
    maxHeight: '450px',
    backgroundColor: '#0f1117'
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#0f1117',
    border: '1px solid #013280'
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: '12px',
    padding: '5px 10px',
    color: '#fff', // Ensure text is white
    backgroundColor: state.isSelected ? '#01255e' : state.isFocused ? '#01255e' : '#0f1117', // Customize background color
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#fff'
  })
};

export default customStyles;