import { createBrowserRouter } from "react-router";
import { StudentLayout } from "./layouts/StudentLayout";
import { OwnerLayout } from "./layouts/OwnerLayout";
import { LandingPage } from "./pages/LandingPage";
import { ResultsPage } from "./pages/ResultsPage";
import { PropertyPage } from "./pages/PropertyPage";
import { ChatPage } from "./pages/ChatPage";
import { DashboardPage } from "./pages/DashboardPage";
import { AddPropertyWizard } from "./components/AddPropertyWizard";
import { BookingsPage } from "./pages/BookingsPage";
import { ProfilePage } from "./pages/ProfilePage";
import { Notifications } from "./pages/Notifications";
import { AccountTypeSelection } from "./pages/AccountTypeSelection";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { WelcomePage } from "./pages/WelcomePage";
import { LandingPageNew } from "./pages/LandingPageNew";
import { DesignSystemPage } from "./pages/DesignSystemPage";
import React from 'react';

export const router = createBrowserRouter([
  {
    path: "/landing",
    Component: StudentLayout,
    children: [
      { index: true, Component: LandingPageNew },
    ],
  },
  {
    path: "/",
    Component: StudentLayout,
    children: [
      { index: true, Component: LandingPage },
      { path: "results", Component: ResultsPage },
      { path: "property/:id", Component: PropertyPage },
      { path: "chat", Component: ChatPage },
    ],
  },
  {
    path: "/owner",
    Component: OwnerLayout,
    children: [
      { index: true, Component: DashboardPage },
      { path: "add-property", Component: AddPropertyWizard },
      { path: "bookings", Component: BookingsPage },
      { path: "messages", Component: ChatPage },
      { path: "profile", Component: ProfilePage },
      { path: "notifications", Component: Notifications },
    ],
  },
  {
    path: "/account-type",
    Component: AccountTypeSelection,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/signup",
    Component: SignupPage,
  },
  {
    path: "/welcome",
    Component: WelcomePage,
  },
  {
    path: "/design-system",
    Component: DesignSystemPage,
  },
]);