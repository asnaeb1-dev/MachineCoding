import './undoablecounter.css';
import {useState, useEffect} from "react";

/**
 * Question
 *  CHECK THIS FOR REFERENCE: https://www.greatfrontend.com/img/questions/undoable-counter/undoable-counter-example.png
 * Question Link : https://www.greatfrontend.com/questions/user-interface/undoable-counter
 * 
        Build a counter with a history of the changes and ability to undo/redo actions.

        Undoable Counter Example

        Requirements
        The counter starts at 0.
        There buttons "/2", "-1", "+1", "x2" apply the respective operations to the current count.
        A row is added to the history table, showing the operation, count before the operation, count after.
        The "Undo" button undoes the last action and updates the count.
        The "Redo" button applies the last undo-ed action, if any.
        Clicking on the modification buttons should clear any undo-ed actions and they cannot be redo-ed.
        The "Reset" button resets the counter to 0 and clears all history.
 */

export default function UndoableCounter() {

  const [counterValue, setCounterValue] = useState(0);
  const [currentOperation, setCurrentOperation] = useState("");
  const [clickOperationPerformed, setClickOperationPerformed] = useState(0);
  const [operationsList, setOperationsList] = useState([]);
  const [manualOperations, setManualOperations] = useState("");

  const [undoRedoOpsList, setUndoRedoOpsList] = useState([]);
  const [undoRedoClickPerformed, setUndoRedoClickPerformed] = useState(0)
  useEffect(() => {
    switch(currentOperation) {
      case "divideBy2":
        setOperationsList(list => {
          const tempList = [...list];
          tempList.push( ["/2", counterValue, counterValue / 2 ]);
          return tempList
        })
        return;
      
      case "substractBy1":
         setOperationsList(list => {
          const tempList = [...list];
          tempList.push( ["-1", counterValue, counterValue -1 ]);
          return tempList
        })
        return;
      
      case "add1":
         setOperationsList(list => {
          const tempList = [...list];
          tempList.push( ["+1", counterValue, counterValue +1 ]);
          return tempList
        })
        return;
      
      case "multiplyBy2":
         setOperationsList(list => {
          const tempList = [...list];
          tempList.push( ["*2", counterValue, counterValue * 2 ]);
          return tempList
        })
        return;

      default:
        setCounterValue(counterValue)

    }
  }, [currentOperation, clickOperationPerformed])

  useEffect(() => {
    if(operationsList?.length > 0) {
      setCounterValue(v => operationsList[operationsList.length - 1][2])
    }
  }, [operationsList])

  useEffect(() => {
    switch(manualOperations) {
      case "undo":
        setOperationsList(list => {
          const tempList = [...list];
          const element = tempList.pop();
          setUndoRedoOpsList([...undoRedoOpsList, element]);
          return tempList;
        })
        return;

      case "redo":
        setUndoRedoOpsList(list => {
          const tempList = [...list];
          const element = tempList.pop();
          setOperationsList([...operationsList, element]);
          return tempList;
        })
        return;
      
      case "reset":
        setOperationsList([])
        setCounterValue(0)
        setUndoRedoClickPerformed(0)
        setClickOperationPerformed(0)
        setCurrentOperation("")
        setUndoRedoOpsList([])
        setManualOperations("")
        return;
    }
  }, [manualOperations, undoRedoClickPerformed])

  return (
    <div className="main-conatiner">
      <div className="buttons">
        <button disabled={operationsList.length <= 0} onClick={() => (setManualOperations("undo"), setUndoRedoClickPerformed(c => c + 1))}>Undo</button>
        <button disabled={undoRedoOpsList.length <= 0} onClick={() => (setManualOperations("redo"), setUndoRedoClickPerformed(c => c + 1))}>Redo</button>
        <button onClick={() => (setManualOperations("reset"))}>Reset</button>
      </div>
      <div className="operations">
        <div>
          <button onClick={() => (setCurrentOperation("divideBy2"), setClickOperationPerformed(c => c+ 1))}>/2</button>
          <button onClick={() => (setCurrentOperation("substractBy1"), setClickOperationPerformed(c => c+ 1))}>-1</button>
        </div>
        <h1>{counterValue}</h1>
        <div>
          <button onClick={() => (setCurrentOperation("add1"), setClickOperationPerformed(c => c+ 1))}>+1</button>
          <button onClick={() => (setCurrentOperation("multiplyBy2"), setClickOperationPerformed(c => c+ 1))}>*2</button>
        </div>
      </div>
      <div className="op-history">
        <div className="header">
          <p>Op</p>
          <p>Old</p>
          <p>New</p>
        </div>
        <div class="op-col">
          {
            operationsList.map((item, index) => {
              return (
                <div className="op-row">
                  <p>{item[0]}</p>
                  <p>{item[1]}</p>
                  <p>{item[2]}</p>
                </div>
              )
            } )
          }
        </div>
      </div>
    </div>
  );
}
