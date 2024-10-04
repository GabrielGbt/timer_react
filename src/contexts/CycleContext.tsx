import { createContext, ReactNode, useReducer, useState } from "react";

interface CycleForm {
    id?: string;
    task: string;
    minutesAmount: number;
    startDate?: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
}

interface CycleContextType {
    cycles: CycleForm[];
    activeCycle: CycleForm | undefined;
    activeCycleId: string | null;
    markCurrentCycleAsFinished: () => void;
    amountSecondsPassed: number;
    setSecondsPassed: (seconds: number) => void;
    createNewCycle: (data : CycleForm) => void;
    interruptCycle: () => void;
}

export const CyclesContext = createContext({} as CycleContextType);

interface ChildrenContext {
    children: ReactNode;
}

interface CycleState {
    cycles: CycleForm[];
    activeCycleId: string | null;
}

export function CyclesContextProvider({ children }: ChildrenContext) {
    

    const [ cycleState, dispatch ] = useReducer(
        (state: CycleState, action: any) => {
            switch (action.type) {
                case 'ADD_NEW_CYCLE':
                    return {
                        ...state,
                        cycles: [...state.cycles, action.payload.newCycle],
                        activeCycleId: action.payload.newCycle.id,
                    }
                case 'MARK_CYCLE_AS_FINISHED':
                    return {
                        ...state,
                        cycles: state.cycles.map((cycle) => {
                            if (cycle.id === state.activeCycleId) {
                                return {...cycle, finishedDate: new Date()}
                            } else {
                                return cycle;
                            }
                        })
                    }
                case 'INTERRUPT_CYCLE':
                    return {
                        ...state,
                        cycles: state.cycles.map((cycle) => {
                            if (cycle.id === state.activeCycleId) {
                                return {...cycle, interruptedDate: new Date()}
                            } else {
                                return cycle;
                            }
                        }),
                        activeCycleId: null,
                    }
                }
            return state
        }, {
        cycles: [],
        activeCycleId: null,
    });
    
    
    const [ amountSecondsPassed, setAmountSecondsPassed ] = useState<number>(0)

    const { cycles, activeCycleId } = cycleState;
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds);
    }

    function markCurrentCycleAsFinished() {

        dispatch({ 
            type: 'MARK_CYCLE_AS_FINISHED',
            payload: {
                activeCycleId,
            }
        });
    }

    function createNewCycle (data: CycleForm) {
        const id = Math.random().toString(36).substr(2, 9) + String(new Date().getTime())

         const newCycle: CycleForm = {
            id: id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }

        dispatch({
            type: 'ADD_NEW_CYCLE',
            payload: {
                newCycle,
            },  // This is a payload containing the new cycle object. It's passed to the reducer.  // It's a good practice to include relevant information in the payload.  // For example, if you're adding a new cycle, you might include the new cycle object.  // If you're marking a cycle as finished, you might include the cycle's ID.  // This makes the reducer's logic much clearer and easier to understand.  // In this case, the newCycle object is passed as a payload.  // The reducer then creates a new cycle object, adds it to the existing cycles, and sets the active cycle ID to the new cycle's ID.  // This way, the new cycle is added to the list of cycles, and the active cycle ID is updated.  // The new cycle object is also passed to the setSecondsPassed function, which updates the amount
        })

        //setCycles((state) => [...state, newCycle])
        setAmountSecondsPassed(0)
    }

    function interruptCycle () {
        dispatch({
            type: 'INTERRUPT_CYCLE',
            payload: {
                activeCycleId,
            },  // This is a payload containing the active cycle's ID. It's passed to the reducer.  // In this case, the activeCycleId is passed as a payload.  // The reducer then sets the interruptedDate for the active cycle to the current date, and clears the active cycle ID.  // This way, the interrupted cycle is marked as finished, and the active cycle ID is cleared.  // The setSecondsPassed function is also called with a value of 0, which resets the countdown timer.  // This way, the countdown timer is reset when a cycle is interrupted.  // The interruptCycle function is used to mark a cycle as finished or interrupt it.  // The new cycle object is passed to the setSecondsPassed function, which updates the amount of seconds passed.  // This way, the new cycle is added to the list of cycles, and the
        })
    }

    return (
        <CyclesContext.Provider
                value={{
                    cycles,
                    activeCycle,
                    activeCycleId,
                    markCurrentCycleAsFinished, 
                    amountSecondsPassed,
                    setSecondsPassed,
                    createNewCycle,
                    interruptCycle,
                    }} >
                        {children}
        </CyclesContext.Provider>
    )
}