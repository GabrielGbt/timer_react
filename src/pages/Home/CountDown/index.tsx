import { useContext, useEffect } from "react";
import { CountdownContainer, Separator } from "./styles";
import { differenceInSeconds } from "date-fns";
import { CyclesContext } from "../../../contexts/CycleContext";

export function CountDown() {
    const { 
        activeCycle, 
        activeCycleId, 
        markCurrentCycleAsFinished, 
        amountSecondsPassed, 
        setSecondsPassed 
    } = useContext(CyclesContext);

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

    useEffect(() => {
        let interval: string | number | NodeJS.Timeout | undefined;
        
        if (activeCycle) {
            interval = setInterval(() => {
                const secondsDifference = differenceInSeconds(
                    new Date(),
                    activeCycle.startDate!,
                )

                if (secondsDifference > totalSeconds) {
                    markCurrentCycleAsFinished();
                    clearInterval(interval);
                } else {
                    setSecondsPassed(secondsDifference);
                }

            }, 1000);
        }
        
        return () => {
            clearInterval(interval);
        };
    }, [activeCycle, totalSeconds, activeCycleId, markCurrentCycleAsFinished]);




    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

    const minutesAmount = Math.floor(currentSeconds / 60);
    const secondsAmount = currentSeconds % 60;

    const minutes = String(minutesAmount).padStart(2, '0');
    const seconds = String(secondsAmount).padStart(2, '0');

    useEffect(() => {
        if (parseInt(seconds) > 0) {
            document.title = `${minutes}:${seconds}`;
        } else {
            document.title = 'Done!';
        }
    }, [minutes, seconds, activeCycle])

    return (
        <CountdownContainer>
            <span>{minutes[0]}</span>
            <span>{minutes[1]}</span>
            <Separator>:</Separator>
            <span>{seconds[0]}</span>
            <span>{seconds[1]}</span>
        </CountdownContainer>
    )
}