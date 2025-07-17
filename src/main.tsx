import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { ThemeProvider } from "@/components/theme-provider";

import App from "./App.tsx"; // 메인 페이지
import SignUp from "./pages/auth/sign-up.tsx"; // 회원가입 페이지
import SignIn from "./pages/auth/sign-in.tsx"; // 로그인 페이지
import Topics from "./pages/topics"; // 토픽 - 메인 페이지
import NewTopic from "./pages/topics/new-topic.tsx"; // 토픽 - 토픽 생성 페이지

import { Toaster } from "sonner";
import "./index.css";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/topics" element={<Topics />} />
                    <Route path="/topics/new-topic" element={<NewTopic />} />
                </Routes>
                <Toaster />
            </BrowserRouter>
        </ThemeProvider>
    </StrictMode>
);
