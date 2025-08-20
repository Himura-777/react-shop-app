export default function Loader({small}){
  return <div className="loader">{small ? 'Загрузка…' : 'Пожалуйста, подождите, идёт загрузка…'}</div>
}
