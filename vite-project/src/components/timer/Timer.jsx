import { useEffect, useState } from "react"
import './style.css'

const arr = ['1sfsf','2sfsf','3sfsf','4sfsf','5sfsf','6sfsf','sfsf','sfsf'];

export const Timer = () => {
    
    const [workBreak, setWorkBreak] = useState({work: 3, break: 2,bigBreak: 6});
    const [time, setTime] = useState(workBreak.work);
    const [isActive, setIsActive] = useState(false);
    const [taskName, setTaskName] = useState('');
    const [iter, setIter] = useState(1);
    const [tasks, setTasks]= useState([]);
    // const [isActive, setIsActive] = useState(false);
    useEffect(()=>{
        // var refreshIntervalId
        console.log('refreshIntervalId');
        const refreshIntervalId = setInterval(() => {
            console.log('refreshIntervalId===>');
            if(isActive){
                setTime((prev) => prev - 1)
                console.log('if');
                if(time === 0)//0 на таймере, переход на следующий
                {
                    console.log('iter => ', iter);
                    console.log('(iter + 1)%8 => ', (iter + 1)%8);
                    if((iter + 1)%8 === 0) {
                        handleTabClick('bigBreak')
                    }
                    else if(iter%2 === 0)
                    {
                        handleTabClick('work')
                    }
                    else{
                        handleTabClick('break')
                    }
                    setIter((prev) => prev + 1);
                }
            }
        
        }, 1000);

        return (
            ()=> clearInterval(refreshIntervalId)
        )

    },[isActive, iter, time])
    const handleClick = () => {
        setIsActive((prev) => !prev)
    }
    const handleTabClick = (type) => {
        setIsActive(false);
        let totalT= workBreak.work
        if(type === 'break')
        {
            totalT= workBreak.break;
        }
        else if(type === 'bigBreak')
        {
            totalT=workBreak.bigBreak
        }

        setTime(totalT)
    }
/* later */
    
    return <div className="box">
        <ul className="taskList">
            {tasks.slice(Math.floor(iter/2)+1).map((item)=> <li key={item}>{item}</li>)}
        </ul>
        <div className="timer">
        
        <div className="tub__box">
            <button className="button_tub" onClick={()=>{
                handleTabClick('work')
            }}>занятие</button>
            <button className="button_tub" onClick={()=>{
                
                handleTabClick('break')

            }}>перерыв</button>
            <button className="button_tub" onClick={()=>{
                handleTabClick('bigBreak')
            }}>большой перерыв</button>
        </div>
        
        <h1>{Math.floor(time/60) < 10 ? `0${Math.floor(time/60)}` : Math.floor(time/60)}:{time%60 < 10 ? `0${time%60}` : time%60}</h1>
        {
        
        /* if(isActive)
        
        {
        }
        else */}
        {
           !isActive ? <button className="button_time" onClick={handleClick}>Запустить</button> : 
            <><button className="button_time" onClick={handleClick}>Пауза</button>
            <button className="=>" onClick={()=>setTime(0)}>fdd</button> </>
        }
        <br /><br /><br />
        {iter%2 === 1 && <h3 >{tasks[Math.floor(iter/2)]}</h3>}
        
        <input className="addText" type="text" onInput={(e) => setTaskName(e.target.value)} value={taskName} />
        <br /><br />
        <button className="button_time" onClick={()=>{
            setTasks(prev=>[...prev,taskName])
            setTaskName('');
        }}>Add task +</button>
        

    </div>
    </div>
}