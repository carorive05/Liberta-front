import React from "react";
import { tokenStorage } from "../utils/token";
//className = "flex flex-col justify-self-center-safe items-center gap-4 text-center pt-3"
import { useState, useEffect } from "react";
import { Card, Flex, Inset, Text } from "@radix-ui/themes";
import { Eye, Ear, Accessibility, CircleDollarSign, Clock, Calendar, UsersRound, Bookmark } from "lucide-react"; //Helped by Claude IA
//prompt: Find 5 librarys of icons and styles who match to react & tailwind.

type TypeAccesibility = "visual" | "motor" | "auditory";
type LevelAccesibility = "low" | "medium" | "high";
type AccesibilityProps = Record<TypeAccesibility, LevelAccesibility>;

const accesibilityConfig: Record<TypeAccesibility, Record<LevelAccesibility, { label: string; levelLabel: string; icon: React.ElementType; color: string }>> = {
    visual: {
        high: { label: "Visual", levelLabel: "Acceso completo", icon: Eye, color: "bg-[#E1F5EE] text-[#085041]" },
        medium: { label: "Visual", levelLabel: "Acceso parcial", icon: Eye, color: "bg-[#faeeda] text-[#633806]" },
        low: { label: "Visual", levelLabel: "Sin acceso", icon: Eye, color: "bg-[#FCEBEB] text-[#791F1F]" },
    },
    motor: {
        high: { label: "Motora", levelLabel: "Acceso completo", icon: Accessibility, color: "bg-[#E1F5EE] text-[#085041]" },
        medium: { label: "Motora", levelLabel: "Acceso parcial", icon: Accessibility, color: "bg-[#faeeda] text-[#633806]" },
        low: { label: "Motora", levelLabel: "Sin acceso", icon: Accessibility, color: "bg-[#FCEBEB] text-[#791F1F]" },
    },
    auditory: {
        high: { label: "Auditiva", levelLabel: "Acceso completo", icon: Ear, color: "bg-[#E1F5EE] text-[#085041]" },
        medium: { label: "Auditiva", levelLabel: "Acceso parcial", icon: Ear, color: "bg-[#faeeda] text-[#633806]" },
        low: { label: "Auditiva", levelLabel: "Sin acceso", icon: Ear, color: "bg-[#FCEBEB] text-[#791F1F]" },
    },
};

interface CardProps {
    id: number; 
    imageSrc: string;
    title: string;
    category: string;
    distance: number;
    price: number;
    rating: number;
    ubication: string;
    //horizontal?: boolean;
    accesibility?: AccesibilityProps;
}

export function CardDetail(props: CardProps) {

    const { id, imageSrc, title, category, distance, price, rating, ubication, accesibility } = props;


    const [isSaved, setIsSaved] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    // obtener el ID del usuario logueado 
    const userRaw = tokenStorage.getUser();
    const currentUserId = userRaw ? JSON.parse(userRaw).id : null;

    // opcional: Verificar si ya estaba guardada al cargar los detalles
    useEffect(() => {
        if (!currentUserId || !id) return;

        const checkSavedStatus = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/activities/saved/${currentUserId}/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setIsSaved(data.isSaved); 
                }
            } catch (error) {
                console.error("Error validando estado de guardado:", error);
            }
        };

        checkSavedStatus();
    }, [currentUserId, id]);

    // Manejador del click del boton guardar
    const handleSaveToggle = async () => {
        if (!currentUserId) {
            alert("Debes iniciar sesión para guardar actividades en Liberta.");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3000/api/activities/saved`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${tokenStorage.getToken()}` // Enviamos el token por si el endpoint es protegido
                },
                body: JSON.stringify({
                    userId: currentUserId,
                    activityId: id,
                }),
            });

            if (response.ok) {
                setIsSaved(!isSaved);
            } else {
                console.error("Error al procesar la solicitud en el servidor");
            }
        } catch (error) {
            console.error("Error de red al intentar guardar:", error);
        } finally {
            setLoading(false);
        }
    };

    const accesibilityData = accesibility ? (<div className="flex gap-2 flex-wrap">
        {(Object.entries(accesibility) as [TypeAccesibility, LevelAccesibility][]).map(
            ([type, level]) => {
                const config = accesibilityConfig[type][level];
                return (
                    <span
                        key={type}
                        className={`flex items-center gap-1.5 px-5 py-5 rounded-full text-xs font-medium ${config.color}`}
                    >
                        <config.icon size={14} />
                        <span className="flex gap-2 leading-tight">
                            <span className="font-semibold">{config.label}</span>
                            <span className="font-normal">{config.levelLabel}</span>
                        </span>
                    </span>
                );
            }
        )}
    </div>) : null;

    return (
        <div>
            <section className="border-b-2 border-gray-200">
                <img
                    src={imageSrc}
                    alt={title}
                    style={{
                        width: "100%",
                        height: "400px",
                        objectFit: "cover",
                        display: "block",

                    }}
                />

                <Flex className="flex-col p-3 gap-2">

                    <Text className="text-lg font-bold">{title}</Text>

                    <div className="flex items-center gap-5">
                        <Text className="text-sm text-gray-800">{ubication}</Text>
                        <Text className="text-sm text-gray-800">{distance} km</Text>
                        <Text className="text-sm text-gray-800">{category}</Text>
                        <Text className="text-sm text-gray-800">⭐ {rating}</Text>
                    </div>

                    <div className="flex gap-2 justify-between">
                        <div>
                           {accesibilityData} 
                        </div>
                        

                        <button onClick={handleSaveToggle} disabled={loading} className="flex gap-4 bg-[#1D9E75] p-5 rounded-xl text-white">
                            <Bookmark color="#ffffff" fill={isSaved ? "#ffffff" : "none"}/>
                           {loading ? "Procesando..." : isSaved ? "Guardado" : "Guardar"}
                        </button>
                    </div>
                </Flex>

            </section>

            <section className="border-b-3 border-gray-200 mt-2">
                <h1>Sobre esta actividad</h1>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vel quae qui magni adipisci fugiat quas saepe minus, cum earum culpa. Perferendis aut adipisci sequi eius atque obcaecati accusamus quis quidem?</p>

                <div className="flex flex-col justify-between gap-3 mt-2 mb-2">
                    <div className="bg-gray-200 border-2 border-gray-200 rounded-2xl p-4 h-30 flex-wrap ">
                        <CircleDollarSign color="#1D9E75"/>
                        <p>Precio</p>
                        <Text className="text-sm text-gray-800">₡{price}/ persona</Text>
                    </div>

                    <div className="bg-gray-200 border-2 border-gray-200 rounded-2xl p-4 h-30 flex-wrap">
                        <Clock color="#1D9E75"/>
                        <p>Horario</p>
                        <Text className="text-sm text-gray-800">₡{price}/ persona</Text>
                    </div>

                    <div className="bg-gray-200 border-2 border-gray-200 rounded-2xl p-4 h-30 flex-wrap">
                        <Calendar color="#1D9E75" />
                        <p>Reserva</p>
                        <Text className="text-sm text-gray-800">₡{price}/ persona</Text>
                    </div>

                    <div className="bg-gray-200 border-2 border-gray-200 rounded-2xl p-4 h-30 flex-wrap">
                        <UsersRound color="#1D9E75"/>
                        <p>Grupo maximo</p>
                        <Text className="text-sm text-gray-800">₡{price}/ persona</Text>
                    </div>

                </div>
            </section>

            <section>
                <p className="text-xl font-semibold">Calificacion y rese;as</p>

            </section>

        </div>
    );
}