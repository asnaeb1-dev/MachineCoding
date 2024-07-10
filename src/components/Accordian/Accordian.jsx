import React, { useEffect, useState } from 'react'
import "./accordian.css";
import { IoIosArrowDown as DownArrowIcon } from "react-icons/io";

const Accordian = () => {
    const [accordianItems, setAccordianItems] = useState([
        {
            title: "HTML",
            description: "The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser."
        },
        {
            title: "CSS",
            description: "Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML."
        },
        {
            title: "JavaScript",
            description: "JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS."
        }
    ]);

    const [accordianState, setAccordianState] = useState([...accordianItems].fill(false));

    return (
        <div className='accordian-main'>
            {
                accordianItems.map((item, index) => {
                    return (
                        <AccordianItem
                            accordianItemTitle={item.title}
                            accordianItemDesc={item.description}
                            accordianState={accordianState[index]}
                            setAccordianState={index => setAccordianState( state => {
                                const tempState = [...state];
                                const ind = tempState.indexOf(true);
                                if(ind !== -1 && ind !== index) {
                                    tempState[ind] = false;
                                }
                                tempState[index] = !tempState[index];
                                return tempState;
                            })}
                            key={index}
                            index = {index}
                        />
                    )
                })
            }
            <div>

            </div>
        </div>
    )
}

const AccordianItem = ({ accordianItemTitle, accordianItemDesc, accordianState, setAccordianState, index}) => {


    return (
        <div className='accordian-item-main'>
            <div onClick={() => setAccordianState(index)} className='accordian-item-title-part'>
                <p>{accordianItemTitle}</p>
                <span>
                    <DownArrowIcon size={20} />
                </span>
            </div>
            {
                <div className={accordianState ? "accordian-item-desc-part-open animate-open" : "accordian-item-desc-part-close animate-close"} >
                    <p>{accordianItemDesc}</p>
                </div>
            }
        </div>
    )
}

export default Accordian