import './ReportBugs.css'

import logo from './../../Imgs/Logo 356x.png'

import { LuX } from "react-icons/lu";
import { useState } from 'react';

import { createReportBug } from '../../Components/firebase/CreateReportBug';

export function ReportBugs(){

    var [statsBugValidation, setStatsBugValidation] = useState('loading')

    function confirmBugValidation(){
        document.getElementById('confirmBug').style.display = 'flex'
        document.getElementById('confirmReturn').style.display = 'flex'
        setTimeout(function(){
            document.getElementById('confirmBug').style.opacity = '1'
            document.getElementById('confirmReturn').style.opacity = '1'
        },100)
        if(document.getElementById('bugType').value === 'outros' &&  document.getElementById('bugsTypeInput').value === '' ){
            setStatsBugValidation('false')
            return
        }
        if(document.getElementById('bugSearch').value === 'outros' &&  document.getElementById('bugsSearchInput').value === '' ){
            setStatsBugValidation('false')
            return
        }


        var reportData = {
            name: document.getElementById('name').value,
            email:  document.getElementById('email').value,
            bugsSearch: document.getElementById('bugSearch').value,
            bugsType: document.getElementById('bugType').value,
            description: document.getElementById('texteareValue').value,
        }

        createReportBug(reportData)

        setTimeout(function(){
            setStatsBugValidation('true')
        },1000)
    }

    function closeConfirmBugValidation(){
        document.getElementById('confirmBug').style.opacity = '0'
        document.getElementById('confirmReturn').style.opacity = '0'
        setTimeout(function(){
            document.getElementById('confirmBug').style.display = 'none'
            document.getElementById('confirmReturn').style.display = 'none'
        },100)
    }

    return (
        <>
            <div className='bug'>
                <div className='form' >
                    <div className='bug-legend'>
                        <img alt='img logo' height={50}  src={logo}/>
                        <h1>Report bugs  - Price Game</h1>
                    </div>
                    <div className='bug-form-user'>
                        <input id='name'  name='name' type='text' placeholder='Nome'  required/>
                        <input id='email' name='email' type='email' placeholder='Email - @gmail.com' required/>
                    </div>
                    <div className='bug-form-bugType'>
                        <div>
                            <label for="bugsType">Qual tipo de bug:</label>
                            <select onChange={(e)=> {if(e.target.value === 'outros'){document.getElementById('bugsTypeInput').setAttribute('type', 'text')}else{document.getElementById('bugsTypeInput').setAttribute('type', 'hidden')}}} name="bugsType" id="bugType">
                                <option value="tela">Tela não carregando</option>
                                <option value="site">Site quebrado</option>
                                <option value="link">Link incorreto</option>
                                <option value="outros">Outro</option>
                            </select>
                        </div>
                        <input id='bugsTypeInput' type='hidden' placeholder='Outro tipo de bug...' />
                        <div>
                            <label for="bugsSearch">Onde ocorreu o bug?</label>
                            <select onChange={(e)=> {if(e.target.value === 'outros'){document.getElementById('bugsSearchInput').setAttribute('type', 'text')}else{document.getElementById('bugsSearchInput').setAttribute('type', 'hidden')}}} name="bugsSearch" id="bugSearch">
                                <option value="home">Inicio</option>
                                <option value="news">Noticias</option>
                                <option value="search-games">Pesquisa de games</option>
                                <option value="games-details">detalhe de games</option>
                                <option value="history">historico</option>
                                <option value="settings">configurações</option>
                                <option value="outros">Outro</option>
                            </select>
                        </div>
                        <input id='bugsSearchInput' type='hidden' placeholder='Onde ocorreu o bug?' />

                    </div>
                    <div className='bug-form-info'>
                        <textarea id='texteareValue' placeholder='Descreva o´que aconteceu e como é o bug'/>
                    </div>
                    <button onClick={()=> confirmBugValidation()}>Enviar</button>
                </div>
            </div>
            <div onClick={() => closeConfirmBugValidation()} id='confirmBug' style={{display: 'none'}} className='confirmBug'></div>
            <div id='confirmReturn' style={{display: 'none'}} className='confirmBugReturn'>
                <button onClick={()=>closeConfirmBugValidation()}><LuX size={25}/></button>
                {statsBugValidation === 'loading' && (
                    <div className='result-div'>
                        <h2>Carregando</h2>
                        <div class="custom-loader"></div>
                    </div>
                )}
                {statsBugValidation === 'true' && (
                    <div className='result-div'>
                        <h2>Bug reportado!</h2>
                    </div>
                )}
                {statsBugValidation === 'false' && (
                    <div className='result-div'>
                        <h2>Falha no envio</h2>
                        <h4>Compelte todos os inputs</h4>
                    </div>
                )}
            </div>
        </>
    )
}