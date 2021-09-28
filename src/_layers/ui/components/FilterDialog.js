import { forwardRef, useState } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';

import { POSTS_FILTERS } from '_constants';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const FilterDialog = ({ open, setOpen, getFilters, currentFilters, disabled }) => {
  const [filters, setFilters] = useState(currentFilters || []);
  const handleClickOpen = () => {
    setOpen(true);
    setFilters(currentFilters);
  };

  const handleClose = () => {
    setOpen(false);
    setFilters(currentFilters);
  };

  const handleChangeFilters = event => {
    if (event.target.checked) {
      setFilters(prevFilters => [...prevFilters, event.target.name]);
    } else {
      setFilters(prevFilters => prevFilters.filter(filter => filter !== event.target.name));
    }
  };

  const handleSubmitFilters = event => {
    event.preventDefault();
    getFilters(filters);
    handleClose();
  };

  return (
    <>
      <Button disabled={disabled} color="primary" variant="contained" onClick={handleClickOpen}>
        Filter
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar style={{ position: 'relative' }}>
          <Toolbar style={{ justifyContent: 'space-between' }}>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Filter
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSubmitFilters}>
              Apply
            </Button>
          </Toolbar>
        </AppBar>
        <FormControl
          style={{ padding: '5px 20px' }}
          onSubmit={handleSubmitFilters}
          component="fieldset"
          variant="standard"
        >
          {POSTS_FILTERS.map(filterLabel => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.some(filter => filter === filterLabel)}
                  onChange={handleChangeFilters}
                  name={filterLabel}
                />
              }
              label={filterLabel}
              key={filterLabel}
            />
          ))}
        </FormControl>
      </Dialog>
    </>
  );
};
