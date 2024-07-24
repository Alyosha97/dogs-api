import { Collapse, IconButton, ListItem, ListSubheader } from "@mui/material";
import List from "@mui/material/List";
import { useEffect, useState, Fragment } from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const DogList = () => {
  const [breeds, setBreeds] = useState([]);
  const [open, setOpen] = useState({});

  useEffect(() => {
    const getBreeds = () => {
      fetch("https://dog.ceo/api/breeds/list/all")
        .then((response) => response.json())
        .then((data) => {
          const newData = Object.keys(data.message).map((breed) => ({
            breed,
            subBreeds: data.message[breed],
          }));

          setBreeds(newData);
        });
    };
    getBreeds();
  }, []);

  const onToggle = (breed, expand) => {
    setOpen({
      ...open,
      [breed]: expand,
    });
  };

  return (
    <List subheader={<ListSubheader component="div">Breed List</ListSubheader>}>
      {breeds.map((breedObj) => (
        <Fragment key={breedObj.breed}>
          <ListItem>
            {breedObj.breed}
            {!!breedObj.subBreeds.length && (
              <>
                {open[breedObj.breed] ? (
                  <IconButton onClick={() => onToggle(breedObj.breed, false)}>
                    <ExpandLess />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => onToggle(breedObj.breed, true)}>
                    <ExpandMore />
                  </IconButton>
                )}
              </>
            )}
          </ListItem>
          {!!breedObj.subBreeds.length && (
            <Collapse in={open[breedObj.breed]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {breedObj.subBreeds.map((subBreed) => (
                  <ListItem sx={{ pl: 4 }} key={subBreed}>
                    {subBreed}{" "}
                  </ListItem>
                ))}
              </List>
            </Collapse>
          )}
        </Fragment>
      ))}
    </List>
  );
};

export default DogList;
