import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function CategoryToggleButton({setSearchCategory, searchCategory, setSearchQuery, setActors, setKeywords}) {

    const handleChange = (event, newSearchCategory) => {
        if (newSearchCategory !== null) {
            setSearchCategory(newSearchCategory);
            setActors([]);
            setKeywords([]);
            setSearchQuery("");
          }
    };

  return (
    <ToggleButtonGroup
      color="primary"
      value={searchCategory}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="title">By Film Title</ToggleButton>
      <ToggleButton value="actor">By Actor</ToggleButton>
      <ToggleButton value="keyword">By Keyword</ToggleButton>
    </ToggleButtonGroup>
  );
}