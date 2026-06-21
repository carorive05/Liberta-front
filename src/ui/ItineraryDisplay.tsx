import React from "react";

import { Theme, Box, Flex } from "@radix-ui/themes";
import { Navbar } from "../components/NavBar";


export default function IntineraryDisplay() {
    return (
        <Theme>
            <Navbar />
            <Box p="6" style={{ backgroundColor: "#F8F9FA", minHeight: "100vh" }}>
                <h1> Intinerario de actividades </h1>
                
            </Box>
        </Theme>

    )

}