// Card Component
// This component is used to display a card with an image and some text.
// It uses the Radix UI library for styling and layout.

import React from "react";
import { useNavigate } from "react-router-dom";

import {Card, Flex, Inset, Text } from "@radix-ui/themes";
import { Eye, Ear, Accessibility } from "lucide-react"; //Helped by Claude IA
//prompt: Find 5 librarys of icons and styles who match to react & tailwind.

type TypeAccesibility = "visual" | "motor" | "auditory";
type LevelAccesibility = "low" | "medium" | "high";
type AccesibilityProps = Record<TypeAccesibility, LevelAccesibility>;

const accesibilityConfig: Record<TypeAccesibility, Record<LevelAccesibility, { label: string; icon: React.ElementType ; color: string }>> = {
    visual: {
        high:   { label: "Visual", icon: Eye, color: "bg-[#E1F5EE] text-[#085041]" },
        medium: { label: "Visual", icon: Eye, color: "bg-[#faeeda] text-[#633806]" },
        low:    { label: "Visual", icon: Eye, color: "bg-[#FCEBEB] text-[#791F1F]" },
    },
    motor: {
        high:   { label: "Motora", icon: Accessibility, color: "bg-[#E1F5EE] text-[#085041]" },
        medium: { label: "Motora", icon: Accessibility, color: "bg-[#faeeda] text-[#633806]" },
        low:    { label: "Motora", icon: Accessibility, color: "bg-[#FCEBEB] text-[#791F1F]" },
    },
    auditory: {
        high:   { label: "Auditiva", icon: Ear, color: "bg-[#E1F5EE] text-[#085041]" },
        medium: { label: "Auditiva", icon: Ear, color: "bg-[#faeeda] text-[#633806]" },
        low:    { label: "Auditiva", icon: Ear, color: "bg-[#FCEBEB] text-[#791F1F]" },
    },
    
}

export interface CardProps { 
    id: number;
    imageSrc: string;
    title: string;
    category: string;
    distance: number;
    price: number;
    rating: number;
    horizontal?: boolean;
    accesibility?: AccesibilityProps;
    ubication: string;
    description: string;
    schedule: string;
    reservation: string;
    maxGroup: number;

}

export function Cards(props: CardProps) {

    const { imageSrc, title, category, distance, price, rating, horizontal = false, accesibility, ubication,description, schedule,reservation,maxGroup } = props;

     const navigate = useNavigate();

    const handleClick = () => {
        navigate("/detail", { state: props });
    };

    const accesibilityData = accesibility ? (<div className="flex gap-2 flex-wrap">
      {(Object.entries(accesibility) as [TypeAccesibility, LevelAccesibility][]).map(
        ([type, level]) => {
          const config = accesibilityConfig[type][level];
          return (
            <span
              key={type}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${config.color}`}
            >
              <config.icon size={14} />
              {config.label}
            </span>
          );
        }
      )}
    </div>) : null;

    if (horizontal) {
        return (
            //carta guardados
            <Card
                size="2"
                style={{
                    width: "100%",
                    overflow: "hidden",
                    backgroundColor: "white",
                    borderRadius: "12px",
                    display: "flex",
                    flexDirection: "row",
                }}

                onClick={handleClick} className="cursor-pointer"
            >
                <Inset side="left" clip="padding-box">
                    <img
                        src={imageSrc}
                        alt={title}
                        style={{
                            width: "300px",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                        }}
                    />
                </Inset>

                <Flex className="flex-col p-2 pl-4 gap-4 w-full">
                    <div className="flex items-center justify-between">
                        <Text className="text-sm text-gray-800">{category}</Text>
                        <Text className="text-sm text-gray-800">⭐ {rating}</Text>
                    </div>
                    <Text className="text-lg font-bold">{title}</Text>

                        {accesibilityData}

                    <div className="flex items-center justify-between">
                        <Text className="text-xs text-gray-800">{distance} km</Text>
                        <Text className="text-xs text-gray-800">₡{price}/ persona</Text>
                    </div>
                </Flex>
            </Card>
        );
    }

    return (
        //carta home 
        <Card
            size="2"
            style={{
                width: "500px", //600px segun dise;o
                overflow: "hidden",
                backgroundColor: "white",
                borderRadius: "12px",
            }}

            onClick={handleClick} className="cursor-pointer"
        >
            <Inset side="top" clip="padding-box">
                <img
                    src={imageSrc}
                    alt={title}
                    style={{
                        width: "100%",
                        height: "150px",
                        objectFit: "cover",
                        display: "block",
                    }}
                />
            </Inset>

            <Flex className="flex-col p-3 gap-2">
                <div className="flex items-center justify-between">
                    <Text className="text-sm text-gray-800">{category}</Text>
                    <Text className="text-sm text-gray-800">⭐ {rating}</Text>
                </div>
                <Text className="text-lg font-bold">{title}</Text>

                   {accesibilityData}

                <div className="flex items-center justify-between">
                    <Text className="text-xs text-gray-800">{distance} km</Text>
                    <Text className="text-xs text-gray-800">₡{price}/ persona</Text>
                </div>
            </Flex>
        </Card>
    );
}