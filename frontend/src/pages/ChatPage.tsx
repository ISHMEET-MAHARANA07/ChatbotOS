import { useState, useEffect, useRef } from 'react'
import ChatBubble from '../components/ChatBubble'
import MessageInput from '../components/MessageInput'
import { sendMessage, getMessages } from '../api'
import type { Message } from '../api'
import './ChatPage.css'

function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const bottomRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        getMessages()
            .then(setMessages)
            .catch(() => {})
    }, [])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    async function handleSend(text: string) {
        const userMessage: Message = {
            id: Date.now(),
            sender: 'user',
            text,
            created_at: new Date().toISOString(),
        }
        setMessages((prev) => [...prev, userMessage])
        setLoading(true)
        setError('')

        try {
            const botMessage = await sendMessage(text)
            setMessages((prev) => [...prev, botMessage])
        } catch {
            setError('Could not reach the server.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="chat-page">
            <div className="chat-messages">
                {messages.length === 0 && !loading && (
                    <p className="chat-empty">No messages yet. Say hello!</p>
                )}
                {messages.map((msg) => (
                    <ChatBubble
                        key={msg.id}
                        sender={msg.sender}
                        text={msg.text}
                        created_at={msg.created_at}
                    />
                ))}
                {loading && (
                    <p className="chat-typing">Bot is typing...</p>
                )}
                {error && <p className="chat-error">{error}</p>}
                <div ref={bottomRef} />
            </div>
            <MessageInput onSend={handleSend} disabled={loading} />
        </div>
    )
}

export default ChatPage
