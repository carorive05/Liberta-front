import React from "react";

import { Theme } from "@radix-ui/themes";
import { Box, Flex } from "@radix-ui/themes";
import { Cards } from "./components/Card";

import { Routes, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

import HomeUI from './ui/HomeDisplay';
import DetailUI from './ui/DetailDisplay';
import KeepUI from './ui/KeepDisplay';
import SearchUI from './ui/SearchDisplay';
import SettingsUI from './ui/SettingsDisplay';
import IntineraryUI from "./ui/ItineraryDisplay";
import { AuthDisplay } from './ui/AuthDisplay';

export default function App() {
    return (
            <Routes>
                <Route path="/" element={<HomeUI/>} />
                <Route path="/login" element={<AuthDisplay />} />
                <Route path="/detail" element={<DetailUI />} />
                <Route path="/keep" element={<KeepUI />} />
                <Route path="/search" element={<SearchUI />} />
                <Route path="/settings" element={<SettingsUI />} />
                <Route path="/intinerary" element={<IntineraryUI />}/>
            </Routes>

    )
};
