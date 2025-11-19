import React, { createContext, useContext, useState, ReactNode } from "react";
import Alert from "../../components/Alert";
type AlertType = "success" | "error" | "warning" | "info";

interface AlertState {
  visible: boolean;
  title: string;
  message: string;
  type: AlertType;
}

interface AlertContextProps {
  showAlert: (title: string, message: string, type?: AlertType) => void;
  hideAlert: () => void;
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alert, setAlert] = useState<AlertState>({
    visible: false,
    title: "",
    message: "",
    type: "info",
  });

  const showAlert = (title: string, message: string, type: AlertType = "info") => {
    setAlert({ visible: true, title, message, type });
  };

  const hideAlert = () => {
    setAlert((prev) => ({ ...prev, visible: false }));
  };

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      <Alert
        visible={alert.visible}
        title={alert.title}
        message={alert.message}
        type={alert.type}
        onClose={hideAlert}
      />
    </AlertContext.Provider>
  );
};

export const useAlert = (): AlertContextProps => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("Alert debe usarse dentro de un AlertProvider");
  }
  return context;
};
