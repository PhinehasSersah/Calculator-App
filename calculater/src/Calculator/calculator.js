import React from "react";
import './calculator.css'


const Calculator = ({addButtonClick,addDot,clear,compute,addOperator}) => {
    
    return(
        <main className="calculator">
            <section className="pad">
                <div className="top-row">
                <div className="numbers">
                    <div className="div-one">
                        <button onClick={addButtonClick} id="one">1</button>
                        <button onClick={addButtonClick} id="two">2</button>
                        <button onClick={addButtonClick} id="three">3</button>  
                    </div>

                    <div className="div-two">
                        <button onClick={addButtonClick} id="four">4</button>
                        <button onClick={addButtonClick} id="five">5</button>
                        <button onClick={addButtonClick} id="six">6</button>    
                    </div>
                    
                   <div className="div-three">
                        <button onClick={addButtonClick} id="seven">7</button>
                        <button onClick={addButtonClick} id="eight">8</button>
                        <button onClick={addButtonClick} id='nine'>9</button>
                    </div>
                </div>
            
                <div className="operators">
                    <button onClick={addOperator} id="add">+</button>
                    <button onClick={addOperator} id="subtract">-</button>
                    <button onClick={addOperator} id="multiply">*</button>
                    <button onClick={addOperator} id="divide">/</button>
                </div>
                </div>

                <br />
                <div className="execute">
                    <div className="additional">
                        <button onClick={addDot} id="decimal">.</button>
                        <button onClick={addButtonClick} id="zero">0</button>
                        <button onClick={compute} id="equals">=</button>
                    </div>
                    <br />

                    <div className="equals-button">
                    <button onClick={clear} id='clear'>AC/Clear</button>
                    </div>

                </div>
            </section>
            
        </main>
    )
}

export default Calculator;