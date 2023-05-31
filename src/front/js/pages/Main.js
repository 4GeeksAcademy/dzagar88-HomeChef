import * as React from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export const Main = () => {
    const [alignment, setAlignment] = React.useState('web');

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    return (
        <div className="container">
            <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
                className="Toggle"
            >
                <ToggleButton value="diner">Diner</ToggleButton>
                <ToggleButton value="chef">Chef</ToggleButton>
            </ToggleButtonGroup>
        </div>

    );
};
