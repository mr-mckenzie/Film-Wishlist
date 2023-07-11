import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function CategoryToggleButton() {
    const [alignment, setAlignment] = React.useState('web');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="web">Film Title</ToggleButton>
      <ToggleButton value="android">Actor</ToggleButton>
      <ToggleButton value="ios">Keyword</ToggleButton>
    </ToggleButtonGroup>
  );
}