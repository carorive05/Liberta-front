import React from "react";

import { Theme } from "@radix-ui/themes";
import { Box, Flex } from "@radix-ui/themes";
import { Cards } from "../components/Card";


export default function HomeDisplay() {
    return (
        <Theme>

            <Box p="4" style={{ backgroundColor: "#f0f0f0", minHeight: "100vh" }}>
                <Flex direction="column" gap="4">
                    <Cards
                        imageSrc="https://images.pexels.com/photos/37001452/pexels-photo-37001452.jpeg"
                        title="Parque Nacional Volcán Poás"
                        category="Naturaleza"
                        distance={12.5}
                        price={15000}
                        rating={4.5}
                        horizontal={false}
                        accesibility={{
                            visual: "high",
                            motor: "medium",
                            auditory: "low",
                        }}
                    />

                    <Cards
                        imageSrc="https://images.pexels.com/photos/37001452/pexels-photo-37001452.jpeg"
                        title="Playa Manuel Antonio"
                        category="Naturaleza"
                        distance={150}
                        price={12000}
                        rating={3.5}
                        horizontal={true}
                        accesibility={{
                            visual: "high",
                            motor: "medium",
                            auditory: "low",
                        }}
                    />
                </Flex>
            </Box>
        </Theme>
    )
}