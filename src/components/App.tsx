import RoomPanel from './RoomPanel'
import ChatPanel from './ChatPanel'
import UserPanel from './UserPanel'

const App = () => {
  return (
    <div className="flex flex-row w-full h-full mx-auto">
      <div className='basic-1/3 h-full bg-white'>
        <RoomPanel />
      </div>
      <div className='basic-1/3 h-full'>
        <ChatPanel name={'Charlene'} />
      </div>
      <div className='basic-1/3 h-full'>
        <UserPanel />
      </div>
    </div>
  )
}

export default App
