import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserDataActions } from '../../redux/actions';
import MultiSelect from './multiSelect';

const MultiPropertySelect = ({ selectedProperties, setSelectedProperties, userData }) => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const userDataGet = store?.getUserDataReducer?.getUserData?.data?.user;

  const dataSource = userData || userDataGet;

  const propertyNamesList = Object.keys(dataSource?.property_data || {});
  const propertyOptions = propertyNamesList.map((prop) => ({ value: prop, label: prop }));

  useEffect(() => {
    if (!userData) {
      dispatch(getUserDataActions(false));
    }
  }, [dispatch, userData]);

  return (
    <MultiSelect
      options={propertyOptions}
      selectedOptions={selectedProperties}
      setSelectedOptions={setSelectedProperties}
      placeholder="Select properties..."
      selectAllText="Select all properties"
    />
  );
};

export default MultiPropertySelect;
