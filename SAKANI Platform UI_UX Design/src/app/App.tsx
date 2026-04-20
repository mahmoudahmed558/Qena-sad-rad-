import React from 'react';
import { RouterProvider } from 'react-router';
import { router } from './routes';
import { Toaster } from 'sonner';

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        richColors
        closeButton
        dir="rtl"
        toastOptions={{
          style: {
            fontFamily: 'Readex Pro, sans-serif',
          },
        }}
      />
    </>
  );
}