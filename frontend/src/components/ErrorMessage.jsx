export default function ErrorMessage({message, onRetry}){
  return (
    <div className="error">
      <div>Ошибка: {message || 'неизвестная ошибка'}</div>
      {onRetry && <button onClick={onRetry} style={{marginTop:8}}>Повторить</button>}
    </div>
  )
}
