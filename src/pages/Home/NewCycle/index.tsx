import { 
    FormContainer, 
    MinutesAmountInput, 
    TaskInput 
} from "./styles";

import { useContext } from "react";
import { CyclesContext } from "../../../contexts/CycleContext";
import { useFormContext } from "react-hook-form";


export function NewCycleForm() {
    const { activeCycle } = useContext(CyclesContext);
    const { register } = useFormContext();

    return(
        <FormContainer>
            <label htmlFor="task">Today i will</label>
                   <TaskInput id="task" 
                placeholder="Task name!"
                list="task-suggestions"
                disabled={!!activeCycle}
                {...register('task')}
                />

                <datalist id="task-suggestions">
                     <option value="Estudo"></option>
                     <option value="Estilo"></option>
                      <option value="Código"></option>
                 </datalist>

                 <label htmlFor="minutesAmount">for</label>
                 <MinutesAmountInput 
                 id="minutesAmount" 
                  placeholder="00"
                 type="number"
                 {...register('minutesAmount', {valueAsNumber: true})}
                 />

            <span>minutes</span>
            
        </FormContainer>

    )
}