import { useState } from 'react'
import './MessageInput.css'

type Props = {
  onSend: (text: string) => void
  disabled: boolean
}

function MessageInput({ onSend, disabled }: Props) {
  const [text, setText] = useState('')

  function handleSend() {
    if (text.trim() === '') return
    onSend(text.trim())
    setText('')
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleSend()
  }

  return (
    <div className="message-input">
      <input
        type="text"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />
      <button onClick={handleSend} disabled={disabled}>
        Send
      </button>
    </div>
  )
}

export default MessageInput
