// frontend/src/components/PropertyList.js
import React from "react";
import {
  Paper,
  Typography,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  Grid2,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import dayjs from "dayjs";

function PropertyList({ properties, onEdit, onDelete }) {
  return (
    <Grid2 container spacing={3} justifyContent="center">
      {properties.map((property, index) => (
        <Grid2
          item
          xs={12}
          sm={6}
          md={4}
          key={
            property.id ||
            `${property.property_type}-${property.locality}-${index}`
          }
        >
          <Card sx={{ maxWidth: 345 }}>
            {/* Image Preview */}
            {property.imageUrl && (
              <CardMedia
                component="img"
                height="140"
                image={property.imageUrl}
                alt={property.locality}
              />
            )}

            <CardContent>
              {/* Property Type and Category */}
              <Typography variant="h6">
                {property.property_type} - {property.category}
              </Typography>

              {/* City and Locality */}
              <Typography variant="subtitle1" color="textSecondary">
                {property.city}, {property.locality}
              </Typography>

              {/* Price */}
              <Typography variant="subtitle1" color="textPrimary">
                Price: ₹{property.price}
              </Typography>

              {/* Square Feet */}
              <Typography variant="body2" color="textSecondary">
                Area: {property.sqft} sq ft
              </Typography>

              {/* Bedrooms, Bathrooms, and Parking Spaces */}
              <Typography variant="body2" color="textSecondary">
                {property.bedrooms} Beds, {property.bathrooms} Baths,{" "}
                {property.parking_spaces} Parking Spaces
              </Typography>

              {/* Furnishing and Property Status */}
              <Typography variant="body2" color="textSecondary">
                Furnishing: {property.furnishing_status}, Status:{" "}
                {property.property_status}
              </Typography>

              {/* Listing Dates */}
              <Typography variant="body2" color="textSecondary">
                Listed From:{" "}
                {dayjs(property.listed_startdate).format("DD/MM/YYYY")} to{" "}
                {dayjs(property.listing_enddate).format("DD/MM/YYYY")}
              </Typography>

              {/* Video Link */}
              {property.video_url && (
                <Typography variant="body2" color="primary">
                  <a
                    href={property.video_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Video
                  </a>
                </Typography>
              )}
            </CardContent>
            <Paper
              elevation={0}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: 1,
              }}
            >
              <IconButton color="primary" onClick={() => onEdit(property)}>
                <EditIcon />
              </IconButton>
              <IconButton
                color="secondary"
                onClick={() => onDelete(property.id)}
              >
                <DeleteIcon />
              </IconButton>
            </Paper>
            {/* Action Buttons */}
          </Card>
        </Grid2>
      ))}
    </Grid2>
  );
}

export default PropertyList;
