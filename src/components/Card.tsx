// Card.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

import { Card, Flex, Inset, Text } from "@radix-ui/themes";
import { Eye, Ear, Accessibility } from "lucide-react";
import { Tag, MapPin } from "lucide-react";

type TypeAccessibility = "visual" | "motor" | "auditory";
type LevelAccessibility = "low" | "medium" | "high" | "no";
type AccessibilityProps = Record<TypeAccessibility, LevelAccessibility>;

const accessibilityConfig: Record<TypeAccessibility, Record<LevelAccessibility, { label: string; icon: React.ElementType; color: string }>> = {
    visual: {
        high: { label: "Visual", icon: Eye, color: "bg-[#E1F5EE] text-[#085041]" },
        medium: { label: "Visual", icon: Eye, color: "bg-[#faeeda] text-[#633806]" },
        low: { label: "Visual", icon: Eye, color: "bg-[#FCEBEB] text-[#791F1F]" },
        no: { label: "Visual", icon: Eye, color: "bg-[#eeeeee] text-[#999999]" }
    },
    motor: {
        high: { label: "Motora", icon: Accessibility, color: "bg-[#E1F5EE] text-[#085041]" },
        medium: { label: "Motora", icon: Accessibility, color: "bg-[#faeeda] text-[#633806]" },
        low: { label: "Motora", icon: Accessibility, color: "bg-[#FCEBEB] text-[#791F1F]" },
        no: { label: "Motora", icon: Accessibility, color: "bg-[#eeeeee] text-[#999999]" }
    },
    auditory: {
        high: { label: "Auditiva", icon: Ear, color: "bg-[#E1F5EE] text-[#085041]" },
        medium: { label: "Auditiva", icon: Ear, color: "bg-[#faeeda] text-[#633806]" },
        low: { label: "Auditiva", icon: Ear, color: "bg-[#FCEBEB] text-[#791F1F]" },
        no: { label: "Auditiva", icon: Ear, color: "bg-[#eeeeee] text-[#999999]" }
    },
};

export interface CardProps {
    id: number;
    imageSrc: string;
    title: string;
    category: string;
    distance: number;
    price: number;
    rating: number;
    horizontal?: boolean;
    accessibility?: AccessibilityProps;
    ubication: string;
    description: string;
    schedule: string;
    reservation: string;
    maxGroup: number;
}

export function Cards(props: CardProps) {
    const { imageSrc, title, category, distance, price, rating, horizontal = false, accessibility, ubication, description, schedule, reservation, maxGroup } = props;

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/detail", { state: props });
    };

    const accessibilityData = accessibility ? (
        <div className="flex gap-2 flex-wrap">
            {(Object.entries(accessibility) as [TypeAccessibility, LevelAccessibility][]).map(
                ([type, level]) => {
                    const config = accessibilityConfig[type]?.[level];
                    if (!config) return null;
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
        </div>
    ) : null;

    if (horizontal) {
        return (
            //keep
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
                onClick={handleClick}
                className="cursor-pointer"
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
                        <Text className="text-sm text-[#6B6B68]"> <Tag className={'p-0.5'} /> {category}</Text>
                        <Text className="text-sm text-[#6B6B68]">⭐ {rating}</Text>
                    </div>
                    <Text className="text-lg font-bold">{title}</Text>

                    {accessibilityData}

                    <div className="flex items-center justify-between">
                        <Text className="text-xs text-[#6B6B68]"> <MapPin className={'p-0.5'} /> {distance} km</Text>
                        <Text className="text-xs text-[#6B6B68]">₡{price}/ persona</Text>
                    </div>
                </Flex>
            </Card>
        );
    }

    return (
        <Card
            //home
            size="2"
            style={{
                width: "500px",
                overflow: "hidden",
                backgroundColor: "white",
                borderRadius: "12px",
            }}
            onClick={handleClick}
            className="cursor-pointer"
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
                    <Text className="text-sm text-gray-800 flex items-center"> <Tag className={'p-0.5'} /> {category}</Text>
                    <Text className="text-sm text-gray-800">⭐ {rating}</Text>
                </div>
                <Text className="text-lg font-bold">{title}</Text>

                {accessibilityData}

                <div className="flex items-center justify-between">
                    <Text className="text-xs text-gray-800 flex items-center"> <MapPin className={'p-0.5'}/> {distance} km</Text>
                    <Text className="text-xs text-gray-800">₡{price}/ persona</Text>
                </div>
            </Flex>
        </Card>
    );
}