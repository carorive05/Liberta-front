import React from "react";
import { useNavigate } from "react-router-dom";

import { Theme, Box, Grid } from "@radix-ui/themes";
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { ChevronRight, LogOut, CircleQuestionMark, Clock, LayoutGrid, Settings, SquarePen } from 'lucide-react';

import { Navbar } from "../components/NavBar";

export default function SettingslDisplay() {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/login");
    };

    return (
        <Theme>
            <Navbar />

            <Box p="6" style={{ backgroundColor: "#F8F9FA", minHeight: "100vh" }}>

                <div className="max-w-2xl mx-auto">
                    <h1 className="font-semibold ">Mi Perfil</h1>
                    <span className="text-[#6B6B68]">Gestiona tu información personal y preferencias</span>

                    <section className="bg-white border-2 border-[#dfddd1] rounded-2xl mb-5 flex justify-between" >

                        <div className="flex flex-col gap-4 p-6">
                            <div>
                                <h2>{/*user.name */} Ana Lopez</h2>
                                <p className="text-[#6B6B68]">ana.lopez@email.com</p>
                            </div>

                            <div className="flex gap-6 ">
                                <div className="bg-[#F8F9FA] p-2 rounded">
                                    <p className="font-bold">3</p>
                                    <span className="text-[#6B6B68] text-sm">Guardados</span>
                                </div>
                                <div className="bg-[#F8F9FA] p-2 rounded">
                                    <p className="font-bold">12</p>
                                    <span className="text-[#6B6B68] text-sm">Visitados</span>
                                </div>
                                <div className="bg-[#F8F9FA] p-2 rounded">
                                    <p className="font-bold">1</p>
                                    <span className="text-[#6B6B68] text-sm">Intinerario activo</span>
                                </div>
                            </div>
                        </div>

                        {/*<button className="mt-5 mr-6 bg-[#E1F5EE] border-2 border-[#1D9E75] rounded-xl h-15 w-25">Editar perfil</button> */}

                    </section>

                    <section className="bg-white border-2 border-[#dfddd1] rounded-2xl p-6 ">

                        <h3 className="p-2">Configuracion y preferencias</h3>
                        <Grid columns="1" className="gap-2">

                            <Disclosure>

                                <DisclosureButton className="flex justify-between group gap-2 border-2 w-full p-3 border-[#1D9E75] bg-[#E1F5EE] rounded-xl">
                                    <div className="flex">
                                        <p className="p-4 "><SquarePen color="#1D9E75"/></p>
                                        <div className="flex flex-col text-left font-black">
                                            <p className="text-[#085041]"> Editar perfil</p>
                                            <span className="font-normal">Actualiza tu informacion personal</span>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-5 mt-3 group-data-open:rotate-90" />
                                </DisclosureButton>

                                <DisclosurePanel className="gap-2 pl-4 pr-4">No

                                </DisclosurePanel>

                            </Disclosure>

                            <Disclosure>

                                <DisclosureButton className="flex justify-between group gap-2 border-2 w-full p-3 border-[#1D9E75] bg-[#E1F5EE] rounded-xl">
                                    <div className="flex">
                                        <p className="p-4 "><Settings color="#1D9E75" /></p>
                                        <div className="flex flex-col text-left font-black">
                                           <p className="text-[#085041]">Configuracion de accesibilidad</p>
                                            <span className="font-normal">Personalina tu experiencia</span>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-5 mt-3 group-data-open:rotate-90" />
                                </DisclosureButton>

                                <DisclosurePanel className="gap-2 pl-4 pr-4">No

                                </DisclosurePanel>

                            </Disclosure>

                            <Disclosure>

                                <DisclosureButton className="flex justify-between group gap-2 border-2 w-full p-3 border-[#1D9E75] bg-[#E1F5EE] rounded-xl">
                                    <div className="flex">
                                        <p className="p-4 "><LayoutGrid color="#1D9E75"/></p>
                                        <div className="flex flex-col text-left font-black">
                                            <p className="text-[#085041]">Privacidad y datos</p>
                                            <span className="font-normal">Controla tu informacion</span>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-5 mt-3 group-data-open:rotate-90" />
                                </DisclosureButton>

                                <DisclosurePanel className="gap-2 pl-4 pr-4">No

                                </DisclosurePanel>

                            </Disclosure>

                            <Disclosure>
                                
                                <DisclosureButton className="flex justify-between group gap-2 border-2 w-full p-3 border-[#1D9E75] bg-[#E1F5EE] rounded-xl">
                                    <div className="flex">
                                        <p className="p-4 "><Clock color="#1D9E75"/></p>
                                        <div className="flex flex-col text-left font-black">
                                            <p className="text-[#085041]"> Historial de actividades </p>
                                            <span className="font-normal">Revisa tus actividades pasadas</span>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-5 mt-3 group-data-open:rotate-90" />
                                </DisclosureButton>

                                <DisclosurePanel className="gap-2 pl-4 pr-4">No

                                </DisclosurePanel>

                            </Disclosure>

                            <Disclosure>

                                <DisclosureButton className="flex justify-between group gap-2 border-2 w-full p-3 border-[#1D9E75] bg-[#E1F5EE] rounded-xl">
                                    <div className="flex">
                                        <p className="p-4 "><CircleQuestionMark color="#1D9E75"/></p>
                                        <div className="flex flex-col text-left font-black">
                                            <p className="text-[#085041]"> Ayuda y soporte </p>
                                            <span className="font-normal">Obten ayuda cuando la necesites</span>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-5 mt-3 group-data-open:rotate-90" />
                                </DisclosureButton>

                                <DisclosurePanel className="gap-2 pl-4 pr-4">
                                    <p>Para ayuda o soporte tecnico puedes contactar</p>
                                    <p>Correo electronico: soporte@liberta.com</p>
                                </DisclosurePanel>

                            </Disclosure>

                            <Disclosure>

                                <DisclosureButton className="flex justify-between group gap-2 border-2 w-full p-3 border-[#791F1F] bg-[#FCEBEB] rounded-xl">
                                    <div className="flex">
                                        <p className="p-4 "><LogOut color="#791F1F"/></p>
                                        <div className="flex flex-col text-left font-black">
                                            <p className="text-[#791F1F]">Cerrar sesion </p>
                                            <span className="font-normal">Salir de tu cuenta</span>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-5 mt-3 group-data-open:rotate-90" />
                                </DisclosureButton>

                                <DisclosurePanel className="gap-2 pl-4 pr-4">
                                    <p className="mb-2">Seguro que quieres cerrar sesion?</p>
                                    <button onClick={handleClick} className="border-2 w-full p-3 border-[#791F1F] bg-[#FCEBEB] rounded-xl">Si cerrar sesion </button>
                                </DisclosurePanel>

                            </Disclosure>

                        </Grid>
                    </section>
                </div>
            </Box>
        </Theme>
    )
}