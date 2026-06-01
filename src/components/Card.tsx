// Card Component
// This component is used to display a card with an image and some text.
// It uses the Radix UI library for styling and layout.

import React from "react";

import { Theme } from "@radix-ui/themes";
import { Box, Card, Flex, Inset, Strong, Text } from "@radix-ui/themes";

interface CardProps {
    imageSrc: string;
    title: string;
    category: string;
    distance: string; 
    price: string;
    rating: number;
    
}

export function Card1(props: CardProps) {
    return (
        <Card
                size="2"
                style={{
                    width: "5000px",
                    overflow: "hidden",
                    backgroundColor: "white",
                    borderRadius: "12px",
                }}
            >
               {/*  <Flex>*/}

                    {/* Imagen */}
                    <Inset side="left" clip="padding-box" pb="current">
                        <img
                            src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                            alt="Typography"
                            style={{
                                width: "200px",
                                height: "100%",
                                objectFit: "cover",
                                display: "block",
                            }}
                        />
                    </Inset>

                    {/* Texto */}
                    <Flex
                        direction="column"
                        justify="center"
                        p="4"
                        gap="2"
                    >
                        <Text size="4" color="gray">
                            {props.category}
                        </Text>

                        <Text size="5" weight="bold">
                            {props.title}
                        </Text>

                    </Flex>

                {/*</Flex> */}
            </Card>
    );
}