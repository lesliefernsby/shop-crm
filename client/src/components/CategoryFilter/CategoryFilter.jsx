import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { productsListActions } from "../../redux/actions/productsListActions";

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

function getStyles(name, filterObjects, theme) {
  return {
    fontWeight:
      filterObjects.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function CategoryFilter() {
  const dispatch = useDispatch();
  
  const optionsList = useSelector(
    (state) => state.productsList.filterCategoryOptions
  );

  const theme = useTheme();
  const [filterObjects, setFilterObjects] = React.useState([]);

  const handleChange = (event) => {
    setFilterObjects(event.target.value);
  };


  useEffect(() => {
    dispatch(productsListActions.getFilterCategoryOptions());
  }, []);

  useEffect(() => {
    dispatch(
      productsListActions.addCategoriesFilter(
        filterObjects.map((item) => item.id)
      )
    );
  }, [filterObjects]);

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }} variant="outlined">
        <InputLabel id="test-select-label">Category</InputLabel>
        <Select
          label="Category" // here is the difference
          multiple
          value={filterObjects}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Category" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value.id}
                  label={value.title}
                  onMouseDown={(event) => event.stopPropagation()}
                  onDelete={() => {
                    setFilterObjects(
                      selected.filter((item) => item.id !== value.id)
                    );
                  }}
                />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {optionsList.map((item) => (
            <MenuItem
              key={item.id}
              value={item}
              style={getStyles(item.title, filterObjects, theme)}
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
