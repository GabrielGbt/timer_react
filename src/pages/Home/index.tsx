import { HandPalm, Play } from 'phosphor-react';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

import { NewCycleForm } from './NewCycle';
import { CountDown } from './CountDown';

import { 
    HomeContainer, 
    StartCountDownButton, 
    StopCountDownButton,  
} from "./styles";
import { useContext } from 'react';
import { CyclesContext } from '../../contexts/CycleContext';

interface CycleForm {
    id?: string;
    task: string;
    minutesAmount: number;
    startDate?: Date;
    interruptDate?: Date;
    finishedDate?: Date;
}

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'inform the task'),
    minutesAmount: zod.number().min(1, 'maior que 5').max(60, 'aaa'),
})

export function Home() {
    const { createNewCycle, interruptCycle, activeCycle } = useContext(CyclesContext);

    const NewCycleUseForm = useForm<CycleForm>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    });

    function handleCreateNewCycle(data : CycleForm) {
        createNewCycle(data);
        reset();
    }

    const { handleSubmit, watch, reset } = NewCycleUseForm;

    const allFieldsFilled = watch('task') && watch('minutesAmount');
    const isVerified = !allFieldsFilled;

    return(
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} >

                
                    <FormProvider {...NewCycleUseForm}>
                        <NewCycleForm />     {/* FORMULARY CREATE NEW CYCLE */}
                    </FormProvider>
                
                    <CountDown />  {/* COUNTDOWN */}
                
                
                {
                activeCycle ? (
                    <StopCountDownButton onClick={interruptCycle} type="submit">
                            <HandPalm size={24}/>
                            Stop
                        </StopCountDownButton>
                    ) : (
                        <StartCountDownButton disabled={isVerified} type="submit">
                    <Play size={24}/>
                    Start
                </StartCountDownButton>
                    )
                }
            </form>
        </HomeContainer>
    )
}