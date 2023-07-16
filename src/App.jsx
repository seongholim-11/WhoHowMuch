import { useState, useEffect, useRef } from 'react';
// 파이어베이서 파일에서 import 해온 db
import { db } from './firebase-config'
// db에 데이터에 접근을 도와줄 친구들
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import './App.scss'

function App() {
  // changed를 true로 바꿔주면 되지않을까?
  const [changed, setChanged] = useState(false);

  // users 추가하고 삭제하는거 진행을 도와줄 state
  const [users, setUsers] = useState([]);
  console.log("🚀 ~ file: App.jsx:18 ~ App ~ users:", users)

  // db의 users 컬렉션을 가져옴
  const usersCollectionRef = collection(db, "users");

  // 추가될 금액을 위한 state
  const [newMoney, setNewMoney] = useState("");

  // 랭킹을 위한 state
  const [rank, setRank] = useState([]);



  // 시작될때 한번만 실행 // 읽어오기 - R
  useEffect(() => {
    // 비동기로 데이터 받을준비
    const getUsers = async () => {
      // getDocs로 컬렉션안에 데이터 가져오기
      const data = await getDocs(usersCollectionRef);
      // users에 data안의 자료 추가. 객체에 id 덮어씌우는거
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getUsers();
    // 뭐든 동작할때마다 changed가 true값으로 변경되니까 화면을 그리고 다시 false로 돌려줘야지 다시 써먹는다.
    setChanged(false)
    setNewMoney("")
    setRank("")
    // divRefs.current 배열에 요소에 대한 참조를 할당하기 전에
    // 해당 요소가 렌더링되도록 확인해야 함
    for (let i = 0; i < 3; i++) {
      if (divRefs.current[i]) {
        let h1Text = divRefs.current[i].innerText;
        let newrank = h1Text.substr(0, 3);
        setRank((rank) => [...rank, newrank]);
        console.log(rank)
      }
    }

  }, [changed]) // 처음에 한번 그리고, changed가 불릴때마다 화면을 다시 그릴거다

  // 업데이트 - U
  const updateUser = async (id, money) => {
    // 내가 업데이트 하고자 하는 db의 컬렉션의 id를 뒤지면서 데이터를 찾는다
    const userDoc = doc(db, "users", id)
    // 내가 업데이트 하고자 하는 key를 어떻게 업데이트할지 준비,, 중요한점이 db에는 문자열로 저장되어있다. 그래서 createUsers()함수안에서 money를 생성할때 숫자열로 형변환 해줘야한다
    const newField = { howmuch: money + Number(newMoney) };
    // updateDoc()을 이용해서 업데이트
    await updateDoc(userDoc, newField);
    // 화면 업데이트를 위한 state 변경
    setChanged(true)
  }

  // 삭제 - D
  const deleteUser = async (id) => {
    // 내가 삭제하고자 하는 db의 컬렉션의 id를 뒤지면서 데이터를 찾는다
    const userDoc = doc(db, "users", id);
    // deleteDoc을 이용해서 삭제
    await deleteDoc(userDoc);
    // 화면 업데이트를 위한 state 변경
    setChanged(true)
  }

  const divRefs = useRef([]);

  // 띄워줄 데이터 key값에 고유ID를 넣어준다.
  const showUsers = users.sort((a, b) => b.howmuch - a.howmuch).map((value, index) => (<div key={value.id} ref={(element) => (divRefs.current[index] = element)}>
    <h1 className='name'>{value.name}</h1>
    <h1>Money: {value.howmuch}원</h1>
    {/* 증가버튼은 이 안에 있어야지, 각기 다른 데이터마다 붙는다, users data를 map으로 돌기때문에, 그 안의 id랑 age를 넣어주면 된다.*/}
    {/* id를 넣어주는 이유는, 우리가 수정하고자 하는 데이터를 찾아야하기 때문에. */}
    {/* 예를 들어, 두 명의 사용자가 있다고 가정해봅시다. 첫 번째 사용자의 ID가 "user1"이고 두 번째 사용자의 ID가 "user2"라고 가정하면, newMoney["user1"]은 첫 번째 사용자의 입력 값을 나타내고 newMoney["user2"]은 두 번째 사용자의 입력 값을 나타냅니다. */}
    <input type="number" placeholder='금액을 입력해주세요' value={newMoney[value.id]} onChange={(event) => { setNewMoney(event.target.value) }} />
    <button onClick={() => { updateUser(value.id, value.howmuch) }}>금액 더하기</button>
    <button onClick={() => { deleteUser(value.id) }}>삭제</button>
  </div>
  ))
  return (
    <div className="App">
      <p>업데이트 날짜: 2023-07-16</p>
      <h1 className='whm'>Who How Much</h1>
      <div className='rank'>
        <div className='inner'>
          <div className='text'>
            <h3>{rank[1]}</h3>
          </div>
          <div className='platform'>
          <h2>🥈2등</h2>
          </div>
        </div>
        <div className='inner'>
          <div className='text'>
            <h3>{rank[0]}</h3>
          </div>
          <div className='platform'>
          <h2>🥇1등</h2>
          </div>
        </div>
        <div className='inner'>
          <div className='text'>
            <h3>{rank[2]}</h3>
          </div>
          <div className='platform'>
          <h2>🥉3등</h2>
          </div>
        </div>
      </div>
      <div className='main'>{showUsers}</div>
    </div>
  );
}

export default App;