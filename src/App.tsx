import React from "react";

import { Theme } from "@radix-ui/themes";
import { Box, Card, Flex, Inset, Strong, Text } from "@radix-ui/themes";

export default function App() {
    return (
        <div className="bg-amber-50 min-h-screen flex items-center justify-center">

            <Card
                size="2"
                style={{
                    width: "540px",
                    overflow: "hidden",
                    backgroundColor: "white",
                }}
            >
                <Flex>

                    {/* Imagen */}
                    <Inset side="left" clip="padding-box" pb="current">
                        <img
                            src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                            alt="Typography"
                            style={{
                                width: "100%",
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
                        <Text size="5" weight="bold">
                            Typography
                        </Text>

                        <Text size="4" color="gray">
                            is the art and technique of arranging type to
                            make written language legible, readable and appealing.
                        </Text>
                    </Flex>

                </Flex>
            </Card>
        </div>
    )
};
