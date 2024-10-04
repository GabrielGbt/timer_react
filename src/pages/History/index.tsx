import { useContext } from "react";
import { HistoryContainer, HistoryList, Status } from "./styles";
import { CyclesContext } from "../../contexts/CycleContext";

export function History() {
    const { cycles } = useContext(CyclesContext);

    return (
        <HistoryContainer>
            <h1>Latest Tasks</h1>

            <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>Task</th>
                            <th>Duration</th>
                            <th>Started</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cycles.map(cycle => {
                            return (
                                <tr key={cycle.id}>
                                    <td>{cycle.task}</td>
                                    <td>{cycle.minutesAmount}</td>
                                    <td>{cycle.startDate?.toISOString()}</td>
                                    <td>
                                        {cycle.finishedDate && (
                                            <Status statusColor="green">Done</Status>
                                        )}

                                        {cycle.interruptedDate && (
                                            <Status statusColor="red">Stoped</Status>
                                        )}

                                        {!cycle.finishedDate && !cycle.interruptedDate && (
                                            <Status statusColor="yellow">Pending</Status>
                                        )}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    )
}