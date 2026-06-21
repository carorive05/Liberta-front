import React from "react";

import { Theme, Box, Grid } from "@radix-ui/themes";
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { ChevronRight } from 'lucide-react';

import { Navbar } from "../components/NavBar";

export default function SettingslDisplay() {
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
                                <h2>Ana Lopez</h2>
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

                        <button className="mt-5 mr-6 bg-[#E1F5EE] border-2 border-[#1D9E75] rounded-xl h-15 w-25">Editar perfil</button>

                    </section>

                    <section className="bg-white border-2 border-[#dfddd1] rounded-2xl p-6 ">

                        <h3 className="p-2">Configuracion y preferencias</h3>
                        <Grid columns="1" className="gap-2">

                            <Disclosure>
                                <DisclosureButton className="flex justify-between group gap-2 border-2 w-full p-3">
                                    <div className="flex">
                                        <p className="p-4 ">icon</p>
                                        <div className="flex flex-col text-left">
                                            Editar perfil
                                            <span>Actualiza tu informacion personal</span>
                                        </div>
                                    </div>

                                    <ChevronRight className="w-5 mt-3 group-data-open:rotate-90" />

                                </DisclosureButton>

                                <DisclosurePanel>No</DisclosurePanel>

                            </Disclosure>

                            <Disclosure>
                                <DisclosureButton className="flex justify-between group gap-2 border-2 w-full p-3">
                                    <div className="flex">
                                        <p className="p-4 ">icon</p>
                                        <div className="flex flex-col text-left">
                                            Configuracion de accesibilidad
                                            <span>Personalina tu experiencia</span>
                                        </div>
                                    </div>

                                    <ChevronRight className="w-5 mt-3 group-data-open:rotate-90" />

                                </DisclosureButton>

                                <DisclosurePanel>No</DisclosurePanel>

                            </Disclosure>

                            <Disclosure>
                                <DisclosureButton className="flex justify-between group gap-2 border-2 w-full p-3">
                                    <div className="flex">
                                        <p className="p-4 ">icon</p>
                                        <div className="flex flex-col text-left">
                                            Mis preferencias
                                            <span>Gestiona tus esperiencias de viaje</span>
                                        </div>
                                    </div>

                                    <ChevronRight className="w-5 mt-3 group-data-open:rotate-90" />

                                </DisclosureButton>

                                <DisclosurePanel>No</DisclosurePanel>

                            </Disclosure>

                            <Disclosure>
                                <DisclosureButton className="flex justify-between group gap-2 border-2 w-full p-3">
                                    <div className="flex">
                                        <p className="p-4 ">icon</p>
                                        <div className="flex flex-col text-left">
                                            Privacidad y datos
                                            <span>Controla tu informacion</span>
                                        </div>
                                    </div>

                                    <ChevronRight className="w-5 mt-3 group-data-open:rotate-90" />

                                </DisclosureButton>

                                <DisclosurePanel>No</DisclosurePanel>

                            </Disclosure>

                            <Disclosure>
                                <DisclosureButton className="flex justify-between group gap-2 border-2 w-full p-3">
                                    <div className="flex">
                                        <p className="p-4 ">icon</p>
                                        <div className="flex flex-col text-left">
                                            Historial de actividades
                                            <span>Revisa tus actividades pasadas</span>
                                        </div>
                                    </div>

                                    <ChevronRight className="w-5 mt-3 group-data-open:rotate-90" />

                                </DisclosureButton>

                                <DisclosurePanel>No</DisclosurePanel>

                            </Disclosure>

                            <Disclosure>
                                <DisclosureButton className="flex justify-between group gap-2 border-2 w-full p-3">
                                    <div className="flex">
                                        <p className="p-4 ">icon</p>
                                        <div className="flex flex-col text-left">
                                            Ayuda y soport
                                            <span>Obten ayuda cuando la necesites</span>
                                        </div>
                                    </div>

                                    <ChevronRight className="w-5 mt-3 group-data-open:rotate-90" />

                                </DisclosureButton>

                                <DisclosurePanel>No</DisclosurePanel>

                            </Disclosure>

                            <Disclosure>
                                <DisclosureButton className="flex justify-between group gap-2 border-2 w-full p-3">
                                    <div className="flex">
                                        <p className="p-4 ">icon</p>
                                        <div className="flex flex-col text-left">
                                            Cerrar sesion
                                            <span>Salir de tu cuenta</span>
                                        </div>
                                    </div>

                                    <ChevronRight className="w-5 mt-3 group-data-open:rotate-90" />

                                </DisclosureButton>

                                <DisclosurePanel>No</DisclosurePanel>

                            </Disclosure>

                        </Grid>

                    </section>

                </div>

            </Box>

        </Theme>

    )
}