import React, { useState } from "react";
import { Typography, Button } from "@mui/material";

const MAX_LENGTH = 50;

const ShowMore = ({ text }) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <>
      <Typography variant="body1">
        {showMore ? text : `${text.slice(0, MAX_LENGTH)}...`}
      </Typography>
      {text.length > MAX_LENGTH && (
        <Button variant="text" onClick={toggleShowMore} size="small">
          {showMore ? "Show less" : "Show more"}
        </Button>
      )}
    </>
  );
};

export default ShowMore;
