import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface TutorialContextType {
  showTutorial: boolean;
  setShowTutorial: (show: boolean) => void;
}

const TutorialContext = createContext<TutorialContextType | undefined>(
  undefined,
);

export function TutorialProvider({ children }: { children: ReactNode }) {
  const [showTutorial, setShowTutorial] = useState<boolean>(
    localStorage.getItem("showTutorial") === "false" ? false : true,
  );

  useEffect(() => {
    localStorage.setItem("showTutorial", showTutorial.toString());
  }, [showTutorial]);

  return (
    <TutorialContext.Provider value={{ showTutorial, setShowTutorial }}>
      {children}
    </TutorialContext.Provider>
  );
}

export function useTutorial() {
  const context = useContext(TutorialContext);
  if (!context)
    throw new Error("useTutorial must be used within a TutorialProvider");
  return context;
}
