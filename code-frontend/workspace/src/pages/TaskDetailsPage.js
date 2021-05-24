/* eslint-disable */

import { gql } from "@apollo/client";
import { useParams } from "react-router";
import { Card, InfoCard } from "../components";

// ÜBUNG 1  ------------------------------------------------------------------------
//
// - Hier siehst Du einen fertigen Query, der ein Task eines Projektes lädt:
// query TaskDetailsPageQuery {
//   project(id: "P1") {
//     id
//     title
//     task(id: "T1") {
//       id
//       title
//       description
//       assignee {
//         name
//       }
//       toBeFinishedAt
//       state
//     }
//   }
// }

// - Schritt 1: ersetze die hart-codierten Werte in dem Query durch Variablen
//    - Die Namen kannst Du dir selbst aussuchen, sie sind jeweils vom Typ "ID!"
// - Schritt 2: Erzeuge hier mit der gql-Funktion ein Query-"Dokument",
//      das deinen Query enthält
//    - Die entsprechende Konstante sollte TaskDetailsPageQuery heißen
// - Schritt 3: Implementiere die Komponente unten, so dass sie den Query
//    ausführt. Siehe TODOs weiter unten

// ÜBUNG 2 -------------------------------------------------------------------------------
//
// - Analog zu Übung 1, erzeuge für diese Mutation einen Mutation-String mit
//     zwei Variablen und erzeuge ein GraphQL-Dokument dafür
//     Typen: TaskId = ID! newState = TaskState!
// - Weitere TODOs zum Ausführen der Mutation siehe unten:

// mutation UpdateTaskStateMutation {
//   updateTaskState(taskId: "T1", newState: "RUNNING") {
//     id
//     state
//   }
// }

export default function TaskDetailsPage() {
  const { projectId, taskId } = useParams();

  // -----------------------------------------------------------------------------------
  // ÜBUNG 1
  //
  // TODO 1: ------------------------------------------------
  //
  //  - Führe hier den TaskDEtailsPageQuery mit useQuery aus
  //    - Denk daran, die Variablen zu übergeben, die der Router mit useParams zurückliefert!
  //  - Solange der Querly lädt, soll die Komponente eine Nachricht anzeigen
  //     ("Bitte warten Sie" o.ä.)
  //
  //  - Fals es einen Fehler gab, gibt, soll die Komponente eine Nachricht anzeigen
  //    ("Es ist ein Fehler aufgetreten")
  //
  //  - Wenn die geladenen Daten zur Verfügung stehen,
  //    soll das leere div unten gerendert werden, s. dort für noch mehr TODOs...

  // -----------------------------------------------------------------------------------
  //  ÜBUNG 2
  //
  //
  // TODOs:
  //  - Erzeuge eine Mutation mit useMutation, die die UpdateTaskStateMutation ausführt
  //  - Schreibe eine Funktion "onTaskStateChange"
  //  - Diese Funktion soll EINEN Parameter haben (z.B. "newState")
  //  - Diese Funktion soll die Mutation ausführen und die benötigten Variablen
  //    übergeben. Der neue State ist der Parameter der Funktion
  //  - Übergib diese Funktion an die TaskView-Komponenten mit dem Propery "onTaskStateChange",
  //     also <TaskView task={...} onTaskStateChange={onTaskStateChange} />
  //     (Die TaskView-Komponente ruft deine Funktion dann beim Klicken auf die Button auf,
  //     und übergibt den korrekten Wert für "newState")
  //  - Danach sollte das Ändern des Zustands eines Tasks funktionieren:
  //     - Wenn Du auf einen der beiden Button ("Start" bzw. "Stop") drückst,
  //       sollte darüber der neue Zustand angezeigt werden ("RUNNING", "FINISHED")
  //  - Was passiert, wenn Du das 'id'-Feld in der Rückgabe in UpdateTaskStateMutation
  //    entfernst?

  return (
    <div>
      <header>
        {/*
          
          ÜBUNG 1, TODO 2
          ---------------------------------------------------------------------------------

          - Zeige hier  in einem h1-Element den Titel des geladenen Tasks an
          - Zeige NACH dem header-Element die TaskView-Komponente an.
             - Übergib der TaskView-Komponente als "task"-Property den geladenen Task
          
          - Danach sollte dann der Task angezeigt werden. Das Verändern des Task-States
            funktioniert NOCH NICHT
          */}
      </header>
    </div>
  );
}

function TaskView({ task, onTaskStateChange }) {
  const finishedUntil = new Date(Date.parse(task.toBeFinishedAt));
  const finishedUntilString = finishedUntil.toLocaleDateString();

  const actions = [
    {
      label: "Start",
      onExecute: () => onTaskStateChange("RUNNING"),
    },
    {
      label: "Stop",
      onExecute: () => onTaskStateChange("FINISHED"),
    },
  ];

  return (
    <>
      <div className="Cardboard TaskStateCardboard">
        <InfoCard label="To be finished until" title={finishedUntilString} />
        <InfoCard label={"Assignee"} title={task.assignee.name} />
        <InfoCard label="State" title={task.state} actions={actions} />
      </div>

      <h1>Description</h1>
      <Card>{task.description}</Card>
    </>
  );
}
