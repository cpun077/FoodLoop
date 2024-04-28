"use client";
import { useState } from 'react';
import Link from 'next/link';
import RootLayout from '../layout';
import './ChatPage.css';

export default function Chat() {

    interface ChatProps {
        name: string;
        text: string;
    }

    const ChatMsg = (props: ChatProps) => {
        return (
            <div className="useramessage1">
            <div className="frame-parent">
                <div className="a-wrapper">
                    <div className="a">{props.name.split('')[0]}</div>
                </div>
                <div className="message">
                    <p>{props.name}</p>
                    <div className="this-is-a">{`: ${props.text}`}</div>
                </div>
            </div>
        </div>
        )
    }

    const [log, setLog] = useState([
        {
            name: "Bob Cousy",
            text: "I love me some pancakes",
        },
        {
            name: "Abby",
            text: "This is a test message from user A.",
        },
        {
            name: "Bob Cousy",
            text: "I love me some pancakes",
        },
        {
            name: "Bob Cousy",
            text: "I love me some pancakes",
        },
    ])

    return (
        <RootLayout>
            <div className="chat-page">
                <div className="uploadfoodimagebutton-parent">
                    <img className="uploadfoodimagebutton-icon" alt="" src="UploadFoodImageButton.png" />

                    <div className="this-is-the-container">
                        <p className="this-is-the">This is the description of the food presented to the left.</p>
                        <p className="this-is-the">&nbsp;</p>
                        <p className="this-is-the">Estimated Arrival: 3:05 PM</p>
                        <p className="this-is-the">Name of Delivery Driver: Benjamin Charles</p>
                    </div>
                </div>
                <div className='logcontainer'>
                    {log.map((msg) => (
                        <div>
                            <ChatMsg
                                name={msg.name}
                                text={msg.text}
                            />
                        </div>
                    ))}
                </div>
                <div className="input-field-parent">
                    <input className='input-field' placeholder='Type your message here' />
                    <img className="mic-icon" alt="" src="Mic.svg" />

                </div>
            </div>
        </RootLayout>
    );
}
