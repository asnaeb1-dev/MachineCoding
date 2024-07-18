import './transferlist.css';

import { useState, useEffect } from "react";

export default function TransferList() {
  const [leftList, setLeftList] = useState([
    {
      itemTitle: "HTML",
      isSelected: false
    },{
      itemTitle: "JavaScript",
      isSelected: false
    },{
      itemTitle: "CSS",
      isSelected: false
    },{
      itemTitle: "TypeScript",
      isSelected: false
    },
  ]);
  const [leftSelectedCount, setLeftSelectedCount] = useState(0);
  const [rightList, setRightList] = useState([
    {
      itemTitle: "React",
      isSelected: false
    },{
      itemTitle: "Angular",
      isSelected: false
    },{
      itemTitle: "Vie",
      isSelected: false
    },{
      itemTitle: "Svelte",
      isSelected: false
    }
  ]);
  const [rightSelectedCount, setRightSelectedCount] = useState(0);


  const handleLeftSetSelect = index => {
    // console.log("current", index)
    setLeftList(list => {
      const tempList = [...list];
      tempList[index].isSelected = !tempList[index].isSelected;
      return tempList;
    })
  }

  const handleRightSetSelect = index => {
    setRightList(list => {
      const tempList = [...list];
      tempList[index].isSelected = !tempList[index].isSelected;
      return tempList;
    })
  }

  useEffect(() => {
    // console.log(leftList)
    let count = 0;
    for(let item of leftList) {
      if(item.isSelected) {
        count++;
      }
    }
    setLeftSelectedCount(c => count)
  }, [leftList])

  useEffect(() => {
    // console.log(rightList)
    let count = 0;
    for(let item of rightList) {
      if(item.isSelected) {
        count++;
      }
    }
    setRightSelectedCount(c => count)
  }, [rightList])

  const handleLeftSelectAllBtnClick = () => {
    if(leftSelectedCount >= 0 && leftSelectedCount < leftList.length) {
        setLeftList(list => list.map(item => ({...item, isSelected: true})))
    } else if(leftSelectedCount >= leftList.length) {
        setLeftList(list => list.map(item => ({...item, isSelected: false})))
    }
  }

  const handleRightSelectAllBtnClick = () => {
    if(rightSelectedCount >= 0 && rightSelectedCount < rightList.length) {
        setRightList(list => list.map(item => ({...item, isSelected: true})))
    } else if(rightSelectedCount >= rightList.length) {
        setRightList(list => list.map(item => ({...item, isSelected: false})))
    }
  }

  const handleLeftMovement = () => {
    setLeftList([...leftList, ...rightList.filter(item => item.isSelected)]);
    setRightList(rightList.filter(item => !item.isSelected));

  }

  const handleRightMovement = () => {
    setRightList([...rightList, ...leftList.filter(item => item.isSelected)]);
    setLeftList(leftList.filter(item => !item.isSelected));
  }

  return (
    <div className="main">
      <div className="main-list">
        <div className="left-part">
          <form onSubmit={(e) => (e.preventDefault(), setLeftList([...leftList, {itemTitle: e.target.leftinputform.value, isSelected: false}]))} className="input-div">
            <input name="leftinputform" type={"text"} />
          </form>
          <div className="selector-div">
            <span className="span--">
              <button onClick={handleLeftSelectAllBtnClick}>{leftList.length === 0 ? "X" : "-"}</button>
              <p>{leftSelectedCount} / {leftList.length} Selected</p>
            </span>
          </div>
          <div className="list-div">
            {
              leftList?.map((item, index) => {
                return <ListItem key={item.itemTitle} setSelect={() => handleLeftSetSelect(index)}
                      title={item.itemTitle} isSelected={item.isSelected} />
              })
            }
          </div>
        </div>
        <div className="center-part">
          <button onClick={handleLeftMovement}> Left </button>
          <button onClick={handleRightMovement}> Right </button>
        </div>
        <div className="right-part">
          <form   onSubmit={(e) => (e.preventDefault(), setRightList([...rightList, {itemTitle: e.target.rightinputform.value, isSelected: false}]))} className="input-div">
            <input name="rightinputform" type={"text"} />
          </form>
          <div className="selector-div">
            <span className="span--">
              <button onClick={handleRightSelectAllBtnClick}>-</button>
              <p>{rightSelectedCount} / {rightList.length} Selected</p>
            </span>
          </div>
          <div className="list-div">
            {
              rightList?.map((item, index) => {
                return <ListItem key={item.itemTitle} setSelect={() => handleRightSetSelect(index)} title={item.itemTitle} isSelected={item.isSelected} />
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}

const ListItem = ({ title, isSelected, setSelect }) => {
  return(
    <div className="list-item">
      <input type={"checkbox"} checked={isSelected} onChange={setSelect} />
      <p>{title}</p>
    </div>
  )
}