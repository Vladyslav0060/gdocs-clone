import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

type OptionType = "delete" | "edit" | "share";

type Option = {
  title: string;
  type: OptionType;
};

const options: Option[] = [
  { title: "Delete", type: "delete" },
  { title: "Edit", type: "edit" },
  { title: "Share", type: "share" },
];

const ITEM_HEIGHT = 48;

interface DocumentCardMenuProps {
  setType: (type: OptionType) => void;
}

export function DocumentCardMenu({ setType }: DocumentCardMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (option_type: OptionType) => {
    setType(option_type);
    handleClose();
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: { style: { maxHeight: ITEM_HEIGHT * 4.5, width: "20ch" } },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.title}
            // selected={option === "Pyxis"}
            onClick={() => handleSelect(option.type)}
          >
            {option.title}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
