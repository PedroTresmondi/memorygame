import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { saveScoreboardData  } from './scoreboardUtils';

import './LeadCapture.css'

function LeadCapture({ onStartGame, onCardTurn }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [points, setPoints] = useState(0);



    const handleStartGame = () => {
        if (name && email && phone) {
            // Verifique se os dados do usuário já existem no sessionStorage
            const storedUserData = JSON.parse(sessionStorage.getItem('userData'));
            if (storedUserData && storedUserData.name === name && storedUserData.email === email) {
                // Usuário com os mesmos dados já existe, inicie o jogo com os dados existentes
                onStartGame(storedUserData);
            } else {
                // Usuário não encontrado no sessionStorage, crie um novo registro
                const lead = { name, email, phone, points };
                onCardTurn(points)
                saveLead(lead); // Salva o lead no localStorage
                sessionStorage.setItem('userData', JSON.stringify(lead)); // Armazena os dados no sessionStorage
                onStartGame(lead);
                saveScoreboardData(name, points); // Salva o nome e pontos no Scoreboard
            }
        } else {
            toast("Preencha todos os campos!");
        }
    }

    // Função para formatar o campo de telefone com os parênteses automaticamente
    const formatPhoneNumber = (input) => {
        let formattedPhone = input.replace(/\D/g, ''); // Remove caracteres não numéricos
        if (formattedPhone.length >= 2) {
            formattedPhone = `(${formattedPhone.slice(0, 2)}) ${formattedPhone.slice(2)}`;
        }
        return formattedPhone;
    }

    const saveLead = (lead) => {
        const existingLeads = JSON.parse(localStorage.getItem("leads")) || [];
        existingLeads.push(lead);
        localStorage.setItem("leads", JSON.stringify(existingLeads));
    }

    return (
        <div className="modal">
            <h2>Captura de Leads</h2>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div className="form-group">
                <input
                    type="text"
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => {
                        const inputValue = e.target.value.replace(/[^A-Za-z ]/g, ''); // Permite apenas letras e espaços
                        setName(inputValue);
                    }}
                    maxLength={30}
                />
            </div>
            <div className="form-group">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    maxLength={30}
                />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    placeholder="(DD) XXXXX-XXXX"
                    value={formatPhoneNumber(phone)}
                    onChange={(e) => {
                        const inputValue = e.target.value;
                        setPhone(inputValue);
                    }}
                    maxLength={14}
                />
            </div>
            <button onClick={handleStartGame}>Iniciar Jogo</button>
        </div>
    );
}

export default LeadCapture;
