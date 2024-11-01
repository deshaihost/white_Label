// Custom styles for React Select (property multiple select component)
const customStyles = (width) => ({
  control: (provided) => ({
    ...provided,
    border: '1px solid #146ef5',
    borderRadius: '50px',
    color: '#fff',
    fontSize: '14px',
    fontWeight: '300',
    backgroundColor: '#212529',
    display: 'flex',
    overflowX: 'auto',
    width: width,
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
    maxHeight: '450px'
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: '12px',
    padding: '5px 10px',
    color: '#fff', // Ensure text is white
    backgroundColor: state.isSelected ? '#146ef5' : state.isFocused ? '#0056b3' : '#212529', // Customize background color
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#fff'
  })
});

export default customStyles;