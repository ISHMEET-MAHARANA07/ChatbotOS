import './ChatBubble.css'

type Props = {
  sender: 'user' | 'bot'
  text: string
  created_at: string
}

function ChatBubble({ sender, text, created_at }: Props) {
  const time = new Date(created_at).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className={`bubble-wrapper ${sender}`}>
      <div className={`bubble ${sender}`}>
        <p>{text}</p>
        <span className="bubble-time">{time}</span>
      </div>
    </div>
  )
}

export default ChatBubble
