import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { productsListActions } from '../../redux/actions/productsListActions';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function CategoryFilter() {
  const dispatch = useDispatch();
  const optionsList =useSelector((state)=> state.productsList.filterCategoryOptions)
  
  useEffect(()=> {
    dispatch(productsListActions.getFilterCategoryOptions());
  }, []);

  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    setPersonName(
      event.target.value
    );
    const data = event.target.value.map(i=>i.id)
    dispatch(productsListActions.addCategoriesFilter(data));
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }} variant="outlined">
      <InputLabel id="demo-simple-select-outlined-label">
          Category
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          label="Category"
          id="Category"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
             {selected.map((value) => (
                <Chip key={value.id} label={value.title} />
              ))} 
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {optionsList.map((item) => (
            <MenuItem
              key={item.id}
              value={item}
              style={getStyles(item.title, personName, theme)}
            >
              {item.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default CategoryFilter;
