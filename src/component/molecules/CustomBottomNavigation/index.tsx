import React from "react";
import Box from "@mui/material/Box";
import Image from "next/image";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import homeicon from "@/images/home.svg";
import categoriesicon from "@/images/categories.png";
import diamondicon from "@/images/diamond.png";
import tagicon from "@/images/tagicon.png";
import profile from "@/images/profile.png";
import styles from "./bottomNavigation.module.scss";

const CustomBottomNavigation = () => {
  const [value, setValue] = React.useState(0);

  const data = [
    {
      label: "HOME",
      icon: homeicon,
    },
    {
      label: "CATEGORIES",
      icon: categoriesicon,
    },
    {
      label: "LUXE",
      icon: diamondicon,
    },
    {
      label: "BRANDS",
      icon: tagicon,
    },
    {
      label: "PROFILE",
      icon: profile,
    },
  ];

  return (
    <Box className={styles.bottomNavigationWrapper}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          console.log(newValue);
          setValue(newValue);
        }}
      >
        {data.map((item, index) => (
          <BottomNavigationAction
            key={index}
            sx={{
              minWidth: "unset",
              gap: "0.5rem",
              "& .MuiBottomNavigationAction-label": {
                fontWeight: 700,
                color: value === index ? "#000" : "rgba(0,0,0,0.5)",
              },
            }}
            label={item.label}
            icon={
              <Image
                style={{
                  opacity: value === index ? 1 : 0.5,
                }}
                width={30}
                height={30}
                src={item.icon}
                alt={item.label}
              />
            }
          />
        ))}
      </BottomNavigation>
    </Box>
  );
};

export default CustomBottomNavigation;
