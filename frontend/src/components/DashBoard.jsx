

export default function DashBoard({selected}) {
    const getLetters = (x) =>{return x[0]}
    
    const letters = selected.map(getLetters)
  return (
    <div className='dashBoard'>
        {letters}
    </div>
  )
}
