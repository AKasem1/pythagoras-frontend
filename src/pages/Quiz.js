import React, { useRef } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import {data} from '../assets/data'
import { Link, useNavigate } from 'react-router-dom';
import './Quiz.css'


export const Quiz = () => {
  const navigate = useNavigate();
    const data = [
        {
          question: "ما هو عنوان الدرس الأول؟",
          option1: "لا أعرف",
          option2: "أعرف",
          option3: "أعرف ولا أعرف",
          option4: "لا أعرف ةأعرف",
          ans: 1,
          image: 'https://i.ibb.co/1GrJy81/ict.png'
        },
        {
          question: "ما هو عنوان الدرس الثاني",
          option1: "لا أعرف",
          option2: "أعرف",
          option3: "أعرف ولا أعرف",
          option4: "لا أعرف ةأعرف",
          ans: 2,
          image: 'https://i.ibb.co/FJ1xTgf/mern-stack.png'
        },
        // other questions...
      ];
    let [index, setIndex] = useState(0)
    let [question, setQuestion] = useState(data[index])
    let [locked, setLocked] = useState(false)
    let [score, setScore] = useState(0)
    let [result, setResult] = useState(false)
    
      
    let {quizId} = useParams()

    const option1 = useRef(null)
    const option2 = useRef(null)
    const option3 = useRef(null)
    const option4 = useRef(null)

    const optionArray = [option1, option2, option3, option4]

    const checkAnswer = (e, ans) => {
        if(!locked){
            if(ans === question.ans){
                e.target.classList.add('correct-answer')
                setScore(score+1)
            } else {
                e.target.classList.add('wrong-answer')
                optionArray[question.ans-1].current.classList.add('correct-answer')
            }
            setLocked(true)
        }
    }

    const nextQuestion = () => {
        if(locked){
            if(index === data.length-1){
                setResult(true)
                return 0;
            }
            setIndex(++index)
            setQuestion(data[index])
            setLocked(false)
            optionArray.forEach(option => {
                option.current.classList.remove('correct-answer')
                option.current.classList.remove('wrong-answer')
            })
        }   
    }

    const reset = () => {
        setIndex(0)
        setQuestion(data[index])
        setLocked(false)
        setScore(0)
        setResult(false)
    }
    const handleReturn = () => {
      navigate('/mycourses');
    }

  return (
    <div className='quiz-container'>
        <h1 className='font-bold'>كويز عن الدرس الأول</h1>
        <hr />
        {result? 
        <>
        <h1>Your score is {score} out of {data.length}</h1>
        <div className='buttons'>
          <button onClick={reset} className='reset-button'>إعادة الكويز</button>
          <button onClick={handleReturn} className='return-button'>العودة صفحة الكورسات</button>
        </div>
        
        </>
        :<div className='questionsWithImg'>
        
        <div className='question-section'>
        <h2 className='font-bold'>{index+1}. {question.question}</h2>
        <ul>
            <li ref={option1} onClick={(e)=>{checkAnswer(e,1)}}>{question.option1}</li>
            <li ref={option2} onClick={(e)=>{checkAnswer(e,2)}}>{question.option2}</li>
            <li ref={option3} onClick={(e)=>{checkAnswer(e,3)}}>{question.option3}</li>
            <li ref={option4} onClick={(e)=>{checkAnswer(e,4)}}>{question.option4}</li>
        </ul>
        <button className="next-button" onClick={nextQuestion}>التالي</button>
        <div className='question-index'>سؤال {index + 1} من {data.length}</div>
        </div>
        {question.image && (
          <div className='question-image'>
            <img src={question.image} alt="Question" />
          </div>
        )}
        </div>
       }
        
    </div>
  )
}
