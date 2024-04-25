import { createContext } from "react";

export const TrainerDetailContext = createContext();

export function TrainerDetailProvier({ children }) {
  const [trainerDetailInfo, setTrainerDetailInfo] = useState({});

  return (
    <TrainerDetailContext.Provider
      value={{ trainerDetailInfo, setTrainerDetailInfo }}
    >
      {children}
    </TrainerDetailContext.Provider>
  );
}
